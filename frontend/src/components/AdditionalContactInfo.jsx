import { BsFillTelephoneFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { Link } from "react-router";

const AdditionalContactInfo = () => {
    return (
        <div className="w-full max-w-[400px] sm:max-w-[480px] md:max-w-[500px] 2xl:max-w-[594px] rounded-[25px] bg-[#F4F4F4] p-5 xl:p-10">
            <h4 className="text-xl md:text-2xl text-[#303030] font-['Poppins'] font-semibold leading-[30px]">Let's Keep in Touch!</h4>
            <p className="text-base sm:text-lg xl:text-xl text-[#303030] font-['Montserrat'] leading-[30px] max-w-[467px] mt-4 opacity-75">We would love to hear from you. Contact us for
                any inquiries you might have.</p>

            {/* Contact Informations */}
            <div className="mt-4 mb-6 sm:mt-6 sm:mb-8 md:mt-10 md:mb-[56px]">
                <ul className="flex flex-col gap-3">
                    <li className="relative">
                        <BsFillTelephoneFill className="text-[#303030] opacity-75 text-sm md:text-base" />
                        <Link
                            className="absolute top-1/2 -translate-y-1/2 left-7 md:left-[38px] text-[#303030] text-[13px] md:text-base font-['Montserrat'] font-bold leading-6"
                            to="tel:+X (XXX) XXX-XXXX"
                        >
                            +X (XXX) XXX-XXXX
                        </Link>
                    </li>
                    <li className="relative">
                        <IoIosMail className="text-[#303030] opacity-75 text-sm md:text-base" />
                        <Link
                            className="absolute top-1/2 -translate-y-1/2 left-7 md:left-[38px] text-[#303030] text-[13px] md:text-base font-['Montserrat'] leading-6 font-bold"
                            to="mailto:email@example.com"
                        >
                            email@example.com
                        </Link>
                    </li>
                    <li className="relative">
                        <FaLocationDot className="text-[#303030] opacity-75 text-sm md:text-base" />
                        <Link
                            className="absolute top-1/2 -translate-y-1/2 left-7 md:left-[38px] text-[#303030] text-[13px] md:text-base font-['Montserrat'] font-bold leading-6"
                            to="https://maps.app.goo.gl/SmDB2MKYe5zoWwQz8"
                            target="_blank"
                        >
                            123 Main Street, Anytown USA
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Opening Hours */}
            <div className="flex flex-col items-start">
                <h4 className="text-[#303030] font-['Montserrat'] font-bold text-lg sm:text-xl leading-[30px] relative after:absolute after:-bottom-1 after:left-0 after:content-[''] after:w-full after:h-1 after:bg-[#FF624C]">Opening Hours</h4>

                <p className="text-[#303030] font-['Montserrat'] opacity-75 text-base sm:text-lg xl:text-xl mt-4 leading-[30px]">Available 24/7. Our team strives to respond to all inquiries within 8 hours.</p>
            </div>
        </div>
    );
};

export default AdditionalContactInfo;