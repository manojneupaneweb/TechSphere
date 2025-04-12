import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards, PayPal, and bank transfers.",
        },
        {
            question: "How long does shipping take?",
            answer: "Shipping typically takes 3-5 business days within the US.",
        },
        {
            question: "Do you offer international shipping?",
            answer: "Yes, we ship to most countries worldwide. Shipping times vary by location.",
        },
        {
            question: "What is your return policy?",
            answer: "You can return products within 30 days of purchase for a full refund.",
        },
        {
            question: "How can I track my order?",
            answer: "Once your order is shipped, you will receive a tracking number via email.",
        },
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-10 bg-gradient-to-br ">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
                    Frequently Asked Questions
                </h2>
                <div className="max-w-2xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-slate-100 rounded-xl shadow-lg overflow-hidden">
                            <button
                                className="w-full text-left px-6 py-3 flex justify-between items-center focus:outline-none hover:bg-gray-100 transition-all"
                                onClick={() => toggleFAQ(index)}
                                aria-expanded={activeIndex === index}
                                aria-controls={`faq-${index}`}
                            >
                                <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                                <span className="text-blue-600">
                                    {activeIndex === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                                </span>
                            </button>
                            <div
                                id={`faq-${index}`}
                                className={`px-6 pb-4 text-gray-700 overflow-hidden transition-all ${activeIndex === index ? "max-h-40 opacity-100 py-2" : "max-h-0 opacity-0"
                                    }`}
                                aria-hidden={activeIndex !== index}
                            >
                                {faq.answer}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};