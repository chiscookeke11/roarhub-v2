import { Mail, Phone, } from "lucide-react";
import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";


export default function Footer() {
    return (
        <footer className="bg-[#1f2933] text-gray-300 py-12 px-6 font-plus-jakarta ">
            <div className="max-w-7xl mx-auto text-center">

                {/* Logo / Title */}
                <h2 className="text-2xl font-bold">
                    <span className="text-[#0e6efd]">ROAR</span>{" "}
                    <span className="text-white">HUB</span>
                </h2>

                <p className="text-sm mt-2 text-gray-400">
                    Innovation Redefined
                </p>

                {/* Contact Info */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-6 text-sm">

                    <div className="flex items-center gap-2">
                        <Mail size={16} className="text-[#0e6efd]" />
                        <span>roarhubnigeria@gmail.com</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Phone size={16} className="text-[#0e6efd]" />
                        <span>08033164062</span>
                    </div>
                </div>

                {/* Social Icons */}
                <div className="flex items-center justify-center gap-5 mt-6">
                    <a href="#"><FaTwitter className="w-5 h-5 cursor-pointer hover:text-white transition" /></a>
                    <a href="#"> <FaLinkedin className="w-5 h-5 cursor-pointer hover:text-white transition" /></a>
                    <a href="https://www.instagram.com/roarnigeriahub/" ><FaInstagram className="w-5 h-5 cursor-pointer hover:text-white transition" /></a>

                </div>

                {/* Divider */}
                <div className="border-t border-gray-600 mt-10 pt-6 text-xs text-gray-400">
                    © 2026 ROAR HUB NIGERIA. Designed for the future.
                </div>
            </div>
        </footer>
    );
}