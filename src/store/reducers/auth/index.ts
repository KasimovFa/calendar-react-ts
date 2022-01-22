import {AuthAction, AuthActionTypes, AuthState} from "./types";
import {IUser} from "../../../models/IUser";


const initialState: AuthState = {
    isAuth: false,
    error: '',
    isLoading: false,
    user: {} as IUser
}

export default function (state = initialState, action: AuthAction): AuthState{
   switch (action.type) {
       case AuthActionTypes.SET_AUTH:
           return {...state, isAuth:action.payload, isLoading: false}
       case AuthActionTypes.SET_ERROR:
           return {...state, error:action.payload, isLoading:false}
       case AuthActionTypes.SET_USER:
           return {...state, user:action.payload}
       case AuthActionTypes.SET_IS_LOADING:
           return {...state, isLoading: action.payload}
       default:
           return state
   }
}

