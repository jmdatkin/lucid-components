import { ChangeEventHandler, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
import Button from './components/Button'
import InputText from './components/InputText'
import DataTable, { SelectionMode } from './components/data-table/data-table'
import DataTableColumn from './components/data-table/data-table-column'

function App() {

  const onChange: ChangeEventHandler<HTMLInputElement> = function (e) {
    console.log(e.target.value);
  }

  const [selection, setSelection] = useState([])

  const data = useRef(
    [
      {
        "name": "Tyrone Ramsey",
        "phone": "(147) 225-3273",
        "email": "donec@icloud.com",
        "address": "P.O. Box 693, 1179 Dictum Rd.",
        "postalZip": "93726"
      },
      {
        "name": "Rama Nieves",
        "phone": "1-418-210-3559",
        "email": "mauris@hotmail.com",
        "address": "Ap #420-3265 Id St.",
        "postalZip": "644333"
      },
      {
        "name": "Basia Hobbs",
        "phone": "1-274-780-7657",
        "email": "sed.et.libero@protonmail.edu",
        "address": "765-2171 Rutrum, Avenue",
        "postalZip": "31-85"
      },
      {
        "name": "Geraldine Hernandez",
        "phone": "(245) 988-6519",
        "email": "euismod.enim@google.com",
        "address": "870-1200 Sed Ave",
        "postalZip": "939757"
      },
      {
        "name": "Maryam Dickson",
        "phone": "(632) 622-8711",
        "email": "arcu@yahoo.com",
        "address": "Ap #131-4172 Phasellus Av.",
        "postalZip": "489572"
      },
      {
        "name": "Elmo Merritt",
        "phone": "(728) 576-5765",
        "email": "mauris.erat@protonmail.couk",
        "address": "590-2265 Nullam Avenue",
        "postalZip": "R7G 8M3"
      },
      {
        "name": "Zachery Garrison",
        "phone": "1-295-514-0219",
        "email": "iaculis.enim@hotmail.org",
        "address": "Ap #477-7384 Enim. Street",
        "postalZip": "789815"
      },
      {
        "name": "Wade Gould",
        "phone": "1-867-588-3327",
        "email": "consectetuer.adipiscing@outlook.com",
        "address": "Ap #481-7642 Dui Rd.",
        "postalZip": "758762"
      },
      {
        "name": "Tyrone Jefferson",
        "phone": "1-976-842-6544",
        "email": "magna@aol.org",
        "address": "3449 Quisque Ave",
        "postalZip": "816365"
      },
      {
        "name": "Olivia Mayer",
        "phone": "1-464-568-8478",
        "email": "magna@protonmail.ca",
        "address": "Ap #897-142 Luctus Rd.",
        "postalZip": "441518"
      },
      {
        "name": "Arden Newton",
        "phone": "(348) 327-9347",
        "email": "in.sodales.elit@outlook.ca",
        "address": "523-5660 Lectus. Rd.",
        "postalZip": "772279"
      },
      {
        "name": "Flavia Rodriquez",
        "phone": "1-869-676-3760",
        "email": "cursus.et@aol.couk",
        "address": "P.O. Box 319, 3363 Amet Rd.",
        "postalZip": "725488"
      },
      {
        "name": "Lila Payne",
        "phone": "1-868-655-4508",
        "email": "elit@protonmail.net",
        "address": "174-2900 Faucibus Street",
        "postalZip": "3778 OL"
      },
      {
        "name": "Lamar Griffin",
        "phone": "1-292-148-6488",
        "email": "elit.pellentesque@protonmail.edu",
        "address": "Ap #276-7227 Sodales Av.",
        "postalZip": "02353"
      },
      {
        "name": "Ali Gordon",
        "phone": "(692) 456-4630",
        "email": "neque@hotmail.ca",
        "address": "Ap #820-8475 Hendrerit Rd.",
        "postalZip": "3634"
      },
      {
        "name": "Thor Alvarado",
        "phone": "(924) 460-6124",
        "email": "ornare.sagittis.felis@outlook.org",
        "address": "Ap #499-3720 Nullam Rd.",
        "postalZip": "381678"
      },
      {
        "name": "Audra Rocha",
        "phone": "1-215-483-0596",
        "email": "nascetur.ridiculus@icloud.com",
        "address": "366-3393 Eget Ave",
        "postalZip": "35572"
      },
      {
        "name": "Theodore Knapp",
        "phone": "1-782-716-0271",
        "email": "et.netus.et@google.ca",
        "address": "992-2367 Dapibus Ave",
        "postalZip": "50112"
      },
      {
        "name": "Elizabeth Clayton",
        "phone": "1-511-640-0155",
        "email": "ipsum.donec@icloud.com",
        "address": "779-6470 Sagittis Av.",
        "postalZip": "1058"
      },
      {
        "name": "Cruz Dawson",
        "phone": "1-821-317-8728",
        "email": "montes.nascetur.ridiculus@hotmail.net",
        "address": "721-4968 Aliquam St.",
        "postalZip": "4202"
      }
    ]
  );


  return (
    <div className="App">
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
      {selection ? JSON.stringify(selection) : ''}
    </div>
  )
}

export default App
