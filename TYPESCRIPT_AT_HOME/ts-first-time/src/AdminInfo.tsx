import type { AdminInfoList } from "./types"

type AdminProps = {
  admin: AdminInfoList;
};
const AdminInfo = ({admin}:AdminProps) => {
  return (
    <div>
        <h2>{admin.name}</h2>
        <h2>{admin.id}</h2>
        <h2>{admin.email}</h2>
        <h2>{admin.lastlogin.toLocaleString()}</h2>
        <h2>{admin.role}</h2>
    </div>
  )
}

export default AdminInfo