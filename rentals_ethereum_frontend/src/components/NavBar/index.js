import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeAuthUSer, setAuthUser } from "../../slices/Auth.slice";
import { getUser } from "../../services/storage";
import { api, FETCH_USER_URL } from "../../services/api";
import { useHistory } from "react-router-dom";
import "./navbar.css"
function Index() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useSelector((state) => state?.auth);

  useEffect(() => {
    (async () => {
      await getAuthUser();
    })();
  }, []);

  const getAuthUser = async () => {
    const response = await api.get(FETCH_USER_URL);
    if (response.status === 200) {
      const authUser = getUser();
      if (authUser?.publicKey) {
        const { data } = response.data;
        const filtered = data.filter(function (e) {
          return e.publicKey?.toString() === authUser?.publicKey?.toString();
        });
        console.log(filtered);
        dispatch(setAuthUser(filtered[0]));
      }
    }
  };

  const logout = () => {
    localStorage.clear();
    dispatch(removeAuthUSer());
    history.push("/login");
  };
  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="#">Our Services</a></li>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="/">About Us</a></li>
        <li><a href="#">Contact</a></li>
        {user && Object.values(user)?.length ? (
          <>
            <li><a href="/">Dashboard</a></li>
            <li><a href="/">Logout</a></li>
          </>
        ) : (
          <li><a href="/login">Login</a></li>
        )}
      </ul>
    </nav>


  );
}

export default Index;
