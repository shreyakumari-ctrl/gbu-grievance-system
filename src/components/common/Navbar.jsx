import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { ROUTES } from "../../routes/routePaths";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", path: ROUTES.HOME },
    { label: "Submit Grievance", path: ROUTES.SUBMIT_GRIEVANCE },
    { label: "Track Grievance", path: ROUTES.TRACK_GRIEVANCE },
    { label: "Admin Login", path: ROUTES.ADMIN_LOGIN },
  ];

  return (
    <nav className="bg-white/70 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to={ROUTES.HOME} className="text-lg font-bold text-indigo-600">
            GBU Grievance Portal
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
             <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                   `font-medium transition-colors duration-200 ${
                    isActive ? "text-indigo-600" : "text-slate-600 hover:text-indigo-600"
                   }`
                }
                >                                                               
                {link.label}
             </NavLink>
            ))}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-slate-700 text-2xl"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden flex flex-col gap-3 pb-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={ ({ isActive }) =>
                    `font-medium ${
                     isActive ? "text-indigo-600" : "text-slate-600 hover:text-indigo-600"
                 }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;