import { MouseEvent, ReactElement, ReactNode } from "react";
import SortOrderIndicator, { DataTableColumnSortHandler, SortMode } from "./sort-order-indicator";
import DataTableColumn, { DataTableColumnProps } from "./data-table-column";
import DataTableHeaderCell from "./data-table-header-cell";

type DataTableHeader = {
    columns: ReactElement<DataTableColumnProps>[] | null,
    data: Object,
    sortField: string,
    sortOrder: SortMode,
    onSortChange: DataTableColumnSortHandler
};

function DataTableHeader(props: DataTableHeader) {

    const createCell = (column: ReactElement<DataTableColumnProps>, index: number) => {
        const isColumnSorted = column.props.field === props.sortField;
        const columnSortOrder = isColumnSorted ? props.sortOrder : SortMode.ASCENDING;

        const cellClickHandler = (e: MouseEvent) => {
            // Handle user onClick
            console.log(column.props.field);
            
            // Sort by ascending by default, otherwise toggle
            let newSortOrder: SortMode;
            if (isColumnSorted) {
                newSortOrder = props.sortOrder === SortMode.ASCENDING ? SortMode.DESCENDING : SortMode.ASCENDING;
            } else {
                newSortOrder = SortMode.ASCENDING;
            }

            props.onSortChange(column.props.field, newSortOrder, e);
        }

        const cell = <DataTableHeaderCell key={index} column={column} isSorted={isColumnSorted} order={props.sortOrder} onClick={cellClickHandler}></DataTableHeaderCell>

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