import React from 'react';
import SuperStockistTabs from '../Components/superStockistComponent/SuperStockistTabs';
import NavbarStock from '../Components/NavbarStock/NavbarStock';
import Logout from '../utils/Logout';

function SuperStockistDashboard() {
  const a = {
    name: 'rrr',
    product: 'ttt',
    price: '0'
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-300">
      <NavbarStock /> {/* Include the Navbar component here */}
      <Logout />

      <div className="flex flex-grow justify-between px-4 py-6">
        {/* Left side */}
        {/* <div className="w-1/4">
          <Add name="Seller" />
        </div> */}

        <div className="ml-80 w-full">
          <SuperStockistTabs v={0} />
        </div>
      </div>
    </div>
  );
}

export default SuperStockistDashboard;
