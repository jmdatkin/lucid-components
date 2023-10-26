import { MouseEventHandler, useRef } from "react";
import { DataTableCellClickHandler, DataTableRowClickHandler } from "../../types/data-table";
import DataTableCell from "./data-table-cell";

type DataTableBodyRowProps<D> = {
    columns?: any,
    selected: boolean,
    record: D,
    rowIndex: number,
    onCellClick?: DataTableCellClickHandler<D>,
    onRowClick?: DataTableRowClickHandler<D>
};

function DataTableBodyRow<D extends Record<string, any>>(props: DataTableBodyRowProps<D>) {

    const rowElementRef = useRef(null);

    const onRowClick: MouseEventHandler = (e) => {
        if (!props.onRowClick) return;
        props.onRowClick({
            originalEvent: e,
            element: e.currentTarget as HTMLTableRowElement,
            record: props.record,
            rowIndex: props.rowIndex
        });
    };

    const createContent = () => {
        return Object.values(props.record).map((column, idx) => {
            return (
                <DataTableCell record={props.record} value={column} rowIndex={props.rowIndex} cellIndex={idx} key={idx} onCellClick={props.onCellClick}
                ></DataTableCell>
            )
        })
    };

    return (
        <tr className={`lucid-datatable-row ${props.selected ? 'lucid-datatable-row-selected' : ''}`} ref={rowElementRef} onClick={onRowClick}>
           {createContent()} 
        </tr>
    );
}

export default DataTableBodyRow;