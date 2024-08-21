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
  ResponsiveContainer,
  Label,
  LineChart,
  Line,
  LabelList,
} from "recharts";
import "./App.css";

function MerchantSpending() {
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
        `${BACKEND_URL}/api/logic/insights/merchants/rank`
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
                  <h2>Merchant Spending and Transaction Count</h2>
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
                              value="Merchants"
                              offset={-70}
                              position="insideBottom"
                            />
                          </XAxis>
                          <YAxis yAxisId="left">
                            <Label
                              value="Total Spent (in USD)"
                              angle={-90}
                              position="insideLeft"
                              style={{ textAnchor: "middle" }}
                            />
                          </YAxis>
                          <YAxis yAxisId="right" orientation="right">
                            <Label
                              value="Transaction Count"
                              angle={-90}
                              position="insideRight"
                              style={{ textAnchor: "middle" }}
                            />
                          </YAxis>
                          <Tooltip
                            formatter={(value) =>
                              new Intl.NumberFormat("en").format(value)
                            }
                          />
                          <Legend />
                          <Bar
                            yAxisId="left"
                            dataKey="totalSpent"
                            fill="#4fa94d"
                            name="Total Spent"
                          >
                            <LabelList
                              dataKey="totalSpent"
                              position="top"
                              formatter={(value) =>
                                new Intl.NumberFormat("en").format(value)
                              }
                              style={{ fontSize: 12, fill: "#333" }}
                            />
                          </Bar>
                          <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="transactionCount"
                            stroke="#8884d8"
                            name="Transaction Count"
                          />
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

export default MerchantSpending;
