import "./NavBar.css";
import logo from "../../assets/logo.png";
import arrowIcon from "../../assets/arrow_icon.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CoinContext } from "../../context/coinContext/CoinContext";

const NavBar = () => {
  const { allCoin, setCurrency, currency } = useContext(CoinContext);
  const currencyHandler = (currency) => {
    switch (currency.target.value) {
      case "usd": {
        setCurrency({ name: currency.target.value, symbol: "$" });
        break;
      }
      case "eur": {
        setCurrency({ name: currency.target.value, symbol: "€" });
        break;
      }
      case "inr": {
        setCurrency({ name: currency.target.value, symbol: "₹" });
        break;
      }
      default: {
        setCurrency({ name: currency.target.value, symbol: "$" });
      }
    }
  };
  return (
    <div className="navbar">
      <img src={logo} alt="logo" />
      <ul>
        <li>
          <Link to="/">Home </Link>
        </li>
        <li>Feature</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      <div className="nav-right">
        <select onChange={currencyHandler} name="" id="">
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>
        <button>
          Sign Up <img src={arrowIcon} alt="arr-icon" />
        </button>
      </div>
    </div>
  );
};

export default NavBar;
