import React, { useState, useEffect } from 'react';

const DataTable = () => {
  // Sample data generation - 100 entries
  const generateData = () => {
    const names = ['John', 'Jane', 'Bob', 'Alice', 'Charlie', 'Eve', 'David', 'Grace', 'Frank', 'Helen'];
    const departments = ['HR', 'Finance', 'IT', 'Marketing', 'Operations', 'Sales'];
    const statuses = ['Active', 'Inactive', 'Pending', 'Terminated'];
    
    return Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      name: names[Math.floor(Math.random() * names.length)],
      email: `user${i + 1}@example.com`,
      age: Math.floor(Math.random() * 30) + 20,
      department: departments[Math.floor(Math.random() * departments.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      salary: Math.floor(Math.random() * 90000) + 30000,
      joinDate: new Date(2020 + Math.floor(Math.random() * 4), 
      isActive: Math.random() > 0.3
    }));
  };

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    department: '',
    status: '',
    isActive: ''
  });

  useEffect(() => {
    const generatedData = generateData();
    setData(generatedData);
    setFilteredData(generatedData);
  }, []);

  useEffect(() => {
    let result = [...data];
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(term) || 
        item.email.toLowerCase().includes(term) ||
        item.department.toLowerCase().includes(term) ||
        item.status.toLowerCase().includes(term)
      );
    }
    
    // Apply filters
    if (filters.department) {
      result = result.filter(item => item.department === filters.department);
    }
    if (filters.status) {
      result = result.filter(item => item.status === filters.status);
    }
    if (filters.isActive !== '') {
      result = result.filter(item => item.isActive === (filters.isActive === 'true'));
    }
    
    setFilteredData(result);
  }, [searchTerm, filters, data]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setFilteredData(sortedData);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      department: '',
      status: '',
      isActive: ''
    });
    setFilteredData(data);
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="data-table-container">
      <h2>Employee Data Table (100 Entries)</h2>
      
      {/* Search and Filter Controls */}
      <div className="controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters">
          <select 
            name="department" 
            value={filters.department} 
            onChange={handleFilterChange}
          >
            <option value="">All Departments</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="Operations">Operations</option>
            <option value="Sales">Sales</option>
          </select>
          
          <select 
            name="status" 
            value={filters.status} 
            onChange={handleFilterChange}
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
            <option value="Terminated">Terminated</option>
          </select>
          
          <select 
            name="isActive" 
            value={filters.isActive} 
            onChange={handleFilterChange}
          >
            <option value="">Active Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
          
          <button onClick={resetFilters}>Reset Filters</button>
        </div>
      </div>
      
      {/* Data Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('id')}>ID {getSortIndicator('id')}</th>
              <th onClick={() => handleSort('name')}>Name {getSortIndicator('name')}</th>
              <th onClick={() => handleSort('email')}>Email {getSortIndicator('email')}</th>
              <th onClick={() => handleSort('age')}>Age {getSortIndicator('age')}</th>
              <th onClick={() => handleSort('department')}>Department {getSortIndicator('department')}</th>
              <th onClick={() => handleSort('status')}>Status {getSortIndicator('status')}</th>
              <th onClick={() => handleSort('salary')}>Salary {getSortIndicator('salary')}</th>
              <th onClick={() => handleSort('joinDate')}>Join Date {getSortIndicator('joinDate')}</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.age}</td>
                  <td>{item.department}</td>
                  <td>{item.status}</td>
                  <td>${item.salary.toLocaleString()}</td>
                  <td>{item.joinDate.toLocaleDateString()}</td>
                  <td>{item.isActive ? 'Yes' : 'No'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center' }}>No matching records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="summary">
        Showing {filteredData.length} of {data.length} records
      </div>
    </div>
  );
};

export default DataTable;