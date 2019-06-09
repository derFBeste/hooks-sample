import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table'
import { getSourceInfo } from '../../api'

import { TSource } from '../../types';

interface Props {
  input: TSource;
}

const Source = (props: Props) => {
  const columns = [
    {
      Header: 'Id',
      accessor: 'id',
    },
    {
      Header: 'Source Id',
      accessor: 'source_id',
    },
    {
      Header: 'Message',
      accessor: 'message',
    },
    {
      Header: 'status',
      accessor: 'status',
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

  const [sourceInfo, setSourceInfo] = useState()

  useEffect(() => {
    const fetchSourceInfo = async () => {
      if(props.input.id){
        const result = await getSourceInfo(props.input.id)
        setSourceInfo(result.data)
        console.log(sourceInfo)
      }
    }
    fetchSourceInfo()
  }, [props.input])

  return (
    <section className='ba b--purple h5 ma3'>
      <div className='f4 h2 bg-light-gray pv1 ph2'>{props.input.name}</div>
      <ReactTable 
        columns={columns}
        data={sourceInfo}
        minRows={1}
        showPagination={false}
      />
    </section>
  )
}

// Source.defaultProps = {
//   input: {}
// }

export default Source