import SocialLinks from "@/layout/footers/social-links";
import ContactForm from "../forms/contact-form";

const contactInfo = [
  {
    id: 0,
    icon: "fal fa-map-marker-alt",
    title: "Outlet Address:",
    subtitle: `To Be Announced`,
  },
  // {
  //   id: 1,
  //   icon: "fal fa-map-marker-alt",
  //   title: "Outlet Address:",
  //   subtitle: `PLAZA AR, 3rd Floor, Shop 303 Dhanmondi 28, Dhaka`,
  // },
  // {
  //   icon: "fal fa-envelope-open-text",
  //   title: "Email:",
  //   subtitle: "admin@strike.com",
  // },
  {
    id: 2,
    icon: "fal fa-phone-alt",
    title: "WhatsApp Order:",
    subtitle: "+8801861955603",
  },
];

const ContactArea = () => {
  return (
    <>
      <section className="contact__area pb-100 pt-95">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6">
              <div className="contact__info">
                <h3>Find us here.</h3>
                <ul className="mb-55">
                  {contactInfo.map((item) => (
                    <li key={item.title} className="d-flex mb-35">
                      <div className="contact__info-icon mr-20">
                        <i className={item.icon}></i>
                      </div>
                      <div className="contact__info-content">
                        <h6>{item.title}</h6>
                        {item?.id === 2 ? (
                          <a href={`tel:${item?.subtitle}`}>{item?.subtitle}</a>
                        ) : (
                          <span>{item.subtitle}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
                {/* <p>
                  Ecomm is a premium Templates theme with advanced admin module.
                  It’s extremely customizable, easy to use and fully responsive
                  and retina ready. Vel illum dolore eu feugiat nulla facilisis
                  at vero eros et accumsan et iusto odio dignissim qui blandit
                  praesent luptatum zzril delenit augue duis dolore te feugait
                  nulla facilisi.
                </p> */}

                {/* <div className="contact__social">
                  <ul>
                    <SocialLinks />
                  </ul>
                </div> */}
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="contact__form">
                <h3>Contact Us.</h3>
                {/* contact form stat */}
                <ContactForm />
                {/* contact form stat */}
                <p className="ajax-response"></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactArea;
