import { Suspense, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useLoaderData, Await } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BACKEND_URL from "./services/api";
import axios from "axios";
import "./datacss.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";
import "./App.css";

function FraudDetection() {
  let { role } = useLoaderData();
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/logic/insights/fraud/distribution`
      );
      setData(response.data);
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

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
                <div className="chart-container">
                  <h1>Fraud Detection Analysis</h1>
                  <button onClick={fetchData} disabled={loading}>
                    {loading ? "Loading..." : "Fetch Data"}
                  </button>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  {data.length > 0 && (
                    <div className="chart-wrapper">
                      <BarChart
                        width={800}
                        height={500}
                        data={data}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="_id"
                          tick={{ angle: -45 }}
                          textAnchor="end"
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#8884d8">
                          {/* LabelList now uses _id for labeling each bar */}
                          <LabelList dataKey="count" position="top" />
                        </Bar>
                      </BarChart>
                    </div>
                  )}
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

export default FraudDetection;
