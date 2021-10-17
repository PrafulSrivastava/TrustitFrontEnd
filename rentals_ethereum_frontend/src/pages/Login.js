import React, { useState, useEffect, useRef } from "react";
import "../assets/css/login.css";
import axios from "axios";
import { setAuthUser } from "../slices/Auth.slice";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../services/storage";
import { USER_LOGIN } from "../services/api";
import { useHistory } from "react-router-dom";
import MetaMaskIcon from "../assets/images/metamask.svg";
import GoogleIcon from "../assets/images/googleIcon.svg";
import { ToastContainer, Toast } from "react-bootstrap";

function Login() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [publicKey, setPublicKey] = useState(null);
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // toggle flag after first render/mounting
      return;
    }
    if (publicKey) login();
  }, [publicKey]);

  const login = async (event) => {
    // event.preventDefault();
    // if (!publicKey) {
    //   alert("please enter public key");
    //   return false;
    // }

    const params = { publicKey: publicKey };

    try {
      const response = await axios.get(USER_LOGIN);
      if (response.status === 200) {
        const result = response.data;
        if (result.status === "SUCCESS") {
          const filtered = result?.data.filter(function (e) {
            return e.publicKey?.toString() === publicKey?.toString();
          });
          if (filtered[0]) {
            console.log(filtered[0]);
            setUser(filtered[0]);
            setToken(filtered[0]?.publicKey);
            dispatch(setAuthUser(filtered[0]));
            history.push("/");
          } else {
            const signUpResponse = await axios.post(USER_LOGIN, params);
            console.log(signUpResponse);
            setUser(signUpResponse.data.data);
            setToken(signUpResponse.data.data?.publicKey);
            dispatch(setAuthUser(signUpResponse.data.data));
            history.push("/");
          }
        } else {
          alert(result.message);
        }
      } else {
        alert(response?.message);
      }
    } catch (e) {
      alert(e.toLocaleString());
    }
  };

  const handleLoginClick = () => {
    if (window.ethereum.selectedAddress) {
      setPublicKey(window.ethereum.selectedAddress);
    } else {
      setShow(true);
    }
  };
  return (
    // <div className="container">
    //   <div className="row justify-content-center my-5">
    //     <div className="col-md-5">
    //       <div className="auth-wrapper">
    //         <div className="auth-inner">
    //           <form onSubmit={login} autoComplete="off">
    //             <h3>Welcome Back !</h3>
    //             <div className="form-group">
    //               <span className="my-1">
    //                 <label htmlFor="publicKey">Public Key</label>
    //               </span>
    //               <input
    //                 type="text"
    //                 name="publicKey"
    //                 id="publicKey"
    //                 onChange={(e) => setPublicKey(e.target.value)}
    //                 className="form-control"
    //                 placeholder=""
    //               />
    //             </div>
    //             <div className="my-2">
    //               <button className="btn btn-primary btn-block">Login</button>
    //             </div>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    // </div>
    <div className="container">
      <ToastContainer className="p-3" position="top-end">
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Body>No MetaMask Account Found.</Toast.Body>
        </Toast>
      </ToastContainer>
      <div>
        <div className="row justify-content-center align-item-center my-2 mt-5">
          <button
            style={{
              height: "60px",
              width: "400px",
              backgroundColor: "black",
              color: "white",
              fontWeight: "900",
              borderRadius: "50px",
              border: "none",
              marginTop: "10%",
              fontFamily: "'Verdana', sans-serif",
              boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
            }}
            onClick={handleLoginClick}
          >
            <img src={MetaMaskIcon} alt="MetaMaskIcon" />
            <span style={{ marginLeft: "10px" }}>
              Login/SignUp With MetaMask
            </span>
          </button>
        </div>
        <div className="row justify-content-center align-item-center my-2">
          <button
            style={{
              height: "60px",
              width: "400px",
              backgroundColor: "grey",
              color: "white",
              fontWeight: "900",
              borderRadius: "50px",
              border: "none",
              fontFamily: "'Verdana', sans-serif",
              boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img src={GoogleIcon} alt="GoogleIcon" />
            <span style={{ marginLeft: "10px" }}>Login/SignUp With Email</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
