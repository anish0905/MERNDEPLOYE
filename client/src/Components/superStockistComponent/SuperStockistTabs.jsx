// Import your Incoming, Ongoing, and Completed components
import Incoming from "./Tabs/Incoming";
import Ongoing from "./Tabs/Ongoing";
import Completed from "./Tabs/Completed";
import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from "axios";

function SuperStockistTabs() {
  const [value, setValue] = useState(0);
  const [orderData, setOrderData] = useState([]);
   const user = localStorage.getItem("email")

   const token = localStorage.getItem("stockistToken");
   
  
  useEffect(() => {
    
    if (!token) {
      return;
    }
    axios.get("http://localhost:5001/api/stockist/order", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setOrderData(response.data);
      console.log('tab',response.data)
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, [token]); // Fetch orders only once on component mount

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
  
  const getOrdersByStatus = (status) => {
     
      return orderData.filter(order => order.status === status && order.superstockistEmail===user);
   
    
  };

  return (
    <Box style={{ width: '100%', backgroundColor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label={<span className="text-xl text-black font-bold">INCOMING</span>} value={0} />
        <Tab label={<span className="text-xl text-black font-bold">ONGOING</span>} value={1} />
        <Tab label={<span className="text-xl text-black font-bold">COMPLETED</span>} value={2} />
      </Tabs>
      {/* Render components based on tab value */}
      {value === 0 && <Incoming data={getOrdersByStatus('pending')} />}
      {value === 1 && <Ongoing data={getOrdersByStatus('confirmed')} />}
      {value === 2 && <Completed data={getOrdersByStatus('delivered')} />}
    </Box>
  );
}

export default SuperStockistTabs;
