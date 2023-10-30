import { ChangeEventHandler, useRef, useState } from 'react'
import './App.scss'
import Button from './components/Button'
import InputText from './components/InputText'
import DataTable, { SelectionMode } from './components/data-table/data-table'
import DataTableColumn from './components/data-table/data-table-column'
import testData from './test-data'
import { Filter, FilterMatchMode } from './services/filter-service'
import { isEqual } from 'lodash'

function App() {

  const onChange: ChangeEventHandler<HTMLInputElement> = function (e) {
    console.log(e.target.value);
  }

  const [selection, setSelection] = useState<typeof data>([])

  const [data, setData] = useState(testData);

  const filters = useRef<Filter[]>([
    {
      field: 'name',
      matchMode: FilterMatchMode.CONTAINS
    },
    {
      field: 'postalZip',
      matchMode: FilterMatchMode.CONTAINS
    },
    {
      field: 'phone',
      matchMode: FilterMatchMode.CONTAINS
    },
    {
      field: 'address',
      matchMode: FilterMatchMode.CONTAINS
    },
    {
      field: 'email',
      matchMode: FilterMatchMode.CONTAINS
    }
  ]
  );

  const deleteRecords = (records: typeof data) => {
    let newData = [...data];
    
    const filteredData = newData.filter((_record) => records.findIndex((r) => isEqual(r, _record)) <= -1);
    console.log(filteredData);
    setData(filteredData);
  };

  return (
    <div className="App">
      <Button onClick={() => setSelection([])} label="Clear Selection"></Button>
      <Button onClick={() => setSelection(data.slice(5, 10))} label="Select Block"></Button>
      <Button onClick={() => deleteRecords(selection)} label="Delete Records"></Button>
      Selected: {
        (Array.isArray(selection) ? selection.map((s, i) => s.name + (i < selection.length - 1 ? ', ' : '')) : selection.name)
      }

      <DataTable
        data={data}
        width={1200}
        filters={filters.current}
        selection={selection}
        onSelectionChange={(e) => setSelection(e.selection)}
        onCellClick={(e) => console.log(e)}
        selectionMode={SelectionMode.MULTIPLE}
      >
        <DataTableColumn selectionColumn style={{minWidth: '3rem'}}/>
        <DataTableColumn header="Name" field="name" style={{minWidth: '16rem'}}/>
        <DataTableColumn header="Phone" field="phone" style={{minWidth: '16rem'}}/>
        <DataTableColumn header="E-mail" field="email" style={{minWidth: '20rem'}}/>
        <DataTableColumn header="Address" field="address" style={{minWidth: '16rem'}}/>
        <DataTableColumn header="Postal Code" field="postalZip" style={{minWidth: '16rem'}}
          />
      </DataTable>

      {/* {selection ? JSON.stringify(selection) : ''} */}
    </div>
  )
}

export default App;
