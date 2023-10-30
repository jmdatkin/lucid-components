import { removeAccents, resolveFieldData } from "../utils/util";

interface Filter {
    field: string,
    matchMode: FilterMatchMode
}

type FilterValue = string | Date;

enum FilterMatchMode {
    CONTAINS,
    STARTS_WITH,
}

const applyFilter = (data: any[], filterValue: FilterValue, filter: Filter[]) => {
    return data.filter((record) => {

        // Array of filters
        if (Array.isArray(filter)) {
            let match = false;
            filter.forEach((_filter) => {
                const comparedField = resolveFieldData(record, _filter.field);
                if (FILTER_MAP[_filter.matchMode](comparedField, filterValue as string))
                    match = true;
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
    [FilterMatchMode.CONTAINS]: contains
};

export {
    applyFilter,
    FilterMatchMode
};
export type { Filter };
