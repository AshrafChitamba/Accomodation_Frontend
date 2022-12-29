import { toast, ToastContainer, Flip } from "react-toastify";
import { useState } from "react";
import AxiosApi from "../../API/AxiosApi";
import { MDBInput, MDBSpinner } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    number: new Number(265),
  });
  const [registerLoading, setRegisterLoading] = useState(false);
  const navigateTo = useNavigate();

  const RegisterDataChange = (event) => {
    const { name, value } = event.target;
    setRegisterData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateRegisterData = () => {
    const validNumber = new RegExp("^\\d+$");
    if (!registerData.username) {
      toast.error("Username is required");
      return false;
    } else if (!registerData.email) {
      toast.error("Email is required");
      return false;
    }
    if (!registerData.number) {
      toast.error("Number is required");
      return false;
    } else if (
      !validNumber.test(registerData.number) ||
      registerData.number.toString().length !== 12
    ) {
      toast.error("Invalid number given");
      return false;
    } else if (!registerData.number.toString().startsWith("265")) {
      toast.error("Number must start with 265");
      return false;
    }
    return true;
  };

  const stateAgentRegister = async (event) => {
    event.preventDefault();
    if (validateRegisterData()) {
      setRegisterLoading((prevState) => true);
      try {
        const { data } = await AxiosApi.post("/agents", registerData);
        if (data.noError) {
          setRegisterLoading((prevState) => false);
          setRegisterData((prev) => ({ username: "", email: "", number: "" }));
          toast.success(data.status);
          setTimeout(() => {
            navigateTo("/auth/login");
          }, 2000);
        } else {
          setRegisterLoading((prevState) => false);
          toast.error(data.error);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="Auth-form-container container-fluid">
      <div
        className="Auth-form shadow-lg bg-white py-4 px-4 rounded-4"
        data-aos="fade-left"
      >
        <form className="mt-3 px-2" onSubmit={stateAgentRegister}>
          <div className="Auth-form-content">
            <div className="text-center">
              <h3 className="Auth-form-title">Sign Up</h3>
            </div>
            <div className="form-group mt-3">
              <MDBInput
                type="text"
                id="username"
                name="username"
                label="Full Name"
                value={registerData.username}
                className="mt-1"
                placeholder="customer's name"
                size="lg"
                onChange={RegisterDataChange}
              />
            </div>

            <div className="form-group mt-3">
              <MDBInput
                type="email"
                id="email"
                name="email"
                label="Email Address"
                value={registerData.email}
                className="mt-1"
                placeholder="Enter email"
                size="lg"
                onChange={RegisterDataChange}
              />
            </div>

            <div className="form-group mt-3">
              <MDBInput
                type="tel"
                id="number"
                name="number"
                label="Contact Number"
                value={registerData.number}
                className="mt-1"
                placeholder="265 ()"
                size="lg"
                onChange={RegisterDataChange}
              />
            </div>

            <div className="mt-3">
              <button className="btn btn-block btn-primary d-flex align-items-center justify-content-center" disabled={registerLoading}>
                {registerLoading ? (
                  <span>
                    <MDBSpinner size="sm" role="status" tag="span" />
                    <span>Loading...</span>
                  </span>
                ) : (
                  "Sign up"
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
        limit={2}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Flip}
      />
    </div>
  );
};
export default Register;
