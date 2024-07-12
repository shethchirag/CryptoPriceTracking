import { createContext, useEffect, useState } from "react";
import useFetchData from "../../hook/useFetchData";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  const [data, loading] = useFetchData(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`
  );
  console.log(allCoin);

  const setCoinData = () => {
    setAllCoin(data);
  };

  useEffect(() => {
    setCoinData();
  }, [data]);
  const contextValue = {
    allCoin,
    setCurrency,
    currency,
    loading,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};
export default CoinContextProvider;
