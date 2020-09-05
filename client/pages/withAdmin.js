import axios from "axios";
import { API } from "../config";
import { getCookie } from "../helpers/auth";

const withAdmin = Page => {
  const WithAdminUser = props => <Page {...props} />;
  WithAdminUser.getInitialProps = async context => {
    //getInitialProps runs server side first
    // Runs quicker and doesn't show blank page for split second like useEffect does
    const token = getCookie("token", context.req); // Get cookie by the name "token"
    let user = null;
    if (token) {
      try {
        const response = await axios.get(`${API}/admin`, {
          headers: {
            authorization: `Bearer ${token}`,
            contentType: "application/json"
          }
        });
        user = response.data;
      } catch (error) {
        if (error.response.status === 401) {
          // Unauthorized user (not logged in or not authorized)
          user = null;
        }
      }
    }
    if (user === null) {
      // Redirect them server side so they can't see the page
      context.res.writeHead(302, {
        // 302 is temporary redirect
        Location: "/"
      });
      context.res.end();
    } else {
      return {
        ...(Page.getInitialProps ? await Page.getInitialProps(context) : {}),
        user, // Return user info
        token // Return token
      };
    }
  };
  return WithAdminUser;
};

export default withAdmin;
