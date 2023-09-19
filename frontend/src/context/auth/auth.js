import { AUTHENTICATED, NOT_AUTHENTICATED } from './actionTypes';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
const setToken = (token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("lastLoginTime", new Date(Date.now()).getTime());
};

export const getToken = () => {
    const now = new Date(Date.now()).getTime();
    const timeAllowed = 1000 * 60 * 30;
    const timeSinceLastLogin = now - localStorage.getItem("lastLoginTime");
    if (timeSinceLastLogin < timeAllowed) {
        return localStorage.getItem("token");
    }
};

const deleteToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("lastLoginTime");
}

export const signupUser = (credentials) => {
    return (dispatch) => {
        return axios.post("http://localhost:80/auth/register", { email:credentials.email,password:credentials.password,firstName:credentials.firstName,lastName:credentials.lastName }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then((res) => {
            if (res.status === 200) {
                setToken(res.headers.authorization);
                return res.data;
            } 
        })
        .then((userJson) => {
            toast.success("User created successfully")
            dispatch({ type: AUTHENTICATED, payload: userJson });
        })
        .catch((errors) => {
            dispatch({ type: NOT_AUTHENTICATED });
            toast.error("Email already in use")
        });
    };
};

export const loginUser = (credentials) => {
    return (dispatch) => {
        return axios.post("http://localhost:80/auth/login", { email: credentials.email, password: credentials.password }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })
        .then((res) => {
            if (res.status === 200) {
                toast.success("Successfully logged in")
                setToken(res.data.message);
                return res.data;
            } else {
                toast.error("Please check ur email or password")
            }
        })
        .then((userJson) => {
            dispatch({ type: AUTHENTICATED, payload: userJson });
        })
        .catch((errors) => {
            dispatch({ type: NOT_AUTHENTICATED });
            toast.error("Please check ur email or password")
        });
    };
};

export const logoutUser = () => {
    return (dispatch) => {
        deleteToken();
        dispatch({ type: NOT_AUTHENTICATED });
    };
};

export const checkAuth = () => {
    return (dispatch) => {
        return axios.get("http://localhost:80/auth/check-user", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": getToken(),
            }
        })
        .then((res) => {
            if (res.status === 200) {
                return res.data;
            } else {
                return Promise.reject();
            }
        })
        .then((user) => {
            user.status ? dispatch({ type: AUTHENTICATED, payload: user }) : dispatch({ type: NOT_AUTHENTICATED });
        })
        .catch(() => {
            dispatch({ type: NOT_AUTHENTICATED });
        });
    };
};
