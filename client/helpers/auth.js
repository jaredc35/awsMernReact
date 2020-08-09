import cookie from "js-cookie";
import Router from "next/router";
// Set in cookie
export const setCookie = (key, value) => {
  if (process.browser) {
    // If in the client side window
    cookie.set(key, value, {
      expires: 1 // Expires in 1 day
    });
  }
};

// Remove from cookie -> Remove on logout
export const removeCookie = key => {
  if (process.browser) {
    // If in the client side window
    cookie.remove(key);
  }
};

// Get from cookie -> such as stored cookie
// Will be useful when we need to make a request to server with auth token
export const getCookie = key => {
  if (process.browser) {
    return cookie.get(key);
  }
};

// Set in localstorage
export const setLocalStorage = (key, value) => {
  if (process.browser) {
    // If in the client side window
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// Remove from local storage
export const removeLocalStorage = key => {
  if (process.browser) {
    // If in the client side window
    localStorage.removeItem(key);
  }
};

// Authenticate user by passing data to cookie and local storage during signin
export const authenticate = (response, next) => {
  const { token, user } = response.data;
  setCookie("token", token);
  setLocalStorage("user", user);
  next();
};

// access user info from local storage
export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getCookie("token"); // If they have a cookie
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

// Clear cookie and user
export const logout = () => {
  removeCookie("token");
  removeLocalStorage("user");
  Router.push("/login");
};
