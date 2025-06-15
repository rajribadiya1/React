import { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('crudItems')) || [];
    setItems(storedItems);
  }, []);

  // Save data to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('crudItems', JSON.stringify(items));
  }, [items]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name || !email) return;

    if (editingId) {
      // Update existing item
      setItems(items.map(item => 
        item.id === editingId ? { ...item, name, email } : item
      ));
      setEditingId(null);
    } else {
      // Add new item
      const newItem = {
        id: Date.now(),
        name,
        email
      };
      setItems([...items, newItem]);
    }

    // Clear form
    setName('');
    setEmail('');
  };

  const handleEdit = (item) => {
    setName(item.name);
    setEmail(item.email);
    setEditingId(item.id);
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
    if (editingId === id) {
      // If deleting the item being edited, clear the form
      setName('');
      setEmail('');
      setEditingId(null);
    }
  };

  return (
    <div className="App" style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>CRUD with LocalStorage</h1>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: '8px', width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '8px', width: '100%' }}
          />
        </div>
        <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>
          {editingId ? 'Update' : 'Add'}
        </button>
        {editingId && (
          <button 
            type="button" 
            onClick={() => {
              setName('');
              setEmail('');
              setEditingId(null);
            }}
            style={{ marginLeft: '10px', padding: '8px 16px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Cancel
          </button>
        )}
      </form>

      <h2>Items</h2>
      {items.length === 0 ? (
        <p>No items found. Add some items to get started.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {items.map(item => (
            <li key={item.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <strong>{item.name}</strong> - {item.email}
              </div>
              <div>
                <button 
                  onClick={() => handleEdit(item)}
                  style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '4px' }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(item.id)}
                  style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;