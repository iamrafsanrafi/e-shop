import Container from "./commonLayouts/Container";
import ProductLayout2 from "./commonLayouts/ProductLayout2";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import Button from "./Button";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseconfig";
import { useDispatch, useSelector } from "react-redux";
import { setSpringSaleProducts } from "../slices/productsSlice";
import LoadingSpinner from "./LoadingSpinner";
import { Link } from "react-router";

// ---- PC Slider Arrow Function ----
function SampleNextArrow(props) {
    const { className, style, onClick } = props;

    return (
        <div
            style={{
                ...style,
                display: "flex",
                background: "#FFF",
                justifyContent: "center",
                alignItems: "center",
                width: "60px",
                height: "60px",
                border: "1px solid #303030",
                borderRadius: "50%",
                right: "0px",
                zIndex: 10,
                transform: window.innerWidth >= 1300 ? "translateX(50%)" : ""
            }}
            className={className}
            onClick={onClick}
        >
            <LiaAngleRightSolid className="text-[#303030] absolute left-1/2 -translate-x-1/2 bg-transparent" size={26} />
        </div>
    );
}


// ---- Mobile Slider Arrow Function ----
function SampleNextArrowMobile(props) {
    const { className, style, onClick } = props;
    return (
        <div
            style={{
                ...style,
                display: "flex",
                background: "#FFF",
                justifyContent: "center",
                alignItems: "center",
                width: window.innerWidth >= 640 ? "50px" : "44px",
                height: window.innerWidth >= 640 ? "50px" : "44px",
                border: "1px solid #303030",
                borderRadius: "50%",
                right: "0px",
                zIndex: 10,
                transform: window.innerWidth >= 800 ? "translateX(50%)" : ""
            }}
            className={className}
            onClick={onClick}
        >
            <LiaAngleRightSolid className="text-[#303030] absolute left-1/2 -translate-x-1/2 bg-transparent" size={26} />
        </div>
    );
}

const SpringSale = () => {
    const [timerLeft, setTimerLeft] = useState(calculateTimeLeft());
    const dispatch = useDispatch();
    const springSaleProducts = useSelector(state => state.products.springSale);
    const [loading, setLoading] = useState(false);
    const localStorageProducts = JSON.parse(localStorage.getItem("springSaleProducts")) || [];

    function getSaleEndDate() {
        const saleEndDate = localStorage.getItem("saleEndDate");
        
        if(saleEndDate) {
            return new Date(saleEndDate);
        }
        
        const newSaleEndDate = new Date("September 12, 2025 3:11 AM +0600");
        localStorage.setItem("saleEndDate", newSaleEndDate.toISOString());

        return newSaleEndDate;
    }

    function calculateTimeLeft() {
        const saleEndDate = getSaleEndDate();
        const currentDate = new Date();
        let difference = saleEndDate - currentDate;

        if (difference <= 0) {
            const daysPassedAway = Math.ceil(Math.abs(difference) / 86400000);
            const timePeriods = Math.ceil(daysPassedAway / 20);

            saleEndDate.setDate(saleEndDate.getDate() + (timePeriods * 20));
            difference = saleEndDate - currentDate;

            localStorage.setItem("saleEndDate", saleEndDate.toISOString());
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000),
        }
    }

    const fetchProducts = async () => {
        setLoading(true);

        const q = query(collection(db, "Products"), where("tags", "array-contains", "Spring Sale"));
        const snapshot = await getDocs(q);

        const data = snapshot.docs.map(doc => {
            const product = doc.data();

            return {
                ...product,
                createdAt: product.createdAt ? product.createdAt.toDate().getTime() : null
            };
        });

        dispatch(setSpringSaleProducts(data));
        setLoading(false);
        localStorage.setItem("springSaleProducts", JSON.stringify(data));
    }

    useEffect(() => {
        if (localStorageProducts.length === 0) {
            fetchProducts();
        }
        else {
            dispatch(setSpringSaleProducts(localStorageProducts));
        }
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimerLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    var settings = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplaySpeed: 2000,
        cssEase: "linear",
        prevArrow: <></>,
        nextArrow: <SampleNextArrow />,
        responsive: [
            {
                breakpoint: 639,
                settings: {
                    slidesToShow: 1,
                    nextArrow: <SampleNextArrowMobile />
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    nextArrow: <SampleNextArrowMobile />
                }
            },
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 2,
                    nextArrow: <SampleNextArrowMobile />
                }
            },
            {
                breakpoint: 1279,
                settings: {
                    slidesToShow: 1,
                    nextArrow: <SampleNextArrowMobile />
                }
            },

        ]
    };

    return (
        <section id="spring-sale" className="mb-20 py-16 sm:px-8 2xl:px-0" style={{ background: "url('/images/spring-sale-bg.png')" }}>
            <Container>
                <div className="flex flex-col lg:flex-row lg:justify-center items-center lg:gap-x-10 xl:gap-x-5 2xl:gap-x-20 gap-y-10 md:gap-y-20 lg:gap-y-0">
                    {/* ---- Timer ---- */}
                    <div className="relative">
                        <h2 className="text-[#303030] text-center lg:text-left text-[32px] sm:text-[40px] md:text-[56px] font-semibold font-['Poppins'] leading-none md:leading-[68px]">Spring Sale</h2>

                        <div className="flex items-center justify-center lg:justify-start gap-5 sm:gap-6 mt-5 md:mt-10 lg:mt-5 2xl:mt-10">
                            <div className="flex flex-col items-center">
                                <span className="font-['Poppins'] text-[#FF624C] text-[22px] sm:text-3xl font-semibold leading-[46px]">{timerLeft.days < 10 ? "0" : ""}{timerLeft.days}</span>
                                <span className="text-[#303030] font-['Montserrat'] leading-6 text-sm sm:text-base">Days</span>
                            </div>

                            <span className="font-['Poppins'] text-[#FF624C] text-[22px] sm:text-3xl font-semibold leading-[46px]">:</span>

                            <div className="flex flex-col items-center">
                                <span className="font-['Poppins'] text-[#FF624C] text-[22px] sm:text-3xl font-semibold leading-[46px]">{timerLeft.hours < 10 ? "0" : ""}{timerLeft.hours}</span>
                                <span className="text-[#303030] font-['Montserrat'] leading-6 text-sm sm:text-base">Hours</span>
                            </div>

                            <span className="font-['Poppins'] text-[#FF624C] text-[22px] sm:text-3xl font-semibold leading-[46px]">:</span>

                            <div className="flex flex-col items-center">
                                <span className="font-['Poppins'] text-[#FF624C] text-[22px] sm:text-3xl font-semibold leading-[46px]">{timerLeft.minutes < 10 ? "0" : ""}{timerLeft.minutes}</span>
                                <span className="text-[#303030] font-['Montserrat'] leading-6 text-sm sm:text-base">Minutes</span>
                            </div>

                            <span className="font-['Poppins'] text-[#FF624C] text-[22px] sm:text-3xl font-semibold leading-[46px]">:</span>

                            <div className="flex flex-col items-center">
                                <span className="font-['Poppins'] text-[#FF624C] text-[22px] sm:text-3xl font-semibold leading-[46px]">{timerLeft.seconds < 10 ? "0" : ""}{timerLeft.seconds}</span>
                                <span className="text-[#303030] font-['Montserrat'] leading-6 text-sm sm:text-base">Seconds</span>
                            </div>
                        </div>

                        {/* Dots image */}
                        <div className="absolute bottom-[-210px] left-0 hidden xl:block">
                            <img src="/images/spring-sale-dots.png" alt="background dots" />
                        </div>
                    </div>

                    {/* ---- Slider ---- */}
                    <div>
                        {(!loading && springSaleProducts.length > 0) ? (
                            <Slider {...settings} className="max-w-[340px] sm:max-w-[400px] md:max-w-[750px] lg:max-w-[464px] xl:max-w-[830px] 2xl:max-w-[920px]">
                                {springSaleProducts.map(p => (
                                    <ProductLayout2 key={p.id} title={p.title} images={p.images} type={p.type} discountTag={p.discountTag} discountPercent={p.discountTag ? p.discountPercent : ""} rating={p.rating} totalRatings={p.totalRatings} price={p.price} previousPrice={p.discountTag ? p.previousPrice : ""} stock={p.stock} tags={p.tags} id={p.id} />
                                ))}
                            </Slider>
                        ) : <LoadingSpinner message="Loading Spring Products..." />}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default SpringSale;