import { FaSearch } from "react-icons/fa";

const Home = () => {
    document.body.style.backgroundColor = 'var(--color-brown)';
    return (
        <div>
            <div className="flex items-center justify-center h-[calc(100vh-80px)]">
                <ul class="space-y-4">
                    <li><h1 className=" text-toffee text-5xl font-bold">
                        Find your next study spot here.
                    </h1></li>
                    <li>
                        <div className="relative w-2/3 max-w-xl mx-auto">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-brown opacity-70"/>
                            <input
                                type="text"
                                className="w-full py-4 pl-12 pr-6 text-lg rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 text-brown bg-white"
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