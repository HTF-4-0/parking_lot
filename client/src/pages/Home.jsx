import React, { useEffect, useState } from 'react';
import '../css/Home.css'
import Navbar from '../components/Navbar/Navbar';
import StickyHeadTable from '../components/Table/StickyHeadTable';

const Home = () => {
  // Use state to store the fetched data
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3360/history');
        const jsonData = await response.json();
        // Update the state with the fetched data
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='past-parkings'>
        <StickyHeadTable rows={data} />
      </div>
    </div>
  );
}

export default Home;
