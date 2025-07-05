import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditCase() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState(null);
  const [status, setStatus] = useState("");
  const [updateText, setUpdateText] = useState("");
  const [complaintDetails, setComplaintDetails] = useState("");
  const [typeOfCase, setTypeOfCase] = useState("");
  const [ioName, setIoName] = useState("");
  const [ioContact, setIoContact] = useState("");
  const [accusedDetails, setAccusedDetails] = useState("");

  useEffect(() => {
    const token = prompt("Enter your token:");
    axios
      .get(`https://police-case-backend.onrender.com/api/case/all`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        const single = res.data.find((c) => c._id === id);
        setCaseData(single);
        setStatus(single.status);
        setComplaintDetails(single.complaintDetails || "");
        setTypeOfCase(single.typeOfCase || "");
        setIoName(single.ioName || "");
        setIoContact(single.ioContact || "");
        setAccusedDetails(single.accusedDetails || "");
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = prompt("Enter your token again:");
    try {
      const res = await axios.post(
        `https://police-case-backend.onrender.com/api/case/progress/${id}`,
        {
          updateText,
          status,
          complaintDetails,
          typeOfCase,
          ioName,
          ioContact,
          accusedDetails
        },
        {
          headers: { Authorization: token },
        }
      );
      alert("Case updated!");
      console.log(res.data);
      navigate("/thana", { replace: true });
      window.location.reload();
    } catch (err) {
      alert("Error updating case");
      console.error(err);
    }
  };

  if (!caseData) return <div>Loading...</div>;

  return (
    <div style={{ margin: "20px" }}>
      <h2>Edit Case</h2>
      <p><strong>Case Number:</strong> {caseData.caseNumber}</p>
      <form onSubmit={handleSubmit}>
        <label>Status:</label><br/>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="open">Open</option>
          <option value="investigating">Investigating</option>
          <option value="chargeSheeted">Charge Sheeted</option>
          <option value="closed">Closed</option>
        </select><br/><br/>
        <label>Case Details:</label><br/>
        <textarea
          value={complaintDetails}
          onChange={(e) => setComplaintDetails(e.target.value)}
        /><br/><br/>
        <label>Type of Case:</label><br/>
        <input
          type="text"
          value={typeOfCase}
          onChange={(e) => setTypeOfCase(e.target.value)}
        /><br/><br/>
        <label>IO Name:</label><br/>
        <input
          type="text"
          value={ioName}
          onChange={(e) => setIoName(e.target.value)}
        /><br/><br/>
        <label>IO Contact:</label><br/>
        <input
          type="text"
          value={ioContact}
          onChange={(e) => setIoContact(e.target.value)}
        /><br/><br/>
        <label>Accused Person Details:</label><br/>
        <textarea
          value={accusedDetails}
          onChange={(e) => setAccusedDetails(e.target.value)}
        /><br/><br/>
        <label>Progress Note:</label><br/>
        <textarea
          placeholder="Add progress note"
          value={updateText}
          onChange={(e) => setUpdateText(e.target.value)}
        /><br/><br/>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
