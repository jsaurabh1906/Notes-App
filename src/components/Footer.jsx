import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bottom-0 bg-indigo-900 text-white px-8 py-4 text-center">
      <p>Copyright © {year} - All rights reserved</p>
    </footer>
  );
};

export default Footer;
