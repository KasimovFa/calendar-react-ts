import React, {useState} from 'react';
import {Button, Form, Input} from "antd";
import {rules} from "../utils/rules";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/UserActions";

const LoginForm = () => {
    const {login} = useActions();
    const {isLoading, error} = useTypedSelector(state => state.auth)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const submit = () => {
        login(email, password)
    }
    return (
       <Form  onFinish={submit}>
           {error && <div style={{color: 'red'}}>
               {error}
           </div>}
           <Form.Item
               label="Имя пользователя"
               name = "username"
               rules = {[rules.required("Пожалуйста введите почту")]}
           >
               <Input
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
               />
           </Form.Item>
           <Form.Item
               label="Пароль"
               name = "password"
               rules = {[rules.required("Пожалуйста введите пароль")]}
           >
               <Input
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   type = {"password"}
               />

           </Form.Item>
           <Form.Item>
               <Button
                   type = "primary"
                   htmlType="submit"
                   loading={isLoading}
               >
                   Войти
               </Button>
           </Form.Item>
       </Form>
    );
};

export default LoginForm;