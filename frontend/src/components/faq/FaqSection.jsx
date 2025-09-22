import { useState } from "react";
import Container from "../commonLayouts/Container";
import FaqItem from "./FaqItem";
import Button from "../Button";

const FaqSection = () => {
    const [faqId, setFaqId] = useState(4);

    const handleOpenFaq = (id) => {
        if (id === faqId) {
            setFaqId(null);
        }
        else {
            setFaqId(id);
        }
    }

    const faqs = [
        {
            id: 1,
            title: "What payment methods do you accept?",
            description:
                "We accept all major credit and debit cards, along with PayPal and Apple Pay. Your payment is secured with industry-standard encryption for safe checkout."
        },
        {
            id: 2,
            title: "How long does the product shipping take?",
            description:
                "Shipping typically takes 3–7 business days. Once your order is processed, you'll receive tracking info via email with estimated delivery details."
        },
        {
            id: 3,
            title: "Do you offer international shipping?",
            description:
                "Yes, we ship internationally to many countries. Delivery times vary, and local taxes or import duties may apply at the time of delivery."
        },
        {
            id: 4,
            title: "Can I track my order?",
            description:
                "Absolutely! A tracking number will be sent to your email once the order is shipped, allowing you to follow its progress online at any time."
        }
    ];

    return (
        <div className="bg-[#F4F4F4] py-16 my-20 w-full sm:px-5 2xl:px-0">
            <Container>
                <div className="flex flex-col-reverse gap-10 xl:flex-row xl:items-end xl:gap-16 2xl:gap-28 relative">
                    <div className="flex flex-col gap-4 sm:gap-6">
                        {
                            faqs.map(faq => <FaqItem title={faq.title} description={faq.description} id={faq.id} handleOpenFaq={handleOpenFaq} key={faq.id} isOpen={faqId === faq.id} />)
                        }
                    </div>
                    <div>
                        <h2 className="text-[#303030] text-3xl sm:text-[33px] md:text-4xl font-['Poppins'] font-semibold leading-[46px] mb-5 sm:mb-6 max-w-[306px]">Frequently Asked Questions</h2>
                        <p className="text-[#303030] font-['Montserrat'] text-lg sm:text-xl leading-[30px] max-w-[392px] mb-10 sm:mb-16">Questions that get asked the most by our clients. Get any burning questions?</p>
                        <Button value="Ask A Question" />
                    </div>
                    {/* Dots Image */}
                    <div className="absolute top-0 right-0 xl:right-[30px] hidden sm:block">
                        <img  src="images/faq-dots.png" alt="faq background" />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default FaqSection;