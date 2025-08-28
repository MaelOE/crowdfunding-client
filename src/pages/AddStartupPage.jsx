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
      <div className="mx-auto max-w-5xl px-4 md:px-6 py-8 space-y-6">
        <h3 className="text-3xl font-bold tracking-tight">Add a startup</h3>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 md:p-8 space-y-5"
        >
          <label className="block text-sm font-medium text-gray-700">
            {" "}
            Name{" "}
          </label>
          <input
            type="text"
            name="name"
            placeholder="Startup Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
          />

          <label className="block text-sm font-medium text-gray-700">
            {" "}
            Description
          </label>
          <input
            type="text"
            name="description"
            placeholder="Startup Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
          />

          <label className="block text-sm font-medium text-gray-700">
            {" "}
            Amount Raised
          </label>
          <input
            type="text"
            name="amountRaised"
            placeholder=" Amount Raised"
            value={amountRaised}
            onChange={(e) => setAmountRaised(e.target.value)}
            className="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
          />

          <label className="block text-sm font-medium text-gray-700">
            Sector
          </label>
          <select
            value={sectorId}
            onChange={(e) => setSectorId(e.target.value)}
            required
            className="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
          >
            <option value="">-- choose a sector --</option>
            {sectors.map((s) => (
              <option key={s.id} value={s.id}>
                {s.id} — {s.name}
              </option>
            ))}
          </select>

          <label className="block text-sm font-medium text-gray-700">
            {" "}
            First Image{" "}
          </label>
          <input
            type="text"
            name="firstImageUrl"
            placeholder="First Image URL"
            value={firstImageUrl}
            onChange={(e) => setFirstImageUrl(e.target.value)}
            className="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
          />

          <label className="block text-sm font-medium text-gray-700">
            {" "}
            Second Image{" "}
          </label>
          <input
            type="text"
            name="secondImageUrl"
            placeholder="Second Image URL"
            value={secondImageUrl}
            onChange={(e) => setSecondImageUrl(e.target.value)}
            className="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
          />

          <label className="block text-sm font-medium text-gray-700">
            {" "}
            Third Image{" "}
          </label>
          <input
            type="text"
            name="thirdImageUrl"
            placeholder="Third Image URL"
            value={thirdImageUrl}
            onChange={(e) => setThirdImageUrl(e.target.value)}
            className="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
          />

          <label className="block text-sm font-medium text-gray-700">
            {" "}
            Contact Information
          </label>
          <input
            type="text"
            name="contact"
            placeholder="Contact Information"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
          />

          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-black hover:bg-indigo-700"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
export default AddStartupPage;
