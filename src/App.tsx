import { ChangeEventHandler, useRef, useState } from 'react'
import './App.scss'
import Button from './components/Button'
import InputText from './components/InputText'
import DataTable, { SelectionMode } from './components/data-table/data-table'
import DataTableColumn from './components/data-table/data-table-column'
import testData from './test-data-2'
import { Filter, FilterMatchMode } from './services/filter-service'
import { isEqual } from 'lodash'
import IconButton from './components/icon-button'
import { BsAsterisk, BsBracesAsterisk } from 'react-icons/bs'
import Badge from './components/badge'
import { Severity } from './types/severity'

function App() {

  const onChange: ChangeEventHandler<HTMLInputElement> = function (e) {
    console.log(e.target.value);
  }

  const [selection, setSelection] = useState<typeof data>([])

  const [data, setData] = useState(testData);

  const filters = useRef<Filter[]>([
    {
      field: 'firstName',
      matchMode: FilterMatchMode.CONTAINS
    },
    {
      field: 'lastName',
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
      {/* Selected: {
        selection.map((s, i) => s.name + (i < selection.length - 1 ? ', ' : ''))
      } */}

      <DataTable
        data={data}
        width={1600}
        rows={10}
        filters={filters.current}
        selection={selection}
        onSelectionChange={(e) => setSelection(e.selection)}
        onCellClick={(e) => console.log(e)}
        selectionMode={SelectionMode.MULTIPLE}
        render_controls={() => {
          return (
            <>
              <IconButton onClick={() => setSelection([])}><BsAsterisk></BsAsterisk></IconButton>
              <Button onClick={() => deleteRecords(selection)} label="Delete Records"></Button>
            </>
          )
        }}
      >
        <DataTableColumn selectionColumn style={{ minWidth: '3rem' }} />
        <DataTableColumn header="id" field="autoincrement" style={{ minWidth: '4rem' }} />
        <DataTableColumn header="First Name" field="firstName" style={{ minWidth: '10rem' }} />
        <DataTableColumn header="Last Name" field="lastName" style={{ minWidth: '10rem' }} />
        <DataTableColumn header="Phone" field="phone" style={{ minWidth: '16rem' }} />
        <DataTableColumn header="E-mail" field="email" style={{ minWidth: '20rem' }} />
        <DataTableColumn header="Address" field="address" style={{ minWidth: '16rem' }} />
        <DataTableColumn header="Postal Code" field="postalZip" style={{ minWidth: '8rem' }} />
        <DataTableColumn header="Farm" field="ownsFarm" style={{ minWidth: '4rem' }}
          renderContent={(rowData) => {
            if (parseInt(rowData.ownsFarm) === 0) {
              return <Badge label="No" severity={Severity.ALERT}></Badge>
            } else {
              return <Badge label="Yes" severity={Severity.SUCCESS}></Badge>
            }
          }}
        />
      </DataTable>

      {/* {selection ? JSON.stringify(selection) : ''} */}
    </div>
  )
}

export default App;
