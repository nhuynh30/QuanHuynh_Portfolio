import { useState, useEffect, useRef } from 'react';
import {
  IconMapPin,
  IconBrandReact,
  IconBrandPython,
  IconCoffee,
  IconBrandGit,
  IconUsers,
  IconTerminal2,
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconDownload,
  IconArrowRight,
  IconSun,
  IconMoon,
} from '@tabler/icons-react';
import { useTheme } from './context/ThemeContext';
import { useTilt } from './hooks/useTilt';

// === DATA ===
const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

const stats = [
  { value: '3+', label: 'Projects' },
  { value: '2+', label: 'Years Coding' },
  { value: '2028', label: 'Graduation' },
  { value: 'GMU', label: 'Class of 2028' },
];

const skills = [
  { name: 'React', level: 'Advanced', progress: 85, Icon: IconBrandReact },
  { name: 'Python', level: 'Advanced', progress: 80, Icon: IconBrandPython },
  { name: 'Java', level: 'Intermediate', progress: 65, Icon: IconCoffee },
  { name: 'Git', level: 'Advanced', progress: 90, Icon: IconBrandGit },
];

const projects = [
  {
    tag: 'Full Stack',
    title: 'StudyBuddy',
    description: 'A collaborative study planner app built with React and Firebase for campus students.',
    Icon: IconUsers,
  },
  {
    tag: 'Automation',
    title: 'Course Data Scraper',
    description: 'Python automation script that extracts university course details and builds study schedules.',
    Icon: IconTerminal2,
  },
];

// === HOOKS ===
function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useSkillBars() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('animate'), 300);
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll('.skill-card').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// === NAVBAR ===
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
  };

  return (
    <header className={`topbar${scrolled ? ' topbar--scrolled' : ''}`}>
      <div className="container topbar__inner">
        <a className="brand" href="#home">
          QH<span className="brand-dot">.</span>
        </a>
        <nav className="nav">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={(e) => scrollTo(e, item.id)}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="topbar__right">
          <div className="theme-toggle-wrap">
            <span className="mode-label">{isDark ? 'DARK' : 'LIGHT'}</span>
            <button className="toggle-btn" onClick={toggle} aria-label="Toggle dark mode">
              <div className="toggle-knob">
                {isDark ? <IconMoon size={13} /> : <IconSun size={13} />}
              </div>
            </button>
          </div>
          <a className="btn btn--cv" href="/cv.pdf" download>
            <IconDownload size={15} />
            Download CV
          </a>
        </div>
      </div>
    </header>
  );
}

// === HERO ===
function Hero() {
  const boxRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const dy = (e.clientY - rect.top - rect.height / 2) / rect.height;
    boxRef.current.style.transform = `perspective(1000px) rotateY(${-15 + dx * 18}deg) rotateX(${5 - dy * 14}deg) translateZ(50px)`;
  };

  const handleMouseLeave = () => {
    if (!boxRef.current) return;
    boxRef.current.style.transform = 'perspective(1000px) rotateY(-15deg) rotateX(5deg) translateZ(50px)';
  };

  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home" data-tilt-zone>
      <div className="container">
        <div className="hero__row animate-on-scroll">
          {/* Left column */}
          <div className="hero__left">
            <div className="hero__location">
              <IconMapPin size={14} />
              George Mason University · Fairfax, VA
            </div>
            <h1 className="hero__title">
              <span className="light">Hi, I'm</span>
              <span className="name-first">Quan</span>
              <span className="name-last">Huynh</span>
            </h1>
            <p className="hero__sub">
              A rising CS junior who loves building things for the web. Passionate about clean code,
              great UX, and solving real problems.
            </p>
            <div className="hero__cta">
              <a href="#projects" className="btn btn--primary" onClick={(e) => scrollTo(e, 'projects')}>
                View My Work
              </a>
              <a href="#contact" className="btn btn--outline" onClick={(e) => scrollTo(e, 'contact')}>
                Say Hello
              </a>
            </div>
          </div>

          {/* Right column */}
          <div className="hero__right">
            <div className="hero__panel">
              <div className="hero__badge hero__badge--tl">
                <span className="badge-dot" />
                CS Major
              </div>

              <div className="hero__photo-float">
                <div
                  ref={boxRef}
                  className="hero__image-box"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <img src="/assets/quan.png" alt="Quan Huynh" className="hero__image" />
                </div>
              </div>

              <div className="hero__badge hero__badge--br">
                <span className="badge-dot" />
                Open to internships
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// === STATS ===
function Stats() {
  const r0 = useTilt(6, 1.4);
  const r1 = useTilt(6, 1.4);
  const r2 = useTilt(6, 1.4);
  const r3 = useTilt(6, 1.4);
  const tiltRefs = [r0, r1, r2, r3];

  return (
    <section className="stats-section" data-tilt-zone>
      <div className="container">
        <div className="stats__inner animate-on-scroll">
          {stats.map((s, i) => (
            <div className="stat-card" key={i} ref={tiltRefs[i]}>
              <p className="stat-value">{s.value}</p>
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// === GMU SECTION ===
function GMUSection() {
  return (
    <section className="gmu-section" id="about">
      <div className="gmu-ghost" aria-hidden="true">MASON</div>
      <div className="container">
        <div className="gmu-row">
          {/* Left: stacked photo cards */}
          <div className="animate-on-scroll">
            <div className="gmu-stack">
              <div className="gmu-card gmu-card--back">
                <img src="/assets/school1.png" alt="" aria-hidden="true" />
              </div>
              <div className="gmu-card gmu-card--front">
                <img src="/assets/schoologo.png" alt="George Mason University" />
              </div>
              <div className="gmu-info-badge">
                <div className="gmu-info-badge__logo">GM</div>
                <div className="gmu-info-badge__text">
                  <strong>George Mason</strong>
                  <span>Est. 1972 · Fairfax, VA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: text content */}
          <div className="animate-on-scroll">
            <p className="gmu-eyebrow">WHERE I STUDY</p>
            <div className="gmu-divider" />
            <h2 className="gmu-heading">
              George Mason<br />
              <span className="green">University</span>
            </h2>
            <p className="gmu-desc">
              Proudly studying Computer Science at GMU — one of the top CS programs in Virginia.
              Rising junior graduating May 2028. Diving deep into algorithms, systems, and
              software engineering.
            </p>
            <div className="gmu-pills">
              {['Computer Science', 'Rising Junior', 'Class of 2028', 'Fairfax, VA'].map((p) => (
                <span key={p} className="gmu-pill">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// === SKILLS ===
function Skills() {
  const s0 = useTilt(7, 1.3);
  const s1 = useTilt(7, 1.3);
  const s2 = useTilt(7, 1.3);
  const s3 = useTilt(7, 1.3);
  const tiltRefs = [s0, s1, s2, s3];

  return (
    <section className="skills-section" id="skills" data-tilt-zone>
      <div className="container">
        <div className="animate-on-scroll">
          <p className="section-eyebrow">WHAT I KNOW</p>
          <h2 className="section-title">My <span className="accent">skills</span></h2>
        </div>
        <div className="skills__grid">
          {skills.map((skill, i) => (
            <div
              className="skill-card animate-on-scroll"
              key={i}
              ref={tiltRefs[i]}
              style={{ '--progress': `${skill.progress}%` }}
            >
              <div className="skill-icon">
                <skill.Icon size={24} />
              </div>
              <p className="skill-name">{skill.name}</p>
              <p className="skill-level">{skill.level}</p>
              <div className="skill-progress">
                <div className="skill-bar" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// === PROJECTS ===
function Projects() {
  const p0 = useTilt(8, 1.2);
  const p1 = useTilt(8, 1.2);
  const tiltRefs = [p0, p1];

  return (
    <section className="projects-section" id="projects" data-tilt-zone>
      <div className="container">
        <div className="animate-on-scroll">
          <p className="section-eyebrow">WHAT I'VE BUILT</p>
          <h2 className="section-title">My <span className="accent">projects</span></h2>
        </div>
        <div className="projects__grid">
          {projects.map((project, i) => (
            <div className="project-card animate-on-scroll" key={i} ref={tiltRefs[i]}>
              <div className="project__preview">
                <div className="project__preview-icon">
                  <project.Icon size={28} />
                </div>
              </div>
              <div className="project__body">
                <span className="project__tag">{project.tag}</span>
                <h3 className="project__title">{project.title}</h3>
                <p className="project__desc">{project.description}</p>
                <a href="#" className="project__link">
                  View project <IconArrowRight size={15} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// === CTA BANNER ===
function CTABanner() {
  return (
    <section className="cta-section" id="contact">
      <div className="cta-card animate-on-scroll">
        <div>
          <h2 className="cta-heading">
            Let's build something <span className="bright">great</span> together.
          </h2>
          <p className="cta-sub">Open to internships, collabs, and cool projects</p>
        </div>
        <a href="mailto:quanhuynh364@gmail.com" className="btn btn--primary btn--cta">
          Get in touch
        </a>
      </div>
    </section>
  );
}

// === FOOTER ===
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__copy">© 2025 Quan Huynh · Built with React + Vite</p>
        <div className="footer__icons">
          <a href="https://github.com/quanhuynh" target="_blank" rel="noreferrer" className="footer__icon" aria-label="GitHub">
            <IconBrandGithub size={17} />
          </a>
          <a href="https://linkedin.com/in/quanhuynh" target="_blank" rel="noreferrer" className="footer__icon" aria-label="LinkedIn">
            <IconBrandLinkedin size={17} />
          </a>
          <a href="mailto:quanhuynh364@gmail.com" className="footer__icon" aria-label="Email">
            <IconMail size={17} />
          </a>
        </div>
      </div>
    </footer>
  );
}

// === APP ===
export default function App() {
  useScrollAnimation();
  useSkillBars();

  return (
    <>
      <div className="blob blob--tr" aria-hidden="true" />
      <div className="blob blob--bl" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <GMUSection />
        <Skills />
        <Projects />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
