import { FaSearch } from "react-icons/fa";
import home_bg from '../../assets/cafe_bg.jpg';

const Home = () => {
    document.body.style.backgroundColor = 'var(--color-brown)';
    return (
        <div className="flex h-[calc(100vh-80px)]">
            <div>
                <img
                    className="absolute -translate-y-[112px] h-[calc(100vh-80px)] w-full object-cover object-center -z-10 opacity-70"
                    src={home_bg}
                />
            </div>
            <div className="flex justify-center items-center w-full h-[720px]">
                <ul className="space-y-4">
                    <li><h1 className="text-white text-center text-5xl font-bold">
                        Find your next study spot here.
                    </h1></li>
                    <li>
                        <div className="relative w-2/3 max-w-xl mx-auto">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-dark-brown opacity-70"/>
                            <input
                                type="text"
                                className="w-full py-4 pl-12 pr-6 text-lg border-2 border-gray-300 rounded-full shadow-md focus:outline-none text-dark-brown bg-white"
                                placeholder="San Francisco, CA"
                            />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Home