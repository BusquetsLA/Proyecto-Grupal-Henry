import axios from 'axios';
import React, { useState } from 'react';
//import { DataGrid } from '@material-ui/data-grid';

const columns = [
	{ field: 'id', headerName: 'ID', width: 90 },
	{
		field: 'firstName',
		headerName: 'First name',
		width: 250,
		editable: true,
	},
	{
		field: 'lastName',
		headerName: 'Last name',
		width: 250,
		editable: true,
	},
	{
		field: 'age',
		headerName: 'Age',
		type: 'number',
		width: 210,
		editable: true,
	},
	{
		field: 'fullName',
		headerName: 'Full name',
		description: 'This column has a value getter and is not sortable.',
		sortable: false,
		width: 260,
		valueGetter: (params) =>
			`${params.getValue(params.id, 'firstName') || ''} ${params.getValue(params.id, 'lastName') || ''}`,
	},
];

const rows = [
	{ id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
	{ id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
	{ id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
	{ id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
	{ id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
	{ id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
	{ id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
	{ id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
	{ id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataTable() {
  const [imageSelect, setImageSelect] = useState("")
  const [imageUpData, setImageUpData] = useState({})

  function uploadImage () {
    //console.log(files[0])
    const formData = new FormData();
    formData.append("file", imageSelect)
    formData.append("upload_preset", "kp93ybsg")

    axios.post("https://api.cloudinary.com/v1_1/afl0r3s/image/upload", formData)
      .then(response => setImageUpData(response))
  }

  console.log('Result: ', imageUpData)

	return (
		<>
			<div style={{ height: 100, width: 900, backgroundColor:'orange' }}>
				Data Grid
				{/* <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      /> */}
			</div>
			<div>
        codigo de prueba<br/>
        <input type="file" 
          onChange={e=> setImageSelect(e.target.files[0]) }
        />

        <button onClick={uploadImage}>Upload Image</button>
      </div>

      <div>
        Resultado: {imageUpData.statusText}
      </div>
      
      <div>
        URL: {imageUpData.data.secure_url}
      </div>
		</>
	);
}
