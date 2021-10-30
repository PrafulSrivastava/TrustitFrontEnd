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
        <form action="" class="search-bar">
          <input name="search" onChange={(event) => setPincode(event.target.value)} onFocus={(event) => onFocusHandler(event.target)} onBlur={(event) => onBlurHandler(event.target)} required></input>
          <button class="search-btn" onSubmit={() => search(pincode)} type="submit">
            <span>Search</span>
          </button>
        </form>
        <div>
          {properties?.length > 0 ? (
            properties.map((item) => {
              return (
                <div classname="blog-card">
                  <div classname="meta">
                    <div classname="photo" style="background-image: url(https://storage.googleapis.com/chydlx/codepen/blog-cards/image-1.jpg)">
                    </div>
                    <ul classname="details">
                      <li classname="author"><a href="/linkToUserProfile">John Doe</a></li>
                      <li classname="date">Date Of Posting</li>
                      <li classname="tags">
                        <ul>
                          <li><a href="/linktodocs">Documents</a></li>
                          <li><a href=""></a></li>
                          <li><a href="#">HTML</a></li>
                          <li><a href="#">CSS</a></li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div classname="description">
                    <h1>Unit No. : {item?.unitNumber}</h1>
                    <h1>Bedrooms : {item?.bathrooms}</h1>
                    <h1>Parking : {item?.parking}</h1>
                    <h1>Location : {item?.location}</h1>
                    <h1>Rent Per Month : {item?.rentAmount}</h1>
                    <h1>One-Time Security Deposit : {item?.securityDeposit}</h1>
                    <h1>Inital Available date : {item?.initialAvailableDate}</h1>
                    <h1>NFT Token Id : {item?.NFTTokenId}</h1>
                    <h1>Pincode : {item?.pincode}</h1>
                    <p classname="read-more">
                      <a href="#">Read More</a>
                    </p>
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
