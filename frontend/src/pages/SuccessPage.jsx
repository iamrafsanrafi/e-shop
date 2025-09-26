import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router"
import { clearCart } from "../slices/cartSlice";
import { updateUserCart } from "../firebase/firestoreService";
import { useEffect } from "react";

const SuccessPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const handleUpdateCart = async () => {
    try {
      await updateUserCart(user.uid, []);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [])

  useEffect(() => {
    if(!user.uid) return;

    dispatch(clearCart());
    handleUpdateCart();
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-[#FF624C]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-[#303030] mt-6">
          Payment Successful 🎉
        </h1>
        <p className="text-gray-600 mt-2">
          Thank you for your purchase. Your payment has been processed
          successfully.
        </p>

        <Link
          to="/"
          className="inline-block mt-6 bg-[#FF624C] text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  )
}

export default SuccessPage