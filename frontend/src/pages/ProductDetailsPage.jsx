import Container from "../components/commonLayouts/Container"
import ProductDetails from "../components/ProductDetails";
import ProductDetailsCarousel from "../components/ProductDetailsCarousel";
import SecurityIcon from "../icons/SecurityIcon"
import DeliveryIcon from "../icons/DeliveryIcon";
import ReturnIcon from "../icons/ReturnIcon";
import { PiMinus } from "react-icons/pi";
import { LuPlus } from "react-icons/lu";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import Button from "../components/Button";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProductAdditionalInformations from "../components/ProductAdditionalInformations";
import RelatedProducts from "../components/RelatedProducts";
import { Link, useParams } from "react-router";
import { getProduct } from "../firebase/firestoreService";
import LoadingSpinner from "../components/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import { clearCategory } from "../slices/productsSlice";

const ProductDetailsPage = () => {
    // States
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);

    // Redux state
    const { user } = useSelector(state => state.auth);
    const { category } = useSelector(state => state.products);

    // Extra hooks
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (category) {
            dispatch(clearCategory());
        }
    }, []);


    const handleChangeQuantity = (e) => {
        const value = parseInt(e.target.value);

        if (isNaN(value)) {
            toast.error('Invalid quantity', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        else if (value < 0) {
            toast.error('Quantity cannot be negative', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        else {
            setQuantity(value);
        }
    }

    const handleIncreaseorDecrease = (type) => {
        if (type === "increase") {
            setQuantity(prev => prev + 1);
        } else if (type === "decrease" && quantity - 1 < 0) {
            toast.error('Quantity cannot be negative', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        else {
            setQuantity(prev => prev - 1);
        }
    };


    const handleAddToCart = () => {
        if (!user) {
            toast.error("You need to be logged in to add items to cart.");
            return;
        }

        const p = {
            id: product.id,
            title: product.title,
            price: product.price,
            type: product.type,
            images: product.images,
            quantity: quantity
        };

        dispatch(addToCart(p));
        toast.success("Item added to cart! Please go to your cart and update it.");
    }

    const fetchProduct = async () => {
        setLoading(true);
        const data = await getProduct(parseInt(id));
        setProduct(data)
        setLoading(false);
    }

    useEffect(() => {
        if (window.scrollY > 0) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [])

    useEffect(() => {
        fetchProduct();
    }, [id])

    if (loading || !product) return <LoadingSpinner message="Loading Product Details..." />

    return (
        <div className="sm:px-5 2xl:px-0">
            <Container>
                <div className="font-['Montserrat'] text-[#303030] text-sm sm:text-base leading-6 flex flex-wrap gap-x-10 gap-y-5 mt-10 sm:mt-16">
                    <Link
                        to="/"
                        className="relative after:content-[''] after:absolute after:w-[1px] after:h-[20px] after:bg-[#4A4A4A] after:top-1/2 after:-translate-y-1/2 after:right-[-19px]"
                    >
                        Home
                    </Link>

                    <Link 
                        to={`/products-list?q=${product?.category}`} 
                        className="relative after:content-[''] after:absolute after:w-[1px] after:h-[20px] after:bg-[#4A4A4A] after:top-1/2 after:-translate-y-1/2 after:right-[-19px]"
                    >
                        {product?.category}
                    </Link>

                    <span className="relative after:content-[''] after:absolute after:w-[1px] after:h-[20px] after:bg-[#4A4A4A] after:top-1/2 after:-translate-y-1/2 after:right-[-19px]">{product?.type}</span>
                    
                    <span className="font-bold">{product?.title}</span>
                </div>

                <div className="mt-12 flex flex-col items-center xl:flex-row lg:justify-between">
                    <ProductDetailsCarousel images={product.images} />
                    <ProductDetails product={product} />
                </div>

                {/* Facilities & Product Quantity */}
                <div className="flex items-center justify-evenly lg:justify-between mt-5 sm:mt-[51px]">
                    {/* Facilities */}
                    <div className="lg:flex gap-12 hidden">
                        <div className="flex items-center gap-6">
                            <div>
                                <DeliveryIcon />
                            </div>
                            <div>
                                <h4 className="text-[#303030] font-['Montserrat'] font-bold leading-6">Free Shipping</h4>
                                <p className="text-[#303030] font-['Montserrat'] leading-6 mt-[2px]">Worldwide available</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div>
                                <SecurityIcon />
                            </div>
                            <div>
                                <h4 className="text-[#303030] font-['Montserrat'] font-bold leading-6">100% Guaranteed</h4>
                                <p className="text-[#303030] font-['Montserrat'] leading-6 mt-[2px]">Receive product first</p>
                            </div>
                        </div>
                        <div className="2xl:flex hidden items-center gap-6">
                            <div>
                                <ReturnIcon />
                            </div>
                            <div>
                                <h4 className="text-[#303030] font-['Montserrat'] font-bold leading-6">Return Available</h4>
                                <p className="text-[#303030] font-['Montserrat'] leading-6 mt-[2px]">See return policy</p>
                            </div>
                        </div>
                    </div>

                    {/* Product Quantity */}
                    <div className="flex items-center gap-[4px] sm:gap-[20px] xl:gap-[95px]">
                        <button onClick={() => handleIncreaseorDecrease("decrease")} className="w-14 h-14 rounded-full hover:bg-[#F4F4F4] flex items-center justify-center cursor-pointer"><PiMinus className="text-[24px] sm:text-[38px]" /></button>

                        <input disabled type="text" value={quantity} onChange={handleChangeQuantity} className="text-[#303030] text-2xl sm:text-4xl text-center font-['Poppins'] font-semibold leading-[46px] outline-none w-[45px]" />

                        <button onClick={() => handleIncreaseorDecrease("increase")} className="w-14 h-14 rounded-full hover:bg-[#F4F4F4] flex items-center justify-center cursor-pointer"><LuPlus className="text-[24px] sm:text-[36px]" /></button>
                    </div>

                    <div className="flex gap-2 sm:gap-4">
                        <Link to="/checkout">
                            <div className="sm:hidden">
                                <Button value="Buy Now" paddingX="20px" paddingY="10px" />
                            </div>
                            <div className="hidden sm:block">
                                <Button value="Buy Now" />
                            </div>
                        </Link>

                        <div onClick={handleAddToCart} className="w-[50px] sm:w-[62px] sm:h-[62px] flex items-center justify-center border border-[#FF624C] rounded-[10px] cursor-pointer"><AiOutlineShoppingCart className="text-3xl text-[#FF624C] " /></div>
                    </div>
                </div>

                {/* Product Additional Informations */}
                <ProductAdditionalInformations product={product} specifications={product.specifications} />

                {/* Related Products */}
                <RelatedProducts category={product.category} />
            </Container>
        </div>
    );
};

export default ProductDetailsPage;