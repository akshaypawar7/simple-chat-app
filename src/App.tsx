import { useState, useEffect } from "react";
import "./App.css";

import SignIn, { auth } from "./SignUp";
import ChatRoom from "./ChatRoom";

import { onAuthStateChanged, User, signOut } from "firebase/auth";

function App() {
  const [isDarkmode, setDarkMode] = useState(false);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => onAuthStateChanged(auth, (user) => setUser(user)), []);

  if (user === null) 
    return <SignIn />;
  

  return (
    <div className={`App ${isDarkmode ? "darkMode" : ""}`}>
      <h1>hi... Akshay</h1>
      <button onClick={() => setDarkMode(!isDarkmode)}>Theme</button>
      <button
        style={{ backgroundColor: "red", color: "white" }}
        onClick={() => signOut(auth)}
      >
        SignOut
      </button>
      <ChatRoom />
    </div>
  );
}

export default App;
