import { NextResponse } from 'next/server';
import { universities } from '../../../lib/universityData';

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  
  // Parse filters
  const filters = {
    search: searchParams.get('search') || undefined,
    countries: searchParams.get('countries')?.split(',').filter(Boolean) || undefined,
    minTuition: searchParams.get('minTuition') ? Number(searchParams.get('minTuition')) : undefined,
    maxTuition: searchParams.get('maxTuition') ? Number(searchParams.get('maxTuition')) : undefined,
    minRanking: searchParams.get('minRanking') ? Number(searchParams.get('minRanking')) : undefined,
    maxRanking: searchParams.get('maxRanking') ? Number(searchParams.get('maxRanking')) : undefined,
    minYear: searchParams.get('minYear') ? Number(searchParams.get('minYear')) : undefined,
    maxYear: searchParams.get('maxYear') ? Number(searchParams.get('maxYear')) : undefined,
    programs: searchParams.get('programs')?.split(',').filter(Boolean) || undefined,
    type: searchParams.get('type')?.split(',').filter(Boolean) || undefined,
    researchOutput: searchParams.get('researchOutput')?.split(',').filter(Boolean) || undefined,
    minAcceptanceRate: searchParams.get('minAcceptanceRate') ? Number(searchParams.get('minAcceptanceRate')) : undefined,
    maxAcceptanceRate: searchParams.get('maxAcceptanceRate') ? Number(searchParams.get('maxAcceptanceRate')) : undefined,
    scholarships: searchParams.get('scholarships') === 'true' ? true : undefined,
    accommodation: searchParams.get('accommodation') === 'true' ? true : undefined,
    sortBy: searchParams.get('sortBy') || 'ranking',
    sortOrder: searchParams.get('sortOrder') || 'asc',
  };

  // Apply filters
  let filteredUniversities = [...universities];

  // Search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredUniversities = filteredUniversities.filter(u => 
      u.name.toLowerCase().includes(searchLower) ||
      u.city.toLowerCase().includes(searchLower) ||
      u.country.toLowerCase().includes(searchLower) ||
      u.description.toLowerCase().includes(searchLower)
    );
  }

  // Country filter
  if (filters.countries && filters.countries.length > 0) {
    filteredUniversities = filteredUniversities.filter(u => 
      filters.countries.includes(u.country)
    );
  }

  // Tuition fee filter
  if (filters.minTuition !== undefined) {
    filteredUniversities = filteredUniversities.filter(u => 
      u.tuitionFee >= filters.minTuition
    );
  }
  if (filters.maxTuition !== undefined) {
    filteredUniversities = filteredUniversities.filter(u => 
      u.tuitionFee <= filters.maxTuition
    );
  }

  // Ranking filter
  if (filters.minRanking !== undefined) {
    filteredUniversities = filteredUniversities.filter(u => 
      u.ranking >= filters.minRanking
    );
  }
  if (filters.maxRanking !== undefined) {
    filteredUniversities = filteredUniversities.filter(u => 
      u.ranking <= filters.maxRanking
    );
  }

  // Year filter
  if (filters.minYear !== undefined) {
    filteredUniversities = filteredUniversities.filter(u => 
      u.establishedYear >= filters.minYear
    );
  }
  if (filters.maxYear !== undefined) {
    filteredUniversities = filteredUniversities.filter(u => 
      u.establishedYear <= filters.maxYear
    );
  }

  // Programs filter
  if (filters.programs && filters.programs.length > 0) {
    filteredUniversities = filteredUniversities.filter(u => 
      filters.programs.some(p => u.programs.includes(p))
    );
  }

  // Type filter
  if (filters.type && filters.type.length > 0) {
    filteredUniversities = filteredUniversities.filter(u => 
      filters.type.includes(u.type)
    );
  }

  // Research output filter
  if (filters.researchOutput && filters.researchOutput.length > 0) {
    filteredUniversities = filteredUniversities.filter(u => 
      filters.researchOutput.includes(u.researchOutput)
    );
  }

  // Acceptance rate filter
  if (filters.minAcceptanceRate !== undefined) {
    filteredUniversities = filteredUniversities.filter(u => 
      u.acceptanceRate >= filters.minAcceptanceRate
    );
  }
  if (filters.maxAcceptanceRate !== undefined) {
    filteredUniversities = filteredUniversities.filter(u => 
      u.acceptanceRate <= filters.maxAcceptanceRate
    );
  }

  // Scholarships filter
  if (filters.scholarships) {
    filteredUniversities = filteredUniversities.filter(u => u.scholarshipsAvailable);
  }

  // Accommodation filter
  if (filters.accommodation) {
    filteredUniversities = filteredUniversities.filter(u => u.accommodationAvailable);
  }

  // Sorting
  filteredUniversities.sort((a, b) => {
    const sortBy = filters.sortBy;
    const order = filters.sortOrder === 'desc' ? -1 : 1;
    
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    
    if (typeof aValue === 'string') {
      return order * aValue.localeCompare(bValue);
    }
    
    return order * (aValue - bValue);
  });

  return NextResponse.json({
    universities: filteredUniversities,
    total: filteredUniversities.length,
  });
}