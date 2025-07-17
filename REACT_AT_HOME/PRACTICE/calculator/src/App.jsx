import React from 'react'
import { useState } from 'react'

const App = () => {
  const [inputValue,setInputValue]=useState("");
  const display=(value)=>{
    setInputValue(inputValue+value);
  }
  const clear=()=>{
    setInputValue("");
  }
  const calculate=()=>{
    setInputValue(eval(inputValue));
  }
  return (
    <div>
      <form name='calc' className="calculator relative grid grid-cols-4 gap-2 p-4 bg-[#2c2c2c] rounded text-white w-fit mx-auto">
        <input type="text" className="value col-span-4 h-[100px] text-right border-none outline-none p-[10px] text-[18px] bg-[white] text-black" readOnly value={inputValue}/>
        <div className=" flex items-center justify-center num clear col-span-2  bg-orange-400 text-white" onClick={() => clear()}>
        c
      </div>
      <div className="span" onClick={() => display("/")}>/</div>
      <div className="span" onClick={() => display("*")}>*</div>
      <div className="span" onClick={() => display("7")}>7</div>
      <div className="span" onClick={() => display("8")}>8</div>
      <div className="span" onClick={() => display("9")}>9</div>
      <div className="span" onClick={() => display("-")}>-</div>
      <div className="span" onClick={() => display("4")}>4</div>
      <div className="span" onClick={() => display("5")}>5</div>
      <div className="span" onClick={() => display("6")}>6</div>
      <div className="plus flex items-center justify-center row-span-2 " onClick={() => display("+")}>
        +
      </div>
      <div className="span" onClick={() => display("1")}>1</div>
      <div className="span" onClick={() => display("2")}>2</div>
      <div className="span" onClick={() => display("3")}>3</div>
      <div className="span" onClick={() => display("0")}>0</div>
      <div className="span" onClick={() => display("00")}>00</div>
      <div className="span" onClick={() => display(".")}>.</div>
      <div className=" span num row-span-2 equal bg-orange-400 text-white " onClick={() => calculate()}>
        =
      </div>
      </form>
    </div>
  )
}

export default App