import { useEffect, useState } from "react";
import { DataTableCellClickEvent, DataTableCellClickHandler, DataTableRowClickEvent, DataTableRowClickHandler } from "../../types/data-table";
import { SelectionMode } from "./data-table";
import DataTableBodyRow from "./data-table-body-row";
import { isEqual } from "lodash";

type DataTableBodyProps = {
    data: Object[],
    selectionMode: SelectionMode,
    onSelectionChange: Function,
    onCellClick?: DataTableCellClickHandler,
    onRowClick?: DataTableRowClickHandler
}


function DataTableBody(props: DataTableBodyProps) {

    const [selected, setSelected] = useState<typeof props.data | (typeof props.data)[]>([]);

    // Call callback when internal selection array changed
    useEffect(() => {
        if (!props.onSelectionChange) return;
        props.onSelectionChange({
            selected
        });
    }, [selected])

    const isSelected = (rowData) => {
        if (Array.isArray(selected)) {
            // Row data is in selection array
            return selected.findIndex((data) => isEqual(rowData, data)) > -1;
        } else {
            return isEqual(rowData, selected);
        }
    }

    const onRowClick = (e: DataTableRowClickEvent) => {

        const isRowSelected = isSelected(e.record);
        if (!isRowSelected) {
            // Internal selection behavior
            setSelected((prev) => {
                if (props.selectionMode === SelectionMode.SINGLE) {
                    return e.record;
                }
                else if (props.selectionMode === SelectionMode.MULTIPLE) {

                    return [...prev, e.record];
                }
                else
                    throw new Error("Selection mode not properly defined.");
            });
        }

        // Row click callback passed down through props
        if (props.onRowClick)
            props.onRowClick(e);
    }

    const onCellClick = (e: DataTableCellClickEvent) => {
        // Cell click callback passed down through props
        props.onCellClick(e);
    }

    const createContent = () => {
        return props.data.map((record, idx) => {
            return (
                <DataTableBodyRow
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