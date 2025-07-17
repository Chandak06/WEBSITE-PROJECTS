
import type { Info } from './types'

type UserInfoProp={
    user:Info
}
const UserInfo = ({ user }: UserInfoProp) => {

  return (
    <div>
        <h2>{user.name}</h2>
      <p>Id: {user.id}</p>
      <p>Email: {user.email}</p>
    </div>
  )
}

export default UserInfo