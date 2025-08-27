import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_SERVER_URL;

function AllStartupsPage() {
  const [startups, setStartups] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const response = await axios.get(`${API}/startups?_expand=sector`);
      console.log(response.data);
      setStartups(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (startups === null) {
    return <h3>Loading...</h3>;
  }

  const filteredStartups = startups.filter((s) => {
    const q = searchTerm.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.sector?.name.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <div>
        <Link to="/startups/add">
          <button> Add a startup </button>
        </Link>

        <div style={{ margin: "12px 0" }}>
          <input
            type="text"
            placeholder="Search by name, sector or keyword"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "600px",
              padding: "8px 12px",
              fontSize: "16px",
            }}
          />
        </div>

        {filteredStartups.map((startup) => {
          return (
            <div key={startup.id}>
              <Link to={`/startups/${startup.id}`}>
                <div>
                  <img
                    src={startup.firstImage}
                    alt={"image of " + startup.name}
                  />
                  <h5>{startup.name}</h5>
                  <h6>
                    <em>{startup.sector?.name}</em>
                  </h6>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AllStartupsPage;
