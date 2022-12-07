import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import MUILoginErrorModal from "../components/MUILoginErrorModal";
import api from './auth-request-api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    REGISTER_USER: "REGISTER_USER",
    LOGIN_FAILED: "LOGIN_FAILED",
    ERROR: "ERROR"
   
}



function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        errMessage: ""
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    
                });
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    errMessage: "",
                    
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errMessage:'',
                    
                })
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    errMessage:'',
                    
                })
            }
            case AuthActionType.LOGIN_FAILED: { //I added to handle when login fails and added error message in auth 
                return setAuth({
                    user: payload.user,
                    errMessage: payload.errMessage
                })
            }
            
            case AuthActionType.ERROR: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorMessage: payload.errorMessage,
                    
                })
            }
            
            
            case AuthActionType.GUEST: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    errorMessage: "",
                    
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.SET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
                }
            });
        }
    }

    auth.registerUser = async function(firstName, lastName, email, password, passwordVerify) {
        
        try{
            const response = await api.registerUser(firstName, lastName, email, password, passwordVerify);      
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
            }
        }
        catch(err){ //actually catches the 400 and 401
            console.log(err);
            console.log("test print for register user error message in index.js:")
            console.log(err.response.data.errorMessage)
            
            //MUILoginErrorModal()
            //set up the modal to work if in here
            authReducer({ //this auth reducer sets error message, which turn on our error logging in modal, which reads if error message !=null
                type: AuthActionType.LOGIN_FAILED, 
                payload: {
                    user: null,
                    errMessage: err.response.data.errorMessage //prints error message from server response to login atmpt failed
                }
            })
        }
        
    }

    auth.loginUser = async function(email, password) {
        try{
            const response = await api.loginUser(email, password);

            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                
                history.push("/");
            }
            //check for error code response 400 or 401  from server auth ,and display that error message here
           
        }
        catch(err){ //actually catches the 400 and 401
            console.log(err);
            console.log("test print for error message in index.js:")
            console.log(err.response.data.errorMessage)
            
            //MUILoginErrorModal()
            //set up the modal to work if in here
            authReducer({ //this auth reducer sets error message, which turn on our error logging in modal, which reads if error message !=null
                type: AuthActionType.LOGIN_FAILED, 
                payload: {
                    user: null,
                    errMessage: err.response.data.errorMessage //prints error message from server response to login atmpt failed
                }
            })
        }
        
        
    }

    auth.clearErrMessage = async function() {

        console.log("inside clear error message in auth, blanking err message to close modal")

        authReducer({ //this auth reducer sets error message, which turn on our error logging in modal, which reads if error message !=null
            type: AuthActionType.LOGIN_FAILED, 
            payload: {
                errMessage: '' //clear error message to disappear modal
            }
        })
    }


    auth.logoutUser = async function() {
        const response = await api.logoutUser();
        if (response.status === 200) {
            authReducer( {
                type: AuthActionType.LOGOUT_USER,
                payload: null,
                errMessage: ''
            })
            history.push("/");
        }
    }

    auth.getUserInitials = function() {
        let initials = "";
        if (auth.user) {
            initials += auth.user.firstName.charAt(0);
            initials += auth.user.lastName.charAt(0);
        }
        console.log("user initials: " + initials);
        return initials;
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };