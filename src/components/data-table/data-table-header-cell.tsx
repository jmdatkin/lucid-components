import { CSSProperties, MouseEvent, MouseEventHandler, ReactElement } from "react"
import SortOrderIndicator, { SortMode } from "./sort-order-indicator"
import { DataTableColumnProps } from "./data-table-column"


type DataTableHeaderCellProps = {
    style?: CSSProperties,
    column: ReactElement<DataTableColumnProps>,
    onClick: MouseEventHandler,
    order: SortMode,
    isSorted: boolean
}

const DataTableHeaderCell: (props: DataTableHeaderCellProps) => JSX.Element = (props) => {

    return (
        <th style={props.style} onClick={props.onClick}>
            <span>
                {props.column.props.header}
                {props.isSorted ?
                    <SortOrderIndicator order={props.order} /> : <></>
                }
            </span>
        </th>
    )
}

export default DataTableHeaderCell;