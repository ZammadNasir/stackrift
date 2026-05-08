"use client";

import { useEffect, useRef, useState } from "react";

const navLinks = ["Features", "Work", "Process", "Pricing"];

const marqueeItems = [
  "Figma",
  "React",
  "Next.js",
  "Tailwind CSS",
  "TypeScript",
  "Framer Motion",
  "Pixel Perfect",
  "Responsive Design",
  "Component Architecture",
];

const features = [
  {
    icon: "Px",
    title: "Pixel Perfect Output",
    description: "Every spacing, shadow, and font matched exactly to your Figma file",
  },
  {
    icon: "Nx",
    title: "Next.js Ready",
    description: "Pages, routing, and layouts built with Next.js App Router out of the box",
  },
  {
    icon: "Tw",
    title: "Tailwind CSS",
    description: "Utility-first styling with a clean, scalable class structure",
  },
  {
    icon: "Ts",
    title: "TypeScript Support",
    description: "Fully typed components for safer, more maintainable code",
  },
  {
    icon: "Rs",
    title: "Responsive by Default",
    description: "Mobile, tablet, and desktop all handled from day one",
  },
  {
    icon: "48",
    title: "Fast Delivery",
    description: "Most projects shipped within 48 to 72 hours",
  },
];

const projects = [
  {
    name: "NovaPay",
    tag: "Fintech dashboard",
    description: "Multi-page admin dashboard with data tables, charts, and dark mode",
    accent: "from-[#6C63FF] to-[#00D4FF]",
  },
  {
    name: "Bloomly",
    tag: "E-commerce landing page",
    description: "Product landing page with cart, filters, and animated hero",
    accent: "from-[#ff6cb8] to-[#6C63FF]",
  },
  {
    name: "TaskFlow",
    tag: "SaaS app UI",
    description: "Full Next.js app with auth pages, sidebar layout, and onboarding flow",
    accent: "from-[#00D4FF] to-[#34d399]",
  },
];

const steps = [
  {
    number: "01",
    title: "Share your Figma",
    description: "Drop your file link or export the frames",
  },
  {
    number: "02",
    title: "We build it",
    description: "Clean React/Next.js code, component by component",
  },
  {
    number: "03",
    title: "You ship it",
    description: "Review, request revisions, and go live",
  },
];

const stats = [
  { value: 50, suffix: "+", label: "Figma files converted" },
  { value: 100, suffix: "%", label: "Pixel accuracy rate" },
  { value: 48, suffix: "hr", label: "Average delivery time" },
  { value: 5, suffix: "/5", label: "Average client rating" },
];

const pricing = [
  {
    tier: "Starter",
    price: "$49",
    features: ["1 page", "Basic components", "2 revisions"],
  },
  {
    tier: "Pro",
    price: "$129",
    popular: true,
    features: ["Up to 5 pages", "Full responsive build", "TypeScript", "5 revisions"],
  },
  {
    tier: "Scale",
    price: "$249",
    features: ["Unlimited pages", "Next.js App Router", "Animations", "Priority delivery"],
  },
];

const testimonials = [
  {
    name: "Sarah K.",
    initials: "SK",
    quote:
      "Stackrift turned our Figma prototype into a live Next.js app in under 2 days. Absolutely flawless.",
  },
  {
    name: "Marcus T.",
    initials: "MT",
    quote:
      "The code quality was cleaner than what our in-house team would have written. Seriously impressive.",
  },
  {
    name: "Priya M.",
    initials: "PM",
    quote:
      "Pixel perfect doesn't even cover it. Every hover state, every breakpoint exactly as designed.",
  },
];

function RevealSection({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      queueMicrotask(() => setIsVisible(true));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} ref={sectionRef} className={`${isVisible ? "reveal is-visible" : "reveal"} ${className}`}>
      {children}
    </section>
  );
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      queueMicrotask(() => setCount(value));
      return;
    }

    let frame = 0;
    let started = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) {
          return;
        }

        started = true;
        const start = performance.now();
        const duration = 1400;

        const tick = (time: number) => {
          const progress = Math.min((time - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(value * eased));

          if (progress < 1) {
            frame = requestAnimationFrame(tick);
          }
        };

        frame = requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.4 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white">
      <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/15 bg-white/[0.06] text-[#00D4FF] shadow-[0_0_28px_rgba(108,99,255,0.45)]">
        <span className="translate-y-[-1px] text-base">↯</span>
      </span>
      Stackrift
    </a>
  );
}

function HeroMockup() {
  return (
    <div className="relative mx-auto mt-16 grid max-w-5xl items-center gap-5 lg:grid-cols-[1fr_90px_1fr]">
      <div className="mock-card figma-frame">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff6b6b]" />
          <span className="h-3 w-3 rounded-full bg-[#ffd166]" />
          <span className="h-3 w-3 rounded-full bg-[#06d6a0]" />
          <span className="ml-auto text-xs text-white/45">Figma</span>
        </div>
        <div className="grid grid-cols-[72px_1fr] gap-4 p-4">
          <div className="space-y-3 border-r border-white/10 pr-4">
            {[0, 1, 2, 3].map((item) => (
              <span key={item} className="block h-10 rounded-md border border-white/10 bg-white/[0.04]" />
            ))}
          </div>
          <div className="space-y-4">
            <div className="h-28 rounded-xl border border-[#6C63FF]/40 bg-[#6C63FF]/15 p-4">
              <span className="block h-3 w-24 rounded-full bg-white/30" />
              <span className="mt-4 block h-8 w-40 rounded-lg bg-white/70" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[0, 1, 2].map((item) => (
                <span key={item} className="h-20 rounded-lg border border-white/10 bg-white/[0.05]" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="morph-arrow mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#6C63FF]/35 bg-[#6C63FF]/10 text-3xl text-[#00D4FF]">
        →
      </div>

      <div className="mock-card code-frame">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff6b6b]" />
          <span className="h-3 w-3 rounded-full bg-[#ffd166]" />
          <span className="h-3 w-3 rounded-full bg-[#06d6a0]" />
          <span className="ml-auto text-xs text-white/45">app/page.tsx</span>
        </div>
        <div className="grid grid-cols-[1fr_1.2fr] gap-4 p-4">
          <div className="rounded-xl border border-white/10 bg-[#080810] p-4">
            <span className="mb-3 block h-3 w-20 rounded-full bg-[#00D4FF]/70" />
            <span className="mb-2 block h-3 w-full rounded-full bg-white/15" />
            <span className="mb-2 block h-3 w-4/5 rounded-full bg-white/15" />
            <span className="block h-3 w-2/3 rounded-full bg-[#6C63FF]/55" />
          </div>
          <div className="rounded-xl border border-[#00D4FF]/25 bg-white/[0.04] p-4">
            <span className="block h-10 rounded-lg bg-gradient-to-r from-[#6C63FF] to-[#00D4FF]" />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <span className="h-16 rounded-md bg-white/10" />
              <span className="h-16 rounded-md bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectPreview({ accent }: { accent: string }) {
  return (
    <div className="grid h-56 grid-cols-2 overflow-hidden rounded-lg border border-white/10 bg-[#090914]">
      <div className="border-r border-white/10 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:18px_18px] p-4">
        <div className="h-full rounded-lg border border-dashed border-white/20 p-4">
          <span className="mb-4 block h-4 w-20 rounded-full bg-white/15" />
          <span className="mb-3 block h-9 rounded-md border border-white/20" />
          <div className="grid grid-cols-2 gap-3">
            <span className="h-16 rounded-md border border-white/20" />
            <span className="h-16 rounded-md border border-white/20" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className={`mb-4 h-20 rounded-lg bg-gradient-to-br ${accent} opacity-90`} />
        <span className="mb-3 block h-3 w-24 rounded-full bg-white/70" />
        <span className="mb-2 block h-3 rounded-full bg-white/20" />
        <span className="mb-4 block h-3 w-4/5 rounded-full bg-white/15" />
        <div className="grid grid-cols-3 gap-2">
          <span className="h-10 rounded-md bg-white/10" />
          <span className="h-10 rounded-md bg-white/10" />
          <span className="h-10 rounded-md bg-white/10" />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <main id="top" className="min-h-screen overflow-hidden bg-[#080810] text-white">
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#080810]/70 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Logo />
          <div className="hidden items-center gap-8 text-sm text-white/62 md:flex">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="transition hover:text-white">
                {link}
              </a>
            ))}
          </div>
          <a
            href="#pricing"
            className="rounded-full bg-[#6C63FF] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(108,99,255,0.5)] transition hover:-translate-y-0.5 hover:bg-[#7d75ff]"
          >
            Get Started
          </a>
        </div>
      </nav>

      <section className="relative px-5 pb-24 pt-36 sm:px-8 lg:pb-32 lg:pt-44">
        <div className="hero-glow" />
        <div className="relative mx-auto max-w-7xl text-center">
          <p className="mb-6 inline-flex rounded-full border border-[#6C63FF]/30 bg-[#6C63FF]/10 px-4 py-2 text-sm font-medium text-[#bdb9ff]">
            From Figma to production-ready Next.js. Instantly.
          </p>
          <h1 className="mx-auto max-w-6xl text-balance text-5xl font-black leading-[0.96] tracking-tight text-white sm:text-7xl lg:text-8xl">
            Your Figma designs. Turned into React apps. Pixel by pixel.
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-lg font-light leading-8 text-white/62 sm:text-xl">
            Stackrift converts any Figma file into clean, scalable React / Next.js code responsive,
            fast, and production-ready.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#work"
              className="w-full rounded-full bg-[#6C63FF] px-7 py-4 text-center text-sm font-bold text-white shadow-[0_0_40px_rgba(108,99,255,0.45)] transition hover:-translate-y-0.5 hover:bg-[#7d75ff] sm:w-auto"
            >
              See Our Work
            </a>
            <a
              href="#process"
              className="w-full rounded-full border border-white/16 bg-white/[0.03] px-7 py-4 text-center text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-[#00D4FF]/50 hover:text-[#00D4FF] sm:w-auto"
            >
              How It Works
            </a>
          </div>
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="flex -space-x-3">
              {["AK", "JL", "RM", "NS", "VP"].map((avatar, index) => (
                <span
                  key={avatar}
                  className="grid h-10 w-10 place-items-center rounded-full border-2 border-[#080810] bg-gradient-to-br from-[#6C63FF] to-[#00D4FF] text-xs font-bold"
                  style={{ opacity: 1 - index * 0.08 }}
                >
                  {avatar}
                </span>
              ))}
            </div>
            <span className="text-sm text-white/55">50+ designs shipped</span>
          </div>
          <HeroMockup />
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0b0d1a] py-5">
        <div className="marquee">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span key={`${item}-${index}`} className="marquee-item">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <RevealSection id="features" className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <h2 className="max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
            Everything your frontend needs.
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.title} className="feature-card rounded-lg border border-white/10 bg-white/[0.035] p-6">
                <div className="mb-8 grid h-11 w-11 place-items-center rounded-lg border border-[#6C63FF]/30 bg-[#6C63FF]/10 text-sm font-black text-[#bdb9ff]">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                <p className="mt-3 leading-7 text-white/58">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection id="work" className="bg-[#0b0d1a] px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <h2 className="max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
            Designs we&apos;ve brought to life.
          </h2>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {projects.map((project) => (
              <article key={project.name} className="rounded-lg border border-white/10 bg-[#080810] p-4">
                <ProjectPreview accent={project.accent} />
                <div className="p-2 pt-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-bold">{project.name}</h3>
                    <span className="rounded-full border border-[#6C63FF]/30 bg-[#6C63FF]/10 px-3 py-1 text-xs font-semibold text-[#bdb9ff]">
                      {project.tag}
                    </span>
                  </div>
                  <p className="mt-3 leading-7 text-white/58">{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection id="process" className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-black tracking-tight sm:text-6xl">How it works.</h2>
          <div className="timeline mt-14 grid gap-6 lg:grid-cols-3">
            {steps.map((step) => (
              <article key={step.number} className="relative rounded-lg border border-white/10 bg-white/[0.035] p-7">
                <div className="mb-8 grid h-14 w-14 place-items-center rounded-full border border-[#00D4FF]/30 bg-[#00D4FF]/10 text-sm font-black text-[#00D4FF]">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold">{step.title}</h3>
                <p className="mt-3 leading-7 text-white/58">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="border-y border-white/10 bg-[#0b0d1a] px-5 py-14 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-sm uppercase tracking-[0.18em] text-white/45">{stat.label}</p>
            </div>
          ))}
        </div>
      </RevealSection>

      <RevealSection id="pricing" className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-black tracking-tight sm:text-6xl">Simple, honest pricing.</h2>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {pricing.map((plan) => (
              <article
                key={plan.tier}
                className={`relative rounded-lg border p-7 ${
                  plan.popular
                    ? "border-[#6C63FF]/60 bg-[#6C63FF]/10 shadow-[0_0_60px_rgba(108,99,255,0.22)]"
                    : "border-white/10 bg-white/[0.035]"
                }`}
              >
                {plan.popular ? (
                  <span className="absolute right-5 top-5 rounded-full bg-[#6C63FF] px-3 py-1 text-xs font-bold">
                    Most Popular
                  </span>
                ) : null}
                <h3 className="text-2xl font-bold">{plan.tier}</h3>
                <div className="mt-5 flex items-end gap-2">
                  <span className="text-5xl font-black">{plan.price}</span>
                  <span className="pb-2 text-white/45">/ project</span>
                </div>
                <ul className="mt-8 space-y-4 text-white/65">
                  {plan.features.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="text-[#00D4FF]">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="#top"
                  className={`mt-8 block rounded-full px-5 py-3 text-center text-sm font-bold transition hover:-translate-y-0.5 ${
                    plan.popular
                      ? "bg-[#6C63FF] text-white"
                      : "border border-white/14 bg-white/[0.03] text-white hover:border-[#6C63FF]/60"
                  }`}
                >
                  Get Started
                </a>
              </article>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="bg-[#0b0d1a] px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-black tracking-tight sm:text-6xl">What clients say.</h2>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="rounded-lg border border-white/10 bg-[#080810] p-7">
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[#6C63FF] to-[#00D4FF] text-sm font-black">
                    {testimonial.initials}
                  </span>
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-[#00D4FF]">5&#9733; rating</p>
                  </div>
                </div>
                <p className="mt-7 text-lg leading-8 text-white/68">&quot;{testimonial.quote}&quot;</p>
              </article>
            ))}
          </div>
        </div>
      </RevealSection>

      <footer className="px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-10 border-b border-white/10 pb-10 lg:flex-row lg:items-center">
            <div>
              <Logo />
              <p className="mt-4 max-w-md text-white/55">
                From Figma to production-ready Next.js. Instantly.
              </p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-white/58">
              {["Features", "Work", "Pricing", "Contact"].map((link) => (
                <a key={link} href={link === "Contact" ? "mailto:hello@stackrift.dev" : `#${link.toLowerCase()}`} className="hover:text-white">
                  {link}
                </a>
              ))}
            </div>
            <div className="flex gap-3">
              {["GH", "X", "in"].map((social) => (
                <a
                  key={social}
                  href="#top"
                  aria-label={social}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-sm font-bold text-white/70 hover:border-[#00D4FF]/45 hover:text-[#00D4FF]"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
          <p className="pt-8 text-sm text-white/38">
            &copy; {year} Stackrift. Built with React &amp; Next.js.
          </p>
        </div>
      </footer>
    </main>
  );
}
