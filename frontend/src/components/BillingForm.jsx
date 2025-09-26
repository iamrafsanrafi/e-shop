import { TfiAngleDown } from "react-icons/tfi";

const BillingForm = ({ formData, setFormData, errors, selectedCountry, setSelectedCountry }) => {
    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value);
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const countries = {
        Bangladesh: {
            Dhaka: ["Dhaka", "Gazipur", "Narayanganj"],
            Chittagong: ["Chittagong", "Cox's Bazar", "Comilla"]
        },
        India: {
            Delhi: ["New Delhi", "Gurgaon", "Noida"],
            Maharashtra: ["Mumbai", "Pune", "Nagpur"]
        },
        USA: {
            California: ["Los Angeles", "San Francisco", "San Diego"],
            Texas: ["Houston", "Dallas", "Austin"]
        },
        UK: {
            England: ["London", "Manchester", "Liverpool"],
            Scotland: ["Edinburgh", "Glasgow", "Aberdeen"]
        },
        Canada: {
            Ontario: ["Toronto", "Ottawa", "Hamilton"],
            BritishColumbia: ["Vancouver", "Victoria", "Kelowna"]
        }
    };

    return (
        <form>
            <h2 className="text-[#303030] font-['Poppins'] text-2xl sm:text-[36px] font-semibold leading-[46px]">Billing Details</h2>

            <div className="xl:w-[870px] flex flex-col lg:flex-row lg:flex-wrap justify-between gap-y-8 mt-10">
                {/* First Name */}
                <div className="flex flex-col gap-3">
                    <label className="sm:text-xl text-[#303030] font-['Montserrat'] font-bold leading-[30px]" htmlFor="firstname">First Name <span className="text-[#FF624C]">*</span></label>
                    <input
                        className="py-4 sm:py-5 md:py-[25px] px-6 sm:px-7 md:px-[32px] outline-none border border-[#CBCBCB] rounded-[10px] w-[360px] sm:w-[550px] sm:max-w-[550px] md:w-[640px] md:max-w-[640px] xl:w-[424px] xl:max-w-[424px] text-[#303030] placeholder:text-[#303030] placeholder:opacity-75 font-['Montserrat'] sm:text-xl leading-[30px]"
                        type="text"
                        id="firstname"
                        placeholder="Amelia Robert"
                        value={formData.firstname}
                        onChange={handleChange}
                    />
                    {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
                </div>

                {/* Last Name */}
                <div className="flex flex-col gap-3">
                    <label className="sm:text-xl text-[#303030] font-['Montserrat'] font-bold leading-[30px]" htmlFor="lastname">Last Name <span className="text-[#FF624C]">*</span></label>
                    <input
                        className="py-4 sm:py-[25px] px-6 sm:px-[32px] outline-none border border-[#CBCBCB] rounded-[10px] w-[360px] max-w-[400px] sm:w-[550px] sm:max-w-[550px] md:w-[640px] md:max-w-[640px] xl:w-[424px] xl:max-w-[424px] text-[#303030] placeholder:text-[#303030] placeholder:opacity-75 font-['Montserrat'] sm:text-xl leading-[30px]"
                        type="text"
                        id="lastname"
                        placeholder="Watson"
                        value={formData.lastname}
                        onChange={handleChange}
                    />
                    {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-3">
                    <label className="sm:text-xl text-[#303030] font-['Montserrat'] font-bold leading-[30px]" htmlFor="number">Phone Number <span className="text-[#FF624C]">*</span></label>
                    <input
                        className="py-4 sm:py-[25px] px-6 sm:px-[32px] outline-none border border-[#CBCBCB] rounded-[10px] w-[360px] max-w-[400px] sm:w-[550px] sm:max-w-[550px] md:w-[640px] md:max-w-[640px] xl:w-[424px] xl:max-w-[424px] text-[#303030] placeholder:text-[#303030] placeholder:opacity-75 font-['Montserrat'] sm:text-xl leading-[30px]"
                        type="text"
                        id="number"
                        placeholder="+X (XXX) XXX-XXXX"
                        value={formData.number}
                        onChange={handleChange}
                    />
                    {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-3">
                    <label className="sm:text-xl text-[#303030] font-['Montserrat'] font-bold leading-[30px]" htmlFor="email">Email Address <span className="text-[#FF624C]">*</span></label>
                    <input
                        className="py-4 sm:py-[25px] px-6 sm:px-[32px] outline-none border border-[#CBCBCB] rounded-[10px] w-[360px] max-w-[400px] sm:w-[550px] sm:max-w-[550px] md:w-[640px] md:max-w-[640px] xl:w-[424px] xl:max-w-[424px] text-[#303030] placeholder:text-[#303030] placeholder:opacity-75 font-['Montserrat'] sm:text-xl leading-[30px]"
                        type="email"
                        id="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                {/* Address */}
                <div className="flex flex-col gap-3">
                    <label className="sm:text-xl text-[#303030] font-['Montserrat'] font-bold leading-[30px]" htmlFor="address">Address <span className="text-[#FF624C]">*</span></label>
                    <input
                        className="py-4 sm:py-[25px] px-6 sm:px-[32px] outline-none border border-[#CBCBCB] rounded-[10px] w-[360px] max-w-[400px] sm:w-[550px] sm:max-w-[550px] md:w-[640px] md:max-w-[640px] xl:w-[870px] xl:max-w-[870px] text-[#303030] placeholder:text-[#303030] placeholder:opacity-75 font-['Montserrat'] sm:text-xl leading-[30px]"
                        type="text"
                        id="address"
                        placeholder="Home Address, Auxiliary St. 12345, Anywhere State"
                        value={formData.address}
                        onChange={handleChange}
                    />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                </div>

                {/* Country */}
                <div className="flex flex-col gap-3">
                    <label className="sm:text-xl text-[#303030] font-['Montserrat'] font-bold leading-[30px]" htmlFor="country">Country <span className="text-[#FF624C]">*</span></label>
                    <div className="relative">
                        <select
                            id="country"
                            value={selectedCountry}
                            onChange={handleCountryChange}
                            className="appearance-none py-4 sm:py-[25px] px-6 sm:px-[32px] outline-none border border-[#CBCBCB] rounded-[10px] w-[360px] max-w-[400px] sm:w-[550px] sm:max-w-[550px] md:w-[640px] md:max-w-[640px] xl:w-[424px] xl:max-w-[424px] text-[#303030] font-['Montserrat'] sm:text-xl leading-[30px]"
                        >
                            <option value="">Select a country</option>
                            {Object.keys(countries).map(country => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </select>
                        <TfiAngleDown className="text-xl text-[#303030] pointer-events-none absolute top-1/2 -translate-y-1/2 right-[28px]" />
                    </div>
                    {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
                </div>

                {/* Zip Code */}
                <div className="flex flex-col gap-3">
                    <label className="sm:text-xl text-[#303030] font-['Montserrat'] font-bold leading-[30px]" htmlFor="zip">Zip Code</label>
                    <input
                        className="py-4 sm:py-[25px] px-6 sm:px-[32px] outline-none border border-[#CBCBCB] rounded-[10px] w-[360px] max-w-[400px] sm:w-[550px] sm:max-w-[550px] md:w-[640px] md:max-w-[640px] xl:w-[424px] xl:max-w-[424px] text-[#303030] placeholder:text-[#303030] placeholder:opacity-75 font-['Montserrat'] sm:text-xl leading-[30px]"
                        type="number"
                        id="zip"
                        placeholder="555555"
                        value={formData.zip}
                        onChange={handleChange}
                    />
                    {errors.zip && <p className="text-red-500 text-sm">{errors.zip}</p>}
                </div>

                {/* Order Notes */}
                <div className="flex flex-col gap-3">
                    <label className="sm:text-xl text-[#303030] font-['Montserrat'] font-bold leading-[30px]" htmlFor="orderNotes">Order Notes</label>
                    <textarea
                        className="py-4 sm:py-[25px] px-6 sm:px-[32px] outline-none border border-[#CBCBCB] rounded-[10px] w-[360px] max-w-[400px] sm:w-[550px] sm:max-w-[550px] md:w-[640px] md:max-w-[640px] xl:w-[870px] xl:max-w-[870px] h-[173px] text-[#303030] placeholder:text-[#303030] placeholder:opacity-75 font-['Montserrat'] sm:text-xl leading-[30px] resize-none"
                        type="text"
                        id="orderNotes"
                        placeholder="Enter your order notes ..."
                        value={formData.orderNotes}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </form>
    );
};

export default BillingForm;