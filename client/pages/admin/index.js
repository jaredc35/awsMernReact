import Layout from "../../components/Layout";
import withAdmin from "../withAdmin";
const AdminPage = user => <Layout>{JSON.stringify(user, token)}</Layout>;

export default withAdmin(AdminPage);
