import React, { useState } from 'react';
import Navbar from "../components/NavBar";
import { api, CREATE_NEW_PROPERTY } from "../services/api";
import { useDispatch } from "react-redux";
import { fetchProperty } from "../slices/Property.slice";
import { Link } from "react-router-dom";

const PostPropertyNew = () => {

    const dispatch = useDispatch();
    const [propertyName, setPropertyName] = useState('');
    const [rooms, setRooms] = useState(0);
    const [bathrooms, setBathrooms] = useState(0);
    const [parking, setParking] = useState(0);
    const [unitNumber, setUnitNumber] = useState(null);
    const [location, setLocation] = useState(null);
    const [pincode, setPincode] = useState(0);
    const [initialAvailableDate, setInitialAvailableDate] = useState(0);
    const [propertyType, setPropertyType] = useState(0);

    const [rentAmount, setRentAmount] = useState(0);
    const [securityDeposit, setSecurityDeposit] = useState(0);
    // const [dateOfPosting, setDateOfPosting] = useState(0);
     
    const submit = async (e) => {
        e.preventDefault();
        if (!propertyName?.length) {
            alert("Please enter product name");
            return false;
        }
        // if (!rooms) {
        //     alert("Please enter no of rooms");
        //     return false;
        // }
        // if (!bathrooms) {
        //     alert("Please enter  no of bathrooms");
        //     return false;
        // }
        // if (!parking) {
        //     alert("Please enter no of parking");
        //     return false;
        // }
        if (!unitNumber) {
            alert("Please enter unit number");
            return false;
        }
        if (!location) {
            alert("Please enter location");
            return false;
        }
        if (!initialAvailableDate) {
            alert("Please enter initial availability date");
            return false;
        }
        if (!propertyType) {
            alert("Please enter Product Type");
            return false;
        }
        if (!rentAmount) {
            alert("Please enter rentAmount");
            return false;
        }
        if (!securityDeposit) {
            alert("Please enter securityDeposit");
            return false;
        }
        // if (!dateOfPosting) {
        //     alert("Please enter dateOfPosting");
        //     return false;
        // }


        const params = {
            "propertyName": propertyName,
            // "rooms": rooms,
            // "bathrooms": bathrooms,
            "unitNumber": unitNumber,
            // "parking": parking,
            "location": location,
            "pincode": pincode?.toString(),
            "initialAvailableDate": initialAvailableDate,
            "propertyType": propertyType,
            "rentAmount":rentAmount,
            "securityDeposit":securityDeposit,
            // "dateOfPosting":dateOfPosting
        }

        try {
            const response = await api.post(CREATE_NEW_PROPERTY, params);
            if (response.status === 200) {
                dispatch(fetchProperty());
                alert('Product created successfully');

            }
        }
        catch (e) {
            alert(e?.toString());
        }
    }
    return (
        <div>
            <Navbar />
            <div className="container my-5">
                <div className="row my-2">
                    <div className="col-md-12">
                        <nav className="text-white" aria-label="breadcrumb">
                            <ol className="breadcrumb text-white fw-bold">
                                <li className="breadcrumb-item"><Link className="text-white fw-bold" to="/">Home</Link></li>
                                <li className="breadcrumb-item"><Link className="text-white fw-bold" to="/owner">Owner</Link></li>
                                <li className="breadcrumb-item active text-white fw-bold" aria-current="page">Add Property</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <form onSubmit={submit} className="g-3 needs-validation" noValidate>
                    <div className="card">
                        <div className="card-header green">
                            <h6 className="text-white fw-bold">Post New Vehicle</h6>
                        </div>
                        <div className="card-body">

                            <div className="row my-1">
                                <div className="col-md-8">
                                    <label htmlFor="propertyName" className="form-label">Vehicle Name</label>
                                    <input type="text" className="form-control" name="propertyName" id="propertyName"

                                        onChange={e => setPropertyName(e.target.value)} required />
                                    <div className="invalid-feedback">
                                        Please enter Vehicle name
                                    </div>
                                </div>
                            </div>
                            <div className="row my-1">
                                <div className="col-md-4">
                                    <label htmlFor="rooms" className="form-label">No. Of Seats</label>
                                    <input type="number" className="form-control" name={"rooms"} id="rooms"
                                        onChange={e => setRooms(parseInt(e.target.value))}
                                        required />
                                    <div className="invalid-feedback">
                                        Please enter nos of seat.
                                    </div>
                                </div>
                                {/* <div className="col-md-4">
                                    <label htmlFor="bathrooms" className="form-label">Bedrooms</label>
                                    <div className="input-group has-validation">
                                        <input type="number" className="form-control" name={"bathrooms"} id="bathrooms"
                                            aria-describedby="inputGroupPrepend"
                                            onChange={e => setBathrooms(parseInt(e.target.value))}
                                            required />
                                        <div className="invalid-feedback">
                                            Please enter no of bedrooms
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <label htmlFor="unitNumber" className="form-label">Unit No</label>
                                    <div className="input-group has-validation">                           
                                        <input type="number" className="form-control" name="unitNumber" id="unitNumber"
                                            aria-describedby="inputGroupPrepend"
                                            onChange={e => setUnitNumber(e.target.value)}
                                            required />
                                        <div className="invalid-feedback">
                                            Please enter unit number
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="col-md-4">
                                    <label htmlFor="parking" className="form-label">Parking</label>
                                    <div className="input-group has-validation">
                                        <input type="number" className="form-control" name="parking" id="parking"
                                            onChange={e => setParking(parseInt(e.target.value))}
                                            required />
                                        <div className="invalid-feedback">
                                            Please enter no of parking.
                                        </div>
                                    </div>
                                </div> */}
                            </div>

                            <div className="row my-1">
                                <div className="col-md-4">
                                    <label htmlFor="location" className="form-label">Location</label>
                                    <input type="text" className="form-control" name={"location"} id="location"
                                        onChange={e => setLocation(e.target.value)}
                                        required />
                                    <div className="invalid-feedback">
                                        Please enter the location
                                    </div>
                                </div>

                            </div>

                            <div className="row my-1">
                                <div className="col-md-4">
                                    <label htmlFor="pincode" className="form-label">Pincode</label>
                                    <input type="number" className="form-control" name={"pincode"} id="pincode"
                                        onChange={e => setPincode(parseInt(e.target.value))}
                                        required />
                                    <div className="invalid-feedback">
                                        Please enter pincode
                                    </div>
                                </div>

                            </div>

                            <div className="row my-1">
                                <div className="col-md-4">
                                    <label htmlFor="rentAmount" className="form-label">RentAmount</label>
                                    <input type="number" className="form-control" name={"rentAmount"} id="rentAmount"
                                        onChange={e => setRentAmount(parseInt(e.target.value))}
                                        required placeholder="in ETH"/>
                                    <div className="invalid-feedback">
                                        Please enter rent amount
                                    </div>
                                </div>

                            </div>

                            <div className="row my-1">
                                <div className="col-md-4">
                                    <label htmlFor="securityDeposit" className="form-label">Security Deposit</label>
                                    <input type="number" className="form-control" name={"securityDeposit"} id="securityDeposit"
                                        onChange={e => setSecurityDeposit(parseInt(e.target.value))}
                                        required placeholder="in ETH" />
                                    <div className="invalid-feedback">
                                        Please enter security amount
                                    </div>
                                </div>

                            </div>

                            
                            <div className="row my-1">
                                <div className="col-md-4">
                                    <label htmlFor="initialAvailableDate" className="form-label">Available Date</label>
                                    <input type="date" className="form-control" name={"initialAvailableDate"} id="initialAvailableDate"
                                        onChange={e => setInitialAvailableDate(e.target.value)}
                                        required />
                                    <div className="invalid-feedback">
                                        Please enter initial available date
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="propertyType" className="form-label">Product Type</label>
                                    <select className="form-control" name="PropertyType" id="PropertyType" onChange={e => setPropertyType(e.target.value)}>
                                        <option value="Van" hidden>Select</option>
                                        <option value="Bus">Bus</option>
                                        <option value="Van">Van</option>
                                        <option value="Car">Car</option>
                                        <option value="SUV">SUV</option>
                                        <option value="Ambulance">Ambulance</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please enter initial available date
                                    </div>
                                </div>


                            </div>

                        </div>
                        <div className="card-footer red">
                            <button className="btn btn-success text-white fw-bold" type="submit">Submit form</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default PostPropertyNew;
