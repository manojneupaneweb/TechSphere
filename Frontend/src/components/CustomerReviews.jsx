import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const reviews = [
    {
        name: "Manoj Neupane",
        photo: "https://randomuser.me/api/portraits/men/32.jpg",
        review: "Amazing product quality and fast delivery. Loved the service!",
        rating: 5,
    },
    {
        name: "Sita Bhattarai",
        photo: "https://randomuser.me/api/portraits/women/44.jpg",
        review: "TechSphere is very reliable. Will shop again!",
        rating: 4,
    },
    {
        name: "Ramesh Khadka",
        photo: "https://randomuser.me/api/portraits/men/65.jpg",
        review: "Great customer support and good value for money.",
        rating: 4,
    },
    {
        name: "Gita Basnet",
        photo: "https://randomuser.me/api/portraits/women/68.jpg",
        review: "Smartwatch is awesome and stylish. Loved it!",
        rating: 5,
    },
    {
        name: "Bikash Shrestha",
        photo: "https://randomuser.me/api/portraits/men/27.jpg",
        review: "Delivery was quick and packaging was neat.",
        rating: 4,
    },
];

const StarRating = ({ count }) => {
    return (
        <div className="flex">
            {Array(5)
                .fill(0)
                .map((_, i) => (
                    <Star
                        key={i}
                        size={18}
                        className={i < count ? "text-yellow-400" : "text-gray-300"}
                        fill={i < count ? "currentColor" : "none"}
                    />
                ))}
        </div>
    );
};

const CustomerReviews = () => {
    const scrollRef = useRef();

    const scroll = (dir) => {
        scrollRef.current.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
    };

    useEffect(() => {
        const handleScroll = () => {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

            if (scrollLeft === 0) {
                scrollRef.current.scrollLeft = scrollWidth / 2 - clientWidth;
            } else if (scrollLeft + clientWidth >= scrollWidth) {
                scrollRef.current.scrollLeft = scrollWidth / 2 - clientWidth;
            }
        };

        const ref = scrollRef.current;
        ref.addEventListener("scroll", handleScroll);

        // Duplicate the reviews for infinite scrolling
        ref.scrollLeft = ref.scrollWidth / 2 - ref.clientWidth;

        return () => ref.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="px-6 py-10 bg-gray-50">
            <h2 className="text-3xl font-bold text-center mb-6">What Our Customers Say</h2>

            <div className="relative">
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 z-10"
                >
                    <ChevronLeft />
                </button>

                <div
                    ref={scrollRef}
                    className="flex space-x-6 overflow-x-auto scroll-smooth px-10"
                    style={{
                        scrollbarWidth: "none", // For Firefox
                        msOverflowStyle: "none", // For IE and Edge
                    }}
                >
                    {[...reviews, ...reviews].map((r, i) => (
                        <motion.div
                            key={i}
                            className="min-w-[250px] bg-white rounded-xl shadow-md p-4 flex-shrink-0 text-center"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <img
                                src={r.photo}
                                alt={r.name}
                                className="w-14 h-14 rounded-full object-cover mx-auto mb-3"
                            />
                            <h3 className="font-semibold text-lg">{r.name}</h3>
                            <p className="text-sm text-gray-600 mt-1 mb-2">"{r.review}"</p>
                            <StarRating count={r.rating} />
                        </motion.div>
                    ))}
                </div>

                <button
                    onClick={() => scroll("right")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 z-10"
                >
                    <ChevronRight />
                </button>
            </div>
        </div>
    );
};

export default CustomerReviews;