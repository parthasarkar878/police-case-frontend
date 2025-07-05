import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ThanaDashboard() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const token = prompt("Enter your token:");
    axios
      .get("https://police-case-backend.onrender.com/api/case/all", {
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
      <h2>Thana Dashboard - My Cases</h2>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Case Number</th>
            <th>Date of Complaint</th>
            <th>Complainant Name</th>
            <th>Case Details</th>
            <th>Type of Case</th>
            <th>IO Name & Contact</th>
            <th>Accused Details</th>
            <th>Charge Sheet Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((c) => (
            <tr key={c._id}>
              <td>{c.caseNumber}</td>
              <td>{new Date(c.dateOfFiling).toLocaleDateString()}</td>
              <td>{c.complainantName}</td>
              <td>{c.complaintDetails}</td>
              <td>{c.typeOfCase}</td>
              <td>{c.ioName} / {c.ioContact}</td>
              <td>{c.accusedDetails}</td>
              <td>{c.chargeSheetDate ? new Date(c.chargeSheetDate).toLocaleDateString() : ""}</td>
              <td>{c.status}</td>
              <td>
                <button
                  onClick={() => window.location.href = `/edit/${c._id}`}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
