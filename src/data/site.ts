export const site = {
  name: 'Samuel Mahembe',
  location: 'Greater Boston',
  role: 'Software Engineer, Data and Transaction Systems',
  availability: 'Open to full-time Software Engineering and Data Engineering roles.',
  email: 'samuelmahembe3@gmail.com',
  linkedin: 'https://www.linkedin.com/in/samuel-mahembe',
  github: 'https://github.com/samuel-mahembe',
  nav: [
    { label: 'About', hash: 'about' },
    { label: 'Work', hash: 'work' },
    { label: 'Experience', hash: 'experience' },
    { label: 'Skills', hash: 'skills' },
    { label: 'Lab', hash: 'lab' },
    { label: 'Contact', hash: 'contact' },
  ],
} as const;

export const skills = [
  { group: 'Languages', items: 'Java, Python, SQL, JavaScript/TypeScript, C#' },
  { group: 'Backend and APIs', items: 'Spring Boot, REST, Microservices, SOAP, FastAPI' },
  { group: 'Data', items: 'Data modeling, ETL/ELT, Data warehousing, BigQuery, Pandas, Tableau, Power BI, PostgreSQL' },
  { group: 'Cloud and DevOps', items: 'AWS, GCP, Docker, Kubernetes, GitLab CI/CD' },
  { group: 'Frontend', items: 'Angular, React' },
] as const;

export const education = [
  {
    degree: 'MSc Business Analytics, Data Science',
    school: 'Hult International Business School, Boston',
    dates: 'Sep 2025 to Aug 2026',
  },
  {
    degree: 'Bachelor of Business Studies and Computer Science',
    school: 'University of Zimbabwe',
    dates: 'Feb 2018 to Feb 2022',
  },
] as const;

export const certifications = [
  { name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services' },
  { name: 'OCP: Java SE 17 Developer', issuer: 'Oracle' },
  { name: 'Data Visualization and Communication with Tableau', issuer: 'Duke University' },
] as const;
