import React from "react";
import GoogleLogin from "react-google-login";
import { useSelector , useDispatch} from "react-redux";
import { selectSignedIn, setSingnedIn, setUserData } from "../features/userSlice";
import '../styling/home.css'


function Homepage() {

    const dispatch = useDispatch()

  const login = (response) => {
    console.log(response);
    dispatch(setSingnedIn(true))
    dispatch(setUserData(response.profileObj))
  };

  const isSignedIn = useSelector(selectSignedIn);

  return (
    <div className="home__page" style={{display:isSignedIn ? "none" : ""}}>
      {!isSignedIn && (
        <div className="login__message">
          <h2> <img src="./book.png" alt="book"/> </h2>
          <h1>A Readers favourite place!</h1>
          <p>
            We provide high quality online resourse for reading blogs. Just sign
            up and start reading some quality blogs.
          </p>
          <GoogleLogin
            clientId="418197199186-btcn0jhstb7s0bhsei45t1dvapq9bu9o.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="login__button"
              >
                Login with Google
              </button>
            )}
            // buttonText="Login with Google"
            onSuccess={login}
            onFailure={login}
            isSignedIn={true}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      )}
    </div>
  );
}

export default Homepage;
