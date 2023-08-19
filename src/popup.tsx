import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSpring, animated } from 'react-spring';
import "~style.css";

const IndexPopup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const ipinfoToken = process.env.PLASMO_PUBLIC_IPINFO_TOKEN;

  const fetchLocation = async () => {
    setIsLoading(true);
    try {
      const ipResponse = await axios.get('https://api.ipify.org?format=json');
      const { ip } = ipResponse.data;
      const locationResponse = await axios.get(`https://ipinfo.io/${ip}/json?token=${ipinfoToken}`);
      const locationData = locationResponse.data;

      setCountry(locationData.country);
      setCity(locationData.city);
      setMessage('Location data retrieved successfully!');

      // Past Location data using local Storage
      const historyItem = { country: locationData.country, city: locationData.city };
      const history = JSON.parse(localStorage.getItem('locationHistory')) || [];
      history.push(historyItem);
      localStorage.setItem('locationHistory', JSON.stringify(history));
    } catch (error) {
      console.log('Error fetching data:', error);
      setMessage('Oops, something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    localStorage.removeItem('locationHistory');
    setMessage('Location history cleared successfully!');
  };

  const headerAnimation = useSpring({ opacity: 1, from: { opacity: 0 } });
  const history = JSON.parse(localStorage.getItem('locationHistory')) || [];

  useEffect(() => {
  }, []);

  return (
    <div className="plasmo-flex plasmo-items-center plasmo-justify-center ">
      <div className="plasmo-bg-white plasmo-shadow-lg plasmo-rounded-lg plasmo-w-full md:plasmo-w-90 plasmo-p-6 plasmo-space-y-4">
        <animated.h1 className="plasmo-text-4xl plasmo-font-semibold plasmo-text-center plasmo-text-blue-700" style={headerAnimation}>IP DiscoverX 🌏</animated.h1>
        <p className="plasmo-text-xl plasmo-text-center plasmo-text-gray-700">Use your IP to Discover your country and city 📍</p>
        <p className="plasmo-text-lg plasmo-text-center plasmo-text-gray-900">
          Your country is: <span className="plasmo-text-blue-500 plasmo-font-medium">
            {isLoading ? (
              <span className="plasmo-inline-block plasmo-animate-spin plasmo-border-t-4 plasmo-border-blue-500 plasmo-border-solid plasmo-rounded-full plasmo-h-8 plasmo-w-8 plasmo-border-r-0"></span>
            ) : (
              country
            )}
          </span>
        </p>
        <p className="plasmo-text-center plasmo-text-lg">
          Your city is: <span className="plasmo-text-blue-500 plasmo-font-medium">
            {isLoading ? (
              <span className="plasmo-inline-block plasmo-animate-spin plasmo-border-t-4 plasmo-border-blue-500 plasmo-border-solid plasmo-rounded-full plasmo-h-8 plasmo-w-8 plasmo-border-r-0"></span>
            ) : (
              city
            )}
          </span>
        </p>
        <div className="plasmo-mt-4 plasmo-text-center plasmo-text-green-600">
          {message}
        </div>
        <div className="plasmo-mt-8 plasmo-flex plasmo-justify-center">
          <button
            className={`plasmo-px-4 plasmo-py-2 plasmo-bg-blue-500 plasmo-text-white plasmo-rounded-md plasmo-transition plasmo-duration-300 plasmo-ease-in-out ${isLoading ? 'plasmo-cursor-not-allowed' : 'hover:plasmo-bg-blue-600 hover:plasmo-shadow-md'}`}
            onClick={fetchLocation}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="plasmo-inline-block plasmo-animate-spin plasmo-border-t-4 plasmo-border-blue-500 plasmo-border-solid plasmo-rounded-full plasmo-h-8 plasmo-w-8 plasmo-border-r-0"></span>
            ) : (
              'Show my location'
            )}
          </button>
        </div>
        {history.length > 0 && (
          <div className="plasmo-mt-4">
            <h2 className="plasmo-text-xl plasmo-text-center plasmo-font-semibold plasmo-text-gray-700">Location History</h2>
            <ul className="plasmo-list-disc plasmo-list-inside plasmo-text-gray-500">
              {history.map((item, index) => (
                <li key={index}>{`Country: ${item.country}, City: ${item.city}`}</li>
              ))}
            </ul>
            <button
              className="plasmo-mt-2 plasmo-px-3 plasmo-py-1 plasmo-text-center plasmo-bg-red-500 plasmo-text-white plasmo-rounded-md plasmo-transition plasmo-duration-300 plasmo-ease-in-out hover:plasmo-bg-red-600"
              onClick={clearHistory}
            >
              🗑️ Clear History
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndexPopup;
