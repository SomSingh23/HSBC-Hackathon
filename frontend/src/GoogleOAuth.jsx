import { Suspense } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useLoaderData, Await } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import BACKEND_URL from "./services/api";
import "./App.css";
// import button_logo from "/button_logo/google_gif3.gif";
import HsbcLogo from "/thumbnails/hsbc.jpg";
import "./App.css";
// let handleClick = async () => {
//   let data = await axios.get("http://localhost:3001");
//   console.log(data);
// };
function App() {
  let { role } = useLoaderData();
  let navigate = useNavigate();
  return (
    <>
      <Suspense
        fallback={
          <div>
            <ThreeDots
              visible={true}
              height="120"
              width="120"
              color="#4fa94d"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
            />
          </div>
        }
      >
        <Await resolve={role}>
          {(role) => {
            if (role === "hsbc") {
              return (
                <>
                  <h1>Already Logged IN</h1>
                </>
              );
            }
            if (role === "noRole") {
              return (
                <>
                  <h1 style={{ textAlign: "center", marginTop: "50px" }}>
                    Sign in with Google
                  </h1>
                  <div className="mainLogin">
                    <img
                      draggable="false"
                      className="logo_image"
                      src={HsbcLogo}
                      alt="logo"
                      width={"250px"}
                    />
                    <GoogleLogin
                      className="login_with_google2"
                      onSuccess={async (credentialResponse) => {
                        let data = await axios.post(
                          `${BACKEND_URL}/api/auth/generateToken`,
                          {
                            token: credentialResponse.credential,
                          }
                        );
                        if (data.data.token === "tokenNotGranted") {
                          return;
                        }
                        localStorage.setItem("token", data.data.token);
                        navigate("/");
                      }}
                      onError={() => {
                        console.log("Login Failed");
                      }}
                    />
                  </div>
                </>
              );
            }
          }}
        </Await>
      </Suspense>
    </>
  );
}

export default App;
