import React from "react";
import { Link } from "react-router-dom";
import "./css/hostels.css";
function SmileGardens() {
  return (
    <>
      <h1 className="text-center text-success my-5 hostel">
        ACCOMMODATION SERVICES
      </h1>
      <h2 className="text-center text-success my-5">HOSTELS</h2>
      <div className="className">
        <div className="row">
          <div className=" col-md-3">
            <div className="card">
              <img src="images/thema.jpeg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">petite</h5>
                <p className="card-text"> TYPE : Double</p>
                <p className="card-text"> GENDER : female</p>
                <p className="card-text"> LOCATION : chikanda</p>
                <p className="card-text"> DISTANCE : 5KM from Campus</p>
                <p className="card-text"> PRICE: FROM K40,00</p>

                <Link to="/auth/login" className="btn btn-primary">
                  BOOK
                </Link>
              </div>
            </div>
          </div>
          <div className=" col-md-3">
            <div className="card">
              <img src="images/thema.jpeg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Petit Hostel</h5>
                <p className="card-text"> TYPE : Single</p>
                <p className="card-text"> GENDER : males and females</p>
                <p className="card-text"> DISTANCE : 5KM from Campus</p>
                <p className="card-text"> PRICE: FROM K40,00</p>

                <Link to="/auth/login" className="btn btn-primary">
                  BOOK
                </Link>
              </div>
            </div>
          </div>
          <div className=" col-md-3">
            <div className="card">
              <img src="images/thema.jpeg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">holy Gardens</h5>
                <p className="card-text"> TYPE : Double</p>
                <p className="card-text"> GENDER : male</p>
                <p className="card-text"> LOCATION : chikanda</p>
                <p className="card-text"> DISTANCE : 3KM from Campus</p>
                <p className="card-text"> PRICE: FROM K38,00</p>

                <Link to="/auth/login" className="btn btn-primary">
                  BOOK
                </Link>
              </div>
            </div>
          </div>
          <div className=" col-md-3">
            <div className="card">
              <img src="images/thema.jpeg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Kazingeni</h5>
                <p className="card-text"> TYPE : quads</p>
                <p className="card-text"> GENDER : females</p>
                <p className="card-text"> LOCATION : chikanda</p>
                <p className="card-text"> DISTANCE : 1KM from Campus</p>
                <p className="card-text"> PRICE: FROM K28,00</p>

                <Link to="/auth/login" className="btn btn-primary">
                  BOOK
                </Link>
              </div>
            </div>
          </div>
          <div className=" col-md-3">
            <div className="card">
              <img src="images/thema.jpeg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Muthali</h5>
                <p className="card-text"> TYPE : Single</p>
                <p className="card-text"> GENDER : male and females</p>
                <p className="card-text"> LOCATION : chikanda</p>
                <p className="card-text"> DISTANCE : 1.5KM from Campus</p>
                <p className="card-text"> PRICE: FROM K30,00 per month</p>

                <Link to="/auth/login" className="btn btn-primary">
                  BOOK
                </Link>
              </div>
            </div>
          </div>
          <div className=" col-md-3">
            <div className="card">
              <img src="images/thema.jpeg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">banda</h5>
                <p className="card-text"> TYPE : Double</p>
                <p className="card-text"> GENDER : male</p>
                <p className="card-text"> DISTANCE : 5KM from Campus</p>
                <p className="card-text"> PRICE: FROM K40,00 per month</p>

                <Link to="/auth/login" className="btn btn-primary">
                  BOOK
                </Link>
              </div>
            </div>
          </div>
          <div className=" col-md-3">
            <div className="card">
              <img src="images/thema.jpeg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">kwa mbewe</h5>
                <p className="card-text"> TYPE : Triple</p>
                <p className="card-text"> GENDER : females</p>
                <p className="card-text"> DISTANCE : 5KM from Campus</p>
                <p className="card-text"> PRICE: FROM K40,00 per month</p>

                <Link to="/auth/login" className="btn btn-primary">
                  BOOK
                </Link>
              </div>
            </div>
          </div>
          <div className=" col-md-3">
            <div className="card">
              <img src="images/thema.jpeg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Muthali</h5>
                <p className="card-text"> TYPE : Double</p>
                <p className="card-text"> GENDER : male and females</p>
                <p className="card-text"> DISTANCE : 5KM from Campus</p>
                <p className="card-text"> PRICE: FROM K40,00 per month</p>

                <Link to="/auth/login" className="btn btn-primary">
                  BOOK
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SmileGardens;
