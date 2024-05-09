import React from "react";
import "./Navbar.css"; // Assuming you have a CSS file for styling
import {
  FaTruck,
  FaClipboardList,
  FaBoxOpen,
  FaMoneyBillAlt,
  FaCog,
  FaTools,
  FaWarehouse,
  FaUsers,
  FaShoppingBasket,
  FaShoppingCart,
} from "react-icons/fa"; // Import required icons
import { TbBuildingWarehouse } from "react-icons/tb";
import  '../../Styles/Styles.css'
import logo from "../../assets/logo.png"

const Navbar = () => {
  return (
    <div className="sidebar flex flex-col h-full">
      <div className="sidebar-header p-4">
        <img src={logo} alt="Logo"/>
      </div>
      <ul className="sidebar-menu mx-4 flex flex-col flex-grow mt-6 Navlist">
        <NavItem href="/supplier" icon={<FaTruck style={{ color: "#ffcc00", fontSize: "2rem" }} />} text="Supplier" />
        <NavItem href="/category" icon={<FaClipboardList style={{ color: "#ff6666", fontSize: "2rem" }} />} text="Category" />
        <NavItem href="/items" icon={<FaBoxOpen style={{ color: "#66cc99", fontSize: "2rem" }} />} text="Items" />
        <NavItem href="/purchases" icon={<FaMoneyBillAlt style={{ color: "#66ff66", fontSize: "2rem" }} />} text="Purchases" />
        <NavItem href="/itemStock" icon={<FaCog style={{ color: "#ff99cc", fontSize: "2rem" }} />} text="Item Stock" />
        <NavItem href="/products" icon={<FaTools style={{ color: "#cc99ff", fontSize: "2rem" }} />} text="Products" />
        <NavItem href="/productStock" icon={<FaWarehouse style={{ color: "#66cccc", fontSize: "2rem" }} />} text="Product Stock" />
        <NavItem href="/seller" icon={<FaUsers style={{ color: "#ff9966", fontSize: "2rem" }} />} text="Seller" />
        <NavItem href="/supplies" icon={<FaShoppingBasket style={{ color: "#66cc99", fontSize: "2rem" }} />} text="Supplies" />
        <NavItem href="/orders" icon={<FaShoppingCart style={{ color: "#ccccff", fontSize: "2rem" }} />} text="Orders" />
        <NavItem href="/sales" icon={<FaMoneyBillAlt style={{ color: "#ff6600", fontSize: "2rem" }} />} text="Sales" /> {/* Added Sales NavItem */}
        <NavItem href="/superStockist" icon={<TbBuildingWarehouse   style={{ color: "#66cccc", fontSize: "2rem" }} />} text="SSOrder" /> {/* Added Sales NavItem */}
       
        
      </ul>
    </div>
  );
};

const NavItem = ({ href, icon, text }) => (
  <a href={href} className="flex items-center p-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:text-white rounded-full">
    <span className="flex items-center">
      <span className="mr-8">{icon}</span> {/* Increased margin from mr-4 to mr-8 */}
      <span className="text-lg font-semibold">{text}</span>
    </span>
  </a>
);

export default Navbar;
