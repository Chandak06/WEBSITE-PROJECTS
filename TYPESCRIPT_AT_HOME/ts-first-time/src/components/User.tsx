import React from 'react'

type UserProps = {
  name: string;
  age: number;
  isStudent: boolean;
};

const User = ({ name, age, isStudent }: UserProps) => {
  return (
    <div>
        <h2>{name}</h2>
        <h2>{age}</h2>
        <h2>{isStudent ?"Yes a student":"Not a student"}</h2>
    </div>
  )
}

export default User