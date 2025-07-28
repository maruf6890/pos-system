import Link from 'next/link';
import React from 'react'

export default function BasicFooter() {
  return (
    <footer className="p-6 max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
      <p>Gadates Zone © 2025</p>
      <ul className="flex space-x-6 mt-3 sm:mt-0">
        <li>
          <Link href="/" className="hover:text-purple-400 transition-colors">
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link href="/" className="hover:text-purple-400 transition-colors">
            Terms & Conditions
          </Link>
        </li>
        <li>
          <Link href="/" className="hover:text-purple-400 transition-colors">
            Imprint
          </Link>
        </li>
      </ul>
    </footer>
  );
}
