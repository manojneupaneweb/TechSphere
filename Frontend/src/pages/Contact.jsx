import React from "react";
import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general",
    preferredContact: "email",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user selects
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Here you would typically send the data to your backend
      console.log("Form submitted:", formData);
      setIsSubmitted(true);

      // Reset form after submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        inquiryType: "general",
        preferredContact: "email",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-20">
      <main>
        {/* Hero Section */}
        <section className="bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
              <p className="text-lg text-gray-600 mb-6">
                Have questions or need assistance? We're here to help. Reach out to our team through any of the channels
                below.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-[#8a0106] hover:bg-[#6d0105] text-white px-4 py-2 rounded flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Live Chat
                </button>
                <button className="border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Us
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm flex">
                <div className="mr-4">
                  <div className="w-12 h-12 bg-[#8a0106]/10 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-[#8a0106]" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Visit Us</h3>
                  <p className="text-gray-600 text-sm">
                    123 Tech Street
                    <br />
                    San Francisco, CA 94107
                    <br />
                    United States
                  </p>
                  <a href="#" className="text-[#8a0106] text-sm font-medium mt-2 inline-block hover:underline">
                    View on Map
                  </a>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm flex">
                <div className="mr-4">
                  <div className="w-12 h-12 bg-[#8a0106]/10 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-[#8a0106]" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Call Us</h3>
                  <p className="text-gray-600 text-sm">
                    Customer Support:
                    <br />
                    <a href="tel:+18001234567" className="hover:text-[#8a0106]">
                      +1 (800) 123-4567
                    </a>
                    <br />
                    Sales Inquiries:
                    <br />
                    <a href="tel:+18009876543" className="hover:text-[#8a0106]">
                      +1 (800) 987-6543
                    </a>
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm flex">
                <div className="mr-4">
                  <div className="w-12 h-12 bg-[#8a0106]/10 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-[#8a0106]" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Email Us</h3>
                  <p className="text-gray-600 text-sm">
                    Customer Support:
                    <br />
                    <a href="mailto:support@techsphere.com" className="hover:text-[#8a0106]">
                      support@techsphere.com
                    </a>
                    <br />
                    Sales Inquiries:
                    <br />
                    <a href="mailto:sales@techsphere.com" className="hover:text-[#8a0106]">
                      sales@techsphere.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm flex">
                <div className="mr-4">
                  <div className="w-12 h-12 bg-[#8a0106]/10 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-[#8a0106]" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Hours</h3>
                  <p className="text-gray-600 text-sm">
                    Monday - Friday:
                    <br />
                    9:00 AM - 8:00 PM EST
                    <br />
                    Saturday - Sunday:
                    <br />
                    10:00 AM - 6:00 PM EST
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form and Map */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Contact Form */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

                {isSubmitted ? (
                  <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Send className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Message Sent Successfully!</h3>
                    <p className="mb-4">
                      Thank you for contacting us. We've received your message and will respond to you shortly.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="bg-[#8a0106] hover:bg-[#6d0105] text-white px-4 py-2 rounded"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8a0106] focus:ring-[#8a0106] sm:text-sm ${errors.name ? "border-red-500" : ""}`}
                        />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8a0106] focus:ring-[#8a0106] sm:text-sm ${errors.email ? "border-red-500" : ""}`}
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Phone Number (Optional)
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8a0106] focus:ring-[#8a0106] sm:text-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                          Subject <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="subject"
                          name="subject"
                          type="text"
                          value={formData.subject}
                          onChange={handleChange}
                          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8a0106] focus:ring-[#8a0106] sm:text-sm ${errors.subject ? "border-red-500" : ""}`}
                        />
                        {errors.subject && <p className="text-red-500 text-xs">{errors.subject}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700">
                        Inquiry Type
                      </label>
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={(e) => handleSelectChange("inquiryType", e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8a0106] focus:ring-[#8a0106] sm:text-sm"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="sales">Sales Question</option>
                        <option value="returns">Returns & Refunds</option>
                        <option value="feedback">Feedback</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8a0106] focus:ring-[#8a0106] sm:text-sm ${errors.message ? "border-red-500" : ""}`}
                      />
                      {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Preferred Contact Method
                      </label>
                      <div className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="contact-email"
                            name="preferredContact"
                            value="email"
                            checked={formData.preferredContact === "email"}
                            onChange={() => handleSelectChange("preferredContact", "email")}
                            className="h-4 w-4 text-[#8a0106] focus:ring-[#8a0106] border-gray-300"
                          />
                          <label htmlFor="contact-email" className="text-sm font-normal text-gray-700">
                            Email
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="contact-phone"
                            name="preferredContact"
                            value="phone"
                            checked={formData.preferredContact === "phone"}
                            onChange={() => handleSelectChange("preferredContact", "phone")}
                            className="h-4 w-4 text-[#8a0106] focus:ring-[#8a0106] border-gray-300"
                          />
                          <label htmlFor="contact-phone" className="text-sm font-normal text-gray-700">
                            Phone
                          </label>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#8a0106] hover:bg-[#6d0105] text-white px-4 py-2 rounded"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>

              {/* Map and Store Locations */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Our Locations</h2>

                <div className="relative h-[300px] rounded-lg overflow-hidden mb-6">
                  <img
                    src="/placeholder.svg"
                    alt="Map of TechSphere locations"
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="w-full">
                  <div className="mb-4">
                    <button className="w-full flex justify-between items-center py-3 px-4 bg-gray-100 rounded-lg">
                      <span>West Coast Locations</span>
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="p-4 space-y-4">
                      <div className="flex">
                        <MapPin className="h-5 w-5 text-[#8a0106] mr-2 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">San Francisco (Flagship)</h4>
                          <p className="text-sm text-gray-600">
                            123 Tech Street, San Francisco, CA 94107
                            <br />
                            Phone: (415) 555-1234
                            <br />
                            Hours: Mon-Sat 9AM-8PM, Sun 10AM-6PM
                          </p>
                        </div>
                      </div>

                      <div className="flex">
                        <MapPin className="h-5 w-5 text-[#8a0106] mr-2 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">Los Angeles</h4>
                          <p className="text-sm text-gray-600">
                            456 Digital Ave, Los Angeles, CA 90001
                            <br />
                            Phone: (213) 555-5678
                            <br />
                            Hours: Mon-Sat 9AM-8PM, Sun 10AM-6PM
                          </p>
                        </div>
                      </div>

                      <div className="flex">
                        <MapPin className="h-5 w-5 text-[#8a0106] mr-2 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">Seattle</h4>
                          <p className="text-sm text-gray-600">
                            789 Innovation Blvd, Seattle, WA 98101
                            <br />
                            Phone: (206) 555-9012
                            <br />
                            Hours: Mon-Sat 9AM-8PM, Sun 10AM-6PM
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <button className="w-full flex justify-between items-center py-3 px-4 bg-gray-100 rounded-lg">
                      <span>Midwest Locations</span>
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="p-4 space-y-4">
                      <div className="flex">
                        <MapPin className="h-5 w-5 text-[#8a0106] mr-2 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">Chicago</h4>
                          <p className="text-sm text-gray-600">
                            321 Gadget Lane, Chicago, IL 60601
                            <br />
                            Phone: (312) 555-3456
                            <br />
                            Hours: Mon-Sat 9AM-8PM, Sun 10AM-6PM
                          </p>
                        </div>
                      </div>

                      <div className="flex">
                        <MapPin className="h-5 w-5 text-[#8a0106] mr-2 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">Minneapolis</h4>
                          <p className="text-sm text-gray-600">
                            654 Circuit Road, Minneapolis, MN 55401
                            <br />
                            Phone: (612) 555-7890
                            <br />
                            Hours: Mon-Sat 9AM-8PM, Sun 10AM-6PM
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <button className="w-full flex justify-between items-center py-3 px-4 bg-gray-100 rounded-lg">
                      <span>East Coast Locations</span>
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="p-4 space-y-4">
                      <div className="flex">
                        <MapPin className="h-5 w-5 text-[#8a0106] mr-2 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">New York</h4>
                          <p className="text-sm text-gray-600">
                            987 Pixel Plaza, New York, NY 10001
                            <br />
                            Phone: (212) 555-2345
                            <br />
                            Hours: Mon-Sat 9AM-8PM, Sun 10AM-6PM
                          </p>
                        </div>
                      </div>

                      <div className="flex">
                        <MapPin className="h-5 w-5 text-[#8a0106] mr-2 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">Boston</h4>
                          <p className="text-sm text-gray-600">
                            654 Byte Boulevard, Boston, MA 02108
                            <br />
                            Phone: (617) 555-6789
                            <br />
                            Hours: Mon-Sat 9AM-8PM, Sun 10AM-6PM
                          </p>
                        </div>
                      </div>

                      <div className="flex">
                        <MapPin className="h-5 w-5 text-[#8a0106] mr-2 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">Miami</h4>
                          <p className="text-sm text-gray-600">
                            321 Tech Terrace, Miami, FL 33101
                            <br />
                            Phone: (305) 555-0123
                            <br />
                            Hours: Mon-Sat 9AM-8PM, Sun 10AM-6PM
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
              <p className="text-gray-600">
                Find quick answers to common questions about contacting us and our services.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="w-full">
                <div className="mb-4">
                  <button className="w-full flex justify-between items-center py-3 px-4 bg-white rounded-lg shadow-sm">
                    <span>What are your customer service hours?</span>
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="p-4 bg-white mt-1 rounded-b-lg">
                    Our customer service team is available Monday through Friday from 9:00 AM to 8:00 PM EST, and on
                    weekends from 10:00 AM to 6:00 PM EST. For urgent matters outside these hours, please use our 24/7
                    chat support on our website.
                  </div>
                </div>

                <div className="mb-4">
                  <button className="w-full flex justify-between items-center py-3 px-4 bg-white rounded-lg shadow-sm">
                    <span>How quickly can I expect a response to my inquiry?</span>
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="p-4 bg-white mt-1 rounded-b-lg">
                    We strive to respond to all inquiries within 24 hours during business days. For urgent matters, we
                    recommend calling our customer service line or using our live chat feature for immediate assistance.
                  </div>
                </div>

                <div className="mb-4">
                  <button className="w-full flex justify-between items-center py-3 px-4 bg-white rounded-lg shadow-sm">
                    <span>Do you offer technical support for products purchased elsewhere?</span>
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="p-4 bg-white mt-1 rounded-b-lg">
                    While our primary focus is supporting products purchased from TechSphere, our technical team can
                    provide general guidance for most tech products. For comprehensive support on products purchased
                    elsewhere, we offer our TechCare service at competitive rates.
                  </div>
                </div>

                <div className="mb-4">
                  <button className="w-full flex justify-between items-center py-3 px-4 bg-white rounded-lg shadow-sm">
                    <span>How can I check the status of my order or repair?</span>
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="p-4 bg-white mt-1 rounded-b-lg">
                    You can check the status of your order or repair by logging into your TechSphere account and
                    navigating to the "Orders" or "Repairs" section. Alternatively, you can contact our customer service
                    team with your order/repair number for an update.
                  </div>
                </div>

                <div>
                  <button className="w-full flex justify-between items-center py-3 px-4 bg-white rounded-lg shadow-sm">
                    <span>Do you have international customer support?</span>
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="p-4 bg-white mt-1 rounded-b-lg">
                    Yes, we offer international customer support via email and our website's live chat feature. Please
                    note that our phone support is primarily for customers in North America, though we do have dedicated
                    international lines for select countries.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Stay updated with our latest products, tech tips, and exclusive offers by following us on social media.
            </p>

            <div className="flex justify-center space-x-6">
              <a
                href="#"
                className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#8a0106] hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#8a0106] hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#8a0106] hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#8a0106] hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#8a0106] hover:text-white transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-12 bg-[#8a0106] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
              <p className="text-white/80 mb-6">
                Subscribe to our newsletter for the latest product announcements, tech tips, and exclusive offers.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:border-white rounded-md px-4 py-2"
                />
                <button className="bg-white text-[#8a0106] hover:bg-white/90 px-4 py-2 rounded-md">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}