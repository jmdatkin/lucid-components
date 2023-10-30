import React, { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import DataTableBody from "./data-table-body";

import './DataTable.scss';
import DataTableHeader from "./data-table-header";
import { DataTableColumnSortHandler, SortMode } from "./sort-order-indicator";
import { DataTableCellClickEvent, DataTableCellClickHandler, DataTableData, DataTableRowClickHandler, DataTableSelectionChangeHandler } from "../../types/data-table";
import { localeComparator, resolveFieldData, sort } from "../../utils/util";
import { Filter, FilterMatchMode, applyFilter } from "../../services/filter-service";
import InputText from "../InputText";
import { DataTableColumnProps } from "./data-table-column";

enum SelectionMode {
    SINGLE,
    MULTIPLE
};

type DataTableProps<D> = {
    children: ReactNode,
    width?: number,
    data: D[],
    dataKey?: string,
    filters?: Filter[],
    selection: D | D[],
    selectionMode?: SelectionMode,
    onSelectionChange?: DataTableSelectionChangeHandler<D | D[]>,
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

    const [finalData, setFinalData] = useState<typeof props.data>(props.data);

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
        // }

        return value;
    };

    const createHeader = () => {
        return (
            <DataTableHeader
                onSortChange={onSortChange}
                sortField={sortField}
                sortOrder={sortOrder}
                columns={getColumns()}
                data={props.data}
            />
        )
    }

    const createContent = () => {
        return (
            <DataTableBody
                columns={getColumns()}
                selectionMode={props.selectionMode}
                selection={props.selection}
                onSelectionChange={props.onSelectionChange}
                data={finalData}
                onCellClick={props.onCellClick}
                onRowClick={props.onRowClick}
            />
        )
    }

    // Re-sort data when sort column/order changes
    useEffect(() => {
        let newFinalData = [...props.data];
        if (sortField !== null)
            newFinalData = sortSingle(newFinalData, sortField, sortOrder);

        if (props.filters && filterInput !== '') {
            newFinalData = applyFilter(newFinalData, filterInput, props.filters)
        }

        setFinalData(newFinalData);

    }, [sortField, sortOrder, props.filters, filterInput]);

    return (
        <>
            <InputText onChange={(e) => setFilterInput(e.currentTarget.value)} placeholder="Filter data"></InputText>
            <div className="lucid-datatable" style={{ width: props.width, overflowX: 'scroll', whiteSpace: 'nowrap' }}>
                <table style={{ width: '100%' }}>
                    {createHeader()}
                    {createContent()}
                </table>
            </div>
        </>
    );
}

DataTable.defaultProps = {
    selectionMode: SelectionMode.SINGLE
};

export { SelectionMode };

export default DataTable;