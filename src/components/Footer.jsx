import React from "react";

export default function Footer() {
  return (
    <footer className="flex justify-center bg-secondry mt-28 w-full">
      <div className="flex justify-center mx-5 2xl:mx-0">
        <div className=" text-white py-10  px-5 md:px-0">
          <div className=" mx-auto text-center">
            <h2 className="text-5xl font-bold mb-4">Plan Your Stay</h2>
            <p className="text-lg mb-8">
              Subscribe to our newsletter for exclusive deals and updates
            </p>

            <div className="border-t border-gray-700 py-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Headquarters</h3>
                  <p>456 Hotel Avenue</p>
                  <p>Los Angeles, CA 90001</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Get in Touch</h3>
                  <p>contact</p>
                  <p>+1 800 555 1234</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
                  <p>Instagram</p>
                  <p>Facebook</p>
                  <p>Twitter</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
                  <p>About Us</p>
                  <p>FAQs</p>
                  <p>Privacy Policy</p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex justify-center items-center mb-4 ">
                <ion-icon name="invert-mode-outline"></ion-icon>
                <span className="font-bold text-xl pl-2">StayEase</span>
              </div>
              <p className="text-sm text-gray-500">
                Copyright ©StayEase | Designed by Shamil - Powered by MERN
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
