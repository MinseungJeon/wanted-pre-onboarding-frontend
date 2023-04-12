import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../apis";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (value) => {
    if (value.trim() === "") {
      setEmailError("이메일을 입력해주세요.");
    } else if (!value.includes("@")) {
      setEmailError("이메일 형식이 올바르지 않습니다.");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (value) => {
    if (value.trim() === "") {
      setPasswordError("비밀번호를 입력해주세요.");
    } else if (value.trim().length < 8) {
      setPasswordError("비밀번호는 8자 이상이어야 합니다.");
    } else {
      setPasswordError("");
    }
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (emailError === "" && passwordError === "") {
      // TODO: 회원가입 처리
      instance
        .post(
          `auth/signin`,
          { email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          localStorage.setItem("token", response.data.access_token);
          navigate("/todo");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // 로컬 스토리지에 토큰이 있을 경우, /todo 경로로 이동
      navigate("/todo");
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          data-testid="email-input"
        />
        {emailError && <span>{emailError}</span>}
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          data-testid="password-input"
        />
        {passwordError && <span>{passwordError}</span>}
      </div>
      <button
        type="submit"
        data-testid="signin-button"
        disabled={emailError !== "" || passwordError !== ""}
      >
        로그인
      </button>
    </form>
  );
}

export default Signin;
