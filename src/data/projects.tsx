import React from 'react';
import { Shield, Brain, Globe, LayoutTemplate } from 'lucide-react';

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  tags: string[];
  icon: JSX.Element;
  image: string | null;
  link: string;
  featured: boolean;
  images?: string[];
  reportUrl?: string;
  reportLabel?: string;
}

export const projects: ProjectData[] = [
  {
    id: "sersuite",
    title: "SerSuite Web Agency",
    description: "My personal web design and development business. Specializing in crafting premium, award-winning interactive websites and high-end digital experiences for modern brands using React, WebGL, and complex physics engines.",
    fullDescription: "SerSuite is a creative web agency focused on building next-generation digital experiences. We leverage modern web technologies including React, WebGL, and physics engines to craft highly interactive and visually stunning platforms that captivate users and elevate brand presence.",
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
    fullDescription: "Designed and developed a comprehensive Host-based Intrusion Detection System in Python. The system monitors critical files and processes, leveraging real-time logging and alerting mechanisms to rapidly respond to unauthorized changes and potential security breaches. It utilizes modular design for easy expansion and integration with existing security infrastructure.",
    tags: ["Python", "Security", "SysAdmin"],
    icon: <Shield className="w-8 h-8" />,
    image: "./assets/images/project-images/Host Based Intrustion System/Thumbnail.jpg",
    link: "/project/hids",
    featured: true,
    images: [
      "./assets/images/project-images/Host Based Intrustion System/hids1.jpg",
      "./assets/images/project-images/Host Based Intrustion System/hids2.png",
      "./assets/images/project-images/Host Based Intrustion System/hids3.png"
    ]
  },
  {
    id: "ai-study-assistant",
    title: "AI Study Assistant",
    description: "An intelligent educational platform leveraging Large Language Models to generate personalized study plans, summarize complex notes, and create interactive quizzes to optimize learning workflows.",
    fullDescription: "An end-to-end educational platform powered by LLMs. The application acts as a personal tutor, generating tailored study schedules, condensing voluminous notes into digestible summaries, and creating interactive quiz modules to enhance retention and optimize the overall learning workflow.",
    tags: ["AI/LLMs", "React", "Education"],
    icon: <Brain className="w-8 h-8" />,
    image: "./assets/images/project-images/Ai Study Assistant/Intro.jpg",
    link: "/project/ai-study-assistant",
    featured: false,
    images: [
      "./assets/images/project-images/Ai Study Assistant/Study with me 1.jpg",
      "./assets/images/project-images/Ai Study Assistant/Study with me 2.jpg",
      "./assets/images/project-images/Ai Study Assistant/Study with me 3.jpg"
    ]
  },
  {
    id: "gophish-sim",
    title: "GoPhish Security Simulation",
    description: "Deployed and configured the open-source GoPhish framework to conduct enterprise-grade phishing simulations. Tracked vulnerability metrics to develop targeted security awareness training.",
    fullDescription: "Orchestrated a full-scale phishing simulation campaign using the GoPhish framework. The project involved configuring mail servers, designing realistic phishing templates, and monitoring user interactions. Analytics were used to identify vulnerabilities, culminating in a detailed executive summary report and targeted awareness training to fortify the human element of security.",
    tags: ["GoPhish", "Cybersecurity", "SecOps"],
    icon: <Shield className="w-8 h-8" />,
    image: "./assets/images/project-images/Gophish Simulation/Thumbnail.png",
    link: "/project/gophish-sim",
    featured: false,
    images: [
      "./assets/images/project-images/Gophish Simulation/gophish1.png",
      "./assets/images/project-images/Gophish Simulation/gophish2.png",
      "./assets/images/project-images/Gophish Simulation/gophish3.png"
    ],
    reportUrl: "./assets/images/project-images/Gophish Simulation/Phishing Awareness Executive Summary.pdf",
    reportLabel: "View Executive Summary"
  }
];
