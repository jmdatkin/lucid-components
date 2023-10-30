import { useState } from 'react';
import '../../styles/Paginator.scss'
import { BsChevronDoubleLeft, BsChevronDoubleRight, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import IconButton from '../icon-button';

type PaginatorProps = {
    onPrevPage: Function,
    onNextPage: Function,
    goFirstPage: Function,
    goLastPage: Function,
    setPage: Function,
    numPages: number,
    currentPage: number
};

const Paginator = (props: PaginatorProps) => {

    const firstIconButton = () => {
        const disabled = props.currentPage === 0;

        return (
            <IconButton disabled={disabled} onClick={props.goFirstPage}>
                <BsChevronDoubleLeft>
                </BsChevronDoubleLeft>
            </IconButton>
        );
    };

    const lastIconButton = () => {
        const disabled = props.currentPage === props.numPages - 1;

        return (
            <IconButton disabled={disabled} onClick={props.goLastPage}>
                <BsChevronDoubleRight></BsChevronDoubleRight>
            </IconButton>
        );
    }

    const prevIconButton = () => {

        const disabled = props.currentPage === 0;

        return (
            <IconButton disabled={disabled} onClick={props.onPrevPage}>
                <BsChevronLeft></BsChevronLeft>
            </IconButton>
        );
    }

    const nextIconButton = () => {

        const disabled = props.currentPage === props.numPages - 1;

        return (
            <IconButton disabled={disabled} onClick={props.onNextPage}>
                <BsChevronRight></BsChevronRight>
            </IconButton>
        );

    }

    const createIconButtons = () => {
        return [...Array(props.numPages).keys()].map((page) => {
            return <IconButton
                key={page}
                className={props.currentPage === page ? '!bg-sky-100' : ''}
                onClick={() => props.setPage(page)}
            >
                {(page + 1).toString()}
            </IconButton>
        });
    }

    return (
        <div className="lucid-datatable-paginator">
            {firstIconButton()}
            {prevIconButton()}
            {createIconButtons()}
            {nextIconButton()}
            {lastIconButton()}
        </div>
    )

};

export default Paginator;