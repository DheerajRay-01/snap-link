import React from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  FaLink,
  FaLock,
  FaChartBar,
  FaFileDownload,
  FaCookieBite,
} from "react-icons/fa";
import { BiCustomize, BiTargetLock } from "react-icons/bi";
import { RiToggleLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      title: "URL Shortening",
      description: "Create clean, concise, and shareable short links instantly.",
      icon: <FaLink className="text-primary text-5xl mb-4" />,
    },
    {
      title: "QR Code Download",
      description: "Each link comes with a QR code you can download and share anywhere.",
      icon: <FaFileDownload className="text-primary text-5xl mb-4" />,
    },
    {
      title: "Link Analytics",
      description: "Track clicks, user locations, and engagement with detailed analytics.",
      icon: <FaChartBar className="text-primary text-5xl mb-4" />,
    },
    {
      title: "Password Protected Links",
      description: "Secure your links with a password for private sharing.",
      icon: <FaLock className="text-primary text-5xl mb-4" />,
    },
    {
      title: "Activate / Deactivate Links",
      description: "Easily toggle links on or off as your requirements change.",
      icon: <RiToggleLine className="text-primary text-5xl mb-4" />,
    },
    {
      title: "Custom Slugs",
      description: "Personalize your short URLs with custom slugs for branding.",
      icon: <BiCustomize className="text-primary text-5xl mb-4" />,
    },
    {
      title: "Click Limits",
      description: "Set limits on how many times a link can be accessed.",
      icon: <BiTargetLock className="text-primary text-5xl mb-4" />,
    },
    {
      title: "Login with Google",
      description: "One-click Google sign-in for a seamless and secure experience.",
      icon: <FcGoogle className="text-5xl mb-4" />,
    },
    {
      title: "Secure Cookie Sessions",
      description: "Uses HTTP-only cookies for safe and persistent user sessions.",
      icon: <FaCookieBite className="text-primary text-5xl mb-4" />,
    },
  ];

  return (
    <div className="bg-base-100 text-base-content">
      {/* Hero Section */}
      <section className="hero min-h-screen bg-gradient-to-r from-primary to-secondary text-white">
        <div className="hero-content text-center">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-6xl font-bold mb-6 logo-font">SnapLink</h1>
            <p className="text-xl mb-8">
              The ultimate link management platform: Shorten, secure, analyze,
              and share smarter.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
              className="btn btn-accent btn-lg shadow-lg"
            >
              Get Started Free
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-base-100">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-14 text-primary"
        >
          All-in-One Link Management Features
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 container mx-auto px-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.15)" }}
              transition={{ duration: 0.3 }}
              className="card bg-base-200 shadow-lg p-6 text-center rounded-lg"
            >
              <div className="flex flex-col items-center">
                {feature.icon}
                <h3 className="text-2xl font-semibold mt-4 mb-2">
                  {feature.title}
                </h3>
                <p className="text-base opacity-80">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 bg-gradient-to-r from-secondary to-primary text-center text-white"
      >
        <h2 className="text-4xl font-bold mb-6">Manage Links Like a Pro</h2>
        <p className="text-lg mb-8">
          Join SnapLink today and experience secure, seamless link management.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/login")}
          className="btn btn-accent btn-lg shadow-lg"
        >
          Start for Free
        </motion.button>
      </motion.section>
    </div>
  );
}
