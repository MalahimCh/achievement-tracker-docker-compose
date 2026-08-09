import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "/app2/api";

function App() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAchievements = async () => {
    try {
      const response = await axios.get(`${API}/achievements`);
      setAchievements(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchAchievements();
  }, []);

  // Automatically refresh every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchAchievements();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchAchievements();
  };

  return (
    <div className="page">
      <div className="container">

        <div className="header">
          <div>
            <h1>Achievement Tracker</h1>

            <p className="subtitle">
              Track every milestone. One achievement at a time.
            </p>
          </div>

          <button
            className="refreshButton"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            {refreshing ? "Refreshing..." : "↻ Refresh"}
          </button>
        </div>

        <div className="list">

          {loading ? (

            <div className="empty">
              <h3>Loading achievements...</h3>
            </div>

          ) : achievements.length === 0 ? (

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

      </div>
    </div>
  );
}

export default App;
