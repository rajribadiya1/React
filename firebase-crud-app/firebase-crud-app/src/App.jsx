// src/App.jsx
import { useState, useEffect } from 'react';
import { createOrUpdate, readData, updateData, deleteData } from './crud';

function App() {
  const [items, setItems] = useState({});
  const [newItem, setNewItem] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // Path in your Firebase Realtime Database
  const dbPath = 'items';

  // Load data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const data = await readData(dbPath);
      if (data) {
        setItems(data);
      }
    };
    fetchData();
  }, []);

  // Add new item
  const handleAdd = async () => {
    if (!newItem.trim()) return;
    
    const id = Date.now().toString();
    await createOrUpdate(`${dbPath}/${id}`, {
      text: newItem.trim(),
      createdAt: new Date().toISOString()
    });
    
    setNewItem('');
    // Refresh the list
    const updatedData = await readData(dbPath);
    setItems(updatedData || {});
  };

  // Start editing an item
  const startEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  // Save edited item
  const handleEdit = async () => {
    if (!editText.trim()) return;
    
    await updateData(`${dbPath}/${editingId}`, {
      text: editText.trim(),
      updatedAt: new Date().toISOString()
    });
    
    setEditingId(null);
    // Refresh the list
    const updatedData = await readData(dbPath);
    setItems(updatedData || {});
  };

  // Delete item
  const handleDelete = async (id) => {
    await deleteData(`${dbPath}/${id}`);
    // Refresh the list
    const updatedData = await readData(dbPath);
    setItems(updatedData || {});
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Firebase CRUD with Vite</h1>
      
      {/* Add new item */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter new item"
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      
      {/* Items list */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {Object.keys(items).map((id) => (
          <li key={id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd' }}>
            {editingId === id ? (
              <div>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={handleEdit}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <span>{items[id].text}</span>
                <div style={{ marginTop: '5px' }}>
                  <button onClick={() => startEdit(id, items[id].text)}>Edit</button>
                  <button onClick={() => handleDelete(id)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;