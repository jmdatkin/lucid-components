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
      Selected: {(selection as typeof data.current[number]).name}
      <DataTable
        data={data.current}
        onSelectionChange={(e) => setSelection(e.selected)}
        onCellClick={(e) => console.log(e)}
        selectionMode={SelectionMode.SINGLE}

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
