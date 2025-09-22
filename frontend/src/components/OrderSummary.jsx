import { useSelector } from "react-redux";
import InfoIcon from "../icons/InfoIcon";
import Button from "./Button";
import LoadingSpinner from "./LoadingSpinner";

const OrderSummary = ({ handleSubmit, loading }) => {
    const { items, totalPrice } = useSelector(state => state.cart);

    return (
        <div className="bg-[#F4F4F4] rounded-[25px] w-full md:w-[594px] pt-10 px-5 md:px-10 pb-14">
            <h4 className="text-2xl text-[#303030] font-['Poppins'] font-semibold leading-[30px]">Order Summary</h4>

            {/* Ordered Products */}
            <div className="flex flex-col gap-5 mt-12">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="text-left px-2 py-2 text-sm sm:text-xl text-gray-700 font-semibold">Product</th>
                            <th className="text-center px-2 py-2 text-sm sm:text-xl text-gray-700 font-semibold">Qty</th>
                            <th className="text-right px-2 py-2 text-sm sm:text-xl text-gray-700 font-semibold">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr
                                key={item.id}
                                className="even:bg-white odd:bg-gray-50 hover:bg-gray-200 transition-colors"
                            >
                                <td className="px-2 py-3 text-sm sm:text-lg text-gray-900 font-medium">{item.title}</td>
                                <td className="px-2 py-3 text-center text-sm sm:text-lg text-gray-900 font-semibold">{item.quantity}</td>
                                <td className="px-2 py-3 text-right text-sm sm:text-lg text-gray-900 font-semibold">${item.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Shipping Fee */}
            <div className="flex justify-between md:justify-between mt-5">
                <p className="relative sm:text-xl text-[#303030] font-['Montserrat'] leading-[30px]">Shipping Fee <span className="absolute top-0 right-[-24px]"><InfoIcon width={16} height={16} /></span></p>
                <p className="sm:text-xl text-[#303030] font-['Poppins'] leading-[30px] font-bold">$10.00</p>
            </div>

            {/* Total Price */}
            <div className="md:w-[514px] h-[180px] rounded-[10px] bg-white mt-12 px-[21px] pt-[27px] pb-6">
                <p className="flex justify-between px-[3px] mb-6">
                    <span className="sm:text-xl text-[#303030] font-['Poppins'] leading-6 font-bold">Total</span>
                    <span className="sm:text-xl text-[#303030] font-['Poppins'] leading-[30px] font-bold">${(parseFloat(totalPrice) + 10).toFixed(2)}</span>
                </p>

                <div className="md:hidden text-center">
                    <Button value={loading ? <LoadingSpinner /> : "Order Now"} paddingY="20px" paddingX="70px" width="100%" maxWidth="100%" handleSubmit={handleSubmit} />
                </div>
                <div className="hidden md:block">
                    <Button
                        value={loading ? <LoadingSpinner /> : "Order Now"}
                        width="100%" maxWidth="100%" paddingY="16px" handleSubmit={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;