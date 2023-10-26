import { SortMode } from "../components/data-table/sort-order-indicator";
import isEqual from "lodash/isEqual";

// From https://github.com/primefaces/primereact/blob/master/components/lib/utils/ObjectUtils.js#L409
const localeComparator = (locale: string | string[]) => {
    return new Intl.Collator(locale, { numeric: true }).compare;

}

const isEmpty = (value: any) => {
    return value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0) || (!(value instanceof Date) && typeof value === 'object' && Object.keys(value).length === 0);
}

const equals = (obj1: any, obj2: any) => {
    return isEqual(obj1,  obj2);
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


export {
    localeComparator,
    sort,
    isEmpty,
    compare,
    resolveFieldData
};