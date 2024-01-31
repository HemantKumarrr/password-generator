import React, { useState, useCallback, useEffect, useRef } from 'react'

const App = () => {
  const [password, setPassword] = useState("")
  const [isNumber, setIsNumber] = useState(false)
  const [isCharacter, setIsCharacter] = useState(false)
  const [passwordLength, setPasswordLength] = useState(6)

  const passwordRef = useRef()

  const copyToClipboard = ()=> {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
    alert( password +  " Copied !")
  }

  const passwordGenerator = useCallback(()=> {
    let myPassword = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(isNumber) str += "0123456789";
    if(isCharacter) str += "!@#$%^&*(){}[]~-_"

    for(let i=1; i<= passwordLength; i++)
    {
      let randomChar = Math.floor(Math.random() * str.length + 1);
      myPassword += str.charAt(randomChar);
    }

    setPassword(myPassword)
  },[isCharacter, isNumber, passwordLength, setPassword])

  useEffect(()=> {
    passwordGenerator()
  }, [isCharacter, isNumber, passwordLength])

  return (
    <div className='w-full h-screen bg-[#171717] text-white flex justify-center items-center' >
      <div className="flex flex-col items-center justify-around gap-8 bg-zinc-800 p-8 rounded-md shadow-lg">
        <h1 className='text-3xl uppercase p-2' >Password Generator</h1>
        <div className="w-full h-full flex">
          <input className='w-[30rem] rounded-l-lg outline-none h-12 text-black px-2' type="text" value={password} readOnly ref={passwordRef} />
          <button onClick={copyToClipboard} className='w-16 rounded-r-lg h-12 bg-cyan-600' >Copy</button>
        </div>
        <div className="flex justify-between items-center w-full text-xl">
          <input className='cursor-pointer range:border-green-500' type="range" min={6} max={20} value={passwordLength} onChange={(e)=> setPasswordLength(e.target.value)} />
          <div className="w-28" >
            Length : {passwordLength}
          </div>
          <div>
            <input type="checkbox" id='number' onChange={()=> setIsNumber((prev)=> !prev)} />
            <label htmlFor="number"> Number</label>
          </div>
          <div>
            <input type="checkbox" id='character' onChange={()=> setIsCharacter((prev)=> !prev)} />
            <label htmlFor="character"> Character</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
