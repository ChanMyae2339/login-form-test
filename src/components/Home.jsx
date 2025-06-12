import { FaWifi } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen w-full   flex items-center justify-center px-4 py-8 ">
      <div className="bg-gradient-to-r from-indigo-400 via-sky-300 to-cyan-200 max-w-6xl w-full bg-white/70 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden ">
        {/* Left Side  bg-gradient-to-tl from-sky-100 to-cyan-200 */}
        <div className="flex-1 flex flex-col justify-center p-10 md:p-16 ">
          <div className="flex items-center gap-4 mb-6">
            <FaWifi className="text-5xl text-white drop-shadow-lg animate-pulse" />
            <img
              src="https://www.agbcommunication.com/_next/static/media/AGBLogo.77b5873b.svg"
              alt="AGB Logo"
              className="h-16 w-auto"
            />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 mb-4 leading-tight drop-shadow-md">
            Internet Service Provider
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl">
            Fast, reliable, and secure internet for your home and business.
            Experience seamless connectivity and world-class support with our
            ISP solutions.
          </p>
          <div className="flex gap-4">
            <button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl shadow transition duration-200">
              Get Started
            </button>
            <button className="bg-white border border-sky-400 text-sky-600 font-semibold px-6 py-3 rounded-xl shadow hover:bg-sky-50 transition duration-200">
              Learn More
            </button>
          </div>
        </div>
        {/* Right Side */}
        <div className="flex-1 flex items-center justify-center  p-8 md:p-12">
          <div className="relative w-full max-w-md">
            <img
              src="https://www.kindpng.com/picc/m/70-701064_isp-network-hd-png-download.png"
              alt="ISP Network Illustration"
              className="w-full h-auto rounded-2xl shadow-lg border-4 border-white"
            />
            <div className="absolute -top-6 -right-6 bg-white rounded-full p-4 shadow-lg border-2 border-sky-200 animate-bounce">
              <FaWifi className="text-4xl text-sky-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
