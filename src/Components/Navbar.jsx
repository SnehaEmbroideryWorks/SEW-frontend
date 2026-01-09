import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

        <Link to="/" className="text-xl font-semibold text-blue-900 text-center sm:text-left">
          Sneha Embroidery Works
        </Link>

        <div className="flex flex-wrap justify-center sm:justify-end items-center gap-4 sm:gap-6">

          <Link to="/cart">Cart</Link>

          {!user && (
            <div className="flex gap-4">
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}

          {user && (
            <>
              <span className="text-sm">
                Hello, {user.name}
              </span>

              <Link to="/orders">My Orders</Link>

              {user.role === "admin" && (
                <Link to="/admin" className="font-medium">
                  Admin
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="text-red-600 underline text-sm"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

