import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_SERVER_URL;

function StartupDetailsPage() {
  const [startup, setStartup] = useState(null);
  const navigate = useNavigate();
  const { startupId } = useParams();
  const [likes, setLikes] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${API}/startups/${startupId}?_expand=sector`
      );
      console.log(response.data);
      setStartup(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    const next = likes + 1;
    setLikes(next);
    setSaving(true);
    try {
      await axios.patch(`${API}/startups/${startupId}`, { likes: next });
    } catch (error) {
      console.error(error);

      setLikes((prev) => prev - 1);
      alert("Failed to save like");
    } finally {
      setSaving(false);
    }
  };

  if (startup === null) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <Link to={`/startups/edit/${startupId}`}>
        <button>Edit Project</button>
      </Link>

      {startup && (
        <>
          <h3>{startup.name}</h3>
          <p>{startup.description}</p>
          <p>{startup.amountRaised}</p>
          <p>{startup.sector.name}</p>
          <p>{startup.contact}</p>

          <div
            style={{
              marginTop: 12,
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            <button onClick={handleLike} disabled={saving}>
              {saving ? "Saving…" : "❤️ Support"}
            </button>
            <span>{likes} ❤️</span>
          </div>

          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </button>
        </>
      )}
    </div>
  );
}

export default StartupDetailsPage;
