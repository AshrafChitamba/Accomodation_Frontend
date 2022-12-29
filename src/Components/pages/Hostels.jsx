// import animation from "../Auth/Login.module.css"; ${animation.slideUp}
import { MDBSpinner, MDBInput } from "mdb-react-ui-kit";
import Hostel from "../Agents/Hostel";
import { useEffect, useState } from "react";
import { toast, ToastContainer, Slide } from "react-toastify";
import AxiosApi from "../../API/AxiosApi";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { IoClose } from "react-icons/io5";
import { HiSearch } from "react-icons/hi";
import { TbSearchOff } from "react-icons/tb";

function Hostels() {
  const [hostels, setHostels] = useState([]);
  const [hostelsLoading, setHostelsLoading] = useState(true);
  // const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchBy, setSearchBy] = useState("name");

  //controllig when to show the submit form
  const [paymentForm, setPaymentForm] = useState({
    visible: false,
    showSignIn: false,
    showPaymentMode: false,
  });
  const [selectedHostel, setSelectedHostel] = useState({
    price: 0,
    hostelName: "",
    _id: "",
  });
  const [studentDetails, setStudentDetails] = useState({
    number: Number(265),
    email: "",
  });

  const styles = {
    height: "100vh",
    overflowY: "auto",
  };

  const getHostels = async () => {
    try {
      const { data } = await AxiosApi.get("/hostels/student");
      if (data.noError) {
        setHostels((prevState) => data.foundHostels);
        setHostelsLoading((prevState) => false);
        // if (data.foundHostels) setIsSearching((prevState) => true);
      } else {
        setHostelsLoading((prevState) => false);
        toast.error(data.error);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const validateData = () => {
    const { number, email } = studentDetails;
    const validNumber = new RegExp("^\\d+$");
    if (!email) {
      toast.error("Email is required");
      return false;
    } else if (!number) {
      toast.error("Number is required");
      return false;
    } else if (!validNumber.test(number) || number.toString().length !== 12) {
      toast.error("Invalid number given");
      return false;
    } else if (!number.toString().startsWith("265")) {
      toast.error("Number must start with 265");
      return false;
    }
    return true;
  };

  const makePayment = (event) => {
    event.preventDefault();
    if (validateData()) {
      setPaymentForm((prevState) => ({
        ...prevState,
        showPaymentMode: true,
        showSignIn: false,
      }));
    }
  };

  const closePaymentForm = () => {
    setPaymentForm((prevState) => ({
      showPaymentMode: false,
      showSignIn: false,
      visible: false,
    }));
  };

  useEffect(() => {
    getHostels();
  }, []);
  // integrating the paypal payment
  // 1. making the order
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: selectedHostel.hostelName,
          amount: {
            value: selectedHostel.price / 1300,
          },
        },
      ],
    });
  };
  // 2. once the transaction has been approved by the buyer
  const onPaymentApproval = async (data, actions) => {
    const order = await actions.order.capture();
    console.log("Order", order);
    alert(data.orderID);
    toast.success("Payment Approved Make API Call");
    // updating the unbooked state of the hostel
    try {
      const { data } = await AxiosApi.patch(`/hostels/${selectedHostel._id}`, {
        updateData: { booked: true },
      });
      if (data.noError) {
        setHostels((prevHostels) => {
          return prevHostels.map((hostel) => {
            return hostel._id === selectedHostel._id
              ? { ...hostel, booked: true }
              : hostel;
          });
        });
        closePaymentForm();
        toast.success(data.status);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  // 3. in case there is any error on paymeny
  const onPaymentError = async (error) => {
    console.error("Payment Error", error);
    alert("Payment Error");
  };
  // 4. in case the student cancels the paypal checkout
  const onCancelCheckout = () => {
    toast.error("Checkout cancelled");
  };
  
  const allHostels = hostels
    .filter((hostel) => {
      if (!searchValue) return hostel;
      else if (searchBy === "gender") {
        if (hostel.gender.toLowerCase().startsWith(searchValue.toLowerCase())) {
          return hostel;
        }
      } else if (
        String(hostel[searchBy])
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
        return hostel;
    })
    .map((hostel) => {
      return (
        <Hostel
          key={hostel._id}
          hostel={hostel}
          isAgent={false}
          showPaymentMode={() => {
            setPaymentForm((prevState) => ({
              ...prevState,
              visible: true,
              showSignIn: true,
            }));
            setSelectedHostel((prevSel) => ({
              _id: hostel._id,
              hostelName: hostel.name,
              price: hostel.price,
            }));
          }}
        />
      );
    });

  return (
    <div
      className="container-fluid mt-5 pb-lg-4 pt-5 px-0 px-lg-5 hide_scroll_sm"
      style={styles}
    >
      <div className="container-fluid mt-3 pb-5 px-lg-5">
        {hostelsLoading ? (
          <div className="text-center">
            <MDBSpinner
              className="me-2"
              color="primary"
              style={{ width: "3rem", height: "3rem" }}
            >
              <span className="visually-hidden">Loading...</span>
            </MDBSpinner>
            <p className="fw-bold text-primary">Loading Hostels...</p>
          </div>
        ) : (
          <div className="container-fluid px-0">
            {!hostels.length ? (
              <div className="col-12 bg-primary rounded-4 text-bold text-light py-3 px-2 text-center">
                No Hostels Found
              </div>
            ) : (
              <div>
                <div className="text-center mb-3 mb-lg-4">
                  <h4 className="fs-4 fw-bold d-inline-block text-muted border-bottom border-3 border-primary">
                    Available Hostels
                  </h4>
                  <div className="d-flex align-items-center justify-content-end gap-2 border-bottom  pe-1 pe-lg-3 mt-2 pb-2">
                    <div className="position-relative">
                      <input
                        type="search"
                        id="search"
                        name="search"
                        placeholder="Type to search..."
                        className="ps-5 form-control py-1"
                        value={searchValue}
                        autoFocus
                        onChange={(event) =>
                          setSearchValue((prevVal) => event.target.value)
                        }
                      />
                      <div className="position-absolute top-50 start-0 translate-middle ps-5">
                        <HiSearch className="fs-3 rounded-circle bg-light p-1 text-primary" />
                      </div>
                    </div>
                    <select
                      className="form-select form-select-sm py-2"
                      aria-label="search_by"
                      onChange={(event) =>
                        setSearchBy((prevVal) => event.target.value)
                      }
                      style={{ width: "max-content" }}
                    >
                      <option disabled>__Sort by__</option>
                      <option value="name">Name</option>
                      <option value="price">Price</option>
                      <option value="gender">Gender</option>
                      <option value="type">Beds per Room</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  {!allHostels.length ? (
                    <div className="col-12 bg-light rounded-4 text-bold py-4 px-2 text-center">
                      <TbSearchOff className="fs-1 text-muted" />
                      <span className="text-muted fs-4">No Results Found</span>
                    </div>
                  ) : (
                    allHostels
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {paymentForm.visible && (
        <div
          className="container-fluid position-fixed start-0 top-0 d-grid justify-content-center align-items-center"
          style={{
            backgroundColor: "rgb(0, 0, 0, 0.4)",
            minHeight: "100vh",
            zIndex: "9",
          }}
        >
          {paymentForm.showSignIn && (
            <div
              className={`Auth-form shadow-lg bg-white py-4 px-5 rounded-4 position-relative`}
              data-aos="fade-up"
            >
              <IoClose
                className="fs-3 position-absolute start-100 top-0 translate-middle rounded-circle bg-warning text-light p-1 close_icon"
                onClick={closePaymentForm}
              />
              <form onSubmit={makePayment}>
                <div className="Auth-form-content">
                  <div className="text-center mb-4">
                    <h5 className="Auth-form-title">Customer Details</h5>
                  </div>
                  <div className="form-group mt-3">
                    <MDBInput
                      id="studentNumber"
                      type="tel"
                      value={studentDetails.email}
                      className="mt-1"
                      placeholder="Email Address..."
                      onChange={(event) =>
                        setStudentDetails((prevState) => ({
                          ...prevState,
                          email: event.target.value,
                        }))
                      }
                      label="Email Address*"
                      size="lg"
                    />
                  </div>
                  <div className="form-group mt-3">
                    <MDBInput
                      id="studentNumber"
                      type="tel"
                      value={studentDetails.number}
                      className="mt-1"
                      placeholder="your number..."
                      onChange={(event) =>
                        setStudentDetails((prevState) => ({
                          ...prevState,
                          number: event.target.value,
                        }))
                      }
                      label="Mobile Number*"
                      size="lg"
                    />
                  </div>

                  <div className="d-grid justify-content-end mt-3">
                    <button type="submit" className="btn btn-primary">
                      Next
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
          {paymentForm.showPaymentMode && (
            <div
              className="Auth-form-content shadow-lg bg-white py-4 px-5 rounded-4 position-relative"
              data-aos="fade-left"
            >
              <IoClose
                className="fs-3 position-absolute start-100 top-0 translate-middle rounded-circle bg-warning text-light p-1 close_icon"
                onClick={closePaymentForm}
              />
              <div className="text-center mb-3">
                <h5 className="Auth-form-title">Mode of Payment</h5>
              </div>
              <PayPalButtons
                createOrder={createOrder}
                onApprove={onPaymentApproval}
                onError={onPaymentError}
                onCancel={onCancelCheckout}
              />
            </div>
          )}
        </div>
      )}

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
        transition={Slide}
      />
    </div>
  );
}

export default Hostels;
