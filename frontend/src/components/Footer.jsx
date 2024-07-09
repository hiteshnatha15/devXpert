import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 DevXpert. All rights reserved.</p>
        <nav>
          <ul className="flex justify-center space-x-4 mt-4">
            <li>
              <a href="#privacy" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#terms" className="hover:underline">
                Terms of Service
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
