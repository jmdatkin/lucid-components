import { useEffect, useState } from "react";
import { DataTableCellClickEvent, DataTableCellClickHandler, DataTableRowClickEvent, DataTableRowClickHandler, DataTableSelectionChangeHandler } from "../../types/data-table";
import { SelectionMode } from "./data-table";
import DataTableBodyRow from "./data-table-body-row";
import { isEqual } from "lodash";

type DataTableBodyProps<D> = {
    data: D[],
    selectionMode: SelectionMode,
    onSelectionChange: DataTableSelectionChangeHandler<D | D[]>,
    onCellClick?: DataTableCellClickHandler<D>,
    onRowClick?: DataTableRowClickHandler<D>
}


function DataTableBody<D extends Record<string, any>>(props: DataTableBodyProps<D>) {

    const [selected, setSelected] = useState<D | D[]>([]);

    // Call callback when internal selection array changed
    useEffect(() => {
        if (!props.onSelectionChange) return;
        props.onSelectionChange({
            selected
        });
    }, [selected])

    const isSelected = (rowData: D) => {
        if (Array.isArray(selected)) {
            // Row data is in selection array
            return selected.findIndex((data) => isEqual(rowData, data)) > -1;
        } else {
            return isEqual(rowData, selected);
        }
    }

    const onRowClick = (e: DataTableRowClickEvent<D>) => {

        const isRowSelected = isSelected(e.record);
        if (!isRowSelected) {
            // Internal selection behavior
            setSelected((prev) => {
                if (props.selectionMode === SelectionMode.SINGLE) {
                    return e.record;
                }
                else if (props.selectionMode === SelectionMode.MULTIPLE) {
                    return [...(prev as D[]), e.record];
                }
                else
                    throw new Error("Selection mode not properly defined.");
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