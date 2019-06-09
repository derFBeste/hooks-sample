import React from 'react'
import ReactTable from 'react-table'
import { TSource } from '../../types';


interface Props {
  input: TSource[];
  onRowClick: (row: {}) => void;
}

const Sources = (props: Props) => {
  const columns = [
    {
      Header: 'Id',
      accessor: 'id',
    },
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Environment',
      accessor: 'environment',
    },
    {
      Header: 'Encoding',
      accessor: 'encoding',
    },
    {
      Header: 'Created',
      accessor: 'created_at',
    },
    {
      Header: 'Updated',
      accessor: 'updated_at',
    },
    {
      Header: 'Deleted',
      accessor: 'deleted_at',
    },
  ]

  
  
  
  return (
    <section className='ba b--pink h5 ma3'>
      <ReactTable 
        columns={columns}
        data={props.input}
        minRows={1}
        showPagination={false}
        getTdProps={(state, rowInfo, column, instance)=> {
          return {
            onClick: (e, handleOriginal) => {
              props.onRowClick(rowInfo.original)
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