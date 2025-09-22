import { IoMdStar } from "react-icons/io";

const ProductDetails = ({product}) => {
    const {totalRatings, title, price, rating, previousPrice, brand, stock} = product;
    
    const formattedRating = parseFloat(rating).toFixed(0);

    return (
        <div className="mt-5 sm:mt-10 md:mt-12 lg:mt-0">
            {/* Rating */}
            <div className="flex items-center gap-2">
                <div className="flex text-[#FED550] text-[25px]">
                    {Array.from({length: parseInt(formattedRating)}).map((_, index) => (
                        <IoMdStar key={index} />
                    ))}
                </div>
                <span className="text-[#303030] text-xl font-['Montserrat'] leading-[30px]">({totalRatings})</span>
            </div>

            {/* Product Title */}
            <h2 className="text-[#303030] font-['Poppins'] text-lg sm:text-4xl font-semibold leading-[46px] sm:border-b border-[#CBCBCB] sm:pb-6 sm:w-[630px] mt-1 sm:mt-4">{title}</h2>

            {/* Price */}
            <p className="flex items-baseline gap-5 mt-1 sm:mt-5 border-b border-[#CBCBCB] sm:pb-6 sm:border-0">
                <span className="text-[#FF624C] font-['Poppins'] text-4xl sm:text-[56px] font-bold leading-[68px]">${price}</span>
                <del className="text-[#303030] font-['Montserrat'] text-xl leading-[30px] opacity-50">{previousPrice ? "$" + previousPrice : ""}</del>
            </p>

            {/* Info */}
            <div className="sm:w-[630px] flex flex-col gap-4 mt-5">
                <p className="flex gap-[31px] sm:gap-[105px]">
                    <span className="text-[#303030] font-['Poppins'] sm:text-xl font-semibold leading-[30px]">Brand</span>
                    <span className="text-[#303030] font-['Montserrat'] sm:text-xl leading-[30px]">{brand}</span>
                </p>
                <p className="flex gap-[23px] sm:gap-[110px]">
                    <span className="text-[#303030] font-['Poppins'] sm:text-xl font-semibold leading-[30px]">Stock</span>
                    <span className="text-[#303030] font-['Montserrat'] sm:text-xl leading-[30px]">{stock}</span>
                </p>
                <p className="flex gap-[13px] sm:gap-[87px]">
                    <span className="text-[#303030] font-['Poppins'] sm:text-xl font-semibold leading-[30px]">Delivery</span>
                    <span className="text-[#303030] font-['Montserrat'] sm:text-xl leading-[30px]">Worldwide</span>
                </p>
                <div className="flex gap-[20px] sm:gap-[94px]">
                    <span className="text-[#303030] font-['Poppins'] sm:text-xl font-semibold leading-[30px]">Variant</span>
                    
                    <div className="flex flex-wrap gap-x-1 gap-y-2">
                        <button className="border border-[#979797] rounded-[5px] text-[#303030] font-['Montserrat'] leading-[24px] py-4 px-8 font-bold cursor-pointer hover:bg-[#979797] hover:text-white transition">Off White</button>
                        <button className="border border-[#FFB0A5] rounded-[5px] text-[#FF624C] font-['Montserrat'] leading-[24px] py-4 px-8 font-bold cursor-pointer hover:bg-[#FFB0A5] hover:text-white transition">Space Gray</button>
                        <button className="border border-[#979797] rounded-[5px] text-[#303030] font-['Montserrat'] leading-[24px] py-4 px-8 font-bold cursor-pointer hover:bg-[#979797] hover:text-white transition">Jet Black</button>
                        <button disabled className="border  rounded-[5px]  font-['Montserrat'] leading-[24px] py-4 px-8 font-bold cursor-pointer disabled:text-[#CBCBCB] disabled:border-[#CBCBCB]">Cinnamon Red</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;