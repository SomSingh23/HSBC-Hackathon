import { Suspense } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useLoaderData, Await } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import BACKEND_URL from "./services/api";
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
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "50px",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    <h1 style={{ fontSize: "36px", color: "#2c3e50" }}>
                      HSBC Admin Page
                    </h1>
                    <div style={{ marginTop: "30px" }}>
                      <Link
                        to="/fraud/detection"
                        style={{
                          display: "inline-block",
                          padding: "10px 20px",
                          fontSize: "18px",
                          color: "white",
                          backgroundColor: "#3498db",
                          textDecoration: "none",
                          borderRadius: "5px",
                          marginBottom: "15px",
                          transition: "background-color 0.3s ease",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#2980b9")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "#3498db")
                        }
                      >
                        Fraud Detection
                      </Link>
                      <br />
                      <Link
                        to="/customer/segmentation"
                        style={{
                          display: "inline-block",
                          padding: "10px 20px",
                          fontSize: "18px",
                          color: "white",
                          backgroundColor: "#e74c3c",
                          textDecoration: "none",
                          borderRadius: "5px",
                          transition: "background-color 0.3s ease",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#c0392b")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "#e74c3c")
                        }
                      >
                        Customer Segmentation
                      </Link>
                      <br />
                      <br></br>
                      <Link
                        to="/total_spending_in_each_category"
                        style={{
                          display: "inline-block",
                          padding: "10px 20px",
                          fontSize: "18px",
                          color: "white",
                          backgroundColor: "#e74c3c",
                          textDecoration: "none",
                          borderRadius: "5px",
                          transition: "background-color 0.3s ease",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#c0392b")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "#e74c3c")
                        }
                      >
                        Total spending
                      </Link>
                      <br />
                      <br></br>
                      <Link
                        style={{
                          display: "inline-block",
                          padding: "10px 20px",
                          fontSize: "18px",
                          color: "white",
                          backgroundColor: "#e74c3c",
                          textDecoration: "none",
                          borderRadius: "5px",
                          transition: "background-color 0.3s ease",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#c0392b")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "#e74c3c")
                        }
                        to="/merchant/spending"
                      >
                        Merchant Spending
                      </Link>
                      <br />
                      <br></br>
                      <Link to="/gender/segmentation">Gender Segmentation</Link>
                    </div>
                  </div>
                </>
              );
            }
            if (role === "noRole") {
              navigate("/login/google/auth");
            }
          }}
        </Await>
      </Suspense>
    </>
  );
}

export default App;
