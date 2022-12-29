// import animation from "./Login.module.css";
import { toast, ToastContainer, Flip } from "react-toastify";
import { useState } from "react";
import AxiosApi from "../../API/AxiosApi";
import { useNavigate } from "react-router-dom";
import { MDBInput, MDBSpinner } from "mdb-react-ui-kit";
const Login = () => {
  const [loginData, setLoginData] = useState({ username: "", email: "" });
  const [loginLoading, setLoginLoading] = useState(false);
  const navigateTo = useNavigate();

  const loginDataChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const persistLoggedAgent = async (agent) => {
    localStorage.setItem("currentAgent", JSON.stringify(agent));
  };

  const validateLoginData = () => {
    if (!loginData.username) {
      toast.error("Username is required");
      return false;
    } else if (!loginData.email) {
      toast.error("Email is required");
      return false;
    }
    return true;
  };

  const agentsLogin = async (event) => {
    event.preventDefault();
    if (validateLoginData()) {
      setLoginLoading((prevState) => true);
      try {
        const { data } = await AxiosApi.post("/agents/login", loginData);
        if (data.noError) {
          const { username, email, contact } = data.foundAgent;
          persistLoggedAgent({
            username,
            email,
            contact,
          });
          setLoginLoading((prevState) => false);
          navigateTo(data.redirectRoute);
        } else {
          setLoginLoading((prevState) => false);
          setLoginData((prev) => ({ username: "", email: "" }));
          toast.error(data.error);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  return (
    <div className="Auth-form-container container-fluid position-relatie">
      <div
        className="Auth-form shadow-lg bg-white py-4 px-4 rounded-4"
        data-aos="fade-right"
      >
        <form className="mt-3 px-2" onSubmit={agentsLogin}>
          <div className="Auth-form-content">
            <div className="text-center">
              <h3 className="Auth-form-title">Sign In</h3>
            </div>
            <div className="form-group mt-3">
              <MDBInput
                type="text"
                id="username"
                name="username"
                value={loginData.username}
                label="Full Name"
                className="mt-1"
                placeholder="customer's name"
                size="lg"
                onChange={loginDataChange}
              />
            </div>

            <div className="form-group mt-3">
              <MDBInput
                type="email"
                id="email"
                name="email"
                label="Email Address"
                value={loginData.email}
                className="mt-1"
                placeholder="Enter email"
                size="lg"
                onChange={loginDataChange}
              />
            </div>
    
            <div className="mt-3">
              <button
                className="btn btn-block btn-primary d-flex align-items-center justify-content-center"
                disabled={loginLoading}
              >
                {loginLoading ? (
                  <span>
                    <MDBSpinner size="sm" role="status" tag="span" />
                    <span>Loading...</span>
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        limit={2}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Flip}
      />
    </div>
  );
};
export default Login;
