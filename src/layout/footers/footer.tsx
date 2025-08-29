"use client";

import logo from "@/assets/img/logo/Retro Apparel_logo.jpeg";
import Image from "next/image";
import Link from "next/link";
import SocialLinks from "./social-links";

const footerWidget = [
  {
    id: 1,
    title: "Quick Links",
    footer__links: [
      { list: "Privacy Policy", path: "/privacy-policy" },
      { list: "Terms & Condition", path: "/terms-and-conditions" },
      { list: "Returns & Refunds", path: "/returns-and-refunds" },
    ],
  },
  {
    id: 2,
    title: "Customer Services",
    footer__links: [
      { list: "Help & Contact Us", path: "/contact" },
      { list: "Online Stores", path: "shop" },
    ],
  },
];

const Footer = ({ style_2 }: { style_2?: boolean }) => {
  return (
    <section
      className={`footer__area ${style_2 ? "box-m-15" : ""}`}
      style={{
        background: "rgba(255, 255, 255, 0.12)", // subtle green
        backdropFilter: "blur(25px) saturate(180%)",
        WebkitBackdropFilter: "blur(25px) saturate(180%)",
        borderRadius: "25px",
        boxShadow: `
          0 25px 50px rgba(0,0,0,0.35),  /* outer shadow */
          inset 0 0 25px rgba(255,255,255,0.2) /* inner glow */
        `,
        padding: "60px 0 20px 0",
        margin: "20px",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <div className="footer__widget mb-30">
              <div className="footer__widget-title mb-25">
                <Link href="/">
                  <h1 className="retro-logo">Retro Apparel</h1>
                </Link>
              </div>
              <div className="footer__widget-content">
                <div className="footer__contact">
                  <ul>
                    <li>
                      <div className="icon">
                        <i className="fal fa-map-marker-alt"></i>
                      </div>
                      <div className="text">
                        <span>
                          Outlet Address: Bailey Road 143/2, AQP Shopping Mall, 3rd
                          Floor (Opposite Fakhruddin Biriyani) New Bailey Road, Dhaka
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="icon">
                        <i className="fal fa-map-marker-alt"></i>
                      </div>
                      <div className="text">
                        <span>
                          Outlet Address: PLAZA AR, 3rd Floor, Shop 303 Dhanmondi 28,
                          Dhaka
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="icon">
                        <i className="fal fa-phone-alt"></i>
                      </div>
                      <div className="text">
                        <span>
                          WhatsApp Order:{" "}
                          <a href="tel:+8801622-534977">+8801622-534977</a>
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="icon">
                        <i className="fab fa-facebook-f"></i>
                      </div>
                      <div className="text">
                        <span>
                          Facebook Order:{" "}
                          <a
                            target="_blank"
                            href="https://www.facebook.com/Retro Apparelbd21"
                          >
                            Retro Apparel Facebook Page
                          </a>
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {footerWidget.map((item) => (
            <div key={item.id} className="col-xl-3 col-lg-3 col-md-3 col-12">
              <div className="footer__widget mb-30">
                <div className={`footer__widget-title ${item.id === 2 ? "mb-25" : ""}`}>
                  <h5>{item.title}</h5>
                </div>
                <div className="footer__widget-content">
                  <div className="footer__links">
                    <ul>
                      {item.footer__links.map((link, index) => (
                        <li key={index}>
                          <a href={`${link.path}`}>{link.list}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="footer__bottom" style={{ textAlign: "center", marginTop: "40px" }}>
          <div className="row">
            <div className="col-xl-12">
              <p style={{ color: "#000000ff" }}>
                Copyright ©{" "}
                <Link href="/">
                  <span>Retro Apparel</span>
                </Link>{" "}
                all rights reserved. Powered by{" "}
                <Link href="/">
                  <span>Retro Apparel</span>
                </Link>
              </p>
              <div style={{ marginTop: "10px" }}>
                <ul>
                  <SocialLinks />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer__widget-title h1,
        .footer__widget-title h5 {
          color: #000000ff;
        }
        .footer__widget-content a {
          color: #000000ff;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .footer__widget-content a:hover {
          color: #000000ff;
        }

        @media (max-width: 768px) {
          .footer__area {
            padding: 40px 10px;
            margin: 10px;
          }
        }
      `}</style>
    </section>
  );
};

export default Footer;