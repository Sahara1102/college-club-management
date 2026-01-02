import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/members">Members</Link>
      <Link to="/events">Events</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}
