import { useDispatch } from "react-redux";
import ShareIcon from "../icons/ShareIcon";
import TrashIcon from "../icons/TrashIcon";
import CartQuantity from "./CartQuantity";
import { removeFromCart } from "../slices/cartSlice";
import { toast } from "react-toastify";

const CartProduct = ({ id, type, title, images, variant, price, totalPrice }) => {
    const dispatch = useDispatch();

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(id));
    };

    const handleShare = (id) => {
        const url = `https://eshop-ecommerce-project.vercel.app/product-details/${id}`;

        navigator.clipboard.writeText(url)
        .then(() => toast.success("Link copied!"))
        .catch((e) => toast.error("Error copying the link!"))
    }

    return (
        <tr>
            <td colSpan={5} className="relative">
                <div className="rounded-[10px] border border-[#CBCBCB] lg:border-transparent lg:hover:border-[#CBCBCB] transition px-[36px] py-[24px] flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                    {/* Product */}
                    <div className="flex items-center gap-6">
                        <img
                            src={images[0]}
                            alt={title}
                            className="w-[120px] h-[100px] lg:w-[237px] lg:h-[214px] object-cover rounded"
                        />
                        <div>
                            <p className="text-[#303030] font-['Montserrat'] text-sm leading-5 uppercase tracking-[4px]">
                                {type}
                            </p>
                            <h4 className="text-[#303030] font-['Poppins'] text-lg lg:text-xl font-semibold leading-[28px] lg:leading-[30px] max-w-[314px] mt-2 lg:mt-4 hover:text-[#FF624C] hover:underline hover:decoration-2">
                                {title}
                            </h4>
                            <p className="text-[#303030] font-['Montserrat'] mt-2 lg:mt-[46px] text-sm lg:text-base">
                                <span className="font-bold mr-2">Variant:</span>
                                <span>{variant}</span>
                            </p>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="text-[#303030] font-['Poppins'] text-lg lg:text-xl font-semibold leading-[30px]">
                        <span className="md:hidden font-bold">Price: </span>${price}
                    </div>

                    {/* Quantity */}
                    <div>
                        <CartQuantity id={id} />
                    </div>

                    {/* Total */}
                    <div className="text-[#303030] font-['Poppins'] text-lg lg:text-xl font-semibold leading-[30px]">
                        <span className="md:hidden font-bold">Total: </span>${totalPrice}
                    </div>

                    {/* Actions – desktop */}
                    <div className="hidden lg:flex flex-col gap-4 items-center">
                        <button
                            aria-label="Remove from cart"
                            onClick={handleRemoveFromCart}
                            className="hover:bg-[#FF624C] text-[#FF624C] hover:text-white border border-[#FF624C] transition w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center cursor-pointer"
                        >
                            <TrashIcon />
                        </button>
                        <button
                            aria-label="Share product"
                            className="hover:bg-[#FF624C] text-[#FF624C] hover:text-white border border-[#FF624C] transition w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center cursor-pointer"
                            onClick={() => handleShare(id)}
                        >
                            <ShareIcon />
                        </button>
                    </div>

                    {/* Actions – mobile & tablet absolute */}
                    <div className="lg:hidden absolute top-1/2 sm:top-4 -translate-y-1/2 sm:translate-y-0 right-4 flex flex-col sm:flex-row gap-3">
                        <button
                            aria-label="Remove from cart"
                            onClick={handleRemoveFromCart}
                            className="active:bg-[#FF624C] text-[#FF624C] active:text-white border border-[#FF624C] transition w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
                        >
                            <TrashIcon width={22} height={22} />
                        </button>
                        <button
                            aria-label="Share product"
                            className="active:bg-[#FF624C] text-[#FF624C] active:text-white border border-[#FF624C] transition w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
                            onClick={() => handleShare(id)}
                        >
                            <ShareIcon width={20} height={20} />
                        </button>
                    </div>
                </div>
            </td>
        </tr>
    );
};

export default CartProduct;
