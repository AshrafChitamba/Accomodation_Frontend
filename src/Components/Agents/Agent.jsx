import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdOutlineAdd } from "react-icons/md";
import { HiRefresh } from "react-icons/hi";
import { MDBTooltip } from "mdb-react-ui-kit";
import {
  AddHostelModal,
  DeleteHostelModal,
  EditHostelModal,
} from "./HostelModal";
import { ref, deleteObject } from "firebase/storage";
import storage from "../../API/FirebaseAuth";
import AxiosApi from "../../API/AxiosApi";
import { toast, ToastContainer } from "react-toastify";
import { MDBSpinner, MDBBtn } from "mdb-react-ui-kit";
import Hostel from "./Hostel";

export default function Landowners() {
  const [loggedAgent, setLoggedAgent] = useState({
    username: "",
    email: "",
    _id: "",
    contact: new Number(0),
  });
  const [hostels, setHostels] = useState([]);
  const [hostelsLoading, setHostelsLoading] = useState(true);
  const [addingHostelLoading, setAddingHostelLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingHostelLoading, setEditingHostelLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingHostelLoading, setDeletingHostelLoading] = useState(false);
  const [resetHostelData, setResetHostelData] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [persistedUser, setPersistedUser] = useState(localStorage.getItem("currentAgent"));
  
  const { id } = useParams();
  const navigateTo = useNavigate();
  const [selectedHostel, setSelectedHostel] = useState({
    name: "",
    type: "",
    gender: "",
    price: "",
    location: "",
    distance: "",
    image: "",
    _id: "",
  });

  const styles = {
    height: "100vh",
    overflowY: "auto",
  };
  const getHostels = async () => {
    try {
      const { data } = await AxiosApi.get(`/hostels/${id}`);
      if (data.noError) {
        setHostels((prevState) => data.agentHostels);
        setHostelsLoading((prevState) => false);
      } else {
        toast.error(data.error);
        setHostelsLoading((prevState) => false);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  const logout = async () => {
    setShowLogout((prevstate) => false);
    localStorage.removeItem("currentAgent");
    setPersistedUser(prevState => localStorage.getItem("currentAgent"))
  };
  
  useEffect(() => {
    const persistedUser = localStorage.getItem("currentAgent");
    if (!JSON.parse(persistedUser)) navigateTo("/auth/login");
    else {
      setLoggedAgent((prevState) => JSON.parse(persistedUser));
      getHostels();
    }
  }, [persistedUser]);
  const handleSelectedHostel = (hostel) =>
    setSelectedHostel((prevSelec) => hostel);

  const deleteImgFromStorage = async (url) => {
    const path = decodeURIComponent(url.split("o/")[1].split("?")[0]);
    const fileRef = ref(storage, path);
    // Delete the file
    deleteObject(fileRef)
      .then(() => {
        console.log("File deleted successfully");
      })
      .catch((error) => {
        console.log("Uh oh, an error occurred!");
      });
  };

  const handleAddingHostel = async (hostelData) => {
    setAddingHostelLoading((prevState) => true);
    setResetHostelData((prevState) => false);
    try {
      const { data } = await AxiosApi.post(`/hostels/${id}`, hostelData);
      if (data.noError) {
        setAddingHostelLoading((prevState) => false);
        setShowAddModal((prevState) => false);
        setResetHostelData((prevState) => true);
        setHostels((prevHostels) => [data.postedHostel, ...prevHostels]);
        toast.success(data.status);
      } else {
        setAddingHostelLoading((prevState) => false);
        deleteImgFromStorage(hostelData.image);
        setShowAddModal((prevState) => false);
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEditingHostel = async (hostelEditData) => {
    setEditingHostelLoading((prevState) => true);
    setResetHostelData((prevState) => false);
    try {
      const { data } = await AxiosApi.patch(`/hostels/${selectedHostel._id}`, {
        updateData: hostelEditData,
      });
      if (data.noError) {
        setEditingHostelLoading((prevState) => false);
        setShowEditModal((prevState) => false);
        setResetHostelData((prevState) => true);
        setHostels((prevHostels) => {
          return prevHostels.map((hostel) => {
            return hostel._id === selectedHostel._id
              ? { ...hostel, ...hostelEditData }
              : hostel;
          });
        });
        toast.success(data.status);
        if (selectedHostel.image !== hostelEditData.image)
          deleteImgFromStorage(selectedHostel.image);
      } else {
        setEditingHostelLoading((prevState) => false);
        deleteImgFromStorage(hostelEditData.image);
        setShowEditModal((prevState) => false);
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteHostel = async (selectedHostel) => {
    setDeletingHostelLoading((prev) => true);
    try {
      const { data } = await AxiosApi.delete(`/hostels/${selectedHostel._id}`);
      if (data.noError) {
        setDeletingHostelLoading((prev) => false);
        setShowDeleteModal((prev) => false);
        setHostels((prevHostels) => {
          return prevHostels.filter((hostel) => {
            return hostel._id !== selectedHostel._id;
          });
        });
        deleteImgFromStorage(selectedHostel.image);
        toast.success(data.status);
      } else {
        setShowDeleteModal((prev) => false);
        setDeletingHostelLoading((prev) => true);
        toast.error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const allHostels = hostels.map((hostel) => {
    const { name, type, gender, price, location, distance, image, _id } =
      hostel;
    return (
      <Hostel
        key={hostel._id}
        hostel={hostel}
        showEditModal={() => {
          setShowEditModal((prevState) => true);
          handleSelectedHostel({
            name,
            type,
            gender,
            price,
            location,
            distance,
            image,
            _id,
          });
        }}
        showDeleteModal={() => {
          setShowDeleteModal((prevState) => true);
          handleSelectedHostel({
            name,
            type,
            gender,
            price,
            location,
            distance,
            image,
            _id,
          });
        }}
        isAgent={true}
      />
    );
  });

  return (
    <div
      className="container-fluid px-0 hide_scroll_sm position-relative"
      style={styles}
    >
      <div className="container-fluid bg-primary mb-3 py-2 d-flex align-items-center justify-content-between px-lg-5">
        <div className="py-2 px-4">
          <h6 className="fs-4 text-light text-nowrap fw-bold fst-italic">
            {loggedAgent.username}
          </h6>
        </div>
        <div
          className="px-2 py-1 rounded-circle text-light"
          style={{ cursor: "pointer" }}
          onClick={() => setShowLogout((prevstate) => true)}
        >
          <MDBTooltip placement="bottom" title="Logout">
            <h6 className="fs-4 fw-bold">
              {loggedAgent.username.charAt(0).toUpperCase()}
            </h6>
          </MDBTooltip>
        </div>
      </div>
      <div className="px-2 px-lg-4">
        <div className="border-bottom px-2 px-lg-5 pb-2 d-flex align-items-center justify-content-start flex-wrap">
          <div className="d-flex align-items-center gap-2">
            <MDBBtn
              color="primary"
              className="px-3 d-flex align-items-center"
              onClick={() => setShowAddModal((prevState) => true)}
            >
              <MdOutlineAdd className="fs-3" /> Add Hostel
            </MDBBtn>
            <MDBBtn
              color="success"
              className="px-3 d-flex align-items-center"
              onClick={() => window.location.reload()}
            >
              <HiRefresh className="fs-3" /> Refresh
            </MDBBtn>
          </div>
        </div>
        <div className="container-fluid mt-3 pb-5">
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
            <div className="row">
              {!allHostels.length ? (
                <div className="col-12 bg-primary rounded-4 text-bold text-light py-3 px-2 text-center">
                  No Posted Hostel. Click the Button above to add One
                </div>
              ) : (
                allHostels
              )}
            </div>
          )}
        </div>
      </div>
      {showLogout && (
        <div
          className="container-fluid position-fixed start-0 top-0 d-grid justify-content-center align-items-center"
          style={{
            backgroundColor: "rgb(0, 0, 0, 0.4)",
            minHeight: "100vh",
            zIndex: "9",
          }}
        >
          <div
            className="Auth-form-content shadow-lg bg-white pt-3 pb-4 px-3 rounded-4 position-relative"
            data-aos="fade-up"
          >
            <div className="text-center mb-4">
              <h6 className="fw-bold">Are you sure you want to Logout ?</h6>
            </div>

            <div className="d-flex align-items-center justify-content-center gap-3">
              <button
                className="btn btn-outline-danger"
                onClick={() => setShowLogout((prevstate) => false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={logout}>Logout</button>
            </div>
          </div>
        </div>
      )}

      <AddHostelModal
        open={showAddModal}
        setShowAddModal={setShowAddModal}
        addingHostelLoading={addingHostelLoading}
        resetHostelData={resetHostelData}
        toggleModal={() => setShowAddModal((prevState) => !prevState)}
        handleAddingHostel={handleAddingHostel}
      />
      <EditHostelModal
        open={showEditModal}
        setShowEditModal={setShowEditModal}
        editingHostelLoading={editingHostelLoading}
        resetEditHostelData={resetHostelData}
        selectedHostel={selectedHostel}
        toggleModal={() => setShowEditModal((prevState) => !prevState)}
        handleEditingHostel={handleEditingHostel}
      />
      <DeleteHostelModal
        open={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        toggleModal={() => setShowDeleteModal((prevState) => !prevState)}
        deleteHostel={() =>
          deleteHostel({ image: selectedHostel.image, _id: selectedHostel._id })
        }
        deletingHostelLoading={deletingHostelLoading}
      />
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
      />
    </div>
  );
}
