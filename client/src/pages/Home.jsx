import React from 'react';
import '../css/Home.css'
import Navbar from '../components/Navbar/Navbar';
import StickyHeadTable from '../components/Table/StickyHeadTable';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className='past-parkings'>
        <StickyHeadTable />
      </div>
    </div>
  )
}

export default Home;
