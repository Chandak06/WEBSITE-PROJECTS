import React, { useState } from 'react'

const CopyInput = () => {
    const [inputValue,setIputValue]=useState("");
    const [copied,setCopied]=useState(false);
    const handleCopy=()=>{
        navigator.clipboard.writeText(inputValue).then(()=>{
            setCopied(true);
            setTimeout(()=>setCopied(false),2000)
        })
    }
  return (
    <div>
        <input type="text" value={inputValue} onChange={(e)=>setIputValue(e.target.value)}/>
        <button onClick={handleCopy}>Copy</button>
    </div>
  )
}

export default CopyInput