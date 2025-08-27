import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function StartupDetailsPage() {
  const [startup, setStartup] = useState(null);
  const navigate = useNavigate();
  const { startupId } = useParams();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5005/startups/${startupId}?_expand=sector`
      );
      console.log(response.data);
      setStartup(response.data);
    } catch (error) {
      console.log(error);
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
