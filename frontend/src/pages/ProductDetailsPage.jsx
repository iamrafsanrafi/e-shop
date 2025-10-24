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
    const [variant, setVariant] = useState(0);

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

    const handleIncreaseOrDecrease = (type) => {
        if (type === "increase") {
            setQuantity(prev => prev + 1);
        } else if (type === "decrease" && quantity - 1 <= 0) {
            return;
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

        if(product.stock === 0) {
            toast.error("Sorry this product is out of stock!");
            return;
        }

        const p = {
            id: product.id,
            title: product.title,
            price: product.price,
            type: product.type,
            images: product.images,
            quantity: quantity,
            variant: variant === 0 ? "Off White" : variant === 1 ? "Space Gray" : "Jet Black",
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
    }, [id])

    useEffect(() => {
        fetchProduct();
    }, [id])

    if (loading || !product) return <div className="mt-20 min-h-screen"><LoadingSpinner message="Loading Product Details..." /></div>

    return (
        <div className="sm:px-5 2xl:px-0">
            <Container>
                <div className="font-['Montserrat'] text-[#303030] text-sm sm:text-base leading-6 flex flex-wrap gap-x-10 gap-y-5 mt-10 sm:mt-16">
                    <Link
                        to="/"
                        className="relative after:content-[''] after:absolute after:w-[1px] after:h-[20px] after:bg-[#4A4A4A] after:top-1/2 after:-translate-y-1/2 after:right-[-19px] hover:text-[#FF624C] font-medium"
                    >
                        Home
                    </Link>

                    <Link
                        to={`/products?q=${product?.category}`}
                        className="relative after:content-[''] after:absolute after:w-[1px] after:h-[20px] after:bg-[#4A4A4A] after:top-1/2 after:-translate-y-1/2 after:right-[-19px] hover:text-[#FF624C] font-medium"
                    >
                        {product?.category}
                    </Link>

                    <span className="relative after:content-[''] after:absolute after:w-[1px] after:h-[20px] after:bg-[#4A4A4A] after:top-1/2 after:-translate-y-1/2 after:right-[-19px] font-medium">{product?.type}</span>

                    <span className="font-bold">{product?.title}</span>
                </div>

                <div className="mt-12 flex flex-col items-center xl:items-start gap-6 xl:flex-row lg:justify-between">
                    <ProductDetailsCarousel images={product.images} />
                    <ProductDetails product={product} variant={variant} setVariant={setVariant} />
                </div>

                {/* Facilities & Product Quantity */}
                <div className="flex items-center justify-center gap-6 xl:gap-0 xl:justify-between mt-5 sm:mt-[51px] sm:justify-center">
                    {/* Facilities */}
                    <div className="hidden sm:block lg:flex lg:gap-6 2xl:gap-24">
                        <div className="hidden sm:flex items-center gap-5">
                            <div>
                                <DeliveryIcon width={44} height={32} />
                            </div>
                            <div>
                                <h4 className="text-[#303030] font-['Montserrat'] font-bold leading-6 text-[15px] xl:text-base">Shipping</h4>
                                <p className="text-[#303030] font-['Montserrat'] leading-6 mt-[2px] text-[15px] xl:text-base">Fast, and reliable worldwide</p>
                            </div>
                        </div>
                        <div className="hidden lg:flex items-center gap-5">
                            <div>
                                <SecurityIcon width={32} height={32} />
                            </div>
                            <div>
                                <h4 className="text-[#303030] font-['Montserrat'] font-bold leading-6 text-[15px] xl:text-base">Secure</h4>
                                <p className="text-[#303030] font-['Montserrat'] leading-6 mt-[2px] text-[15px] xl:text-base">Certified marketplace since 2017</p>
                            </div>
                        </div>
                        <div className="hidden xl:flex items-center gap-5">
                            <div>
                                <ReturnIcon width={32} height={32} />
                            </div>
                            <div>
                                <h4 className="text-[#303030] font-['Montserrat'] font-bold leading-6 text-[15px] xl:text-base">Transparent</h4>
                                <p className="text-[#303030] font-['Montserrat'] leading-6 mt-[2px] text-[15px] xl:text-base">Hassle-free return policy</p>
                            </div>
                        </div>
                    </div>

                    {/* Product Quantity */}
                    <div className="flex items-center gap-[10px] sm:gap-[20px] xl:gap-8 2xl:gap-[70px]">
                        <button onClick={() => handleIncreaseOrDecrease("decrease")} className="w-auto h-auto md:w-14 md:h-14 rounded-full hover:bg-[#F4F4F4] flex items-center justify-center cursor-pointer"><PiMinus className="text-2xl sm:text-[38px]" /></button>

                        <input disabled type="text" value={quantity} className="text-[#303030] text-2xl sm:text-4xl text-center font-['Poppins'] font-semibold leading-[46px] outline-none w-[45px]" />

                        <button onClick={() => handleIncreaseOrDecrease("increase")} className="w-auto h-auto md:w-14 md:h-14 rounded-full hover:bg-[#F4F4F4] flex items-center justify-center cursor-pointer"><LuPlus className="text-2xl sm:text-[36px]" /></button>
                    </div>

                    <div onClick={handleAddToCart} className="w-[50px] h-[50px] sm:w-[62px] sm:h-[62px] flex items-center justify-center border border-[#FF624C] rounded-[10px] cursor-pointer"><AiOutlineShoppingCart className="text-3xl text-[#FF624C]" /></div>
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