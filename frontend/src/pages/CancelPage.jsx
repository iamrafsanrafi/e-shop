import { useEffect } from "react"
import { Link } from "react-router"

const CancelPage = () => {

  useEffect(() => {
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-[#303030] mt-6">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 mt-2">
          Your payment was not completed. Please try again or use another
          payment method.
        </p>

        <Link
          to="/"
          className="inline-block mt-6 bg-[#FF624C] text-white px-6 py-3 rounded-xl shadow-md transition-transform duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default CancelPage