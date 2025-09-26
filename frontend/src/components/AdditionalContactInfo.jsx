import { BsFillTelephoneFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { Link } from "react-router";

const AdditionalContactInfo = () => {
    return (
        <div className="sm:w-[594px] sm:h-[496px] rounded-[25px] bg-[#F4F4F4] p-5 xl:p-10">
            <h4 className="text-xl sm:text-2xl text-[#303030] font-['Poppins'] font-semibold leading-[30px]">Let’s Keep in Touch!</h4>
            <p className="sm:text-xl text-[#303030] font-['Montserrat'] leading-[30px] max-w-[467px] mt-4 opacity-75">We would love to hear from you. Contact us for
                any inquiries you might have for us.</p>


            {/* Contact Informations */}
            <div className="mt-10 mb-[56px]">
                <ul className="flex flex-col gap-3">
                    <li className="relative">
                        <BsFillTelephoneFill className="text-[#303030] opacity-75" />
                        <Link
                            className="absolute top-1/2 -translate-y-1/2 left-[38px] text-[#303030] font-['Montserrat'] font-bold leading-6"
                            to="tel:+X (XXX) XXX-XXXX"
                        >
                            +X (XXX) XXX-XXXX
                        </Link>
                    </li>
                    <li className="relative">
                        <IoIosMail className="text-[#303030] opacity-75" />
                        <Link
                            className="absolute top-1/2 -translate-y-1/2 left-[38px] text-[#303030] font-['Montserrat'] leading-6 font-bold"
                            to="mailto:email@example.com"
                        >
                            email@example.com
                        </Link>
                    </li>
                    <li className="relative">
                        <FaLocationDot className="text-[#303030] opacity-75" />
                        <Link
                            className="absolute top-1/2 -translate-y-1/2 left-[38px] text-[#303030] font-['Montserrat'] font-bold leading-6"
                            to="https://maps.app.goo.gl/DipLafPdoiQoKjnv7"
                            target="_blank"
                        >
                            123 Main Street, Anytown USA
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Opening Hours */}
            <div>
                <h4 className="text-[#303030] font-['Montserrat'] font-bold text-xl leading-[30px] border-b-4 border-[#FF624C] w-[159px] pb-1">Opening Hours</h4>

                <ul className="mt-6">
                    <li className="flex gap-3">
                        <span className="text-[#303030] font-['Montserrat'] font-bold leading-6">MON to FRI:</span>
                        <span className="text-[#303030] font-['Montserrat'] leading-6">08:00 AM - 04:00 PM</span>
                    </li>
                    <li className="flex gap-3 mt-2">
                        <span className="text-[#303030] font-['Montserrat'] font-bold leading-6">SAT to SUN:</span>
                        <span className="text-[#303030] font-['Montserrat'] leading-6">09:00 AM - 03:00 PM</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AdditionalContactInfo;