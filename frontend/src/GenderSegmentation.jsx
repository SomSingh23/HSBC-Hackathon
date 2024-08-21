import React, { useState, useEffect } from "react";
import axios from "axios";
import BACKEND_URL from "./services/api";
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
  Cell,
  LabelList,
} from "recharts";
import { ThreeDots } from "react-loader-spinner";

function GenderBasedSpending() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/logic/insights/spending/gender`
        );
        setData(response.data);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const colors = ["#4fa94d"];

  if (loading) {
    return (
      <div className="loading-container">
        <ThreeDots
          visible={true}
          height="120"
          width="120"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
        />
      </div>
    );
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="chart-container">
      <h2>Gender-Based Spending Analysis</h2>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60,
          }}
          barSize={60} // Increase the size of the bars
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="_id"
            tick={{ angle: 0, fontSize: 14 }}
            textAnchor="middle"
            interval={0} // Show all tick marks, no skipping
          >
            <Label
              value="Gender"
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
          <Bar dataKey="totalSpent" fill="#4fa94d" name="Total Spent">
            {/* Apply dynamic colors */}
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
            <LabelList
              dataKey="totalSpent"
              position="top"
              formatter={(value) =>
                `$${new Intl.NumberFormat("en").format(value)}`
              }
              style={{ fontSize: 12, fill: "#333" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GenderBasedSpending;
