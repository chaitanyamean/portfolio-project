import { useState, useEffect, useRef } from "react";

const THEME_COLORS = {
  dark: {
    bg: "#08080C",
    bgOverlay: "rgba(8,8,12,0.92)",
    text: "#fff",
    textSecondary: "rgba(255,255,255,0.45)",
    textTertiary: "rgba(255,255,255,0.35)",
    textMuted: "rgba(255,255,255,0.2)",
    cardBg: "rgba(255,255,255,0.015)",
    cardBgHover: "rgba(255,255,255,0.03)",
    border: "rgba(255,255,255,0.05)",
    borderHover: "rgba(255,255,255,0.08)",
    inputBg: "rgba(255,255,255,0.03)",
    accent: "#00E5A0",
  },
  light: {
    bg: "#FFFFFF",
    bgOverlay: "rgba(255,255,255,0.92)",
    text: "#08080C",
    textSecondary: "rgba(8,8,12,0.65)",
    textTertiary: "rgba(8,8,12,0.55)",
    textMuted: "rgba(8,8,12,0.35)",
    cardBg: "rgba(8,8,12,0.02)",
    cardBgHover: "rgba(8,8,12,0.04)",
    border: "rgba(8,8,12,0.08)",
    borderHover: "rgba(8,8,12,0.12)",
    inputBg: "rgba(8,8,12,0.03)",
    accent: "#00E5A0",
  },
};

const PROJECTS = [
  {
    id: "archadvisor",
    title: "ArchAdvisor",
    subtitle: "Multi-Agent Architecture Design System",
    description:
      "Deterministic validation gates before LLM review. Generates API contracts, cost estimates, deployment topology, and confidence scoring — all from a natural language architecture prompt.",
    tags: ["Multi-Agent AI", "LLM", "System Design", "Validation Gates"],
    color: "#00E5A0",
    metrics: ["< 2s response", "95% accuracy", "Auto-generates API contracts"],
    icon: "◈",
  },
  {
    id: "hireai",
    title: "HireAI",
    subtitle: "Event-Driven Hiring Platform",
    description:
      "Full-stack hiring automation with RabbitMQ event bus, Redis caching, PostgreSQL with pgvector for semantic search, and Spring AI integration. Built for the Spring Boot Cohort 4.0 Hackathon.",
    tags: ["Spring Boot", "RabbitMQ", "Redis", "pgvector", "Spring AI"],
    color: "#FF6B35",
    metrics: ["Event-Driven", "Semantic Search", "Real-time Processing"],
    icon: "◉",
  },
  {
    id: "nl-codegen",
    title: "NL → Code Platform",
    subtitle: "Natural Language to Production React",
    description:
      "LangChain + FastAPI platform that converts natural language prompts into production-ready React components using GPT-4. Features session management and multi-framework roadmap.",
    tags: ["LangChain", "FastAPI", "GPT-4", "React", "Code Generation"],
    color: "#00B4D8",
    metrics: ["NL → JSX", "Session-aware", "Multi-framework"],
    icon: "◎",
  },
  {
    id: "telegram-devops",
    title: "Telegram DevOps Bot",
    subtitle: "Natural Language CI/CD Pipeline",
    description:
      "Zero-infrastructure deployment pipeline. Send a Telegram message, Claude Code modifies code, tests run, and changes deploy — all serverless via Cloudflare Workers + GitHub Actions.",
    tags: ["Claude Code", "Cloudflare Workers", "GitHub Actions", "Serverless"],
    color: "#F5A623",
    metrics: ["Zero servers", "$0 cost", "~90s to deploy"],
    icon: "◐",
  },
  {
    id: "axon",
    title: "Axon",
    subtitle: "Enterprise Data Processing Platform",
    description:
      "High-throughput data processing system built with React frontend, Java Spring Boot microservices, and PostgreSQL. Handles real-time analytics, batch processing, and complex query optimization for enterprise-scale applications.",
    tags: ["React", "Java", "PostgreSQL", "Spring Boot", "Microservices"],
    color: "#9D4EDD",
    metrics: ["Real-time analytics", "High throughput", "Enterprise-scale"],
    icon: "◆",
  },
];

const SKILLS = [
  { category: "AI/ML", items: ["LangChain", "Spring AI", "GPT-4", "pgvector", "Multi-Agent Systems"] },
  { category: "Backend", items: ["Spring Boot", "FastAPI", "PostgreSQL", "REST APIs", "Microservices"] },
  { category: "Infrastructure", items: ["RabbitMQ", "Redis", "Docker", "GitHub Actions", "AWS"] },
  { category: "Frontend", items: ["React", "JavaScript", "Tailwind CSS", "HTML/CSS"] },
  { category: "Architecture", items: ["System Design", "Event-Driven", "Circuit Breakers", "Caching"] },
];

const EXPERIENCE_YEARS = 15;

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, isVisible];
}

function useMouseGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return pos;
}

function Navbar({ activeSection, theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  const links = ["Home", "Projects", "Blog", "Skills", "Contact"];
  const colors = THEME_COLORS[theme];
  const inactiveColor = theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(8,8,12,0.5)";

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? "12px 40px" : "20px 40px",
      background: scrolled ? colors.bgOverlay : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${colors.border}` : "none",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    }}>
      <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "22px", color: colors.text, letterSpacing: "-0.5px" }}>
        K<span style={{ color: colors.accent }}>.</span>
      </div>
      <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
        {links.map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{
            color: activeSection === l.toLowerCase() ? colors.accent : inactiveColor,
            textDecoration: "none", fontSize: "13px", letterSpacing: "1.5px",
            textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => e.target.style.color = colors.accent}
          onMouseLeave={(e) => e.target.style.color = activeSection === l.toLowerCase() ? colors.accent : inactiveColor}
          >{l}</a>
        ))}
        <button
          onClick={toggleTheme}
          style={{
            background: "transparent",
            border: `1px solid ${colors.border}`,
            borderRadius: "8px",
            padding: "8px 12px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "all 0.3s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => e.target.style.borderColor = colors.accent}
          onMouseLeave={(e) => e.target.style.borderColor = colors.border}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}

function HeroSection({ theme, setShowTableView }) {
  const [ref, visible] = useInView();
  const mouse = useMouseGlow();
  const colors = THEME_COLORS[theme];
  return (
    <section id="home" ref={ref} style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", padding: "0 40px",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(600px circle at ${mouse.x}px ${mouse.y}px, rgba(0,229,160,0.04), transparent 60%)`,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: "15%", right: "8%", width: "300px", height: "300px",
        border: "1px solid rgba(0,229,160,0.08)", borderRadius: "50%",
        animation: "spin 30s linear infinite",
      }} />
      <div style={{
        position: "absolute", top: "20%", right: "12%", width: "200px", height: "200px",
        border: "1px solid rgba(123,97,255,0.08)", borderRadius: "50%",
        animation: "spin 20s linear infinite reverse",
      }} />
      <div style={{
        maxWidth: "900px", textAlign: "center",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <div style={{
          display: "inline-block", padding: "6px 16px", borderRadius: "100px",
          background: "rgba(0,229,160,0.08)", border: "1px solid rgba(0,229,160,0.15)",
          color: colors.accent, fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase",
          fontFamily: "'DM Sans', sans-serif", fontWeight: 600, marginBottom: "28px",
        }}>
          Principal Engineer · {EXPERIENCE_YEARS}+ Years
        </div>
        <h1 style={{
          fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(48px, 7vw, 88px)",
          fontWeight: 400, color: colors.text, lineHeight: 1.05, margin: "0 0 24px",
          letterSpacing: "-2px",
        }}>
          Building systems that
          <br />
          <span style={{
            background: "linear-gradient(135deg, #00E5A0, #00B4D8, #7B61FF)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>think, decide & ship</span>
        </h1>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "18px", color: colors.textSecondary,
          lineHeight: 1.7, maxWidth: "600px", margin: "0 auto 40px", fontWeight: 400,
        }}>
          I architect AI-powered platforms, event-driven systems, and developer tools
          that turn complex problems into elegant, production-grade solutions.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#projects" style={{
            padding: "14px 32px", background: colors.accent, color: theme === "dark" ? "#08080C" : "#fff",
            borderRadius: "8px", textDecoration: "none", fontSize: "14px",
            fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.5px",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 30px rgba(0,229,160,0.3)"; }}
          onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}
          >View Projects</a>
          <button
            onClick={() => setShowTableView(true)}
            style={{
              padding: "14px 32px", background: "transparent", color: colors.text,
              borderRadius: "8px", fontSize: "14px",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.5px",
              border: `1px solid ${colors.border}`, transition: "all 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = "rgba(0,229,160,0.5)"; e.target.style.color = colors.accent; }}
            onMouseLeave={(e) => { e.target.style.borderColor = colors.border; e.target.style.color = colors.text; }}
          >View Projects in a Table</button>
          <a href="#contact" style={{
            padding: "14px 32px", background: "transparent", color: colors.text,
            borderRadius: "8px", textDecoration: "none", fontSize: "14px",
            fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.5px",
            border: `1px solid ${colors.border}`, transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { e.target.style.borderColor = "rgba(0,229,160,0.5)"; e.target.style.color = colors.accent; }}
          onMouseLeave={(e) => { e.target.style.borderColor = colors.border; e.target.style.color = colors.text; }}
          >Let's connect</a>
        </div>
        <div style={{
          display: "flex", gap: "48px", justifyContent: "center", marginTop: "64px",
          borderTop: `1px solid ${colors.border}`, paddingTop: "40px",
        }}>
          {[
            { num: `${EXPERIENCE_YEARS}+`, label: "Years Experience" },
            { num: "5+", label: "AI Projects Shipped" },
            { num: "<10ms", label: "Response Targets" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "32px",
                color: colors.text, letterSpacing: "-1px",
              }}>{s.num}</div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "12px",
                color: colors.textTertiary, letterSpacing: "1px", textTransform: "uppercase", marginTop: "4px",
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, theme }) {
  const [ref, visible] = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  const colors = THEME_COLORS[theme];
  return (
    <div ref={ref}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? colors.cardBgHover : colors.cardBg,
        border: `1px solid ${hovered ? `${project.color}22` : colors.border}`,
        borderRadius: "16px", padding: "36px", position: "relative", overflow: "hidden",
        cursor: "default",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
      }}>
      <div style={{
        position: "absolute", top: "-40px", right: "-40px", width: "120px", height: "120px",
        background: `radial-gradient(circle, ${project.color}08, transparent 70%)`,
        transition: "opacity 0.4s", opacity: hovered ? 1 : 0,
      }} />
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
        <span style={{ fontSize: "24px", color: project.color, lineHeight: 1 }}>{project.icon}</span>
        <div>
          <h3 style={{
            fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "24px",
            color: colors.text, margin: 0, letterSpacing: "-0.5px",
          }}>{project.title}</h3>
          <div style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "12px",
            color: project.color, letterSpacing: "1px", textTransform: "uppercase",
            fontWeight: 600, opacity: 0.8, marginTop: "2px",
          }}>{project.subtitle}</div>
        </div>
      </div>
      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: "14.5px",
        color: colors.textSecondary, lineHeight: 1.7, margin: "0 0 20px",
      }}>{project.description}</p>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
        {project.tags.map((t) => (
          <span key={t} style={{
            padding: "4px 10px", borderRadius: "6px", fontSize: "11px",
            background: theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(8,8,12,0.04)",
            color: theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(8,8,12,0.5)",
            fontFamily: "'DM Mono', monospace", letterSpacing: "0.3px",
            border: `1px solid ${colors.border}`,
          }}>{t}</span>
        ))}
      </div>
      <div style={{
        display: "flex", gap: "16px", paddingTop: "16px",
        borderTop: `1px solid ${colors.border}`,
      }}>
        {project.metrics.map((m, i) => (
          <span key={i} style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "12px",
            color: colors.textMuted, display: "flex", alignItems: "center", gap: "6px",
          }}>
            <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: project.color, opacity: 0.6 }} />
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectsSection({ theme }) {
  const [ref, visible] = useInView();
  const colors = THEME_COLORS[theme];
  return (
    <section id="projects" ref={ref} style={{ padding: "120px 40px", maxWidth: "1100px", margin: "0 auto" }}>
      <div style={{
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <div style={{
          fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase",
          color: colors.accent, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, marginBottom: "12px",
        }}>Portfolio</div>
        <h2 style={{
          fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(36px, 5vw, 52px)",
          color: colors.text, margin: "0 0 16px", letterSpacing: "-1.5px", fontWeight: 400,
        }}>Featured Projects</h2>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "16px",
          color: colors.textTertiary, maxWidth: "500px", lineHeight: 1.6, marginBottom: "48px",
        }}>
          Systems I've designed and built — from multi-agent AI platforms to serverless DevOps pipelines.
        </p>
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "20px",
      }}>
        {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} theme={theme} />)}
      </div>
    </section>
  );
}

function BlogSection({ theme }) {
  const [ref, visible] = useInView();
  const colors = THEME_COLORS[theme];
  return (
    <section id="blog" ref={ref} style={{ padding: "120px 40px", maxWidth: "1100px", margin: "0 auto" }}>
      <div style={{
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <div style={{
          fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase",
          color: "#00B4D8", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, marginBottom: "12px",
        }}>Insights</div>
        <h2 style={{
          fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(36px, 5vw, 52px)",
          color: colors.text, margin: "0 0 16px", letterSpacing: "-1.5px", fontWeight: 400,
        }}>Blog</h2>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "16px",
          color: colors.textTertiary, maxWidth: "500px", lineHeight: 1.6, marginBottom: "48px",
        }}>
          Thoughts on engineering, architecture, and building scalable systems.
        </p>
      </div>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        minHeight: "300px",
        background: colors.cardBg,
        border: `1px solid ${colors.border}`,
        borderRadius: "16px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
      }}>
        <div style={{ textAlign: "center", padding: "40px" }}>
          <div style={{
            fontSize: "48px",
            marginBottom: "16px",
            opacity: 0.3,
          }}>📝</div>
          <h3 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: "24px",
            color: colors.text,
            marginBottom: "12px",
            letterSpacing: "-0.5px",
          }}>Coming Soon</h3>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px",
            color: colors.textSecondary,
            lineHeight: 1.6,
          }}>
            Blog posts and technical articles are on the way.
            <br />
            Stay tuned for deep dives into system design and architecture.
          </p>
        </div>
      </div>
    </section>
  );
}

function SkillsSection({ theme }) {
  const [ref, visible] = useInView();
  const themeColors = THEME_COLORS[theme];
  return (
    <section id="skills" ref={ref} style={{ padding: "100px 40px", maxWidth: "1100px", margin: "0 auto" }}>
      <div style={{
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <div style={{
          fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase",
          color: "#7B61FF", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, marginBottom: "12px",
        }}>Expertise</div>
        <h2 style={{
          fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(36px, 5vw, 52px)",
          color: themeColors.text, margin: "0 0 48px", letterSpacing: "-1.5px", fontWeight: 400,
        }}>Technical Stack</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px" }}>
        {SKILLS.map((s, ci) => {
          const colors = ["#00E5A0", "#FF6B35", "#7B61FF", "#00B4D8", "#FF3366"];
          const color = colors[ci % colors.length];
          const itemColor = theme === "dark" ? "rgba(255,255,255,0.55)" : "rgba(8,8,12,0.55)";
          const itemHoverColor = themeColors.text;
          return (
            <div key={s.category} style={{
              opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${ci * 0.1}s`,
            }}>
              <div style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "2px",
                textTransform: "uppercase", color, fontWeight: 700, marginBottom: "16px",
                display: "flex", alignItems: "center", gap: "8px",
              }}>
                <span style={{ width: "16px", height: "1px", background: color }} />
                {s.category}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {s.items.map((item) => (
                  <div key={item} style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
                    color: itemColor, padding: "8px 0",
                    borderBottom: `1px solid ${themeColors.border}`,
                    transition: "color 0.2s, padding-left 0.2s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => { e.target.style.color = itemHoverColor; e.target.style.paddingLeft = "8px"; }}
                  onMouseLeave={(e) => { e.target.style.color = itemColor; e.target.style.paddingLeft = "0"; }}
                  >{item}</div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ContactSection({ theme }) {
  const [ref, visible] = useInView();
  const [hovered, setHovered] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", mobile: "", age: "", message: "" });
  const colors = THEME_COLORS[theme];

  const handleSubmit = () => {
    if (form.firstName && form.lastName && form.email && form.message) {
      setSent(true);
      setTimeout(() => { setSent(false); setForm({ firstName: "", lastName: "", email: "", mobile: "", age: "", message: "" }); }, 3000);
    }
  };

  const inputStyle = {
    width: "100%", padding: "14px 16px", background: colors.inputBg,
    border: `1px solid ${colors.borderHover}`, borderRadius: "8px", color: colors.text,
    fontFamily: "'DM Sans', sans-serif", fontSize: "14px", outline: "none",
    transition: "border-color 0.3s", boxSizing: "border-box",
  };

  return (
    <section id="contact" ref={ref} style={{
      padding: "120px 40px", maxWidth: "700px", margin: "0 auto",
    }}>
      <div style={{
        textAlign: "center",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <div style={{
          fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase",
          color: "#FF6B35", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, marginBottom: "12px",
        }}>Get in Touch</div>
        <h2 style={{
          fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(36px, 5vw, 52px)",
          color: colors.text, margin: "0 0 16px", letterSpacing: "-1.5px", fontWeight: 400,
        }}>Let's Build Together</h2>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "16px",
          color: colors.textTertiary, lineHeight: 1.6, marginBottom: "48px",
        }}>
          Open to Staff/Principal Engineering roles and exciting technical challenges.
        </p>
      </div>
      <div style={{
        display: "flex", flexDirection: "column", gap: "16px",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
      }}>
        <input style={inputStyle} placeholder="First Name" value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          onFocus={(e) => e.target.style.borderColor = "rgba(0,229,160,0.4)"}
          onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
        <input style={inputStyle} placeholder="Last Name" value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          onFocus={(e) => e.target.style.borderColor = "rgba(0,229,160,0.4)"}
          onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
        <input style={inputStyle} placeholder="Your Email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          onFocus={(e) => e.target.style.borderColor = "rgba(0,229,160,0.4)"}
          onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
        <input style={inputStyle} placeholder="Mobile Number" value={form.mobile}
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          onFocus={(e) => e.target.style.borderColor = "rgba(0,229,160,0.4)"}
          onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
        <input style={inputStyle} placeholder="Age" value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          onFocus={(e) => e.target.style.borderColor = "rgba(0,229,160,0.4)"}
          onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
        <textarea style={{ ...inputStyle, minHeight: "140px", resize: "vertical" }}
          placeholder="Your Message" value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          onFocus={(e) => e.target.style.borderColor = "rgba(0,229,160,0.4)"}
          onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
        <button
          onClick={handleSubmit}
          onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
          style={{
            padding: "16px 32px",
            background: sent ? colors.accent : hovered ? colors.bg : colors.bg,
            color: sent ? (theme === "dark" ? "#000" : "#fff") : colors.text,
            border: `1px solid ${sent ? colors.accent : hovered ? colors.accent : colors.border}`,
            borderRadius: "8px", fontSize: "14px", fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600, letterSpacing: "0.5px", cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            transform: hovered && !sent ? "translateY(-1px)" : "translateY(0)",
            boxShadow: hovered && !sent ? "0 4px 20px rgba(0,229,160,0.15)" : "none",
          }}>
          {sent ? "Message Sent!" : "Send Message"}
        </button>
      </div>
    </section>
  );
}

function ProjectTableModal({ showTableView, setShowTableView, theme }) {
  const colors = THEME_COLORS[theme];

  if (!showTableView) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(10px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={() => setShowTableView(false)}
    >
      <div
        style={{
          background: colors.bg,
          borderRadius: "16px",
          border: `1px solid ${colors.border}`,
          maxWidth: "1200px",
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
          padding: "32px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}>
          <h2 style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: "32px",
            color: colors.text,
            margin: 0,
            letterSpacing: "-1px",
          }}>Projects Overview</h2>
          <button
            onClick={() => setShowTableView(false)}
            style={{
              background: "transparent",
              border: `1px solid ${colors.border}`,
              borderRadius: "8px",
              padding: "8px 16px",
              cursor: "pointer",
              fontSize: "14px",
              color: colors.text,
              fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = colors.accent;
              e.target.style.color = colors.accent;
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = colors.border;
              e.target.style.color = colors.text;
            }}
          >
            Close
          </button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "'DM Sans', sans-serif",
          }}>
            <thead>
              <tr style={{
                borderBottom: `2px solid ${colors.border}`,
              }}>
                <th style={{
                  padding: "16px",
                  textAlign: "left",
                  fontSize: "12px",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: colors.accent,
                  fontWeight: 600,
                }}>Icon</th>
                <th style={{
                  padding: "16px",
                  textAlign: "left",
                  fontSize: "12px",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: colors.accent,
                  fontWeight: 600,
                }}>Project Name</th>
                <th style={{
                  padding: "16px",
                  textAlign: "left",
                  fontSize: "12px",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: colors.accent,
                  fontWeight: 600,
                }}>Subtitle</th>
                <th style={{
                  padding: "16px",
                  textAlign: "left",
                  fontSize: "12px",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: colors.accent,
                  fontWeight: 600,
                }}>Description</th>
                <th style={{
                  padding: "16px",
                  textAlign: "left",
                  fontSize: "12px",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: colors.accent,
                  fontWeight: 600,
                }}>Tags</th>
                <th style={{
                  padding: "16px",
                  textAlign: "left",
                  fontSize: "12px",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: colors.accent,
                  fontWeight: 600,
                }}>Metrics</th>
              </tr>
            </thead>
            <tbody>
              {PROJECTS.map((project, index) => (
                <tr
                  key={project.id}
                  style={{
                    borderBottom: `1px solid ${colors.border}`,
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = colors.cardBgHover}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <td style={{
                    padding: "16px",
                    fontSize: "24px",
                  }}>
                    <span style={{ color: project.color }}>{project.icon}</span>
                  </td>
                  <td style={{
                    padding: "16px",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: colors.text,
                  }}>
                    {project.title}
                  </td>
                  <td style={{
                    padding: "16px",
                    fontSize: "12px",
                    color: project.color,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}>
                    {project.subtitle}
                  </td>
                  <td style={{
                    padding: "16px",
                    fontSize: "13px",
                    color: colors.textSecondary,
                    lineHeight: 1.6,
                    maxWidth: "350px",
                  }}>
                    {project.description}
                  </td>
                  <td style={{
                    padding: "16px",
                  }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "10px",
                            background: theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(8,8,12,0.04)",
                            color: theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(8,8,12,0.5)",
                            border: `1px solid ${colors.border}`,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td style={{
                    padding: "16px",
                  }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {project.metrics.map((metric, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: "11px",
                            color: colors.textMuted,
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <span style={{
                            width: "4px",
                            height: "4px",
                            borderRadius: "50%",
                            background: project.color,
                            opacity: 0.6,
                          }} />
                          {metric}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Footer({ theme }) {
  const colors = THEME_COLORS[theme];
  return (
    <footer style={{
      padding: "40px", textAlign: "center",
      borderTop: `1px solid ${colors.border}`,
    }}>
      <div style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: "13px",
        color: colors.textMuted,
      }}>
        Built with passion · Krishna © 2026
      </div>
    </footer>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [showTableView, setShowTableView] = useState(false);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("portfolio-theme");
    return saved || "dark";
  });

  useEffect(() => {
    localStorage.setItem("portfolio-theme", theme);
    document.body.style.background = THEME_COLORS[theme].bg;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const sections = ["home", "projects", "blog", "skills", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const colors = THEME_COLORS[theme];

  return (
    <div style={{
      minHeight: "100vh", background: colors.bg, color: colors.text, position: "relative",
      overflowX: "hidden", transition: "background 0.3s, color 0.3s",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: ${colors.bg}; transition: background 0.3s; }
        ::selection { background: rgba(0,229,160,0.2); color: ${colors.text}; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${colors.bg}; }
        ::-webkit-scrollbar-thumb { background: ${colors.border}; border-radius: 3px; }
        @media (max-width: 768px) {
          section { padding-left: 20px !important; padding-right: 20px !important; }
          nav { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>
      <Navbar activeSection={activeSection} theme={theme} toggleTheme={toggleTheme} />
      <HeroSection theme={theme} setShowTableView={setShowTableView} />
      <ProjectsSection theme={theme} />
      <BlogSection theme={theme} />
      <SkillsSection theme={theme} />
      <ContactSection theme={theme} />
      <Footer theme={theme} />
      <ProjectTableModal showTableView={showTableView} setShowTableView={setShowTableView} theme={theme} />
    </div>
  );
}
