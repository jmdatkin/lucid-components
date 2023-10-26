import React from "react";
import { BsFiletypeJsx } from "react-icons/bs";

type DataTableColumnProps = {
    header: string,
    field: string
};

const DataTableColumn = (props: DataTableColumnProps) => {

    return ( 
        <div className="lucid-datatable-column">

        </div>
     );
}

export type { DataTableColumnProps };
export default DataTableColumn;