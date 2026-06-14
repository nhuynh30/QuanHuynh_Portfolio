const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Contact', id: 'contact' },
];

const projects = [
    {
        tag: 'Web App',
        title: 'StudyBuddy',
        description:
            'A campus study planner that centralizes assignment tracking, collaboration notes, and progress metrics in one polished experience.',
        meta: ['React', 'Firebase', 'Responsive'],
    },
    {
        tag: 'Automation',
        title: 'Course Scraper',
        description:
            'An automated pipeline that collects course details from university portals and turns them into actionable study schedules.',
        meta: ['Python', 'BeautifulSoup', 'Data'],
    },
    {
        tag: 'Systems',
        title: 'Memory Visualizer',
        description:
            'A learning tool for visualizing memory allocation, process states, and scheduling behaviors in C and systems programming.',
        meta: ['C', 'Algorithms', 'Systems'],
    },
];

const skills = [
    {
        title: 'Languages',
        items: ['JavaScript / TypeScript', 'Python', 'Java', 'C / C++'],
    },
    {
        title: 'Frameworks',
        items: ['React', 'Node.js', 'Express', 'Flask'],
    },
    {
        title: 'Tools',
        items: ['Git', 'GitHub', 'Figma', 'PostgreSQL'],
    },
    {
        title: 'CS Fundamentals',
        items: ['Algorithms', 'Data Structures', 'OS', 'Databases'],
    },
];

const experience = [
    {
        title: 'Software Engineering Projects',
        description:
            'Built full-stack applications with modern tooling, version control, and team collaboration practices.',
    },
    {
        title: 'CS Coursework',
        description:
            'Applied course knowledge from algorithms, operating systems, networking, and database design to real projects.',
    },
    {
        title: 'Team Collaboration',
        description:
            'Worked closely with teammates on peer reviews, design discussions, and sprint-based development tasks.',
    },
];

function App() {
    const handleNavClick = (event, id) => {
        event.preventDefault();
        const section = document.getElementById(id);
        if (section) {
            const offset = section.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        }
    };

    return (
        <>
            <header className="topbar">
                <div className="container topbar__inner">
                    <a className="brand" href="#home" onClick={(event) => handleNavClick(event, 'home')}>
                        <img
                            className="brand__logo"
                            src="https://stappprodmarmot.blob.core.windows.net/institution-logos/institution_131_20250914021318.jpeg"
                            alt="George Mason University logo"
                        />
                        <span>Quan Huynh</span>
                    </a>
                    <nav className="nav" aria-label="Primary navigation">
                        {navItems.map((item) => (
                            <a key={item.id} href={`#${item.id}`} onClick={(event) => handleNavClick(event, item.id)}>
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </div>
            </header>

            <main>
                <section className="hero" id="home">
                    <div className="container hero__row">
                        <div className="hero__copy">
                            <span className="hero__eyebrow">GMU CS Junior • Internship seeker</span>
                            <h1>Software engineering for teams who value clarity, speed, and growth.</h1>
                            <p className="hero__text">
                                I build practical web apps, automated workflows, and systems tools using languages like Python,
                                JavaScript, and C. My goal is to intern on a team where I can learn quickly and deliver high-quality
                                software.
                            </p>
                            <div className="hero__actions">
                                <a className="button button--primary" href="#contact" onClick={(event) => handleNavClick(event, 'contact')}>
                                    Contact me
                                </a>
                                <a className="button button--secondary" href="#projects" onClick={(event) => handleNavClick(event, 'projects')}>
                                    Explore projects
                                </a>
                            </div>
                        </div>
                        <div className="hero__panel">
                            <div className="hero__brand-card">
                                <img
                                    className="hero__brand-logo"
                                    src="https://stappprodmarmot.blob.core.windows.net/institution-logos/institution_131_20250914021318.jpeg"
                                    alt="George Mason University logo"
                                />
                                <div>
                                    <p className="hero__brand-label">George Mason University</p>
                                    <h2>GMU Computer Science</h2>
                                    <p>School pride and technical focus combined in one internship-ready portfolio.</p>
                                </div>
                            </div>
                            <div className="hero__stats-card">
                                <p className="stat__label">Available Summer 2026</p>
                                <p className="stat__value">CS Junior</p>
                            </div>
                            <div className="hero__stats-card">
                                <p className="stat__label">Projects</p>
                                <p className="stat__value">3+ shipped</p>
                            </div>
                            <div className="hero__stats-card">
                                <p className="stat__label">Strengths</p>
                                <p className="stat__value">Communication & delivery</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section" id="about">
                    <div className="container section__block">
                        <div className="section__intro">
                            <p className="section__eyebrow">About me</p>
                            <h2>Driven by strong fundamentals and practical projects.</h2>
                            <p>
                                I’m a rising Computer Science junior at George Mason University. I enjoy solving problems with clean
                                code and building interfaces that feel intuitive. I’m especially interested in internships in software
                                engineering, full-stack development, or tooling.
                            </p>
                        </div>
                        <div className="feature-grid">
                            <div className="feature-card">
                                <h3>Fast learner</h3>
                                <p>I absorb new tools and concepts quickly and apply them to real project work.</p>
                            </div>
                            <div className="feature-card">
                                <h3>Practical focus</h3>
                                <p>I deliver working solutions, from responsive web apps to automation scripts.</p>
                            </div>
                            <div className="feature-card">
                                <h3>Team-ready</h3>
                                <p>I communicate clearly, collaborate on design decisions, and support shared goals.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section section--alt" id="projects">
                    <div className="container section__block">
                        <div className="section__intro">
                            <p className="section__eyebrow">Projects</p>
                            <h2>Selected work that shows engineering instincts.</h2>
                        </div>
                        <div className="project-grid">
                            {projects.map((project) => (
                                <article className="project-card" key={project.title}>
                                    <div className="project-card__meta">
                                        <span>{project.tag}</span>
                                    </div>
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>
                                    <div className="project-tags">
                                        {project.meta.map((tag) => (
                                            <span key={tag} className="tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section" id="skills">
                    <div className="container section__block">
                        <div className="section__intro">
                            <p className="section__eyebrow">Skills</p>
                            <h2>Tools and languages I use every day.</h2>
                        </div>
                        <div className="skills-grid">
                            {skills.map((skill) => (
                                <div className="skill-card" key={skill.title}>
                                    <h3>{skill.title}</h3>
                                    <ul>
                                        {skill.items.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section section--alt" id="experience">
                    <div className="container section__block">
                        <div className="section__intro">
                            <p className="section__eyebrow">Experience</p>
                            <h2>Coursework and project experience that matters.</h2>
                        </div>
                        <div className="experience-grid">
                            {experience.map((item) => (
                                <div className="experience-card" key={item.title}>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section" id="contact">
                    <div className="container section__block contact-block">
                        <div>
                            <p className="section__eyebrow">Contact</p>
                            <h2>Ready to contribute on your next internship team.</h2>
                            <p>
                                If you’re looking for a motivated CS intern from George Mason University, I’d love to discuss how I can
                                help your team.
                            </p>
                        </div>
                        <div className="contact-card">
                            <div>
                                <p className="contact-label">University</p>
                                <p>George Mason University</p>
                            </div>
                            <div>
                                <p className="contact-label">Major</p>
                                <p>Computer Science</p>
                            </div>
                            <div>
                                <p className="contact-label">Availability</p>
                                <p>Summer 2026</p>
                            </div>
                            <a
                                className="button button--primary button--wide"
                                href="mailto:quan@example.com?subject=Internship%20Opportunity"
                            >
                                Email me
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default App;
