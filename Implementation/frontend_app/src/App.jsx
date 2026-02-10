import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";


const avatarEmoji = {
  bear: "🐻",
  horse: "🐴",
  cat: "🐱",
  dog: "🐶",
  fox: "🦊",
  panda: "🐼",
  rabbit: "🐰",
  tiger: "🐯",
  lion: "🦁",
  monkey: "🐵",
  koala: "🐨",
  penguin: "🐧",
  frog: "🐸",
  owl: "🦉",
  unicorn: "🦄",
  dragon: "🐲",
};

export default function App() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const load = () => {
      const saved = localStorage.getItem("profile");
      setProfile(saved ? JSON.parse(saved) : null);
    };
    load();
    window.addEventListener("storage", load);
    const t = setInterval(load, 400); 
    return () => {
      window.removeEventListener("storage", load);
      clearInterval(t);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="page">
        <nav className="nav">
          <div className="navLeft">
            <NavLink to="/" className={({ isActive }) => (isActive ? "link active" : "link")}>
              Home
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "link active" : "link")}>
              About
            </NavLink>
          </div>

          <div className="navRight">
            {profile?.name ? (
              <div className="profileChip">
                <span className="chipEmoji">{avatarEmoji[profile.avatar] || "🙂"}</span>
                <span>Hi, {profile.name}</span>
              </div>
            ) : (
              <div className="profileChip muted">No profile yet</div>
            )}
          </div>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
