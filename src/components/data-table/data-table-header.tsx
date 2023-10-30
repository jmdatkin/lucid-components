import { MouseEvent, MouseEventHandler, ReactElement, ReactNode } from "react";
import SortOrderIndicator, { DataTableColumnSortHandler, SortMode } from "./sort-order-indicator";
import DataTableColumn, { DataTableColumnProps } from "./data-table-column";
import DataTableHeaderCell from "./data-table-header-cell";
import { SelectionMode } from "./data-table";

type DataTableHeaderProps<D> = {
    columns?: ReactElement<DataTableColumnProps>[],
    data: D[],
    sortField: string | null,
    sortOrder: SortMode,
    selectionMode?: SelectionMode,
    onSortChange: DataTableColumnSortHandler
};

function DataTableHeader<D extends Record<string, any>>(props: DataTableHeaderProps<D>) {

    const createCell = (column: ReactElement<DataTableColumnProps>, index: number) => {
        const isColumnSorted = column.props.field === props.sortField;

        const cellClickHandler: MouseEventHandler = (e) => {
            if (column.props.field) {

                // Sort by ascending by default, otherwise toggle
                let newSortOrder: SortMode;
                if (isColumnSorted) {
                    newSortOrder = props.sortOrder === SortMode.ASCENDING ? SortMode.DESCENDING : SortMode.ASCENDING;
                } else {
                    newSortOrder = SortMode.ASCENDING;
                }

                props.onSortChange(column.props.field, newSortOrder, e);
            }
        }

        let cell;

        if (column.props.selectionColumn) {
            if (props.selectionMode === SelectionMode.CHECKBOX) {
                cell = <DataTableHeaderCell
                    key={index}
                    column={column}
                    isSorted={isColumnSorted}
                    order={props.sortOrder}
                    onClick={cellClickHandler}
                    style={column.props.style}
                />
            } else {
                cell = <></>
            }
        } else {
            cell = <DataTableHeaderCell
                key={index}
                column={column}
                isSorted={isColumnSorted}
                order={props.sortOrder}
                onClick={cellClickHandler}
                style={column.props.style}
            />
        }


        return cell;
    }

    const createCells = () => {
        return (
            props.columns!.map((column, idx) => {
                return createCell(column, idx);
            })
        );
    }

    return (
        <thead className="lucid-datatable-header">
            <tr>
                {createCells()}
            </tr>
        </thead>
    );
}

export default DataTableHeader;