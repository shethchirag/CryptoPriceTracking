import { useContext, useEffect, useState } from "react";
import "./home.css";
import { CoinContext } from "../../context/coinContext/CoinContext";

const Home = () => {
  const { allCoin, setCurrency, currency } = useContext(CoinContext);
  const [displayData, setDisplayData] = useState([]);
  useEffect(() => {
    setDisplayData(allCoin);
  }, [allCoin]);

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br /> Crypto MarketPlace
        </h1>
        <p>
          Welcome the World Largest cryptocurrency marketplace.Sign up to more
          about cryptos...{" "}
        </p>
        <form>
          <input type="text" placeholder="search crypto..." />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p>24h Change</p>
          <p>Market Cap</p>
        </div>
        {displayData.slice(0, 10).map((item, index) => {
          return (
            <div key={index} className="table-layout">
              <p>{item.market_cap_rank}</p>
              <div className="coin-image">
                <img src={item.image} alt="" />
                <p>{item.name + " - " + item.symbol}</p>
              </div>
              <p>
                {currency.symbol} {item.current_price.toLocaleString()}
              </p>
              <p
                className={
                  item.price_change_percentage_24h < 0
                    ? "redAlert"
                    : "greenAlert"
                }
              >
                {item.price_change_percentage_24h.toFixed(2)}
              </p>
              <p>
                {" "}
                {currency.symbol} {item.market_cap.toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
