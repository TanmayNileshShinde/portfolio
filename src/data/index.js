export * from './portfolioData';

// exports
import { personalInfo, techStackCategories, projectsList, education } from './portfolioData';

export const stats = [
  { value: "4+", label: "Production Deployments" },
  { value: "8+", label: "Interactive Games & Apps" },
  { value: "100%", label: "Responsive & Modern" },
  { value: "Real-Time", label: "Architecture Focus" }
];

export const skillsCategories = techStackCategories.map(cat => ({
  category: cat.title,
  icon: "terminal",
  skills: cat.groups.flatMap(g => g.skills)
}));

export const projects = projectsList;
export { personalInfo, education };