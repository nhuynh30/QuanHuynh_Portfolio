import { useEffect, useRef } from 'react';
import {
  IconHandStop, IconMapPin, IconLanguage,
  IconCoffee, IconHeart, IconSchool, IconUserCircle,
} from '@tabler/icons-react';
import './About.css';

const quanPhoto = '/assets/quan1.webp';
const quanPhoto2 = '/assets/quan2.webp';

export default function About() {
  const revealRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('ab-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealRefs.current.forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const addRef = el => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  return (
    <div className="about-rise-wrapper" id="about">
      <div className="about-badge-row">
        <div className="about-badge">
          <div className="about-badge-icon">
            <IconUserCircle size={14} />
          </div>
          <div className="about-badge-dot" />
          <span className="about-badge-text">About me</span>
          <div className="about-badge-dot" />
        </div>
      </div>
      <div className="about-section">
        <div className="ab-inner">
          <div className="ab-grid">

            {/* LEFT — photo stack */}
            <div className="ab-photos-side ab-reveal" ref={addRef}>
              <div className="ab-p-main">
                <img src={quanPhoto} alt="Quan Huynh" />
              </div>
              <div className="ab-p-second">
                <img src={quanPhoto2} alt="Quan Huynh" />
              </div>
              <div className="ab-chip ab-c1">
                <div className="ab-chip-lbl">Currently at</div>
                <div className="ab-chip-val">
                  <IconSchool size={12} /> CS @ GMU
                </div>
              </div>
              <div className="ab-chip ab-c2">
                <div className="ab-chip-lbl">Based in</div>
                <div className="ab-chip-val">
                  <IconMapPin size={12} /> Virginia, USA
                </div>
              </div>
              <div className="ab-flags-badge">
                🇻🇳 → 🇺🇸 <span>Moved in 2020</span>
              </div>
            </div>

            {/* RIGHT — content */}
            <div className="ab-content-side ab-reveal" ref={addRef}>
              <div className="ab-eyebrow">
                <IconHandStop size={11} /> Nice to meet you
              </div>

              <div className="ab-name-block">
                <div className="ab-name-greeting">My name is</div>
                <div className="ab-name-main">
                  Quan Nam <span className="ab-g">Huynh</span>
                </div>
                <div className="ab-name-viet">
                  Quân Nam Huỳnh · 🇻🇳 Born in Vietnam
                </div>
              </div>

              <div className="ab-journey">
                <div className="ab-jf">
                  <div className="ab-jflag ab-vn">🇻🇳</div>
                  <div className="ab-jf-info">
                    <div className="ab-jf-name">Vietnam</div>
                    <div className="ab-jf-sub">Born &amp; raised</div>
                  </div>
                </div>
                <div className="ab-j-sep">
                  <div className="ab-j-line" />
                  <div className="ab-j-pill">✈ 2020</div>
                  <div className="ab-j-line" />
                </div>
                <div className="ab-jf">
                  <div className="ab-jflag ab-us">🇺🇸</div>
                  <div className="ab-jf-info">
                    <div className="ab-jf-name">United States</div>
                    <div className="ab-jf-sub">Springfield, VA</div>
                  </div>
                </div>
              </div>

              <div className="ab-stories">
                <div className="ab-story-card">
                  <div className="ab-sc-label">My story</div>
                  <p className="ab-sc-text">
                    I was born and raised in <strong>Da Nang, Vietnam</strong> and immigrated to the United States in <strong>2020</strong> during Covid. I spent all four years of high school here in the States — adapting to a new country, a new language, and a new culture taught me resilience and how to learn fast. Ever since I was little, I've had a deep love for <strong>Minecraft</strong>. That curiosity about how games are built is what pulled me into coding — and one day, I hope to build something just like it.
                  </p>
                </div>
                <div className="ab-story-card">
                  <div className="ab-sc-label">Right now</div>
                  <p className="ab-sc-text">
                    I'm a rising junior studying <strong>Computer Science at George Mason University</strong>, chasing that childhood dream one line of code at a time. When I'm not in class or working on side projects, you'll probably find me at the gym or at a boba shop near campus with friends. I'm passionate about writing clean code and building products that solve real problems while delivering a great user experience.
                  </p>
                </div>
              </div>

              <div className="ab-facts">
                {[
                  { icon: <IconMapPin size={13} />, text: 'Da Nang → Springfield, VA' },
                  { icon: <IconLanguage size={13} />, text: 'Viet & English' },
                  { icon: <IconHeart size={13} />, text: 'Gym & boba' },
                  { icon: <IconCoffee size={13} />, text: 'Minecraft fan' },
                ].map((f, i) => (
                  <div className="ab-fact" key={i}>
                    {f.icon}
                    <span>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
