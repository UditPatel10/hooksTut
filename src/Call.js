import React from 'react'
import { useEffect } from 'react';

const Call = ({comment}) => {
    useEffect(()=>{
        console.log("function called")
    },[comment])
  return (
    <div>{comment()}</div>
  )
}

export default Call;