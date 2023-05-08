import { useState } from "react";
import apiService from "../../api/index";
export default function Login() {
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e, key) => {
    setAccount({
      ...account,
      [key]: e.target.value,
    });
  };
  const handleSubmit = () => {
    apiService.login(account).then((res) => console.log(res));
  };
  return (
    <div>
      <div className="wrapper">
        <div className="logo">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwnjqUx5FPMYp2Zf_dsDECQAh_xMAbaYivg17xLX_If6ykRJXO&s"
            alt=""
          />
        </div>
        <div className="text-center mt-4 name">Đăng Nhập</div>
        <div className="p-3 mt-3">
          <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input
              type="text"
              name="userName"
              id="userName"
              placeholder="Username"
              value={account.username}
              onChange={(e) => handleChange(e, "username")}
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input
              type="password"
              name="password"
              id="pwd"
              placeholder="Password"
              value={account.password}
              onChange={(e) => handleChange(e, "password")}
            />
          </div>
          <button
            className="btn mt-3"
            disabled={!account.password || !account.username}
            onClick={handleSubmit}
          >
            Đăng Nhập
          </button>
        </div>
        {/* <div className="text-center fs-6">
          <a href="#">Forget password?</a> or <a href="#">Sign up</a>
        </div> */}
      </div>
    </div>
  );
}
