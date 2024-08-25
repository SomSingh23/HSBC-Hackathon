import React, { useState } from "react";
import axios from "axios";
import BACKEND_URL from "./services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
  LabelList,
} from "recharts";
import { ThreeDots } from "react-loader-spinner";

function SpendingVisualization() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/logic/insights/customers/cltv`
      );
      console.log("Fetched Data:", response.data); // Debugging line
      setData(response.data);
    } catch (err) {
      setError("Error fetching data");
      console.error("Error fetching data:", err); // Debugging line
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chart-container">
      <h2>Customer Spending Visualization</h2>
      <button onClick={fetchData} disabled={loading}>
        {loading ? "Loading..." : "Fetch Data"}
      </button>
      {loading && (
        <div className="loading-container">
          <ThreeDots
            visible={true}
            height="120"
            width="120"
            color="#cc3300"
            ariaLabel="three-dots-loading"
          />
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data.length > 0 && (
        <ResponsiveContainer width="100%" height={500}>
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 60,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="_id"
              tick={{ angle: 0, fontSize: 14 }}
              textAnchor="middle"
              interval={0}
            >
              <Label
                value="Customer ID"
                offset={-10}
                position="insideBottom"
                style={{ fontSize: 16 }}
              />
            </XAxis>
            <YAxis>
              <Label
                value="Total Spent (in USD)"
                angle={-90}
                position="insideLeft"
                style={{ textAnchor: "middle", fontSize: 16 }}
              />
            </YAxis>
            <Tooltip
              formatter={(value) =>
                `$${new Intl.NumberFormat("en").format(value)}`
              }
            />
            <Legend verticalAlign="top" />
            <Line
              type="monotone"
              dataKey="totalSpent"
              stroke="#8884d8"
              dot={false}
              name="Total Spent"
            >
              <LabelList
                dataKey="totalSpent"
                position="top"
                formatter={(value) => new Intl.NumberFormat("en").format(value)}
                style={{ fontSize: 12, fill: "#333" }}
              />
            </Line>
            <Line
              type="monotone"
              dataKey="transactionCount"
              stroke="#82ca9d"
              dot={false}
              name="Transaction Count"
            >
              <LabelList
                dataKey="transactionCount"
                position="top"
                formatter={(value) => new Intl.NumberFormat("en").format(value)}
                style={{ fontSize: 12, fill: "#333" }}
              />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SpendingVisualization;
