import { ChangeEventHandler, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
import Button from './components/Button'
import InputText from './components/InputText'
import DataTable, { SelectionMode } from './components/data-table/data-table'
import DataTableColumn from './components/data-table/data-table-column'
import testData from './test-data'

function App() {

  const onChange: ChangeEventHandler<HTMLInputElement> = function (e) {
    console.log(e.target.value);
  }

  const [selection, setSelection] = useState<typeof data.current | typeof data.current[number]>([])

  const data = useRef(testData);


  return (
    <div className="App">
      <Button onClick={() => setSelection([])} label="Clear Selection"></Button>
      Selected: {
      (Array.isArray(selection) ? selection.map((s,i) => s.name + (i < selection.length - 1 ? ', ' : '')) : selection.name)
      }
      <DataTable
        data={data.current}
        selection={selection}
        onSelectionChange={(e) => setSelection(e.selection)}
        onCellClick={(e) => console.log(e)}
        selectionMode={SelectionMode.MULTIPLE}

      >
        <DataTableColumn header="Name" field="name" />
        <DataTableColumn header="Phone" field="phone" />
        <DataTableColumn header="E-mail" field="email" />
        <DataTableColumn header="Address" field="address" />
        <DataTableColumn header="Postal Code" field="postalZip" />
      </DataTable>
      {/* {selection ? JSON.stringify(selection) : ''} */}
    </div>
  )
}

export default App;
