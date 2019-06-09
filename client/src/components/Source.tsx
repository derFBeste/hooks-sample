import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table'
import { isEmpty } from 'lodash'
import { getSourceMessages, getSourceMessagesStatus } from '../api'

import Statuses from './Statuses';

import { TSource } from '../types';

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

  const [loading, setLoadingStatus] = useState(false)
  const [sourceMessages, setSourceMessages] = useState()
  const [sourceStatuses, setSourceStatuses] = useState({})
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    const fetchSourceMessages = async () => {
      if(props.input.id){
        const statusesRes = await getSourceMessagesStatus(props.input.id)
        setSourceStatuses(statusesRes.data)
        setLoadingStatus(true)
        console.time('get messages')
        const messagesRes = await getSourceMessages(props.input.id)
        console.timeEnd('get messages')
        setSourceMessages(messagesRes.data)
        setLoadingStatus(false)

        console.log(sourceStatuses)
      }

    }
    fetchSourceMessages()
  }, [props.input])

  const handleStatusFilter = (filter: string) => {
    setStatusFilter(filter)
  }

  return (
    <section className='ba b--purple ma3'>
      <div className='f4 h2 bg-light-gray pv1 ph2'>{props.input.name}</div>
      <div className='flex flex-row'>
        { !isEmpty(sourceStatuses) &&
          <Statuses 
            input={sourceStatuses}
            onClickStatus={(key) => handleStatusFilter(key)}
          />
        }
        <ReactTable
          className='w-100'
          columns={columns}
          data={sourceMessages}
          minRows={3}
          loading={loading}
          defaultPageSize={10}
          filtered={[{id: 'status', value: statusFilter}]}
        />
      </div>
    </section>
  )
}

export default Source