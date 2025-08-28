import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/About-us", label: "About us" },
    { to: "/services", label: "Services" },
    { to: "/dailynews", label: "News" },
    { to: "/Contact-us", label: "Contact us" },
  ];

  // parent animation (nav wrapper)
  const navVariants = {
    hidden: { opacity: 0, scaleX: 0 },
    visible: {
      opacity: 1,
      scaleX: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2, // animate left + right separately
      },
    },
  };

  // child animations
  const leftVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <div>
      <motion.div
        variants={navVariants}
        initial="hidden"
        animate="visible"
        style={{ transformOrigin: "center" }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
      >
        {/* Floating Glass Navbar */}
        <nav className="bg-[#f8f9fa]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg px-6 py-3 flex items-center justify-between w-[90vw] md:w-[70vw] text-black">
          
          {/* Logo (Left side) */}
          <motion.div
            variants={leftVariants}
            className="text-2xl font-extrabold tracking-wide flex items-center"
          >
            <Link
              to="/"
              className="flex items-center space-x-2 text-shadow-neutral-900 hover:text-neutral-950 transition"
            >
              <img
                src="/logo.png"
                className="w-20 h-20 rounded-xl object-contain"
                alt="Logo"
              />
            </Link>
          </motion.div>

          {/* Desktop Menu (Right side) */}
          <motion.div
            variants={rightVariants}
            className="hidden md:flex space-x-8"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative group"
              >
                {link.label}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </motion.div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              <motion.svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </motion.svg>
            </button>
          </div>
        </nav>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4 }}
              className="fixed top-0 right-0 h-screen w-3/4 bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white shadow-lg flex flex-col items-start px-6 py-10 space-y-6 md:hidden"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-lg hover:text-cyan-400 transition"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
