import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ref, push, onValue, getDatabase } from 'firebase/database';
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from '@firebase/storage';

// Assuming Firebase is correctly configured and imported
import { app } from '../firebase';

const ChatFile = () => {
  const { chatUsername, roomId } = useParams();
  const database = getDatabase(app);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState('Guest');

  const messagesRef = ref(database, `chats/${roomId}`);
  const storagePath = `images`;

  useEffect(() => {
    setUsername(chatUsername);

    onValue(messagesRef, (snapshot) => {
      const messagesData = snapshot.val();
      setMessages(Object.values(messagesData) || []);
    });
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (file) {
      try {
        const storage = getStorage();
        const imageRef = ref(storage, storagePath);
        const uploadTask = uploadBytes(imageRef, file);

        const snapshot = await uploadTask;
        const fileURL = await getDownloadURL(snapshot.ref);

        const imageMessage = { username, image: fileURL };
        push(messagesRef, imageMessage);
        setFile(null);
      } catch (error) {
        console.error('Error uploading image:', error);
        // Handle error gracefully, e.g., display an error message to the user
      }
    } else if (newMessage.trim()) {
      const textMessage = { username, text: newMessage.trim() };
      push(messagesRef, textMessage);
    }

    setNewMessage('');
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <div>
      <h2>Chat with {username}</h2>
      <div style={{ height: '300px', border: '1px solid #ccc', overflowY: 'scroll' }}>
        {messages.map((message, index) => (
          <div key={index}>
            {message.text && (
              <div>
                <strong>{message.username}:</strong> {message.text}
              </div>
            )}
            {message.image && (
              <div>
                <strong>{message.username}:</strong>
                <img src={message.image} alt={`${message.username}'s image`} style={{ maxWidth: '100%' }} />
              </div>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatFile;
