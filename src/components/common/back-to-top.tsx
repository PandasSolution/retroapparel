'use client'
import React, { useEffect } from "react";

const BackToTop = () => {
  useEffect(() => {
    const result = document.querySelector(".scroll-up") as HTMLElement;
    if (result) {
      document.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
          result.classList.add('d-block');
          result.classList.remove('d-none');
        } else {
          result.classList.remove('d-block');
          result.classList.add('d-none');
        }
      });
      result.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }, []);
  return (
    <div className="scroll-up d-none" id="scroll">
      <a className="cursor-pointer">
        <i className="fas fa-level-up-alt"></i>
      </a>
    </div>
  );
};

export default BackToTop;
