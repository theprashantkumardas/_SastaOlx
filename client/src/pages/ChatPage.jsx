import React, { useState, useEffect } from 'react';
import ChatList from '../components/Chat/ChatList';
import ChatWindow from '../components/Chat/ChatWindow';
import { useNavigate } from 'react-router-dom';



const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null); // Stores the currently selected chat
  const [userId, setUserId] = useState(null); // Logged-in user's ID
  const [loading, setLoading] = useState(true); // Loading state

  const navigate = useNavigate();
  
  // Assuming you have a way to retrieve the logged-in userId (JWT, localStorage, etc.)
  useEffect(() => {
    // Retrieve userId from authentication context or localStorage
    const user = JSON.parse(localStorage.getItem('user')); // Example: assuming user data is saved in localStorage
    if (user) {
      setUserId(user._id);
      
    } else {
      // Handle case when user is not logged in (redirect, show message, etc.)
      navigate('/login');
    }
  }, [navigate, userId]);

  useEffect(() => {
    // Simulate fetching logged-in user's ID from authentication
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      setUserId(user._id);
      
      setLoading(false);
    } else {
       console.log("user not found")
       setLoading(false);
    }
    console.log("user id ", userId)
  }, [userId]);

if(loading){
    return <p>Loading...</p>
}
  return (
    <div className="flex h-screen max-w-8xl mx-auto p-4  ">
      {/* Left-side Chat List */}
      <div className="w-1/3 border-r">
          <ChatList userId={userId} onSelectChat={setSelectedChat} />
      </div>

      {/* Right-side Chat Window */}
      <div className="w-2/3">
        {selectedChat ? (
          <ChatWindow chat={selectedChat} userId={userId} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select a chat to view messages
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
