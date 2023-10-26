import React, { MouseEvent, useRef, useState } from "react";
import { BsSortDownAlt, BsSortUpAlt } from "react-icons/bs";
import DataTableColumn from "./data-table-column";

enum SortMode {
    ASCENDING,
    DESCENDING
};

type DataTableColumnSortHandler = (field: string, order: SortMode, originalEvent: MouseEvent) => void;

const SortOrderIndicator: (props: {order: SortMode}) => JSX.Element = ({order}) => {

    return (
        <span>
            {order === SortMode.ASCENDING ? <BsSortUpAlt /> : <BsSortDownAlt />}
        </span>
    );
}

export { SortMode };
export type { DataTableColumnSortHandler };

export default SortOrderIndicator;