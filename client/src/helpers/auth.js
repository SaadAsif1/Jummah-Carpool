import cookie from 'js-cookie';
// Save the user information in localstrage
// Save the user token in cookie

// set the cookie (siging the user in <--Info give to us)
export const setCookie = (key, value) => {
  if (window !== 'undefined') {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

// remove the cookie (Logout the user)
export const removeCookie = (key) => {
  if (window !== 'undefined') {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

// Get the token from the cookie
export const getCookie = (key) => {
  if (window !== 'undefined') {
    return cookie.get(key);
  }
};

// set the userInfo in localstorage
export const setLocalStorage = (key, value) => {
  if (window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// set the userInfo in localstorage
export const getLocalStorage = (key) => {
  if (window !== 'undefined') {
    return JSON.parse(localStorage.getItem(key));
  }
};

// Remove the user info from localstorage
export const removeLocalStorage = (key) => {
  if (window !== 'undefined') {
    localStorage.removeItem(key);
  }
};

// authenticate user by passing data to cookie and localstorage succesful signin
export const authenticate = (response, next) => {
  console.log('AUTHENTICATE HELPER SIGNIN RESPONSE', response);
  setCookie('token', response.data.token);
  setLocalStorage('user', response.data.user);
  next(); // <-- callback function
};

// access user info from localstorage // Checking if user is authicated
export const isAuth = () => {
  if (window !== 'undefined') {
    const cookieCheck = getCookie('token');
    if (cookieCheck) {
      if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'));
      } else {
        return false;
      }
    }
  }
};

// Signout
export const signout = (next) => {
  removeCookie('token');
  removeLocalStorage('user');
  next();
};

// Update user
export const updateUser = (response, next) => {
  console.log('UPDATE USER IN LOCALSTORAGE HELPERS', response);
  if (typeof window !== 'undefined') {
    let auth = JSON.parse(localStorage.getItem('user'));
    auth = response.data;
    localStorage.setItem('user', JSON.stringify(auth));
  }
  next();
};
