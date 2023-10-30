import { removeAccents, resolveFieldData } from "../utils/util";

interface Filter {
    field: string,
    matchMode: FilterMatchMode
}

type FilterValue = string & Date;

enum FilterMatchMode {
    CONTAINS,
    STARTS_WITH,
    NOT_CONTAINS,
    ENDS_WITH,
    EQUALS,
    NOT_EQUALS,
    IN,
    BETWEEN,
    LESS_THAN,
    LESS_THAN_EQUAL_TO,
    GREATER_THAN,
    GREATER_THAN_EQUAL_TO,
    DATE_IS,
    DATE_IS_NOT,
    DATE_BEFORE,
    DATE_AFTER
};

const applyFilter = (data: any[], filterValue: FilterValue, filters: Filter[]) => {
    return data.filter((record) => {

        // Array of filters
        if (Array.isArray(filters)) {
            let match = false;

            // Iterate over filters and test all of them
            filters.forEach((_filter) => {
                const comparedField = resolveFieldData(record, _filter.field);
                const result = FILTER_MAP[_filter.matchMode](comparedField, filterValue) ?? false;
                match ||= result;
                // Apply OR operation to every filter
            });
            return match;
        }

        // // Single filter
        // else {
        //     const comparedField = resolveFieldData(record, filter.field);
        //     return FILTER_MAP[filter.matchMode](comparedField, filterValue as string);
        // }

    });
};

// Based off of https://github.com/primefaces/primereact/blob/master/components/lib/api/FilterService.js
const startsWith = (value: string, filter: string) => {
    if (filter === undefined || filter === null || filter.trim() === '') {
        return true;
    }

    if (value === undefined || value === null) {
        return false;
    }

    // let filterValue = removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
    // let stringValue = removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
    let filterValue = removeAccents(filter).toLowerCase();
    let stringValue = removeAccents(value).toLowerCase();

    return stringValue.slice(0, filterValue.length) === filterValue;
};

const contains = (value: string, filter: string) => {
    if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
        return true;
    }

    if (value === undefined || value === null) {
        return false;
    }

    let filterValue = removeAccents(filter).toLowerCase();
    let stringValue = removeAccents(value).toLowerCase();

    return stringValue.indexOf(filterValue) !== -1;
};

const notContains = (value: string, filter: string) => {
    if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
        return true;
    }

    if (value === undefined || value === null) {
        return false;
    }

    let filterValue = removeAccents(filter).toLowerCase();
    let stringValue = removeAccents(value).toLowerCase();

    return stringValue.indexOf(filterValue) === -1;
};

const endsWith = (value: string, filter: string) => {
    if (filter === undefined || filter === null || filter.trim() === '') {
        return true;
    }

    if (value === undefined || value === null) {
        return false;
    }

    let filterValue = removeAccents(filter).toLowerCase();
    let stringValue = removeAccents(value).toLowerCase();

    return stringValue.indexOf(filterValue, stringValue.length - filterValue.length) !== -1;
};

const equals = (value: unknown, filter: unknown) => {
    if (typeof value === 'string' && typeof filter === 'string') {
        if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
            return true;
        }

        if (value === undefined || value === null) {
            return false;
        }

        return removeAccents(value).toLowerCase() === removeAccents(filter).toLowerCase();
    } else if (value instanceof Date && filter instanceof Date)
        return value.getTime() === filter.getTime();
    else
        throw new Error("Input and filter must be of the same type");
};


const notEquals = (value: unknown, filter: unknown) => {
    if (typeof value === 'string' && typeof filter === 'string') {
        if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
            return true;
        }

        if (value === undefined || value === null) {
            return true;
        }

        return removeAccents(value).toLowerCase() !== removeAccents(filter).toLowerCase();
    } else if (value instanceof Date && filter instanceof Date)
        return value.getTime() !== filter.getTime();
    else
        throw new Error("Input and filter must be of the same type");
};

const _in = (value: string, filter: string) => {
    if (filter === undefined || filter === null || filter.length === 0) {
        return true;
    }

    for (let i = 0; i < filter.length; i++) {
        if (equals(value, filter[i])) {
            return true;
        }
    }

    return false;
};


const between = (value: unknown, filter: unknown) => {
    if (typeof value === 'string' && typeof filter === 'string') {
        if (filter == null || filter[0] == null || filter[1] == null) {
            return true;
        }

        if (value === undefined || value === null) {
            return false;
        }
    } else if (value instanceof Date && filter[0] instanceof Date)
        return filter[0].getTime() <= value.getTime() && value.getTime() <= filter[1].getTime();
    else
        throw new Error("Input and filter must be of the same type");
};

const lt = (value: unknown, filter: unknown) => {
    if (filter === undefined || filter === null) {
        return true;
    }

    if (value === undefined || value === null) {
        return false;
    }

    if (value instanceof Date && filter instanceof Date)
        return value.getTime() < filter.getTime();

    return value < filter;
};

const lte = (value: unknown, filter: unknown) => {
    if (filter === undefined || filter === null) {
        return true;
    }

    if (value === undefined || value === null) {
        return false;
    }

    if (value instanceof Date && filter instanceof Date)
        return value.getTime() <= filter.getTime();

    return value <= filter;
};

const gt = (value: unknown, filter: unknown) => {
    if (filter === undefined || filter === null) {
        return true;
    }

    if (value === undefined || value === null) {
        return false;
    }

    if (value instanceof Date && filter instanceof Date)
        return value.getTime() > filter.getTime();

    return value > filter;
};

const gte = (value: unknown, filter: unknown) => {
    if (filter === undefined || filter === null) {
        return true;
    }

    if (value === undefined || value === null) {
        return false;
    }

    if (value instanceof Date && filter instanceof Date)
        return value.getTime() >= filter.getTime();

    return value >= filter;
};

const dateIs = (value: Date, filter: Date) => {
    if (filter === undefined || filter === null) {
        return true;
    }

    if (value === undefined || value === null) {
        return false;
    }

    return value.toDateString() === filter.toDateString();
};

const dateIsNot = (value: Date, filter: Date) => {
    if (filter === undefined || filter === null) {
        return true;
    }

    if (value === undefined || value === null) {
        return false;
    }

    return value.toDateString() !== filter.toDateString();
};

const dateBefore = (value: Date, filter: Date) => {
    if (filter === undefined || filter === null) {
        return true;
    }

    if (value === undefined || value === null) {
        return false;
    }

    return value.getTime() < filter.getTime();
};

const dateAfter = (value: Date, filter: Date) => {
    if (filter === undefined || filter === null) {
        return true;
    }

    if (value === undefined || value === null) {
        return false;
    }

    return value.getTime() > filter.getTime();
};

const FILTER_MAP = {
    [FilterMatchMode.STARTS_WITH]: startsWith,
    [FilterMatchMode.CONTAINS]: contains,
    [FilterMatchMode.NOT_CONTAINS]: notContains,
    [FilterMatchMode.ENDS_WITH]: endsWith,
    [FilterMatchMode.EQUALS]: equals,
    [FilterMatchMode.NOT_EQUALS]: notEquals,
    [FilterMatchMode.IN]: _in,
    [FilterMatchMode.BETWEEN]: between,
    [FilterMatchMode.LESS_THAN]: lt,
    [FilterMatchMode.LESS_THAN_EQUAL_TO]: lte,
    [FilterMatchMode.GREATER_THAN]: gt,
    [FilterMatchMode.GREATER_THAN_EQUAL_TO]: gte,
    [FilterMatchMode.DATE_IS]: dateIs,
    [FilterMatchMode.DATE_IS_NOT]: dateIsNot,
    [FilterMatchMode.DATE_BEFORE]: dateBefore,
    [FilterMatchMode.DATE_AFTER]: dateAfter,
};

export {
    applyFilter,
    FilterMatchMode
};
export type { Filter };
