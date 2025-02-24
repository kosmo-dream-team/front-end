// src/admin/AdminApp.jsx

import AdminDashboard from "@/admin/AdminDashboard";
import ApplicationEdit from "@/admin/ApplicationEdit";
import ApplicationList from "@/admin/ApplicationList";
import UserEdit from "@/admin/UserEdit";
import UserList from "@/admin/UserList";
import { dataProvider } from "@/data/dataProvider";
import { Admin, Resource } from "react-admin";

const AdminApp = () => (
  <Admin
    dashboard={AdminDashboard}
    dataProvider={dataProvider}
    basename="/admin"
  >
    <Resource name="projects" list={ApplicationList} edit={ApplicationEdit} />
    {<Resource name="users" list={UserList} edit={UserEdit} />}
  </Admin>
);

export default AdminApp;
