import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom'; // dynamic routes in the URL.
import './Coin.css';
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';

const Coin = () => {
  const { coinId } = useParams();
  const [coindata, setCoindata] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const { currency } = useContext(CoinContext);

  // Fetch coin data
  const fetchData = async () => {
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options); // Use backticks for template literal
      const data = await response.json();
      console.log('Fetched coin data:', data); // Debugging: log fetched coin data
      setCoindata(data);
    } catch (error) {
      console.error('Error fetching coin data:', error);
    }
  };

  // Fetch historical data
  const fetchHistoricalData = async () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-4Khew4oo79fH8UuetKsJiQw9' }
    };

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options);
      const data = await response.json();
      console.log('Fetched historical data:', data);
      setHistoricalData(data);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchHistoricalData();
  }, [currency, coinId]);

  if (coindata && historicalData.prices) { 
    console.log('Coin data:', coindata); 
    console.log('Historical data:', historicalData); 
    return (
      <div className='coin'>
        <div className='coin-name'>
          <img src={coindata.image.large} alt={`${coindata.name} logo`} />
          <p>
            <b>
              {coindata.name} ({coindata.symbol.toUpperCase()})
            </b>
          </p>
        </div>
        <div className="coin-chart">
          <LineChart historicalData={historicalData}/>
        </div>
        <div className="coin-info">
          <table>
            <tbody>
              <tr>
                <td>Crypto Market Rank</td>
                <td>{coindata.market_data.market_cap_rank}</td>
              </tr>
              <tr>
                <td>Market Cap</td>
                <td>{currency.symbol}{coindata.market_data.market_cap[currency.name].toLocaleString()}</td>
              </tr>
              <tr>
                <td>Total Supply</td>
                <td>{coindata.market_data.total_supply}</td>
              </tr>
              <tr>
                <td>Circulating Supply</td>
                <td>{coindata.market_data.circulating_supply}</td>
              </tr>
              <tr>
                <td>Max Supply</td>
                <td>{coindata.market_data.max_supply}</td>
              </tr>
              <tr>
                <td>Last Price</td><td>{currency.symbol}{coindata.market_data.high_24h[currency.name]}</td>
              </tr>
              <tr>
                <td> Current Price</td>
                <td>{currency.symbol}{coindata.market_data.current_price[currency.name]}</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    return (
      <div className='spinner'>
        <div className='spin'></div>
      </div>
    );
  }
};

export default Coin;