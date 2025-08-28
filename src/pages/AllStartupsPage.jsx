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
        <header className="flex flex-col sm:flex-row items-center gap-4 my-4">
          {/* Bouton rond “+” */}
          <Link
            to="/startups/add"
            className="shrink-0"
            aria-label="Add a startup"
            title="Add a startup"
          >
            <span className="inline-grid size-12 place-items-center rounded-full border border-gray-200 bg-white text-indigo-600 text-2xl font-bold shadow-sm hover:shadow transition">
              +
            </span>
          </Link>

          {/* Barre de recherche */}
          <input
            type="text"
            placeholder="Search by name, sector or keyword"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:flex-1 h-12 rounded-xl border border-gray-200 bg-white px-4 text-gray-700 placeholder-gray-400
               focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </header>

        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStartups.map((startup) => {
              return (
                <div key={startup.id}>
                  <Link
                    to={`/startups/${startup.id}`}
                    className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 block"
                  >
                    <div>
                      <img
                        src={startup.firstImage}
                        alt={"image of " + startup.name}
                        className="w-full h-48 object-cover rounded-t-xl"
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
        </div>
      </div>
    </>
  );
}

export default AllStartupsPage;
