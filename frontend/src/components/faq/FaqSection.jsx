import { useState } from "react";
import Container from "../commonLayouts/Container";
import FaqItem from "./FaqItem";
import Button from "../Button";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";

// FAQ data
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

const FaqSection = () => {
    // States
    const [faqId, setFaqId] = useState(4);
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);

    // Functions
    const handleOpenFaq = (id) => {
        if (id === faqId) {
            setFaqId(null);
        }
        else {
            setFaqId(id);
        }
    }

    const handleSubmitQuestion = () => {
        setLoading(true);

        if (question.trim() === "" || !question) {
            setLoading(false);
            return toast.error("Please write a question!");
        }

        setTimeout(() => {
            toast.success("Question submitted successfully!");
            setQuestion("");
            setLoading(false);
        }, 250);
    }

    return (
        <div className="bg-[#F4F4F4] py-16 my-20 w-full sm:px-5 2xl:px-0">
            <Container>
                <div className="flex flex-col-reverse items-center gap-10 xl:flex-row xl:items-end xl:gap-16 xl:justify-center 2xl:justify-between relative">
                    <div className="flex flex-col gap-4 sm:gap-6 w-full xl:w-auto">
                        {
                            faqs.map(faq => <FaqItem title={faq.title} description={faq.description} id={faq.id} handleOpenFaq={handleOpenFaq} key={faq.id} isOpen={faqId === faq.id} />)
                        }
                    </div>
                    <div>
                        <h2 className="text-[#303030] text-center xl:text-left text-2xl sm:text-[32px] md:text-4xl font-['Poppins'] font-semibold leading-[46px] mb-5 sm:mb-6 xl:max-w-[306px]">Frequently Asked Questions</h2>

                        <p className="text-[#303030] text-center xl:text-left font-['Montserrat'] text-base sm:text-lg md:text-xl leading-[30px] xl:max-w-[420px] mb-5">Questions that get asked the most by our customers. Have any burning questions?</p>

                        <div className="flex justify-center">
                            <input
                                className="placeholder:text-[#303030] placeholder:opacity-75 font-['Montserrat'] text-sm sm:text-base leading-6 border border-[#929292] outline-none rounded-[10px] py-3 pl-3 sm:py-[21px] sm:pl-6 w-full sm:w-[470px] xl:w-full 2xl:w-[470px] mb-4"
                                type="text"
                                placeholder="Have a question? Write it here..."
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                            />
                        </div>

                        <div className="text-center xl:text-left">
                            <div className="sm:hidden">
                                <Button paddingY="8px" paddingX="12px" minWidth={window.innerWidth < 640 ? "153px" : "186px"} value={loading ? <LoadingSpinner /> : "Ask A Question"} handleSubmit={handleSubmitQuestion} />
                            </div>
                            <div className="hidden sm:block">
                                <Button width="242px" value={loading ? <LoadingSpinner /> : "Ask A Question"} handleSubmit={handleSubmitQuestion} />
                            </div>
                        </div>
                    </div>

                    {/* ---- Dots Image ---- */}
                    <div className="absolute top-0 right-0 xl:right-[30px] hidden 2xl:block">
                        <img src="images/faq-dots.png" alt="faq background" />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default FaqSection;