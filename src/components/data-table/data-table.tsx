import React, { ReactNode, useEffect, useRef, useState } from "react";
import DataTableBody from "./data-table-body";

import './DataTable.scss';
import DataTableHeader from "./data-table-header";
import { DataTableColumnSortHandler, SortMode } from "./sort-order-indicator";
import { DataTableData } from "../../types/data-table";
import { localeComparator, resolveFieldData, sort } from "../../utils/util";

type DataTableProps = {
    children: ReactNode,
    data: Object[],
};

function DataTable(props: DataTableProps) {

    const [sortField, setSortField] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<SortMode>(SortMode.ASCENDING);

    const [finalData, setFinalData] = useState(props.data);

    const onSortChange: DataTableColumnSortHandler = (column, order, e) => {
        setSortOrder(order);
        setSortField(column);
        setFinalData(sortSingle(props.data, column, order));
    }

    const getColumns = () => {
        const columns = React.Children.toArray(props.children);

        if (!columns) {
            return null;
        }

        return columns;
    };

    // From https://github.com/primefaces/primereact/blob/master/components/lib/datatable/DataTable.js
    const sortSingle = (data: DataTableData, field: string, order: SortMode) => {
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
            <DataTableHeader onSortChange={onSortChange} sortField={sortField} sortOrder={sortOrder} columns={getColumns()} data={props.data}>

            </DataTableHeader>
        )
    }

    const createContent = () => {
        return (
            <DataTableBody data={finalData}>

            </DataTableBody>
        )
    }

    const createColumns = () => {
        return getColumns()?.map(column => {
            return (<div></div>)
        })
    }

    useEffect(() => {

    }, [sortField, sortOrder]);

    return (
        <div className="lucid-datatable">
            {getColumns()}
            <table>
                {createHeader()}
                {createContent()}
            </table>
        </div>
    );
}

export default DataTable;