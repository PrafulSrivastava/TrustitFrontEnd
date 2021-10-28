import React, {useState} from 'react';
import {Modal,Button} from "react-bootstrap";
import {api, CREATE_RENTAL_REQUEST} from "../services/api";
import { useSelector} from "react-redux";



const RentalRequestModal = ({isVisible,setIsVisible,propId})=> {
    const {user} = useSelector(state=>state?.auth);
    const [duration,setDuration] = useState(0);
    const [securityDeposit,setSecurityDeposit] = useState(0);
    const [rentAmount,setRentAmount] = useState(0);



    const sendRentalRequest = async propertyId =>{

        try {
            if(!duration)
            {
                alert("Please enter the rent duration in month");
                return false;
            }
            if(!rentAmount || !securityDeposit){
                alert("If You do not bid for the rent and security we will consider the actual values");
            }
            const response = await api.post(CREATE_RENTAL_REQUEST,{propertyId,duration,rentAmount, securityDeposit});
            if(response.status===200)
            {
                setIsVisible(false);
                alert("rent request sent successfully");

            }
        }
        catch (e)
        {
            if(!user)
            {
                setIsVisible(true);
            }
        }
    }

    return (
        <Modal show={isVisible} onHide={()=>setIsVisible(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Send Rental Request</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row my-1">
                    <div className="col-md-4">
                        <label htmlFor="duration" className="form-label">Duration *</label>
                        <input type="text" className="form-control" name={"duration"} id="duration"
                               onChange={e => setDuration(parseInt(e.target.value))}
                               required/>
                        <div className="invalid-feedback">
                            Please enter rental request
                        </div>
                    </div>
                </div>

                <div className="row my-1">
                    <div className="col-md-4">
                        <label htmlFor="rentAmount" className="form-label">Rent Amount</label>
                        <input type="text" className="form-control" name={"rentAmount"} id="rentAmount"
                               onChange={e => setRentAmount(parseInt(e.target.value))}
                               />
                        <div className="invalid-feedback">
                            Please enter the Rent Amount
                        </div>
                    </div>
                </div>

                <div className="row my-1">
                    <div className="col-md-4">
                        <label htmlFor="securityDeposit" className="form-label">Security Deposit</label>
                        <input type="text" className="form-control" name={"securityDeposit"} id="securityDeposit"
                               onChange={e => setSecurityDeposit(parseInt(e.target.value))}
                               />
                        <div className="invalid-feedback">
                            Please enter the Security deposit
                        </div>
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={()=>setIsVisible(false)} variant="secondary">Cancel</Button>
                <Button onClick={()=>sendRentalRequest(propId)} variant="primary">Send Request</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default RentalRequestModal;
