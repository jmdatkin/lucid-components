
import { CSSProperties, MouseEvent, MouseEventHandler, ReactElement, useEffect, useRef } from "react"
import SortOrderIndicator, { SortMode } from "./sort-order-indicator"
import { DataTableColumnProps } from "./data-table-column"


type DataTableCheckboxHeaderCellProps = {
    style?: CSSProperties,
    indeterminate: boolean,
    checked: boolean,
    column: ReactElement<DataTableColumnProps>,
    onClick: MouseEventHandler,
}

const DataTableCheckboxHeaderCell: (props: DataTableCheckboxHeaderCellProps) => JSX.Element = (props) => {

    const cellElementRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (cellElementRef.current)
            cellElementRef.current.indeterminate = props.indeterminate;
    }, [props.indeterminate])

    return (
        <th style={props.style} onClick={props.onClick}>
            <input ref={cellElementRef} type="checkbox" checked={props.checked} onChange={(e) => props.onClick(e as any)}></input>
        </th>
    )
}

export default DataTableCheckboxHeaderCell;