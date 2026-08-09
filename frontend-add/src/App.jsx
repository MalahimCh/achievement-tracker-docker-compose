import { useState } from "react";
import axios from "axios";
import "./App.css";

const API = "/app1/api";

function App() {
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const saveAchievement = async () => {
    if (!title.trim()) return;

    setSaving(true);

    try {
      await axios.post(`${API}/achievements`, {
        title,
      });

      setTitle("");
      setMessage("✓ Achievement saved successfully");

      setTimeout(() => {
        setMessage("");
      }, 2500);
    } catch (err) {
      console.error(err);
      setMessage("Failed to save achievement");
    }

    setSaving(false);
  };

  return (
    <div className="page">
      <div className="container">

        <h1>Achievement Tracker</h1>

        <p className="subtitle">
          Track every milestone. One achievement at a time.
        </p>

        <div className="inputRow">

          <input
            type="text"
            placeholder="What did you achieve today?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            className="saveBtn"
            onClick={saveAchievement}
          >
            {saving ? "Saving..." : "Save"}
          </button>

        </div>

        {message && (
          <div className="success">
            {message}
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
