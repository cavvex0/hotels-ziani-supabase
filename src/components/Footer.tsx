import React from "react";

function Footer() {
  const date: string = new Date().getFullYear().toString();
  return (
    <div className="bg-prime text-white py-5 ">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <p className="font-realce uppercase lg:text-xl">
          {date} <span className="text-orange-500">©</span> Tous droits
          réservés.
        </p>
      </div>
    </div>
  );
}

export default Footer;
