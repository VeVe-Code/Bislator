import { motion } from "framer-motion";

export default function Aboutus() {
  return (
    <div className="bg-white min-h-screen">
      {/* Navbar */}
      

      {/* About Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 mt-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
              alt="IT Team"
              className="rounded-2xl shadow-lg"
            />
            <div className="absolute -bottom-6 -left-6 bg-gray-900 text-white px-6 py-4 rounded-xl shadow-xl">
              <p className="font-bold text-lg">10+ Years</p>
              <p className="text-sm">Industry Experience</p>
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About Us
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We are an in-house IT service company dedicated to delivering
              innovative technology solutions. Our mission is to help businesses
              grow by providing reliable infrastructure, cutting-edge software
              development, and 24/7 technical support.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              From cloud integration to cybersecurity, our experts ensure your
              company has the right tools to thrive in today’s digital world.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg"
              >
                <h3 className="text-2xl font-bold text-gray-900">250+</h3>
                <p className="text-gray-500 text-sm">Projects Completed</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg"
              >
                <h3 className="text-2xl font-bold text-gray-900">120+</h3>
                <p className="text-gray-500 text-sm">Happy Clients</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
