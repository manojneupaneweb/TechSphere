export const NewsletterSection = () => (
    <section className="py-16 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white text-center">
        <div className="container mx-auto px-6">
            <h2 className="text-4xl font-extrabold mb-4">
                Stay Updated with <span className="text-yellow-300">TechSphere</span>
            </h2>
            <p className="text-lg md:text-xl mb-8 text-gray-100">
                Subscribe to our newsletter for the latest tech news, gadgets, and exclusive offers.
            </p>
            <div className="max-w-lg mx-auto bg-white/90 backdrop-blur-lg p-3 rounded-xl shadow-lg border border-gray-200">
                <form className="flex flex-col md:flex-row gap-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        aria-label="Enter your email to subscribe"
                        className="w-full p-2 text-lg rounded-lg border-2 border-gray-300 bg-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all"
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-yellow-400 text-gray-900 text-lg font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition-all"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    </section>
);