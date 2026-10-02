export const homeMarkup = String.raw`
    
    <header id="site-header" class="site-header">
        <div class="site-header-inner">
            <a href="/" class="brand" aria-label="SNH Homes home">SNH Homes</a>
            <nav class="desktop-nav" aria-label="Primary">
                <a href="#luxury">Luxury</a>
                <a href="#buy">Buy</a>
                <a href="#rent">Rent</a>
                <a href="#projects">Projects</a>
                <a href="#holiday-homes">Holiday Homes</a>
                <a href="#about">About Us</a>
                <a href="#services">Services</a>
                <a href="#news">News</a>
            </nav>
            <button
                type="button"
                id="menu-toggle"
                class="menu-toggle"
                aria-label="Open menu"
            >
                <span class="sr-only">Menu</span>
                <span class="burger">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
            </button>
        </div>
        <div id="mobile-nav" class="mobile-nav">
            <a href="#luxury">Luxury</a>
            <a href="#buy">Buy</a>
            <a href="#rent">Rent</a>
            <a href="#projects">Projects</a>
            <a href="#holiday-homes">Holiday Homes</a>
            <a href="#about">About Us</a>
            <a href="#services">Services</a>
            <a href="#news">News</a>
        </div>
    </header>

    <main>
        
        <section id="home-hero" class="hero">
            <video autoplay muted loop playsinline preload="auto" aria-hidden="true">
                <source src="https://drehomes.com/admin_nsrdwsc/assets/media/hero/videos/1781329027_6a2cec83412d8.mp4" type="video/mp4">
            </video>
            <div class="hero-scrim"></div>
            <div class="hero-search-wrap">
                <form id="property-search" class="search-form" action="#" method="get">
                    <div class="search-copy">
                        <p>Find your Property</p>
                        <p>Search the best properties across the prime location</p>
                    </div>
                    <div class="search-field has-rule">
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M4 11.5 12 5l8 6.5V20H4v-8.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"></path>
                            <path d="M10 20v-6h4v6" stroke="currentColor" stroke-width="1.6"></path>
                        </svg>
                        <input type="hidden" id="plan-input" name="plan" value="Off Plan">
                        <button
                            type="button"
                            id="plan-btn"
                            class="search-plan-btn"
                            aria-haspopup="listbox"
                            aria-expanded="false"
                        >
                            <span id="plan-label">Off Plan</span>
                            <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
                                <path d="M3 4.5 6 8l3-3.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"></path>
                            </svg>
                        </button>
                        <ul id="plan-menu" class="plan-menu" role="listbox">
                            <li><button type="button" data-plan="Off Plan">Off Plan</button></li>
                            <li><button type="button" data-plan="Ready">Ready</button></li>
                            <li><button type="button" data-plan="Secondary">Secondary</button></li>
                        </ul>
                    </div>
                    <label class="search-field has-rule">
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" stroke="currentColor" stroke-width="1.6"></path>
                            <circle cx="12" cy="10" r="2.2" stroke="currentColor" stroke-width="1.6"></circle>
                        </svg>
                        <input type="text" name="location" placeholder="Enter Location">
                    </label>
                    <label class="search-field">
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M4 20V6h10v14H4Zm10-8h6v8h-6" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"></path>
                            <path d="M7 9h2M7 13h2M7 17h2" stroke="currentColor" stroke-width="1.6"></path>
                        </svg>
                        <input type="text" name="project" placeholder="Enter Project Name">
                    </label>
                    <div class="search-submit">
                        <button type="submit" aria-label="Search properties">
                            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="1.8"></circle>
                                <path d="m16 16 4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </section>

        
        <section id="projects" class="listings">
            <div class="listings-inner">
                <div class="section-head">
                    <h2>Browse Best Properties</h2>
                    <div class="scroll-btns">
                        <button type="button" id="listings-left" aria-label="Scroll properties left">
                            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                <path d="M10 3 5 8l5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </button>
                        <button type="button" id="listings-right" aria-label="Scroll properties right">
                            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                <path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div id="listings-row" class="listings-row no-scrollbar">
                    <div class="slide">
                        <article class="property-card">
                            <img src="/revamp/properties/property-1.jpg" alt="Marina Gate Residences">
                            <div class="card-fade">
                                <h3>Marina Gate Residences</h3>
                                <p class="loc">Dubai Marina</p>
                                <div class="rule"></div>
                                <div class="price-row">
                                    <span class="label">price</span>
                                    <span>AED 2,450,000</span>
                                </div>
                            </div>
                        </article>
                    </div>
                    <div class="slide">
                        <article class="property-card">
                            <img src="/revamp/properties/property-2.jpg" alt="Downtown Vista Tower">
                            <div class="card-fade">
                                <h3>Downtown Vista Tower</h3>
                                <p class="loc">Downtown Dubai</p>
                                <div class="rule"></div>
                                <div class="price-row">
                                    <span class="label">price</span>
                                    <span>AED 3,180,000</span>
                                </div>
                            </div>
                        </article>
                    </div>
                    <div class="slide">
                        <article class="property-card">
                            <img src="/revamp/properties/property-3.jpg" alt="Palm West Beach Villa">
                            <div class="card-fade">
                                <h3>Palm West Beach Villa</h3>
                                <p class="loc">Palm Jumeirah</p>
                                <div class="rule"></div>
                                <div class="price-row">
                                    <span class="label">price</span>
                                    <span>AED 8,900,000</span>
                                </div>
                            </div>
                        </article>
                    </div>
                    <div class="slide">
                        <article class="property-card">
                            <img src="/revamp/properties/property-4.jpg" alt="Business Bay Lofts">
                            <div class="card-fade">
                                <h3>Business Bay Lofts</h3>
                                <p class="loc">Business Bay</p>
                                <div class="rule"></div>
                                <div class="price-row">
                                    <span class="label">price</span>
                                    <span>AED 1,720,000</span>
                                </div>
                            </div>
                        </article>
                    </div>
                    <div class="slide">
                        <article class="property-card">
                            <img src="/revamp/properties/property-5.jpg" alt="Creek Harbour Suites">
                            <div class="card-fade">
                                <h3>Creek Harbour Suites</h3>
                                <p class="loc">Dubai Creek Harbour</p>
                                <div class="rule"></div>
                                <div class="price-row">
                                    <span class="label">price</span>
                                    <span>AED 2,050,000</span>
                                </div>
                            </div>
                        </article>
                    </div>
                    <div class="slide">
                        <article class="property-card">
                            <img src="/revamp/properties/property-6.jpg" alt="JVC Garden Court">
                            <div class="card-fade">
                                <h3>JVC Garden Court</h3>
                                <p class="loc">Jumeirah Village Circle</p>
                                <div class="rule"></div>
                                <div class="price-row">
                                    <span class="label">price</span>
                                    <span>AED 980,000</span>
                                </div>
                            </div>
                        </article>
                    </div>
                    <div class="slide">
                        <article class="property-card">
                            <img src="/revamp/properties/property-7.jpg" alt="Emirates Hills Estate">
                            <div class="card-fade">
                                <h3>Emirates Hills Estate</h3>
                                <p class="loc">Emirates Hills</p>
                                <div class="rule"></div>
                                <div class="price-row">
                                    <span class="label">price</span>
                                    <span>AED 14,500,000</span>
                                </div>
                            </div>
                        </article>
                    </div>
                    <div class="slide">
                        <article class="property-card">
                            <img src="/revamp/properties/property-8.jpg" alt="Al Furjan Pavilion">
                            <div class="card-fade">
                                <h3>Al Furjan Pavilion</h3>
                                <p class="loc">Al Furjan</p>
                                <div class="rule"></div>
                                <div class="price-row">
                                    <span class="label">price</span>
                                    <span>AED 1,350,000</span>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>

        
        <section id="areas" class="areas">
            <div class="areas-frame">
                <div class="areas-grid">
                    <div class="areas-left">
                        <div class="areas-copy">
                            <h2>Explore the finest areas</h2>
                            <p>Compare Dubai communities by lifestyle, access, and listing depth. Each card opens a cluster on the outline so you can see where that market sits before you scroll further.</p>
                            <a href="#areas" class="explore-btn">Explore <span aria-hidden="true">-&gt;</span></a>
                        </div>
                        <div class="map-slot">
                            <div class="map-layer">
                                <img src="/revamp/maps/dubai-outline.png" alt="" aria-hidden="true">
                                <span class="map-pin" data-area="damac-hills-2" style="left: 82%; top: 64%;"></span>
                                <span class="map-pin" data-area="business-bay" style="left: 58%; top: 62%;"></span>
                                <span class="map-pin" data-area="downtown-dubai" style="left: 74%; top: 48%;"></span>
                                <span class="map-pin" data-area="dubai-hills-estate" style="left: 78%; top: 58%;"></span>
                                <span class="map-pin" data-area="palm-jumeirah" style="left: 73%; top: 40%;"></span>
                                <span class="map-pin" data-area="emaar-beachfront" style="left: 71%; top: 36%;"></span>
                            </div>
                        </div>
                        <div class="scroll-btns">
                            <button type="button" id="areas-left-btn" aria-label="Scroll areas left">
                                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                    <path d="M10 3 5 8l5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </button>
                            <button type="button" id="areas-right-btn" aria-label="Scroll areas right">
                                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                    <path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="areas-right">
                        <div id="areas-row" class="areas-row no-scrollbar">
                            <div class="slide area-slide">
                                <article class="area-card" data-area="damac-hills-2">
                                    <img src="/revamp/areas/damac-hills-2.jpg" alt="Damac Hills 2">
                                    <div class="card-fade">
                                        <h3>Damac Hills 2</h3>
                                        <p>Family villas set around parks, lakes, and quiet residential streets.</p>
                                        <p class="count">21 properties</p>
                                    </div>
                                </article>
                            </div>
                            <div class="slide area-slide">
                                <article class="area-card" data-area="business-bay">
                                    <img src="/revamp/areas/business-bay.jpg" alt="Business Bay">
                                    <div class="card-fade">
                                        <h3>Business Bay</h3>
                                        <p>Canal-side towers for work, dining, and central city living.</p>
                                        <p class="count">48 properties</p>
                                    </div>
                                </article>
                            </div>
                            <div class="slide area-slide">
                                <article class="area-card" data-area="downtown-dubai">
                                    <img src="/revamp/areas/downtown-dubai.jpg" alt="Downtown Dubai">
                                    <div class="card-fade">
                                        <h3>Downtown Dubai</h3>
                                        <p>Homes beside the fountain, boulevard, and landmark city skyline.</p>
                                        <p class="count">36 properties</p>
                                    </div>
                                </article>
                            </div>
                            <div class="slide area-slide">
                                <article class="area-card" data-area="dubai-hills-estate">
                                    <img src="/revamp/areas/dubai-hills.jpg" alt="Dubai Hills Estate">
                                    <div class="card-fade">
                                        <h3>Dubai Hills Estate</h3>
                                        <p>Golf course community with parks, schools, and calm streets.</p>
                                        <p class="count">29 properties</p>
                                    </div>
                                </article>
                            </div>
                            <div class="slide area-slide">
                                <article class="area-card" data-area="palm-jumeirah">
                                    <img src="/revamp/areas/palm-jumeirah.jpg" alt="Palm Jumeirah">
                                    <div class="card-fade">
                                        <h3>Palm Jumeirah</h3>
                                        <p>Island homes along beaches, hotels, and the famous crescent.</p>
                                        <p class="count">18 properties</p>
                                    </div>
                                </article>
                            </div>
                            <div class="slide area-slide">
                                <article class="area-card" data-area="emaar-beachfront">
                                    <img src="/revamp/areas/emaar-beachfront.jpg" alt="Emaar Beachfront">
                                    <div class="card-fade">
                                        <h3>Emaar Beachfront</h3>
                                        <p>Sea-facing towers with beaches, marina walks, and open horizon.</p>
                                        <p class="count">14 properties</p>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        
        <section class="categories" id="luxury">
            <div class="categories-grid">
                <a id="off-plan" href="#projects" class="category-card">
                    <div class="category-media">
                        <img src="/revamp/areas/downtown-dubai.jpg" alt="Fresh project releases">
                        <p class="category-eyebrow">Off-plan homes</p>
                    </div>
                    <div class="category-foot">
                        <h3>Fresh project releases</h3>
                        <p>See new towers and villas coming to market, with early-release stock across Dubai.</p>
                    </div>
                </a>
                <a id="buy" href="#buy" class="category-card">
                    <div class="category-media">
                        <img src="/revamp/areas/business-bay.jpg" alt="Ready resale picks">
                        <p class="category-eyebrow">Homes for sale</p>
                    </div>
                    <div class="category-foot">
                        <h3>Ready resale picks</h3>
                        <p>Browse completed homes with clear titles, from city apartments to family villas.</p>
                    </div>
                </a>
                <a id="rent" href="#rent" class="category-card">
                    <div class="category-media">
                        <img src="/revamp/areas/emaar-beachfront.jpg" alt="Lets in high demand">
                        <p class="category-eyebrow">Homes to rent</p>
                    </div>
                    <div class="category-foot">
                        <h3>Lets in high demand</h3>
                        <p>Shortlist furnished and unfurnished rentals sized for work, family, or a seasonal stay.</p>
                    </div>
                </a>
            </div>
            <div id="holiday-homes"></div>
            <div id="services"></div>
        </section>

        
        <section class="unlock" id="chapter">
            <div class="unlock-inner">
                <div class="unlock-copy">
                    <h2>Unlock a new chapter of your life</h2>
                    <p>Move, invest, or settle in the UAE with a shortlist that follows how you live, not a brochure skyline.</p>
                    <a class="solid-btn" href="#contact">Plan your move</a>
                </div>
                <div class="unlock-media">
                    <img src="/revamp/stories/uae-passports.png" alt="United Arab Emirates passports on the national flag">
                </div>
            </div>
        </section>

        
        <section class="about" id="about">
            <div class="about-inner">
                <div class="about-media">
                    <img src="/revamp/stories/about-lounge.jpg" alt="Bright lounge with seating and indoor trees">
                    <p class="about-quote">A calmer door into Dubai homes, from first viewing to keys.</p>
                </div>
                <div class="about-copy">
                    <p class="eyebrow">About SNH Homes</p>
                    <h2>Advice that stays with the same desk.</h2>
                    <p>We place buyers and tenants in streets they will keep. Viewings, contracts, and aftercare sit with one advisor so the file does not bounce between teams.</p>
                    <a class="solid-btn" href="#contact">About Us</a>
                </div>
            </div>
            <div class="stats-row">
                <article class="stat-card">
                    <div>
                        <p class="stat-num">12+</p>
                        <p class="stat-label">Years advising</p>
                    </div>
                    <span class="stat-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none"><path d="M12 3 14.2 8.5 20 9.2 15.7 13.2 17 19 12 16.2 7 19 8.3 13.2 4 9.2 9.8 8.5 12 3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
                    </span>
                </article>
                <article class="stat-card">
                    <div>
                        <p class="stat-num">1800+</p>
                        <p class="stat-label">Homes handed over</p>
                    </div>
                    <span class="stat-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none"><circle cx="8" cy="10" r="2.4" stroke="currentColor" stroke-width="1.5"/><circle cx="16" cy="10" r="2.4" stroke="currentColor" stroke-width="1.5"/><path d="M4.5 18c.6-2.2 2.4-3.5 4.5-3.5s3.9 1.3 4.5 3.5M11 18c.6-2.2 2.4-3.5 4.5-3.5s3.9 1.3 4.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                    </span>
                </article>
                <article class="stat-card">
                    <div>
                        <p class="stat-num">40+</p>
                        <p class="stat-label">Developer desks</p>
                    </div>
                    <span class="stat-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none"><path d="M12 20V4m0 0 7 4v12M12 4 5 8v12" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 12h3M8 16h3M13 12h3M13 16h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                    </span>
                </article>
                <article class="stat-card">
                    <div>
                        <p class="stat-num">90+</p>
                        <p class="stat-label">Advisors on file</p>
                    </div>
                    <span class="stat-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M5 19c.8-3.2 3.2-5 7-5s6.2 1.8 7 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                    </span>
                </article>
            </div>
        </section>

        
        <section class="blog-feature" id="news">
            <div class="blog-inner">
                <div class="blog-copy">
                    <p class="eyebrow">Market notes</p>
                    <h2>What a Dubai move actually changes</h2>
                    <p>Service charges, school catchments, and commute windows reshape a shortlist faster than a skyline still. This note walks through the three checks we run before the first viewing.</p>
                    <a class="solid-btn" href="#news">Read the note</a>
                </div>
                <div class="blog-media">
                    <img src="/revamp/stories/blog-skyline.jpg" alt="Dubai skyline at dusk">
                </div>
            </div>
        </section>

        
        <section class="bento-wrap" id="press">
            <div class="bento">
                <article class="bento-tile span-2 tall">
                    <img src="/revamp/bento/tile-1.jpg" alt="">
                    <div class="bento-cap">
                        <p class="bento-kicker">Open house</p>
                        <h3>Walk the rooms before the pitch</h3>
                    </div>
                </article>
                <article class="bento-tile tall">
                    <img src="/revamp/bento/tile-2.jpg" alt="">
                    <div class="bento-cap">
                        <h3>Waterfront mornings</h3>
                    </div>
                </article>
                <article class="bento-tile span-2 tall">
                    <img src="/revamp/bento/tile-9.jpg" alt="">
                    <div class="bento-cap">
                        <p class="bento-kicker">The desk</p>
                        <h3>Advice in the room, not on a screen</h3>
                    </div>
                </article>
                <article class="bento-tile tall">
                    <img src="/revamp/bento/tile-5.jpg" alt="">
                    <div class="bento-cap">
                        <h3>Why the shortlist shrinks</h3>
                    </div>
                </article>
                <article class="bento-tile span-2">
                    <img src="/revamp/bento/tile-4.jpg" alt="">
                    <div class="bento-cap">
                        <h3>Keys, then calm</h3>
                    </div>
                </article>
                <article class="bento-tile span-2">
                    <img src="/revamp/bento/tile-7.jpg" alt="">
                    <div class="bento-cap">
                        <h3>Towers that earn their keep</h3>
                    </div>
                </article>
                <article class="bento-tile">
                    <img src="/revamp/bento/tile-10.jpg" alt="">
                    <div class="bento-cap">
                        <h3>Brief before the tour</h3>
                    </div>
                </article>
                <article class="bento-tile">
                    <img src="/revamp/bento/tile-3.jpg" alt="">
                    <div class="bento-cap">
                        <h3>Villa light, city access</h3>
                    </div>
                </article>
                <article class="bento-tile span-2">
                    <img src="/revamp/bento/tile-8.jpg" alt="">
                    <div class="bento-cap">
                        <h3>Verified, then viewed</h3>
                    </div>
                </article>
                <article class="bento-tile span-2">
                    <img src="/revamp/bento/tile-6.jpg" alt="">
                    <div class="bento-cap">
                        <h3>Studio hours on the file</h3>
                    </div>
                </article>
            </div>
        </section>
    </main>

    
    <footer class="site-footer" id="contact">
        <div class="footer-inner">
            <div class="footer-brand">
                <p class="footer-logo">SNH Homes</p>
                <p class="footer-follow">Follow us</p>
                <div class="footer-social">
                    <a href="https://www.facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1Z"/></svg>
                    </a>
                    <a href="https://www.instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm8 2H8a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3Zm-4 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2Zm0 1.8a2 2 0 1 0 2 2 2 2 0 0 0-2-2Zm4.6-2.7a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z"/></svg>
                    </a>
                    <a href="https://www.youtube.com" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23 12.2s0-3.2-.4-4.6a3 3 0 0 0-2.1-2.1C18.9 5 12 5 12 5s-6.9 0-8.5.5a3 3 0 0 0-2.1 2.1C1 9 1 12.2 1 12.2s0 3.2.4 4.6a3 3 0 0 0 2.1 2.1C5.1 19.4 12 19.4 12 19.4s6.9 0 8.5-.5a3 3 0 0 0 2.1-2.1c.4-1.4.4-4.6.4-4.6ZM9.8 15.5v-6.6l6.2 3.3-6.2 3.3Z"/></svg>
                    </a>
                    <a href="https://www.linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 9H4v11h2.5V9ZM5.2 3.5A1.6 1.6 0 1 0 5.2 6.7 1.6 1.6 0 0 0 5.2 3.5ZM20 20h-2.5v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V20H11V9h2.4v1.5h.1c.3-.6 1.2-1.3 2.5-1.3 2.7 0 3.2 1.8 3.2 4.1V20Z"/></svg>
                    </a>
                    <a href="https://wa.me/971526993834" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3Zm5.2 12.7c-.2.6-1.2 1.1-1.7 1.2-.4.1-1 .1-1.6-.1-.4-.1-.8-.3-1.4-.5-2.5-1.1-4.1-3.6-4.2-3.8-.1-.2-1-1.3-1-2.5s.6-1.8.9-2c.2-.2.5-.3.8-.3h.3c.2 0 .4 0 .6.5.2.5.7 1.7.8 1.8.1.1.1.3 0 .4-.1.2-.2.3-.3.5l-.3.4c.3.5 1.2 1.9 2.6 2.6.2.1.4.1.5 0 .2-.2.6-.7.8-1 .2-.2.3-.2.6-.1.2.1 1.5.7 1.7.8.2.1.4.2.5.3.1.2.1.6-.1 1.2Z"/></svg>
                    </a>
                </div>
                <p class="footer-permit">Trade licence details available on request.</p>
            </div>
            <div class="footer-col">
                <h3>Communities</h3>
                <ul>
                    <li><a href="#areas"><span>Palm Jumeirah</span><span>22</span></a></li>
                    <li><a href="#areas"><span>Downtown Dubai</span><span>31</span></a></li>
                    <li><a href="#areas"><span>Dubai Marina</span><span>27</span></a></li>
                    <li><a href="#areas"><span>Business Bay</span><span>19</span></a></li>
                    <li><a href="#areas"><span>Dubai Hills Estate</span><span>16</span></a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h3>Developers</h3>
                <ul>
                    <li><a href="#projects"><span>Emaar</span><span>64</span></a></li>
                    <li><a href="#projects"><span>Nakheel</span><span>28</span></a></li>
                    <li><a href="#projects"><span>Meraas</span><span>21</span></a></li>
                    <li><a href="#projects"><span>Damac</span><span>18</span></a></li>
                    <li><a href="#projects"><span>Sobha</span><span>14</span></a></li>
                </ul>
            </div>
            <div class="footer-col footer-touch">
                <h3>Get in touch</h3>
                <ul>
                    <li>Studio: Dubai, United Arab Emirates</li>
                    <li>WhatsApp: +971 52 699 3834</li>
                    <li>Mail: via the WhatsApp desk</li>
                </ul>
            </div>
        </div>
        <div class="footer-legal">
            <p>SNH Homes advises on property in Dubai. Figures on this page are illustrative until a live listing feed is connected.</p>
            <p><a href="#contact">Privacy Policy</a> | <a href="#contact">T&amp;C</a></p>
        </div>
    </footer>

    <a
        class="whatsapp"
        href="https://wa.me/971526993834"
        aria-label="WhatsApp +971 52 699 3834"
        target="_blank"
        rel="noopener noreferrer"
    >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.33 4.94L2 22l5.39-1.41a10 10 0 0 0 4.65 1.16h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2Zm5.74 14.16c-.24.68-1.4 1.3-1.95 1.38-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.93-4.36-.14-.2-1.15-1.53-1.15-2.92 0-1.38.73-2.06.99-2.34.24-.27.64-.39.99-.39h.24c.2 0 .46-.02.7.54.24.58.83 2.02.9 2.17.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.03 1.12 1 2.07 1.31 2.36 1.46.3.15.46.13.63-.08.17-.2.73-.85.93-1.14.2-.3.4-.24.67-.14.27.1 1.72.81 2.02.96.3.15.5.22.57.34.07.13.07.73-.17 1.41Z"></path>
        </svg>
    </a>

`;
