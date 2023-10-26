import { MouseEventHandler, useRef } from "react";
import { DataTableRowClickEvent } from "../../types/data-table";
import DataTableCell from "./data-table-cell";

type DataTableBodyRowProps = {
    columns?: any,
    selected: boolean,
    record: Object,
    rowIndex: number,
    onCellClick?: Function,
    onRowClick?: Function
};

function DataTableBodyRow(props: DataTableBodyRowProps) {

    const rowElementRef = useRef(null);

    const onRowClick: MouseEventHandler = (e) => {
        if (!props.onRowClick) return;
        props.onRowClick({
            originalEvent: e,
            element: e.currentTarget,
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