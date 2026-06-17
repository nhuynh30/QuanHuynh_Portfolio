import { useState, useRef, useEffect } from 'react';
import { IconChevronDown, IconMapPin } from '@tabler/icons-react';
import './Experience.css';

const jobs = [
  {
    id: 0,
    role: 'AI Software Developer',
    company: 'Deepiri',
    type: 'Part-time',
    dates: 'May 2026 – Present · 2 mos',
    location: 'United States · Remote',
    desc: 'Built AI-assisted video editing workflows using Tauri, Rust, TypeScript, and FastAPI. Implemented AI job orchestration with Server-Sent Events (SSE), reducing job refresh latency by 60%. Developed video preview with a custom Rust timeline engine and FFmpeg proxy extraction, cutting p95 preview startup to under 500ms.',
    tags: ['Rust', 'TypeScript', 'FastAPI', 'Tauri', 'SSE', 'FFmpeg', 'Docker', 'AI/ML'],
    colorClass: 'logo-dp',
    shadowClass: 'logo-dp-item',
    initials: 'DP',
    logo: '/assets/dp.png',
  },
  {
    id: 1,
    role: 'Server',
    company: 'Brothers Bistro',
    type: 'Part-time',
    dates: 'Nov 2024 – May 2026 · 1 yr 7 mos',
    location: 'Springfield, Virginia · On-site',
    desc: 'Delivered excellent customer service in a fast-paced restaurant environment. Managed multiple tables simultaneously, ensured accurate orders, and created a positive dining experience for every guest.',
    tags: ['Customer Service', 'Teamwork', 'Communication', 'Time Management'],
    colorClass: 'logo-bb',
    shadowClass: 'logo-bb-item',
    initials: 'BB',
    logo: '/assets/bb.png',
  },
  {
    id: 2,
    role: 'Barista',
    company: 'Gong Cha Taiwan',
    type: 'Part-time',
    dates: 'Mar 2025 – Apr 2025 · 2 mos',
    location: 'Springfield, Virginia · On-site',
    desc: 'Prepared and served premium bubble tea beverages with precision and speed. Maintained drink quality standards and kept a clean, efficient workspace during peak hours.',
    tags: ['Food & Beverage', 'Speed & Accuracy', 'Customer Service'],
    colorClass: 'logo-gc',
    shadowClass: 'logo-gc-item',
    initials: 'GC',
    logo: '/assets/gc.png',
  },
  {
    id: 3,
    role: 'Store Associate',
    company: 'Old Navy',
    type: 'Part-time',
    dates: 'Nov 2023 – Jun 2024 · 8 mos',
    location: 'Springfield, Virginia · On-site',
    desc: 'Assisted customers on the sales floor, processed transactions, and maintained store visual standards. Developed strong multitasking and interpersonal skills in a high-traffic retail environment.',
    tags: ['Retail', 'Sales', 'POS Systems', 'Multitasking'],
    colorClass: 'logo-on',
    shadowClass: 'logo-on-item',
    initials: 'ON',
    logo: '/assets/on.png',
  },
];

export default function Experience() {
  const [openIndex, setOpenIndex] = useState(0);
  const [logos, setLogos] = useState({});
  const [logoErrors, setLogoErrors] = useState({});
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('revealed'); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleToggle = (i) => setOpenIndex((prev) => (prev === i ? -1 : i));

  const handleLogoUpload = (e, i) => {
    e.stopPropagation();
    document.getElementById(`exp-file-${i}`).click();
  };

  const handleFileChange = (i, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setLogos((prev) => ({ ...prev, [i]: e.target.result }));
    reader.readAsDataURL(file);
  };

  return (
    <section className="exp-section reveal" id="experience" ref={sectionRef}>
      <div className="exp-blob b1" />
      <div className="exp-blob b2" />
      <div className="exp-blob b3" />
      <div className="exp-grain" />
      <div className="exp-lines" />

      <div className="exp-inner">
        <div className="exp-eyebrow">Where I&apos;ve worked</div>
        <h2 className="exp-title">Work <span>Experience</span></h2>
        <p className="exp-sub">Click on each logo to see more </p>

        <div className="exp-accordion">
          {jobs.map((job, i) => (
            <div
              key={job.id}
              className={`acc-item ${job.shadowClass} reveal delay-${i + 1}`}
              data-open={openIndex === i ? '' : undefined}
            >
              <div className="acc-header" onClick={() => handleToggle(i)}>

                {/* Liquid glass logo bubble */}
                <div className="logo-wrap">
                  <div
                    className={`logo-box ${job.colorClass}`}
                    onClick={(e) => handleLogoUpload(e, i)}
                    title="Click to upload logo"
                  >
                    <div className="logo-card">
                      {logos[i] ? (
                        <img src={logos[i]} alt={job.company} className="logo-img" />
                      ) : !logoErrors[i] ? (
                        <img
                          src={job.logo}
                          alt={job.company}
                          className="logo-img"
                          onError={() => setLogoErrors((p) => ({ ...p, [i]: true }))}
                        />
                      ) : (
                        <span className="logo-text">{job.initials}</span>
                      )}
                    </div>
                    <div className="logo-shadow" />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    id={`exp-file-${i}`}
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileChange(i, e.target.files[0])}
                  />
                </div>

                <div className="acc-info">
                  <div className="acc-role">{job.role}</div>
                  <div className="acc-company">{job.company}</div>
                </div>

                <div className="acc-right">
                  <div className="acc-dates">{job.dates}</div>
                  <div className="acc-badge">{job.type}</div>
                </div>

                <div className="acc-chevron">
                  <IconChevronDown size={14} />
                </div>
              </div>

              <div className="acc-body">
                <div className="acc-body-inner">
                  <div className="acc-location">
                    <IconMapPin size={12} />
                    {job.location}
                  </div>
                  <p className="acc-desc">{job.desc}</p>
                  <div className="acc-tags">
                    {job.tags.map((tag) => (
                      <span key={tag} className="acc-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
