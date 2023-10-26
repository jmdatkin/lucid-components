import { MouseEventHandler, useRef } from "react";
import { DataTableCellClickHandler } from "../../types/data-table";

type DataTableCellProps<D> = {
    value: any,
    record: D,
    rowIndex: number,
    cellIndex: number,
    onCellClick?: DataTableCellClickHandler<D>,
    render?: Function
}

function DataTableCell<D extends Record<string, any>>(props: DataTableCellProps<D>) {

    const cellElementRef = useRef(null);

    const onClick: MouseEventHandler<HTMLTableCellElement> = (e) => {
        if (!props.onCellClick) return;
        props.onCellClick(
            {
                originalEvent: e,
                record: props.record,
                rowIndex: props.rowIndex,
                cellIndex: props.cellIndex,
                element: e.currentTarget as HTMLTableCellElement
            });
    };

    return (
        <td onClick={onClick} ref={cellElementRef} className="lucid-datatable-cell">
            {props.value}
        </td>
    );
}

export default DataTableCell;