import React, { CSSProperties } from "react";
import { BsFiletypeJsx } from "react-icons/bs";

type DataTableColumnProps = {
    header: string,
    field: string,
    style?: CSSProperties
};

const DataTableColumn = (props: DataTableColumnProps) => {

    return ( 
        <div style={props.style} className="lucid-datatable-column">

        </div>
     );
}

export type { DataTableColumnProps };
export default DataTableColumn;