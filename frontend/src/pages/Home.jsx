import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen mt-24 bg-white text-gray-900">

    
    

      {/* Hero */}
      <section className="px-8 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold"
        >
          Boosts The <span className="text-blue-600">Credibility</span> of Your Brand
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-4 text-gray-500 max-w-xl mx-auto"
        >
          If you can get your customers to not just like your product, but also trust your brand.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-6 flex justify-center gap-4"
        >
      
        
        </motion.div>
      </section>

      {/* Features */}
      <section className="px-8 py-16 bg-gray-50">
        <h2 className="text-2xl font-semibold text-center mb-12">Features</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { title: "Fast Build", desc: "Construction is carried out by experts in accordance with the specified time." },
            { title: "Mature Concept", desc: "Prepared to the contents of each room and the furniture." },
            { title: "Futuristic Building", desc: "Buildings with futuristic and modern models for clients." },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="p-6 bg-white shadow rounded-lg text-center"
            >
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-500 mt-2">{feature.desc}</p>
              <a href="#" className="text-blue-600 mt-3 inline-block">Read more</a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Properties */}
      <section className="px-8 py-16">
        <h2 className="text-2xl font-semibold text-center mb-8">Our Property</h2>
        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {["Minimalist Office", "Luxury Room", "Meeting Living Room", "Private Meeting"].map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white shadow rounded-lg p-4 hover:shadow-lg"
            >
              <h3 className="font-semibold">{p}</h3>
              <p className="text-gray-500 text-sm mt-1">Lorem ipsum dolor sit amet.</p>
              <a href="#" className="text-blue-600 mt-2 inline-block">See More</a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CEO */}
      <section className="px-8 py-20 flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto">
        <motion.img
          src="pf.jpg"
          alt="CEO"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-full shadow-lg w-48 h-48 object-cover"
        />
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold">CEO name</h3>
          <p className="text-gray-500 mb-4">CEO of Company</p>
          <p className="text-gray-600">Created to describe the product or brand itself and cannot be changed because it will continue to be used as long as the brand lives.</p>
        
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-blue-950 text-center">
        <p className="text-gray-500">&copy; 2025 company. All rights reserved.</p>
      </footer>
    </div>
  );
}
