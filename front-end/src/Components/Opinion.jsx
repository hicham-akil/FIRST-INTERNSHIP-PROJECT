import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Opinion = () => {
    const [opinionmessage,setopinonmessage]=useState('')
  const senddata= async()=>{
      try{
          const response= await axios.post("http://127.0.0.1:8000/api/opinion",{opinion_message:opinionmessage},{
              headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            })
            console.log(response.data)
            
        }catch(erorr){
            console.log(erorr.message)
        }
    }
  return (
    <div>
        <span>opinion</span>
        <input type="text" value={opinionmessage} onChange={(e)=>setopinonmessage(e.target.value)} />
        <button onClick={senddata}>senddd</button>

    </div>
  )
}

export default Opinion