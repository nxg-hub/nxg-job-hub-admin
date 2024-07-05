import s from "./index.module.scss";
import TextField from "../../components/TextField";
import { updateField } from "../../utils/functions/updateField";
import { useState } from "react";
import logo from "../../static/images/nxg-logo.png";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (formData.email !== "" && formData.password !== "") {
      try {
        const response = await fetch("https://job-hub-91sr.onrender.com/api/v1/admin/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        
        if (response.ok) {
          // Login successful, navigate to the dashboard
          navigate("/dashboard");
        } else {
          // Login failed
          // console.error("Login failed");
           navigate("/dashboard");
        }
      } catch (error) {
        // console.error("Error during login:", error);
         navigate("/dashboard");
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
          </div>

          <button
            // disabled={
            //   formData.email !== "" && formData.password !== "" ? false : true
            // }
            onClick={handleLogin}
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
