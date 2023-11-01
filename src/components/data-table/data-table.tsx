import React, { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import DataTableBody from "./data-table-body";
import DataTableHeaderProps from "./data-table-header";
import { DataTableColumnSortHandler, SortMode } from "./sort-order-indicator";
import { DataTableCellClickEvent, DataTableCellClickHandler, DataTableRowClickHandler, DataTableSelectionChangeHandler, SelectionMode } from "../../types/data-table";
import { localeComparator, resolveFieldData, sort } from "../../utils/util";
import { Filter, FilterMatchMode, applyFilter } from "../../services/filter-service";
import InputText from "../input-text";
import { DataTableColumnProps } from "./data-table-column";
import DataTableControls from "./data-table-controls";
import DataTableHeader from "./data-table-header";
import usePaginate from "../../hooks/usePaginate";
import Paginator from "./paginator";
import { FiFilter } from "react-icons/fi";

import '../../styles/DataTable.scss';
import DataTableFooter from "./data-table-footer";
import { BsFilter } from "react-icons/bs";


type DataTableProps<D> = {
    children: ReactNode,
    width?: number,
    data: D[],
    dataKey?: string,
    rows?: number,
    scrollable?: boolean,
    scrollHeight?: number | string,
    filters?: Filter[],
    selection: D[],
    selectionMode?: SelectionMode,
    onSelectionChange?: DataTableSelectionChangeHandler<D[]>,
    onCellClick?: DataTableCellClickHandler<D>,
    onRowClick?: DataTableRowClickHandler<D>,
    render_controls?: Function,
};


// TODO: Formalize data model, e.g. rowKey

function DataTable<D extends Record<string, any>>(props: DataTableProps<D>) {

    const [sortField, setSortField] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<SortMode>(SortMode.ASCENDING);

    const [filterInput, setFilterInput] = useState('');

    const [data_sorted, setData_sorted] = useState<typeof props.data>(props.data);
    const [data_filtered, setData_filtered] = useState<typeof props.data>(props.data);

    const {
        pageData: data_page,
        goNextPage,
        goPrevPage,
        goFirstPage,
        goLastPage,
        currentPage,
        setPage,
        numPages
    } = usePaginate(data_filtered, props.rows!);

    const [data_final, setData_final] = useState<typeof props.data>(props.data);


    const onSortChange: DataTableColumnSortHandler = (column, order, e) => {
        setSortOrder(order);
        setSortField(column);
    }

    const getColumns = () => {
        const columns = React.Children.toArray(props.children) as ReactElement<DataTableColumnProps>[];
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

    const createPaginatorDescription = () => {
        if (data_page.length === 0)
            return "0 to 0 of 0";
        else
            return `${currentPage * props.rows! + 1} to ${currentPage * props.rows! + data_page.length} of ${data_filtered.length}`;
    };

    const createHeader = () => {
        return (
            <DataTableHeader
                originalData={props.data}
                scrollable={props.scrollable}
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
                sortField={sortField}
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
        let result;
        if (props.filters && filterInput !== '') {
            result = applyFilter(data_sorted, filterInput, props.filters)
            // setData_filtered(applyFilter(data_sorted, filterInput, props.filters))
        } else //if (filterInput === '')
            result = data_sorted;
        // setData_filtered(data_sorted!);
        setData_filtered(result);

        // If not paginating, skip page data stage and use filtered data as final data
        if (!props.rows) {
            setData_final(result);
        }
    }, [data_sorted, filterInput])

    useEffect(() => {
        // If paginating, set final data
        if (props.rows)
            setData_final(data_page);
    }, [data_page])

    return (
        <>
            <div className="lucid-datatable" style={{ width: props.width }}>
                <DataTableControls
                    renderStart={() => {
                        return (
                            props.render_controls ? props.render_controls() : <></>
                        )
                    }}
                    renderEnd={() => {
                        return (
                            <InputText onChange={(e) => setFilterInput(e.currentTarget.value)} placeholder="Filter data" glyph={<FiFilter/>}></InputText>
                        )
                    }}></DataTableControls>
                <div className="lucid-datatable-table-wrapper" style={{ overflowX: 'auto', whiteSpace: 'nowrap', height: props.scrollable ? props.scrollHeight ? props.scrollHeight : 'auto' : 'auto' }}>
                    <table style={{ width: '100%' }}>
                        {createHeader()}
                        {createContent()}
                    </table>
                </div>
                <DataTableFooter>
                    {props.rows &&
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Paginator
                                numPages={numPages.current}
                                currentPage={currentPage}
                                onPrevPage={goPrevPage}
                                onNextPage={goNextPage}
                                goFirstPage={goFirstPage}
                                goLastPage={goLastPage}
                                setPage={setPage}
                            ></Paginator>
                            <span className="lucid-datatable-page-description" style={{ textAlign: "center" }}>
                                {createPaginatorDescription()}
                            </span>
                        </div>
                    }
                </DataTableFooter>
            </div>
        </>
    );
}

DataTable.defaultProps = {
    selectionMode: SelectionMode.SINGLE
};

export { SelectionMode };

export default DataTable;