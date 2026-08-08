import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database (SQLite Mode)...");

  // 1. Clean existing records
  await prisma.blog.deleteMany({});
  await prisma.spotifyToken.deleteMany({});
  await prisma.visitor.deleteMany({});
  await prisma.contactMessage.deleteMany({});
  await prisma.knowledgeBase.deleteMany({});
  await prisma.now.deleteMany({});
  await prisma.uses.deleteMany({});
  await prisma.experience.deleteMany({});
  await prisma.quote.deleteMany({});
  await prisma.inspiration.deleteMany({});
  await prisma.book.deleteMany({});
  await prisma.sEO.deleteMany({});
  await prisma.media.deleteMany({});
  await prisma.resume.deleteMany({});
  await prisma.skill.deleteMany({});
  await prisma.projectTag.deleteMany({});
  await prisma.projectTechnology.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.technology.deleteMany({});
  await prisma.projectImage.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.user.deleteMany({});

  // 2. Create Admin User
  const hashedPassword = await bcrypt.hash("adminPassword123", 10);
  const admin = await prisma.user.create({
    data: {
      email: "admin@aniket.dev",
      password: hashedPassword,
      name: "Aniket Upadhyay",
      role: "ADMIN",
    },
  });
  console.log("Admin user created:", admin.email);

  // 3. Technologies
  const techData = [
    { name: "Next.js", icon: "NextJs", color: "#FFFFFF" },
    { name: "TypeScript", icon: "TypeScript", color: "#3178C6" },
    { name: "Three.js", icon: "ThreeJs", color: "#EB6E00" },
    { name: "React Three Fiber", icon: "R3f", color: "#61DAFB" },
    { name: "Node.js", icon: "NodeJs", color: "#339933" },
    { name: "Express", icon: "Express", color: "#FFFFFF" },
    { name: "Prisma", icon: "Prisma", color: "#2D3748" },
    { name: "MySQL", icon: "MySql", color: "#4479A1" },
    { name: "Redis", icon: "Redis", color: "#DC382D" },
    { name: "Docker", icon: "Docker", color: "#2496ED" },
    { name: "Tailwind CSS", icon: "Tailwind", color: "#06B6D4" },
    { name: "Framer Motion", icon: "Framer", color: "#EB6E00" },
  ];

  const technologies: Record<string, any> = {};
  for (const t of techData) {
    technologies[t.name] = await prisma.technology.create({ data: t });
  }

  // 4. Tags
  const tagData = ["AI & RAG", "3D Web", "High Performance", "SaaS", "Open Source", "Real-Time"];
  const tags: Record<string, any> = {};
  for (const name of tagData) {
    tags[name] = await prisma.tag.create({ data: { name } });
  }

  // 5. Projects
  // Project 1
  const project1 = await prisma.project.create({
    data: {
      title: "OmniRAG - Autonomous Cognitive Search Engine",
      slug: "omnirag",
      description: "A high-performance semantic search platform capable of parsing multi-modal documents, indexing vectors under 15ms, and running self-correcting agent chains to resolve user queries with zero hallucination.",
      problem: "Traditional semantic search engines fail to understand structured tables inside PDFs and suffer from hallucination when retrieving context from documents outside their training set, leading to high error rates in production RAG systems.",
      solution: "Implemented custom PDF chunking pipeline leveraging optical character recognition (OCR) for layout extraction, combined with a hybrid dense-sparse vector database configuration (Pinecone + BM25) and LangGraph agent loops to evaluate and verify references before answering.",
      architecture: "Client (Next.js 15 App Router) -> REST API Gateway (Express) -> Service worker (Python / FastStream) -> Vector DB (Milvus) & Cache (Redis). Orchestrates model calls dynamically via LangChain.",
      featuredImage: "/images/projects/omnirag-featured.jpg",
      mobileImage: "/images/projects/omnirag-mobile.jpg",
      desktopImage: "/images/projects/omnirag-desktop.jpg",
      github: "https://github.com/aniket-upadhyay/omnirag",
      demo: "https://omnirag.dev",
      status: "COMPLETED",
      featured: true,
      githubStars: 1420,
      downloads: 45000,
      usersCount: 8200,
      lighthouseScore: 98,
      orderIndex: 0,
    },
  });

  // Project 2
  const project2 = await prisma.project.create({
    data: {
      title: "Aura3D - WebGL Assembly and CAD Workspace",
      slug: "aura3d",
      description: "An interactive, browser-based 3D workspace built on React Three Fiber and WebGL, allowing engineers to visualize, rotate, and interact with complex mechanical assemblies containing up to 100,000 polygons at 60 FPS.",
      problem: "Mechanical parts visualizers are historically heavy desktop installations that do not work smoothly inside standard browsers, limiting collaboration and mobile project reviews.",
      solution: "Constructed a lightweight GPU-instanced visualization pipeline in Three.js, utilizing custom GLSL shaders, vertex coordinates compression, and worker-based parser engines to import GLTF assets instantly.",
      architecture: "Next.js + React Three Fiber + Drei + Custom GLSL Shaders on WebGL canvas. State managed via Zustand. Static components delivered over global CDN.",
      featuredImage: "/images/projects/aura3d-featured.jpg",
      mobileImage: "/images/projects/aura3d-mobile.jpg",
      desktopImage: "/images/projects/aura3d-desktop.jpg",
      github: "https://github.com/aniket-upadhyay/aura3d",
      demo: "https://aura3d.dev",
      status: "COMPLETED",
      featured: true,
      githubStars: 890,
      downloads: 12000,
      usersCount: 3100,
      lighthouseScore: 96,
      orderIndex: 1,
    },
  });

  // Project Links
  await prisma.projectTechnology.createMany({
    data: [
      { projectId: project1.id, technologyId: technologies["Next.js"].id },
      { projectId: project1.id, technologyId: technologies["TypeScript"].id },
      { projectId: project1.id, technologyId: technologies["Node.js"].id },
      { projectId: project1.id, technologyId: technologies["Redis"].id },
      { projectId: project1.id, technologyId: technologies["Prisma"].id },
      { projectId: project1.id, technologyId: technologies["MySQL"].id },
      { projectId: project2.id, technologyId: technologies["Next.js"].id },
      { projectId: project2.id, technologyId: technologies["TypeScript"].id },
      { projectId: project2.id, technologyId: technologies["Three.js"].id },
      { projectId: project2.id, technologyId: technologies["React Three Fiber"].id },
      { projectId: project2.id, technologyId: technologies["Framer Motion"].id },
    ],
  });

  await prisma.projectTag.createMany({
    data: [
      { projectId: project1.id, tagId: tags["AI & RAG"].id },
      { projectId: project1.id, tagId: tags["High Performance"].id },
      { projectId: project1.id, tagId: tags["SaaS"].id },
      { projectId: project2.id, tagId: tags["3D Web"].id },
      { projectId: project2.id, tagId: tags["High Performance"].id },
      { projectId: project2.id, tagId: tags["Open Source"].id },
    ],
  });

  // 6. Experience
  await prisma.experience.createMany({
    data: [
      {
        role: "Senior Full Stack Engineer",
        company: "Vercel",
        location: "San Francisco, CA (Remote)",
        startDate: new Date("2024-06-01"),
        isCurrent: true,
        description: "Leading frontend performance initiatives and DX toolchains. Built dynamic streaming routers, engineered edge caching architectures reducing TTFB by 18%, and optimized Next.js static generation pipelines for high-throughput client platforms.",
        logoUrl: "/images/companies/vercel.png",
        orderIndex: 0,
      },
      {
        role: "Software Engineer - Product Systems",
        company: "Linear",
        location: "New York, NY (Hybrid)",
        startDate: new Date("2022-03-01"),
        endDate: new Date("2024-05-31"),
        isCurrent: false,
        description: "Obsessed over micro-interactions, responsive typography, and client-side database synchronization. Re-engineered offline-first synchronization queries in SQLite/WebAssembly, accelerating search indexing and improving core editor responsiveness to sub-8ms inputs.",
        logoUrl: "/images/companies/linear.png",
        orderIndex: 1,
      },
    ],
  });

  // 7. Skills
  await prisma.skill.createMany({
    data: [
      { name: "Next.js", category: "Frontend", level: "EXPERT", featured: true, orderIndex: 0 },
      { name: "TypeScript", category: "Frontend", level: "EXPERT", featured: true, orderIndex: 1 },
      { name: "Three.js / R3F", category: "Frontend", level: "ADVANCED", featured: true, orderIndex: 2 },
      { name: "Tailwind CSS", category: "Frontend", level: "EXPERT", featured: false, orderIndex: 3 },
      { name: "Node.js / Express", category: "Backend", level: "EXPERT", featured: true, orderIndex: 4 },
      { name: "Prisma & SQL", category: "Backend", level: "EXPERT", featured: true, orderIndex: 5 },
      { name: "Redis Caching", category: "Backend", level: "ADVANCED", featured: false, orderIndex: 6 },
      { name: "Docker & K8s", category: "DevOps", level: "ADVANCED", featured: true, orderIndex: 7 },
    ],
  });

  // 8. Books
  const ddia = await prisma.book.create({
    data: {
      title: "Designing Data-Intensive Applications",
      author: "Martin Kleppmann",
      coverUrl: "/images/books/ddia.jpg",
      rating: 5.0,
      biggestTakeaway: "System architecture is defined by trade-offs. Scaling isn't about magical algorithms; it is about choosing the right replication, partitioning, and consensus strategies.",
      myThoughts: "This book is the bible of distributed systems. It bridged the gap for me between blindly using databases and actually understanding storage layouts, transactions, and consensus protocols.",
      notes: "An absolute masterclass in database storage engines, query languages, distributed consensus, data replication, and partitioning.",
      lessons: "Learned the core tradeoffs between SSTables/LSM-Trees and B-Trees, linearizability versus eventual consistency, and how database transactions execute safely.",
      status: "COMPLETED",
      category: "Programming",
      pagesTotal: 580,
      pagesRead: 580,
      chapters: {
        create: [
          {
            title: "Reliability, Scalability, and Maintainability",
            summary: "Defines the core pillars of systems design: Reliability (tolerating faults), Scalability (handling growth via load parameters), and Maintainability (ease of operational updates).",
            learnings: "Learned how to model load using percentiles (p95, p99) and separate application bugs from system hardware failures.",
            quote: "An application is reliable if it continues to work correctly, even when things go wrong.",
            notes: "Must monitor p99 latency in production systems to capture the tail of delayed requests.",
            application: "Refactored Express route latency logging to report percentiles instead of simple arithmetic means.",
            orderIndex: 1
          },
          {
            title: "Storage and Retrieval",
            summary: "Deep dives into storage engines, comparing log-structured LSM-Trees (optimized for writes) with B-Trees (optimized for reads).",
            learnings: "Understand SSTables, bloom filters, and compaction operations that manage write amplification.",
            quote: "A database storage engine is optimized for either write-throughput or read-throughput, never both.",
            notes: "Use LSM-Trees/RocksDB for high write ingestion logs.",
            application: "Designed custom cached analytics logging keys leveraging append-only writes.",
            orderIndex: 2
          }
        ]
      },
      bookmarks: {
        create: [
          {
            chapterTitle: "Storage and Retrieval",
            highlightText: "A database storage engine is optimized for either write-throughput or read-throughput, never both.",
            note: "Key concept for write-heavy services.",
            pageNumber: 83
          }
        ]
      }
    }
  });

  const hpbn = await prisma.book.create({
    data: {
      title: "High Performance Browser Networking",
      author: "Ilya Grigorik",
      coverUrl: "/images/books/hpbn.jpg",
      rating: 4.8,
      biggestTakeaway: "Latency is the primary bottleneck of the modern web. Every network round-trip controls browser performance.",
      myThoughts: "Grigorik highlights the physics of packet delivery. It is a fantastic guide on TCP/UDP, TLS handshakes, HTTP/2, and HTTP/3 performance optimizations.",
      notes: "Excellent read detailing TCP, UDP, TLS handshakes, HTTP/2, HTTP/3, and standard compression techniques that control browser latency.",
      lessons: "Applying head-of-line blocking resolutions, network round-trip controls, and configuring optimal window sizes directly in backend applications.",
      status: "COMPLETED",
      category: "Programming",
      pagesTotal: 380,
      pagesRead: 380,
      chapters: {
        create: [
          {
            title: "Primer on Latency and Bandwidth",
            summary: "Explains how the speed of light limits latency, and why bandwidth improvements alone do not make pages load faster.",
            learnings: "Learned that RTT (Round Trip Time) is the dominant factor in page load speed, not bandwidth cap.",
            quote: "The fastest request is the request not made.",
            notes: "Eliminate requests via caching and bundle consolidation.",
            application: "Implemented a local memory cache in the portfolio API to eliminate redundant DB requests.",
            orderIndex: 1
          }
        ]
      }
    }
  });

  const habits = await prisma.book.create({
    data: {
      title: "Atomic Habits",
      author: "James Clear",
      coverUrl: "/images/books/atomic-habits.jpg",
      rating: 4.8,
      biggestTakeaway: "You do not rise to the level of your goals. You fall to the level of your systems. Focus on 1% daily improvements.",
      myThoughts: "James Clear shows that self-discipline is a structural system, not a personality trait. Just like building software, clean habit loops create long-term compound results.",
      notes: "Establish atomic routines for coding, studying, and rest.",
      lessons: "Learned how to design environmental triggers that make good habits obvious and bad habits invisible.",
      status: "COMPLETED",
      category: "Business",
      pagesTotal: 320,
      pagesRead: 320,
      chapters: {
        create: [
          {
            title: "The Surprising Power of Atomic Habits",
            summary: "Explains how small 1% improvements compound over time. A 1% change daily makes you 37 times better by year-end.",
            learnings: "Systemic progress compounds, while goals are temporary states.",
            quote: "Habits are the compound interest of self-improvement.",
            notes: "Focus on consistent small daily gains.",
            application: "Commit code daily to maintain progression focus.",
            orderIndex: 1
          },
          {
            title: "How Your Habits Shape Your Identity",
            summary: "Argues that behavior change is built on identity shift. True behavior change is identity change, not outcome change.",
            learnings: "Focus on who you wish to become (e.g. an engineer) rather than what you want to achieve.",
            quote: "Every action you take is a vote for the type of person you wish to become.",
            notes: "Act like a world-class engineer in daily standards.",
            application: "Refactored legacy files to enforce strict typescript checks and documentation standards.",
            orderIndex: 2
          }
        ]
      },
      bookmarks: {
        create: [
          {
            chapterTitle: "How Your Habits Shape Your Identity",
            highlightText: "Every action you take is a vote for the type of person you wish to become.",
            note: "Adopt the mindset of a builder daily.",
            pageNumber: 37
          }
        ]
      }
    }
  });

  const musk = await prisma.book.create({
    data: {
      title: "Elon Musk",
      author: "Walter Isaacson",
      coverUrl: "/images/books/elon-musk.jpg",
      rating: 4.7,
      biggestTakeaway: "First principles thinking is the ultimate problem-solving framework. Question constraints and build systems from absolute physics.",
      myThoughts: "Isaacson captures Musk's intense intensity and physics-first thinking. It highlights the value of questioning constraints instead of copying industry norms.",
      notes: "Question every requirement, simplify process steps, and accelerate development cycles.",
      lessons: "Optimize processes: question constraints, delete unnecessary steps, simplify, and automate.",
      status: "READING",
      category: "Biography",
      pagesTotal: 670,
      pagesRead: 512,
      chapters: {
        create: [
          {
            title: "First Principles Design",
            summary: "Musk's core design philosophy: boil things down to the most fundamental truths and reason up from there, rather than reasoning by analogy.",
            learnings: "How to optimize processes: question constraints, delete unnecessary steps, simplify, and automate.",
            quote: "The only rules are the ones dictated by the laws of physics. Everything else is a recommendation.",
            notes: "Avoid copy-pasting code patterns without proving their core logic.",
            application: "Wrote the custom WebGL cursor coordinate trackers from scratch instead of loading bulky third-party libraries.",
            orderIndex: 1
          }
        ]
      }
    }
  });

  const richdad = await prisma.book.create({
    data: {
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      coverUrl: "/images/books/rich-dad.jpg",
      rating: 4.2,
      biggestTakeaway: "An asset puts money in your pocket. A liability takes money out. Financial freedom is achieved by building assets.",
      myThoughts: "This book provides a basic foundation in financial literacy. It helps reframe career decisions from simple income chasing to asset accumulation.",
      notes: "Build digital assets that generate leverage.",
      lessons: "Financial intelligence is more valuable than simple labor earnings.",
      status: "TO_READ",
      category: "Finance",
      pagesTotal: 250,
      pagesRead: 0,
      chapters: {
        create: [
          {
            title: "The Rich Don't Work for Money",
            summary: "Explains that the poor and middle class work for money, while the rich have money work for them through investments and assets.",
            learnings: "Financial intelligence is more valuable than simple labor earnings.",
            quote: "It's not how much money you make. It's how much money you keep.",
            notes: "Invest in building leverage-producing software products.",
            application: "Invested time in building a robust open-source project portfolio that acts as a recurring personal resume asset.",
            orderIndex: 1
          }
        ]
      }
    }
  });

  // 9. Inspiration
  await prisma.inspiration.createMany({
    data: [
      {
        name: "Steve Jobs",
        imageUrl: "/images/inspiration/jobs.jpg",
        quote: "Details matter, it's worth waiting to get it right.",
        lessons: "Uncompromising obsession with design elegance, font rendering quality, and seamless user interaction.",
        orderIndex: 0,
      },
      {
        name: "Naval Ravikant",
        imageUrl: "/images/inspiration/naval.jpg",
        quote: "Build self-reliance, learn to code, and build leverage.",
        lessons: "Focus on technical depth, compounding knowledge, high-agency thinking, and code/media leverage.",
        orderIndex: 1,
      },
    ],
  });

  // 10. Quotes
  await prisma.quote.createMany({
    data: [
      { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci", active: true },
      { text: "Make it work, make it right, make it fast.", author: "Kent Beck", active: true },
      { text: "Premature optimization is the root of all evil.", author: "Donald Knuth", active: true },
    ],
  });

  // 15. Blog
  await prisma.blog.create({
    data: {
      title: "Advanced Edge Caching: Optimizing Next.js for Global Scale",
      slug: "edge-caching",
      coverImage: "/images/blogs/edge-caching.jpg",
      tags: "Next.js, Caching, Edge Computing",
      published: true,
      featured: true,
      readingTime: 5,
    },
  });

  // 11. Uses
  await prisma.uses.createMany({
    data: [
      { name: "MacBook Pro M3 Max", category: "Hardware", description: "16-inch, 64GB RAM, 2TB SSD. The absolute powerhouse for running local Docker containers, CAD software, and compilation tasks.", orderIndex: 0 },
      { name: "Keychron Q1 Pro", category: "Hardware", description: "Fully customized mechanical keyboard with tactile brown switches, configured for comfortable, quiet programming.", orderIndex: 1 },
      { name: "Cursor & VS Code", category: "Software", description: "The primary IDE suite, customized with Zen theme, JetBrains Mono font, and dynamic AI auto-completions.", orderIndex: 2 },
    ],
  });

  // 12. Now
  await prisma.now.create({
    data: {
      reading: "High Performance Browser Networking by Ilya Grigorik",
      learning: "Rust (specifically for WebAssembly systems and GPU-instanced shading)",
      building: "A custom Edge cache parser for distributed assets routing",
      listening: "Low-fi synthwave loops and ambient techno for writing code",
      goal: "Finalizing optimization benchmarks on R3F canvas nodes to maximize mobile GPU compatibility",
    },
  });

  // 13. KnowledgeBase
  await prisma.knowledgeBase.createMany({
    data: [
      {
        title: "Aniket Upadhyay Professional Background",
        content: "Aniket Upadhyay is a Senior Full Stack Engineer specializing in Next.js, Node.js, Three.js, and Prisma. He currently works at Vercel optimizing developer experience, edge servers, and next-generation framework performance. Previously, he worked at Linear implementing offline-first architecture, SQLite sync, and sub-8ms UI states.",
        category: "Biography",
        priority: 10,
        keywords: "aniket, upadhyay, biography, role, job, background, vercel, linear",
      },
      {
        title: "OmniRAG Technical Details",
        content: "OmniRAG is Aniket's pride project—an autonomous semantic RAG search system indexing data in under 15ms. It runs on Next.js 15, Express, Prisma, Redis, Milvus vector database, and LangChain to ensure verified facts with no hallucination.",
        category: "Projects",
        priority: 9,
        keywords: "omnirag, rag, ai, search, vectors, milvus, langchain",
      },
      {
        title: "Engineering Philosophy",
        content: "Aniket Upadhyay believes in craftsmanship and high-agency engineering. Code should be clean, highly optimized, and respect system architecture constraints. Performance is a core feature, and details like layout shift, edge cache hits, and typography spacing require absolute obsession.",
        category: "WorkStyle",
        priority: 8,
        keywords: "philosophy, clean code, engineering, work style, values",
      },
    ],
  });

  // 14. SEO
  await prisma.sEO.createMany({
    data: [
      {
        page: "/",
        title: "Aniket Upadhyay | Senior Full Stack Engineer & Product Creator",
        description: "The official personal developer platform of Aniket Upadhyay. Exploring clean architectures, high-performance R3F WebGL systems, edge computing, and product engineering.",
        keywords: "Aniket Upadhyay, Software Engineer, Next.js, React, Node.js, Three.js, WebGL, Portfolio",
        ogTitle: "Aniket Upadhyay | Personal Developer Platform",
        ogDescription: "Obsessed over developer tools, interactive 3D computing, and high-performance system architectures.",
        ogImage: "/images/og/home.jpg",
        twitterCard: "summary_large_image",
        structuredData: `{"@context": "https://schema.org", "@type": "Person", "name": "Aniket Upadhyay", "jobTitle": "Senior Software Engineer"}`,
      },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
