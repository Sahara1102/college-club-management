import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [joiningDate, setJoiningDate] = useState("");

  useEffect(() => {
    const loadMembers = async () => {
      const { data } = await supabase.from("members").select("*");
      setMembers(data || []);
    };
    loadMembers();
  }, []);

  const addMember = async () => {
    if (!name || !email || !department || !joiningDate) {
      alert("All fields are required");
      return;
    }

    await supabase.from("members").insert([
      {
        name,
        email,
        department,
        joining_date: joiningDate,
      },
    ]);

    const { data } = await supabase.from("members").select("*");
    setMembers(data || []);

    // clear form
    setName("");
    setEmail("");
    setDepartment("");
    setJoiningDate("");
  };

  const deleteMember = async (id) => {
    await supabase.from("members").delete().eq("id", id);
    setMembers(members.filter((m) => m.id !== id));
  };

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Club Members</h2>

      {/* Add Member Form */}
      <div>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <input
          type="date"
          value={joiningDate}
          onChange={(e) => setJoiningDate(e.target.value)}
        />
        <button onClick={addMember}>Add Member</button>
      </div>

      {/* Search */}
      <input
        placeholder="Search by name or department"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Members Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Joining Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((m) => (
            <tr key={m.id}>
              <td>{m.name}</td>
              <td>{m.email}</td>
              <td>{m.department}</td>
              <td>{m.joining_date}</td>
              <td>
                <button onClick={() => deleteMember(m.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
