import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function Spinner() {
  const [count , setCount] = useState(5)
  const navigate = useNavigate()
  const location = useLocation()
  
  setTimeout(() => {
    setCount(count-1)
  }, 1000);
if(count === 0){
  navigate('/login', {state : location.pathname})
}
  return (
    <div>

    <div className = "d-flex justify-content-center align-items-center" style={{height:'50vh'}}>
       <div className="spinner-grow " style={{width: '3rem', height: '3rem'}} role="status">
      </div>
      <h5>{count}</h5>
</div>

    </div>
  )
}

export default Spinner
