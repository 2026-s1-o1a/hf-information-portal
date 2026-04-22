
// import { useState } from 'react';
// import ChatInput from './components/ChatInput'
// import ChatMessages from './components/ChatMessages'


// interface ChatMessage {
//   message: string;
//   sender: string;
//   id: string;
// }

// const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

// const [chatMessages, setChatMessages] = useState([
//   {
//     message: 'Hello Chatbot!',
//     sender: 'user',
//     id: 'id1'
//   }, {
//     message: 'Hello! How can I help you?',
//     sender: 'chatbot',
//     id: 'id2'
//   }, {
//     message: "What is today's date?",
//     sender: 'user',
//     id: 'id3'
//   }, {
//     message: 'Today is April 11',
//     sender: 'chatbot',
//     id: 'id4'
//   }]);

import { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const [profile, setProfile] = useState(null);

  const fetchUserProfile = async () => {
  try {
    const response = await axios.get('http://localhost:3000/users', {
      withCredentials: true, // Ensure cookies are sent along with the request
    });

    setProfile(response.data);
    
  } catch (error) {
    console.error('Error fetching user profile', error);
  }
};

  useEffect(() => {
    fetchUserProfile();
}, []);



  return (
    <>
      {profile ? <h1>PROFILE IS: {profile.name}</h1> : <div>No profile available</div>}

      <div className="app-container">

        {/* <ChatMessages chatMessages={chatMessages} />
        <ChatInput chatMessages={chatMessages} setChatMessages={setChatMessages} /> */}
        <h1>POST SIGN UP</h1>
        <form action="http://localhost:3000/auth/signup" method="POST">
          <input type="text" name="firstname"  />
          <input type="text" name="lastname"  />
          <input type="text" name="email"  />
          <input type="text" name="password" />
          <input type="submit" value="Send POST" />
        </form>
        <h1>POST LOG IN</h1>
        <form action="http://localhost:3000/auth/signin" method="POST">
          <input type="text" name="email" />
          <input type="text" name="password" />
          <input type="submit" value="Send POST" />
        </form>
        <h1>POST LOG IN</h1>
        <form action="http://localhost:3000/auth/signout" method="POST">
          <input type="submit" value="Send POST" />
        </form>


      </div>



    </>


  )
}

export default App;