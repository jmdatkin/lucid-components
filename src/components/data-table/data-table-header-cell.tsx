import { MouseEvent, MouseEventHandler, ReactElement } from "react"
import SortOrderIndicator, { SortMode } from "./sort-order-indicator"


type DataTableHeaderCellProps = {
    column: ReactElement,
    onClick: MouseEventHandler,
    order: SortMode,
    isSorted: boolean
}

const DataTableHeaderCell: (props: DataTableHeaderCellProps) => JSX.Element = (props) => {

    return (
        <td onClick={props.onClick}>
            <span>
                {props.column.props.header}
                {props.isSorted ?
                    <SortOrderIndicator order={props.order} /> : <></>
                }
            </span>
        </td>
    )
}

export default DataTableHeaderCell;