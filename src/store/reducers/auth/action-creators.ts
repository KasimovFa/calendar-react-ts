import {IUser} from "../../../models/IUser";
import {AuthActionTypes, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction} from "./types";
import {AppDispatch} from "../../index";
import UserService from "../../../api/UserService";


export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({type:AuthActionTypes.SET_USER, payload:user}),
    setIsAuth:(auth:boolean): SetAuthAction => ({type:AuthActionTypes.SET_AUTH, payload: auth}),
    setIsLoading:(payload: boolean): SetIsLoadingAction => ({type: AuthActionTypes.SET_IS_LOADING, payload}),
    setError:(payload: string): SetErrorAction => ({type:AuthActionTypes.SET_ERROR, payload}),
    login:(username: string, password:string) => async (dispatch:AppDispatch) => {
        dispatch(AuthActionCreators.setIsLoading(true));
        try {
            setTimeout(async () => {
            const {data} = await UserService.getUsers();
            const mockUser = data.find(user => user.username === username && user.password === password);
            if (mockUser) {
                localStorage.setItem('auth', 'true');
                localStorage.setItem('username', username);
                dispatch(AuthActionCreators.setUser(mockUser));
                dispatch(AuthActionCreators.setIsAuth(true));
            } else {
                dispatch(AuthActionCreators.setError('Некорректный email или пароль'))
            }
            dispatch(AuthActionCreators.setIsLoading(false));
        }, 1000)
          }catch (e) {
                dispatch(AuthActionCreators.setError('Произошла ошибка при логине'))
            }
        },

    logout:() => async (dispatch:AppDispatch) => {
        localStorage.removeItem('auth');
        localStorage.removeItem('username');
        dispatch(AuthActionCreators.setUser({} as IUser));
        dispatch(AuthActionCreators.setIsAuth(false));
    }
}