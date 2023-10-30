import { useState } from 'react';
import '../../styles/Paginator.scss'
import Button from '../Button';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

type PaginatorProps = {
    onPrevPage: Function,
    onNextPage: Function,
    setPage: Function,
    numPages: number,
    currentPage: number
};

const Paginator = (props: PaginatorProps) => {

    const prevButton = () => {
        
        const disabled = props.currentPage === 0;

        return (
            <Button disabled={disabled} onClick={props.onPrevPage}>
                <BsChevronLeft></BsChevronLeft>
            </Button>
        );
    }

    const nextButton = () => {

        const disabled = props.currentPage === props.numPages - 1;

        return (
            <Button disabled={disabled} onClick={props.onNextPage}>
                <BsChevronRight></BsChevronRight>
            </Button>
        );

    }

    const createButtons = () => {
        return [...Array(props.numPages).keys()].map((page) => {
            return <Button label={(page + 1).toString()}
                key={page}
                className={props.currentPage === page ? 'bg-blue-500 text-white' : ''}
                onClick={() => props.setPage(page)}
            ></Button>
        });
    }

    return (
        <div className="lucid-datatable-paginator">
            {prevButton()}
            {createButtons()}
            {nextButton()}
        </div>
    )

};

export default Paginator;