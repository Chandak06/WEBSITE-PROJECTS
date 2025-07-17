import { useState } from "react";

const UserProfile = () => {
    interface UserProfile{
        name : string;
        age:number;
        email:string;
    }
    const [profile,setProfile]=useState<UserProfile>({
        name:"",
        age:0,
        email:""
    })

    const updateName=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const name:string=e.target.value;
        setProfile((prevProfile)=>({...prevProfile,name}))
    }

    const updateAge=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const age:string=e.target.value;
        setProfile((prevProfile)=>({...prevProfile,age:Number(age)}))
    }
    const updateEmail=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const email:string=e.target.value;
        setProfile((prevProfile)=>({...prevProfile,email}))
    }
  return (
    <div>
        <h2>User Profile</h2>
        <input onChange={updateName} type="text" placeholder='Name' value={profile.name}/>
        <input onChange={updateAge} type="number" placeholder='Age' value={profile.age}/>
        <input onChange={updateEmail} type="text" placeholder='Email' value={profile.email}/>

        <h3>Profile Summary</h3>
        <p>Name : {profile.name}</p>
        <p>Age : {profile.age}</p>
        <p>Email : {profile.email}</p>
    </div>
  )
}

export default UserProfile