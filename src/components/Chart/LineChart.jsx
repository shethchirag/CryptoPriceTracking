import { useEffect, useState } from "react";
import Chart from "react-google-charts";

const LineChart = ({ chartData }) => {
  const [chartArray, setChartArray] = useState([["date", "Prices"]]);
  console.log(chartData);
  useEffect(() => {
    const data = [["date", "prices"]];
    chartData?.prices?.map((item) => {
      console.log(item);
      return data.push([
        new Date(item[0]).toLocaleDateString().slice(0, -5),
        item[1],
      ]);
    });
    setChartArray(data);
  }, [chartData]);
  return (
    <Chart
      data={chartArray}
      chartType="LineChart"
      width="100%"
      height="400px"
      legendToggle
    />
  );
};

export default LineChart;
