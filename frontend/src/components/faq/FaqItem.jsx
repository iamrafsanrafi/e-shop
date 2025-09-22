import { LiaAngleRightSolid } from "react-icons/lia";

const FaqItem = ({ title, description, isOpen, handleOpenFaq, id }) => {
    return (
        <div className="bg-white rounded-[25px] py-5 pl-[40px] lg:py-[34px] sm:pl-[90px] lg:pl-[112px] sm:pr-[30px] lg:pr-[56px] lg:w-[925px] sm:max-w-[925px] ">
            <div onClick={() => handleOpenFaq(id)} className="cursor-pointer relative">
                <button className={`absolute top-1/2 -translate-y-1/2 left-[-30px] sm:left-[-64px] w-5 h-5 sm:w-8 sm:h-8 rounded-full flex items-center justify-center cursor-pointer ${isOpen ? "bg-white border border-[#FF624C] rotate-90" : "bg-[#FF624C]"} transition duration-300`}>
                    <LiaAngleRightSolid className={`${isOpen ? "text-[#FF624C]" : "text-white"} text-xs sm:text-base`} />
                </button>
                <p className="text-[#303030] font-['Poppins'] text-sm sm:text-xl md:text-2xl font-semibold leading-[30px]">{title}</p>
            </div>
            {
                isOpen && (
                    <div className="pr-8 sm:pr-0 text-justify sm:max-w-[758px] text-[#303030] font-['Montserrat'] text-[12px] sm:text-base md:text-xl leading-[30px] opacity-75 sm:mt-4">
                        {description}
                    </div>
                )
            }
        </div>
    );
};

export default FaqItem;