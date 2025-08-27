import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API = import.meta.env.VITE_SERVER_URL;

function EditProjectPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amountRaised, setAmountRaised] = useState(0);
  const [sectorId, setSectorId] = useState("");
  const [contact, setContact] = useState("");

  const [sectors, setSectors] = useState([]);

  const [isFetching, setIsFetching] = useState(true);

  const { startupId } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${API}/sectors`)
      .then((res) => setSectors(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${API}/startups/${startupId}?_expand=sector`)
      .then((response) => {
        console.log(response);
        setName(response.data.name);
        setDescription(response.data.description);
        setAmountRaised(response.data.amountRaised);
        setSectorId(response.data.sectorId);
        setContact(response.data.contact);

        setIsFetching(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const updatedProject = {
      name,
      description,
      amountRaised,
      sectorId,
      contact,
    };

    try {
      const response = await axios.put(
        `${API}/startups/${startupId}`,
        updatedProject
      );
      navigate(`/startups/${startupId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProject = () => {
    axios
      .delete(`${API}/startups/${startupId}`)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="EditProjectPage">
      <h3>Edit the Project</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={isFetching ? "Loading..." : ""}
        />

        <label> Description</label>
        <input
          type="text"
          name="description"
          placeholder="Startup Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label> Amount Raised</label>
        <input
          type="text"
          name="amountRaised"
          placeholder=" Amount Raised"
          value={amountRaised}
          onChange={(e) => setAmountRaised(e.target.value)}
        />

        <label>Sector</label>
        <select
          value={sectorId}
          onChange={(e) => setSectorId(e.target.value)}
          required
        >
          <option value="">-- choose a sector --</option>
          {sectors.map((s) => (
            <option key={s.id} value={s.id}>
              {s.id} — {s.name}
            </option>
          ))}
        </select>

        <label> Contact Information</label>
        <input
          type="text"
          name="contact"
          placeholder="Contact Information"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />

        <button type="submit" disabled={isFetching}>
          Update Project
        </button>
      </form>

      <button onClick={deleteProject}>Delete Project</button>
    </div>
  );
}

export default EditProjectPage;
