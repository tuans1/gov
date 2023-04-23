import React, { useState } from "react";
// Import the main component
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// Import styles
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
function PDFViewer() {
  const [pdfFile, setPdfFile] = useState(null);
  const [viewPdf, setViewPdf] = useState(null);
  const handleChange = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (e) => {
      setPdfFile(e.target?.result);
    };
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (pdfFile !== null) {
      console.log(pdfFile);
      setViewPdf(pdfFile);
    } else {
      setViewPdf(null);
    }
  };
  const plugin = defaultLayoutPlugin();
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange} />
        <button type="submit">View PDF</button>
      </form>
      <h2>View PDF</h2>
      <div>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          {viewPdf && <Viewer fileUrl={viewPdf} plugins={[plugin]} />}
        </Worker>
      </div>
    </div>
  );
}

export default PDFViewer;
