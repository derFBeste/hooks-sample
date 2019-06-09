import React, { useState } from 'react'
import ReactTable from 'react-table'
import { TSource } from '../types';


interface Props {
  input: TSource[];
  onRowClick: (row: {}) => void;
}

const Sources = (props: Props) => {
  const columns = [
    // {
    //   Header: 'Id',
    //   accessor: 'id',
    // },
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Environment',
      accessor: 'environment',
    },
    // {
    //   Header: 'Encoding',
    //   accessor: 'encoding',
    // },
    {
      Header: 'Created',
      accessor: 'created_at',
    },
    {
      Header: 'Updated',
      accessor: 'updated_at',
    },
    // {
    //   Header: 'Deleted',
    //   accessor: 'deleted_at',
    // },
  ]

  
  const [sourceSelection, setSourceSelection] = useState({})
  
  const handleRowClick = (row) => {
    setSourceSelection(row)
    props.onRowClick(row)
    console.log(sourceSelection)
  }
  
  return (
    <section className='ba b--purple ma3'>
      <div className='f4 h2 bg-light-gray pv1 ph2'>Sources</div>
      <ReactTable 
        columns={columns}
        data={props.input}
        minRows={1}
        showPagination={false}
        getTdProps={(state, rowInfo, column, instance)=> {
          return {
            onClick: (e, handleOriginal) => {
              // props.onRowClick(rowInfo.original)
              handleRowClick(rowInfo.original)
              if(handleOriginal){
                handleOriginal()
              }
            }
          }
        }}
      />
    </section>
  )
}

Sources.defaultProps = {
  input: []
}

export default Sources