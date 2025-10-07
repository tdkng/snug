import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const NavBar = () => {
    const path = useLocation().pathname;
    return (
        <div className="h-[80px] z-50 flex items-center sticky top-0 bg-toffee">
            <div className="lg:px-16 sm:px-8 px-4 w-full flex justify-between">
                <Link to="/" className="flex items-center text-2xl font-bold text-white">
                    <p className="text-white">snug_app</p>
                </Link>
                <ul>
                    <li className="inline-block px-4">
                        <Link className={`${
                            path === "/" ? "text-white font-bold" : "text-white"
                        }`} to="/">
                            Home
                        </Link>
                    </li>
                    <li className="inline-block px-4">
                        <Link className={`${
                            path === "/query" ? "text-white font-bold" : "text-white"
                        }`} to="/query">
                            Search
                        </Link>
                    </li>
                    <li className="inline-block px-4">
                        <Link className={`${
                            path === "/about" ? "text-white font-bold" : "text-white"
                        }`} to="/about">
                            About
                        </Link>
                    </li>
                    <li className="inline-block px-4">
                        <Link className={`${
                            path === "/contact" ? "text-white font-bold" : "text-white"
                        }`} to="/contact">
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default NavBar;