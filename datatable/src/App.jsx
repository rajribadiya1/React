import React, { useState, useEffect, useMemo } from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

// Main App component for the data table
const App = () => {
  // State to hold the original data
  const [data, setData] = useState([]);
  // State for the search query
  const [searchQuery, setSearchQuery] = useState('');
  // State for filter criteria (e.g., city, age range)
  const [filters, setFilters] = useState({
    city: '',
    minAge: '',
    maxAge: '',
  });
  // State for sorting: { column: 'name', direction: 'asc' | 'desc' }
  const [sortConfig, setSortConfig] = useState({ column: null, direction: 'asc' });
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items to display per page

  // Effect to generate dummy data on component mount
  useEffect(() => {
    const generateDummyData = (count) => {
      const dummyCities = ['New York', 'London', 'Paris', 'Tokyo', 'Sydney', 'Mumbai', 'Berlin', 'Rome', 'Dubai', 'Rio'];
      const dummyNames = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Heidi', 'Ivan', 'Judy'];
      const generatedData = Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: `${dummyNames[Math.floor(Math.random() * dummyNames.length)]} ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
        email: `user${i + 1}@example.com`,
        city: dummyCities[Math.floor(Math.random() * dummyCities.length)],
        age: Math.floor(Math.random() * 50) + 20, // Age between 20 and 69
        occupation: ['Engineer', 'Designer', 'Doctor', 'Artist', 'Teacher', 'Developer'][Math.floor(Math.random() * 6)],
      }));
      setData(generatedData);
    };

    generateDummyData(100); // Generate 100 entries
  }, []);

  // Memoized filtered and sorted data to avoid re-calculating on every render
  const processedData = useMemo(() => {
    let currentData = [...data];

    // 1. Apply Search
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      currentData = currentData.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(lowerCaseQuery)
        )
      );
    }

    // 2. Apply Filters
    if (filters.city) {
      currentData = currentData.filter(item => item.city === filters.city);
    }
    if (filters.minAge) {
      currentData = currentData.filter(item => item.age >= parseInt(filters.minAge));
    }
    if (filters.maxAge) {
      currentData = currentData.filter(item => item.age <= parseInt(filters.maxAge));
    }

    // 3. Apply Sorting
    if (sortConfig.column) {
      currentData.sort((a, b) => {
        const aValue = a[sortConfig.column];
        const bValue = b[sortConfig.column];

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return currentData;
  }, [data, searchQuery, filters, sortConfig]);

  // Calculate total pages for pagination
  const totalPages = Math.ceil(processedData.length / itemsPerPage);

  // Get current page's data for display
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return processedData.slice(startIndex, endIndex);
  }, [processedData, currentPage, itemsPerPage]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Handle filter input change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
    setCurrentPage(1); // Reset to first page on new filter
  };

  // Handle sorting request
  const requestSort = (columnName) => {
    let direction = 'asc';
    if (sortConfig.column === columnName && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ column: columnName, direction: direction });
  };

  // Render sorting indicator
  const getSortIndicator = (columnName) => {
    if (sortConfig.column === columnName) {
      return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
    }
    return '';
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Get unique cities for the filter dropdown
  const uniqueCities = useMemo(() => {
    const cities = new Set(data.map(item => item.city));
    return ['', ...Array.from(cities).sort()]; // Add empty option and sort
  }, [data]);


  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans antialiased flex flex-col items-center">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Data Table</h1>

        {/* Search and Filter Section */}
        <div className="mb-6 flex flex-wrap gap-4 items-center justify-center md:justify-between">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto flex-grow"
          />

          {/* City Filter */}
          <select
            name="city"
            value={filters.city}
            onChange={handleFilterChange}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
          >
            {uniqueCities.map(city => (
              <option key={city} value={city}>
                {city === '' ? 'Filter by City' : city}
              </option>
            ))}
          </select>

          {/* Age Filter */}
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="number"
              name="minAge"
              placeholder="Min Age"
              value={filters.minAge}
              onChange={handleFilterChange}
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2"
            />
            <input
              type="number"
              name="maxAge"
              placeholder="Max Age"
              value={filters.maxAge}
              onChange={handleFilterChange}
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {/* Table Headers with Sorting */}
                {['ID', 'Name', 'Email', 'City', 'Age', 'Occupation'].map(header => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
                    onClick={() => requestSort(header.toLowerCase().replace(' ', ''))} // Convert header to match data key (e.g., 'ID' -> 'id')
                  >
                    {header}
                    {getSortIndicator(header.toLowerCase().replace(' ', ''))}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.length > 0 ? (
                paginatedData.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.city}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.age}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.occupation}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No data found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {processedData.length > 0 && (
          <div className="flex justify-between items-center mt-6 flex-wrap gap-3">
            <div className="text-sm text-gray-700">
              Showing {Math.min((currentPage - 1) * itemsPerPage + 1, processedData.length)} to {Math.min(currentPage * itemsPerPage, processedData.length)} of {processedData.length} entries
            </div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {/* Page numbers (simplified for brevity, can be expanded for more complex pagination) */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${currentPage === page ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;