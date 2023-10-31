
import { CSSProperties, MouseEvent, MouseEventHandler, ReactElement } from "react"
import SortOrderIndicator, { SortMode } from "./sort-order-indicator"
import { DataTableColumnProps } from "./data-table-column"


type DataTableCheckboxHeaderCellProps = {
    style?: CSSProperties,
    checked: boolean,
    column: ReactElement<DataTableColumnProps>,
    onClick: MouseEventHandler,
}

const DataTableCheckboxHeaderCell: (props: DataTableCheckboxHeaderCellProps) => JSX.Element = (props) => {

    return (
        <th style={props.style} onClick={props.onClick}>
            <input type="checkbox" checked={props.checked} onChange={(e) => props.onClick(e as any)}></input>
        </th>
    )
}

export default DataTableCheckboxHeaderCell;