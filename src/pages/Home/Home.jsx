import React, { useEffect, useState, useContext } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext";
import { Toaster, toast } from "sonner";
import { Link } from "react-router-dom";

const Home = () => {
  const { allCoins, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setDisplayCoin(allCoins);
  }, [allCoins]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setDisplayCoin(allCoins);
    }
  }, [searchTerm, allCoins]);

  //search functionality
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      toast.error("Please enter coin name", {style: {fontSize: "20px", color: "red"}});
      return;
    }
    const filteredCoins = allCoins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayCoin(filteredCoins);
  };

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br />
          Crypto Tracker Site
        </h1>
        <p>
          Welcome to the world of cryptocurrency. Let's sign up to get started.
        </p>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search Crypto"
            value={searchTerm}
            list="coinlist"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
           
          <datalist id="coinlist">
            {allCoins.map((coin, index ) => (
              <option key={index} value={coin.name}/>
            ))}
          </datalist>
          <button type="submit">Search</button>
        </form>
      </div>
      <Toaster position="top-right" />
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coin</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24h Change</p>
          <p className="market">Market Cap</p>
        </div>
        {displayCoin.slice(0, 10).map((item, index) => (
          <Link to={`/coin/${item.id}`}  className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt="Coin Logo" />
              <p>{item.name + " - " + item.symbol}</p>
            </div>
            <p>{currency.symbol} {item.current_price}</p>
            <p style={{ textAlign: "center", color: item.price_change_percentage_24h < 0 ? 'red' : 'green' }}>
              {item.price_change_percentage_24h.toFixed(2)}%
            </p>
            <p className="market">{currency.symbol} {item.market_cap.toLocaleString()}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
