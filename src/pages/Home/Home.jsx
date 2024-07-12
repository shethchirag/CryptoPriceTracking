import { useContext, useEffect, useState } from "react";
import "./home.css";
import { CoinContext } from "../../context/coinContext/CoinContext";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";

const Home = () => {
  const { allCoin, currency, loading } = useContext(CoinContext);
  const [displayData, setDisplayData] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const inputHandler = (e) => {
    setInputValue(e.target.value);
    if (!e.target.value) {
      setDisplayData(allCoin);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const searchData = allCoin.filter((item) =>
      item.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setDisplayData(searchData);
  };

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
        <form onSubmit={submitHandler}>
          <input
            onChange={inputHandler}
            type="text"
            placeholder="search crypto..."
            value={inputValue}
            required
            list="cars"
          />
          <datalist id="cars">
            {allCoin.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </datalist>

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
        {loading ? (
          <Spinner />
        ) : (
          displayData.slice(0, 10).map((item, index) => {
            return (
              <div key={index} className="table-layout">
                <p>{item.market_cap_rank}</p>

                <Link to={`/coin/${item.id}`}>
                  <div className="coin-image">
                    <img src={item.image} alt="" />
                    <p>{item.name + " - " + item.symbol}</p>
                  </div>
                </Link>

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
                  {currency.symbol} {item.market_cap.toLocaleString()}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Home;
