import { Suspense } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useLoaderData, Await } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import "./Old.css";
import BACKEND_URL from "./services/api";

function App() {
  let { role } = useLoaderData();
  let navigate = useNavigate();

  return (
    <>
      <Suspense
        fallback={
          <div className="loader">
            <ThreeDots
              visible={true}
              height="120"
              width="120"
              color="#cc3300"
              ariaLabel="three-dots-loading"
            />
          </div>
        }
      >
        <Await resolve={role}>
          {(role) => {
            if (role === "hsbc") {
              return (
                <div className="container">
                  <h1 className="heading">HSBC Admin Page</h1>
                  <div>
                    <Link to="/fraud/detection" className="button">
                      Fraud Detection
                    </Link>
                    <Link to="/customer/segmentation" className="button">
                      Customer Segmentation
                    </Link>
                    <Link
                      to="/total_spending_in_each_category"
                      className="button"
                    >
                      Total Spending
                    </Link>
                    <Link to="/merchant/spending" className="button">
                      Merchant Spending
                    </Link>
                    <Link to="/gender/segmentation" className="button">
                      Gender Segmentation
                    </Link>
                    <Link to="/predictive/modeling" className="button">
                      Predictive Modeling
                    </Link>
                  </div>
                </div>
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
