import { CSSProperties, MouseEventHandler, ReactElement, useRef } from "react";
import { DataTableCellClickHandler, DataTableRowClickHandler, SelectionMode } from "../../types/data-table";
import DataTableCell from "./data-table-cell";
import { columnRefersToField, getColumnByField } from "../../utils/util";
import { DataTableColumnProps } from "./data-table-column";
import DataTableCheckboxCell from "./data-table-checkbox-cell";

type DataTableBodyRowProps<D> = {
    style?: CSSProperties,
    columns: ReactElement<DataTableColumnProps>[],
    selected: boolean,
    selectionMode: SelectionMode,
    sortField: string,
    record: D,
    rowIndex: number,
    onCellClick?: DataTableCellClickHandler<D>,
    onRowClick?: DataTableRowClickHandler<D>
};

function DataTableBodyRow<D extends Record<string, any>>(props: DataTableBodyRowProps<D>) {

    const rowElementRef = useRef(null);

    const onRowClick: MouseEventHandler = (e) => {
        if (!props.onRowClick) return;
        props.onRowClick({
            originalEvent: e,
            element: e.currentTarget as HTMLTableRowElement,
            record: props.record,
            rowIndex: props.rowIndex
        });
    };

    const createContent = () => {
        return Array.from(props.columns).map((column, idx) => {

            // Column with data
            if (column.props.field && !column.props.selectionColumn) {
                const data = props.record[column.props.field];
                const cellStyle = column?.props.style;
                const cellRenderFxn = column?.props.renderContent;

                return (
                    <DataTableCell
                        selected={props.selected}
                        column={column}
                        sortField={props.sortField}
                        style={cellStyle}
                        renderContent={cellRenderFxn}
                        record={props.record}
                        value={data}
                        rowIndex={props.rowIndex}
                        cellIndex={idx} key={idx}
                        onCellClick={props.onCellClick}
                    ></DataTableCell>
                )

            } else if (column.props.selectionColumn) {

                const cellStyle = column?.props.style;
                const cellRenderFxn = column?.props.renderContent;

                return (
                    <DataTableCheckboxCell
                        selected={props.selected}
                        column={column}
                        style={cellStyle}
                        renderContent={cellRenderFxn}
                        record={props.record}
                        rowIndex={props.rowIndex}
                        cellIndex={idx} key={idx}
                        onCellClick={props.onCellClick}
                    ></DataTableCheckboxCell>
                )
            }
        })

        return Object.entries(props.record).map(([field, data], idx) => {

            const column = getColumnByField(props.columns, field)!;

            const cellStyle = column?.props.style;
            const cellRenderFxn = column?.props.renderContent;

            return (
                <DataTableCell
                    selected={props.selected}
                    column={column}
                    style={cellStyle}
                    renderContent={cellRenderFxn}
                    record={props.record}
                    value={data}
                    rowIndex={props.rowIndex}
                    cellIndex={idx} key={idx}
                    onCellClick={props.onCellClick}
                ></DataTableCell>
            )
        })
    };

    return (
        <tr className={`lucid-datatable-row ${props.selected ? 'lucid-datatable-row-selected' : ''}`} style={props.style} ref={rowElementRef} onClick={onRowClick}>
            {createContent()}
        </tr>
    );
}

export default DataTableBodyRow;