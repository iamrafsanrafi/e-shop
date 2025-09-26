import { collection, getDocs, query, where } from "firebase/firestore";
import LongArrowIcon from "../icons/LongArrowIcon"
import Container from "./commonLayouts/Container";
import ProductLayout from "./commonLayouts/ProductLayout";
import { useSelector } from "react-redux";
import { db } from "../firebase/firebaseconfig";
import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import Button from "./Button";
import { Link } from "react-router";


const RelatedProducts = ({ category }) => {
    // States
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [limit, setLimit] = useState(5);
    const [showLoading, setShowLoading] = useState(false);

    // Redux states
    const allProducts = useSelector(state => state.products.allProducts);

    // Refs
    const timerRef = useRef(null);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "Products"), where("category", "==", category));
            const snapshot = await getDocs(q);

            const products = snapshot.docs.map(doc => {
                const product = doc.data();

                return {
                    ...product,
                    createdAt: product.createdAt ? product.createdAt.toDate().getTime() : null
                };
            })
            setRelatedProducts(products);
        }
        catch (e) {
            console.error(e.message);
        }
        finally {
            setLoading(false);
        }
    }

    const getExistingRelatedProducts = () => {
        const filtered = allProducts.filter(p => p.category === category);
        setRelatedProducts(filtered);
    }

    const handleLoadMore = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        setShowLoading(true);

        timerRef.current = setTimeout(() => {
            setLimit(limit + 5);
            setShowLoading(false);
        }, 800);
    }


    useEffect(() => {
        if (allProducts.length === 0) {
            fetchProducts();
        }
        else {
            getExistingRelatedProducts();
        }
    }, [])

    return (
        <div className="mb-20">
            <Container>
                <div className="flex items-center justify-between">
                    <h2 className="text-[22px] sm:text-4xl text-[#303030] font-['Poppins'] leading-[46px] font-semibold">Related Products</h2>
                    <Link to="/products-list" className="flex items-center text-[13px] sm:text-base text-[#FF624C] font-['Montserrat'] font-bold leading-6 gap-4 cursor-pointer">View All <LongArrowIcon /></Link>
                </div>
                <div className="mt-10 sm:mt-12 flex items-start justify-center flex-wrap gap-y-5 lg:gap-y-3 sm:gap-x-3">
                    {
                        (!loading && relatedProducts.length > 0) ? <>
                            {relatedProducts.slice(0, limit).map(p => (
                                <ProductLayout key={p.id} title={p.title} images={p.images} type={p.type} discountTag={p.discountTag} discountPercent={p.discountTag ? p.discountPercent : ""} rating={p.rating} totalRatings={p.totalRatings} price={p.price} previousPrice={p.discountTag ? p.previousPrice : ""} tags={p.tags} id={p.id} />
                            ))}
                        </>
                            : <LoadingSpinner />
                    }
                </div>

                {
                    showLoading && <LoadingSpinner message="Loading..." />
                }

                {
                    (limit < relatedProducts.length && !loading) ? (
                        <div className="flex justify-center mt-16">
                            <Button handleLoadMore={handleLoadMore} value="Load More" bg="white" color="#FF624C" border={true} />
                        </div>
                    ) : null
                }
            </Container>
        </div>
    );
};

export default RelatedProducts;