import React from "react";

function Hero() {
  return (
    <section className="bg-blue-600 text-white text-center py-20">
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold mb-4">Welcome to DevXpert</h1>
        <p className="text-xl mb-6">
          Your platform to practice and master coding skills.
        </p>
        <a
          href="#get-started"
          className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}

export default Hero;
