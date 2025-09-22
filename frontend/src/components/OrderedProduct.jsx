const OrderedProduct = ({title, quantity, price}) => {
    return (
        <div className="flex justify-between md:justify-start md:gap-[64.5px] border-b border-[#C3C3C3] pb-5">
            <p className="md:max-w-[250px] max-w-[50%] text-sm sm:text-xl text-[#303030] font-['Montserrat'] leading-[30px]">{title}</p>
            <p className="text-sm sm:text-xl text-[#303030] font-['Montserrat'] leading-[30px] font-bold">{quantity}</p>
            <p className="text-sm sm:text-xl text-[#303030] font-['Poppins'] leading-[30px] font-semibold">${price}</p>
        </div>
    );
};

export default OrderedProduct;