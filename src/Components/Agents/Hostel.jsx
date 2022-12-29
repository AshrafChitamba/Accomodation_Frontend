import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
  MDBCardFooter,
} from "mdb-react-ui-kit";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import moment from "moment";

const Hostel = ({
  hostel,
  showEditModal,
  showDeleteModal,
  isAgent,
  showPaymentMode,
}) => {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-2">
      <MDBCard className="position-relative">
        <MDBRipple
          rippleColor="light"
          rippleTag="div"
          className="bg-image hover-overlay"
        >
          <MDBCardImage
            src={hostel.image}
            alt="hostel Image"
            className="w-100"
          />
          <span>
            <div
              className="mask"
              style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
            ></div>
          </span>
        </MDBRipple>
        <MDBCardBody className={`${isAgent ? "py-3" : "py-2"}`}>
          <MDBCardTitle className="fw-bold text-muted mb-1 text-capitalize">
            {hostel.name}
          </MDBCardTitle>
          <div className="d-flex flex-wrap align-items-center justify-content-between">
            <div className="text-muted text-capitalize fst-italic d-flex align-items-center gap-2">
              <MDBCardText className="fw-bold">Type: </MDBCardText>
              <MDBCardText>{hostel.type}</MDBCardText>
            </div>
            <div className="text-muted text-capitalize fst-italic d-flex align-items-center gap-2">
              <MDBCardText className="fw-bold">Gender: </MDBCardText>
              <MDBCardText>{hostel.gender}</MDBCardText>
            </div>
          </div>
          <div className="d-flex flex-wrap align-items-center justify-content-between">
            <div className="text-muted text-capitalize fst-italic d-flex align-items-center gap-2">
              <MDBCardText className="fw-bold">Location: </MDBCardText>
              <MDBCardText>{hostel.location}</MDBCardText>
            </div>
            <div className="text-muted text-capitalize fst-italic d-flex align-items-center gap-2">
              <MDBCardText className="fw-bold">Distance: </MDBCardText>
              <MDBCardText>{hostel.distance}</MDBCardText>
            </div>
          </div>
          <div className="text-muted text-capitalize fst-italic d-flex align-items-center gap-2">
            <MDBCardText className="fw-bold">Amount: </MDBCardText>
            <MDBCardText>Mk {hostel.price}</MDBCardText>/month
          </div>
          {isAgent && (
            <div className="text-muted text-capitalize fst-italic d-flex align-items-center gap-2">
              <MDBCardText className="fw-bold">Status: </MDBCardText>
              <MDBCardText>{hostel.booked ? "Booked" : "Unbooked"}</MDBCardText>
            </div>
          )}
          {!isAgent && (
            <MDBBtn onClick={showPaymentMode} className="mt-2" disabled={hostel.booked}>
             {hostel.booked ? 'Booked': 'Book'}
            </MDBBtn>
          )}
        </MDBCardBody>
        <MDBCardFooter>
          <small className="text-muted text-capitalize fst-italic text-nowrap">
            {isAgent ? "created" : "posted"}{" "}
            {moment(hostel.createdAt).fromNow()}
          </small>
        </MDBCardFooter>
        {isAgent && (
          <div>
            <div className="position-absolute top-0 start-100 translate-middle mt-5 pe-5">
              <BiEdit
                className="fs-2 st_icon p-1 rounded-5 mb-2"
                onClick={showEditModal}
              />
              <MdOutlineDeleteSweep
                className="fs-2 st_icon p-1 rounded-5"
                onClick={showDeleteModal}
              />
            </div>
            <div className="position-absolute top-0 start-0 translate-middle mt-4 ms-5 ps-1">
              <div className="ms-5 bg-primary">
                <small className="text-capitalize fst-italic text-light text-nowrap px-2 small_text">
                  updated {moment(hostel.updatedAt).fromNow()}
                </small>
              </div>
            </div>
          </div>
        )}
      </MDBCard>
    </div>
  );
};

export default Hostel;
