import { useEffect, useState } from "react";
import Container from "../components/commonLayouts/Container";
import OrderSummary from "../components/OrderSummary";
import BillingForm from "../components/BillingForm";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

const CheckoutPage = () => {
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (window.scrollY > 0) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [])

    if (!user) {
        navigate("/login");
    }

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        number: "",
        email: "",
        address: "",
        zip: "",
        orderNotes: "",
    });
    const [errors, setErrors] = useState({});
    const [selectedCountry, setSelectedCountry] = useState("");
    const [loading, setLoading] = useState(false);

    const { items } = useSelector(state => state.cart);

    const makePayment = async () => {
        const stripe = await loadStripe("pk_test_51S4Wzw57xZn3rkmAKVptCRpzXc8LpH5GaVsXeFjf2mQxPeyx77tEkrEc84Ga12TccVcnK46SwraBUYhLivvEFzJj00fidiMe39");

        const body = {
            products: items
        };

        const headers = {
            "Content-Type": "application/json"
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/create-checkout-session`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            });

            const session = await response.json();

            const result = await stripe.redirectToCheckout({
                sessionId: session.id
            });
        }
        catch (e) {
            console.log(e);
            toast.error("Payment failed! Please try again.");
            setLoading(false);
        }        
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Setting the loading state to true
        setLoading(true);

        let newErrors = {};

        if (!formData.firstname.trim()) newErrors.firstname = "First name is required";
        if (!formData.lastname.trim()) newErrors.lastname = "Last name is required";

        if (!formData.number.trim()) {
            newErrors.number = "Phone number is required";
        } else if (!/^\+?\d{7,15}$/.test(formData.number)) {
            newErrors.number = "Enter a valid phone number";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email";
        }

        if (!formData.address.trim()) newErrors.address = "Address is required";

        if (!selectedCountry) newErrors.country = "Country is required";

        if (formData.zip && !/^\d{4,10}$/.test(formData.zip)) {
            newErrors.zip = "Zip code must be numeric (4–10 digits)";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            makePayment();
        }
        else {
            // Stopping the loading state if found any errors
            setLoading(false);
        }
    };

    return (
        <div className="sm:px-5 2xl:px-0">
            <Container>
                <div>
                    <div className="font-['Montserrat'] text-[#303030] text-base leading-6 flex gap-10 mt-16">
                        <Link to="/" className="relative after:content-[''] after:absolute after:w-[1px] after:h-[20px] after:bg-[#4A4A4A] after:top-1/2 after:-translate-y-1/2 after:right-[-19px] hover:text-[#FF624C] font-medium">Home</Link>
                        <Link to="/cart" className="relative after:content-[''] after:absolute after:w-[1px] after:h-[20px] after:bg-[#4A4A4A] after:top-1/2 after:-translate-y-1/2 after:right-[-19px] hover:text-[#FF624C] font-medium">Cart</Link>
                        <span className="font-bold">Checkout</span>
                    </div>

                    <div className="mt-12">
                        <h1 className="text-center text-[#303030] font-['Poppins'] text-3xl sm:text-[56px] font-bold leading-[68px]">Checkout</h1>
                    </div>

                    <div className="flex flex-col gap-y-10 2xl:gap-y-0 2xl:flex-row items-start sm:items-center 2xl:items-start 2xl:justify-between my-20">
                        {/* Billing Details */}
                        <BillingForm formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} handleSubmit={handleSubmit} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />

                        {/* Order Summary */}
                        <OrderSummary handleSubmit={handleSubmit} loading={loading} />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default CheckoutPage;