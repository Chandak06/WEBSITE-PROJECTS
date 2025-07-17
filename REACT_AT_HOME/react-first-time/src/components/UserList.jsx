import React from 'react'


const UserList = () => {
      const users=[
        {id:1,name:"Alice",age:24},
        {id:2,name:"Ali",age:26},
        {id:3,name:"Alex",age:23},
      ]
  return (
    <div>
      {
        users.map((user)=>(
        <div key={user.id}>
            <h1>Name:{user.name}</h1>
            <h1>Age:{user.age}</h1>
        </div>
        ))
      }
    </div>
  )
}

export default UserList
