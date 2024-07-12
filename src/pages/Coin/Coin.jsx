import { useParams } from "react-router-dom";
import "./coin.css";
import { useContext, useEffect, useState } from "react";
import useFetchData from "./../../hook/useFetchData";
import Spinner from "../../components/Spinner";
import LineChart from "../../components/Chart/LineChart";
import { CoinContext } from "../../context/coinContext/CoinContext";

const Coin = () => {
  const [coinDisplayData, setCoinDisplayData] = useState({});
  const [chartData, setChartData] = useState({});
  const { coinId } = useParams();
  const { currency } = useContext(CoinContext);
  const [data, loading, error] = useFetchData(
    `https://api.coingecko.com/api/v3/coins/${coinId}`
  );
  const [chartDataApi, loadingChart] = useFetchData(
    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`
  );

  useEffect(() => {
    setCoinDisplayData(data);
  }, [data]);
  useEffect(() => {
    setChartData(chartDataApi);
  }, [chartDataApi]);

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (loading && loadingChart) {
    return <Spinner />;
  }

  return (
    <div className="coin">
      {coinDisplayData?.image?.large && (
        <div className="coin-name">
          <img
            src={coinDisplayData?.image?.large}
            alt={coinDisplayData?.name}
          />
          <p>
            <b>
              {coinDisplayData?.name} ({coinDisplayData?.symbol})
            </b>
          </p>
        </div>
      )}
      {chartData.prices && (
        <div className="coin-chart">
          <LineChart chartData={chartData} />
        </div>
      )}
      {coinDisplayData?.market_cap_rank && (
        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinDisplayData?.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li>
              {currency?.symbol}
              {coinDisplayData?.market_data?.current_price[
                currency?.name
              ].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>
              {currency?.symbol}
              {coinDisplayData?.market_data?.market_cap[
                currency.name
              ].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24h High</li>
            <li>
              {currency?.symbol}
              {coinDisplayData?.market_data?.high_24h[
                currency.name
              ].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24h Low</li>
            <li>
              {currency.symbol}
              {coinDisplayData.market_data?.low_24h[
                currency.name
              ].toLocaleString()}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Coin;
