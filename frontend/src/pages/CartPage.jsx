import { Link, Navigate } from "react-router";
import Container from "../components/commonLayouts/Container";
import CartProduct from "../components/CartProduct";
import Button from "../components/Button";
import Facilities from "../components/Facilities";
import { useDispatch, useSelector } from "react-redux";
import { updateUserCart } from "../firebase/firestoreService.js"
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { clearCategory } from "../slices/productsSlice.js";

const CartPage = () => {
    // State
    const [loading, setLoading] = useState(false);

    // Redux states
    const { user } = useSelector(state => state.auth);
    const cartProducts = useSelector(state => state.cart.items);
    const { totalPrice } = useSelector(state => state.cart);
    const { category } = useSelector(state => state.products);

    // Extra hook
    const dispatch = useDispatch();

    // Used for clearing the category from redux
    useEffect(() => {
        if (category) {
            dispatch(clearCategory());
        }
    }, []);

    // Used for scrolling back to top
    useEffect(() => {
        if (window.scrollY > 0) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, []);


    // If no user found then navigating user to login page
    if (!user) {
        return <Navigate to="/login" />
    }

    const handleUpdateCart = async () => {
        setLoading(true);
        
        try {
            await updateUserCart(user.uid, cartProducts || []);
            toast.success("Cart updated successfully!");
        } catch (err) {
            toast.error("Failed to update cart. Check console.");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="sm:px-5 2xl:px-0">
            <Container >
                <div className="font-['Montserrat'] text-[#303030] text-base leading-6 flex gap-10 mt-5 sm:mt-8 md:mt-12 lg:mt-16">
                    <Link to="/" className="relative after:content-[''] after:absolute after:w-[1px] after:h-[20px] after:bg-[#4A4A4A] after:top-1/2 after:-translate-y-1/2 after:right-[-19px]">Home</Link>
                    <span className="font-bold">Cart</span>
                </div>

                <div className="flex items-center justify-between mt-12">
                    <h2 className="text-[#303030] font-['Poppins'] text-2xl sm:text-4xl lg:text-[56px] font-bold leading-[68px] ">Your Cart</h2>

                    <Link to="/checkout">
                        <Button paddingX="12px" paddingY="8px" value={"Proceed to checkout"} />
                    </Link>
                </div>

                {/* Cart products table */}
                <table className="w-full border-separate border-spacing-y-4">
                    <tbody>
                        {cartProducts.map(product => (
                            <CartProduct
                                key={product.id}
                                id={product.id}
                                type={product.type}
                                title={product.title}
                                images={product.images}
                                variant={"Black"}
                                price={product.price}
                            />
                        ))}
                    </tbody>
                </table>

                <div className="text-right mt-8 mb-8 md:mb-0">
                    <div className="lg:hidden flex items-center justify-between">
                        <p className="font-['Montserrat'] font-bold text-lg">Total Price: ${totalPrice}</p>
                        <Button handleUpdateCart={handleUpdateCart} value={loading ? <LoadingSpinner /> : "Update Cart"} paddingX="20px" paddingY="10px" minWidth="143px" />
                    </div>
                    <div className="hidden lg:block">
                        <Button handleUpdateCart={handleUpdateCart} value={loading ? <LoadingSpinner /> : "Update Cart"} paddingX="40px" paddingY="16px" width="207px" />
                    </div>
                </div>

                <div className="border-t mt-[100px] border-[#CBCBCB] hidden md:block">
                    <Facilities />
                </div>
            </Container>
        </div>
    );
};

export default CartPage;