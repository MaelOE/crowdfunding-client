import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_SERVER_URL;

function AllStartupsPage() {
  const [startups, setStartups] = useState(null);

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

  return (
    <>
      <div>
        <Link to="/startups/add">
          <button> Add a startup </button>
        </Link>

        {startups &&
          startups.map((startup, i) => {
            return (
              <div key={startup.id}>
                <Link to={`/startups/${startup.id}`}>
                  <div>
                    <div>
                      <img
                        src={startup.image_url}
                        alt={"image of " + startup.name}
                      />
                      <h5>{startup.name}</h5>
                      <h6>
                        <em>{startup.sector?.name}</em>
                      </h6>
                    </div>
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
