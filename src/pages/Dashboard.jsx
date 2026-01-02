import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

export default function Dashboard() {
  const [members, setMembers] = useState(0);
  const [events, setEvents] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const { count: memberCount, error: memberError } = await supabase
        .from("members")
        .select("*", { count: "exact", head: true });

      const { count: eventCount, error: eventError } = await supabase
        .from("events")
        .select("*", { count: "exact", head: true });

      if (!memberError) setMembers(memberCount || 0);
      if (!eventError) setEvents(eventCount || 0);

      setLoading(false);
    };

    fetchStats();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <p>Total Members: {members}</p>
      <p>Total Events: {events}</p>
    </div>
  );
}
