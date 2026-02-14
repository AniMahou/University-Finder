'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, DollarSign, Trophy, Calendar, GraduationCap, GitCompare } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Card, CardContent, CardFooter } from '../components/ui/Card';
import { formatCurrency, formatNumber } from '../lib/utils';

export default function Home() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [maxTuition, setMaxTuition] = useState(70000);
  const [maxRanking, setMaxRanking] = useState(100);
  const [selectedForCompare, setSelectedForCompare] = useState([]);
  
  const countries = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'China', 'Japan', 'Singapore', 'Switzerland'];

  useEffect(() => {
    fetchUniversities();
  }, [search, selectedCountries, maxTuition, maxRanking]);

  const fetchUniversities = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (selectedCountries.length > 0) params.set('countries', selectedCountries.join(','));
      if (maxTuition < 70000) params.set('maxTuition', maxTuition);
      if (maxRanking < 100) params.set('maxRanking', maxRanking);
      params.set('sortBy', 'ranking');
      params.set('sortOrder', 'asc');

      const response = await fetch(`/api/universities?${params.toString()}`);
      const data = await response.json();
      setUniversities(data.universities);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const toggleCountry = (country) => {
    setSelectedCountries(prev =>
      prev.includes(country)
        ? prev.filter(c => c !== country)
        : [...prev, country]
    );
  };

  const toggleCompare = (id) => {
    setSelectedForCompare(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      if (prev.length >= 2) {
        return [prev[1], id];
      }
      return [...prev, id];
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Find Your Dream University
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Explore top universities worldwide and find your perfect match
          </p>
          <div className="flex items-center gap-4 text-sm">
            <span>🎓 30+ Countries</span>
            <span>•</span>
            <span>📚 1000+ Programs</span>
            <span>•</span>
            <span>🏆 Top Rankings</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search universities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-14 text-lg shadow-lg"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <aside className="lg:w-80 shrink-0">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h3 className="text-lg font-bold mb-4">Filters</h3>
              
              {/* Countries */}
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Country</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {countries.map(country => (
                    <label key={country} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCountries.includes(country)}
                        onChange={() => toggleCountry(country)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{country}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tuition */}
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Max Tuition: {formatCurrency(maxTuition)}</h4>
                <input
                  type="range"
                  min="0"
                  max="70000"
                  step="5000"
                  value={maxTuition}
                  onChange={(e) => setMaxTuition(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setMaxTuition(10000)}
                    className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                  >
                    &lt;$10k
                  </button>
                  <button
                    onClick={() => setMaxTuition(30000)}
                    className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                  >
                    &lt;$30k
                  </button>
                  <button
                    onClick={() => setMaxTuition(50000)}
                    className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                  >
                    &lt;$50k
                  </button>
                </div>
              </div>

              {/* Ranking */}
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Max Ranking: Top {maxRanking}</h4>
                <input
                  type="range"
                  min="1"
                  max="100"
                  step="5"
                  value={maxRanking}
                  onChange={(e) => setMaxRanking(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setMaxRanking(10)}
                    className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                  >
                    Top 10
                  </button>
                  <button
                    onClick={() => setMaxRanking(25)}
                    className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                  >
                    Top 25
                  </button>
                  <button
                    onClick={() => setMaxRanking(50)}
                    className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                  >
                    Top 50
                  </button>
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedCountries.length > 0 || maxTuition < 70000 || maxRanking < 100 || search) && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedCountries([]);
                    setMaxTuition(70000);
                    setMaxRanking(100);
                    setSearch('');
                  }}
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          </aside>

          {/* Results */}
          <main className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">
                {loading ? 'Loading...' : `${universities.length} Universities Found`}
              </h2>
            </div>

            {/* Grid */}
            {loading ? (
              <div className="text-center py-20">
                <div className="text-gray-400">Loading universities...</div>
              </div>
            ) : universities.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🎓</div>
                <h3 className="text-2xl font-bold mb-2">No universities found</h3>
                <p className="text-gray-600">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {universities.map((university) => (
                  <Card key={university.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">{university.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <MapPin className="w-4 h-4" />
                            <span>{university.city}, {university.country}</span>
                          </div>
                        </div>
                        <Badge className="text-lg font-bold px-3 py-1">
                          #{university.ranking}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <DollarSign className="w-4 h-4 text-gray-600" />
                          <div>
                            <div className="text-xs text-gray-500">Tuition</div>
                            <div className="text-sm font-semibold">
                              {university.tuitionFee === 0 ? 'Free' : formatCurrency(university.tuitionFee)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <Calendar className="w-4 h-4 text-gray-600" />
                          <div>
                            <div className="text-xs text-gray-500">Est.</div>
                            <div className="text-sm font-semibold">{university.establishedYear}</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary">{university.type}</Badge>
                        <Badge variant="secondary">{university.researchOutput} Research</Badge>
                      </div>

                      <div>
                        <div className="flex items-center gap-1 mb-2">
                          <GraduationCap className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium">Programs:</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {university.programs.slice(0, 3).map(program => (
                            <Badge key={program} variant="outline" className="text-xs">
                              {program}
                            </Badge>
                          ))}
                          {university.programs.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{university.programs.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="p-6 pt-0">
                      <Button
                        variant={selectedForCompare.includes(university.id) ? "default" : "outline"}
                        className="w-full"
                        onClick={() => toggleCompare(university.id)}
                      >
                        {selectedForCompare.includes(university.id) ? 'Selected ✓' : 'Select to Compare'}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Compare Button */}
      {selectedForCompare.length > 0 && (
        <div className="fixed bottom-8 right-8 bg-white rounded-full shadow-2xl border-2 border-blue-500 p-4">
          <div className="flex items-center gap-3">
            <GitCompare className="w-6 h-6 text-blue-600" />
            <span className="font-semibold">Selected: {selectedForCompare.length}/2</span>
            {selectedForCompare.length === 2 && (
              <Button size="sm">Compare Now</Button>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20 py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2">University Finder</h3>
          <p className="text-gray-400">Find your perfect university</p>
        </div>
      </footer>
    </div>
  );
}