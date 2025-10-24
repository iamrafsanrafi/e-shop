import { toast } from "react-toastify";
import Button from "./Button";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

const ContactForm = () => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    // State
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const phone = form.number.value.trim();
        const message = form.message.value.trim();


        if (!name || !email || !message) {
            setLoading(false);
            return toast.error("Please provide all informations.");
        }

        if (!emailRegex.test(email)) {
            setLoading(false);
            return toast.error("Invalid email!");
        }

        setTimeout(() => {
            toast.success("Email sent successfully!");
            form.reset();
            setLoading(false);
        }, 250);
    }

    return (
        <div>
            <h2 className="text-[#303030] font-['Poppins'] text-[22px] sm:text-4xl font-semibold leading-[46px]">Contact Us</h2>
            <p className="text-[#303030] font-['Montserrat'] sm:text-xl leading-[30px] mt-3">Have any questions? Don't hesitate to contact us!</p>

            <form onSubmit={handleSubmit} className="xl:w-[800px] lg:w-[600px] w-full flex flex-col xl:flex-row xl:flex-wrap justify-between gap-y-4 sm:gap-y-8 mt-10 mb-8">
                {/* Name */}
                <div className="flex flex-col gap-3">
                    <label className=" sm:text-xl text-[#303030] font-['Montserrat'] font-bold leading-[30px]" htmlFor="name">Name <span className="text-[#FF624C]">*</span></label>

                    <input className="py-4 md:py-[20px] px-6 sm:px-[28px] outline-none border border-[#CBCBCB] rounded-[10px] w-[100%] sm:w-[100%] lg:w-[570px] xl:w-[800px] text-[#303030] placeholder:text-[#303030] placeholder:opacity-75 font-['Montserrat'] md:text-xl leading-[30px]" type="text" id="name" placeholder="Rafsan Rafi" />
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-3">
                    <label className="sm:text-xl text-[#303030] font-['Montserrat'] font-bold leading-[30px]" htmlFor="number">Phone Number</label>

                    <input className="py-4 md:py-[20px] px-6 sm:px-[28px] outline-none border border-[#CBCBCB] rounded-[10px] w-[100%] sm:w-[100%] lg:w-[570px] xl:w-[345px] text-[#303030] placeholder:text-[#303030] placeholder:opacity-75 font-['Montserrat'] md:text-xl leading-[30px]" type="text" id="number" placeholder="+X (XXX) XXX-XXXX" />
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-3">
                    <label className="sm:text-xl text-[#303030] font-['Montserrat'] font-bold leading-[30px]" htmlFor="email">Email Address <span className="text-[#FF624C]">*</span></label>

                    <input className="py-4 md:py-[20px] px-6 sm:px-[28px] outline-none border border-[#CBCBCB] rounded-[10px] w-[100%] sm:w-[100%] lg:w-[570px] xl:w-[440px] text-[#303030] placeholder:text-[#303030] placeholder:opacity-75 font-['Montserrat'] md:text-xl leading-[30px]" type="email" id="email" placeholder="email@example.com" />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-3">
                    <label className="sm:text-xl text-[#303030] font-['Montserrat'] font-bold leading-[30px]" htmlFor="message">Message <span className="text-[#FF624C]">*</span></label>

                    <textarea className="py-4 md:py-[20px] px-6 sm:px-[28px] outline-none border border-[#CBCBCB] rounded-[10px] w-[100%] sm:w-[100%] lg:w-[570px] xl:w-[800px] h-[241px] resize-none text-[#303030] placeholder:text-[#303030] placeholder:opacity-75 font-['Montserrat'] md:text-xl leading-[30px]" id="message" placeholder="Type your message here..." rows="4"></textarea>
                </div>

                <div className="sm:hidden">
                    <Button value={loading ? <LoadingSpinner /> : "Subscribe"} paddingX="20px" paddingY="10px" width="123px" />
                </div>
                <div className="hidden sm:block">
                    <Button value={loading ? <LoadingSpinner /> : "Subscribe"} paddingX="40px" paddingY="16px" width="184px" />
                </div>
            </form>
        </div>
    );
};

export default ContactForm;