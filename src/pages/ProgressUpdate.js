import React, { useState } from "react";
import axios from "axios";

function ProgressUpdate() {
  const [caseId, setCaseId] = useState("");
  const [updateText, setUpdateText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = prompt("Enter your token:");
    try {
      const res = await axios.post(
        `https://police-case-backend.onrender.com/api/case/progress/${caseId}`,
        {
          updateText,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      alert("Progress updated successfully!");
      console.log(res.data);
    } catch (err) {
      alert("Error updating progress");
      console.error(err);
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>Update Case Progress</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Case ID"
          value={caseId}
          onChange={(e) => setCaseId(e.target.value)}
        /><br/><br/>
        <textarea
          placeholder="Progress details"
          value={updateText}
          onChange={(e) => setUpdateText(e.target.value)}
        /><br/><br/>
        <button type="submit">Update Progress</button>
      </form>
    </div>
  );
}

export default ProgressUpdate;
