import { useEffect, useRef, useState } from "react";

export default function usePaginate<D>(data: D[], rows: number) {
    const numPages = useRef(Math.ceil(data.length / rows));
    const [cursor, setCursor] = useState(0);

    const getCurrentPage = () => {
        const start = cursor * rows;
        const end = start + rows;
        return data.slice(start, end);
    };

    const [pageData, setPageData] = useState(getCurrentPage());

    useEffect(() => {
        numPages.current = Math.ceil(data.length / rows);

        if (numPages.current === 0) {
            setCursor(0);
            setPageData([]);
        } else {
            setCursor(Math.min(cursor, numPages.current - 1));
            setPageData(getCurrentPage());
        }
    }, [cursor, data, rows])


    const goPrevPage = () => {
        setCursor(Math.max(cursor - 1, 0));
    }

    const goNextPage = () => {
        setCursor(Math.min(numPages.current - 1, cursor + 1));
    };

    const goFirstPage = () => {
        setCursor(0);
    };

    const goLastPage = () => {
        setCursor(numPages.current - 1);
    };

    const setPage = (page: number) => {
        let newPage = page;
        newPage = Math.max(0, newPage);
        newPage = Math.min(newPage, numPages.current);
        setCursor(newPage);
    }

    return {
        pageData,
        goPrevPage,
        goNextPage,
        goFirstPage,
        goLastPage,
        currentPage: cursor,
        numPages,
        setPage
    };

}