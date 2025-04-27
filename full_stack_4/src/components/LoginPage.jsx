//Component for the login and registration page
import { useState } from "react";


export default function LoginPage({ setCurrentUser,showMessage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = () => {
    const key = `user_${username}`;
    const savedUser = localStorage.getItem(key);

    if (isRegister) {
      if (savedUser) {
        showMessage("alert", "Username already exists",() => {});
      } else {
        const newUser = {
          username,
          password,
          files: [],
        };
        localStorage.setItem(key, JSON.stringify(newUser));
        setCurrentUser(newUser);
        showMessage("alert", "registered successfully",() => {});

      }
    } else {
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed.password === password) {
          setCurrentUser(parsed);
        } else {
          showMessage("alert","Incorrect password.",() => {});
        }
      } else {
        showMessage("alert", "User not found. Please register.",() => {});
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isRegister ? "Register" : "Login"}</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="confirm-btn" onClick={handleSubmit}>
          {isRegister ? "Register" : "Login"}
        </button>
        <p>
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button className="toggle-btn" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
}
