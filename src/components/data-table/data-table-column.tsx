import React, { CSSProperties } from "react";
import { BsFiletypeJsx } from "react-icons/bs";

type DataTableColumnProps = {
    header: string,
    field: string,
    style?: CSSProperties,
    renderContent?: (rowData: Record<string, any>) => JSX.Element
}

// function DataTableColumn<D extends Record<string, any>>(props: DataTableColumnProps<D>) {
    const DataTableColumn = (props: DataTableColumnProps) => {

    return (
        <></>
    );
}

export type { DataTableColumnProps };
export default DataTableColumn;