import social_links from "@/data/social-data";
import React from "react";

const SocialLinks = () => {
  return (
    <>
      {social_links.map((s, i) => (
        <li key={i}>
          <a href={s.link} target="_blank">
            <i className={s.icon}></i>
          </a>
        </li>
      ))}
    </>
  );
};

export default SocialLinks;
