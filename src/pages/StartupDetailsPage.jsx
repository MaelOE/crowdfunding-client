import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import CarouselLite from "../components/CarouselLite";

const API = import.meta.env.VITE_SERVER_URL;

export default function StartupDetailsPage() {
  const [startup, setStartup] = useState(null);
  const [likes, setLikes] = useState(0);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const navigate = useNavigate();
  const { startupId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${API}/startups/${startupId}?_expand=sector`
        );
        setStartup(data);
        if (typeof data.likes === "number") setLikes(data.likes);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [startupId]);

  const handleLike = async () => {
    const next = likes + 1;
    setLikes(next);
    setSaving(true);
    try {
      await axios.patch(`${API}/startups/${startupId}`, { likes: next });
    } catch (e) {
      console.error(e);
      setLikes((p) => p - 1);
      alert("Failed to save like");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Supprimer définitivement cette startup ?")) return;
    setDeleting(true);
    try {
      await axios.delete(`${API}/startups/${startupId}`);
      navigate(-1);
    } catch (e) {
      console.error(e);
      alert("Échec de la suppression");
      setDeleting(false);
    }
  };

  if (!startup) return <h3 className="p-6">Loading...</h3>;

  const images = [
    startup.firstImage,
    startup.secondImage,
    startup.thirdImage,
  ].filter(Boolean);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <header className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">{startup.name}</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <CarouselLite
            images={images}
            heightClass="h-56 sm:h-64 xl:h-80 2xl:h-96"
            autoPlay={true}
            interval={4000}
          />

          <section className="rounded-2xl border border-gray-200 bg-white p-4">
            <h2 className="text-lg font-semibold"> About </h2>
            <p className="mt-2 leading-7 text-gray-700">
              {startup.description}
            </p>
          </section>
        </div>

        <aside className="space-y-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <div className="text-xs uppercase tracking-wide text-gray-500">
              NOW RAISING :
            </div>
            <div className="mt-1 font-bold text-2xl md:text-3xl lg:text-4xl break-words">
              {Intl.NumberFormat(undefined, {
                style: "currency",
                currency: "USD",
              }).format(Number(startup.amountRaised || 0))}
            </div>

            {startup.sector?.name && (
              <div className="mt-3 text-sm text-gray-700">
                <span className="font-medium">Sector:</span>{" "}
                {startup.sector.name}
              </div>
            )}
            {startup.contact && (
              <div className="mt-1 text-sm text-gray-700">
                <span className="font-medium">Contact:</span> {startup.contact}
              </div>
            )}

            <button
              onClick={handleLike}
              disabled={saving}
              className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-xl bg-red-500 font-semibold text-black hover:bg-red-600 disabled:opacity-60"
            >
              {saving ? "Saving…" : "❤️ Support"}
            </button>
            <div className="mt-2 text-center text-sm text-gray-600">
              {likes} supporter{likes > 1 ? "s" : ""}
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              to={`/startups/edit/${startupId}`}
              className="inline-flex flex-1 items-center justify-center rounded-xl border border-gray-200 bg-white px-3 py-2 font-medium hover:bg-gray-50"
            >
              Update
            </Link>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="inline-flex flex-1 items-center justify-center rounded-xl border border-red-300 bg-rose-50 px-3 py-2 font-medium text-red-700 hover:bg-rose-100 disabled:opacity-60"
            >
              {deleting ? "Deleting…" : "Delete"}
            </button>
          </div>
        </aside>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium hover:bg-gray-50"
      >
        ← Back
      </button>
    </div>
  );
}
