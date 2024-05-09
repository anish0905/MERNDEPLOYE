import React, { useState } from "react";
import "../Styles/Dashboard.css";
import Navbar from "../Components/Navbar/Navbar";
import { IoMdHome } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import SalesState from "../Components/Sales_State";
import BarChart from "../utils/Charts/BarChart";
import PieChart from "../utils/Charts/PieChart";
import Logout from "../utils/Logout";

function AdminDashBoard() {
  return (
    <>
      <div className="px-10 py-5">
        <div className="flex justify-end">

          <Navbar />

          <div className="w-10/12">

            <Logout />


            {/* <div className="content-container">
              <div className="home-image">
                <div className="icon-container">
                  <IoMdHome className="icon" />
                </div>
                <h3 style={{ paddingLeft: 15 }}> Admin Dashboard</h3>
              </div>
            </div> */}
            <div className="card-container">
              <div className="card">
                <div className="card1">
                  <p style={{ fontWeight: 500, fontSize: 18 }}> Daily Sales</p>
                  <p style={{ fontWeight: 700, fontSize: 22 }}>25413</p>
                  <p style={{ fontWeight: 500, fontSize: 18 }}>Increased by 12%</p>
                </div>
                <div className="card2">
                  <p style={{ fontWeight: 500, fontSize: 18 }}>Weekly Sales</p>
                  <p style={{ fontWeight: 700, fontSize: 22 }}>$ 15000</p>
                  <p style={{ fontWeight: 500, fontSize: 18 }}>Increased by 60%</p>
                </div>
                <div className="card3">
                  <p style={{ fontWeight: 500, fontSize: 18 }}>Weekly orders</p>
                  <p style={{ fontWeight: 700, fontSize: 22 }}>42,254</p>
                  <p style={{ fontWeight: 500, fontSize: 18 }}>Increased by 40%</p>
                </div>
                <div className="card4">
                  <p style={{ fontWeight: 500, fontSize: 18 }}>Revenue</p>
                  <p style={{ fontWeight: 700, fontSize: 22 }}>RS.1024565</p>
                  <p style={{ fontWeight: 500, fontSize: 18 }}>Increased by 10%</p>
                </div>
              </div>
              <section>
                <div className="charts">
                  <SalesState />
                  <PieChart />
                </div>
                <BarChart />
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminDashBoard