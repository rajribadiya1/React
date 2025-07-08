import { useState, useEffect } from 'react';
import { ref, set, onValue } from 'firebase/database';
import { database } from './firebase';

export default function DatabaseExample() {
  const [message, setMessage] = useState('');
  const [dbMessage, setDbMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Write to database
  const writeToDatabase = () => {
    const reference = ref(database, 'messages/' + Date.now());
    set(reference, {
      text: message,
      timestamp: Date.now()
    });
    setMessage('');
  };

  // Read from database
  useEffect(() => {
    const messagesRef = ref(database, 'messages');
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setMessages(messageList);
      }
    });
  }, []);

  return (
    <div>
      <h2>Firebase Realtime Database Example</h2>
      
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter a message"
        />
        <button onClick={writeToDatabase}>Send</button>
      </div>

      <div>
        <h3>Messages:</h3>
        <ul>
          {messages.map(msg => (
            <li key={msg.id}>{msg.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}