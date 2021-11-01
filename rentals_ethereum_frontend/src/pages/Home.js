import React, { useEffect, useState } from "react";
import "../assets/css/property-listing.css";
import Navbar from "../components/NavBar";
import HomeImage from "../assets/images/home.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperty } from "../slices/Property.slice";

const Home = () => {
  const dispatch = useDispatch();

  const { properties } = useSelector((state) => state?.properties);

  useEffect(() => {
    dispatch(fetchProperty({ availability: true }));
  }, []);

  const [pincode, setPincode] = useState(null);

  const search = (term) => {
    dispatch(fetchProperty({ pincode: term, availability: true }));
  };
  const reset = () => {
    dispatch(fetchProperty({ availability: true }));
  };
  return (
    <div>
      <Navbar />
      <div className="container my-5">
        <div className="row my-2">
          <div className="col-md-12">
            <nav className="text-white" aria-label="breadcrumb">
              <ol className="breadcrumb text-white fw-bold">
                <li className="breadcrumb-item">
                  <Link className="text-white fw-bold" to="/">
                    Home
                  </Link>
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <h4 className={"text-white fw-bold"}>Property Listing</h4>
        <div className="row">
          <div className="col-md-4">
            <div className="input-group mb-3">
              <input
                type="text"
                onChange={(event) => setPincode(event.target.value)}
                className="form-control"
                placeholder="Enter Pincode"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
              <button
                onClick={() => search(pincode)}
                className="btn btn-success"
                type="button"
                id="button-addon2"
              >
                Search
              </button>
              <button
                onClick={() => reset()}
                className="btn btn-warning"
                type="button"
                id="button-addon2"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
        <div className={"row"}>
          {properties?.length > 0 ? (
            properties.map((item) => {
              return (
                <div key={Math.random().toString()} className={"col col-md-4"}>
                  <div className={"card my-2"}>
                    <div className={"card-body row"}>
                      <div className={"col-md-4"}>
                        <img
                          className="property-image"
                          src={HomeImage}
                          alt="property image"
                        />
                      </div>
                      <div className={"col-md-8"}>
                        <h4 className={"card-title", "headings"}><b>{item?.propertyName}</b></h4>
                        <div>
                          <table className="table table-striped table-borderless">
                            <tbody>
                            <tr
                                className={
                                  item?.KYC
                                    ? "bg-success"
                                    : "bg-warning"
                                }
                              >
                               
                                <th className="text-white">
                                  {item?.KYC
                                    ? "Property Verified By Auditor"
                                    : "Property Not Verified By Auditor Yet"}
                                </th>
                              </tr>
                            <tr>
                                <th>Property Type</th>
                                <td>{item?.propertyType}</td>
                              </tr>
                              <tr>
                                <th>Unit No.</th>
                                <td>{item?.unitNumber}</td>
                              </tr>
                              <tr>
                                <th>Bedrooms</th>
                                <td>{item?.bathrooms}</td>
                              </tr>
                              <tr>
                                <th>Parking</th>
                                <td>{item?.parking}</td>
                              </tr>
                              <tr>
                                <th>Location</th>
                                <td>{item?.location}</td>
                              </tr>
                              <tr>
                                <th>Rent Per Month</th>
                                <td>{item?.rentAmount}</td>
                              </tr>
                              <tr>
                                <th>One-Time Security Deposit</th>
                                <td>{item?.securityDeposit}</td>
                              </tr>
                              {/* <tr>
                                <th>Inital Available date</th>
                                <td>{item?.initialAvailableDate}</td>
                              </tr> */}
                              {/* <tr>
                                <th>NFT Token Id</th>
                                <td>{item?.NFTTokenId}</td>
                              </tr> */}
                              <tr>
                                <th>Pincode</th>
                                <td>{item?.pincode}</td>
                              </tr>
                              <tr
                                className={
                                  item?.availability
                                    ? "bg-success"
                                    : "bg-danger"
                                }
                              >
                                <th className="text-white">Available From</th>
                                <td className="text-white">
                                  {item?.availability
                                    ? item?.initialAvailableDate
                                    : "Not Available"}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer bg-primary text-center">
                      <Link
                        to={{ pathname: `/view/property`, state: item }}
                        className={"text-white fw-bold"}
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <h6 className="text-white fw-bold">No data found</h6>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
