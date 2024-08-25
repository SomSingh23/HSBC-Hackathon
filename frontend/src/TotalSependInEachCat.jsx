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
  ResponsiveContainer,
  Label,
} from "recharts";
import "./App.css";

function TotalSependInEachCat() {
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
        `${BACKEND_URL}/api/logic/insights/spending/category`
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
              color="#cc3300"
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
                  <h2>Aggregate Spending by Category</h2>
                  <button
                    onClick={fetchData}
                    disabled={loading}
                    className="fetch-button"
                  >
                    {loading ? "Loading..." : "Fetch Data"}
                  </button>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  {data.length > 0 && (
                    <div className="chart-wrapper">
                      <br></br>
                      <ResponsiveContainer width="100%" height={500}>
                        <BarChart
                          data={data}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 80,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="_id"
                            tick={{ angle: -45, fontSize: 12 }}
                            textAnchor="end"
                          >
                            <Label
                              value="Categories"
                              offset={-70}
                              position="insideBottom"
                            />
                          </XAxis>
                          <YAxis>
                            <Label
                              value="Total Spent (in USD)"
                              angle={-90}
                              position="insideLeft"
                              style={{ textAnchor: "middle" }}
                            />
                          </YAxis>
                          <Tooltip
                            formatter={(value) =>
                              new Intl.NumberFormat("en").format(value)
                            }
                          />
                          <Legend />
                          <Bar dataKey="totalSpent" fill="#cc3300">
                            <LabelList
                              dataKey="totalSpent"
                              position="top"
                              formatter={(value) =>
                                new Intl.NumberFormat("en").format(value)
                              }
                              style={{ fontSize: 12, fill: "#333" }}
                            />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
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

export default TotalSependInEachCat;
