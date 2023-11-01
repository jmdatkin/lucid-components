import { CSSProperties, ReactElement, useEffect, useState } from "react";
import { DataTableCellClickEvent, DataTableCellClickHandler, DataTableRowClickEvent, DataTableRowClickHandler, DataTableSelectionChangeHandler, SelectionMode } from "../../types/data-table";
import DataTableBodyRow from "./data-table-body-row";
import isEqual from "lodash/isEqual";
import { DataTableColumnProps } from "./data-table-column";

type DataTableBodyProps<D> = {
    originalData: D[],
    data: D[],
    style?: CSSProperties,
    columns: ReactElement<DataTableColumnProps>[],
    selectionMode?: SelectionMode,
    selection?: D[],
    sortField?: string,
    onSelectionChange?: DataTableSelectionChangeHandler<D[]>,
    onCellClick?: DataTableCellClickHandler<D>,
    onRowClick?: DataTableRowClickHandler<D>
}


function DataTableBody<D extends Record<string, any>>(props: DataTableBodyProps<D>) {

    const isSelected = (rowData: D) => {
        if (Array.isArray(props.selection)) {
            // Row data is in selection array
            return props.selection.findIndex((data) => isEqual(rowData, data)) > -1;
        } else {
            return isEqual(rowData, props.selection);
        }
    }

    const onRowClick = (e: DataTableRowClickEvent<D>) => {

        if (props.selection) {
            const isRowSelected = isSelected(e.record);

            if (!isRowSelected) {
                // Internal selection behavior
                let newSelection;
                if (props.selectionMode === SelectionMode.SINGLE) {
                    newSelection = [e.record];
                    if (props.onSelectionChange) {
                        props.onSelectionChange({
                            selection: newSelection
                        });
                    }
                }
                else if (props.selectionMode === SelectionMode.MULTIPLE) {
                    newSelection = [...props.selection, e.record]
                    if (props.onSelectionChange) {
                        props.onSelectionChange({
                            selection: newSelection
                        });
                    }
                }

            } else {
                if (props.selectionMode === SelectionMode.MULTIPLE) {
                    let selectionIdx = props.selection.indexOf(e.record);
                    let newSelection = [...props.selection]
                    newSelection.splice(selectionIdx, 1);


                    if (props.onSelectionChange) {
                        props.onSelectionChange({
                            selection: newSelection
                        });
                    }
                }
            }
        }

        // Row click callback passed down through props
        if (props.onRowClick)
            props.onRowClick(e);
    }

    const onCellClick = (e: DataTableCellClickEvent<D>) => {

        if (props.selection) {
            const isRowSelected = isSelected(e.record);

            if (e.column.props.selectionColumn) {
                if (props.selectionMode === SelectionMode.CHECKBOX) {
                    if (isRowSelected) {
                        let selectionIdx = props.selection.indexOf(e.record);
                        let newSelection = [...props.selection]
                        newSelection.splice(selectionIdx, 1);

                        if (props.onSelectionChange) {
                            props.onSelectionChange({
                                selection: newSelection
                            });
                        }

                    } else {
                        let newSelection = [...(props.selection as D[]), e.record]

                        if (props.onSelectionChange) {
                            props.onSelectionChange({
                                selection: newSelection
                            });
                        }
                    }
                }
            }
        }

        // Cell click callback passed down through props
        if (props.onCellClick)
            props.onCellClick(e);
    }

    const createContent = () => {
        if (props.data.length === 0) {
            return <tr>
                <td colSpan={props.columns?.length}>No records found!</td>
            </tr>
        } else {
            return props.data.map((record, idx) => {
                return (
                    <DataTableBodyRow
                        columns={props.columns}
                        selected={isSelected(record)}
                        selectionMode={props.selectionMode}
                        sortField={props.sortField}
                        onRowClick={onRowClick}
                        onCellClick={onCellClick}
                        rowIndex={idx}
                        key={idx}
                        record={record}
                    />
                )
            });
        }
    }

    return (
        <tbody style={props.style}>
            {createContent()}
        </tbody>
    );
}

export default DataTableBody;