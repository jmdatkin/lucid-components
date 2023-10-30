type DataTableControlsProps = {
    renderStart?: (props?: DataTableControlsProps) => JSX.Element,
    renderEnd?: (props?: DataTableControlsProps) => JSX.Element
};

const DataTableControls: (props: DataTableControlsProps) => JSX.Element = (props) => {

    return (
        <div className="lucid-datatable-controls" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
                {props.renderStart ? props.renderStart(props) : <></>} 
            </div>
            <div>
                {props.renderEnd ? props.renderEnd(props): <></>} 
            </div>
        </div>
    )
}

export default DataTableControls;