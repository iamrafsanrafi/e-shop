import Container from "./commonLayouts/Container";
import ProductLayout from "./commonLayouts/ProductLayout";
import { HiArrowLongRight } from "react-icons/hi2";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";
import LongArrowIcon from "../icons/LongArrowIcon";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseconfig";
import LoadingSpinner from "./LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { setFeaturedProducts } from "../slices/productsSlice";
import { Link } from "react-router";

// ---- Mobile Slider Arrow Functions ----
function SampleNextArrowMobile(props) {
    const { className, style, onClick } = props;
    return (
        <div
            style={{
                ...style,
                display: "flex",
                justifyContent: "center",
                background: "white",
                alignItems: "center",
                width: "40px",
                height: "40px",
                border: "1px solid #303030",
                borderRadius: "50%",
                right: "-20px",
                zIndex: 10
            }}
            className={className}
            onClick={onClick}
        >
            <LiaAngleRightSolid className="text-[#303030] absolute left-1/2 -translate-x-1/2" size={16} />
        </div>
    );
}

function SamplePrevArrowMobile(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "flex",
                background: "white",
                justifyContent: "center",
                alignItems: "center",
                width: "40px",
                height: "40px",
                border: "1px solid #303030",
                borderRadius: "50%",
                left: "-25px",
                zIndex: 10,
            }}
            onClick={onClick}
        >
            <LiaAngleLeftSolid className="text-[#303030] absolute left-1/2 -translate-x-1/2" size={16} />
        </div>
    );
}

// ---- PC Slider Arrow Functions ----
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "flex",
                background: "white",
                justifyContent: "center",
                alignItems: "center",
                width: "40px",
                height: "40px",
                border: "1px solid #303030",
                borderRadius: "50%",
                left: "-4px",
                zIndex: 10,
            }}
            onClick={onClick}
        >
            <LiaAngleLeftSolid className="text-[#303030] absolute left-1/2 -translate-x-1/2" size={16} />
        </div>
    );
}

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            style={{
                ...style,
                display: "flex",
                justifyContent: "center",
                background: "white",
                alignItems: "center",
                width: "40px",
                height: "40px",
                border: "1px solid #303030",
                borderRadius: "50%",
                right: "0px",
                zIndex: 10
            }}
            className={className}
            onClick={onClick}
        >
            <LiaAngleRightSolid className="text-[#303030] absolute left-1/2 -translate-x-1/2" size={16} />
        </div>
    );
}

const FeaturedProducts = () => {
    const dispatch = useDispatch();
    const featuredProducts = useSelector(state => state.products.featured);
    const [loading, setLoading] = useState(false);
    const localStorageProducts = JSON.parse(localStorage.getItem("featuredProducts")) || [];

    const fetchProducts = async () => {
        setLoading(true);
        const q = query(collection(db, "Products"), where("tags", "array-contains", "Featured"));

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => {
            const product = doc.data();

            return {
                ...product,
                createdAt: product.createdAt ? product.createdAt.toDate().getTime() : null
            };
        });

        dispatch(setFeaturedProducts(data));
        setLoading(false);
        localStorage.setItem("featuredProducts", JSON.stringify(data));
    }

    useEffect(() => {
        if (localStorageProducts.length === 0) {
            fetchProducts();
        }
        else {
            dispatch(setFeaturedProducts(localStorageProducts));
        }
    }, [])

    // Slider settings
    var settings = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear",
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    nextArrow: <SampleNextArrowMobile />,
                    prevArrow: <SamplePrevArrowMobile />,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    nextArrow: <SampleNextArrow />,
                    prevArrow: <SamplePrevArrow />,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    nextArrow: <SampleNextArrow />,
                    prevArrow: <SamplePrevArrow />,
                }
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    nextArrow: <SampleNextArrow />,
                    prevArrow: <SamplePrevArrow />,
                }
            },
            {
                breakpoint: 1536,
                settings: {
                    slidesToShow: 4,
                    nextArrow: <SampleNextArrow />,
                    prevArrow: <SamplePrevArrow />,
                }
            }
        ]
    };

    return (
        <div className="mb-20 sm:px-5 2xl:px-0">
            <Container>
                <div className="flex justify-between items-center">
                    <h2 className="text-[22px] sm:text-3xl md:text-4xl text-[#303030] font-['Poppins'] leading-[46px] font-semibold">Featured Products</h2>
                    <Link to="/products-list" className="flex items-center text-[13px] sm:text-base text-[#FF624C] font-['Montserrat'] font-bold leading-6 gap-4">View All <LongArrowIcon width="25px" /></Link>
                </div>

                {(!loading && featuredProducts.length > 0) ? (
                    <Slider {...settings} className="mt-12 sm:px-9 max-w-[285px] mx-auto sm:max-w-[650px]  xl:max-w-[1230px] 2xl:min-w-full">
                        {
                            featuredProducts.map(p => (
                                <div className="flex items-center justify-center" key={p.id}>
                                    <ProductLayout images={p.images} title={p.title} type={p.type} discountTag={p.discountTag} discountPercent={p.discountTag ? p.discountPercent : ""} rating={p.rating} totalRatings={p.totalRatings} price={p.price} previousPrice={p.discountTag ? p.previousPrice : ""} tags={p.tags} id={p.id} />
                                </div>
                            ))
                        }
                    </Slider>
                ) : <LoadingSpinner message="Loading Featured Products..." />}
            </Container>
        </div>
    );
};

export default FeaturedProducts;