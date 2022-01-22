import React, {useEffect, useState} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import {privateRoutes, publicRoutes, RouteNames} from "../router";
import {useTypedSelector} from "../hooks/useTypedSelector";

const AppRouter = () => {
    const {isAuth} = useTypedSelector(state => state.auth);

    return (
        isAuth ?
               <Routes>
                   {
                       privateRoutes.map((r,i) => {
                           return (<Route
                               key = {i}
                               path = {r.path}
                               element={<r.component/>}
                           />)
                       })
                   }
                   <Route path = "*" element={<Navigate to={RouteNames.EVENT} />}/>
               </Routes>
            :
                <Routes>
                    {
                        publicRoutes.map((r,i) => {
                            return (
                                <Route
                                    key = {i}
                                    path = {r.path}
                                    element={<r.component />}
                                />)
                        })
                    }
                    <Route path = "*" element={<Navigate to={RouteNames.LOGIN} />}/>
                </Routes>
    )
};

export default AppRouter;