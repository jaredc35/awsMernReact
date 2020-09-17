import Layout from "../../components/Layout";
import Link from "next/link";
import withAdmin from "../withAdmin";

const AdminPage = ({ user }) => {
  return (
    <Layout>
      <h1>Admin Dashboard</h1>
      <br />
      <div className="row">
        <div className="col-md-4">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link href="/admin/category/create">
                <a className="nav-link">Create Category</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-md-8"></div>
      </div>
    </Layout>
  );
};

export default withAdmin(AdminPage);
