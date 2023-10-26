import { MouseEvent, Ref } from "react";

type DataTableData = Object[];

type DataTableCellClickEvent = {
    originalEvent: MouseEvent,
    record: Record<string, any>,
    rowIndex: number,
    cellIndex: number,
    element: HTMLTableCellElement
}

type DataTableCellClickHandler = (e: DataTableCellClickEvent) => void;

type DataTableRowClickEvent = {
    originalEvent: MouseEvent,
    record: Record<string, any>,
    rowIndex: number,
    element: HTMLTableRowElement
}

type DataTableRowClickHandler = (e: DataTableRowClickEvent) => void;

type DataTableSelectionChangeEvent = {
    selected: [],
}

export type {
    DataTableData,
    DataTableCellClickEvent,
    DataTableCellClickHandler,
    DataTableRowClickEvent,
    DataTableRowClickHandler,
    DataTableSelectionChangeEvent
};