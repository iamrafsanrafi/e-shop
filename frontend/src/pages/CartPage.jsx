import { Link, Navigate } from "react-router";
import Container from "../components/commonLayouts/Container";
import CartProduct from "../components/CartProduct";
import Button from "../components/Button";
import Facilities from "../components/Facilities";
import { useSelector } from "react-redux";
import { updateUserCart } from "../firebase/firestoreService.js"
import { toast } from "react-toastify";
import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

const CartPage = () => {
    const { user } = useSelector(state => state.auth);
    const cartProducts = useSelector(state => state.cart.items);
    const { totalPrice } = useSelector(state => state.cart);
    const [loading, setLoading] = useState(false);

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
                    <thead className="hidden md:table-header-group bg-[#F4F4F4] rounded-[15px]">
                        <tr>
                            <th className="text-left px-6 py-4 uppercase text-[#303030] font-['Montserrat'] font-bold leading-6">Product</th>
                            <th className="text-left px-6 py-4 uppercase text-[#303030] font-['Montserrat'] font-bold leading-6">Price</th>
                            <th className="text-left px-6 py-4 uppercase text-[#303030] font-['Montserrat'] font-bold leading-6">Qty</th>
                            <th className="text-left px-6 py-4 uppercase text-[#303030] font-['Montserrat'] font-bold leading-6">Total</th>
                        </tr>
                    </thead>
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
                                totalPrice={product.price}
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