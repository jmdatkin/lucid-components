import { MouseEventHandler, ReactFragment, useRef } from "react";

type DataTableCellProps = {
    value: any,
    record: Record<string, any>,
    rowIndex: number,
    cellIndex: number,
    onCellClick: Function,
    render?: Function
}

function DataTableCell(props: DataTableCellProps) {

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