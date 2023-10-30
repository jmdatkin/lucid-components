import { ReactNode } from "react";

type DataTableFooterProps = {
    children?: ReactNode
};

const DataTableFooter = (props: DataTableFooterProps) => {


    return (
        <div className="lucid-datatable-footer">
            {props.children}
        </div>
    )


}

export default DataTableFooter;