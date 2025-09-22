import { useState } from "react";

const ProductAdditionalInformations = ({ product, specifications }) => {
    const [currentTab, setCurrentTab] = useState("specification");
    const { description } = product;

    return (
        <div className="mt-[100px] mb-16 border-b border-[#CBCBCB] pb-6 sm:pb-20">
            <div className="flex gap-12 items-center">
                <button
                    className={`text-[#303030] text-xl sm:text-2xl font-['Poppins']  font-semibold opacity-25 ${currentTab === "description" ? "opacity-100 border-b-[3px] sm:border-b-[4px] border-[#FF624C] pb-2" : ""} cursor-pointer`}
                    onClick={() => setCurrentTab("description")}
                >Description</button>

                <button
                    className={`text-[#303030] text-xl sm:text-2xl font-['Poppins']  font-semibold opacity-25 ${currentTab === "specification" ? "opacity-100 border-b-[3px] sm:border-b-[4px] border-[#FF624C] pb-2" : ""} cursor-pointer`}
                    onClick={() => setCurrentTab("specification")}
                >Specification</button>
            </div>

            {currentTab === "description" && (
                <p className="text-[#303030] font-['Montserrat'] font-medium text-sm sm:text-xl leading-relaxed tracking-wide text-justify mt-6 sm:mt-12">
                    {description}
                </p>
            )}

            {currentTab === "specification" && (
                <div className="mt-12">
                    {/* ----Specifications Table---- */}
                    <table>
                        <tbody className="flex flex-col gap-y-6">
                            {specifications.map(spec => (
                                <tr className="flex gap-x-2" key={spec.key}>
                                    <td className="text-[#303030] font-['Poppins'] sm:text-xl font-semibold leading-[30px] sm:w-[150px]">{spec.key}</td>
                                    <td className="text-[#303030] font-['Montserrat'] text-sm sm:text-xl leading-[30px] opacity-75 max-w-[531px]">{spec.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ProductAdditionalInformations;