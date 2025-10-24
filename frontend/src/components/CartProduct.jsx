import { useDispatch } from "react-redux";
import ShareIcon from "../icons/ShareIcon";
import TrashIcon from "../icons/TrashIcon";
import CartQuantity from "./CartQuantity";
import { removeFromCart } from "../slices/cartSlice";
import { toast } from "react-toastify";
import { useMediaQuery } from 'react-responsive'

const CartProduct = ({ id, index, type, title, images, variant, price, quantity }) => {
    const dispatch = useDispatch();
    const isMobileDevice = useMediaQuery({maxWidth: 639});
    const isSmallMobile = useMediaQuery({maxWidth: 365});

    console.log(isMobileDevice);

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(index));
    };

    const handleShare = (id) => {
        const url = `https://eshop-global.vercel.app/product-details/${id}`;

        navigator.clipboard.writeText(url)
            .then(() => toast.success("Link copied!"))
            .catch((e) => {
                toast.error("Error copying the link!");
                console.log("ERROR from the cart product: ", e.message);
            })
    }

    const fullPrice = (parseInt(quantity) * parseFloat(price)).toFixed(2);

    return (
        <tr>
            <td colSpan={5} className="relative">
                <div className="rounded-[10px] border border-[#CBCBCB] transition p-4 lg:px-[36px] lg:py-[24px] flex items-center md:justify-between gap-6 w-full">

                    {/* ----Product---- */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-6 w-1/2">
                        <img
                            src={images[0]}
                            alt={title}
                            className="w-[120px] h-[120px] lg:w-[230px] lg:h-[230px] object-cover rounded"
                        />
                        <div>
                            <p className="text-[#303030] font-['Montserrat'] text-xs sm:text-sm leading-5 uppercase tracking-[4px]">
                                {type}
                            </p>

                            <h4 className="text-[#303030] font-['Poppins'] text-[15px] sm:text-lg lg:text-xl font-semibold leading-[28px] lg:leading-[30px] max-w-[314px] mt-2 lg:mt-4 hover:text-[#FF624C] hover:underline hover:decoration-2">
                                {title}
                            </h4>

                            <p className="text-[#303030] font-['Montserrat'] mt-2 lg:mt-[46px] text-sm lg:text-base">
                                <span className="font-bold mr-2">Variant:</span>
                                <span className="font-medium">{variant}</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-6 sm:flex-row items-center justify-between w-1/2">
                        {/* Price */}
                        <div className={`text-[#303030] font-['Poppins'] text-lg lg:text-xl font-semibold leading-[30px] mr-1 ${isSmallMobile && "text-[15px]"}`}>
                            <span className="font-bold">Price: </span>${fullPrice}
                        </div>

                        {/* ----Quantity---- */}
                        <div className="sm:mr-3 md:mr-0">
                            <CartQuantity id={id} quantity={quantity} variant={variant} />
                        </div>

                        {/* ----Actions – Desktop---- */}
                        <div className="flex sm:flex-col gap-4 items-center">
                            <button
                                aria-label="Remove from cart"
                                onClick={handleRemoveFromCart}
                                className="hover:bg-[#FF624C] text-[#FF624C] hover:text-white border border-[#FF624C] transition w-10 h-10 lg:w-16 lg:h-16 rounded-full flex items-center justify-center cursor-pointer"
                            >
                                {
                                    isMobileDevice ? <TrashIcon width={22} height={22} /> : <TrashIcon />
                                }
                            </button>
                            <button
                                aria-label="Share product"
                                className="hover:bg-[#FF624C] text-[#FF624C] hover:text-white border border-[#FF624C] transition w-10 h-10 lg:w-16 lg:h-16 rounded-full flex items-center justify-center cursor-pointer"
                                onClick={() => handleShare(id)}
                            >
                                {
                                    isMobileDevice ? <ShareIcon width={20} height={20} /> : <ShareIcon />
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    );
};

export default CartProduct;
