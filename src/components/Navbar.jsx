import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import { GoogleLogout } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSignedIn,
  selectUserData,
  setInput,
  setSingnedIn,
  setUserData,
} from "../features/userSlice";
import "../styling/navbar.css"

function Navbar() {
  const [inputValue, setInputValue] = useState("tech");
  const isSignedIn = useSelector(selectSignedIn);
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();

  const logout = (response) => {
    dispatch(setSingnedIn(false));
    dispatch(setUserData(null));
  };
  const handleClick = (e) => {
      e.preventDefault()
      dispatch(setInput(inputValue))
  }

  return (
    <div className="navbar">
      <h1 className="navbar__header">
        BlogMania <img src="./chat.png" alt="logo" />
      </h1>
      {isSignedIn && (
        <div className="blog__search">
          <input
            className="search"
            placeholder="Search for a blog"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="submit" onClick={handleClick} >
            Search
          </button>
        </div>
      )}

      {isSignedIn ? (
        <div className="navbar__user__data">
          <Avatar className="user" src={userData?.imageURL} alt={userData?.name} />
          <h1 className="signedIn">{userData?.givenName}</h1>
          <GoogleLogout
            clientId="418197199186-btcn0jhstb7s0bhsei45t1dvapq9bu9o.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="logout__button"
              >
                Logout <img src="./sad.png" alt="emoji"/>
              </button>
            )}
            onLogoutSuccess={logout}
            isSignedIn={true}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      ) : (
        <h1 className="notSignedIn">User not avialible</h1>
      )}
    </div>
  );
}

export default Navbar;
