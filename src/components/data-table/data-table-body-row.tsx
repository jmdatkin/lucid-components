import DataTableCell from "./data-table-cell";

type DataTableBodyRowProps = {
    columns?: any,
    record: Object
};

function DataTableBodyRow(props: DataTableBodyRowProps) {

    const createContent = () => {
        return Object.values(props.record).map((column, idx) => {
            return (
                <DataTableCell value={column} key={idx}
                ></DataTableCell>
            )
        })
    };

    return (
        <tr>
           {createContent()} 
        </tr>
    );
}

export default DataTableBodyRow;