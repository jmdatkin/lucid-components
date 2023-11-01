import React, { CSSProperties } from "react";
import { BsFiletypeJsx } from "react-icons/bs";

enum FieldDataType {
    String,
    Number,
    Date
};

type DataTableColumnProps = {
    header?: string,
    field?: string,
    dataType?: FieldDataType,
    style?: CSSProperties,
    selectionColumn?: boolean,
    renderContent?: (rowData: Record<string, any>) => JSX.Element
}

const DataTableColumn = (props: DataTableColumnProps) => {

    return (
        <></>
    );
}

DataTableColumn.defaultProps = {
    selectionColumn: false,
    dataType: FieldDataType.String
};

export type { DataTableColumnProps };
export default DataTableColumn;