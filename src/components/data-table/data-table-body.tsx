import DataTableBodyRow from "./data-table-body-row";

type DataTableBodyProps = {
    data: Object[]
}

function DataTableBody(props: DataTableBodyProps) {

    const createRow = () => {

    };

    const createContent = () => {
        return props.data.map((record, idx) => {
            return (
                <DataTableBodyRow key={idx} record={record}></DataTableBodyRow>
            )
        })
    }

    return ( 
        <tbody>
            {createContent()}
        </tbody>
     );
}

export default DataTableBody;