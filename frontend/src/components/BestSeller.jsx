import Container from "./commonLayouts/Container";
import ProductLayout from "./commonLayouts/ProductLayout";
import LongArrowIcon from "../icons/LongArrowIcon";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseconfig";
import { setBestSellerProducts } from "../slices/productsSlice";
import LoadingSpinner from "./LoadingSpinner";
import Button from "./Button";

const BestSeller = () => {
    // States
    const [loading, setLoading] = useState(false);
    const [limit, setLimit] = useState(5);
    const [showLoading, setShowLoading] = useState(false);

    // Redux states
    const dispatch = useDispatch();
    const bestSellingProducts = useSelector(state => state.products.bestSeller);

    // LocalStorage
    const localStorageProducts = JSON.parse(localStorage.getItem("bestSellingProducts")) || [];

    // Refs
    const timerRef = useRef(null);

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

    const fetchProducts = async () => {
        setLoading(true);
        const q = query(collection(db, "Products"), where("tags", "array-contains", "Best Seller"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => {
            const product = doc.data();

            return {
                ...product,
                createdAt: product.createdAt ? product.createdAt.toDate().getTime() : null
            };
        });

        dispatch(setBestSellerProducts(data));
        setLoading(false);
        localStorage.setItem("bestSellingProducts", JSON.stringify(data));
    }

    useEffect(() => {
        if (localStorageProducts.length === 0) {
            fetchProducts();
        }
        else {
            dispatch(setBestSellerProducts(localStorageProducts))
        }
    }, [])

    return (
        <Container>
            <section id="best-seller" className="sm:px-5 2xl:px-0">
                <div>
                    <h2 className="text-[22px] text-center sm:text-left sm:text-3xl md:text-4xl text-[#303030] font-['Poppins'] leading-[46px] font-semibold">Best Seller</h2>

                    {(!loading && bestSellingProducts.length > 0) ? <>
                        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center sm:flex-wrap gap-3">
                            {
                                bestSellingProducts.slice(0, limit).map(p => (
                                    <ProductLayout key={p.id} title={p.title} images={p.images} type={p.type} discountTag={p.discountTag} discountPercent={p.discountTag ? p.discountPercent : ""} rating={p.rating} totalRatings={p.totalRatings} price={p.price} previousPrice={p.discountTag ? p.previousPrice : ""} tags={p.tags} id={p.id} />
                                ))
                            }
                        </div>

                        {
                            showLoading && <LoadingSpinner message="Loading..." />
                        }


                        {limit < bestSellingProducts.length ? (
                            <div className="text-center mt-16">
                                <Button handleLoadMore={handleLoadMore} value="Load More" bg="white" color="#FF624C" border={true} />
                            </div>
                        ) : null}

                    </> : <LoadingSpinner message="Loading Best Selling Products..." />}
                </div>
            </section>
        </Container>
    );
};

export default BestSeller;