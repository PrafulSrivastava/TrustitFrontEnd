import React, { useEffect, useState } from "react";
import "../assets/css/property-listing.css";
import "../assets/css/home.css";
import "../components/NavBar/navbar.css";
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
  const ifEnterPressed = (e) => {
    if (e.key === 'Enter') {
      search(pincode);
    }
  };

  const onFocusHandler = (domObj) => {
    domObj.type = "number"
    domObj.placeholder = "Search by pincode...";
  }
  const onBlurHandler = (domObj) => {
    domObj.type = "text"
    domObj.placeholder = "";
  }
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
        <form action="" className="search-bar">
          <input name="search" onChange={(event) => setPincode(event.target.value)} onFocus={(event) => onFocusHandler(event.target)} onBlur={(event) => onBlurHandler(event.target)} required></input>
          <button className="search-btn" onSubmit={() => search(pincode)} type="submit">
            <span>Search</span>
          </button>
        </form>
        <div>

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

                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <h6 classnameName="text-white fw-bold">No data found</h6>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
