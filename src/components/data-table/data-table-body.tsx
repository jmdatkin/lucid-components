import { ReactElement, useEffect, useState } from "react";
import { DataTableCellClickEvent, DataTableCellClickHandler, DataTableRowClickEvent, DataTableRowClickHandler, DataTableSelectionChangeHandler } from "../../types/data-table";
import { SelectionMode } from "./data-table";
import DataTableBodyRow from "./data-table-body-row";
import isEqual from "lodash/isEqual";
import { DataTableColumnProps } from "./data-table-column";

type DataTableBodyProps<D> = {
    data: D[],
    columns?: ReactElement<DataTableColumnProps>[],
    selectionMode?: SelectionMode,
    selection: D | D[],
    onSelectionChange?: DataTableSelectionChangeHandler<D[]>,
    onCellClick?: DataTableCellClickHandler<D>,
    onRowClick?: DataTableRowClickHandler<D>
}


function DataTableBody<D extends Record<string, any>>(props: DataTableBodyProps<D>) {

    // const [selected, setSelected] = useState<D | D[]>([]);

    // Call callback when internal selection array changed
    // useEffect(() => {
    // }, [selected])

    const isSelected = (rowData: D) => {
        if (Array.isArray(props.selection)) {
            // Row data is in selection array
            return props.selection.findIndex((data) => isEqual(rowData, data)) > -1;
        } else {
            return isEqual(rowData, props.selection);
        }
    }

    const onRowClick = (e: DataTableRowClickEvent<D>) => {

        const isRowSelected = isSelected(e.record);
        if (!isRowSelected) {
            // Internal selection behavior
            let newSelection;
            // setSelected((prev) => {
            if (props.selectionMode === SelectionMode.SINGLE) {
                newSelection = [e.record];
                // return e.record;
            }
            else if (props.selectionMode === SelectionMode.MULTIPLE) {
                newSelection = [...(props.selection as D[]), e.record]
                // return [...(prev as D[]), e.record];
            }
            else
                throw new Error("Selection mode not properly defined.");

            if (!props.onSelectionChange) return;
            props.onSelectionChange({
                selection: newSelection
            });

        }

        // Row click callback passed down through props
        if (props.onRowClick)
            props.onRowClick(e);
    }

    const onCellClick = (e: DataTableCellClickEvent<D>) => {
        // Cell click callback passed down through props
        if (props.onCellClick)
            props.onCellClick(e);
    }

    const createContent = () => {
        return props.data.map((record, idx) => {
            return (
                <DataTableBodyRow
                    columns={props.columns}
                    selected={isSelected(record)}
                    onRowClick={onRowClick}
                    onCellClick={onCellClick}
                    rowIndex={idx}
                    key={idx}
                    record={record}
                />
            )
        })
    }

    return (
        <tbody>
            {createContent()}
        </tbody>
    );
}

export default DataTableBody;