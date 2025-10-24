const Button = ({ value, paddingX = "40px", paddingY = "16px", bg = "#FF624C", color = "white", border = false, borderColor = "#FF624C", width = "auto", handleLoadMore, signOut, handleUpdateCart, handleSubmit, minWidth, maxWidth = "100%" }) => {
    return (
        <button onClick={handleLoadMore || signOut || handleUpdateCart || handleSubmit}
            className={`font-['Montserrat'] text-base sm:text-xl font-bold leading-[30px] rounded-[10px] cursor-pointer`}
            style={{
                padding: `${paddingY} ${paddingX}`,
                background: bg,
                color: color,
                border: border ? `1px solid ${borderColor}` : "",
                width: width,
                minWidth: minWidth,
                maxWidth: maxWidth
            }}
        >{value}</button>
    );
};

export default Button;