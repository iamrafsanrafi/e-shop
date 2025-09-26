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
import { Link } from "react-router";

const BestSeller = () => {
    // States
    const [loading, setLoading] = useState(false);
    const [limit, setLimit] = useState(6);
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
            <section id="best-seller" className="flex flex-col items-center md:items-start md:flex-row md:justify-center 2xl:justify-between sm:px-5 2xl:px-0">
                <div className="max-w-[902px]">
                    <div className="flex justify-between items-center">
                        <h2 className="text-[22px] sm:text-3xl md:text-4xl text-[#303030] font-['Poppins'] leading-[46px] font-semibold">Best Seller</h2>
                        <Link to="/products-list" className="flex items-center text-[#FF624C] font-['Montserrat'] font-bold leading-6 gap-4 cursor-pointer text-sm sm:text-base">View All <LongArrowIcon /></Link>
                    </div>

                    {(!loading && bestSellingProducts.length > 0) ? <>
                        <div className="flex flex-col items-center sm:items-start sm:flex-row sm:flex-wrap gap-3 justify-center mt-12">
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


                <div className="hidden 2xl:block">
                    <img src="images/best-seller-offer.png" alt="Best seller offer" />
                </div>
            </section>
        </Container>
    );
};

export default BestSeller;