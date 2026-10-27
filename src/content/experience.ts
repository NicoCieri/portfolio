export type ExperiencePeriod = {
  start: string;
  end: string | null;
};

export type ExperienceRole = {
  title: string;
  period: ExperiencePeriod;
  summary: string;
};

export type TeachingAppointment = {
  institution: string;
  title: string;
  period: ExperiencePeriod;
  summary?: string;
};

export type EmployerExperience = {
  employer: string;
  period: ExperiencePeriod;
  roles: ExperienceRole[];
  recent?: boolean;
  teaching?: TeachingAppointment;
};

// Public employer names, role/date ranges, and general summaries were approved
// for this section. End clients, product details, logos, and outcomes are omitted.
export const professionalExperience: EmployerExperience[] = [
  {
    employer: "ITTI",
    period: { start: "2024-09", end: null },
    recent: true,
    roles: [
      {
        title: "Technical Lead",
        period: { start: "2025-12", end: null },
        summary:
          "Contribute to frontend implementation, architecture, and technical standards. Coordinate delivery with product, design, backend, and DevOps teams, and support engineers through code reviews and mentoring.",
      },
      {
        title: "Front End Web and Mobile Developer",
        period: { start: "2024-09", end: "2025-11" },
        summary: "Developed web and mobile interfaces as part of the frontend team.",
      },
    ],
    teaching: {
      institution: "Universidad Nacional de Hurlingham (UNAHUR)",
      title: "Teaching Assistant · User Interface Development",
      period: { start: "2026-08", end: null },
    },
  },
  {
    employer: "Fanki",
    period: { start: "2023-06", end: "2024-08" },
    recent: true,
    roles: [
      {
        title: "Front End Web and Mobile Developer",
        period: { start: "2023-06", end: "2024-08" },
        summary: "Built web and mobile interfaces with React, Next.js, and React Native.",
      },
    ],
    teaching: {
      institution: "Coderhouse",
      title: "React.js Instructor and Tutor Coordinator",
      period: { start: "2023-07", end: "2023-11" },
      summary: "Delivered 15 live React.js classes to approximately 100 students and coordinated the supporting tutor team.",
    },
  },
  {
    employer: "Simetrik",
    period: { start: "2022-09", end: "2023-01" },
    roles: [
      {
        title: "Front End Developer",
        period: { start: "2022-09", end: "2023-01" },
        summary: "Developed frontend modules and contributed to a shared component library with React and TypeScript.",
      },
    ],
  },
  {
    employer: "Making Sense",
    period: { start: "2020-08", end: "2022-08" },
    roles: [
      {
        title: "Front End Developer",
        period: { start: "2020-08", end: "2022-08" },
        summary: "Built and maintained frontend applications with React and TypeScript, including state management and component testing.",
      },
    ],
  },
  {
    employer: "intive",
    period: { start: "2018-08", end: "2020-08" },
    roles: [
      {
        title: "Front End Developer",
        period: { start: "2018-08", end: "2020-08" },
        summary: "Developed frontend applications with React, Redux, and TypeScript, supported by automated testing.",
      },
    ],
  },
  {
    employer: "Globant",
    period: { start: "2017-06", end: "2018-08" },
    roles: [
      {
        title: "Web UI Developer",
        period: { start: "2017-06", end: "2018-08" },
        summary: "Built web interfaces with React and Redux, with automated testing and collaboration in agile teams.",
      },
    ],
  },
  {
    employer: "VN Studios SRL",
    period: { start: "2015-08", end: "2017-06" },
    roles: [
      {
        title: "Front End Developer",
        period: { start: "2015-08", end: "2017-06" },
        summary: "Built responsive web interfaces and hybrid mobile applications.",
      },
    ],
  },
  {
    employer: "Creacttive S.A.",
    period: { start: "2015-01", end: "2015-08" },
    roles: [
      {
        title: "Junior Front End Developer",
        period: { start: "2015-01", end: "2015-08" },
        summary: "Implemented responsive websites and email newsletters.",
      },
    ],
  },
];
