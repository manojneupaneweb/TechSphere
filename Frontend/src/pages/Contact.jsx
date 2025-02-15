import React from 'react';

function Contact() {
    return (
        <div className="max-w-7xl mx-auto p-8">
            <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">Contact Us</h1>
            <p className="text-xl text-center text-gray-600 mb-6">Providing the latest gadgets and tech accessories.</p>
            <p className="text-xl text-center text-gray-600 mb-12">Your trusted tech partner.</p>

            {/* Contact Info Boxes */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-800">Email</h3>
                    <p className="text-lg text-blue-600 mt-2">
                        <a href="mailto:support@techsphere.com">support@techsphere.com</a>
                    </p>
                </div>
                <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-800">Phone</h3>
                    <p className="text-lg text-blue-600 mt-2">+1-800-123-4567</p>
                </div>
                <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-800">Address</h3>
                    <p className="text-lg text-gray-600 mt-2">123 Tech Street, Silicon Valley, CA</p>
                </div>
            </div>

            {/* Flex Table for Map and Form */}
            <div className="flex flex-col lg:flex-row gap-8 mb-12">

                {/* Contact Form */}
                <form className="lg:w-1/2 w-full bg-white p-8 rounded-lg shadow-xl">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">Get In Touch</h2>

                    <div>
                        <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name:</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Your Name"
                            required
                            className="w-full p-4 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Your Email"
                            required
                            className="w-full p-4 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-lg font-medium text-gray-700">Message:</label>
                        <textarea
                            id="message"
                            placeholder="Your Message"
                            required
                            className="w-full min-h-36 p-4 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="px-2 py-3 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Send Message
                    </button>
                </form>

                {/* Map Section */}
                <div className="lg:w-1/2 w-full h-auto rounded-lg overflow-hidden">
                    <div className="relative w-full h-full">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.9786984973326!2d-122.08114268468146!3d37.42302467982552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb6f47a27093f%3A0xc5f1c3b5b3a1a5b7!2sGoogleplex!5e0!3m2!1sen!2sus!4v1680080157952!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Contact;
