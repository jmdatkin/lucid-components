import { ReactFragment } from "react";

type DataTableCellProps = {
    value: any,
    render?: Function
}

function DataTableCell(props: DataTableCellProps) {
    return (
        <td className="lucid-datatable-cell">
            {props.value}
        </td>
    );
}

export default DataTableCell;