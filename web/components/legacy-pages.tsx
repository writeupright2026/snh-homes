import type { ReactNode } from "react";
import type { Agent, Blog, Career, City, Faq, HolidayHome, Property } from "@/lib/types";

const fallbackImage = "/frontend/images/listing-bg.webp";

function storageImage(folder: string, filename?: string | null) {
  return filename ? `/storage/${folder}/${filename}` : fallbackImage;
}

function formatPrice(price?: string | null) {
  if (!price) {
    return null;
  }

  const number = Number(price.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(number) ? `AED ${number.toLocaleString("en-AE")}` : price;
}

export function Banner({ image, children }: { image: string; children?: ReactNode }) {
  return (
    <div className="inner-banner-section">
      <div className="container-fluid">
        <div className="row">
          <div className="banner-cover" style={{ backgroundImage: `url("/frontend/images/${image}")` }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Heading({ title, subtitle = title }: { title: string; subtitle?: string }) {
  return (
    <div className="heading-container">
      <div className="col-12">
        <h2 className="gradient-text">{title}</h2>
        <h3 className="small-text">{subtitle}</h3>
      </div>
    </div>
  );
}

export function Breadcrumb({ current }: { current: string }) {
  return (
    <div className="breadcrumb-section">
      <ul id="breadcrum-nav" className="breadcrum-nav">
        <li className="item"><a href="/">Home</a></li>
        <li className="seperator"> \ </li>
        <li className="item-current item">{current}</li>
      </ul>
    </div>
  );
}

export function PropertyCard({ property, holiday = false }: { property: Property | HolidayHome; holiday?: boolean }) {
  const folder = holiday ? "holidays" : "projects";
  const href = holiday ? `/homes/${property.slug}` : `/property/${property.slug}`;

  return (
    <div className={holiday ? "col-lg-4 col-md-6 mb-4" : "col-12 col-md-6 col-lg-4 gap-cate-listing"}>
      <div className="card">
        <div className="feature_img">
          <a href={href}>
            <img src={storageImage(folder, property.image)} style={{ height: 300, width: "100%" }} className="card-img-top border-0" alt={property.title || "Property"} />
          </a>
          {property.category_title ? <span className="sub_category"><a href={href}>{property.category_title}</a></span> : null}
        </div>
        <div className="property_bottom_detail">
          <div className="card-body px-3 py-0">
            <div className="row align-items-center" style={{ minHeight: 190 }}>
              <div className="col-md-9 col-9 d-flex align-items-start flex-column">
                {formatPrice(property.price) ? <h5 className="my-3 AED skill"><b>{formatPrice(property.price)}</b></h5> : null}
                <a href={href}><p>{property.title}</p></a>
                {property.location_name ? <p className="card-location"><i className="fa fa-map-marker" /> {property.location_name}</p> : null}
                <div className="row mt-2 w-100 mb-2">
                  <div className="col-lg-12 d-flex detail-prop d-block justify-content-around">
                    {property.bedroom ? <span className="ps-0 pe-2"><i className="fa fa-bed" /> {property.bedroom}</span> : null}
                    {property.bathrooms ? <span className="px-2"><i className="fa fa-bath" /> {property.bathrooms}</span> : null}
                    {property.area ? <span className="px-2"><i className="fa fa-area-chart" /> {property.area} {property.area_postfix}</span> : null}
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-3 align-self-center">
                {property.agent_image ? <img src={storageImage("team", property.agent_image)} className="mt-0 pe-0 shadow" style={{ width: "100%", borderRadius: "50%", border: "0.5px solid #848484" }} alt={property.agent_name || "Agent"} /> : null}
              </div>
            </div>
          </div>
          <div className="card-footer text-muted border-top-0" style={{ padding: "0.75rem 0rem" }}>
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td style={{ textAlign: "center", fontWeight: "bold", width: "50%" }}>
                    <a href="/contact-us" style={{ color: "#000" }}><i className="fa fa-envelope-open-o" /> Request Details</a>
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "bold", width: "50%" }}>
                    <a href="https://wa.me/971526993834" target="_blank" rel="noreferrer" style={{ color: "#1e961e" }}><i className="fa fa-whatsapp" /> Whatsapp</a>
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

export function PropertyGrid({ properties, holiday = false }: { properties: Property[]; holiday?: boolean }) {
  if (!properties.length) {
    return (
      <div className="design_for_cat_prow mt-5 text-center">
        <div className="outer">
          <div className="fount-result mb-4"><h4>We found <b>0</b> properties available for you</h4></div>
          <h3 className="product-type">No matching results found.</h3>
        </div>
        <div className="product-info"><h3 className="product-name">Please modify your search criteria and try search again.</h3></div>
      </div>
    );
  }

  return <div className={holiday ? "holiday_pro" : "listing_pro"}><div className="row mt-5">{properties.map((property) => <PropertyCard key={property.id} property={property} holiday={holiday} />)}</div></div>;
}

export function ListingPage({
  heading,
  properties,
  cities,
  types,
}: {
  heading: string;
  properties: Property[];
  cities: City[];
  types: { name: string | null; slug: string | null }[];
}) {
  return (
    <>
      <Banner image="listing-bg.webp" />
      <section className="about-page-section pt-0">
        <div className="container"><Heading title={heading} /></div>
      </section>
      <section className="pt-0">
        <div className="container">
          <div className="form_banner mt-5">
            <form action="/properties" method="get">
              <div className="filterCont">
                <div className="row mb-3">
                  <div className="top_btn">
                    <button type="submit" className="btn btn-outline-warning" name="maincategory" value="buy">Buy</button>
                    <button type="submit" className="btn btn-outline-warning" name="maincategory" value="rent">Rent</button>
                    <button type="submit" className="btn btn-outline-warning" name="maincategory" value="projects">Projects</button>
                  </div>
                </div>
                <div className="row g-1">
                  <div className="col-lg-4 col-md-12 col-12 mb-tab-2">
                    <select name="keyword" id="locationSelect" className="form-control" defaultValue="">
                      <option value="">City, community, or building</option>
                      {cities.map((city) => <option value={city.id} key={city.id}>{city.name}</option>)}
                    </select>
                  </div>
                  <div className="col-12 col-lg-3 col-md-12 my-auto mb-tab-2">
                    <select className="form-select" name="property_type" defaultValue="">
                      <option value="">All Property Type</option>
                      {types.map((type) => <option value={type.slug || ""} key={type.slug}>{type.name}</option>)}
                    </select>
                  </div>
                  <div className="col-12 col-lg-2 my-auto mb-tab-2">
                    <select className="form-select" name="bedrooms" defaultValue="">
                      <option value="">Beds</option>
                      {["studio", "1", "2", "3", "4", "5", "6", "7"].map((bed) => <option value={bed} key={bed}>{bed}</option>)}
                    </select>
                  </div>
                  <div className="col-12 col-lg-2 my-auto mb-tab-2">
                    <input className="form-control" type="number" name="min_price" placeholder="Min. Price (AED)" />
                  </div>
                  <div className="col-1 col-lg-1 my-auto">
                    <button type="submit" className="btn btn-primary py-2 propSearchBtn" style={{ width: "100%" }} aria-label="Search"><i className="fa fa-search" /></button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section className="single-news1"><div className="container"><PropertyGrid properties={properties} /></div></section>
    </>
  );
}

export function BlogList({ blogs }: { blogs: Blog[] }) {
  return (
    <>
      <Banner image="blog-bg.webp" />
      <section className="latest-news">
        <div className="container">
          <Heading title="Latest News" />
          <div className="row">
            {blogs.map((blog) => (
              <div className="col-12 col-md-6 col-lg-4 latest-phn-gap" key={blog.id}>
                <div className="blog-wrap"><article className="et_pb_blog"><div className="blog-main-blurb">
                  <div className="img-section"><a href={`/blog/${blog.slug}`}><img className="rounded img-fluid" src={storageImage("blogs", blog.image)} style={{ width: "100%", height: 300, objectFit: "cover" }} alt={blog.title || "Blog"} /></a></div>
                  <div className="post-meta"><span>by Admin</span> | <span>{blog.created_at ? new Date(blog.created_at).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) : ""}</span></div>
                  <div className="content-section-blog"><a href={`/blog/${blog.slug}`}><h3 className="blog-title">{blog.title}</h3></a><p className="blog-content">{(blog.short_description || "").slice(0, 200)}</p><a href={`/blog/${blog.slug}`} className="readmore-btn btn-style">Read More</a></div>
                </div></article></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function BlogDetail({ blog }: { blog: Blog }) {
  return (
    <>
      <Banner image="blog-bg.webp" />
      <section className="blog-detail-section"><div className="container"><div className="row">
        <div className="col-lg-8">
          <h1 className="bold-text">{blog.title}</h1>
          <div className="post-meta">by Admin {blog.created_at ? `| ${new Date(blog.created_at).toLocaleDateString()}` : ""}</div>
          <img className="img-fluid rounded mt-3" src={storageImage("blogs", blog.image)} alt={blog.title || "Blog"} />
          <div className="blog-description mt-4" dangerouslySetInnerHTML={{ __html: blog.description || blog.short_description || "" }} />
        </div>
        <div className="col-lg-4"><h3 className="bold-text">Latest News</h3><a className="btn btn-style mt-3" href="/blogs">Back to News</a></div>
      </div></div></section>
    </>
  );
}

export function TeamList({ agents }: { agents: Agent[] }) {
  return (
    <>
      <Banner image="team bg roi.webp" />
      <section className="team-page-section pt-0"><div className="container"><Heading title="Our Team" />
        <div className="row">
          {agents.map((agent) => <div className="col-12 col-md-6 col-lg-4" key={agent.id}><div className="team-card"><a href={`/team/${agent.slug}`}><img src={storageImage("team", agent.image)} alt={agent.name || "Team member"} className="img-responsive" /></a><h3><a href={`/team/${agent.slug}`}>{agent.name}</a></h3><p>{agent.designation}</p></div></div>)}
        </div>
      </div></section>
    </>
  );
}

export function TeamDetail({ agent, buy, rent }: { agent: Agent; buy: Property[]; rent: Property[] }) {
  return (
    <>
      <Banner image="team bg roi.webp"><Breadcrumb current="About Us" /></Banner>
      <section className="agent-profile"><div className="container mt-5"><div className="row align-items-center" style={{ backgroundColor: "#3f3f41" }}>
        <div className="col-md-12 col-lg-6 order-2"><div className="mission our-team"><h3>{agent.name}</h3><div className="post mb-2">{agent.designation}</div><div dangerouslySetInnerHTML={{ __html: agent.description || "" }} /><p>{agent.locations}</p><div className="email-section-action d-flex"><a href={`mailto:info@snhhomes.com`} className="btn-black btn-email btn-custom-width btn-animate btn-style">Email</a><a href={`https://wa.me/${(agent.phone || "971526993834").replace(/\D/g, "")}`} className="btn-whatsapp btn-custom-width btn-animate" target="_blank" rel="noreferrer">Whatsapp</a></div></div></div>
        <div className="col-md-12 col-lg-6 order-1 text-lg-end"><img src={storageImage("team", agent.image)} alt={agent.name || "Team member"} className="img-fluid" /></div>
      </div></div></section>
      <section><div className="container"><Heading title="Properties that I manage" subtitle="Properties that I manage" /><div className="tabs-button"><ul className="nav justify-content-center"><li className="nav-item"><a className="nav-link active" href="#buy">BUY</a></li><li className="nav-item"><a className="nav-link" href="#rent">RENT</a></li></ul></div><div id="buy" className="row mt-5">{buy.map((property) => <PropertyCard key={property.id} property={property} />)}</div><div id="rent" className="row mt-5">{rent.map((property) => <PropertyCard key={property.id} property={property} />)}</div></div></section>
    </>
  );
}

export function FaqPage({ faqs }: { faqs: Faq[] }) {
  return <><Banner image="faq-bg.webp" /><section className="faq-section"><div className="container"><Heading title="FAQs" /><div className="accordion" id="faqAccordion">{faqs.map((faq) => <div className="accordion-item" key={faq.id}><h2 className="accordion-header"><button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#faq-${faq.id}`}>{faq.title}</button></h2><div id={`faq-${faq.id}`} className="accordion-collapse collapse"><div className="accordion-body" dangerouslySetInnerHTML={{ __html: faq.description || "" }} /></div></div>)}</div></div></section></>;
}

export function CareerPage({ careers }: { careers: Career[] }) {
  return <><Banner image="career-bg.jpg" /><section className="career-form"><div className="container"><Heading title="job openings" subtitle="job openings" /><h4 className="bold-text text-center">At SNH Homes you’ll have the chance to build a career as unique as you are, growing in an inclusive culture to become the best version of you.</h4><div className="form-container pb-5 mt-4">{careers.length ? <form action="/api/career-query" method="post" encType="multipart/form-data"><div className="form-row"><input className="form-control mb-4" placeholder="Name" name="name" required /><input className="form-control mb-4" placeholder="Email Address" name="email" type="email" required /><input className="form-control mb-4" placeholder="Mobile Number" name="phone" required /><input className="form-control mb-4" placeholder="Nationality" name="nationality" required /><input className="form-control mb-4" placeholder="Language" name="language" required /><select className="form-control mb-4" name="job_id" required><option value="">Choose Profile</option>{careers.map((career) => <option value={career.id} key={career.id}>{career.title}</option>)}</select><input className="form-control mb-4" type="file" name="resume" required /><textarea className="form-control mb-4" name="cover_letter" placeholder="Cover Letter" /></div><button className="btn btn-primary btn-style" type="submit">Submit</button></form> : <h4>No Jobs Available..</h4>}</div></div></section></>;
}

export function HolidayPage({ properties }: { properties: HolidayHome[] }) {
  return <><Banner image="holiday-homes-bg.jpg" /><section className="about-page-section"><div className="container"><Heading title="Holiday" subtitle="Holiday Homes" /></div></section><section className="holiday_home"><div className="container"><PropertyGrid properties={properties} holiday /></div></section></>;
}

export function AreaGuidePage({ cities }: { cities: City[] }) {
  return <><Banner image="listing-bg.webp" /><section className="about-page-section"><div className="container"><Heading title="Area Guides" /><div className="row">{cities.map((city) => <div className="col-md-4 col-sm-6 mb-4" key={city.id}><div className="card"><a href={`/properties-areas/${city.slug}`}><img className="img-fluid" src={storageImage("area", city.image)} alt={city.name || "Area"} /><h3 className="p-3">{city.name}</h3></a></div></div>)}</div></div></section></>;
}

export function StaticPage({ title, banner, children }: { title: string; banner: string; children: ReactNode }) {
  return <><Banner image={banner}><Breadcrumb current={title} /></Banner><section className="about-page-section"><div className="container"><Heading title={title} /><div className="page-copy">{children}</div></div></section></>;
}

export function PropertyDetail({ property, recent }: { property: Property; recent: Property[] }) {
  return <><Banner image="home-maintenance.jpg" /><section className="list-detail-page"><div className="container"><div className="row"><div className="col-12 col-lg-8"><div className="project-title mb-3"><h2>{property.title}</h2></div><div className="gallery_pro"><img className="img-fluid" src={storageImage("projects", property.image)} alt={property.title || "Property"} /></div>{formatPrice(property.price) ? <h1 className="price my-1 bold-text">{formatPrice(property.price)}</h1> : null}<div className="detail property-detail"><div className="head"><h4 className="bold-text py-1">Detail</h4></div><ul className="listpanel-head"><li>Area : {property.area} {property.area_postfix}</li><li>Beds : {property.bedroom}</li><li>Baths : {property.bathrooms}</li><li>Garages : {property.garage}</li></ul></div><div className="accountData property-desc"><div className="head"><h4 className="bold-text py-1">Description</h4></div><div dangerouslySetInnerHTML={{ __html: property.description || "" }} /></div><div className="accountData address property-address"><div className="head"><h4 className="bold-text py-1">Address</h4></div><ul><li><span>Address</span><span className="righttext">: {property.address}</span></li><li><span>Area</span><span className="righttext">: {property.location_name}</span></li><li><span>Country</span><span className="righttext">: UAE</span></li></ul></div></div><div className="col-12 col-lg-4"><div className="sidebar-blog"><div className="agent-certified"><div className="agent_name"><h4>{property.agent_name}</h4><div className="designation">{property.agent_designation}</div><div className="agent_contact"><a href="https://wa.me/971526993834"><i className="fa fa-whatsapp" /> WhatsApp</a><a href="tel:+971526993834"><i className="fa fa-phone" /> Call Us</a></div></div>{property.agent_image ? <img src={storageImage("team", property.agent_image)} style={{ width: "20%", borderRadius: "50%" }} alt={property.agent_name || "Agent"} /> : null}</div><div className="form-container pb-3 pt-3 px-4 mb-3"><form method="post" action="/api/property-query"><input type="hidden" name="property_id" value={property.id} /><input className="form-control mb-3" name="name" placeholder="Name" required /><input className="form-control mb-3" name="email" type="email" placeholder="Email Address" required /><input className="form-control mb-3" name="phone" placeholder="Mobile Number" required /><textarea className="form-control mb-3" name="message" placeholder="Message" /><button type="submit" className="btn btn-primary btn-style">Get a quote</button></form></div>{recent.length ? <><h3 className="bold-text">Similar Properties</h3>{recent.map((item) => <a className="blog-list d-block mb-3" href={`/property/${item.slug}`} key={item.id}><img className="img-fluid" src={storageImage("projects", item.image)} alt={item.title || "Property"} /><span>{item.title}</span></a>)}</> : null}</div></div></div></div></section></>;
}
