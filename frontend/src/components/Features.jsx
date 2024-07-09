import React from "react";

function Features() {
  return (
    <section className="py-20 bg-gray-100 text-center">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-10">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Feature 1</h3>
            <p className="text-gray-700">Description of feature 1.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Feature 2</h3>
            <p className="text-gray-700">Description of feature 2.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Feature 3</h3>
            <p className="text-gray-700">Description of feature 3.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
