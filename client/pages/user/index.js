import Layout from "../../components/Layout";
import axios from "axios";
import { API } from "../../config";
import { getCookie } from "../../helpers/auth";
import withUser from "../withUser";

const UserPage = ({ user, token }) => (
  <Layout>{JSON.stringify(user, token)}</Layout>
);

export default withUser(UserPage);
