import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

export default function Product(){
    const columns = [
        {
            name: "Sr. No",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "Title",
            selector: (row) => row.title,
            sortable: true,
        },
        {
            name: "Thumnail",
            selector: (row) => <img height={70} weight={80} src={row.thumbnailUrl} />,
        },
        {
            name: "Image",
            selector: (row) => <img height={70} width={80} src={row.url}  />,
        },
        {
            name: "Action",
            cell: (row) => (
                <button className='btn btn-danger' onClick={() => handleDelete(row.id)}>Delete</button>
            )
        }
    ]

    const handleDelete = (val) => {
        const newData = data.filter((item) => {
            return item.id !== val
        });
        setFilter(newData);
    }

    const tableHeaderStyle = {
        headCells: {
            style:{
                fontWeight: 'bold',
                fontSize: "24px",
                backgroundColor:'#ccc'
            }
        }
    }

    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState([]);

    const getProduct = async () => {
        try{
            const req = await fetch('https://jsonplaceholder.typicode.com/photos')
            const res = await req.json();
            setData(res);
            setFilter(res);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getProduct();
    }, [])

    useEffect(() => {
        const result = data.filter((item) => {
            return item.title.toLowerCase().match(search.toLocaleLowerCase());
        },);
        setFilter(result);
    }, [search])



    return (
        <React.Fragment>
            <h1>Product List</h1>
            <DataTable 
            customStyles={tableHeaderStyle}
            columns={columns} 
            data={filter} 
            pagination
            selectableRows 
            fixedHeader
            selectableRowsHighlight
            highlightOnHover
            actions={
                <button className='btn btn-success'>Export Pdf</button>
            }

            subHeader
                subHeaderComponent = {
                    <input type='text' className='form-control w-25'
                    placeholder='Search...' 
                    value={search}
                    onChange={(e)=> setSearch(e.target.value)}/>
                }
                subHeaderAlign='right'
            />
        </React.Fragment>
    )
}