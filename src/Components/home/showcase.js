import "./css/showcase.css";
import { Carousel } from "react-bootstrap";

function Showcase() {
  return (
    <div className="container-fluid p-0 mt-5 bg-info">
      <Carousel>
        <Carousel.Item className="carousel_item">
          <img
            className="d-block w-100 carousel_img"
            src="./assets/images/showcase/room2.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>MALAWI HOUSING HOSTEL</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="carousel_item">
          <img
            className="d-block w-100 carousel_img"
            height={"100%"}
            src="./assets/images/showcase/room14.jpg"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>PETIT BOYS HOSTEL</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="carousel_item">
          <img
            className="d-block w-100 carousel_img"
            height={"100%"}
            src="./assets/images/showcase/kamuzu.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>KAMUZU GIRLS HOSTEL</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="carousel_item">
          <img
            className="d-block w-100 carousel_img"
            height={"100%"}
            src="./assets/images/showcase/room9.jpg"
            alt="third slide"
          />

          <Carousel.Caption>
            <h3>BETEREHEM HOSTEL</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Showcase;
