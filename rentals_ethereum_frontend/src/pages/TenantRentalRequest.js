import React, { useEffect, useState } from 'react';
import '../assets/css/owner.css';
import Navbar from '../components/NavBar';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../services/storage";
import { fetchOwnerRentalRequestsJoin } from "../slices/RentalRequestJoin.slice";
import SetViewContractModal from "../components/SetViewContractModal";

const TenantRentalRequest = () => {

    const dispatch = useDispatch();
    const [requests, setRequests] = useState([]);
    const { tenantRentalRequests } = useSelector(state => state?.rentalRequestJoin);
    const  depositResp  = useSelector(depositState => depositState);
    const user = getUser();

    if (depositResp == true){
        document.getElementById("depositButton").disabled = true
    }
    const [isViewContractVisible, setIsViewContractVisible] = useState(false);
    const [selectedPropertyId, setSelectedPropertyId] = useState(null);

    const viewContract = (propId) => {
        setSelectedPropertyId(propId);
        setIsViewContractVisible(true);
    }

    useEffect(() => {
        dispatch(fetchOwnerRentalRequestsJoin());
    }, [])

    useEffect(() => {
        console.log(":::::", tenantRentalRequests)
        if (tenantRentalRequests?.length > 0) {
            console.log("userId",user?.userId );
            let list = tenantRentalRequests.filter(el => {
                return el?.tenantUserId === user?.userId
            });

            setRequests(list);
        }

    }, [tenantRentalRequests])

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
                                <li className="breadcrumb-item">
                                    <Link className="text-white fw-bold" to="/tenant">Tenant</Link>
                                </li>
                                <li className="breadcrumb-item active text-white fw-bold" aria-current="page">Rental Requests</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <h4 className={"text-white fw-bold"}> Rental Requests</h4>
                <div className={"row"}>
                    <div className="col-12">

                        <div>
                            <table className="table table-bordered table-hover bg-white">
                                <thead>
                                    <tr>


                                        <th>Contract Id</th>
                                        <th>NFT Token Id</th>
                                        <th>Property Name</th>
                                        <th>Tenant Address</th>
                                        <th>Request Send Date</th>
                                        <th>Duration</th>
                                        <th>Actual Rent Amount (ETH)</th>
                                        <th>Requested Rent Amount (ETH)</th>
                                        <th>Actual Security Deposit (ETH)</th>
                                        <th>Requested Security Deposit (ETH)</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                        <th>Your Contract</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        requests?.length > 0 ? requests.map(item => {
                                            return (
                                                <tr key={Math.random()}>
                                                    <td>{item?.contractId}</td>
                                                    <td>{item?.property[0].NFTTokenId}</td>
                                                    <td>{item?.property[0].propertyName}</td>
                                                    <td>{item?.tenantAddress}</td>
                                                    <td>{item?.createdAt}</td>
                                                    <td>{item?.duration} Months</td>
                                                    <td>{item?.property[0].rentAmount}</td>
                                                    <td>{item?.rentAmount}</td>
                                                    <td>{item?.property[0].securityDeposit}</td>
                                                    <td>{item?.securityDeposit}</td>
                                                    <td>
                                                        {
                                                            item?.requestApprovalDone === 'true' ? 'Approved' : 'Pending'
                                                        }

                                                    </td>
                                                    
                                                    <td>
                                                        {
                                                            item?.requestApprovalDone === 'true'  && item?.rentAndSecurityPaid == false ?
                                                                <>
                                                                    {/* <span className="mx-1">
                                                                        <Link to={{
                                                                            pathname: "/tenant/pay-security",
                                                                            params: {
                                                                                item
                                                                            } 
                                                                        }}>
                                                                            <button id = "depositButton" className="btn btn-primary my-2">Pay Security</button>
                                                                        </Link> */}
                                                                        {/* <button onClick={() => sendRentalDepositRequest(item?.contractId)} className="btn btn-primary">Pay Security</button> */}
                                                                    {/* </span> */}
                                                                    {/* <span className="mx-1">
                                                                        <button onClick={() => sendRentalPayRequest(item?.contractId)} className="btn btn-primary my-2">Pay Rent</button>
                                                                    </span> */}

                                                                    <div className="mx-1">
                                                                        <Link to={{
                                                                            pathname: "/tenant/pay-rent",
                                                                            params: {
                                                                                item
                                                                            }
                                                                        }}>
                                                                            <button className="btn btn-primary my-2">Pay Rent & Security</button>
                                                                        </Link>
                                                                    </div>
                                                                </>
                                                                :
                                                                ''
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            item?.requestApprovalDone === 'true' && item?.rentAndSecurityPaid == true?
                                                                <>
                                                                    <span className="mx-1">
                                                                        <button onClick={() => viewContract(item?.contractId)} className={"btn btn-primary text-white fw-bold"}>View Contract</button>
                                                                    </span>
                                                                </>
                                                                :
                                                                ''
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        }) : <tr>
                                            <td>No data found</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>
            </div>

            {
                isViewContractVisible && <SetViewContractModal isViewContractVisible={isViewContractVisible} setIsViewContractVisible={setIsViewContractVisible} selectedPropertyId={selectedPropertyId} />
            }
        </div>
    );
}

export default TenantRentalRequest;
