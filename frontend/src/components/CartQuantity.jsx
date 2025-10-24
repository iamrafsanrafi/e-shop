import { LuPlus } from "react-icons/lu";
import { PiMinus } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { updateQuantity } from "../slices/cartSlice";

const CartQuantity = ({ id, quantity, variant }) => {
    const dispatch = useDispatch();

    const handleUpdate = (action) => {
        if (action === "increment") {
            dispatch(updateQuantity({ id, quantity: quantity + 1, variant }));
        }
        else if (action === "decrement") {
            dispatch(updateQuantity({ id, quantity: quantity - 1, variant }));
        }
    }

    return (
        <div className="flex items-center gap-4">
            <button className="cursor-pointer" onClick={() => handleUpdate("decrement")}>
                <PiMinus className="text-lg lg:text-xl xl:text-2xl" />
            </button>

            <input className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 rounded-full bg-[#f4f4f4] text-center text-base sm:text-[17px] md:text-lg lg:text-xl xl:text-[22px] text-[#303030] font-['Montserrat'] font-bold leading-6" disabled type="text" value={quantity} />

            <button className="cursor-pointer" onClick={() => handleUpdate("increment")}>
                <LuPlus className="text-lg lg:text-xl xl:text-2xl" />
            </button>
        </div>
    );
};

export default CartQuantity;