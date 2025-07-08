import React from 'react'
import { FiAlertTriangle } from "react-icons/fi";

function ErrorBox({error}) {
  return (
    <div>
        <div role="alert" className="alert alert-error ml-5">
  <FiAlertTriangle size={20}/>
  <span>{error}</span>
</div>
    </div>
  )
}

export default ErrorBox