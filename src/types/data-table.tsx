import { MouseEvent, ReactElement, Ref } from "react";
import { DataTableColumnProps } from "../components/data-table/data-table-column";

type DataTableData = Object[];

type DataTableCellClickEvent<D> = {
    originalEvent: MouseEvent,
    column: ReactElement<DataTableColumnProps>,
    record: D,
    rowIndex: number,
    cellIndex: number,
    element: HTMLTableCellElement
}

type DataTableCellClickHandler<D> = (e: DataTableCellClickEvent<D>) => void;

type DataTableRowClickEvent<D> = {
    originalEvent: MouseEvent,
    record: D,
    rowIndex: number,
    element: HTMLTableRowElement
}

type DataTableRowClickHandler<D> = (e: DataTableRowClickEvent<D>) => void;

type DataTableSelectionChangeEvent<D> = {
    selection: D,
}

type DataTableSelectionChangeHandler<D> = (e: DataTableSelectionChangeEvent<D>) => void;

export type {
    DataTableData,
    DataTableCellClickEvent,
    DataTableCellClickHandler,
    DataTableRowClickEvent,
    DataTableRowClickHandler,
    DataTableSelectionChangeEvent,
    DataTableSelectionChangeHandler
};