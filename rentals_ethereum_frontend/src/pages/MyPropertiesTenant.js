import React, { useEffect, useState } from 'react';
import '../assets/css/my-property.css';

import Navbar from '../components/NavBar';
import HomeImage from '../assets/images/home.png';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperty } from "../slices/Property.slice";
import { getUser } from "../services/storage";
import SetRentModal from "../components/SetRentModal";



const MyProperties = () => {

    const user = getUser();
    const dispatch = useDispatch();
    const [myProperties, setMyProperties] = useState([]);
    const { properties } = useSelector(state => state?.properties);

    const [isSetRentVisible, setIsSetRentVisible] = useState(false);
    const [selectedPropertyId, setSelectedPropertyId] = useState(null);

    useEffect(() => {

        dispatch(fetchProperty());

    }, [])

    useEffect(() => {

        if (properties?.length > 0) {
            let list = properties.filter(el => {
                return el?.tenantUserId?.toString() === user?.userId?.toString()
            });

            setMyProperties(list);
        }

    }, [properties])

    const [pincode, setPincode] = useState(null);

    const search = term => {
        dispatch(fetchProperty({ pincode: term }));
    }
    const reset = () => {
        dispatch(fetchProperty());
    }


    return (
        <div>
            <Navbar />
            <div className="container my-5">

                <div className="row my-2">
                    <div className="col-md-12">
                        <nav className="text-white" aria-label="breadcrumb">
                            <ol className="breadcrumb text-white fw-bold">
                                <li className="breadcrumb-item"><Link className="text-white fw-bold" to="/">Home</Link>
                                </li>
                                <li className="breadcrumb-item"><Link className="text-white fw-bold"
                                    to="/owner">Owner</Link></li>
                                <li className="breadcrumb-item active text-white fw-bold" aria-current="page">My
                                    Property List
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <h4 className={"text-white fw-bold"}> My Property List</h4>
                <div className="row">
                    <div className="col-md-4">
                        <div className="input-group mb-3">
                            <input type="text"
                                onChange={event => setPincode(event.target.value)}
                                className="form-control" placeholder="Enter Pincode"
                                aria-label="Recipient's username" aria-describedby="button-addon2" />
                            <button onClick={() => search(pincode)} className="btn btn-success" type="button"
                                id="button-addon2">Search
                            </button>
                            <button onClick={() => reset()} className="btn btn-warning" type="button"
                                id="button-addon2">Reset
                            </button>
                        </div>
                    </div>

                </div>
                <div className={"row"}>

                    {
                        myProperties?.length > 0 ? myProperties.map(item => {

                            return (
                                <div key={Math.random().toString()} className={"col col-md-4"}>
                                    <div className={"card my-2"}>
                                        <div className={"card-header text-end"}>
                                            {/* <span>
                                                <button onClick={() => changePropertyStatus('activate', item?.propertyId)} className={"btn btn-success mx-1"}>Activate</button>
                                                <button onClick={() => changePropertyStatus('de-activate', item?.propertyId)} className={"btn btn-danger mx-1"}>De-Activate</button>
                                            </span> */}

                                        </div>
                                        <div className={"card-body row"}>
                                            <div className={"col-md-4"}>
                                                <img className="property-image" src={HomeImage} alt={'property image'} />
                                            </div>
                                            <div className={"col-md-8"}>
                                                <h6 className={"card-title"}>{item?.propertyName}</h6>
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
                                                                        ? "Product Verified By Auditor"
                                                                        : "Product Not Verified By Auditor Yet"}
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                <th>Unit No.</th>
                                                                <td>{item?.unitNumber}</td>
                                                            </tr>
                                                            {/* <tr>
                                                                <th>Bedrooms</th>
                                                                <td>{item?.bathrooms}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Parking</th>
                                                                <td>{item?.parking}</td>
                                                            </tr> */}
                                                            <tr>
                                                                <th>Location</th>
                                                                <td>{item?.location}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Pincode</th>
                                                                <td>{item?.pincode}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Rent Per Month</th>
                                                                <td>{item?.rentAmount}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>One-Time Security Deposit</th>
                                                                <td>{item?.securityDeposit}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Inital Available date</th>
                                                                <td>{item?.initialAvailableDate}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>NFT Token Id</th>
                                                                <td>{item?.NFTTokenId}</td>
                                                            </tr>
                                                            {/* <tr className={item?.availability ? 'bg-danger' : 'bg-success'}>
                                                                <th className="text-white">Availability</th>
                                                                <td className="text-white">{item?.availability ? 'Not Rented' : 'Rented'}</td>
                                                            </tr> */}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer  text-center">
                                            <span className="mx-1">
                                                <Link to={{ pathname: `/owner/my-property-view`, state: item }}
                                                    className={"btn btn-success text-white fw-bold"}>View</Link>
                                            </span>
                                            {/* <span className="mx-1">
                                                <Link to={{ pathname: `/owner/my-property-docs`, state: item }}
                                                    className={"btn btn-success text-white fw-bold"}>View Docs</Link>
                                            </span> */}
                                            {/* <span className="mx-1">
                                                <Link to={{ pathname: `/owner/edit/property`, state: item }}
                                                    className={"btn btn-primary text-white fw-bold"}>Edit</Link>
                                            </span> */}
                                            <span className="mx-1">

                                                <Link to={{
                                                    pathname: "/tenant/pay-rent-per-month",
                                                    params: {
                                                        item
                                                    }
                                                }}>
                                                    <button className="btn btn-primary my-2">Pay Rent</button>
                                                </Link>

                                                {/* <button onClick={() => payRent(item?.propertyId)} className={"btn btn-primary text-white fw-bold"}>Pay Rent</button> */}
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            )
                        }) : <div>
                            <h6 className="text-white fw-bold">No data found</h6>
                        </div>
                    }
                </div>

            </div>
            {
                isSetRentVisible && <SetRentModal isSetRentVisible={isSetRentVisible} setIsSetRentVisible={setIsSetRentVisible} selectedPropertyId={selectedPropertyId} />
            }

        </div >
    );
}

export default MyProperties;
