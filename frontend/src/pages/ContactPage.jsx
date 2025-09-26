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
                    <iframe className="rounded-[22px]" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6158.638030886063!2d-80.9147233!3d36.6706941!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8851f3ed2f9916db%3A0xf4bf7c3434c3819a!2sCity%20Vw%20Trl%20Pk%2C%20Galax%2C%20VA%2024333%2C%20USA!5e1!3m2!1sen!2sbd!4v1757739830650!5m2!1sen!2sbd" width="100%" height="450" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>

                <div className="font-['Montserrat'] text-[#303030] text-base leading-6 flex gap-10 mt-16">
                    <Link to="/" className="relative after:content-[''] after:absolute after:w-[1px] after:h-[20px] after:bg-[#4A4A4A] after:top-1/2 after:-translate-y-1/2 after:right-[-19px]">Home</Link>
                    <span className="font-bold">Contact</span>
                </div>

                <div className="flex flex-col gap-y-10 lg:gap-y-0 xl:gap-x-4 md:flex-row justify-between items-start mt-12 mb-20">
                    <ContactForm />
                    <AdditionalContactInfo />
                </div>
            </Container>
        </div>
    );
};

export default ContactPage;