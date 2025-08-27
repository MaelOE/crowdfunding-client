import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const API = import.meta.env.VITE_SERVER_URL;

function AddStartupPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amountRaised, setAmountRaised] = useState(0);
  const [sectors, setSectors] = useState([]);
  const [sectorId, setSectorId] = useState("");
  const [contact, setContact] = useState("");
  const [firstImageUrl, setFirstImageUrl] = useState("");
  const [secondImageUrl, setSecondImageUrl] = useState("");
  const [thirdImageUrl, setThirdImageUrl] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/sectors`)
      .then((res) => setSectors(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProject = {
      name,
      description,
      amountRaised,
      sectorId,
      contact,
      firstImageUrl,
      secondImageUrl,
      thirdImageUrl,
    };

    axios
      .post(`${API}/startups`, newProject)
      .then(() => {
        console.log("all good, the startup was added");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label> Name </label>
          <input
            type="text"
            name="name"
            placeholder="Startup Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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

          <label> First Image </label>
          <input
            type="text"
            name="firstImageUrl"
            placeholder="First Image URL"
            value={firstImageUrl}
            onChange={(e) => setFirstImageUrl(e.target.value)}
          />

          <label> Second Image </label>
          <input
            type="text"
            name="secondImageUrl"
            placeholder="Second Image URL"
            value={secondImageUrl}
            onChange={(e) => setSecondImageUrl(e.target.value)}
          />

          <label> Third Image </label>
          <input
            type="text"
            name="thirdImageUrl"
            placeholder="Third Image URL"
            value={thirdImageUrl}
            onChange={(e) => setThirdImageUrl(e.target.value)}
          />

          <label> Contact Information</label>
          <input
            type="text"
            name="contact"
            placeholder="Contact Information"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />

          <button type="submit"> Submit </button>
        </form>
      </div>
    </>
  );
}
export default AddStartupPage;
