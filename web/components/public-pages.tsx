import type { ReactNode } from "react";
import { SiteLayout } from "./site-layout";
import type { Agent, Blog, Career, City, Faq, HolidayHome, Property, Type } from "@/lib/types";

export function storageAsset(folder: string, file?: string | null) {
  return file ? `/storage/${folder}/${file}` : "/frontend/images/profile-dummy.webp";
}

function RichText({ html }: { html?: string | null }) {
  if (!html) {
    return null;
  }

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export function PageBanner({ image, current }: { image: string; current: string }) {
  return (
    <div className="inner-banner-section">
      <div className="container-fluid">
        <div className="row">
          <div className="banner-cover" style={{ backgroundImage: `url("${image}")` }}>
            <div className="breadcrumb-section">
              <ul id="breadcrum-nav" className="breadcrum-nav">
                <li className="item"><a href="/">Home</a></li>
                <li className="seperator"> \ </li>
                <li className="item-current item">{current}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SectionHeading({ title, subtitle = title }: { title: string; subtitle?: string }) {
  return (
    <div className="heading-container">
      <div className="col-12">
        <h2 className="gradient-text">{title}</h2>
        <h3 className="small-text">{subtitle}</h3>
      </div>
    </div>
  );
}

export function LegacyPage({
  title,
  banner,
  children,
}: {
  title: string;
  banner: string;
  children: ReactNode;
}) {
  return (
    <SiteLayout title={title}>
      <PageBanner image={banner} current={title} />
      {children}
    </SiteLayout>
  );
}

export function PropertyCard({
  property,
  holiday = false,
}: {
  property: Property | HolidayHome;
  holiday?: boolean;
}) {
  const imageFolder = holiday ? "holidays" : "projects";
  const href = holiday ? `/homes/${property.slug}` : `/property/${property.slug}`;

  return (
    <div className={holiday ? "col-lg-4 col-md-6 mb-4" : "col-12 col-md-6 col-lg-4 gap-cate-listing"}>
      <div className="card">
        <div className="feature_img">
          <a href={href}>
            <img
              src={storageAsset(imageFolder, property.image)}
              style={{ height: 300, width: "100%" }}
              className="card-img-top border-0"
              alt={property.title || "SNH Homes property"}
            />
          </a>
          <span className="sub_category">
            <a>{property.category_title || "Property"}</a>
          </span>
        </div>
        <div className="property_bottom_detail">
          <div className="card-body px-3 py-0">
            <div className="row align-items-center" style={{ height: "100%" }}>
              <div className="col-md-9 col-9 d-flex align-items-start flex-column">
                {property.price ? (
                  <h5 className="my-3 AED skill"><b><span>AED {property.price}</span></b></h5>
                ) : null}
                <a href={href}><p>{property.title}</p></a>
                {property.location_name ? (
                  <p className="card-location"><i className="fa fa-map-marker" /> {property.location_name}</p>
                ) : null}
                <div className="row mt-2 w-100 mb-2">
                  <div className="col-lg-12 d-flex detail-prop d-block justify-content-around">
                    {property.bedroom ? <span className="ps-0 pe-2"><i className="fa fa-bed" /> {property.bedroom}</span> : null}
                    {property.bathrooms ? <span className="px-2"><i className="fa fa-bath" /> {property.bathrooms}</span> : null}
                    {property.area ? <span className="px-2"><i className="fa fa-area-chart" /> {property.area} {property.area_postfix}</span> : null}
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-3 align-self-center">
                {property.agent_image ? (
                  <img
                    src={storageAsset("team", property.agent_image)}
                    style={{ height: "auto", width: "100%", borderRadius: "50%", border: "0.5px solid #848484" }}
                    className="mt-0 pe-0 shadow"
                    alt={property.agent_name || "Property agent"}
                  />
                ) : null}
              </div>
            </div>
          </div>
          <div className="card-footer text-muted border-top-0" style={{ padding: "0.75rem 0" }}>
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td style={{ textAlign: "center", fontWeight: "bold", width: "50%" }}>
                    <a href="/contact-us" style={{ color: "#000" }}><i className="fa fa-envelope-open-o" /> Request Details</a>
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "bold", width: "50%" }}>
                    <a href="https://wa.me/971526993834" target="_blank" rel="noreferrer" style={{ color: "#1e961e" }}>
                      <i className="fa fa-whatsapp" /> Whatsapp
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PropertyGrid({
  properties,
  holiday = false,
}: {
  properties: Array<Property | HolidayHome>;
  holiday?: boolean;
}) {
  if (!properties.length) {
    return (
      <div className="design_for_cat_prow mt-5 text-center">
        <div className="outer mb-4">
          <h4>We found <b>0</b> properties available for you</h4>
        </div>
        <h3 className="product-type">No matching results found.</h3>
        <h3 className="product-name">Please modify your search criteria and try search again.</h3>
      </div>
    );
  }

  return (
    <div className={holiday ? "holiday_pro" : "listing_pro"}>
      <div className="row mt-5">
        {properties.map((property) => <PropertyCard key={property.id} property={property} holiday={holiday} />)}
      </div>
    </div>
  );
}

export function ListingFilters({
  cities,
  types,
  action = "/properties",
}: {
  cities: City[];
  types: Type[];
  action?: string;
}) {
  return (
    <section className="pt-0">
      <div className="container">
        <div className="form_banner mt-5">
          <div className="formCont">
            <form action={action} method="get">
              <div className="filterCont">
                <div className="row mb-3">
                  <div className="top_btn">
                    <input type="radio" className="btn-check" name="maincategory" id="buy" value="buy" defaultChecked />
                    <label className="btn btn-outline-warning" htmlFor="buy">Buy</label>
                    <input type="radio" className="btn-check" name="maincategory" id="rent" value="rent" />
                    <label className="btn btn-outline-warning" htmlFor="rent">Rent</label>
                    <input type="radio" className="btn-check" name="maincategory" id="projects" value="projects" />
                    <label className="btn btn-outline-warning" htmlFor="projects">Projects</label>
                  </div>
                </div>
                <div className="row g-1">
                  <div className="col-lg-4 col-md-12 col-12 mb-tab-2">
                    <select name="keyword" id="locationSelect" className="form-control" multiple>
                      {cities.map((city) => <option key={city.id} value={city.id}>{city.name}</option>)}
                    </select>
                  </div>
                  <div className="col-12 col-lg-3 col-md-12 my-auto mb-tab-2">
                    <select className="form-select" id="accommodataion_id" name="property_type" defaultValue="">
                      <option value="">All Property Type</option>
                      {types.map((type) => <option key={type.id} value={type.slug || ""}>{type.name}</option>)}
                    </select>
                  </div>
                  <div className="col-12 col-lg-2 my-auto mb-tab-2">
                    <input className="form-control" type="text" name="bedrooms" placeholder="Beds" />
                  </div>
                  <div className="col-12 col-lg-2 my-auto mb-tab-2">
                    <input className="form-control" type="number" name="min_price" placeholder="Min. Price (AED)" />
                  </div>
                  <div className="col-1 col-lg-1 my-auto">
                    <button type="submit" className="btn btn-primary py-2 propSearchBtn" style={{ width: "100%" }}>
                      <i className="fa fa-search" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export async function AboutPage() {
  return (
    <LegacyPage title="About Us" banner="/frontend/images/about1-bg.jpg">
      <section className="team-page-section pt-0">
        <div className="container">
          <SectionHeading title="About us" />
          <div className="row align-items-center">
            <div className="col-12 col-md-8 col-lg-6 order-md-1 order-2">
              <div className="about-text">
                <p><b>SNH Homes</b> is a real estate brokerage that specializes in Dubai`s residential market. We make a real distinction in our fantastic world and play an important function in assisting you to get there.</p>
                <p>Looking for getting funding belongings business enterprise in UAE! Our residential belongings funding corporations provide excellent real estate offerings for buyers in Dubai, UAE.</p>
              </div>
            </div>
            <div className="col-12 col-md-4 col-lg-6 order-md-2 order-1">
              <img src="/frontend/images/text-img.png" className="w-100" alt="SNH Homes" />
            </div>
          </div>
          <div className="row">
            {[
              ["target.png", "Mission", "Our mission is to revolutionize the real estate investment landscape in Dubai by providing exceptional opportunities that empower our clients to achieve their financial goals."],
              ["money.png", "Vision", "Our vision is to lead the real estate market in Dubai with a steadfast commitment to ethics, ensuring customer satisfaction, and embracing social responsibility."],
              ["target (1).png", "Value", "Integrity, Excellence, Innovation, Collaboration, Social Responsibility define our culture and demonstrate our commitment to clients, partners, and the community."],
            ].map(([image, heading, copy]) => (
              <div className="col-lg-4 col-md-6 mt-3" key={heading}>
                <div className="side-container">
                  <img src={`/frontend/images/${image}`} alt="" />
                  <h3 className="pb-2">{heading}</h3>
                  {copy}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="team-section" id="team">
        <div className="container">
          <SectionHeading title="Company Profile" />
          <div className="row">
            <div className="col-12 col-md-6 p-0">
              <div className="team-container">
                <div className="team-img"><img src="/frontend/images/meet-team.webp" alt="Meet our team" /></div>
                <div className="team-content"><h3><a href="/our-team">Meet Our Team</a></h3><div className="designation p-3">Meet the people who make us what we are.</div></div>
              </div>
            </div>
            <div className="col-12 col-md-6 p-0">
              <div className="team-container">
                <div className="team-img"><img src="/frontend/images/hiring.webp" alt="Careers at SNH Homes" /></div>
                <div className="team-content"><h3><a href="/career">Hiring</a></h3><div className="designation p-3">Do what you love, love what you do.</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="about-page-section">
        <div className="container">
          <SectionHeading title="Our Legacy" />
          <p className="text-center">Welcome to SNH Homes, the premier residential real estate brokerage in Dubai. Our commitment to excellence and integrity empowers investors to create a lasting legacy through exceptional real estate services.</p>
        </div>
      </section>
      <section className="why-us" id="why-us">
        <div className="container">
          <SectionHeading title="Why Choose Us" subtitle="why Choose Us" />
          <div className="about-why">
            <div className="row">
              <div className="col-md-12 col-lg-6 order-lg-1">
                Investing in rented properties is one of the most effective ways for a landowner to generate earnings in real estate. Our team is dedicated to finding the best investment opportunities and guiding clients through every step of the UAE real estate market.
              </div>
              <div className="col-md-12 col-lg-6 order-lg-2">
                <img className="img-fluid mt-2" src="/frontend/images/why-img.webp" alt="Why choose SNH Homes" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </LegacyPage>
  );
}

export async function TeamPage({ agents }: { agents: Agent[] }) {
  return (
    <LegacyPage title="Our Team" banner="/frontend/images/team bg roi.webp">
      <section className="team-page-section pt-0">
        <div className="container">
          <SectionHeading title="Our Team" />
          <div className="row">
            {agents.map((agent) => (
              <div className="col-lg-4 col-md-6 col-12" key={agent.id}>
                <div className="team-wrap">
                  <a href={`/team/${agent.slug}`}>
                    <img src={storageAsset("team", agent.image)} alt={agent.name || "Team member"} className="img-responsive" />
                  </a>
                  <h3><a href={`/team/${agent.slug}`}>{agent.name}</a></h3>
                  <p>{agent.designation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </LegacyPage>
  );
}

export async function TeamDetailPage({
  agent,
  buy,
  rent,
}: {
  agent: Agent;
  buy: Property[];
  rent: Property[];
}) {
  return (
    <LegacyPage title={agent.name || "Team member"} banner="/frontend/images/team bg roi.webp">
      <section className="agent-profile">
        <div className="container mt-5">
          <div className="row align-items-center" style={{ backgroundColor: "#3f3f41" }}>
            <div className="col-md-12 col-lg-6 order-2">
              <div className="mission our-team">
                <h3>{agent.name}</h3>
                <div className="post mb-2">{agent.designation}</div>
                <RichText html={agent.description} />
                <div className="agent-location mt-4">
                  <h5>Agent Location</h5>
                  <p className="card-location"><i className="fa fa-map-marker" /> {agent.locations || "Dubai, UAE"}</p>
                </div>
                <div className="email-section-action d-flex">
                  <a href="mailto:info@snhhomes.com" className="btn-black btn-email btn-custom-width btn-style"><i className="fa fa-envelope-o" /> Email</a>
                  <a href={`https://wa.me/${(agent.phone || "971526993834").replace(/\D/g, "")}`} className="btn-whatsapp btn-custom-width" target="_blank" rel="noreferrer"><i className="fa fa-whatsapp" /> Whatsapp</a>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 order-1 text-md-center mt-lg-0 text-lg-end">
              <img src={storageAsset("team", agent.image)} alt={agent.name || "Team member"} className="img-fluid" />
            </div>
          </div>
        </div>
      </section>
      <AgentProperties title="Properties that I manage" buy={buy} rent={rent} />
    </LegacyPage>
  );
}

function AgentProperties({ title, buy, rent }: { title: string; buy: Property[]; rent: Property[] }) {
  return (
    <section>
      <div className="container-fluid">
        <SectionHeading title={title} subtitle={title} />
        <p className="text-center">Explore properties managed by this advisor across Dubai.</p>
        <div className="tabs-button"><ul className="nav justify-content-center"><li className="nav-item"><a className="nav-link active" href="#buy">BUY</a></li><li className="nav-item"><a className="nav-link" href="#rent">RENT</a></li></ul></div>
        <div className="tab-content mt-5" id="buy"><PropertyGrid properties={buy} /></div>
        <div className="tab-content mt-5" id="rent"><PropertyGrid properties={rent} /></div>
      </div>
    </section>
  );
}

export async function ListingPage({
  properties,
  cities,
  types,
  heading,
}: {
  properties: Property[];
  cities: City[];
  types: Type[];
  heading: string;
}) {
  return (
    <LegacyPage title="Listings" banner="/frontend/images/listing-bg.webp">
      <section className="about-page-section">
        <div className="container"><SectionHeading title={heading} /></div>
      </section>
      <ListingFilters cities={cities} types={types} />
      <section className="single-news1"><div className="container"><PropertyGrid properties={properties} /></div></section>
    </LegacyPage>
  );
}

export async function PropertyDetailPage({
  property,
  recent,
  indoorAmenities,
  outdoorAmenities,
}: {
  property: Property;
  recent: Property[];
  indoorAmenities: string[];
  outdoorAmenities: string[];
}) {
  return (
    <LegacyPage title={property.title || "Property"} banner="/frontend/images/home-maintenance.jpg">
      <section className="list-detail-page">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-8">
              <div className="project-title mb-3"><h2>{property.title}</h2></div>
              <div className="gallery_pro" id="gallery">
                <div id="sync1" className="owl-carousel owl-theme">
                  <div className="item"><img className="img-fluid" src={storageAsset("projects", property.image)} alt={property.title || "Property"} /></div>
                </div>
              </div>
              {property.price ? <h1 className="price my-1 bold-text">AED {property.price}</h1> : null}
              <div className="detail property-detail" id="detail">
                <div className="head"><h4 className="bold-text py-1">Detail</h4></div>
                <ul className="listpanel-head">
                  {property.area ? <li>Area : {property.area} {property.area_postfix}</li> : null}
                  {property.bedroom ? <li>Beds : {property.bedroom}</li> : null}
                  {property.bathrooms ? <li>Baths : {property.bathrooms}</li> : null}
                  {property.garage ? <li>Garages : {property.garage}</li> : null}
                  {property.year_build ? <li>Year Built : {property.year_build}</li> : null}
                </ul>
                <div className="listpanel-content">
                  <ul>
                    {property.property_id ? <li><span>Property ID</span><span className="righttext">: {property.property_id}</span></li> : null}
                    {property.address ? <li><span>Address</span><span className="righttext">: {property.address}</span></li> : null}
                    {property.location_name ? <li><span>Area</span><span className="righttext">: {property.location_name}</span></li> : null}
                  </ul>
                </div>
              </div>
              <div id="desc" className="accountData property-desc">
                <div className="head"><h4 className="bold-text py-1">Description</h4></div>
                <RichText html={property.description} />
              </div>
              <Amenities title="Indoor Amenities" values={indoorAmenities} />
              <Amenities title="Outdoor Amenities" values={outdoorAmenities} />
            </div>
            <div className="col-12 col-lg-4">
              <div className="sidebar-blog">
                <div className="agent-certified">
                  <div className="agent_name">
                    {property.agent_name ? <h4><a href={`/team/${property.agent_slug}`}>{property.agent_name}</a></h4> : null}
                    <div className="designation">{property.agent_designation}</div>
                    <div className="agent_contact"><a href="https://wa.me/971526993834"><i className="fa fa-whatsapp" /> WhatsApp</a><span className="line" /><a className="call-nor" href="tel:+971526993834"><i className="fa fa-phone" /> Call Us</a></div>
                  </div>
                  {property.agent_image ? <img src={storageAsset("team", property.agent_image)} alt={property.agent_name || "Agent"} style={{ width: "20%", borderRadius: "50%" }} /> : null}
                </div>
                <EnquiryForm pageName={property.title || "Property"} />
                {recent.length ? <><h3 className="bold-text">Similar Properties</h3><PropertyGrid properties={recent} /></> : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </LegacyPage>
  );
}

function Amenities({ title, values }: { title: string; values: string[] }) {
  if (!values.length) {
    return null;
  }

  return <div className="accountData amenities"><div className="formContent"><header className="head"><h4 className="bold-text py-1">{title}</h4></header><ul className="list-unstyled checkList text-primary">{values.map((value) => <li key={value}><i className="fa fa-check" /> <span className="fakeLabel">{value}</span></li>)}</ul></div></div>;
}

export function EnquiryForm({ pageName }: { pageName: string }) {
  return (
    <div className="form-container pb-3 pt-3 px-4 mb-3">
      <form method="post" action="/api/enquiry">
        <input type="hidden" name="page_name" value={pageName} />
        <div className="form-row">
          <div className="form-group mb-4"><input type="text" name="name" className="form-control" placeholder="Name" required /></div>
          <div className="form-group mb-4"><input type="email" name="email" className="form-control" placeholder="Email Address" required /></div>
          <div className="form-group mb-4"><input type="text" name="phone" className="form-control" placeholder="Mobile Number" required /></div>
          <div className="form-group mb-4"><textarea placeholder="Message" name="message" className="form-control" /></div>
        </div>
        <button type="submit" className="btn btn-primary btn-style">Get a quote</button>
      </form>
    </div>
  );
}

export async function HolidayHomesPage({ properties }: { properties: HolidayHome[] }) {
  return (
    <LegacyPage title="Holiday Homes" banner="/frontend/images/holiday-homes-bg.jpg">
      <section className="about-page-section"><div className="container"><SectionHeading title="Holiday" subtitle="Holiday Homes" /></div></section>
      <section className="holiday_home"><div className="container"><PropertyGrid properties={properties} holiday /></div></section>
    </LegacyPage>
  );
}

export async function HolidayDetailPage({ property }: { property: HolidayHome }) {
  return <PropertyDetailPage property={property} recent={[]} indoorAmenities={[]} outdoorAmenities={[]} />;
}

export async function BlogPage({ blogs }: { blogs: Blog[] }) {
  return (
    <LegacyPage title="Blogs" banner="/frontend/images/blog-bg.webp">
      <section className="latest-news"><div className="container"><SectionHeading title="Latest News" /><div className="row">
        {blogs.map((blog) => (
          <div className="col-12 col-md-6 col-lg-4 latest-phn-gap" key={blog.id}>
            <div className="blog-wrap"><article className="et_pb_blog"><div className="blog-main-blurb">
              <div className="img-section"><a href={`/blog/${blog.slug}`}><img className="rounded img-fluid" src={storageAsset("blogs", blog.image)} style={{ width: "100%", height: 300, objectFit: "cover" }} alt={blog.title || "SNH Homes blog"} /></a></div>
              <div className="post-meta"><span>by Admin</span> | <span>{blog.created_at ? new Date(blog.created_at).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) : ""}</span></div>
              <div className="content-section-blog"><a href={`/blog/${blog.slug}`}><h3 className="blog-title">{blog.title}</h3></a><p className="blog-content">{blog.short_description}</p><a href={`/blog/${blog.slug}`} className="readmore-btn btn-style">Read More</a></div>
            </div></article></div>
          </div>
        ))}
      </div></div></section>
    </LegacyPage>
  );
}

export async function BlogDetailPage({ blog }: { blog: Blog }) {
  return (
    <LegacyPage title={blog.title || "Blog"} banner="/frontend/images/blog-bg.webp">
      <section className="blog-detail"><div className="container"><h1>{blog.title}</h1>{blog.image ? <img src={storageAsset("blogs", blog.image)} className="img-fluid" alt={blog.title || "Blog"} /> : null}<RichText html={blog.description || blog.short_description} /></div></section>
    </LegacyPage>
  );
}

export async function FaqPage({ faqs }: { faqs: Faq[] }) {
  return (
    <LegacyPage title="FAQs" banner="/frontend/images/faq-bg.webp">
      <section className="faq-section"><div className="container"><SectionHeading title="Frequently Asked Questions" /><div className="accordion" id="faqAccordion">
        {faqs.map((faq) => <div className="accordion-item" key={faq.id}><h2 className="accordion-header"><button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#faq-${faq.id}`}>{faq.title}</button></h2><div id={`faq-${faq.id}`} className="accordion-collapse collapse"><div className="accordion-body"><RichText html={faq.description} /></div></div></div>)}
      </div></div></section>
    </LegacyPage>
  );
}

export async function CareerPage({ careers }: { careers: Career[] }) {
  return (
    <LegacyPage title="Career" banner="/frontend/images/career-bg.jpg">
      <section className="career-form"><div className="container"><SectionHeading title="job openings" subtitle="job openings" /><h4 className="bold-text text-center">At SNH Homes you’ll have the chance to build a career as unique as you are, growing in an inclusive culture to become the best version of you.</h4>
        <div className="form-container pb-5">{careers.length ? <form action="/api/career-query" method="post" encType="multipart/form-data"><div className="form-row">
          <input type="text" className="form-control mb-4" placeholder="Name" name="name" required />
          <input type="email" className="form-control mb-4" placeholder="Email Address" name="email" required />
          <input type="text" className="form-control mb-4" placeholder="Mobile Number" name="phone" required />
          <input type="text" className="form-control mb-4" placeholder="Nationality" name="nationality" required />
          <input type="text" className="form-control mb-4" placeholder="Language" name="language" required />
          <select className="form-control mb-4" name="job_id" defaultValue="" required><option value="">Choose Profile</option>{careers.map((career) => <option key={career.id} value={career.id}>{career.title}</option>)}</select>
          <input type="file" className="form-control mb-4" name="resume" required />
          <textarea className="form-control mb-4" placeholder="Cover Letter" name="cover_letter" />
        </div><button type="submit" className="btn btn-primary btn-style">Submit</button></form> : <h4>No Jobs Available..</h4>}</div>
      </div></section>
    </LegacyPage>
  );
}

export async function ContactPage() {
  return (
    <LegacyPage title="Contact Us" banner="/frontend/images/contact-bg.jpg">
      <section className="contact-section"><div className="container"><SectionHeading title="Contact Us" /><EnquiryForm pageName="Contact Us" /></div></section>
    </LegacyPage>
  );
}

export async function AreaGuidesPage({ cities }: { cities: City[] }) {
  return (
    <LegacyPage title="Area Guides" banner="/frontend/images/listing-bg.webp">
      <section className="area-guides"><div className="container"><SectionHeading title="Area Guides" /><div className="row">{cities.map((city) => <div className="col-lg-4 col-md-6" key={city.id}><a href={`/properties-areas/${city.slug}`}><img className="img-fluid" src={storageAsset("area", city.image)} alt={city.name || "Dubai area"} /><h3>{city.name}</h3></a></div>)}</div></div></section>
    </LegacyPage>
  );
}

export async function AreaPage({ city, properties }: { city: City; properties: Property[] }) {
  return (
    <LegacyPage title={city.name || "Area"} banner={storageAsset("area", city.image)}>
      <section className="location-page"><div className="container"><SectionHeading title={city.name || "Area"} /><RichText html={city.description} /><PropertyGrid properties={properties} /></div></section>
    </LegacyPage>
  );
}

export async function GenericContentPage({
  title,
  banner,
  heading,
  image,
  copy,
}: {
  title: string;
  banner: string;
  heading: string;
  image?: string;
  copy: string;
}) {
  return (
    <LegacyPage title={title} banner={banner}>
      <section className="about-page-section"><div className="container"><SectionHeading title={heading} /><div className="row align-items-center">{image ? <div className="col-12 col-md-6"><img src={image} className="img-fluid" alt={heading} /></div> : null}<div className={image ? "col-12 col-md-6" : "col-12"}><p>{copy}</p></div></div></div></section>
    </LegacyPage>
  );
}

export async function ThankyouPage() {
  return <LegacyPage title="Thank You" banner="/frontend/images/about1-bg.jpg"><section className="thankyou text-center py-5"><div className="container"><img src="/frontend/images/check-icon.webp" alt="Success" /><h2>Thank you for contacting us.</h2><p>We will get back to you shortly.</p></div></section></LegacyPage>;
}
