import React, {useEffect, useState} from 'react';
import '../assets/css/owner.css';
import Navbar from '../components/NavBar';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../services/storage";
import {fetchOwnerRentalRequestsJoin} from "../slices/RentalRequestJoin.slice";
import ConfirmRentalRequestModal from "../components/ConfirmRentalRequestModal";
const OwnerRentalRequest = () => {

    const dispatch = useDispatch();
    const [requests, setRequests] = useState([]);
    const {ownerRentalRequests} = useSelector(state=>state?.rentalRequestJoin);
    const user = getUser();

    const [isVisible,setIsVisible] = useState(false);
    const [requestId,setRequestId] = useState('');

    useEffect(() => {
        dispatch(fetchOwnerRentalRequestsJoin());
    }, [])

    useEffect(() => {

        if (ownerRentalRequests?.length > 0) {
            let list = ownerRentalRequests.filter(el => {
                return el?.ownerUserId === user?.userId
            });

            setRequests(list);
        }

    }, [ownerRentalRequests])

    const approveRequest = async (visibility,id)=>{
          setRequestId(id);
          setIsVisible(true);
    }


    return (
        <div>
            <Navbar/>
            <div className="container my-5">

                <div className="row my-2">
                    <div className="col-md-12">
                        <nav className="text-white" aria-label="breadcrumb">
                            <ol className="breadcrumb text-white fw-bold">
                                <li className="breadcrumb-item"><Link className="text-white fw-bold" to="/">Home</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link className="text-white fw-bold" to="/owner">Owner</Link>
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
                                     <th>Action</th>

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
                                                        item?.requestApprovalDone ==='true'?'Approved':<button onClick={()=>approveRequest(isVisible,item?.rentalRequestId)} className="btn btn-info text-white fw-bold">Approve</button>
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

                                    </tr>
                                }
                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>
            </div>
            {
                isVisible && <ConfirmRentalRequestModal requestId={requestId} isVisible={isVisible} setIsVisible={setIsVisible}/>

            }

        </div>
    );
}

export default OwnerRentalRequest;
