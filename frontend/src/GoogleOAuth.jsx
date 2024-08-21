import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import BACKEND_URL from "./services/api";
import { useNavigate, Link } from "react-router-dom";
export default function GoogleOAuth() {
  let navigate = useNavigate();
  return (  
    <>
      <h1>Sign in with Google</h1>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          let data = await axios.post(`${BACKEND_URL}/api/auth/generateToken`, {
            token: credentialResponse.credential,
          });
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
    </>
  );
}
