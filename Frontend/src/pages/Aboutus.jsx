import { ShieldCheck, Headphones, Zap, Globe, Leaf, Heart } from "lucide-react";

export default function Aboutus() {
    return (
        <div className="min-h-screen bg-white px-20">
            <main>
                

                {/* Our Story */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                                <p className="text-gray-700 mb-4">
                                    Founded in 2010, TechSphere began as a small online store operated out of a garage by two tech
                                    enthusiasts who were frustrated with the lack of quality tech products at reasonable prices.
                                </p>
                                <p className="text-gray-700 mb-4">
                                    What started as a passion project quickly grew into a thriving business as customers responded to our
                                    commitment to quality, fair pricing, and exceptional customer service. Within three years, we expanded
                                    to our first physical store, and today we operate in 15 locations across the country while maintaining
                                    a strong online presence.
                                </p>
                                <p className="text-gray-700">
                                    Our mission remains the same: to provide cutting-edge technology that enhances people's lives, backed
                                    by knowledgeable support and fair prices. We believe technology should be accessible to everyone, and
                                    we work tirelessly to make that vision a reality.
                                </p>
                            </div>
                            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                                <img
                                    src="/placeholder.svg?height=400&width=600"
                                    alt="TechSphere Founders"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Values */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
                            <p className="text-gray-700 max-w-2xl mx-auto">
                                At TechSphere, our values guide everything we do. They shape our culture, inform our decisions, and help us
                                deliver the best possible experience to our customers.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="w-12 h-12 bg-[#8a0106]/10 rounded-full flex items-center justify-center mb-4">
                                    <ShieldCheck className="h-6 w-6 text-[#8a0106]" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Quality & Trust</h3>
                                <p className="text-gray-700">
                                    We stand behind every product we sell. Quality is non-negotiable, and we build trust through
                                    transparency and honesty in all our interactions.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="w-12 h-12 bg-[#8a0106]/10 rounded-full flex items-center justify-center mb-4">
                                    <Headphones className="h-6 w-6 text-[#8a0106]" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Customer First</h3>
                                <p className="text-gray-700">
                                    Our customers are at the heart of everything we do. We listen, adapt, and go the extra mile to ensure
                                    an exceptional experience at every touchpoint.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="w-12 h-12 bg-[#8a0106]/10 rounded-full flex items-center justify-center mb-4">
                                    <Zap className="h-6 w-6 text-[#8a0106]" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                                <p className="text-gray-700">
                                    We embrace change and continuously seek better ways to serve our customers. Innovation drives us
                                    forward and keeps us at the cutting edge of technology.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="w-12 h-12 bg-[#8a0106]/10 rounded-full flex items-center justify-center mb-4">
                                    <Globe className="h-6 w-6 text-[#8a0106]" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Accessibility</h3>
                                <p className="text-gray-700">
                                    We believe technology should be accessible to everyone. We work to break down barriers through fair
                                    pricing, education, and inclusive design.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="w-12 h-12 bg-[#8a0106]/10 rounded-full flex items-center justify-center mb-4">
                                    <Leaf className="h-6 w-6 text-[#8a0106]" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Sustainability</h3>
                                <p className="text-gray-700">
                                    We're committed to reducing our environmental impact through responsible sourcing, eco-friendly
                                    packaging, and energy-efficient operations.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="w-12 h-12 bg-[#8a0106]/10 rounded-full flex items-center justify-center mb-4">
                                    <Heart className="h-6 w-6 text-[#8a0106]" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Community</h3>
                                <p className="text-gray-700">
                                    We actively contribute to the communities we serve through volunteer work, donations, and educational
                                    initiatives that promote digital literacy.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Key Milestones */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-12 text-center">Our Journey</h2>

                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>

                            <div className="space-y-12">
                                <div className="relative">
                                    <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-6 h-6 rounded-full border-4 border-[#8a0106] bg-white"></div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="md:text-right md:pr-12">
                                            <h3 className="text-xl font-bold text-[#8a0106]">2010</h3>
                                            <h4 className="text-lg font-medium mb-2">The Beginning</h4>
                                            <p className="text-gray-700">
                                                TechSphere was founded by two tech enthusiasts in a small garage, selling refurbished laptops and
                                                smartphones online.
                                            </p>
                                        </div>
                                        <div className="md:pl-12">
                                            <img
                                                src="/placeholder.svg?height=200&width=300"
                                                alt="TechSphere Founding"
                                                className="object-cover w-full h-full rounded-lg"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-6 h-6 rounded-full border-4 border-[#8a0106] bg-white"></div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="md:order-1 order-2">
                                            <div className="relative h-48 rounded-lg overflow-hidden">
                                                <img
                                                    src="/placeholder.svg?height=200&width=300"
                                                    alt="First Physical Store"
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="md:pl-12 md:order-2 order-1 md:text-left text-right">
                                            <h3 className="text-xl font-bold text-[#8a0106]">2013</h3>
                                            <h4 className="text-lg font-medium mb-2">First Physical Store</h4>
                                            <p className="text-gray-700">
                                                After rapid online growth, we opened our first physical retail location, offering hands-on
                                                experience with the latest tech products.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-6 h-6 rounded-full border-4 border-[#8a0106] bg-white"></div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="md:text-right md:pr-12">
                                            <h3 className="text-xl font-bold text-[#8a0106]">2016</h3>
                                            <h4 className="text-lg font-medium mb-2">National Expansion</h4>
                                            <p className="text-gray-700">
                                                TechSphere expanded to 5 stores nationwide and launched our premium customer service program,
                                                TechCare.
                                            </p>
                                        </div>
                                        <div className="md:pl-12">
                                            <div className="relative h-48 rounded-lg overflow-hidden">
                                                <img
                                                    src="/placeholder.svg?height=200&width=300"
                                                    alt="National Expansion"
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-6 h-6 rounded-full border-4 border-[#8a0106] bg-white"></div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="md:order-1 order-2">
                                            <div className="relative h-48 rounded-lg overflow-hidden">
                                                <img
                                                    src="/placeholder.svg?height=200&width=300"
                                                    alt="Sustainability Initiative"
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="md:pl-12 md:order-2 order-1 md:text-left text-right">
                                            <h3 className="text-xl font-bold text-[#8a0106]">2019</h3>
                                            <h4 className="text-lg font-medium mb-2">Sustainability Initiative</h4>
                                            <p className="text-gray-700">
                                                We launched our comprehensive sustainability program, reducing packaging waste by 40% and
                                                implementing energy-efficient practices across all locations.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-6 h-6 rounded-full border-4 border-[#8a0106] bg-white"></div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="md:text-right md:pr-12">
                                            <h3 className="text-xl font-bold text-[#8a0106]">Today</h3>
                                            <h4 className="text-lg font-medium mb-2">Leading the Industry</h4>
                                            <p className="text-gray-700">
                                                With 15 stores nationwide and a thriving online presence, TechSphere continues to lead the industry
                                                in customer satisfaction and technological innovation.
                                            </p>
                                        </div>
                                        <div className="md:pl-12">
                                            <div className="relative h-48 rounded-lg overflow-hidden">
                                                <img
                                                    src="/placeholder.svg?height=200&width=300"
                                                    alt="TechSphere Today"
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">Meet Our Leadership</h2>
                            <p className="text-gray-700 max-w-2xl mx-auto">
                                Our diverse team of experts is passionate about technology and committed to delivering an exceptional
                                experience for our customers.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { name: "Sarah Johnson", title: "CEO & Co-Founder" },
                                { name: "Michael Chen", title: "CTO & Co-Founder" },
                                { name: "David Rodriguez", title: "Chief Operations Officer" },
                                { name: "Emily Williams", title: "Chief Marketing Officer" },
                                { name: "James Wilson", title: "VP of Product Development" },
                                { name: "Aisha Patel", title: "VP of Customer Experience" },
                                { name: "Robert Kim", title: "VP of Retail Operations" },
                                { name: "Olivia Martinez", title: "VP of E-Commerce" },
                            ].map((member, index) => (
                                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
                                    <div className="relative h-64">
                                        <img
                                            src={`/placeholder.svg?height=300&width=300`}
                                            alt={member.name}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-xl font-bold">{member.name}</h3>
                                        <p className="text-gray-600">{member.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-16 bg-[#8a0106] text-white">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-4 gap-8 text-center">
                            <div>
                                <div className="text-4xl font-bold mb-2">15+</div>
                                <p className="text-white/80">Retail Locations</p>
                            </div>
                            <div>
                                <div className="text-4xl font-bold mb-2">500K+</div>
                                <p className="text-white/80">Happy Customers</p>
                            </div>
                            <div>
                                <div className="text-4xl font-bold mb-2">10K+</div>
                                <p className="text-white/80">Products Available</p>
                            </div>
                            <div>
                                <div className="text-4xl font-bold mb-2">98%</div>
                                <p className="text-white/80">Customer Satisfaction</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
                            <p className="text-gray-700 max-w-2xl mx-auto">
                                Don't just take our word for it. Here's what our customers have to say about their TechSphere experience.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    name: "John D.",
                                    location: "New York, NY",
                                    quote: "TechSphere has been my go-to tech store for years. Their knowledgeable staff always helps me find exactly what I need, and their prices are unbeatable.",
                                },
                                {
                                    name: "Maria S.",
                                    location: "Chicago, IL",
                                    quote: "I was hesitant to buy a laptop online, but TechSphere's detailed product information and helpful customer service made the process easy and stress-free.",
                                },
                                {
                                    name: "Robert T.",
                                    location: "Los Angeles, CA",
                                    quote: "The TechCare warranty program has saved me multiple times. When my phone screen cracked, they had it fixed within hours. Incredible service!",
                                },
                            ].map((testimonial, index) => (
                                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                                    <div className="flex items-center mb-4">
                                        <div className="mr-4">
                                            <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                                                <img
                                                    src={`/placeholder.svg?height=50&width=50`}
                                                    alt={testimonial.name}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-bold">{testimonial.name}</h4>
                                            <p className="text-gray-600 text-sm">{testimonial.location}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}