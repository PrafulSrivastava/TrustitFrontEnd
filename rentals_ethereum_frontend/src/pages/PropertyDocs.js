import React, { useState } from 'react';
import Navbar from "../components/NavBar";
import { api, UPLOAD_DOCS } from "../services/api";
import { useDispatch } from "react-redux";
import { fetchProperty } from "../slices/Property.slice";
import { Link, useLocation } from "react-router-dom";

const PropertyDocs = () => {

    const dispatch = useDispatch();

    const location = useLocation();

    const item = location.state;

    const [availability] = useState(true);
    const [propertyId, setPropertyId] = useState(item?.propertyId);
    const [aadhar, setAadhar] = useState(item?.aadhar);
    const [maintanceDocs, setMaintanceDocs] = useState(item?.maintanceDocs);
    const [khasra, setKhasra] = useState(item?.khasra);
    const [electricityBill, setElectricityBill] = useState(item?.electricityBill);
    const uploadElectricityBill = (file) => {
        console.log("file::", file)
        setElectricityBill(file)
    }
    const submit = async (e) => {
        e.preventDefault();
        // if (!propertyName) {
        //     alert("Please upload property name");
        //     return false;
        // }
        // if (!aadhar) {
        //     alert("Please enter adhar number");
        //     return false;
        // }
        // if (!maintanceDocs) {
        //     alert("Please upload maintaince docs");
        //     return false;
        // }
        // if (!khasra) {
        //     alert("Please upload kasra");
        //     return false;
        // }
        // if (!electricityBill) {
        //     alert("Please enter electricity bill");
        //     return false;
        // }


      
        // const file = {
        //     // "aadhar": aadhar,
        //     // "maintanceDocs": maintanceDocs,
        //     // "khasra": khasra,
        //     "avatar": electricityBill
        // }
        

        try {
            const data = new FormData()
            data.append('image', electricityBill)
        //     axios.post("http://localhost:8000/upload", data, { 
        //        // receive two    parameter endpoint url ,form data
        //    })
            console.log("upload file",electricityBill, "electricityBill")
            const response = await api.post(UPLOAD_DOCS+"/"+item?.propertyId,data);
          
            if (response.status === 200) {
                // dispatch(fetchProperty());
                alert('Doc uploaded successfully');
            }
        }
        catch (e) {
              alert(e)
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
                                <li className="breadcrumb-item"><Link className="text-white fw-bold" to="/owner/my-property-list">Property Listing</Link></li>
                                <li className="breadcrumb-item active text-white fw-bold" aria-current="page">Edit Property</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <form onSubmit={submit} className="g-3 needs-validation" enctype="multipart/form-data" noValidate>
                    <div className="card">
                        <div className="card-header bg-warning">
                            <h6 className="text-white fw-bold">Upload Docs</h6>
                        </div>
                        <div className="card-body">
                            <div className="row my-1">
                                {/* <div className="col-md-4">
                                    <label htmlFor="aadhar" className="form-label">Aadhar No.</label>
                                    <input type="number" className="form-control" name={"aadhar"} id="aadhar"
                                        value={aadhar}
                                        onChange={e => setAadhar(parseInt(e.target.value))}
                                        required />
                                    <div className="invalid-feedback">
                                        Please upload aadhar
                                    </div>
                                </div> */}
                                {/* <div className="col-md-4">
                                    <label htmlFor="maintanceDocs" className="form-label">Maintance Document</label>
                                    <div className="input-group has-validation">
                                        <input type="file" className="form-control" name="avatar" id="maintanceDocs"
                                            value={maintanceDocs}
                                            aria-describedby="inputGroupPrepend"
                                            onChange={e => setMaintanceDocs(e.target.value)}
                                            required />
                                        <div className="invalid-feedback">
                                            Please upload maintainance Docs
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <label htmlFor="electricityBill" className="form-label">Electricity Bill</label>
                                    <div className="input-group has-validation">
                                        <input type="file" className="form-control" name="image" id="electricityBill"
                                            aria-describedby="inputGroupPrepend"
                                            // value={electricityBill}
                                            onChange={e => uploadElectricityBill(e.target.files[0])}
                                            required />
                                        <div className="invalid-feedback">
                                            Please upload Electricity Bill
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="col-md-4">
                                    <label htmlFor="electricityBill" className="form-label">Electricity Bill</label>
                                    <div className="input-group has-validation">
                                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                                        <input type="file" className="form-control" name="electricityBill" id="electricityBill"
                                            value={electricityBill}
                                            aria-describedby="inputGroupPrepend"
                                            onChange={e => setElectricityBill(e.target.value)}
                                            required />
                                        <div className="invalid-feedback">
                                            Please upload electricity Bill
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="card-footer bg-warning">
                            <button className="btn btn-primary text-white fw-bold" type="submit">Upload Docs</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default PropertyDocs;
