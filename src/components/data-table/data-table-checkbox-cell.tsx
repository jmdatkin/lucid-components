import { CSSProperties, MouseEventHandler, ReactElement, useRef } from "react";
import { DataTableCellClickHandler } from "../../types/data-table";
import { DataTableColumnProps } from "./data-table-column";

type DataTableCheckboxCellProps<D> = {
    style?: CSSProperties,
    selected: boolean,
    column: ReactElement<DataTableColumnProps>,
    renderContent?: (rowData: D) => JSX.Element,
    record: D,
    rowIndex: number,
    cellIndex: number,
    onCellClick?: DataTableCellClickHandler<D>,
}

function DataTableCheckboxCell<D extends Record<string, any>>(props: DataTableCheckboxCellProps<D>) {

    const cellElementRef = useRef(null);

    const onClick: MouseEventHandler<HTMLTableCellElement> = (e) => {
        if (!props.onCellClick) return;
        props.onCellClick(
            {
                originalEvent: e,
                column: props.column,
                record: props.record,
                rowIndex: props.rowIndex,
                cellIndex: props.cellIndex,
                element: e.currentTarget as HTMLTableCellElement
            });
    };

    return (
        <td onClick={onClick} style={props.style}>
            <input type="checkbox" checked={props.selected} onChange={(e) => onClick(e as any)}></input>
        </td>
    )

}

export default DataTableCheckboxCell;