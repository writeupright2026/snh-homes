import {
  AboutPage,
  AreaGuidesPage,
  AreaPage,
  BlogDetailPage,
  BlogPage,
  CareerPage,
  ContactPage,
  FaqPage,
  GenericContentPage,
  HolidayDetailPage,
  HolidayHomesPage,
  ListingPage,
  PropertyDetailPage,
  TeamDetailPage,
  TeamPage,
  ThankyouPage,
} from "@/components/public-pages";
import {
  getAgent,
  getAgents,
  getAmenities,
  getBlog,
  getBlogs,
  getCategories,
  getCategory,
  getCities,
  getCity,
  getEvents,
  getFaqs,
  getHolidayHome,
  getHolidayHomes,
  getNews,
  getNewsItem,
  getProperties,
  getProperty,
  getPropertyImages,
  getCareers,
  getTypes,
} from "@/lib/queries";

type PageProps = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function list(value: string | string[] | undefined) {
  return Array.isArray(value) ? value : value ? [value] : undefined;
}

export default async function PublicPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const [section, value, third] = slug;

  if (slug.length === 1) {
    switch (section) {
      case "about-us":
        return <AboutPage />;
      case "our-team":
      case "testimonials":
        return <TeamPage agents={await getAgents()} />;
      case "blogs":
      case "news":
        return <BlogPage blogs={section === "news" ? await getNews() : await getBlogs()} />;
      case "events":
        return <BlogPage blogs={await getEvents()} />;
      case "faqs":
        return <FaqPage faqs={await getFaqs()} />;
      case "contact-us":
        return <ContactPage />;
      case "career":
        return <CareerPage careers={await getCareers()} />;
      case "holiday-homes":
        return <HolidayHomesPage properties={await getHolidayHomes()} />;
      case "area-guides":
        return <AreaGuidesPage cities={await getCities()} />;
      case "services":
        return (
          <GenericContentPage
            title="Services"
            heading="Our Services"
            banner="/frontend/images/service-banner.jpg"
            image="/frontend/images/service-bg.jpg"
            copy="We provide complete real estate services across Dubai, from buying and renting to property management, mortgage guidance, and investment advice."
          />
        );
      case "what-we-do":
        return (
          <GenericContentPage
            title="What We Do"
            heading="What We Do"
            banner="/frontend/images/service-banner.jpg"
            image="/frontend/images/service-bg.jpg"
            copy="Our advisors help buyers, sellers, landlords, tenants, and investors make confident property decisions with local market knowledge and responsive service."
          />
        );
      case "mortgage-services":
        return (
          <GenericContentPage
            title="Mortgage Services"
            heading="Mortgage Services"
            banner="/frontend/images/mortgage-bg.jpg"
            copy="Our mortgage specialists help you understand eligibility, compare options, and move from approval to completion with clear guidance."
          />
        );
      case "home-maintenance":
        return (
          <GenericContentPage
            title="Home Maintenance"
            heading="Home Maintenance"
            banner="/frontend/images/home-maintenance.jpg"
            copy="Keep your property in excellent condition with dependable home maintenance support for owners and tenants."
          />
        );
      case "property-management":
        return (
          <GenericContentPage
            title="Property Management"
            heading="Property Management"
            banner="/frontend/images/home-maintenance.jpg"
            copy="From tenant care to maintenance coordination and reporting, our property management service protects your asset and your time."
          />
        );
      case "thank-you":
      case "thankyou":
        return <ThankyouPage />;
      case "holiday-detail":
        return (
          <GenericContentPage
            title="Holiday Detail"
            heading="Holiday Homes"
            banner="/frontend/images/holiday-homes-bg.jpg"
            copy="Find a comfortable short-term stay in Dubai with support from the SNH Homes holiday homes team."
          />
        );
      case "properties":
        return <ListingPage properties={await getPropertiesFromQuery(query)} cities={await getCities()} types={await getTypes()} heading="Exclusive Properties" />;
      case "subcategories":
        return <ListingPage properties={await getProperties()} cities={await getCities()} types={await getTypes()} heading="Property Categories" />;
      case "test":
        return <GenericContentPage title="SNH Homes" heading="SNH Homes" banner="/frontend/images/about1-bg.jpg" copy="Welcome to SNH Homes." />;
    }
  }

  if (section === "team" && value) {
    const agent = await getAgent(value);
    if (agent) {
      const [buy, rent] = await Promise.all([
        getProperties({ agent: value, maincategory: "buy" }),
        getProperties({ agent: value, maincategory: "rent" }),
      ]);
      return <TeamDetailPage agent={agent} buy={buy.slice(0, 3)} rent={rent.slice(0, 3)} />;
    }
  }

  if (section === "blog" && value) {
    const blog = await getBlog(value);
    if (blog) {
      return <BlogDetailPage blog={blog} />;
    }
  }

  if (section === "news" && value) {
    const news = await getNewsItem(value, "news");
    if (news) {
      return <BlogDetailPage blog={news} />;
    }
  }

  if (section === "event" && value) {
    const event = await getNewsItem(value, "events");
    if (event) {
      return <BlogDetailPage blog={event} />;
    }
  }

  if (section === "property" && value) {
    const property = await getProperty(value);
    if (property) {
      const [amenities, recent] = await Promise.all([
        getAmenities(property.amenities),
        getProperties({}).then((properties) => properties.filter((item) => item.slug !== value && item.price === property.price).slice(0, 4)),
      ]);
      return <PropertyDetailPage property={property} recent={recent} indoorAmenities={amenities.indoor} outdoorAmenities={amenities.outdoor} />;
    }
  }

  if (section === "homes" && value) {
    const property = await getHolidayHome(value);
    if (property) {
      return <HolidayDetailPage property={property} />;
    }
  }

  if (section === "properties-areas" && value) {
    const city = await getCity(value);
    if (city) {
      return <AreaPage city={city} properties={await getProperties({ locations: [String(city.id)] })} />;
    }
  }

  if (section === "property-type" && value) {
    const type = await getTypes().then((types) => types.find((item) => item.slug === value));
    return <ListingPage properties={await getProperties({ type: value })} cities={await getCities()} types={await getTypes()} heading={`${type?.name || value} Properties`} />;
  }

  if (section === "builder-properties" && value) {
    return <ListingPage properties={await getProperties({ builder: value })} cities={await getCities()} types={await getTypes()} heading={`${value} Properties`} />;
  }

  if (section === "agent-properties" && value) {
    return <ListingPage properties={await getProperties({ agent: value })} cities={await getCities()} types={await getTypes()} heading={`${value} Properties`} />;
  }

  if (section === "properties" && value) {
    const category = await getCategory(value);
    const properties = await getProperties({
      maincategory: value,
      category: third,
      subcategory: undefined,
    });
    if (third) {
      const nested = await getCategory(third);
      return <ListingPage properties={await getProperties({ maincategory: value, category: third })} cities={await getCities()} types={await getTypes()} heading={nested?.title || third} />;
    }
    return <ListingPage properties={properties} cities={await getCities()} types={await getTypes()} heading={category?.title || value} />;
  }

  if (section === "career" && value) {
    return <GenericContentPage title="Career" heading="Career opportunity" banner="/frontend/images/career-bg.jpg" copy={`Explore the ${value} opportunity at SNH Homes.`} />;
  }

  return <GenericContentPage title="SNH Homes" heading="Find Your Property" banner="/frontend/images/about1-bg.jpg" copy="Explore residential and commercial properties across Dubai with SNH Homes." />;
}

async function getPropertiesFromQuery(query: Record<string, string | string[] | undefined>) {
  return getProperties({
    locations: list(query.keyword),
    bedrooms: list(query.bedrooms),
    bathrooms: list(query.bathrooms),
    type: first(query.property_type),
    maincategory: first(query.maincategory),
    minPrice: first(query.min_price),
    maxPrice: first(query.max_price),
  });
}
