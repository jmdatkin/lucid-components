import { CSSProperties, MouseEventHandler, ReactElement, useRef } from "react";
import { DataTableCellClickHandler } from "../../types/data-table";
import { DataTableColumnProps } from "./data-table-column";

type DataTableCellProps<D> = {
    style?: CSSProperties,
    selected: boolean,
    column: ReactElement<DataTableColumnProps>,
    renderContent?: (rowData: D) => JSX.Element,
    value: any,
    sortField: string,
    record: D,
    rowIndex: number,
    cellIndex: number,
    onCellClick?: DataTableCellClickHandler<D>,
}

function DataTableCell<D extends Record<string, any>>(props: DataTableCellProps<D>) {

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

        <td onClick={onClick} ref={cellElementRef} className={`lucid-datatable-cell ${props.column.props.field === props.sortField ? 'lucid-datatable-cell-sorted' : ''} ${props.selected ? 'lucid-datatable-cell-selected' : ''}`} style={props.style}>
            {props.renderContent ? props.renderContent(props.record) : props.value}
        </td>
    );

}

export default DataTableCell;