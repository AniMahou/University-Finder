import universitiesData from '../data/universities.json';

export const universities = universitiesData;

export function getUniqueCountries() {
  return Array.from(new Set(universities.map(u => u.country))).sort();
}

export function getUniquePrograms() {
  const programsSet = new Set();
  universities.forEach(u => u.programs.forEach(p => programsSet.add(p)));
  return Array.from(programsSet).sort();
}

export function getUniversityById(id) {
  return universities.find(u => u.id === id);
}