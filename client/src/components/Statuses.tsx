import React from 'react'
import { TStatus } from '../types'
import { isEmpty } from 'lodash'

interface Props {
  input: TStatus;
  onClickStatus: (key:string) => void;
}

const Statuses = (props: Props) => {

  let total
  if(!isEmpty(props.input)){
    total = Object.values(props.input).reduce((total, curr) => total + curr)
  }

  const statuses = Object.keys(props.input).map((key, index) => (
    <div key={index}>
      <div 
        className='flex flex-row justify-between pointer dim pa2'
        onClick={() => props.onClickStatus(key)}
      >
        <div>{key}</div>
        <div>{props.input[key]}</div>
      </div>
    </div>
  ))

  return (
    <div className='h-inherit w5 bt br b--black' >
      <div className='f5 bg-light-gray pv1 ph2 mb2'>Statuses</div>
      <div className='flex flex-row justify-between fw5 pa2'>
        <div>total messages</div>
        <div>{total}</div>
      </div>
      {statuses}
    </div>
  )
}

Statuses.defaultProps = {
  input: {}
}

export default Statuses