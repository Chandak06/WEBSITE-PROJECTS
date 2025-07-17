import { FiHeart } from "react-icons/fi";
import { AiOutlineShoppingCart, AiOutlineUserAdd } from "react-icons/ai";
import "./Nav.css";

const Nav = ({handleInputChange,query}) => {
  return (
    <nav className="flex border-b-2 border-gray-100 justify-around items-center p-5 ml-8 z-[999] ">
      <div className="nav-container">
        <input
        value={query}
          type="text"
          className="search-input px-5 py-3 border-none bg-[#f7f6f6] outline-none mr-5 rounded relative w-[350px]"
          placeholder="Enter your shoes"
          onChange={handleInputChange}
        />
      </div>

      <div className="profile-container flex justify-evenly">
        <a href="#">
          <FiHeart className="nav-icons" />
        </a>
        <a href="#">
          <AiOutlineShoppingCart className="nav-icons" />
        </a>
        <a href="#">
          <AiOutlineUserAdd className="nav-icons" />
        </a>
      </div>
    </nav>
  );
};

export default Nav;
