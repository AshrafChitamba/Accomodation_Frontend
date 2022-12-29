import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBFile,
  MDBInput,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { MdOutlineAdd } from "react-icons/md";
import { BiErrorCircle, BiSave } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../API/FirebaseAuth";

export const AddHostelModal = (props) => {
  const {
    open,
    setShowModal,
    toggleModal,
    handleAddingHostel,
    addingHostelLoading,
    resetHostelData,
  } = props;
  const [hostelData, setHostelData] = useState({
    name: "",
    type: "",
    gender: "",
    price: "",
    location: "",
    distance: "",
    image: "",
  });
  const [showPercentage, setShowPercentage] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [fileChosen, setFileChosen] = useState({ file: "", inputName: "" });
  const [fileChosenError, setFileChosenError] = useState({
    error: false,
    errorMsg: "",
  });
  const fileInput = useRef(null);

  useEffect(() => {
    if (resetHostelData)
      setHostelData((prevSTate) => ({
        name: "",
        type: "",
        location: "",
        price: "",
        image: "",
        distance: "",
        gender: "",
      }));
  }, [resetHostelData]);

  const hostelInfoChange = (TSE) => {
    const { name, type, value } = TSE.target;
    if (type !== "file") {
      setHostelData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setFileChosenError((prevState) => false);
      const validImage = new RegExp("\\.(jpe?g|png|webp|bmp|jfif)$", "i");
      const file = TSE.currentTarget.files[0];

      if (!file) {
        setHostelData((prevState) => ({
          ...prevState,
          [name]: "",
        }));
        setFileChosenError((prevState) => ({
          error: true,
          errorMsg: "no file chosen",
        }));
      } else if (file.name.match(validImage)) {
        setFileChosen((prevFile) => ({ file, inputName: name }));
        setHostelData((prevState) => ({
          ...prevState,
          [name]: file.type,
        }));
      } else {
        setHostelData((prevState) => ({
          ...prevState,
          [name]: "",
        }));
        setFileChosenError((prevState) => ({
          error: true,
          errorMsg: "invalid file format chosen",
        }));
      }
    }
  };

  const handleSendFile = (fileSelected) => {
    setShowPercentage((prevState) => true);
    const storageRef = ref(
      storage,
      `/accomodation/hostel${fileSelected.file.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, fileSelected.file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setPercentage((prevCent) =>
          Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        );
      },
      (error) => console.warn(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          handleAddingHostel({
            ...hostelData,
            [fileSelected.inputName]: url,
          });
          fileInput.current.value = null;
          setShowPercentage((prevState) => false);
        });
      }
    );
  };

  return (
    <MDBModal
      show={open}
      tabIndex="-1"
      setShow={setShowModal}
      className="hide_scroll"
    >
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader className="bg-primary text-white">
            <MDBModalTitle>Add Hostel...</MDBModalTitle>
            <MDBBtn
              color="none"
              className="btn-close btn-close-white"
              onClick={toggleModal}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <div className="fw-bold text-muted">
              <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between">
                <div className="mb-2">
                  <label htmlFor="hostelName">
                    Hostel Name
                  </label>
                  <MDBInput
                    id="hostelName"
                    name="name"
                    placeholder="Enter Name..."
                    type="text"
                    value={hostelData.name}
                    onChange={hostelInfoChange}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="hostelType">Hostel Type</label>
                  <MDBInput
                    id="hostelType"
                    name="type"
                    placeholder="Beds Per Room..."
                    type="text"
                    value={hostelData.type}
                    onChange={hostelInfoChange}
                  />
                </div>
              </div>
              <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between">
                <div className="mb-2">
                  <label htmlFor="hostelPrice">Hostel Price</label>
                  <MDBInput
                    id="hostelPrice"
                    name="price"
                    placeholder="HostelAmount..."
                    type="text"
                    value={hostelData.price}
                    onChange={hostelInfoChange}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="hostelLocation">Hostel Location</label>
                  <MDBInput
                    id="hostelLocation"
                    name="location"
                    placeholder="Enter Location..."
                    type="text"
                    value={hostelData.location}
                    onChange={hostelInfoChange}
                  />
                </div>
              </div>
              <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between">
                <div className="mb-2">
                  <label htmlFor="hostelGender">Hostel Gender</label>
                  <MDBInput
                    id="hostelGender"
                    name="gender"
                    placeholder="Allowed Gender..."
                    type="text"
                    value={hostelData.gender}
                    onChange={hostelInfoChange}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="hostelDistance">Distance (Km)</label>
                  <MDBInput
                    id="hostelDistance"
                    name="distance"
                    placeholder="Campus to Hostel (km)..."
                    type="text"
                    value={hostelData.distance}
                    onChange={hostelInfoChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="hostelImage">Hostel Image</label>
                <MDBFile
                  id="hostelImage"
                  name="image"
                  accept="image/*"
                  inputRef={fileInput}
                  onChange={hostelInfoChange}
                />
                <div className="container-fluid">
                  {fileChosenError.error && (
                    <p className="text-danger py-1 m-0 d-flex align-items-center justify-content-center gap-1">
                      <BiErrorCircle />
                      <span>{fileChosenError.errorMsg}</span>
                    </p>
                  )}
                  {showPercentage && percentage < 100 && (
                    <div className="text-center mt-1">
                      <p className="bg-primary d-inline-block px-2 py-0 rounded-2 fs-6 text-light">
                        {`uploading image please wait ${percentage}%`}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn
              color="danger"
              className="d-flex align-items-center"
              onClick={toggleModal}
            >
              <IoClose className="fs-5" /> Cancel
            </MDBBtn>
            <MDBBtn
              color="primary"
              className="d-flex align-items-center"
              disabled={
                Object.values(hostelData).filter((value) => value !== "")
                  .length !== Object.keys(hostelData).length ||
                showPercentage ||
                addingHostelLoading
              }
              onClick={() => handleSendFile(fileChosen)}
            >
              {showPercentage || addingHostelLoading ? (
                <MDBSpinner size="sm" role="status" tag="span" />
              ) : (
                <MdOutlineAdd className="fs-5" />
              )}

              {addingHostelLoading
                ? "Posting..."
                : showPercentage
                ? "Uploading..."
                : "Add"}
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};

export const DeleteHostelModal = (props) => {
  const {
    open,
    setShowDeleteModal,
    toggleModal,
    deleteHostel,
    deletingHostelLoading,
  } = props;
  return (
    <MDBModal tabIndex="-1" show={open} setShow={setShowDeleteModal}>
      <MDBModalDialog centered>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Delete Hostel...</MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={toggleModal}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <p>Are you sure you want to delete this post ?</p>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn
              outline
              color="danger"
              className="d-flex align-items-center"
              onClick={toggleModal}
            >
              <IoClose className="fs-5" /> Cancel
            </MDBBtn>
            <MDBBtn
              color="danger"
              className="d-flex align-items-center"
              disabled={deletingHostelLoading}
              onClick={deleteHostel}
            >
              {deletingHostelLoading ? (
                <MDBSpinner size="sm" role="status" tag="span" />
              ) : (
                <MdOutlineDeleteSweep className="fs-5" />
              )}

              {deletingHostelLoading ? "Deleting..." : "Delete"}
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};
export const EditHostelModal = (props) => {
  const {
    open,
    setShowEditModal,
    toggleModal,
    handleEditingHostel,
    editingHostelLoading,
    resetEditHostelData,
    selectedHostel,
  } = props;
  const [hostelData, setHostelData] = useState({
    name: "",
    type: "",
    gender: "",
    price: "",
    location: "",
    distance: "",
    image: "",
  });
  const [showPercentage, setShowPercentage] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [fileChosen, setFileChosen] = useState({ file: "", inputName: "" });
  const [fileChosenError, setFileChosenError] = useState({
    error: false,
    errorMsg: "",
  });
  const fileInput = useRef(null);

  useEffect(() => {
    setHostelData((prevState) => ({ ...prevState, ...selectedHostel }));
  }, [selectedHostel]);
  useEffect(() => {
    if (resetEditHostelData)
      setHostelData((prevSTate) => ({
        name: "",
        type: "",
        location: "",
        price: "",
        image: "",
        distance: "",
        gender: "",
      }));
  }, [resetEditHostelData]);

  const hostelInfoChange = (TSE) => {
    const { name, type, value } = TSE.target;
    if (type !== "file") {
      setHostelData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setFileChosenError((prevState) => false);
      const validImage = new RegExp("\\.(jpe?g|png|webp|bmp|jfif)$", "i");
      const file = TSE.currentTarget.files[0];

      if (!file) {
        setHostelData((prevState) => ({
          ...prevState,
          [name]: "",
        }));
        setFileChosenError((prevState) => ({
          error: true,
          errorMsg: "no file chosen",
        }));
      } else if (file.name.match(validImage)) {
        setFileChosen((prevFile) => ({ file, inputName: name }));
        setHostelData((prevState) => ({
          ...prevState,
          [name]: file.type,
        }));
      } else {
        setHostelData((prevState) => ({
          ...prevState,
          [name]: "",
        }));
        setFileChosenError((prevState) => ({
          error: true,
          errorMsg: "invalid file format chosen",
        }));
      }
    }
  };

  const handleSendFile = (fileSelected) => {
    setShowPercentage((prevState) => true);
    const storageRef = ref(
      storage,
      `/accomodation/hostel${fileSelected.file.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, fileSelected.file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setPercentage((prevCent) =>
          Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        );
      },
      (error) => console.warn(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          handleEditingHostel({
            ...hostelData,
            [fileSelected.inputName]: url,
          });
          fileInput.current.value = null;
          setShowPercentage((prevState) => false);
        });
      }
    );
  };
  const finalCheckUploadData = () => {
    if (
      Object.values(hostelData).some((value) =>
        String(value).startsWith("image/")
      )
    ) {
      handleSendFile(fileChosen);
    } else handleEditingHostel(hostelData);
  };
  return (
    <MDBModal
      show={open}
      tabIndex="-1"
      setShow={setShowEditModal}
      className="hide_scroll"
    >
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader className="bg-primary text-white">
            <MDBModalTitle>Edit Hostel...</MDBModalTitle>
            <MDBBtn
              color="none"
              className="btn-close btn-close-white"
              onClick={toggleModal}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <div className="fw-bold text-muted">
              <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between">
                <div className="mb-2">
                  <label htmlFor="editHostelName" className="">
                    Hostel Name
                  </label>
                  <MDBInput
                    id="editHostelName"
                    name="name"
                    placeholder="Enter Name..."
                    type="text"
                    value={hostelData.name}
                    onChange={hostelInfoChange}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="editHostelType">Hostel Type</label>
                  <MDBInput
                    id="editHostelType"
                    name="type"
                    placeholder="Beds Per Room..."
                    type="text"
                    value={hostelData.type}
                    onChange={hostelInfoChange}
                  />
                </div>
              </div>
              <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between">
                <div className="mb-2">
                  <label htmlFor="editHostelPrice">Hostel Price</label>
                  <MDBInput
                    id="editHostelPrice"
                    name="price"
                    placeholder="HostelAmount..."
                    type="text"
                    value={hostelData.price}
                    onChange={hostelInfoChange}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="editHostelLocation">Hostel Location</label>
                  <MDBInput
                    id="editHostelLocation"
                    name="location"
                    placeholder="Enter Location..."
                    type="text"
                    value={hostelData.location}
                    onChange={hostelInfoChange}
                  />
                </div>
              </div>
              <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between">
                <div className="mb-2">
                  <label htmlFor="editHostelGender">Hostel Gender</label>
                  <MDBInput
                    id="editHostelGender"
                    name="gender"
                    placeholder="Allowed Gender..."
                    type="text"
                    value={hostelData.gender}
                    onChange={hostelInfoChange}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="editHostelDistance">Distance (Km)</label>
                  <MDBInput
                    id="editHostelDistance"
                    name="distance"
                    placeholder="Campus to Hostel (km)..."
                    type="text"
                    value={hostelData.distance}
                    onChange={hostelInfoChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="editHostelImage">Hostel Image</label>
                <MDBFile
                  id="editHostelImage"
                  name="image"
                  accept="image/*"
                  inputRef={fileInput}
                  onChange={hostelInfoChange}
                />
                <div className="container-fluid">
                  {fileChosenError.error && (
                    <p className="text-danger py-1 m-0 d-flex align-items-center justify-content-center gap-1">
                      <BiErrorCircle />
                      <span>{fileChosenError.errorMsg}</span>
                    </p>
                  )}
                  {showPercentage && percentage < 100 && (
                    <div className="text-center mt-1">
                      <p className="bg-primary d-inline-block px-2 py-0 rounded-2 fs-6 text-light">
                        {`uploading image please wait ${percentage}%`}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn
              color="danger"
              className="d-flex align-items-center"
              onClick={toggleModal}
            >
              <IoClose className="fs-5" /> Cancel
            </MDBBtn>
            <MDBBtn
              color="primary"
              className="d-flex align-items-center"
              disabled={
                Object.values(hostelData).filter((value) => value !== "")
                  .length !== Object.keys(hostelData).length ||
                showPercentage ||
                editingHostelLoading
              }
              onClick={finalCheckUploadData}
            >
              {showPercentage || editingHostelLoading ? (
                <MDBSpinner size="sm" role="status" tag="span" />
              ) : (
                <BiSave className="fs-5" />
              )}

              {editingHostelLoading
                ? "Posting..."
                : showPercentage
                ? "Uploading..."
                : "Save"}
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};
