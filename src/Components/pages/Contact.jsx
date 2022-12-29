import { useState } from "react";
import { toast, ToastContainer, Slide } from "react-toastify";
import { MDBInput, MDBSpinner, MDBBtn, MDBTextArea } from "mdb-react-ui-kit";
import AxiosApi from "../../API/AxiosApi";
import { FaFacebookSquare, FaAddressCard } from "react-icons/fa";
import { AiFillTwitterSquare } from "react-icons/ai";
import { MdEmail } from "react-icons/md";

const Contact = () => {
  const [contactData, setContactData] = useState({
    username: "",
    email: "",
    subject: "",
    message: "",
  });
  const [msgSubmitting, setMsgSubmitting] = useState(false);

  const dataChange = (event) => {
    const { name, value } = event.target;
    setContactData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const sendMessage = async (event) => {
    event.preventDefault();
    if (checkData()) {
      setMsgSubmitting((prevState) => true);
      const { data } = await AxiosApi.post("/sendMail", {
        from: {
          username: contactData.username,
          email: contactData.email,
          message: contactData.message,
          subject: contactData.subject,
        },
      });
      if (data.noError) {
        setContactData((prevState) => ({
          username: "",
          email: "",
          message: "",
          subject: "",
        }));
        toast.success(data.status);
        setMsgSubmitting((prevState) => false);
      } else {
        setContactData((prevState) => ({
          username: "",
          email: "",
          message: "",
          subject: "",
        }));
        toast.error(data.error);
        setMsgSubmitting((prevState) => false);
      }
    }
  };

  const checkData = () => {
    const { username, email, message, subject } = contactData;
    if (!username) {
      toast.error("Username is required");
      return false;
    } else if (!email) {
      toast.error("Email is required");
      return false;
    } else if (!message) {
      toast.error("Message is required");
      return false;
    } else if (!subject) {
      toast.error("Subject is required");
      return false;
    } else return true;
  };
  const styles = {
    height: "100vh",
    overflowY: "auto",
  };
  return (
    <div
      className="container-fluid d-grid align-items-start mt-5 pt-5 hide_scroll"
      style={styles}
    >
      <div className="container-fluid mt-3 px-lg-5">
        <div className="row px-lg-5">
          <div className="col-12 col-md-6 col-lg-4 d-grid align-items-center">
            <div className="d-flex flex-wrap gap-2 flex-lg-column align-items-center">
              <div className="p-0 py-2 contact_links_wrapper d-flex flex-column">
                <FaFacebookSquare className="fs-3 icon" />
                <a href="#" className="_link ps-3">
                  monicca Chathema@facebook.
                </a>
              </div>
              <div className="p-0 py-2 contact_links_wrapper d-flex flex-column">
                <AiFillTwitterSquare className="fs-3 icon" />
                <a href="#" className="_link ps-3">
                  chathemam@gmail.com
                </a>
              </div>
              <div className="p-0 py-2 contact_links_wrapper d-flex flex-column">
                <MdEmail className="fs-3 icon" />
                <a href="#" className="_link ps-3">
                  chathemam@gmail.com
                </a>
              </div>
              <div className="p-0 py-2 contact_links_wrapper d-flex flex-column">
                <FaAddressCard className="fs-3 icon" />
                <a href="#" className="_link ps-3">
                  Unima P.O Box, 280, Zomba Malawi.
                </a>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-6">
            <form className="mt-3 px-2" onSubmit={sendMessage}>
              <div className="Auth-form-content">
                <div className="text-center mb-4">
                  <h3 className="text-muted fw-bold fs-4">Send us a Message</h3>
                </div>

                <div className="form-group mt-3 d-flex flex-column flex-sm-row align-items-center gap-3">
                  <div className="container-fluid p-0">
                    <MDBInput
                      type="text"
                      id="username"
                      name="username"
                      value={contactData.username}
                      label="Full Name"
                      className="mt-1"
                      placeholder="customer's name"
                      size="lg"
                      onChange={dataChange}
                    />
                  </div>
                  <div className="container-fluid p-0">
                    <MDBInput
                      type="email"
                      id="email"
                      name="email"
                      label="Email Address"
                      value={contactData.email}
                      className="mt-1"
                      placeholder="Enter email"
                      size="lg"
                      onChange={dataChange}
                    />
                  </div>
                </div>

                <div className="form-group mt-3">
                  <MDBInput
                    type="text"
                    id="subject"
                    name="subject"
                    label="Subject"
                    value={contactData.subject}
                    className="mt-1"
                    placeholder="Enter email"
                    size="lg"
                    onChange={dataChange}
                  />
                </div>

                <div className="form-group mt-3">
                  <MDBTextArea
                    id="message"
                    name="message"
                    label="Message"
                    value={contactData.message}
                    className="mt-1 text_area"
                    placeholder="Enter Message..."
                    rows={4}
                    onChange={dataChange}
                  />
                </div>

                <div className="mt-3 d-grid justify-content-center">
                  <MDBBtn
                    color="primary"
                    className="d-flex align-items-center justify-content-center"
                    disabled={msgSubmitting}
                  >
                    {msgSubmitting ? (
                      <span>
                        <MDBSpinner size="sm" role="status" tag="span" />
                        <span>Sending...</span>
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </MDBBtn>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
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
};

export default Contact;
