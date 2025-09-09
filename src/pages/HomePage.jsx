import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="text-xl font-bold text-gray-800">Logo</div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="#" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">
                    Home
                  </a>
                  <a href="#" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">
                    About
                  </a>
                  <a href="#" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">
                    Services
                  </a>
                  <a href="#" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">
                    Contact
                  </a>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button type="button" className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                <span className="sr-only">Open main menu</span>
                {/* Icon when menu is closed */}
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
                {/* Icon when menu is open */}
                {/* <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg> */}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium">
              Home
            </a>
            <a href="#" className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium">
              About
            </a>
            <a href="#" className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium">
              Services
            </a>
            <a href="#" className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Section 1 */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Welcome to Our Website</h2>
          <p className="text-gray-700 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Learn More</button>
        </div>

        {/* Section 2 */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-700 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">View Services</button>
        </div>

        {/* Section 3 */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-700 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Contact Us</button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="text-gray-800">© 2024 Company Name. All rights reserved.</div>
            <div className="space-x-4">
              <a href="#" className="text-gray-800 hover:text-gray-600">Privacy Policy</a>
              <a href="#" className="text-gray-800 hover:text-gray-600">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
