import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table'
import { getSourceMessages } from '../../api'

import { TSource } from '../../types';

interface Props {
  input: TSource;
}

const Source = (props: Props) => {
  const columns = [
    // {
    //   Header: 'Id',
    //   accessor: 'id',
    // },
    // {
    //   Header: 'Source Id',
    //   accessor: 'source_id',
    // },
    {
      Header: 'Message',
      accessor: 'message',
    },
    {
      Header: 'Status',
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
    // {
    //   Header: 'Deleted',
    //   accessor: 'deleted_at',
    // },
  ]

  const [sourceMessages, setSourceMessages] = useState()
  const [loading, setLoadingStatus] = useState(false)

  useEffect(() => {
    const fetchSourceMessages = async () => {
      if(props.input.id){
        setLoadingStatus(true)
        const result = await getSourceMessages(props.input.id)
        setSourceMessages(result.data)
        setLoadingStatus(false)
      }
    }
    fetchSourceMessages()
  }, [props.input])

  return (
    <section className='ba b--purple ma3'>
      <div className='f4 h2 bg-light-gray pv1 ph2'>{props.input.name}</div>
      <div className='flex flex-row'>
        <div className='h5 w5 ba b--black' />
        <ReactTable
          className='w-100'
          columns={columns}
          data={sourceMessages}
          minRows={3}
          loading={loading}
          defaultPageSize={10}
        />
      </div>
    </section>
  )
}

export default Source