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
  IconExternalLink,
  IconRocket,
  IconSend,
  IconCheck,
  IconLoader2,
  IconUser,
  IconAlertCircle,
  IconActivity,
  IconTrendingUp,
  IconSchool,
} from '@tabler/icons-react';
import { useTheme } from './context/ThemeContext';
import { useTilt } from './hooks/useTilt';
import { useTypewriter } from './hooks/useTypewriter';
import { useCounter } from './hooks/useCounter';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useMagnetic } from './hooks/useMagnetic';
import ScrollProgress from './components/ScrollProgress';
import Experience from './components/Experience';
import About from './components/About';
import MinecraftScene from './components/MinecraftScene';

// === DATA ===
const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

const skills = [
  { name: 'React', level: 'Intermediate', progress: 70, Icon: IconBrandReact },
  { name: 'Python', level: 'Advanced', progress: 80, Icon: IconBrandPython },
  { name: 'Java', level: 'Advanced', progress: 80, Icon: IconCoffee },
  { name: 'Git', level: 'Intermediate', progress: 80, Icon: IconBrandGit },
];

const projects = [
  {
    tag: 'Full Stack',
    title: 'PaceTrack',
    description: 'GPS running tracker with real-time club leaderboards, Socket.io sync, AWS S3 route uploads, and interactive Mapbox route playback.',
    Icon: IconActivity,
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'AWS S3', 'Mapbox GL'],
    github: 'https://github.com/nhuynh30/PaceTrack',
    live: 'https://pace-track.vercel.app/',
    dates: 'May 2025 – Present',
    previewImg: '/assets/pacetrack-preview.png',
  },
  {
    tag: 'AI + FinTech',
    title: 'TradingLab',
    description: 'AI-powered investment simulator with multi-asset DCA backtesting, OpenAI advisor streaming via SSE, and Redis-backed rate limiting.',
    Icon: IconTrendingUp,
    stack: ['React', 'TypeScript', 'NestJS', 'MongoDB', 'Redis', 'OpenAI', 'Docker'],
    github: 'https://github.com/po-tech-community/trading-lab',
    live: 'https://po-trading-lab.vercel.app/',
    dates: 'Apr 2026 – Present',
    previewImg: '/assets/tradinglab-preview.png',
  },
  {
    tag: 'Coming Soon',
    title: 'More on the way...',
    description: "Always building something new. My next project is in the works — stay tuned!",
    Icon: IconRocket,
    stack: ['???'],
    github: null,
    live: null,
    comingSoon: true,
  },
];

// === UTILITIES ===
function mergeRefs(...refs) {
  return (node) => {
    refs.forEach((r) => {
      if (!r) return;
      if (typeof r === 'function') r(node);
      else r.current = node;
    });
  };
}

// === HOOKS ===
function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          e.target.classList.add('revealed');
        }
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.animate-on-scroll, .reveal').forEach((el) => observer.observe(el));
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

// === TYPING DOTS ===
function TypingDots() {
  return (
    <span className="typing-dots" aria-hidden="true">
      <span>.</span><span>.</span><span>.</span>
    </span>
  );
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
          <a className="btn btn--cv" href="/assets/Quan_Huynh_Resume.pdf" download="Quan_Huynh_Resume.pdf">
            <IconDownload size={15} />
            Download CV
          </a>
        </div>
      </div>
    </header>
  );
}

// === HERO — typewriter + content reveal ===
function Hero() {
  const boxRef = useRef(null);
  const [contentVisible, setContentVisible] = useState(false);

  // Typewriter chains: "Hi, I'm" → "Quan" → "Huynh"
  const { displayed: hiText, done: hiDone } = useTypewriter("Hi, I'm", 60, 400);
  const { displayed: firstText, done: firstDone } = useTypewriter('Quan', 75, hiDone ? 150 : 999999);
  const { displayed: lastText } = useTypewriter('Huynh', 75, firstDone ? 150 : 999999);

  // Reveal badge / sub / buttons when "Huynh" starts typing
  useEffect(() => {
    if (lastText.length > 0 && !contentVisible) setContentVisible(true);
  }, [lastText.length]);

  const magPrimary = useMagnetic(0.3);
  const magOutline = useMagnetic(0.3);

  const handleMouseMove = (e) => {
    if (!boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const dy = (e.clientY - rect.top - rect.height / 2) / rect.height;
    boxRef.current.style.transform = `perspective(1000px) rotateY(${-15 + dx * 21}deg) rotateX(${5 - dy * 16}deg) translateZ(50px)`;
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
        <div className="hero__row">
          {/* Left column */}
          <div className="hero__left">
            <a
              href="https://www.gmu.edu/"
              target="_blank"
              rel="noreferrer"
              className={`hero__location hero-badge${contentVisible ? ' visible' : ''}`}
            >
              <IconMapPin size={14} />
              George Mason University · Fairfax, VA
            </a>

            <h1 className="hero__title">
              <span className="light">
                {hiText}
                {!hiDone && <TypingDots />}
                <span className={`cursor${hiDone ? ' hidden' : ''}`}>|</span>
              </span>
              <span className="name-first">
                {firstText}
                {hiDone && (
                  <>
                    {!firstDone && <TypingDots />}
                    <span className={`cursor${firstDone ? ' hidden' : ''}`}>|</span>
                  </>
                )}
              </span>
              <span className="name-last">
                {lastText}
                {firstDone && (
                  <>
                    <TypingDots />
                    <span className="cursor blink">|</span>
                  </>
                )}
              </span>
            </h1>

            <p className={`hero__sub hero-desc${contentVisible ? ' visible' : ''}`}>
              A rising CS junior who loves building things for the web. Passionate about clean code,
              great UX, and solving real problems.
            </p>
            <div className={`hero__cta hero-btns${contentVisible ? ' visible' : ''}`}>
              <a ref={magPrimary} href="#projects" className="btn btn--primary" onClick={(e) => scrollTo(e, 'projects')}>
                View My Work
              </a>
              <a ref={magOutline} href="#contact" className="btn btn--outline" onClick={(e) => scrollTo(e, 'contact')}>
                Say Hello
              </a>
            </div>
          </div>

          {/* Right column */}
          <div className="hero__right animate-on-scroll">
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
                  <img src="/assets/quan.webp" alt="Quan Huynh" className="hero__image" />
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

// === STATS — number counter + tilt ===
function Stats() {
  const r0 = useTilt(6, 1.4);
  const r1 = useTilt(6, 1.4);
  const r2 = useTilt(6, 1.4);
  const r3 = useTilt(6, 1.4);

  const { count: projects, ref: cr0 } = useCounter(2, 1200);
  const { count: years, ref: cr1 } = useCounter(2, 1000);
  const { count: grad, ref: cr2 } = useCounter(2028, 1800);

  return (
    <section className="stats-section" data-tilt-zone>
      <div className="container">
        <div className="stats__inner animate-on-scroll">
          <div className="stat-card" ref={mergeRefs(r0, cr0)}>
            <p className="stat-value">{projects}+</p>
            <p className="stat-label">Projects</p>
          </div>
          <div className="stat-card" ref={mergeRefs(r1, cr1)}>
            <p className="stat-value">{years}+</p>
            <p className="stat-label">Years Coding</p>
          </div>
          <div className="stat-card" ref={mergeRefs(r2, cr2)}>
            <p className="stat-value">{grad}</p>
            <p className="stat-label">Graduation</p>
          </div>
          <div className="stat-card" ref={r3}>
            <p className="stat-value">GMU</p>
            <p className="stat-label">Class of 2028</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// === GMU SECTION — staggered reveal ===
function GMUSection() {
  const stackRef = useScrollReveal();
  const eyebrowRef = useScrollReveal();
  const headingRef = useScrollReveal();
  const descRef = useScrollReveal();
  const pillsRef = useScrollReveal();

  return (
    <section className="gmu-section">
      <div className="gmu-ghost" aria-hidden="true">MASON</div>
      <div className="container">
        <div className="gmu-row">
          {/* Left: stacked photo cards */}
          <div ref={stackRef} className="reveal">
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
          <div>
            <p ref={eyebrowRef} className="gmu-eyebrow reveal">WHERE I STUDY</p>
            <div className="gmu-divider reveal delay-1" ref={useScrollReveal()} />
            <h2 ref={headingRef} className="gmu-heading reveal delay-2">
              George Mason<br />
              <span className="green">University</span>
            </h2>
            <p ref={descRef} className="gmu-desc reveal delay-3">
              Proudly studying Computer Science at GMU — one of the top CS programs in Virginia.
              Rising junior graduating May 2028. Diving deep into algorithms, systems, and
              software engineering.
            </p>
            <div ref={pillsRef} className="gmu-pills reveal delay-4">
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

// === SKILLS — tilt + stagger + marquee ===
function Skills() {
  const s0 = useTilt(7, 1.3);
  const s1 = useTilt(7, 1.3);
  const s2 = useTilt(7, 1.3);
  const s3 = useTilt(7, 1.3);
  const tiltRefs = [s0, s1, s2, s3];
  const delayClasses = ['delay-1', 'delay-2', 'delay-3', 'delay-4'];

  useEffect(() => {
    const row1 = [
      { n: 'Python',     u: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',          c: 'blue' },
      { n: 'Java',       u: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',              c: 'orange' },
      { n: 'C++',        u: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',    c: 'blue' },
      { n: 'C#',         u: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',          c: 'purple' },
      { n: 'TypeScript', u: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',  c: 'blue' },
      { n: 'JavaScript', u: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',  c: 'yellow' },
      { n: 'Go',         u: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',                  c: 'cyan' },
      { n: 'C',          u: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',                    c: 'blue' },
      { n: 'React',      u: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',            c: 'cyan' },
      { n: 'Next.js',    u: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',          c: 'darkblue' },
      { n: 'Node.js',    u: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',          c: 'green' },
      { n: 'Spring Boot',u: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',          c: 'green' },
      { n: 'Flask',      u: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',            c: 'darkgray' },
      { n: 'FastAPI',    u: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',        c: 'teal' },
      { n: 'Tailwind',   u: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',c: 'sky' },
      { n: 'Redux',      u: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',            c: 'purple' },
    ];
    const row2 = [
      { n: 'AWS',        u: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', c: 'orange' },
      { n: 'Docker',     u: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',          c: 'sky' },
      { n: 'Kubernetes', u: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-original.svg',  c: 'darkblue' },
      { n: 'PostgreSQL', u: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',  c: 'blue' },
      { n: 'MongoDB',    u: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',        c: 'green' },
      { n: 'Redis',      u: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',            c: 'red' },
      { n: 'MySQL',      u: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',            c: 'orange' },
      { n: 'DynamoDB',   u: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dynamodb/dynamodb-original.svg',      c: 'indigo' },
      { n: 'PyTorch',    u: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',        c: 'red' },
      { n: 'TensorFlow', u: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',  c: 'orange' },
      { n: 'NumPy',      u: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg',            c: 'blue' },
      { n: 'Terraform',  u: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg',    c: 'indigo' },
      { n: 'Linux',      u: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',            c: 'lime' },
      { n: 'Nginx',      u: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',            c: 'green' },
      { n: 'GCP',        u: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',c: 'sky' },
      { n: 'GitHub',     u: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',          c: 'darkgray' },
      { n: 'Bash',       u: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg',              c: 'green' },
    ];
    const buildIcon = (s) => {
      const div = document.createElement('div');
      div.className = 'sk-icon-box';
      div.title = s.n;
      div.setAttribute('data-color', s.c);
      div.innerHTML = `<img src="${s.u}" alt="${s.n}" loading="lazy" />`;
      return div;
    };
    const populate = (id, items) => {
      const track = document.getElementById(id);
      if (!track) return;
      track.innerHTML = '';
      [...items, ...items].forEach(s => track.appendChild(buildIcon(s)));
    };
    populate('sk-r1', row1);
    populate('sk-r2', row2);
  }, []);

  return (
    <>
    <section className="skills-section" id="skills" data-tilt-zone>
      <div className="container">
        <div className="animate-on-scroll">
          <p className="section-eyebrow">WHAT I KNOW</p>
          <h2 className="section-title">My <span className="accent">skills</span></h2>
        </div>
        <div className="skills__grid">
          {skills.map((skill, i) => (
            <div
              className={`skill-card animate-on-scroll ${delayClasses[i]}`}
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
      <div className="skills-more-section">
        <div className="skills-more-label">
          <div className="skills-more-line" />
          <span>and many more</span>
          <div className="skills-more-line" />
        </div>
        <div className="marquee-wrapper">
          <div className="marquee-row">
            <div className="marquee-track" id="sk-r1" />
          </div>
          <div className="marquee-row">
            <div className="marquee-track marquee-reverse" id="sk-r2" />
          </div>
        </div>
      </div>
    </section>
    <div className="skills-gradient-bridge" />
    </>
  );
}

// === FLIP CARD component ===
function FlipCard({ project }) {
  const cardRef = useRef(null);
  const isComingSoon = Boolean(project.comingSoon);

  const handleClick = () => {
    if (isComingSoon) return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch && cardRef.current) {
      cardRef.current.classList.toggle('flipped');
    }
  };

  return (
    <div
      ref={cardRef}
      className={`flip-card reveal${isComingSoon ? ' coming-soon-card' : ''}`}
      onClick={handleClick}
    >
      <div className="flip-inner">
        {/* FRONT */}
        <div className="flip-front">
          <div className={`project__preview${project.previewImg ? ' has-img' : ''}`}>
            {project.previewImg && (
              <img
                src={project.previewImg}
                alt={`${project.title} preview`}
                className="project__preview-img"
              />
            )}
            <div className="project__preview-icon">
              <project.Icon size={project.previewImg ? 16 : 28} />
            </div>
          </div>
          <div className="project__body">
            <span className="project__tag">{project.tag}</span>
            <h3 className="project__title">{project.title}</h3>
            <p className="project__desc">{project.description}</p>
            {!isComingSoon && <p className="proj-hint">Hover to see stack →</p>}
          </div>
        </div>

        {/* BACK */}
        {!isComingSoon && (
          <div className="flip-back">
            <div className="flip-back-title">Tech Stack</div>
            {project.dates && <p className="flip-back-dates">{project.dates}</p>}
            <div className="flip-stack-list">
              {project.stack.map((s) => (
                <span key={s} className="stack-badge">{s}</span>
              ))}
            </div>
            <div className="flip-links">
              {project.github && (
                <a href={project.github} className="flip-btn-github" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                  <IconBrandGithub size={13} /> GitHub
                </a>
              )}
              {project.live && (
                <a href={project.live} className="flip-btn-live" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                  <IconExternalLink size={13} /> Live Demo
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// === PROJECTS — flip cards ===
function Projects() {
  const titleRef = useScrollReveal();

  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <div ref={titleRef} className="reveal">
          <p className="section-eyebrow">WHAT I'VE BUILT</p>
          <h2 className="section-title">My <span className="accent">projects</span></h2>
        </div>
        <div className="projects__grid">
          {projects.map((project, i) => (
            <FlipCard key={i} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

// === CTA + CONTACT — flip card on "Get in touch" ===
function CTAContact() {
  const [flipped, setFlipped] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const wrapRef = useRef(null);
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const textRevealRef = useScrollReveal();

  // Sync outer height to whichever face is active
  useEffect(() => {
    if (!wrapRef.current) return;
    const target = flipped ? backRef.current : frontRef.current;
    if (target) wrapRef.current.style.height = target.scrollHeight + 'px';
  }, [flipped]);

  // Set initial height on mount
  useEffect(() => {
    if (wrapRef.current && frontRef.current) {
      wrapRef.current.style.height = frontRef.current.scrollHeight + 'px';
    }
  }, []);

  const handleBack = () => {
    setFlipped(false);
    // Reset form after flip-back animation completes
    setTimeout(() => {
      setStatus('idle');
      setForm({ name: '', email: '', message: '' });
    }, 700);
  };

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('https://formspree.io/f/xkoaylrq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="cta-section" id="contact">
      <div ref={wrapRef} className="cta-flip-wrap">
        <div className={`cta-flip-scene${flipped ? ' flipped' : ''}`}>

          {/* FRONT — original CTA banner */}
          <div ref={frontRef} className="cta-flip-front">
            <div className="cta-card">
              <div ref={textRevealRef} className="reveal">
                <h2 className="cta-heading">
                  Let&apos;s build something <span className="bright">great</span> together.
                </h2>
                <p className="cta-sub">Open to internships, collabs, and cool projects</p>
              </div>
              <button className="btn btn--primary btn--cta" onClick={() => setFlipped(true)}>
                Get in touch
              </button>
            </div>
          </div>

          {/* BACK — animated contact form */}
          <div ref={backRef} className="cta-flip-back">
            <div className="contact-grid-overlay" aria-hidden="true" />
            <div className="contact-blob contact-blob--1" aria-hidden="true" />
            <div className="contact-blob contact-blob--2" aria-hidden="true" />
            <button className="contact-back-btn" onClick={handleBack}>← Back</button>
            <div className="contact-inner">
              {/* Left */}
              <div className="contact-left">
                <span className="contact-connect-badge">Let&apos;s connect</span>
                <h2 className="contact-heading">
                  Let&apos;s build something{' '}
                  <span className="accent">great</span> together.
                </h2>
                <ul className="contact-perks">
                  <li><span className="perk-icon"><IconCheck size={14} /></span>Available for internships</li>
                  <li><span className="perk-icon"><IconCheck size={14} /></span>Open to cool collabs</li>
                  <li><span className="perk-icon"><IconCheck size={14} /></span>Quick to respond</li>
                  <li><span className="perk-icon"><IconCheck size={14} /></span>Always building something</li>
                </ul>
              </div>

              {/* Right — form */}
              <div className="contact-right">
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className={`form-field${form.name ? ' has-value' : ''}`}>
                    <input
                      id="cf-name" name="name" type="text"
                      value={form.name} onChange={handleChange}
                      required autoComplete="off" disabled={status !== 'idle'}
                    />
                    <label htmlFor="cf-name">Your Name</label>
                    <span className="field-icon"><IconUser size={15} /></span>
                  </div>
                  <div className={`form-field${form.email ? ' has-value' : ''}`}>
                    <input
                      id="cf-email" name="email" type="email"
                      value={form.email} onChange={handleChange}
                      required autoComplete="off" disabled={status !== 'idle'}
                    />
                    <label htmlFor="cf-email">Email Address</label>
                    <span className="field-icon"><IconMail size={15} /></span>
                  </div>
                  <div className={`form-field form-field--textarea${form.message ? ' has-value' : ''}`}>
                    <textarea
                      id="cf-message" name="message" rows={5}
                      value={form.message} onChange={handleChange}
                      required disabled={status !== 'idle'}
                    />
                    <label htmlFor="cf-message">Your Message</label>
                  </div>
                  <button
                    type="submit"
                    className={`contact-submit${status !== 'idle' && status !== 'error' ? ` contact-submit--${status}` : ''}${status === 'error' ? ' contact-submit--error' : ''}`}
                    disabled={status === 'loading' || status === 'success'}
                    onClick={status === 'error' ? () => setStatus('idle') : undefined}
                  >
                    <span className="contact-submit-inner">
                      {status === 'idle' && <><IconSend size={15} /> Send Message</>}
                      {status === 'loading' && <><IconLoader2 size={15} className="spin-icon" /> Sending...</>}
                      {status === 'success' && <><IconCheck size={15} /> Message Sent!</>}
                      {status === 'error' && <><IconAlertCircle size={15} /> Failed — click to retry</>}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// === FOOTER — staggered reveal ===
function Footer() {
  const leftRef = useScrollReveal();
  const rightRef = useScrollReveal();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p ref={leftRef} className="footer__copy reveal">
          © 2026 Quan Huynh · CopyRight
        </p>
        <div ref={rightRef} className="footer__icons reveal delay-2">
          <a href="https://github.com/nhuynh30" target="_blank" rel="noreferrer" className="footer__icon" aria-label="GitHub">
            <IconBrandGithub size={17} />
          </a>
          <a href="https://www.linkedin.com/in/quanhuynh364/" target="_blank" rel="noreferrer" className="footer__icon" aria-label="LinkedIn">
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
      <ScrollProgress />
      <div className="blob blob--tr" aria-hidden="true" />
      <div className="blob blob--bl" aria-hidden="true" />
      <Navbar />
      <div className="mobile-hint" aria-hidden="true">For the best experience, view on desktop</div>
      <main>
        <Hero />
        <Stats />
        <About />
        <div className="story-section">
          <div className="story-aurora story-a1" />
          <div className="story-aurora story-a2" />
          <div className="story-dots" />
          <div className="story-bg-word">QH</div>
          <div className="section-bridge bridge--gmu">
            <div className="bridge-line" />
            <div className="bridge-pill">
              <div className="bridge-icon"><IconSchool size={15} /></div>
              <div className="bridge-dot" />
              <span className="bridge-text">Where I study</span>
              <div className="bridge-dot right" />
            </div>
            <div className="bridge-line right" />
          </div>
          <GMUSection />
        </div>
        <Experience />
        <Skills />
        <Projects />
        <CTAContact />
      </main>
      <MinecraftScene />
      <Footer />
    </>
  );
}
