import React from 'react';


const About = () => {
    return (
      <>
    <div className="best-features about-features">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-heading">
              <h2>About Us</h2>
            </div>
          </div>
          <div className="col-md-6">
            <div className="right-image">
              <img src="assets/images/rooms/room1.jpg" alt="" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="left-content">
              <h4>Who we are &amp; What we do?</h4>
              <p>Accommodation finder is a software which students can use to book accommodation outside campus.
                 Students can view rooms, compare prices of rooms, 
                 booking rooms and make an online payment for them to secure place.
                 Accomodation finder was started in 2014 with the aim of helping students find 
                 accommodation in campus but not in chikanda but now we want students to 
                 secure a place in chikanda as well online.
                 We have a track record of happy customers who were satisfied
                 with our services in the review section of the software.</p>
              <ul className="social-icons">
                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                <li><a href="#"><i className="fa fa-behance"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

      </>
    );
}


export default About;