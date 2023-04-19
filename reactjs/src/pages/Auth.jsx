import React, { useState } from "react";
import axios from "axios";
const API = "http://localhost:3001/api/";

function Auth() {
  const [loginLogin, setLoginLogin] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [signupLogin, setSignupLogin] = useState("");
  const [signupPass, setSignupPass] = useState("");
  const [signupRepPass, setSignupRepPass] = useState("");
  function handler(e, state) {
    state(e.target.value);
  }
  function register() {
    axios({
      method: "post",
      url: API + "create",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        login: signupLogin,
        pass: signupPass,
        repPass: signupRepPass,
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function login() {
    axios({
      method: "post",
      url: API + "auth",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: {
        login: loginLogin,
        pass: loginPass,
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div className="login">
      <div className="log_block">
        <p className="head">Войти</p>
        <input
          value={loginLogin}
          onChange={(e) => handler(e, setLoginLogin)}
          type="text"
          placeholder="Логин"
        />
        <input
          value={loginPass}
          onChange={(e) => handler(e, setLoginPass)}
          type="password"
          placeholder="Пароль"
        />
        <button onClick={() => login()}>Войти</button>
      </div>
      <div className="log_block">
        <p className="head">Регистрация</p>
        <input
          value={signupLogin}
          onChange={(e) => handler(e, setSignupLogin)}
          type="text"
          placeholder="Логин"
        />
        <input
          value={signupPass}
          onChange={(e) => handler(e, setSignupPass)}
          type="password"
          placeholder="Пароль"
        />
        <input
          value={signupRepPass}
          onChange={(e) => handler(e, setSignupRepPass)}
          type="password"
          placeholder="Повторите пароль"
        />
        <button onClick={() => register()}>Зарегистрироваться</button>
      </div>
    </div>
  );
}

export default Auth;
