import { assets } from "../../assets/QuickBlog-Assets/assets";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br  from-[#F8F9FD] to-[#F0F2F8] mt-20 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[75rem] mx-auto">
        {/* Main Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-5 space-y-6 pb-8 sm:pb-0 border-b sm:border-b-0 lg:border-r border-gray-200 lg:pr-8 xl:pr-12">
            <div className="flex items-center gap-3 group">
              <div className="relative">
                <img
                  src={assets.logo || "/placeholder.svg"}
                  alt="Writelify logo"
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#5044E5] opacity-0 group-hover:opacity-10 rounded-full transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 tracking-tight">
                Writelify
              </h3>
            </div>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md">
              Your one-stop solution for all writing needs. Discover tools,
              insights, and resources to elevate your content game.
            </p>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                Stay Updated
              </h4>
              <div className="flex flex-col sm:flex-row gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5044E5] focus:border-transparent transition-all duration-300"
                />
                <button className="px-4 py-2 bg-[#5044E5] text-white text-sm font-medium rounded-lg hover:bg-[#4038D4] transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-5">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 uppercase tracking-wide relative">
              Quick Links
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#5044E5] mt-2"></div>
            </h2>
            <ul className="space-y-3">
              {[
                "Home",
                "About Us",
                "Contact Us",
                "Privacy Policy",
                "Terms of Service",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-[#5044E5] transition-all duration-300 text-sm sm:text-base relative group inline-block"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#5044E5] transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Need Help */}
          <div className="lg:col-span-2 space-y-5">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 uppercase tracking-wide relative">
              Need Help?
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#5044E5] mt-2"></div>
            </h2>
            <ul className="space-y-3">
              {["FAQ", "Support", "Feedback", "Community"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-[#5044E5] transition-all duration-300 text-sm sm:text-base relative group inline-block"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#5044E5] transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="lg:col-span-3 space-y-5">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 uppercase tracking-wide relative">
              Follow Us
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#5044E5] mt-2"></div>
            </h2>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {[
                {
                  Icon: FaFacebookF,
                  color: "hover:bg-blue-600",
                  name: "Facebook",
                },
                { Icon: FaTwitter, color: "hover:bg-sky-500", name: "Twitter" },
                {
                  Icon: FaInstagram,
                  color: "hover:bg-pink-600",
                  name: "Instagram",
                },
                {
                  Icon: FaLinkedinIn,
                  color: "hover:bg-blue-700",
                  name: "LinkedIn",
                },
              ].map(({ Icon, color, name }, index) => (
                <a
                  key={index}
                  href="#"
                  aria-label={`Follow us on ${name}`}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg ${color} group`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-2 pt-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Email:</span> hello@writelify.com
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Phone:</span> +1 (555) 123-4567
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-6 sm:pt-8 mt-8 sm:mt-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
              © {new Date().getFullYear()} Writelify. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm">
              <a
                href="#"
                className="text-gray-500 hover:text-[#5044E5] transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-[#5044E5] transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-[#5044E5] transition-colors duration-300"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
