import { useState } from "react";
import axios from "axios";
import "./App.css";

const API = "/api";
function App() {
  const [title, setTitle] = useState("");
  const [achievements, setAchievements] = useState([]);
  const [showList, setShowList] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const fetchAchievements = async () => {
    try {
      const response = await axios.get(`${API}/achievements`);
      setAchievements(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleAchievements = async () => {
    if (!showList) {
      await fetchAchievements();
    }
    setShowList(!showList);
  };

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

        <button
          className="toggleBtn"
          onClick={toggleAchievements}
        >
          {showList
            ? "Hide Achievements ▲"
            : "View Achievements ▼"}
        </button>

        {showList && (

          <div className="list">

            {achievements.length === 0 ? (

              <div className="empty">
                <h3>No achievements found</h3>
                <p>
                  Start by recording your first accomplishment.
                </p>
              </div>

            ) : (

              achievements.map((item) => (

                <div
                  className="card"
                  key={item.id}
                >

                  <div className="cardTitle">
                    {item.title}
                  </div>

                  <div className="cardDate">
                    {new Date(
                      item.created_at
                    ).toLocaleString()}
                  </div>

                </div>

              ))

            )}

          </div>

        )}

      </div>

    </div>
  );
}

export default App;
