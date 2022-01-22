import React, {FC, useEffect, useState} from 'react';
import {Layout, Menu,Row} from 'antd';
import { useNavigate} from "react-router-dom";
import {RouteNames} from "../router";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/UserActions";

const NavBar:FC = () => {
   const navigate = useNavigate();
   const {isAuth, user} = useTypedSelector(state => state.auth);
   const {logout} = useActions();
   const [auth, setAuth] = useState(false);

   useEffect(() => {
       const auth =  localStorage.getItem('auth');
       if (auth) {
           setAuth(true)
       }
   },[isAuth])

    const exit = () => {
        logout();
        setAuth(false)
    }

    return (
            <Layout.Header>
             <Row justify= "end">
                 {
                    auth ?
                             <>
                                 <div style={{color: 'white'}}>
                                     {user.username}
                                 </div>
                                 <Menu theme="dark" mode="horizontal" selectable={false}>

                                     <Menu.Item
                                         onClick={() => exit()}
                                         key={1}
                                     >
                                         Выйти
                                     </Menu.Item>
                                 </Menu>
                             </>
                             :
                             <Menu theme="dark" mode="horizontal" selectable={false}>
                                 <Menu.Item
                                     onClick={() => navigate(RouteNames.LOGIN)}
                                     key={1}
                                 >
                                     Логин
                                 </Menu.Item>
                             </Menu>
                   }
              </Row>
            </Layout.Header>
    );
};

export default NavBar;