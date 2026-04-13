import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useActionData, useLoaderData, Form } from "react-router";
import { toast } from "react-toastify";
import Logo from "../assets/Logo/image.png";
import AlbertJamesScreenshot from "../assets/Layouts/albert-james.png";

/* ─────────────────────────────────────────
   Navbar
───────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "Sample Layout", href: "#layouts" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Feedback", href: "#feedback" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-black/10 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16 py-3">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="h-10 w-10 rounded-full border border-black/10 overflow-hidden flex items-center justify-center bg-white group-hover:border-black transition-all duration-300 shadow-sm group-hover:shadow-md">
            <img
              src={Logo}
              alt="SaveAsDraft Logo"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <span className="font-serif text-base font-semibold tracking-tight text-black group-hover:text-black/70 transition-colors">
            SaveAsDraft
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="underline-animated text-[13px] font-medium tracking-widest uppercase text-black/70 hover:text-black transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a
          href="#contact"
          className="hidden lg:inline-flex items-center gap-2 px-5 py-2 bg-black text-white text-[12px] font-medium tracking-wide rounded-full hover:bg-black/80 transition-all duration-300 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5"
        >
          Get a Quote
        </a>

        {/* Mobile Hamburger */}
        <button
          id="nav-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2 group"
          aria-label="Toggle navigation menu"
        >
          <span
            className={`block h-0.5 bg-black transition-all duration-300 ${
              menuOpen ? "w-6 rotate-45 translate-y-2" : "w-6"
            }`}
          />
          <span
            className={`block h-0.5 bg-black transition-all duration-300 ${
              menuOpen ? "opacity-0 w-4" : "w-4"
            }`}
          />
          <span
            className={`block h-0.5 bg-black transition-all duration-300 ${
              menuOpen ? "w-6 -rotate-45 -translate-y-2" : "w-6"
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white border-t border-black/10 overflow-hidden transition-all duration-500 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-[11px] tracking-widest font-medium text-black/70 hover:text-black transition-colors py-1 uppercase"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="inline-block mt-2 px-6 py-2.5 bg-black text-white text-sm font-medium tracking-wide rounded-full"
            >
              Get a Quote
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────
   Hero Section
───────────────────────────────────────── */
function HeroSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex flex-col bg-white overflow-visible"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Decorative large calligraphy bg text */}
      <div
        className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-calligraphy text-black/[0.03] whitespace-nowrap select-none pointer-events-none leading-none z-0"
        aria-hidden="true"
      >
        Save the Date
      </div>

      {/* Decorative corner lines */}
      <div className="absolute top-28 left-8 w-24 h-24 border-t border-l border-black/10 pointer-events-none" />
      <div className="absolute bottom-12 right-8 w-24 h-24 border-b border-r border-black/10 pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto px-6 text-center pt-20 pb-12">
        {/* Pill badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 border border-black/10 rounded-full text-[9px] tracking-[0.2em] uppercase text-black/50 mb-8 bg-white/50 backdrop-blur-sm transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-black/30 inline-block animate-pulse" />
          Wedding &amp; Special Events Invitations
        </div>

        {/* Main heading */}
        <h1 className={`font-calligraphy text-[11vw] md:text-7xl lg:text-8xl text-black leading-[1.2] mb-6 px-4 overflow-visible transition-all duration-1000 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          A Story
          <br />
          <span className="shimmer-text">For A Lifetime</span>
        </h1>

        <div className={`w-full flex flex-col items-center transition-all duration-1000 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="ornament-divider max-w-[8rem] mx-auto mb-8 opacity-20">
            <span className="font-calligraphy text-xl text-black">✦</span>
          </div>

          {/* Sub heading */}
          <p className="font-serif text-base md:text-lg text-black/50 italic max-w-lg mx-auto mb-12 leading-relaxed">
            Elegantly designed digital invitations — including RSVP,
            event maps, and personal message boards, all in one custom link.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#layouts"
              className="w-full sm:w-auto px-10 py-4 bg-black text-white text-[11px] font-medium tracking-widest uppercase rounded-full hover:bg-black/80 transition-all duration-300 hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-1"
            >
              View Sample Layout
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto px-10 py-4 border border-black/10 text-black text-[11px] font-medium tracking-widest uppercase rounded-full hover:bg-black hover:text-white transition-all duration-300 hover:-translate-y-1 bg-white/50 backdrop-blur-sm"
            >
              Start Your Invitation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   About Section
───────────────────────────────────────── */
function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="about"
      ref={ref}
      className="py-28 md:py-36 bg-black text-white relative overflow-hidden"
    >
      {/* bg decoration */}
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left */}
          <div className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-4">
              About SaveAsDraft
            </p>
            <h2 className="font-calligraphy text-5xl md:text-6xl lg:text-7xl text-white mb-8 leading-tight">
              Crafting
              <br />
              Untraditional Designs
            </h2>
            <div className="w-16 h-px bg-white/40 mb-8" />
            <p className="font-serif italic text-white/60 text-lg leading-relaxed mb-6">
              Save As Draft is a creative invitation service dedicated to crafting untraditional, personalized designs that go beyond the ordinary.
            </p>
            <p className="text-white/50 text-base leading-relaxed">
              We specialize in transforming your story into visually compelling invitations—whether for weddings, events, or special milestones. With a focus on originality and detail, we help our clients express their unique style through modern, meaningful designs that leave a lasting impression.
            </p>
          </div>

          {/* Right – decorative card */}
          <div className={`relative transition-all duration-1000 delay-300 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            {/* Card stack effect */}
            <div className="absolute inset-0 border border-white/10 rounded-2xl translate-x-4 translate-y-4" />
            <div className="absolute inset-0 border border-white/10 rounded-2xl translate-x-2 translate-y-2" />
            <div className="relative border border-white/20 rounded-2xl p-10 bg-white/5 backdrop-blur-sm">
              <div className="font-calligraphy text-white/20 text-7xl mb-6 leading-none">
                "
              </div>
              <p className="font-serif italic text-white/80 text-xl leading-relaxed mb-8">
                A creative invitation service dedicated to crafting untraditional, personalized designs that go beyond the ordinary.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                  <span className="text-white/60 text-xs font-medium">S</span>
                </div>
                <div>
                  <div className="text-sm text-white/80 font-medium">
                    SaveAsDraft
                  </div>
                  <div className="text-xs text-white/40">
                    Creative Invitation Designers
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Services Section
───────────────────────────────────────── */
const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M12 2v20M2 12h20" className="opacity-20" />
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
    title: "Digital Invitation",
    description:
      "Modern, interactive digital invitations tailored to your story. Features include custom links, event details, and more.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: "RSVP Management",
    description:
      "Seamlessly collect guest responses through a beautiful integrated RSVP system, with real-time tracking for you.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    title: "Custom Design",
    description:
      "Fully bespoke designs that reflect your unique style. No templates — every invitation is crafted from scratch.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: "Interactive Maps",
    description:
      "Detailed maps and venue guides to help your guests navigate your event locations with ease.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: "Event Schedule",
    description:
      "A clear, elegant timeline of your celebration, ensuring guests don't miss a single special moment.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    title: "Guest Message Board",
    description:
      "A dedicated space for loved ones to leave heartfelt messages, well-wishes, and stories for you to cherish.",
  },
];

function ServicesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="services"
      ref={ref}
      className="py-28 md:py-36 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase text-black/40 mb-4">
            Offers & Services
          </p>
          <h2 className="font-calligraphy text-5xl md:text-6xl lg:text-7xl text-black mb-6">
            Our Unique Offers
          </h2>
          <div className="ornament-divider max-w-xs mx-auto">
            <span className="font-calligraphy text-2xl text-black/30">✦</span>
          </div>
          <p className="font-serif italic text-black/50 text-lg max-w-xl mx-auto mt-6">
            We transform your story into visually compelling experiences through our specialized creative services.
          </p>
        </div>

        {/* Service Cards */}
        <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
          {services.map((service, i) => (
            <div
              key={service.title}
              style={{ transitionDelay: `${i * 100}ms` }}
              className={`group relative border border-black/10 rounded-2xl p-8 hover:border-black transition-all duration-500 hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-1 cursor-default w-full md:w-[calc(50%-12px)] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <div className="text-2xl mb-6 text-black/30 group-hover:text-black transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="font-serif text-xl font-semibold text-black mb-3">
                {service.title}
              </h3>
              <p className="text-black/50 text-sm leading-relaxed">
                {service.description}
              </p>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-8 right-8 h-px bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Sample Layouts Section
───────────────────────────────────────── */
const sampleLayouts = [
  {
    id: "layout-albert-james",
    name: "Albert & James",
    tag: "Wedding",
    description:
      "A beautiful, modern digital invitation designed for Albert & James. This layout features a clean, minimalist aesthetic with focus on their love story and event details.",
    accent: "bg-black",
    url: "https://albert-and-james.vercel.app",
    image: AlbertJamesScreenshot,
  },
];

function SampleLayoutsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="layouts"
      ref={ref}
      className="py-28 md:py-36 bg-black text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-4">
            Sample Layout
          </p>
          <h2 className="font-calligraphy text-5xl md:text-6xl lg:text-7xl text-white mb-6">
            Designed for Your Story
          </h2>
          <div className="ornament-divider max-w-xs mx-auto">
            <span className="font-calligraphy text-2xl text-white/30">✦</span>
          </div>
          <p className="font-serif italic text-white/50 text-lg max-w-xl mx-auto mt-6">
            Explore our featured invitation style — fully
            customizable to match your unique vision.
          </p>
        </div>

        {/* Preview area */}
        <div className={`transition-all duration-1000 delay-500 ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="relative border border-white/10 rounded-3xl overflow-hidden max-w-5xl mx-auto">
            {/* Invitation preview image */}
            <div className="aspect-[16/9] bg-white flex items-center justify-center relative overflow-hidden group">
              <img 
                src={sampleLayouts[0].image} 
                alt="Albert & James Layout Screenshot" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <a
                  href={sampleLayouts[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-white text-black text-sm font-medium rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                >
                  Visit Live Demo
                </a>
              </div>
            </div>

            {/* Info bar */}
            <div className="border-t border-white/10 bg-white/5 px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/60 text-xs tracking-wide mb-2">
                  {sampleLayouts[0].tag}
                </span>
                <h4 className="font-serif text-2xl text-white font-medium">
                  {sampleLayouts[0].name}
                </h4>
                <p className="text-white/40 text-sm mt-1 max-w-xl">
                  {sampleLayouts[0].description}
                </p>
              </div>
              <div className="flex gap-4 w-full sm:w-auto">
                <a
                  href={sampleLayouts[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none text-center px-8 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-all duration-300 shadow-lg shadow-white/5"
                >
                  Live Demo
                </a>
                <a
                  href="#contact"
                  className="flex-1 sm:flex-none text-center px-8 py-3 border border-white/20 text-white text-sm font-medium rounded-full hover:bg-white/10 transition-all duration-300"
                >
                  Order This Style
                </a>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-white/30 text-sm mt-8 font-serif italic">
          More layouts are currently in development — every design we create is fully
          customized for your event.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   How It Works Section
───────────────────────────────────────── */
const steps = [
  {
    number: "01",
    title: "Tell Us Your Vision",
    description:
      "Share your theme, color palette, names, date, and any inspiration. The more you tell us, the more personal we make it.",
  },
  {
    number: "02",
    title: "We Design & Build",
    description:
      "Our team crafts your bespoke digital invitation website with all the features you've chosen, pixel-perfect.",
  },
  {
    number: "03",
    title: "Review & Refine",
    description:
      "You get a preview link to review. We offer revisions until every detail is exactly right.",
  },
  {
    number: "04",
    title: "Share the Link",
    description:
      "Once approved, your invitation goes live. Share the link via message, social media, or QR code — effortlessly.",
  },
];

function HowItWorksSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="py-28 md:py-36 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase text-black/40 mb-4">
            The Process
          </p>
          <h2 className="font-calligraphy text-5xl md:text-6xl lg:text-7xl text-black mb-6">
            Simple & Seamless
          </h2>
          <div className="ornament-divider max-w-xs mx-auto">
            <span className="font-calligraphy text-2xl text-black/30">✦</span>
          </div>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-black/10 z-0" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {steps.map((step, i) => (
              <div
                key={step.number}
                style={{ transitionDelay: `${i * 200}ms` }}
                className={`relative text-center transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                {/* Step number circle */}
                <div className="relative z-10 w-24 h-24 rounded-full border border-black/20 flex items-center justify-center mx-auto mb-6 bg-white group hover:bg-black transition-all duration-500 cursor-default">
                  <span className="font-calligraphy text-3xl text-black/30 group-hover:text-white transition-colors duration-500">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-semibold text-black mb-3">
                  {step.title}
                </h3>
                <p className="text-black/50 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Gallery Section (Placeholder)
───────────────────────────────────────── */
function GallerySection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="gallery"
      ref={ref}
      className="py-28 md:py-36 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className={`text-center mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase text-black/40 mb-4">
            Our Work
          </p>
          <h2 className="font-calligraphy text-5xl md:text-6xl lg:text-7xl text-black mb-6">
            Gallery
          </h2>
          <div className="ornament-divider max-w-xs mx-auto">
            <span className="font-calligraphy text-2xl text-black/30">✦</span>
          </div>
        </div>

        <div className={`relative border border-dashed border-black/20 rounded-3xl p-20 text-center transition-all duration-1000 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="font-calligraphy text-6xl text-black/10 mb-6">Coming Soon</div>
          <p className="font-serif italic text-black/40 text-lg max-w-md mx-auto">
            We are currently curating our finest work to showcase here. Stay tuned for a collection of our most beautiful digital invitations.
          </p>
          <div className="mt-10">
            <a
              href="https://instagram.com/saveasdraft__"
              className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-black/60 hover:text-black transition-colors"
            >
              Follow us on Instagram for updates <span className="text-lg">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Feedback Section
───────────────────────────────────────── */
function FeedbackSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const actionData = useActionData() as { message?: string; error?: string };
  const loaderData = useLoaderData() as { feedbacks?: any[] };
  const feedbacks = loaderData?.feedbacks || [];

  useEffect(() => {
    if (actionData?.message) {
      toast.success(actionData.message, {
        style: {
          backgroundColor: "#fff",
          color: "#000",
          fontFamily: "'Playfair Display', serif",
          border: "1px solid #00000010",
          borderRadius: "12px",
          boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
          "--toastify-color-progress-light": "#000",
        } as React.CSSProperties,
      });
      formRef.current?.reset();
      setRating(0);
    } else if (actionData?.error) {
      toast.error(actionData.error, {
        style: {
          fontFamily: "'Playfair Display', serif",
          borderRadius: "12px",
        }
      });
    }
  }, [actionData]);

  return (
    <section
      id="feedback"
      ref={ref}
      className="py-28 md:py-36 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className={`text-center mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase text-black/40 mb-4">
            Testimonials & Feedback
          </p>
          <h2 className="font-calligraphy text-5xl md:text-6xl text-black mb-6">
            Your Thoughts Matter
          </h2>
          <div className="ornament-divider max-w-xs mx-auto">
            <span className="font-calligraphy text-2xl text-black/30">✦</span>
          </div>
          <p className="font-serif italic text-black/50 text-lg mt-6">
            We'd love to hear about your experience with SaveAsDraft.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Part: Form */}
          <div className={`lg:col-span-5 bg-white border border-black/5 rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/5 transition-all duration-1000 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Form 
              method="post" 
              action="?index"
              ref={formRef}
              className="space-y-6"
            >
              <input type="hidden" name="intent" value="feedback" />
              <input type="hidden" name="rating" value={rating} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[10px] tracking-widest uppercase text-black/40 font-medium ml-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full px-5 py-3.5 bg-black/[0.02] border border-black/5 rounded-xl focus:outline-none focus:border-black/20 focus:bg-white transition-all duration-300 font-serif text-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[10px] tracking-widest uppercase text-black/40 font-medium ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-5 py-3.5 bg-black/[0.02] border border-black/5 rounded-xl focus:outline-none focus:border-black/20 focus:bg-white transition-all duration-300 font-serif text-sm"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] tracking-widest uppercase text-black/40 font-medium ml-1 block">
                  Overall Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`text-xl transition-all duration-200 ${
                        star <= (hover || rating) ? "text-black scale-110" : "text-black/10"
                      }`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                    >
                      ✦
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-[10px] tracking-widest uppercase text-black/40 font-medium ml-1">
                  Your Feedback
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={3}
                  placeholder="Tell us what you liked..."
                  className="w-full px-5 py-3.5 bg-black/[0.02] border border-black/5 rounded-xl focus:outline-none focus:border-black/20 focus:bg-white transition-all duration-300 font-serif resize-none text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-black text-white text-[10px] font-medium tracking-widest uppercase rounded-xl hover:bg-black/80 transition-all duration-300 shadow-xl shadow-black/10 hover:-translate-y-1"
              >
                Submit Feedback
              </button>
            </Form>
          </div>

          {/* Right Part: Recent Feedbacks List */}
          <div className={`lg:col-span-7 flex flex-col gap-6 transition-all duration-1000 delay-500 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <h3 className="text-xs tracking-[0.3em] uppercase text-black/40 mb-2 px-2">
              Recent Feedbacks
            </h3>
            
            <div className="space-y-4">
              {feedbacks && feedbacks.length > 0 ? (
                feedbacks.map((item: any, idx: number) => (
                  <div 
                    key={item.id || idx}
                    className="bg-white border border-black/[0.03] rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start md:items-center hover:border-black/10 transition-all duration-300 group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                        <div className="flex items-center gap-3">
                          <span className="font-serif font-semibold text-black text-sm">{item.name}</span>
                          <div className="flex text-[10px] text-black/20 group-hover:text-black/40 transition-colors">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < item.rating ? "text-black/60" : ""}>✦</span>
                            ))}
                          </div>
                        </div>
                        <span className="text-[10px] text-black/30 font-serif italic truncate">({item.email})</span>
                      </div>
                      <p className="text-black/50 text-sm font-serif italic leading-relaxed line-clamp-2">
                        "{item.message}"
                      </p>
                    </div>
                    <div className="text-[10px] tracking-widest uppercase text-black/20 whitespace-nowrap">
                      {new Date(item.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                ))
              ) : (
                <div className="border border-dashed border-black/10 rounded-2xl p-12 text-center">
                  <p className="font-serif italic text-black/30">No feedback yet. Be the first to share your experience!</p>
                </div>
              )}
            </div>
            
            {feedbacks && feedbacks.length >= 5 && (
              <p className="text-center text-[10px] tracking-widest uppercase text-black/20 mt-4">
                ✦ Displaying latest responses ✦
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   CTA / Contact Section
───────────────────────────────────────── */
function ContactSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="contact"
      ref={ref}
      className="py-28 md:py-36 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <div className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase text-black/40 mb-4">
            Get in Touch
          </p>
          <h2 className="font-calligraphy text-5xl md:text-6xl lg:text-7xl text-black mb-8 leading-tight">
            Let's Create Something Beautiful
          </h2>
          <div className="ornament-divider max-w-xs mx-auto mb-10">
            <span className="font-calligraphy text-2xl text-black/30">
              ✦
            </span>
          </div>
          <p className="font-serif italic text-black/50 text-xl leading-relaxed max-w-2xl mx-auto mb-16">
            For inquiries, message us at our Instagram. If you cannot contact us there, you may reach us through our Facebook.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <a
              href="https://www.instagram.com/saveasdraft__/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 p-8 border border-black/5 rounded-2xl hover:border-black transition-all duration-500 w-full sm:w-80"
            >
              <div className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center text-2xl group-hover:bg-black group-hover:text-white transition-all duration-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
              <div>
                <div className="text-xs tracking-widest text-black/40 uppercase mb-1">
                  Instagram
                </div>
                <div className="text-black font-medium text-lg">
                  @saveasdraft__
                </div>
              </div>
            </a>

            <a
              href="https://www.facebook.com/ajrys"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 p-8 border border-black/5 rounded-2xl hover:border-black transition-all duration-500 w-full sm:w-80"
            >
              <div className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center text-2xl group-hover:bg-black group-hover:text-white transition-all duration-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </div>
              <div>
                <div className="text-xs tracking-widest text-black/40 uppercase mb-1">
                  Facebook
                </div>
                <div className="text-black font-medium text-lg">
                  Aj Reyes
                </div>
              </div>
            </a>
          </div>
          
          <p className="mt-16 text-black/30 text-sm font-serif italic">
            Typical response time: Within 24 hours
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Footer
───────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-white/10">
          {/* Logo side */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="h-14 w-14 rounded-full border border-white/20 overflow-hidden flex items-center justify-center bg-white shadow-inner">
              <img
                src={Logo}
                alt="SaveAsDraft"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="font-serif italic text-white/40 text-sm text-center md:text-left">
              Bespoke Digital Invitations for Your Special Day
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-6 justify-center">
            {[
              "About",
              "Services",
              "Gallery",
              "Sample Layout",
              "How It Works",
              "Contact",
            ].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors duration-200 underline-animated"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-white/30 text-xs tracking-wide">
            © {new Date().getFullYear()} SaveAsDraft. All rights reserved.
          </p>
          <p className="font-calligraphy text-white/20 text-xl">
            Love, beautifully shared.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────
   Main Export
───────────────────────────────────────── */
export function SaveAsDraftHome() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <SampleLayoutsSection />
      <HowItWorksSection />
      <FeedbackSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
