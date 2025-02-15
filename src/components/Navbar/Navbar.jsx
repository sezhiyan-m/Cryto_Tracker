import React, { useContext } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import arrow from '../../assets/arrow_icon.png';
import { CoinContext } from '../../context/CoinContext';
import { Link } from 'react-router-dom'; 

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);

  const handleCurrency = (e) => {
    switch (e.target.value) {
      case "usd":
        setCurrency({ name: "usd", symbol: "$" });
        break;
      case "inr":
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      case "eur":
        setCurrency({ name: "eur", symbol: "€" });
        break;
      default:
        setCurrency({ name: "usd", symbol: "$" });
    }
  };

  return (
    <div className='navbar'>
      <Link to={"/"}>
      <img src={logo} className='logo' alt="" />
      </Link>
      <ul>
        <Link to={"/"}><li>Home</li></Link>
        <Link><li>Features</li></Link>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      <div className='nav-right'>
        <select onChange={handleCurrency}>
          <option value="usd">USD</option>
          <option value="inr">INR</option>
          <option value="eur">EUR</option>
        </select>
        <button>Sign up<img src={arrow} alt="arrow icon" /></button>
      </div>
    </div>
  );
};

export default Navbar;
