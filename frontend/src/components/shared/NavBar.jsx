import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const NavBar = () => {
    const path = useLocation().pathname;
    return (
        <div className="h-[80px] z-50 top-4 flex items-center sticky bg-white/30 backdrop-blur-sm shadow-md rounded-2xl">
            <div className="lg:px-16 sm:px-8 px-4 w-full flex justify-between text-white">
                <Link to="/" className="flex items-center text-2xl font-bold">
                    <p>snug_app</p>
                </Link>
                <ul>
                    <li className="inline-block px-4">
                        <Link className={`${
                            path === "/home" ? "font-bold" : ""
                        }`} to="/home">
                            Home
                        </Link>
                    </li>
                    <li className="inline-block px-4">
                        <Link className={`${
                            path === "/query" ? "font-bold" : ""
                        }`} to="/query">
                            Search
                        </Link>
                    </li>
                    {/* <li className="inline-block px-4">
                        <Link className={`${
                            path === "/about" ? "text-white font-bold" : "text-white"
                        }`} to="/about">
                            About
                        </Link>
                    </li> */}
                    <li className="inline-block px-4">
                        <Link className={`${
                            path === "/contact" ? "font-bold" : ""
                        }`} to="/contact">
                            Contact
                        </Link>
                    </li>
                    <li className="inline-block px-4">
                        <Link className={`${
                            path === "/profile" ? "font-bold" : ""
                        }`} to="/profile">
                            Profile
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default NavBar;