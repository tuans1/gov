import React, { useState } from "react";
// Import the main component
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// Import styles
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Button } from "react-bootstrap";
function PDFViewer() {
  const [pdfFile, setPdfFile] = useState(null);
  // const handleChange = (e) => {
  //   let reader = new FileReader();
  //   reader.readAsDataURL(e.target.files[0]);
  //   reader.onload = (e) => {
  //     setPdfFile(e.target?.result);
  //   };
  // };
  const plugin = defaultLayoutPlugin();
  return (
    <div>
      <h2>View PDF</h2>
      <div>
        <Worker textLayerRendered={true} workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Viewer fileUrl="https://test-gov-demo.s3.ap-southeast-1.amazonaws.com/Job_Offer_i2solutions.pdf" plugins={[plugin]} />
        </Worker>
      </div>
    </div>
  );
}

export default PDFViewer;
