import React, { useState } from "react";
import axios from "axios";

function CaseEntry() {
  const [caseNumber, setCaseNumber] = useState("");
  const [dateOfFiling, setDateOfFiling] = useState("");
  const [complainantName, setComplainantName] = useState("");
  const [complaintDetails, setComplaintDetails] = useState("");
  const [status, setStatus] = useState("open");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = prompt("Enter your token:");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/case/add",
        {
          caseNumber,
          dateOfFiling,
          complainantName,
          complaintDetails,
          status,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      alert("Case added successfully!");
      console.log(res.data);
    } catch (err) {
      alert("Error adding case");
      console.error(err);
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>Case Entry</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Case Number"
          value={caseNumber}
          onChange={(e) => setCaseNumber(e.target.value)}
        /><br/><br/>
        <input
          type="date"
          value={dateOfFiling}
          onChange={(e) => setDateOfFiling(e.target.value)}
        /><br/><br/>
        <input
          type="text"
          placeholder="Complainant Name"
          value={complainantName}
          onChange={(e) => setComplainantName(e.target.value)}
        /><br/><br/>
        <textarea
          placeholder="Complaint Details"
          value={complaintDetails}
          onChange={(e) => setComplaintDetails(e.target.value)}
        /><br/><br/>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="open">Open</option>
          <option value="investigating">Investigating</option>
          <option value="chargeSheeted">Charge Sheeted</option>
          <option value="closed">Closed</option>
        </select><br/><br/>
        <button type="submit">Add Case</button>
      </form>
    </div>
  );
}

export default CaseEntry;
