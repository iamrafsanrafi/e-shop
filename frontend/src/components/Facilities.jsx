import Container from "./commonLayouts/Container";
import HeadPhoneIcon from "../icons/HeadPhoneIcon"
import SecurityIcon from "../icons/SecurityIcon"
import DeliveryIcon from "../icons/DeliveryIcon";
import ReturnIcon from "../icons/ReturnIcon";

const Facilities = () => {
    return (
        <div className="sm:px-5 2xl:px-0">
            <Container>
                <div className="flex flex-col lg:flex-row relative pl-8 md:pl-0 lg:justify-between my-8 lg:my-20 gap-4 lg:gap-2 lg:px-5">
                    <div className="flex items-center gap-3 sm:gap-6">
                        <div>
                            <HeadPhoneIcon width={32} height={32} />
                        </div>
                        <div>
                            <h4 className="text-[#303030] text-sm sm:text-base font-['Montserrat'] font-bold leading-6">Responsive</h4>
                            <p className="text-[#303030] text-sm xl:text-base font-['Montserrat'] leading-6 mt-[2px]">Customer service available 24/7</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-6">
                        <div>
                            <SecurityIcon width={32} height={32} />
                        </div>
                        <div>
                            <h4 className="text-[#303030] text-sm sm:text-base font-['Montserrat'] font-bold leading-6">Secure</h4>
                            <p className="text-[#303030] text-sm xl:text-base font-['Montserrat'] leading-6 mt-[2px]">Certified marketplace since 2017</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-6">
                        <div>
                            <DeliveryIcon width={44} height={32} />
                        </div>
                        <div>
                            <h4 className="text-[#303030] text-sm sm:text-base font-['Montserrat'] font-bold leading-6">Shipping</h4>
                            <p className="text-[#303030] text-sm xl:text-base font-['Montserrat'] leading-6 mt-[2px]">Free, fast, and reliable worldwide</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-6">
                        <div>
                            <ReturnIcon width={32} height={32} />
                        </div>
                        <div>
                            <h4 className="text-[#303030] text-sm sm:text-base font-['Montserrat'] font-bold leading-6">Transparent</h4>
                            <p className="text-[#303030] text-sm sm:text-base font-['Montserrat'] leading-6 mt-[2px]">Hassle-free return policy</p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Facilities;