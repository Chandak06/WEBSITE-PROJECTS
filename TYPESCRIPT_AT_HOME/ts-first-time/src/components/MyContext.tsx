import React, { Children, createContext, useState ,FC} from 'react'

type MyContextData={
  value:string;
  setValue:(newValue:string)=>void
}

type MyContextProviderProps={
  childern:ReactNode;
}

const MyContext=createContext<MyContextData|undefined>(undefined)

export const MyContextProvider: FC<MyContextProviderProps>= () => {
  const [value,setValue]=useState<string>("");

  const contextValue:MyContextData={
    value,
    setValue,
  };

  return (
    <div>
      <MyContext.Provider value={contextValue}>{Children}</MyContext.Provider>
    </div>
  )
}

export default MyContext;