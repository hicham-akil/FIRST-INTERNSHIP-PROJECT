import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  const isadmine=JSON.parse(localStorage.getItem('is_admin'));
  return (
    <div className='bg-gray-300  flex justify-between   items-center px-4  ' style={{height:"50px"}}>
         <div className='ml-30' >
            <Link className=' hover:font-bold text-gray-500' to={"/"}>Home</Link>
        </div>
        <div className='mr-30'>
            <Link to={"/Signin"} className='ml-30 hover:font-bold text-gray-500'>Signin</Link>
            <Link to={"/Signup"} className='ml-10 hover:font-bold text-gray-500'>Signup</Link>
            <Link className=' hover:font-bold text-gray-500' to={"/Showallproject"}>show all project</Link>
           {isadmine ?(
             <Link to={"/statistics"} className='ml-10 hover:font-bold text-gray-500'>statistics</Link>
            ):(
              <>
        
              <Link to={"/notification"} className='ml-10 hover:font-bold text-gray-500'>Notification</Link>
              </>
            )}

        </div>
    </div>
  )
}

export default Navbar