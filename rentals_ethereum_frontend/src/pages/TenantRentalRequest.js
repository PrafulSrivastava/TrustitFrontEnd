import React, { useEffect, useState } from 'react';
import '../assets/css/owner.css';
import Navbar from '../components/NavBar';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../services/storage";
import { fetchTenantRentalRequests } from "../slices/TenantRentalRequest.slice";
import { api, CREATE_PAY_RENTAL_REQUEST, CREATE_DEPOSIT_RENTAL_REQUEST } from "../services/api";
import SetViewContractModal from "../components/SetViewContractModal";
import Web3 from 'web3';


let web3: Web3 | undefined = undefined; // Will hold the web3 instance

const TenantRentalRequest = () => {

    const dispatch = useDispatch();
    const [requests, setRequests] = useState([]);
    const { tenantRentalRequests } = useSelector(state => state?.tenantRentalRequest);
    const user = getUser();

    const [isViewContractVisible, setIsViewContractVisible] = useState(false);
    const [selectedPropertyId, setSelectedPropertyId] = useState(null);

    const viewContract = (propId) => {
        setSelectedPropertyId(propId);
        setIsViewContractVisible(true);
        console.log(setIsViewContractVisible);

    }

    const sendRentalDepositRequest = async contractId => {

        const response = await api.post(CREATE_DEPOSIT_RENTAL_REQUEST + contractId);

        if (response.status === 200) {
            alert("rent request sent successfully");
        }
    }

    const initPayButton = () => {
        // paymentAddress is where funds will be send to
        const paymentAddress = '0x192c96bfee59158441f26101b2db1af3b07feb40'
        const amountEth = 1

        web3.eth.sendTransaction({
            to: paymentAddress,
            value: web3.toWei(amountEth, 'ether')
        }, (err, transactionId) => {
            if (err) {
                console.log('Payment failed', err)
                // $('#status').html('Payment failed')
            } else {
                console.log('Payment successful', transactionId)
                // $('#status').html('Payment successful')
            }
        })
    }

    const sendRentalPayRequest = async contractId => {
        // try {
        //     const response = await api.post(CREATE_PAY_RENTAL_REQUEST + contractId);

        //     if (response.status === 200) {
        //         alert("rent request sent successfully");
        //     } else {
        //         alert("check node api http.response:" + response.status);
        //     }
        // }
        // catch (e) {

        //     alert(e.toString());
        // }
        if (window.ethereum) {
            
            if (!(window).ethereum) {
                window.alert('Please install MetaMask first.');
                return;
            }
    
            if (!web3) {
                try {
                    // Request account access if needed
                    await (window).ethereum.enable();
    
                    // We don't know window.web3 version, so we use our own instance of Web3
                    // with the injected provider given by MetaMask
                    web3 = new Web3((window).ethereum);
                } catch (error) {
                    window.alert('You need to allow MetaMask.');
                    return;
                }
            }
    
            try {
                await (window).ethereum.enable();
                initPayButton()
            } catch (err) {
                console.log(err)
                // $('#status').html('User denied account access', err)
            }
        } else if (window.web3) {
            window.web3 = new Web3(web3.currentProvider)
            initPayButton()
        } else {
            console.log("No Metamask (or other Web3 Provider) installed")
            // $('#status').html('No Metamask (or other Web3 Provider) installed')
        }

    }


    useEffect(() => {
        dispatch(fetchTenantRentalRequests());
    }, [])

    useEffect(() => {

        if (tenantRentalRequests?.length > 0) {
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
                                        <th>Request Id</th>
                                        <th>Property Id</th>
                                        <th>Tenant Id</th>
                                        <th>Request Date</th>
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
                                                    <td>{item?.rentalRequestId}</td>
                                                    <td>{item?.propertyId}</td>
                                                    <td>{item?.tenantUserId}</td>
                                                    <td>{item?.createdAt}</td>
                                                    <td>
                                                        {
                                                            item?.requestApprovalDone === 'true' ? 'Approved' : 'Pending'
                                                        }

                                                    </td>
                                                    <td>
                                                        {
                                                            item?.requestApprovalDone === 'true' ?
                                                                <>
                                                                    <span className="mx-1">
                                                                        <button onClick={() => sendRentalDepositRequest(item?.contractId)} className="btn btn-primary">Pay Security</button>
                                                                    </span>
                                                                    <span className="mx-1">
                                                                        <button onClick={() => sendRentalPayRequest(item?.contractId)} className="btn btn-primary my-2">Pay Rent</button>
                                                                    </span>
                                                                </>
                                                                :
                                                                ''
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            item?.requestApprovalDone === 'true' ?
                                                                <>
                                                                    <span className="mx-1">
                                                                        <button onClick={() => viewContract(item?.propertyId)} className={"btn btn-primary text-white fw-bold"}>View Contract</button>
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
