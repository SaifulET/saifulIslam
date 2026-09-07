import { connectToDatabase } from "./mongodb";
import Profile from "../models/Profile";
import About from "../models/About";
import Education from "../models/Education";
import Experience from "../models/Experience";
import Project from "../models/Project";
import GalleryImage from "../models/GalleryImage";
import Skill from "../models/Skill";

export async function seedDatabase(force = false) {
  await connectToDatabase();

  const profileCount = await Profile.countDocuments();
  if (profileCount === 0 || force) {
    if (force) await Profile.deleteMany({});
    await Profile.create({
      name: "Saiful Islam",
      title: "Junior Fullstack Developer",
      roles: [
        "Junior Fullstack Developer",
        "Frontend Engineer",
        "Backend Specialist",
        "UI/UX Designer"
      ],
      bio: "Software Engineer passionate about crafting high-performance full-stack web applications, microservices, and interactive developer experiences.",
      aboutTitle: "Junior Fullstack Developer",
      aboutDescription: "I'm a passionate front-end developer with a keen eye for design and a dedication to creating intuitive, engaging user experiences. With a background in both design and development, I bridge the gap between aesthetics and functionality. My journey in web development started 5 years ago, and I've been in love with crafting digital experiences ever since. I specialize in building responsive, accessible websites and applications that not only look great but perform exceptionally well. When I'm not coding, you can find me exploring new design trends, contributing to open-source projects, or hiking in the mountains to recharge my creative batteries.",
      aboutImage: "/images/about-me.png",
      location: "Jatrabari, Dhaka",
      email: "si912999@gmail.com",
      phone: "01707961402",
      githubUrl: "https://github.com/saifulislam",
      linkedinUrl: "https://linkedin.com/in/saifulislam",
      resumeUrl: "https://drive.google.com/file/d/example/view",
      availableForHire: true,
      socialLinks: [
        { platform: "GitHub", url: "https://github.com/saifulislam", iconName: "Github" },
        { platform: "LinkedIn", url: "https://linkedin.com/in/saifulislam", iconName: "Linkedin" },
        { platform: "Twitter / X", url: "https://x.com/saifulislam", iconName: "Twitter" },
        { platform: "Email", url: "mailto:si912999@gmail.com", iconName: "Mail" }
      ],
      avatarUrl: "/images/about-me.png"
    });
    console.log("🌱 Profile seeded");
  }

  const aboutCount = await About.countDocuments();
  if (aboutCount === 0 || force) {
    if (force) await About.deleteMany({});
    await About.insertMany([
      {
        title: "Junior Fullstack Developer",
        description: "I'm a passionate front-end developer with a keen eye for design and a dedication to creating intuitive, engaging user experiences. With a background in both design and development, I bridge the gap between aesthetics and functionality. My journey in web development started 5 years ago, and I've been in love with crafting digital experiences ever since. I specialize in building responsive, accessible websites and applications that not only look great but perform exceptionally well. When I'm not coding, you can find me exploring new design trends, contributing to open-source projects, or hiking in the mountains to recharge my creative batteries.",
        image: "/images/about-me.png",
        name: "Saiful Islam",
        location: "Jatrabari, Dhaka",
        email: "si912999@gmail.com",
        phone: "01707961402",
        showDetails: true,
        order: 1
      }
    ]);
    console.log("🌱 About section seeded");
  }

  const eduCount = await Education.countDocuments();
  if (eduCount === 0 || force) {
    if (force) await Education.deleteMany({});
    await Education.insertMany([
      {
        degree: "B.Sc. in Computer Science & Engineering",
        university: "Leading University",
        timeBound: "2021 - 2025",
        cgpa: "3.85 / 4.00",
        description: "Specialized in Distributed Computing, Algorithms, Software Engineering, Database Systems, and Artificial Intelligence. Conducted undergraduate research on distributed event messaging queues and high-concurrency architectures.",
        coursework: [
          "Data Structures & Algorithms",
          "Distributed Systems & Cloud Computing",
          "Database Management Systems",
          "Object-Oriented Programming (C++/Java)",
          "Web Technologies & Microservices",
          "Computer Networks & Security"
        ],
        highlights: [
          "Dean's Honor List for 6 consecutive semesters",
          "President of University Competitive Programming Club",
          "Top 10 Finalist in National Inter-University Hackathon"
        ],
        location: "Sylhet, Bangladesh",
        order: 1
      },
      {
        degree: "Higher Secondary Certificate (HSC) - Science",
        university: "Sylhet Govt. College",
        timeBound: "2018 - 2020",
        cgpa: "5.00 / 5.00 (Golden A+)",
        description: "Majored in Higher Mathematics, Physics, Chemistry, and Information Communication Technology.",
        coursework: ["Higher Mathematics", "Physics", "Information & Communication Technology"],
        highlights: ["Awarded Board Scholarship for outstanding academic performance"],
        location: "Sylhet, Bangladesh",
        order: 2
      }
    ]);
    console.log("🌱 Education seeded");
  }

  const expCount = await Experience.countDocuments();
  if (expCount === 0 || force) {
    if (force) await Experience.deleteMany({});
    await Experience.insertMany([
      {
        company: "Betopia Tech Solutions",
        role: "Full Stack Software Engineer",
        timeBound: "2024 - Present",
        description: "Architected high-throughput microservices, real-time telemetry dashboards, and modern responsive web applications using Next.js 15, Node.js, and Redis caching.",
        responsibilities: [
          "Engineered low-latency WebSockets & RabbitMQ event pipelines handling 100K+ concurrent events",
          "Developed rich cybernetic UI dashboards with Next.js App Router and Tailwind CSS",
          "Implemented automated CI/CD deployment pipelines on AWS infrastructure with Docker"
        ],
        technologies: ["Next.js", "TypeScript", "Node.js", "Redis", "RabbitMQ", "MongoDB", "Docker", "AWS"],
        location: "Remote / Hybrid",
        order: 1
      },
      {
        company: "NextGen Software Labs",
        role: "Frontend & Backend Developer Intern",
        timeBound: "2023 - 2024",
        description: "Built scalable RESTful APIs, responsive React interfaces, and integrated third-party payment gateways and authentication systems.",
        responsibilities: [
          "Constructed 15+ reusable UI components with Tailwind CSS and Zustand state management",
          "Optimized MongoDB indexing and query performance, reducing response times by 35%"
        ],
        technologies: ["React", "Express.js", "MongoDB", "Tailwind CSS", "JavaScript", "Git"],
        location: "Dhaka, Bangladesh",
        order: 2
      }
    ]);
    console.log("🌱 Experience seeded");
  }

  const projCount = await Project.countDocuments();
  if (projCount === 0 || force) {
    if (force) await Project.deleteMany({});
    await Project.insertMany([
      {
        title: "Libra",
        image: "/images/libra-preview.svg",
        shortDescription: "Libra is a minimal Library Management System built with React, TypeScript, and Redux Toolkit Query, allowing users to view, create, edit, delete, and borrow books without authentication or complex setup.",
        fullDescription: "A minimal and responsive Library Management System engineered with React, TypeScript, and Redux Toolkit Query. Allows seamless management of book inventories, borrow summaries, real-time availability calculations, and instant search.",
        features: [
          "View, add, edit, and delete books",
          "View aggregated borrow summary (book title, ISBN, total quantity)",
          "Auto-update availability based on copies"
        ],
        frontendTech: ["React", "TypeScript", "Tailwind CSS", "Redux Toolkit"],
        backendTech: ["Node.js", "Express.js", "MongoDB", "JWT"],
        icons: [
          "/icons/html.svg",
          "/icons/css.svg",
          "/icons/Tailwind CSS.svg",
          "/icons/typescript.svg",
          "/icons/react.svg",
          "/icons/Redux.svg",
          "/icons/nodejs.png",
          "/icons/express.svg",
          "/icons/MongoDB.svg",
          "/icons/jwt.svg"
        ],
        liveUrl: "https://libra-library.vercel.app",
        githubUrl: "https://github.com/saifulislam/libra-library",
        githubFrontend: "https://github.com/saifulislam/libra-library-frontend",
        githubBackend: "https://github.com/saifulislam/libra-library-backend",
        featured: true,
        order: 1
      },
      {
        title: "Betopia Interactive Orbital Engine",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
        shortDescription: "Ultra-futuristic cybernetic live showcase featuring orbital particle telemetry, dynamic AI prompt consoles, and flowing neon state animations.",
        fullDescription: "A cutting-edge portfolio experience and interactive engine engineered with Next.js 15, React 19, TypeScript, and Tailwind CSS. Features dynamic physics-based orbital mechanics, custom glowing border light runners, and a matrix background.",
        features: [
          "Orbital particle telemetry with canvas physics & speed control",
          "Flowing neon border beam illumination on interactive cards",
          "Real-time code terminal emulator with multiple syntax tabs"
        ],
        frontendTech: ["Next.js", "TypeScript", "Tailwind CSS", "Lucide React"],
        backendTech: ["Node.js", "MongoDB", "Vercel Edge"],
        icons: [
          "/icons/nextjs.svg",
          "/icons/typescript.svg",
          "/icons/Tailwind CSS.svg",
          "/icons/react.svg",
          "/icons/nodejs.png",
          "/icons/MongoDB.svg"
        ],
        liveUrl: "https://betopia-featured.vercel.app",
        githubUrl: "https://github.com/saifulislam/orbital-showcase",
        githubFrontend: "https://github.com/saifulislam/orbital-showcase",
        githubBackend: "https://github.com/saifulislam/orbital-backend",
        featured: true,
        order: 2
      },
      {
        title: "Distributed Realtime Event Queue & Broker",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
        shortDescription: "High-throughput asynchronous message pipeline handling distributed task processing, Redis pub/sub, and dead-letter queues.",
        fullDescription: "An enterprise-grade message queuing system built on C++, Node.js, and RabbitMQ. Features automatic failover clustering, zero-data-loss persistence guarantees, and a real-time monitoring dashboard.",
        features: [
          "Sub-millisecond pub/sub message routing with RabbitMQ & Redis",
          "Dead-letter queue recovery with automated worker retries",
          "Live telemetry graphs measuring throughput and latency"
        ],
        frontendTech: ["React", "Tailwind CSS", "Chart.js"],
        backendTech: ["C++", "Node.js", "RabbitMQ", "Redis", "Docker"],
        icons: [
          "/icons/C++ (CPlusPlus).svg",
          "/icons/RabbitMQ.svg",
          "/icons/Redis.svg",
          "/icons/docker.svg",
          "/icons/nodejs.png"
        ],
        liveUrl: "https://queue-broker-demo.vercel.app",
        githubUrl: "https://github.com/saifulislam/event-broker-core",
        githubFrontend: "https://github.com/saifulislam/event-broker-ui",
        githubBackend: "https://github.com/saifulislam/event-broker-core",
        featured: true,
        order: 3
      },
      {
        title: "OmniStore Cloud Commerce Platform",
        image: "https://images.unsplash.com/photo-1556742049-0a67e55722c3?q=80&w=1200&auto=format&fit=crop",
        shortDescription: "Full-stack eCommerce ecosystem with real-time stock synchronisation, Stripe checkout, role-based admin panel, and analytics.",
        fullDescription: "Modern multi-tenant digital storefront featuring instant search indexing, server-rendered product pages, automated invoice generation, and customer management portal.",
        features: [
          "Instant elastic search with multi-attribute filtering",
          "Integrated Stripe payment gateway with webhook verification",
          "Real-time inventory and analytics management dashboard"
        ],
        frontendTech: ["Next.js", "Tailwind CSS", "Redux", "TypeScript"],
        backendTech: ["Express.js", "MongoDB", "AWS", "Stripe API"],
        icons: [
          "/icons/nextjs.svg",
          "/icons/typescript.svg",
          "/icons/Tailwind CSS.svg",
          "/icons/Redux.svg",
          "/icons/express.svg",
          "/icons/MongoDB.svg",
          "/icons/AWS.svg"
        ],
        liveUrl: "https://omnistore-demo.vercel.app",
        githubUrl: "https://github.com/saifulislam/omnistore-web",
        githubFrontend: "https://github.com/saifulislam/omnistore-web",
        githubBackend: "https://github.com/saifulislam/omnistore-api",
        featured: true,
        order: 4
      }
    ]);
    console.log("🌱 Projects seeded");
  }

  const galleryCount = await GalleryImage.countDocuments();
  if (galleryCount === 0 || force) {
    if (force) await GalleryImage.deleteMany({});
    await GalleryImage.insertMany([
      {
        title: "Cybernetic UI & Architecture",
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
        caption: "Engineering high-performance futuristic user interfaces with dynamic light runners.",
        category: "Frontend",
        order: 1
      },
      {
        title: "Distributed Cloud Infrastructure",
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
        caption: "Resilient server clusters with Redis pub/sub and high-throughput event queues.",
        category: "Backend",
        order: 2
      },
      {
        title: "Modern Full-Stack Development",
        imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
        caption: "Writing clean, modular, and maintainable TypeScript & React codebases.",
        category: "Code",
        order: 3
      },
      {
        title: "DevOps & Automated Pipelines",
        imageUrl: "https://images.unsplash.com/photo-1618401471353-b98aedd04e11?q=80&w=1200&auto=format&fit=crop",
        caption: "Containerization with Docker and multi-region deployment on AWS.",
        category: "DevOps",
        order: 4
      }
    ]);
    console.log("🌱 Gallery seeded");
  }

  const skillsCount = await Skill.countDocuments();
  if (skillsCount === 0 || force) {
    if (force) await Skill.deleteMany({});
    await Skill.insertMany([
      // FRONTEND
      { name: "HTML", category: "frontend", borderColor: "#e44d26", textColor: "#e44d26", iconPath: "/icons/html.svg", order: 1 },
      { name: "CSS", category: "frontend", borderColor: "#1572b6", textColor: "#38bdf8", iconPath: "/icons/css.svg", order: 2 },
      { name: "JavaScript", category: "frontend", borderColor: "#f7df1e", textColor: "#facc15", iconPath: "/icons/JavaScript.svg", order: 3 },
      { name: "TypeScript", category: "frontend", borderColor: "#3178c6", textColor: "#60a5fa", iconPath: "/icons/typescript.svg", order: 4 },
      { name: "React", category: "frontend", borderColor: "#61dafb", textColor: "#38bdf8", iconPath: "/icons/react.svg", order: 5 },
      { name: "Next.js", category: "frontend", borderColor: "#ffffff", textColor: "#ffffff", iconPath: "/icons/nextjs.svg", order: 6 },
      { name: "Tailwind CSS", category: "frontend", borderColor: "#06b6d4", textColor: "#22d3ee", iconPath: "/icons/Tailwind CSS.svg", order: 7 },
      { name: "Redux", category: "frontend", borderColor: "#764abc", textColor: "#c084fc", iconPath: "/icons/Redux.svg", order: 8 },
      { name: "Zustand", category: "frontend", borderColor: "#d97706", textColor: "#fbbf24", iconPath: "/icons/zustend.png", order: 9 },

      // BACKEND
      { name: "Node.js", category: "backend", borderColor: "#22c55e", textColor: "#4ade80", iconPath: "/icons/nodejs.png", order: 10 },
      { name: "Express.js", category: "backend", borderColor: "#cbd5e1", textColor: "#e2e8f0", iconPath: "/icons/express.svg", order: 11 },
      { name: "C++", category: "backend", borderColor: "#00599c", textColor: "#60a5fa", iconPath: "/icons/C++ (CPlusPlus).svg", order: 12 },
      { name: "MongoDB", category: "backend", borderColor: "#13aa52", textColor: "#34d399", iconPath: "/icons/MongoDB.svg", order: 13 },
      { name: "Redis", category: "backend", borderColor: "#dc2626", textColor: "#ef4444", iconPath: "/icons/Redis.svg", order: 14 },
      { name: "RabbitMQ", category: "backend", borderColor: "#ff6600", textColor: "#fb923c", iconPath: "/icons/RabbitMQ.svg", order: 15 },
      { name: "JWT", category: "backend", borderColor: "#d63aff", textColor: "#e879f9", iconPath: "/icons/jwt.svg", order: 16 },
      { name: "Database", category: "backend", borderColor: "#3b82f6", textColor: "#60a5fa", iconPath: "/icons/database.png", order: 17 },

      // TOOLS & DEVOPS
      { name: "Git", category: "tools", borderColor: "#f05032", textColor: "#f87171", iconPath: "/icons/Git.svg", order: 18 },
      { name: "Docker", category: "tools", borderColor: "#0db7ed", textColor: "#38bdf8", iconPath: "/icons/docker.svg", order: 19 },
      { name: "AWS", category: "tools", borderColor: "#ff9900", textColor: "#fbbf24", iconPath: "/icons/AWS.svg", order: 20 },
      { name: "Postman", category: "tools", borderColor: "#ff6c37", textColor: "#fb923c", iconPath: "/icons/Postman.svg", order: 21 },
    ]);
    console.log("🌱 Skills seeded");
  }
}
