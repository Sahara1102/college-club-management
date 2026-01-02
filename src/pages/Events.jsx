import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

export default function Events() {
  const [events, setEvents] = useState([]);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");

  useEffect(() => {
    const loadEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (!error) {
        setEvents(data || []);
      }
    };

    loadEvents();
  }, []);

  const addEvent = async () => {
    if (!title || !date || !description || !venue) {
      alert("All fields are required");
      return;
    }

    const { error } = await supabase.from("events").insert([
      {
        title,
        date,
        description,
        venue,
        attended: false,
      },
    ]);

    if (error) {
      alert(error.message);
      console.log(error);
      return;
    }

    // Re-fetch after insert
    const { data } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true });

    setEvents(data || []);

    setTitle("");
    setDate("");
    setDescription("");
    setVenue("");
  };

  const toggleAttendance = async (id, current) => {
    const { error } = await supabase
      .from("events")
      .update({ attended: !current })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    setEvents((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, attended: !current } : e
      )
    );
  };

  return (
    <div className="container">
      <h2>Events</h2>

      {/* Create Event Form */}
      <div>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          placeholder="Venue"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
        />
        <button onClick={addEvent}>Create Event</button>
      </div>

      {/* Events Table */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Description</th>
            <th>Venue</th>
            <th>Attended</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e) => (
            <tr key={e.id}>
              <td>{e.title}</td>
              <td>{e.date}</td>
              <td>{e.description}</td>
              <td>{e.venue}</td>
              <td>
                <input
                  type="checkbox"
                  checked={e.attended}
                  onChange={() =>
                    toggleAttendance(e.id, e.attended)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
