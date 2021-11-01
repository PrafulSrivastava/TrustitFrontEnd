import { useState } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { api, CREATE_PAY_RENTAL_REQUEST, CREATE_DEPOSIT_RENTAL_REQUEST } from "../services/api";


const sendRentalPayRequest = async (contractId,txHash) => {
  console.log("txHash", txHash.hash)
  try {
      const response = await api.post(CREATE_PAY_RENTAL_REQUEST + contractId, {txHash:txHash.hash});

      if (response.status === 200) {
          alert("Hurrey!!! TxHash: "+ txHash.hash);
      } else {
          alert("check node api http.response:" + response.status);
      }
  }
  catch (e) {

      alert(e.toString());
  }
}

const startPayment = async ({ setError, setTxs, ether, addr, contractId , history}) => {

  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether)
    });
    console.log({ ether, addr });
    console.log("tx", tx);
    setTxs([tx]);
    sendRentalPayRequest(contractId,tx);
    history.push("/tenant/rental-requests");
  } catch (err) {
    setError(err.message);
  }
};

export default function App() {
  const location = useLocation();
  let history = useHistory();
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);

  let etherToBePaid =  (location.params.item.rentAmount +  location.params.item.securityDeposit).toString()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    await startPayment({
      setError,
      setTxs,
      ether: etherToBePaid,
      addr:location.params.item.ownerAddress,
      contractId: location.params.item.contractId,
      history
    });
  };

  return (
    <form className="m-4" onSubmit={handleSubmit}>
      <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Pay Rent+Security Deposit
          </h1>
          <div className="">
            <div className="my-3">
              <input
                type="text"
                name="addr"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder="Recipient Address"
                value = {location.params.item.ownerAddress?location.params.item.ownerAddress:""}
                readOnly
              />
            </div>
            <div className="my-3">
              <input
                name="ether"
                type="text"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder="Amount in ETH"
                value = {location.params.item.rentAmount && location.params.item.securityDeposit ? location.params.item.rentAmount + location.params.item.securityDeposit:""}
                readOnly
              />
            </div>
          </div>
        </main>
        <footer className="p-4">
          <button
            type="submit"
            className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
          >
            Pay now
          </button>
          <ErrorMessage message={error} />
          <TxList txs={txs} />
        </footer>
      </div>
    </form>
  );
}
