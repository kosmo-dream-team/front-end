// src/admin/AdminApp.jsx

import AdminDashboard from "@/admin/AdminDashboard";
import UserEdit from "@/admin/UserEdit";
import UserList from "@/admin/UserList";
import { dataProvider } from "@/data/dataProvider";
import { Admin, Resource } from "react-admin";
import authProvider from "./admin/authProvider";
import { ProjectList } from "./admin/ProjectList";
import { ProjectShow } from "./admin/ProjectShow";

const AdminApp = () => (
  <Admin
    dataProvider={dataProvider}
    basename="/admin"
    authProvider={authProvider} // 올바른 prop 이름
    dashboard={AdminDashboard}
  >
    <Resource name="adminProject" list={ProjectList} show={ProjectShow} />
    <Resource name="user" list={UserList} edit={UserEdit} />
  </Admin>
);

export default AdminApp;
