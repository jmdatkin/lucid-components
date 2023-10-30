import React, { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import DataTableBody from "./data-table-body";

import './DataTable.scss';
import DataTableHeaderProps from "./data-table-header";
import { DataTableColumnSortHandler, SortMode } from "./sort-order-indicator";
import { DataTableCellClickEvent, DataTableCellClickHandler, DataTableData, DataTableRowClickHandler, DataTableSelectionChangeHandler } from "../../types/data-table";
import { localeComparator, resolveFieldData, sort } from "../../utils/util";
import { Filter, FilterMatchMode, applyFilter } from "../../services/filter-service";
import InputText from "../InputText";
import { DataTableColumnProps } from "./data-table-column";
import DataTableControls from "./data-table-controls";
import DataTableHeader from "./data-table-header";

enum SelectionMode {
    SINGLE,
    MULTIPLE,
    CHECKBOX,
};

type DataTableProps<D> = {
    children: ReactNode,
    width?: number,
    data: D[],
    dataKey?: string,
    filters?: Filter[],
    selection: D[],
    selectionMode?: SelectionMode,
    onSelectionChange?: DataTableSelectionChangeHandler<D[]>,
    onCellClick?: DataTableCellClickHandler<D>,
    onRowClick?: DataTableRowClickHandler<D>
};


// TODO: Don't re-compute sort on filter change and vice versa, aka store sort result and filter result separately
//  current method will cost performance with large data sets

// TODO: Fix row index being preserved when sorting
// TODO: Formalize data model, e.g. rowKey

function DataTable<D extends Record<string, any>>(props: DataTableProps<D>) {

    const [sortField, setSortField] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<SortMode>(SortMode.ASCENDING);

    // const [filters, setFilters] = useState<FilterMatchMode>()
    const [filterInput, setFilterInput] = useState('');

    const [data_sorted, setData_sorted] = useState<typeof props.data>(props.data);
    const [data_filtered, setData_filtered] = useState<typeof props.data >(props.data);
    const [data_final, setData_final] = useState<typeof props.data>(props.data);

    const onSortChange: DataTableColumnSortHandler = (column, order, e) => {
        setSortOrder(order);
        setSortField(column);
    }

    const getColumns = () => {
        const columns = React.Children.toArray(props.children) as ReactElement<DataTableColumnProps>[];

        // if (!columns) {
        //     return null;
        // }

        return columns;
    };


    // From https://github.com/primefaces/primereact/blob/master/components/lib/datatable/DataTable.js
    const sortSingle = (data: typeof props.data, field: string, order: SortMode) => {
        let value = [...data];

        // if (columnSortable.current && columnSortFunction.current) {
        //     value = columnSortFunction.current({ data, field, order });
        // } else {
        // performance optimization to prevent resolving field data in each loop
        const lookupMap = new Map();
        const comparator = localeComparator('en-US');

        for (let item of data) {
            lookupMap.set(item, resolveFieldData(item, field));
        }

        value.sort((data1, data2) => {
            const value1 = lookupMap.get(data1);
            const value2 = lookupMap.get(data2);

            return sort(value1, value2, order, comparator);
        });

        return value;
    };

    const createHeader = () => {
        return (
            <DataTableHeader
                originalData={props.data}
                data={data_final}
                columns={getColumns()}
                selection={props.selection}
                selectionMode={props.selectionMode}
                onSelectionChange={props.onSelectionChange}
                onSortChange={onSortChange}
                sortField={sortField}
                sortOrder={sortOrder}
            />
        )
    }

    const createContent = () => {
        return (
            <DataTableBody
                originalData={props.data}
                data={data_final}
                columns={getColumns()}
                selectionMode={props.selectionMode}
                selection={props.selection}
                onSelectionChange={props.onSelectionChange}
                onCellClick={props.onCellClick}
                onRowClick={props.onRowClick}
            />
        )
    }

    // Re-sort data when sort column/order changes
    // Sort 1st
    useEffect(() => {
        if (sortField !== null)
            setData_sorted(sortSingle(props.data, sortField, sortOrder));
        else 
            setData_sorted(props.data);
    }, [sortField, sortOrder, props.data]);

    // Re-filter data when sort or filter input changes
    // Filter 2nd
    useEffect(() => {
        if (props.filters && filterInput !== '') {
            setData_filtered(applyFilter(data_sorted, filterInput, props.filters))
        } else if (filterInput === '')
            setData_filtered(data_sorted!);
    }, [data_sorted, filterInput])

    useEffect(() => {
        setData_final(data_filtered);
    }, [data_filtered])

    return (
        <>
            <div className="lucid-datatable" style={{ width: props.width }}>
                <DataTableControls
                    renderStart={() => {
                        return (
                            <></>
                        )
                    }}
                    renderEnd={() => {
                        return (
                            <InputText onChange={(e) => setFilterInput(e.currentTarget.value)} placeholder="Filter data"></InputText>
                        )
                    }}></DataTableControls>
                <div className="lucid-datatable-table-wrapper" style={{ overflowX: 'scroll', whiteSpace: 'nowrap' }}>
                    <table style={{ width: '100%' }}>
                        {createHeader()}
                        {createContent()}
                    </table>
                </div>
            </div>
        </>
    );
}

DataTable.defaultProps = {
    selectionMode: SelectionMode.SINGLE
};

export { SelectionMode };

export default DataTable;