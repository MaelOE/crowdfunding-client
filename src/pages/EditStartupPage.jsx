import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API = import.meta.env.VITE_SERVER_URL;

function EditStartupPage() {
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

    const updatedStartup = {
      name,
      description,
      amountRaised,
      sectorId,
      contact,
    };

    try {
      const response = await axios.patch(
        `${API}/startups/${startupId}`,
        updatedStartup
      );
      navigate(`/startups/${startupId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStartup = () => {
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
    <div className="EditStartupPage mx-auto max-w-5xl px-4 md:px-6 py-8 space-y-6">
      <h3 className="text-3xl font-bold tracking-tight">Edit the Startup</h3>

      <form
        onSubmit={handleFormSubmit}
        className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 md:p-8 space-y-5"
      >
        <label className="block text-sm font-medium text-gray-700">
          Title:
        </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={isFetching ? "Loading..." : ""}
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
          disabled={isFetching}
          className="mt-2 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-black hover:bg-indigo-700 disabled:opacity-60"
        >
          Update Startup
        </button>
      </form>

      <button
        type="button"
        onClick={deleteStartup}
        className="inline-flex items-center justify-center rounded-xl border border-rose-300 bg-rose-50 px-4 py-2 font-medium text-rose-700 hover:bg-rose-100"
      >
        Delete Startup
      </button>
    </div>
  );
}

export default EditStartupPage;
