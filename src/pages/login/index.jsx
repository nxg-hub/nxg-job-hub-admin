import s from "./index.module.scss";
import TextField from "../../components/TextField";
import { updateField } from "../../utils/functions/updateField";
import { useState } from "react";
import logo from "../../static/images/nxg-logo.png";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState();
  const [accessToken, setAccessToken] = useState();
  const [loading, setLoading] = useState();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (formData.email !== "" && formData.password !== "") {
      try {
        const response = await fetch(
          `https://job-hub-91sr.onrender.com/api/v1/admin/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          // const accessToken = response.;
          // console.log(accessToken);
          navigate("/dashboard");
          setLoading(false);
        } else if (response.status === 403) {
          setLoginError(
            "Invalid identifier format: Please enter valid credentials"
          );
          setLoading(false);
        } else if (response.status === 401) {
          setLoginError("Unauthorized: No matching user found");
          setLoading(false);
        } else if (response.status === 500) {
          setLoginError("Database error, please try again");
          setLoading(false);
        } else {
          console.error("Login failed", response.status);
          setLoading(false);
        }
      } catch (error) {
        console.error("Login failed", error);
      }
    }
  };

  return (
    <div className={s.Container}>
      <div className={s.LoginFormWrapper}>
        <img src={logo} alt="" />
        <form action="">
          <h2>Login to Admin Dashboard</h2>
          <h3>Login as an administrator</h3>
          <div>
            <TextField
              label={"email"}
              type={"email"}
              name={"email"}
              id={"email"}
              placeholder="Enter admin email "
              onchange={(e) => updateField(e, setFormData)}
              value={formData.email}
            />
            <TextField
              label={"password"}
              type={"password"}
              name={"password"}
              id={"password"}
              placeholder="Enter admin password"
              onchange={(e) => updateField(e, setFormData)}
              value={formData.password}
            />
            {loginError !== "" && (
              <span className="pt-4 text-sm text-[#e62e2e]">{loginError}</span>
            )}
          </div>

          <button onClick={handleLogin}>Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
