import type { ReactNode } from "react";
import { getCategories, getWebsiteSettings } from "@/lib/queries";

const fallbackPhone = "+971 52 699 3834";

function asset(path: string | null | undefined, folder: string) {
  return path ? `/storage/${folder}/${path}` : "";
}

export async function SiteLayout({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  const [settings, parentCategories] = await Promise.all([
    getWebsiteSettings(),
    getCategories(),
  ]);

  const phone = settings.phone || "+971 4 602 3555";
  const whatsapp = settings.phone1 || fallbackPhone;
  const logo = asset(settings.logo_white || settings.logo, "settings");

  return (
    <>
      <section className="top-header p-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-12 col-12 text-end">
              <div className="leftCont d-flex justify-content-end py-1">
                <a className="px-2" href="#preferences">
                  AED&nbsp; | &nbsp;Sqft
                </a>
                <a className="contNum me-2 my-auto px-2 text-decoration-none border-start ps-2" href={`tel:${phone}`}>
                  <i className="fa fa-phone" aria-hidden="true" /> {phone}
                </a>
                <a
                  className="contNum me-2 my-auto px-2 text-decoration-none border-start ps-2"
                  href={`https://api.whatsapp.com/send?phone=${whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fa fa-whatsapp" aria-hidden="true" /> {whatsapp}
                </a>
                <a className="btn btn-outline-sm color-white btn-style" href="/contact-us">
                  List Your Property
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="header-section sticky-top">
        <div className="container main-div">
          <div className="row">
            <div className="col-2">
              <div className="logo">
                <a className="navbar-brand" href="/">
                  {logo ? (
                    <img src={logo} alt="SNH Homes" />
                  ) : (
                    <span className="text-white">SNH Homes</span>
                  )}
                </a>
              </div>
            </div>
            <div className="col-10">
              <nav role="navigation">
                <a href="#menu" className="ic menu" tabIndex={1} aria-label="Open menu" aria-expanded="false">
                  <span className="line" />
                  <span className="line" />
                  <span className="line" />
                </a>
                <ul className="main-nav">
                  {parentCategories
                    .filter((category) => category.id !== 6)
                    .map((category) => (
                      <li className="top-level-link" key={category.id}>
                        <a href={`/properties/${category.slug}`}>
                          <span>{category.title}</span>
                        </a>
                      </li>
                    ))}
                  <li className="top-level-link">
                    <a href="/properties/projects">
                      <span>Projects</span>
                    </a>
                  </li>
                  <li className="top-level-link">
                    <a href="/holiday-homes">
                      <span>Holiday Homes</span>
                    </a>
                  </li>
                  <li className="top-level-link">
                    <a href="/about-us">
                      <span>About Us</span>
                    </a>
                  </li>
                  <li className="top-level-link">
                    <a href="/services">
                      <span>Services</span>
                    </a>
                  </li>
                  <li className="top-level-link">
                    <a href="/blogs">
                      <span>News</span>
                    </a>
                  </li>
                  <li className="top-level-link">
                    <a className="color-white btn-style" href="/contact-us">
                      List Your Property
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <main data-page-title={title}>{children}</main>

      <section className="newsletter-footer">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-6 order-md-1 order-2">
              <form className="news-form" method="post" action="/api/subscribe">
                <h2 className="heading my-3">Newsletter</h2>
                <p>
                  Unleash the Power of Real Estate with Our Inspiring Newsletter! Stay Informed and Empowered on Your
                  Journey to Success.
                </p>
                <div className="form-group mb-4">
                  <input type="text" name="name" placeholder="Your Name" className="form-control" required />
                </div>
                <div className="form-group mb-4">
                  <input type="email" name="email" placeholder="Enter Email" className="form-control" required />
                </div>
                <button type="submit" className="btn btn-submit btn-style">
                  Subscribe Now
                </button>
              </form>
            </div>
            <div className="col-md-6 order-md-2 order-1">
              <img className="img-fluid" src="/frontend/images/newsletter-img.webp" alt="SNH Homes newsletter" />
            </div>
          </div>
        </div>
      </section>

      <div className="bottom-fix">
        <ul>
          <li>
            <a href={`https://api.whatsapp.com/send?phone=${whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">
              <img src="/frontend/images/whatsapp-icon.webp" alt="WhatsApp" />
            </a>
            <p>WhatsApp</p>
          </li>
          <li>
            <a href={`tel:${phone}`}>
              <img src="/frontend/images/phone-icon.webp" alt="Call" />
            </a>
            <p>Call</p>
          </li>
          <li>
            <a href={`mailto:${settings.email1 || "info@snhhomes.com"}`}>
              <img src="/frontend/images/email-icon.webp" alt="Email" />
            </a>
            <p>Email</p>
          </li>
        </ul>
      </div>

      <footer id="contact-us">
        <div className="container footer-main">
          <div className="row">
            <div className="col-12 col-lg-3 col-md-6">
              <div className="footer-logo text-center p-2" style={{ backgroundColor: "white", borderRadius: 25 }}>
                {settings.logo ? (
                  <img src={asset(settings.logo, "settings")} alt="SNH Homes" style={{ width: "65%" }} />
                ) : (
                  <h2 className="text-dark py-2">SNH Homes</h2>
                )}
                <h4 className="text-dark py-2" style={{ fontWeight: 500 }}>
                  Experts in Real Estate Dubai
                </h4>
                <p className="text-dark py-2" style={{ fontWeight: 500, lineHeight: "normal" }}>
                  We help you find the finest residential and commercial properties from the top developers.
                </p>
                <div className="social-icons">
                  <ul className="d-flex justify-content-center">
                    <li>
                      <a href={settings.facebook_link || "https://www.facebook.com"} target="_blank" rel="noreferrer" aria-label="Facebook">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1Z" /></svg>
                      </a>
                    </li>
                    <li>
                      <a href={settings.insta_link || "https://www.instagram.com"} target="_blank" rel="noreferrer" aria-label="Instagram">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm8 2H8a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3Zm-4 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2Zm0 1.8a2 2 0 1 0 2 2 2 2 0 0 0-2-2Zm4.6-2.7a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z" /></svg>
                      </a>
                    </li>
                    <li>
                      <a href={settings.linkedin_link || "https://www.linkedin.com"} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 9H4v11h2.5V9ZM5.2 3.5A1.6 1.6 0 1 0 5.2 6.7 1.6 1.6 0 0 0 5.2 3.5ZM20 20h-2.5v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V20H11V9h2.4v1.5h.1c.3-.6 1.2-1.3 2.5-1.3 2.7 0 3.2 1.8 3.2 4.1V20Z" /></svg>
                      </a>
                    </li>
                    <li>
                      <a href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3Zm5.2 12.7c-.2.6-1.2 1.1-1.7 1.2-.4.1-1 .1-1.6-.1-.4-.1-.8-.3-1.4-.5-2.5-1.1-4.1-3.6-4.2-3.8-.1-.2-1-1.3-1-2.5s.6-1.8.9-2c.2-.2.5-.3.8-.3h.3c.2 0 .4 0 .6.5.2.5.7 1.7.8 1.8.1.1.1.3 0 .4-.1.2-.2.3-.3.5l-.3.4c.3.5 1.2 1.9 2.6 2.6.2.1.4.1.5 0 .2-.2.6-.7.8-1 .2-.2.3-.2.6-.1.2.1 1.5.7 1.7.8.2.1.4.2.5.3.1.2.1.6-.1 1.2Z" /></svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-3 col-md-6">
              <div className="footer-menu">
                <h3>Services</h3>
                <ul>
                  {parentCategories.map((category) => (
                    <li key={category.id}>
                      <a href={`/properties/${category.slug}`}>{category.title}</a>
                    </li>
                  ))}
                  <li><a href="/mortgage-services">Mortgage Services</a></li>
                  <li><a href="/holiday-homes">Holiday Homes</a></li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-lg-3 col-md-6">
              <div className="footer-menu">
                <h3>Know Us</h3>
                <ul>
                  <li><a href="/about-us">About Us</a></li>
                  <li><a href="/services">Our Services</a></li>
                  <li><a href="/about-us#team">Meet the team</a></li>
                  <li><a href="/about-us#why-us">Why Us</a></li>
                  <li><a href="/career">Career</a></li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-lg-3 col-md-6">
              <div className="footer-menu">
                <h3>Get in touch</h3>
                <ul>
                  <li>{settings.address1 || "Dubai, United Arab Emirates"}</li>
                  <li><a href={`tel:${phone}`}>{phone}</a></li>
                  <li><a href={`mailto:${settings.email1 || "info@snhhomes.com"}`}>{settings.email1 || "info@snhhomes.com"}</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
