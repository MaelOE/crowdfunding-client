import { Link } from "react-router-dom";

export default function NavBar() {
  // Si tu as une image de logo, remplace null par son chemin:
  // import logo from "/venture-club-logo.svg";
  const logo = null;

  return (
    <nav className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b border-gray-200">
      <div className="mx-auto max-w-6xl h-14 px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          {logo ? (
            <img src={logo} alt="Venture Club" className="h-8 w-8 rounded-md" />
          ) : (
            <div className="h-8 w-8 grid place-items-center rounded-md bg-indigo-600 text-white font-bold">
              VC
            </div>
          )}
          <span className="text-lg font-semibold tracking-tight">
            Venture Club
          </span>
        </Link>
      </div>
    </nav>
  );
}
