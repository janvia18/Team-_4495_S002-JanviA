import { useEffect, useState } from "react";
import AvatarPicker from "../components/AvatarPicker";

export default function Home() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("bear");
  const [savedMsg, setSavedMsg] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("profile");
    if (saved) {
      const p = JSON.parse(saved);
      setName(p.name || "");
      setAvatar(p.avatar || "bear");
    }
  }, []);

  function saveProfile() {
    if (!name.trim()) {
      setSavedMsg("Please enter your name");
      return;
    }
    localStorage.setItem("profile", JSON.stringify({ name: name.trim(), avatar }));
    setSavedMsg("Saved ✅");
    setTimeout(() => setSavedMsg(""), 1500);
  }

  function resetProfile() {
    localStorage.removeItem("profile");
    setName("");
    setAvatar("bear");
    setSavedMsg("Reset ✅");
    setTimeout(() => setSavedMsg(""), 1500);
  }

  return (
    <div>
      <h2>Create your profile</h2>

      <label className="label">Your name</label>
      <input
        className="input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g., Janvi"
      />

      <label className="label">Pick a character</label>
      <AvatarPicker value={avatar} onChange={setAvatar} />

      <div className="row">
        <button className="primary" onClick={saveProfile}>Save</button>
        <button className="secondary" onClick={resetProfile}>Reset</button>
        <span className="msg">{savedMsg}</span>
      </div>
    </div>
  );
}
