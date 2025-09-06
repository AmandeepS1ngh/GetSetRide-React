import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white py-16">
      <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
          <h4 className="text-xl font-bold">GETSETRIDE</h4>
          <p className="text-gray-600 mt-4">
            Our vision is to provide convenience and help increase your sales business.
          </p>
          <div className="flex space-x-4 mt-4">
            <a className="text-gray-600 hover:text-[var(--primary-color)]" href="#">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.732 0 1.325-.593 1.325-1.325V1.325C24 .593 23.407 0 22.675 0z"></path>
              </svg>
            </a>
            <a className="text-gray-600 hover:text-[var(--primary-color)]" href="#">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.585.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"></path>
              </svg>
            </a>
            <a className="text-gray-600 hover:text-[var(--primary-color)]" href="#">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.223.085 4.934 4.934 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.213 0-.425-.015-.637A9.954 9.954 0 0024 4.593z"></path>
              </svg>
            </a>
          </div>
        </div>
        <div>
          <h5 className="font-bold">About</h5>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li><a className="hover:text-[var(--primary-color)]" href="#">How it works</a></li>
            <li><a className="hover:text-[var(--primary-color)]" href="#">Featured</a></li>
            <li><a className="hover:text-[var(--primary-color)]" href="#">Partnership</a></li>
            <li><a className="hover:text-[var(--primary-color)]" href="#">Business Relation</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold">Community</h5>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li><a className="hover:text-[var(--primary-color)]" href="#">Events</a></li>
            <li><a className="hover:text-[var(--primary-color)]" href="#">Blog</a></li>
            <li><a className="hover:text-[var(--primary-color)]" href="#">Podcast</a></li>
            <li><a className="hover:text-[var(--primary-color)]" href="#">Invite a friend</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold">Socials</h5>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li><a className="hover:text-[var(--primary-color)]" href="#">Discord</a></li>
            <li><a className="hover:text-[var(--primary-color)]" href="#">Instagram</a></li>
            <li><a className="hover:text-[var(--primary-color)]" href="#">Twitter</a></li>
            <li><a className="hover:text-[var(--primary-color)]" href="#">Facebook</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between text-gray-600 text-center md:text-left">
        <p className="mb-4 md:mb-0">©2022 Auto Fast. All rights reserved</p>
        <div className="space-x-8">
          <a className="hover:text-[var(--primary-color)]" href="#">Privacy &amp; Policy</a>
          <a className="hover:text-[var(--primary-color)]" href="#">Terms &amp; Condition</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
