import { useEffect,useState } from 'react'; 
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

//1. Create function that given a dic of node:measure sort it
//2. receive isNode and if its true display else display none
//3. receive measure

export default function ShowTable({data,measure,isNode}) {
    const [display, setDisplay] = useState(isNode ? 'block' : 'none');

    const [selectedRows, setSelectedRows] = useState([]);

    const handleSelectionModelChange = (newSelection) => {
        setSelectedRows(newSelection);
    };

    const getCheckedIds = () => {
        console.log("Checked IDs:", selectedRows);
        alert(`Checked IDs: ${selectedRows.join(', ')}`);
    }
    

    useEffect(() => {
      if (isNode) {
        setDisplay('block');
      } else {
        setDisplay('none');
      }
    }, [isNode]);
    if (!data || !data.nodes) return null;
  //
  let dataAux;
  const nodesN = data.nodes.map((node) => node.attributes.label);
  const namesN = data.nodes.map((node) => node.attributes.label);
  switch(measure) {
    case 'Grado':
        dataAux = data.nodes.map((node) => node.attributes.entropy);
        break;
    case 'Fortaleza':
        dataAux = data.nodes.map((node) => node.attributes.entropy);
        break;
    case 'Entropia (H)':
        dataAux = data.nodes.map((node) => node.attributes.clustering);
        break;
    default :
        dataAux = data.nodes.map((node) => node.attributes.clustering);
  };

  const columns = [
    { field: 'id', headerName: 'Codigo', width: 70,sortable:false },
    {
      field: 'age',
      headerName: measure,
      type: 'number',
      width: 120,
      sortable:true,
    },
    {
      field: 'fullName',
      headerName: 'Nombre',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      //valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
  ];

    const rows = nodesN.map((id, index) => ({
    id: id,
    age: dataAux[index],  // Include age if available
    fullName: nodesN[index],
    }));




  return (
    <div style={{ display: display ,height:'90%',width:'90',marginBlock:'10px'}} >
        <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection 
        onSelectionModelChange={(newSelection) => {
            handleSelectionModelChange(newSelection);
            console.log('010');
          }}
      />
    </div>
  );
}
