import React, { useEffect, useState } from "react";
import axios from "axios";

export default function HqDashboard() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const token = prompt("Enter your token:");
    axios
      .get("http://localhost:5000/api/case/all", {
        headers: { Authorization: token },
      })
      .then((res) => {
        setCases(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div style={{ margin: "20px" }}>
      <h2>HQ Dashboard - All Cases</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Case Number</th>
            <th>Date</th>
            <th>Complainant</th>
            <th>Status</th>
            <th>Created By</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((c) => (
            <tr key={c._id}>
              <td>{c.caseNumber}</td>
              <td>{new Date(c.dateOfFiling).toLocaleDateString()}</td>
              <td>{c.complainantName}</td>
              <td>{c.status}</td>
              <td>{c.createdBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
