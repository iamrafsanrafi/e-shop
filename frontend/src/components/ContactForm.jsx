import { toast } from "react-toastify";
import Button from "./Button";

const ContactForm = () => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const phone = form.number.value.trim();
        const message = form.message.value.trim();

        
        if(!name || !email || !message) {
            toast.error("Please provide all informations.");
            return;
        }

        if(!emailRegex.test(email)) {
            toast.error("Invalid email!");
            return;
        }

        toast.success("Email sent successfully!");
        
        form.reset();
    }


    return (
        <div>
            <h2 className="text-[#303030] font-['Poppins'] text-[22px] sm:text-4xl font-semibold leading-[46px]">Contact Us</h2>
            <p className="text-[#303030] font-['Montserrat'] sm:text-xl leading-[30px] mt-3">Have any questions for us? Don’t hesitate to contact us.</p>

            <form onSubmit={handleSubmit} className="md:w-[870px] flex flex-col xl:flex-row xl:flex-wrap justify-between gap-y-4 sm:gap-y-8 mt-10 mb-8">
                {/* Name */}
                <div className="flex flex-col gap-3">
                    <label className=" sm:text-xl text-[#303030] font-['Montserrat'] font-bold leading-[30px]" htmlFor="name"> Name <span className="text-[#FF624C]">*</span></label>
                    <input className="py-4 md:py-[25px] px-6 sm:px-[32px] outline-none border border-[#CBCBCB] rounded-[10px] w-[360px] sm:w-[80%] xl:w-[870px] text-[#303030] placeholder:text-[#303030] placeholder:opacity-75 font-['Montserrat'] md:text-xl leading-[30px]" type="text" id="name" placeholder="Amelia Robert Watson" />
                </div>
                {/* Phone Number */}
                <div className="flex flex-col gap-3">
                    <label className="sm:text-xl text-[#303030] font-['Montserrat'] font-bold leading-[30px]" htmlFor="number">Phone Number</label>
                    <input className="py-4 md:py-[25px] px-6 sm:px-[32px] outline-none border border-[#CBCBCB] rounded-[10px] w-[360px] sm:w-[80%] xl:w-[345px] text-[#303030] placeholder:text-[#303030] placeholder:opacity-75 font-['Montserrat'] md:text-xl leading-[30px]" type="text" id="number" placeholder="+XX (XXX) XXX-XXXX" />
                </div>
                {/* Email Address */}
                <div className="flex flex-col gap-3">
                    <label className="sm:text-xl text-[#303030] font-['Montserrat'] font-bold leading-[30px]" htmlFor="email">Email Address <span className="text-[#FF624C]">*</span></label>
                    <input className="py-4 md:py-[25px] px-6 sm:px-[32px] outline-none border border-[#CBCBCB] rounded-[10px] w-[360px] sm:w-[80%] xl:w-[510px] text-[#303030] placeholder:text-[#303030] placeholder:opacity-75 font-['Montserrat'] md:text-xl leading-[30px]" type="email" id="email" placeholder="email@example.com" />
                </div>
                {/* Message */}
                <div className="flex flex-col gap-3">
                    <label className="sm:text-xl text-[#303030] font-['Montserrat'] font-bold leading-[30px]" htmlFor="message">Message <span className="text-[#FF624C]">*</span></label>
                    <textarea className="py-4 md:py-[25px] px-6 sm:px-[32px] outline-none border border-[#CBCBCB] rounded-[10px] w-[360px] sm:w-[80%] xl:w-[870px] h-[241px] resize-none text-[#303030] placeholder:text-[#303030] placeholder:opacity-75 font-['Montserrat'] md:text-xl leading-[30px]" id="message" placeholder="Your message here..." rows="4"></textarea>
                </div>

                <div className="sm:hidden">
                    <Button value="Submit" paddingX="20px" paddingY="10px" />
                </div>
                <div className="hidden sm:block">
                    <Button value="Submit" paddingX="40px" paddingY="16px" />
                </div>
            </form>
        </div>
    );
};

export default ContactForm;