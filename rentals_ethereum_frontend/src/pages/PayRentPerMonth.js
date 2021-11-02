import { useState } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { api, PAY_RENT_PER_MONTH } from "../services/api";


const payRentForMonth = async (propertyId,tx) => {
  try {
      const response = await api.post(PAY_RENT_PER_MONTH + "/" + propertyId);

      if (response.status === 200) {
          alert("Rent Payment successful! "+ "TxHash: "+ tx.hash);
      } else {
          alert("check node api http.response:" + response.status);
      }
  }
  catch (e) {

      alert(e.toString());
  }
}

const startPayment = async ({ setError, setTxs, ether, addr, propertyId , history}) => {

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
    setTxs([tx]);
    payRentForMonth(propertyId, tx);
    history.push("/owner/my-property-list-tenant");
  } catch (err) {
    setError(err.message);
  }
};

export default function App() {
  const location = useLocation();
  let history = useHistory();
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    await startPayment({
      setError,
      setTxs,
      ether: location.params.item.rentAmount.toString(),
      addr:location.params.item.ownerAddress,
      propertyId: location.params.item.propertyId,
      history
    });
  };

  return (
    <form className="m-4" onSubmit={handleSubmit}>
      <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Pay Rent
          </h1>
          <div className="">
          <div className="my-3">For Month:  
              <input
                name="rent"
                type="text"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder="For month"
                value = {location.params.item.rentToBePaid?location.params.item.rentToBePaid:""}
                readOnly
              />
            </div>
            <div className="my-3">To Address: 
              <input
                type="text"
                name="addr"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder="Recipient Address"
                value = {location.params.item.ownerAddress?location.params.item.ownerAddress:""}
                readOnly
              />
            </div>
            <div className="my-3">Rent Amount: 
              <input
                name="ether"
                type="text"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder="Amount in ETH"
                value = {location.params.item.rentAmount?location.params.item.rentAmount:""}
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
