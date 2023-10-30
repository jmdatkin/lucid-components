import React, { ReactElement } from "react";
import { SortMode } from "../components/data-table/sort-order-indicator";
import isEqual from "lodash/isEqual";
import { DataTableColumnProps } from "../components/data-table/data-table-column";

// From https://github.com/primefaces/primereact/blob/master/components/lib/utils/ObjectUtils.js#L409
const localeComparator = (locale: string | string[]) => {
    return new Intl.Collator(locale, { numeric: true }).compare;
}

const columnRefersToField = (column: ReactElement<DataTableColumnProps>) => {
    return column.props.field && !column.props.selectionColumn;
};

const getColumnByField = (columns: ReactElement<DataTableColumnProps>[], field: string) => {
    const filteredColumns = Array.from(columns).filter((column) => {
        return column.props.field === field;
    });

    if (filteredColumns.length < 1)
        return null;

    return filteredColumns[0];
};

const isEmpty = (value: any) => {
    return value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0) || (!(value instanceof Date) && typeof value === 'object' && Object.keys(value).length === 0);
}

const equals = (obj1: any, obj2: any) => {
    return isEqual(obj1, obj2);
};


const compare = (value1: any, value2: any, comparator: Function, order = 1) => {
    let result = -1;
    const emptyValue1 = isEmpty(value1);
    const emptyValue2 = isEmpty(value2);

    if (emptyValue1 && emptyValue2) result = 0;
    else if (emptyValue1) result = order;
    else if (emptyValue2) result = -order;
    else if (typeof value1 === 'string' && typeof value2 === 'string') result = comparator(value1, value2);
    else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

    return result;
}

// From https://github.com/primefaces/primereact/blob/master/components/lib/utils/ObjectUtils.js#L409
const sort = (value1: any, value2: any, order = 1, comparator: Function, nullSortOrder = 1) => {
    const orderMultiple = order === SortMode.ASCENDING ? 1 : -1
    const result = compare(value1, value2, comparator, order);
    let finalSortOrder = orderMultiple;

    // nullSortOrder == 1 means Excel like sort nulls at bottom
    if (isEmpty(value1) || isEmpty(value2)) {
        finalSortOrder = nullSortOrder === 1 ? order : nullSortOrder;
    }

    return finalSortOrder * result;
}

const resolveFieldData = (data: any, field: string | Function) => {
    if (!data || !field) {
        // short circuit if there is nothing to resolve
        return null;
    }

    try {
        const value = data[field as string];

        if (!isEmpty(value)) return value;
    } catch {
        // Performance optimization: https://github.com/primefaces/primereact/issues/4797
        // do nothing and continue to other methods to resolve field data
    }

    if (Object.keys(data).length) {
        if (typeof field === 'function') {
            return field(data);
        } else if (!isEmpty(data[field])) {
            return data[field];
        } else if (field.indexOf('.') === -1) {
            return data[field];
        } else {
            let fields = field.split('.');
            let value = data;

            for (var i = 0, len = fields.length; i < len; ++i) {
                if (value == null) {
                    return null;
                }

                value = value[fields[i]];
            }

            return value;
        }
    }

    return null;
}

const removeAccents = (str: string) => {
    if (str && str.search(/[\xC0-\xFF]/g) > -1) {
        str = str
            .replace(/[\xC0-\xC5]/g, 'A')
            .replace(/[\xC6]/g, 'AE')
            .replace(/[\xC7]/g, 'C')
            .replace(/[\xC8-\xCB]/g, 'E')
            .replace(/[\xCC-\xCF]/g, 'I')
            .replace(/[\xD0]/g, 'D')
            .replace(/[\xD1]/g, 'N')
            .replace(/[\xD2-\xD6\xD8]/g, 'O')
            .replace(/[\xD9-\xDC]/g, 'U')
            .replace(/[\xDD]/g, 'Y')
            .replace(/[\xDE]/g, 'P')
            .replace(/[\xE0-\xE5]/g, 'a')
            .replace(/[\xE6]/g, 'ae')
            .replace(/[\xE7]/g, 'c')
            .replace(/[\xE8-\xEB]/g, 'e')
            .replace(/[\xEC-\xEF]/g, 'i')
            .replace(/[\xF1]/g, 'n')
            .replace(/[\xF2-\xF6\xF8]/g, 'o')
            .replace(/[\xF9-\xFC]/g, 'u')
            .replace(/[\xFE]/g, 'p')
            .replace(/[\xFD\xFF]/g, 'y');
    }

    return str;
}


export {
    getColumnByField,
    columnRefersToField,
    localeComparator,
    sort,
    isEmpty,
    compare,
    resolveFieldData,
    removeAccents
};