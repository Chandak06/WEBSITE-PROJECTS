// import React, { useReducer } from 'react'

// const CountReducer = () => {
//     const initialState={count:0};
//     const reducer=(state,action)=>{
//         switch(action.type){
//             case "increment":
//                 return {count:state.count+1};
//             case "decrement":
//                 return {count:state.count-1};
//             case "reset":
//                 return {count:0};
//             default:
//                 return state;
//         }
//     }
//     const [state,dispatch]= useReducer(reducer,initialState)
//   return (
//     <div>
//         <h1>{state.count}</h1>
//         <button onClick={()=>dispatch({type:"increment"})}>+</button>
//         <button onClick={()=>dispatch({type:"decrement"})}>-</button>
//         <button onClick={()=>dispatch({type:"reset"})}>reset</button>
//     </div>
//   )
// }

// export default CountReducer


const initialState={count:0}

const counterReducer=(state,action)=>{
    switch (action.type) {
        case "increment":
            return {count:state.count+1}
            break;
        case "decrement":
            return {count:state.count-1}
        case "reset":
            return {count:0}
        case "incrementByAmount":
            return {count:state.count+action.payload}
        case "decrementByAmount":
            return {count:state.count-action.payload}
        default:
            return state
            break;
    }
}
export{initialState,counterReducer}