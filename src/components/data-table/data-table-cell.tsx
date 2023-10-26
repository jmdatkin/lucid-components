import { MouseEventHandler, ReactFragment, useRef } from "react";

type DataTableCellProps<D> = {
    value: any,
    record: D,
    rowIndex: number,
    cellIndex: number,
    onCellClick: Function,
    render?: Function
}

function DataTableCell<D extends Record<string, any>>(props: DataTableCellProps<D>) {

    const cellElementRef = useRef(null);

    const onClick: MouseEventHandler<HTMLTableCellElement> = (e) => {
        props.onCellClick(
            {
                originalEvent: e,
                record: props.record,
                rowIndex: props.rowIndex,
                cellIndex: props.cellIndex,
                element: cellElementRef.current
            });
    };

    return (
        <td onClick={onClick} ref={cellElementRef} className="lucid-datatable-cell">
            {props.value}
        </td>
    );
}

export default DataTableCell;