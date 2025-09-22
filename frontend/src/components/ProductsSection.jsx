import { useState } from "react";
import { saveProduct } from "../firebase/firestoreService";
import { toast } from "react-toastify";

const categories = [
    "Computers & Tablets",
    "Mobile & Accessories",
    "TV & Home Theater",
    "Audio & Headphones",
    "Cameras & Camcorders",
    "Gaming Equipment",
    "Home Appliances"
];

const ProductsSection = () => {
    // Static states
    const [category, setCategory] = useState(categories[0]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [rating, setRating] = useState("");
    const [totalRatings, setTotalRatings] = useState("");
    const [previousPrice, setPreviousPrice] = useState("");
    const [price, setPrice] = useState("");
    const [discountTag, setDiscountTag] = useState(false);
    const [discountPercent, setDiscountPercent] = useState("");
    const [stock, setStock] = useState("");
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [discountOpen, setDiscountOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Dynamic states
    const [tags, setTags] = useState([]);
    const [images, setImages] = useState([]);
    const [specifications, setSpecifications] = useState([]);

    // Tag functions
    const addTag = () => setTags([...tags, ""]);

    const removeTag = (idx) => {
        setTags(tags.filter((_, i) => i !== idx));
    }

    const updateTag = (idx, value) => {
        const newTags = [...tags];
        newTags[idx] = value;
        setTags(newTags);
    }

    // Image functions
    const addImage = () => setImages([...images, ""]);

    const removeImage = (idx) => {
        setImages(images.filter((_, i) => i !== idx));
    }

    const updateImage = (idx, value) => {
        const newImages = [...images];
        newImages[idx] = value;

        setImages(newImages);
    }

    // Specification functions
    const addSpec = () => setSpecifications([...specifications, ""]);

    const removeSpec = (idx) => {
        setSpecifications(specifications.filter((_, i) => i !== idx));
    }

    const updateSpec = (idx, field, value) => {
        const newSpecs = [...specifications];
        newSpecs[idx] = { ...newSpecs[idx], [field]: value };

        setSpecifications(newSpecs);
    }

    // Function to reset form
    const resetForm = () => {
        setCategory("");
        setTitle("");
        setDescription("");
        setBrand("");
        setRating(0);
        setTotalRatings(0);
        setPreviousPrice(0);
        setPrice(0);
        setDiscountTag(false);
        setDiscountPercent(0);
        setStock(0);
        setTags([]);
        setImages([]);
        setSpecifications([]);
    };

    // Form submit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const productData = {
            id: Date.now(),
            category,
            title,
            description,
            brand,
            rating,
            totalRatings,
            previousPrice,
            price,
            discountTag,
            discountPercent: discountTag ? discountPercent : null,
            stock,
            tags,
            images,
            specifications,
        };

        // Saving product data to firestore db
        try {
            const id = await saveProduct(productData);
            toast.success("Product added successfully!", id);
        } catch (e) {
            toast.error(e.message);
        } finally {
            setLoading(false);
            resetForm();
        }
    };

    return (
        <div className="p-8 bg-white rounded-2xl shadow-xl max-w-4xl mx-auto">
            <h2 className="text-3xl font-extrabold mb-8 text-gray-800 border-b pb-3 border-gray-200">
                Add New Product
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                {/* Category */}
                <div className="relative" onClick={() => setCategoryOpen(!categoryOpen)}>
                    <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="appearance-none w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition bg-white pr-10"
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <div className={`pointer-events-none absolute top-[70%] right-3 transform -translate-y-1/2 transition-transform ${categoryOpen ? "rotate-180" : ""}`}>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                </div>

                {/* Basic Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                        { id: "title", label: "Title", type: "text", value: title, setter: setTitle },
                        { id: "brand", label: "Brand", type: "text", value: brand, setter: setBrand },
                        { id: "rating", label: "Rating", type: "number", value: rating, setter: setRating },
                        { id: "totalRatings", label: "Total Ratings", type: "number", value: totalRatings, setter: setTotalRatings },
                        { id: "previousPrice", label: "Previous Price", type: "number", value: previousPrice, setter: setPreviousPrice },
                        { id: "price", label: "Price", type: "number", value: price, setter: setPrice },
                    ].map((field) => (
                        <div key={field.id}>
                            <label htmlFor={field.id} className="block text-gray-700 font-semibold mb-2">{field.label}</label>
                            <input
                                id={field.id}
                                type={field.type}
                                placeholder={field.label}
                                value={field.value}
                                onChange={(e) => field.setter(field.type === "number" ? Number(e.target.value) : e.target.value)}
                                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-400 transition outline-none"
                            />
                        </div>
                    ))}
                </div>

                {/* Discount & Stock */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="relative" onClick={() => setDiscountOpen(!discountOpen)}>
                        <label htmlFor="discountTag" className="block text-gray-700 font-semibold mb-2">Discount Available?</label>
                        <select
                            id="discountTag"
                            value={discountTag}
                            onChange={(e) => setDiscountTag(e.target.value === "true")}
                            className="appearance-none w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition bg-white pr-10 outline-none"
                        >
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                        <div className={`pointer-events-none absolute top-[70%] right-3 transform -translate-y-1/2 transition-transform ${discountOpen ? "rotate-180" : ""}`}>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </div>
                    </div>
                    {discountTag && (
                        <div>
                            <label htmlFor="discountPercent" className="block text-gray-700 font-semibold mb-2">Discount Percent</label>
                            <input id="discountPercent" type="number" placeholder="Discount %" value={discountPercent} onChange={(e) => setDiscountPercent(Number(e.target.value))} className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-400 transition outline-none" />
                        </div>
                    )}
                    <div>
                        <label htmlFor="stock" className="block text-gray-700 font-semibold mb-2">Stock</label>
                        <input id="stock" type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(Number(e.target.value))} className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-400 transition outline-none" />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
                    <textarea
                        id="description"
                        type="text"
                        rows={5}
                        placeholder="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-400 transition outline-none resize-none"
                    />
                </div>

                {/* Tags */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Tags</label>
                    {tags.map((tag, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                            <input type="text" value={tag} onChange={(e) => updateTag(index, e.target.value)} className="p-2 border rounded flex-1" />
                            <button type="button" onClick={() => removeTag(index)} className="px-2 bg-red-500 text-white rounded cursor-pointer">Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={addTag} className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">Add Tag</button>
                </div>

                {/* Images */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Images</label>
                    {images.map((img, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                            <input type="text" value={img} onChange={(e) => updateImage(index, e.target.value)} className="p-2 border rounded flex-1" />
                            <button type="button" onClick={() => removeImage(index)} className="px-2 bg-red-500 text-white rounded cursor-pointer">Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={addImage} className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">Add Image</button>
                </div>

                {/* Specifications */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Specifications</label>
                    {specifications.map((spec, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                            <input type="text" placeholder="Section" value={spec.key} onChange={(e) => updateSpec(index, "key", e.target.value)} className="p-2 border rounded flex-1" />
                            <input type="text" placeholder="Value" value={spec.value} onChange={(e) => updateSpec(index, "value", e.target.value)} className="p-2 border rounded flex-1" />
                            <button type="button" onClick={() => removeSpec(index)} className="px-2 bg-red-500 text-white rounded cursor-pointer">Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={addSpec} className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">Add Specification</button>
                </div>

                <button type="submit" className="px-6 py-3 bg-green-500 text-white rounded mt-4 hover:bg-green-600 transition cursor-pointer">{loading ? "Saving..." : "Save Product"}</button>

            </form>
        </div >
    );
};

export default ProductsSection;