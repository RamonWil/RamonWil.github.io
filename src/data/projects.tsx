import type { ReactNode } from 'react';
import { Shield, Brain, Globe } from 'lucide-react';

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  tags: string[];
  icon: ReactNode;
  image: string | null;
  link: string;
  featured: boolean;
  images?: { url: string; text: string }[];
  reportUrl?: string;
  reportLabel?: string;
  githubUrl?: string;
}

export const projects: ProjectData[] = [
  {
    id: "sersuite",
    title: "SerSuite Web Agency",
    description: "My personal web design and development business. Specializing in crafting premium, award-winning interactive websites and high-end digital experiences for modern brands using React, WebGL, and complex physics engines.",
    fullDescription: "SerSuite is a premium creative web agency dedicated to engineering bespoke, next-generation digital experiences that bridge the gap between aesthetic brilliance and high-performance technical execution. Founded with a vision to redefine modern brand presence, the agency leverages cutting-edge web technologies—including React, advanced WebGL rendering, and custom physics engines—to craft highly interactive, immersive, and visually stunning platforms. Every project is meticulously designed from the ground up, ensuring that complex animations, fluid transitions, and dynamic data integrations perform flawlessly across all devices. By combining rigorous software engineering principles with avant-garde UI/UX design, SerSuite delivers scalable, accessible, and performant web applications that captivate audiences, drive engagement, and establish a commanding digital footprint for forward-thinking businesses and visionary brands.",
    tags: ["Web Development", "UI/UX Design", "Business"],
    icon: <Globe className="w-8 h-8" />,
    image: "./assets/images/project-images/SerSuite/thumbnail.png",
    link: "https://sersuite.com",
    featured: true,
    images: []
  },
  {
    id: "hids",
    title: "Host-based Intrusion Detection System",
    description: "A highly robust HIDS that monitors system activity for suspicious behavior and unauthorized changes. Developed in Python with real-time logging, alerting, and automated response features.",
    fullDescription: "I architected and developed a comprehensive, highly robust Host-based Intrusion Detection System (HIDS) utilizing Python, designed to serve as a critical line of defense for enterprise environments. This system continuously and autonomously monitors critical system files, directories, and background processes, utilizing advanced cryptographic hashing algorithms and strict baseline comparisons to detect unauthorized modifications, zero-day anomalies, and suspicious behavioral patterns. Upon detecting a deviation from the established secure baseline, the system instantly triggers a cascade of automated alerting mechanisms, dispatching real-time notifications to security administrators while simultaneously logging the exact nature, timestamp, and location of the breach. The architecture was built with modularity and scalability in mind, allowing for seamless integration with existing Security Information and Event Management (SIEM) solutions. By implementing stringent access controls, cryptographic integrity checks, and a resilient, multi-threaded monitoring engine, this HIDS significantly reduces the mean time to detect (MTTD) and empowers security teams to neutralize threats before they can escalate.",
    tags: ["Python", "Security", "SysAdmin"],
    icon: <Shield className="w-8 h-8" />,
    image: "./assets/images/project-images/Host Based Intrustion System/Thumbnail.jpg",
    link: "/project/hids",
    githubUrl: "https://github.com/RamonWil/HIDS",
    featured: true,
    images: [
      {
        url: "./assets/images/project-images/Host Based Intrustion System/hids1.jpg",
        text: "A comprehensive overview of the core System Architecture, visualizing how the HIDS securely interfaces with the underlying operating system and file structures. The diagram delineates the flow of data from raw system logs to the analytical engine, showcasing the strategic placement of monitoring agents, the secure communication channels used for transmitting cryptographic hashes, and the centralized dashboard that aggregates these inputs into a unified, actionable security posture."
      },
      {
        url: "./assets/images/project-images/Host Based Intrustion System/hids2.png",
        text: "Demonstration of the Detailed Logging & Alerts engine in action. This interface provides security administrators with a granular, live-updating view of all system activities, highlighting suspicious file modifications, unexpected permission changes, and unauthorized access attempts. It utilizes multi-channel notifications to ensure that security operations center (SOC) personnel are immediately informed of potential breaches, providing actionable telemetry and contextual data required for rapid incident response."
      },
      {
        url: "./assets/images/project-images/Host Based Intrustion System/hids3.png",
        text: "A deep dive into the Custom Configuration capabilities of the HIDS, illustrating the highly modular parameters and rule sets available to administrators. This flexible configuration module empowers security teams to establish precise baselines, define custom cryptographic hash policies, tune alert sensitivity thresholds, and seamlessly integrate new anomaly detection signatures to adapt to the ever-evolving landscape of zero-day threats and advanced persistent threats."
      }
    ]
  },
  {
    id: "ai-study-assistant",
    title: "AI Study Assistant",
    description: "An intelligent educational platform leveraging Large Language Models to generate personalized study plans, summarize complex notes, and create interactive quizzes to optimize learning workflows.",
    fullDescription: "The AI Study Assistant is a sophisticated, end-to-end educational platform engineered to revolutionize the way students interact with and internalize complex academic materials. Powered by state-of-the-art Large Language Models (LLMs), the application acts as an intelligent, personalized tutor that dynamically adapts to individual learning styles and paces. The system ingests voluminous course notes, textbooks, and lectures, utilizing advanced Natural Language Processing (NLP) to parse, contextualize, and condense the data into highly digestible, conceptually linked summaries. Beyond summarization, the platform features a proprietary algorithmic engine that generates bespoke study schedules, ensuring optimal spaced repetition and cognitive load management. Furthermore, it dynamically synthesizes interactive, context-aware quiz modules that test the user's comprehension of the source material, providing immediate, detailed feedback and targeted review suggestions. Built with a modern React frontend and a scalable backend infrastructure, this project represents a seamless fusion of educational psychology and artificial intelligence, resulting in a highly optimized and engaging learning workflow.",
    tags: ["AI/LLMs", "React", "Education"],
    icon: <Brain className="w-8 h-8" />,
    image: "./assets/images/project-images/Ai Study Assistant/Intro.jpg",
    link: "/project/ai-study-assistant",
    featured: false,
    images: [
      {
        url: "./assets/images/project-images/Ai Study Assistant/Study with me 1.jpg",
        text: "The intelligent Tutor Chat interface, representing the primary interactive gateway of the educational platform. Here, students can engage in real-time, highly contextualized dialogue with an advanced Large Language Model trained specifically to act as a personalized academic mentor. The system intelligently breaks down complex concepts, answers nuanced questions derived from course materials, and provides step-by-step guidance, adapting its tone and complexity to perfectly match the individual student's learning pace and existing knowledge base."
      },
      {
        url: "./assets/images/project-images/Ai Study Assistant/Study with me 2.jpg",
        text: "Showcasing the Smart Notes Upload and Parsing engine, highlighting how the platform seamlessly ingests raw academic materials. Students can upload dense, multi-format documents, which the backend immediately processes utilizing sophisticated Natural Language Processing (NLP). The system intelligently extracts semantic meaning, strips away irrelevant formatting, and instantly synthesizes the data into highly structured, digestible summaries, preparing the content for complex algorithmic synthesis and customized learning pathway generation."
      },
      {
        url: "./assets/images/project-images/Ai Study Assistant/Study with me 3.jpg",
        text: "A detailed look at the Gamified Quiz and Challenge Mode, a sophisticated testing environment designed to maximize long-term information retention and combat cognitive fatigue. This module immerses the user in a frictionless, highly engaging active-recall atmosphere that dynamically calculates optimal study intervals utilizing proven spaced repetition algorithms. By seamlessly distributing intellectual workload and rewarding continuous progress, it actively prevents academic burnout and transforms passive reading into a compelling, data-driven learning workflow."
      }
    ]
  },
  {
    id: "gophish-sim",
    title: "GoPhish Security Simulation",
    description: "Deployed and configured the open-source GoPhish framework to conduct enterprise-grade phishing simulations. Tracked vulnerability metrics to develop targeted security awareness training.",
    fullDescription: "In an effort to fortify the human element of organizational cybersecurity, I orchestrated and deployed a full-scale, enterprise-grade phishing simulation campaign utilizing the open-source GoPhish framework. This comprehensive security initiative involved the meticulous configuration of internal mail servers, the establishment of authenticated sender domains to bypass basic spam filters, and the psychological engineering of highly realistic, contextually relevant phishing templates designed to mimic modern social engineering tactics. Throughout the execution phase, the platform continuously tracked granular user interaction metrics—including email open rates, link click-through rates, and compromised credential submissions. These data points were aggregated and analyzed to map the organization's vulnerability landscape, identifying high-risk departments and recurring behavioral vulnerabilities. The culmination of this project was the delivery of an exhaustive executive summary report, which translated complex technical metrics into actionable business intelligence, ultimately driving the development of a targeted, data-backed security awareness training program that significantly reduced the organization's susceptibility to phishing attacks.",
    tags: ["GoPhish", "Cybersecurity", "SecOps"],
    icon: <Shield className="w-8 h-8" />,
    image: "./assets/images/project-images/Gophish Simulation/Thumbnail.png",
    link: "/project/gophish-sim",
    featured: false,
    images: [
      {
        url: "./assets/images/project-images/Gophish Simulation/gophish1.png",
        text: "The centralized Campaign Configuration interface, which serves as the operational headquarters for deploying targeted, enterprise-grade phishing simulations. From this view, administrators can meticulously configure realistic phishing templates and establish custom sender profiles, establishing authenticated domains designed specifically to bypass basic spam filters. This initial setup is critical to emulate sophisticated real-world attacks and rigorously assess organizational response behavior across diverse user groups."
      },
      {
        url: "./assets/images/project-images/Gophish Simulation/gophish2.png",
        text: "A comprehensive dive into the Metrics & Analytics tracking dashboard. Throughout the execution phase of the simulation, this platform continuously aggregates and visualizes raw interaction data, carefully monitoring granular metrics such as email click-through rates, initial engagement delays, and inadvertently submitted credentials. By breaking down these data points in real-time, security teams can rapidly identify localized security weak points, measure departmental risk profiles, and trace improvement trends over consecutive campaign cycles."
      },
      {
        url: "./assets/images/project-images/Gophish Simulation/gophish3.png",
        text: "The final Awareness Reporting and Executive Summary presentation format. After concluding a rigorous simulation, the aggregated intelligence is translated into an exhaustive executive summary report, effectively bridging the gap between highly technical vulnerability metrics and high-level business intelligence. These detailed insights are subsequently utilized by enterprise leadership to drive the development of a targeted, data-backed security awareness training program designed to radically reduce human susceptibility to complex social engineering attacks."
      }
    ],
    reportUrl: "./assets/images/project-images/Gophish Simulation/Phishing Awareness Executive Summary.pdf",
    reportLabel: "View Executive Summary"
  }
];
