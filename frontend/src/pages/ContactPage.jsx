import { Link } from "react-router";
import Container from "../components/commonLayouts/Container"
import ContactForm from "../components/ContactForm";
import AdditionalContactInfo from "../components/AdditionalContactInfo";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCategory } from "../slices/productsSlice";

const ContactPage = () => {
    // Redux state
    const { category } = useSelector(state => state.products);

    // Extra hook
    const dispatch = useDispatch();

    useEffect(() => {
        if (category) {
            dispatch(clearCategory());
        }
    }, []);

    useEffect(() => {
        if (window.scrollY > 0) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [])

    return (
        <div className="sm:px-5 2xl:px-0">
            <Container>
                <div className="mt-8">
                    <iframe className="rounded-[22px] h-[225px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px]" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.9879429881544!2d-122.08532419999999!3d37.4220541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba02425dad8f%3A0x6c296c66619367e0!2sGoogleplex!5e1!3m2!1sen!2sbd!4v1760114827156!5m2!1sen!2sbd" width="100%" style={{ border: 0 }} loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>

                <div className="font-['Montserrat'] text-[#303030] text-base leading-6 flex gap-10 mt-16">
                    <Link to="/" className="relative after:content-[''] after:absolute after:w-[1px] after:h-[20px] after:bg-[#4A4A4A] after:top-1/2 after:-translate-y-1/2 after:right-[-19px] hover:text-[#FF624C] font-medium">Home</Link>
                    <span className="font-bold">Contact</span>
                </div>

                <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:items-start gap-y-10 lg:gap-y-0 xl:gap-x-4 mt-12 mb-20">
                    <ContactForm />
                    <AdditionalContactInfo />
                </div>
            </Container>
        </div>
    );
};

export default ContactPage;