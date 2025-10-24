const LoadingSpinner = ({ message = "" }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[20px] w-full">
            {/* Spinner */}
            <div className="w-8 h-8 border-4 border-gray-300 border-t-[#FF624C] rounded-full animate-spin"></div>

            {/* Optional message */}
            {message && <p className="mt-4 text-[#303030] font-['Poppins'] text-base">{message}</p>}
        </div>
    );
};

export default LoadingSpinner;
