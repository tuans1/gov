import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Pdf from "./copy.pdf";
import { Viewer } from "@react-pdf-viewer/core";
import Tesseract from "tesseract.js";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
function PDFViewer() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const test =
    "https://filegovmanagement.s3.ap-southeast-1.amazonaws.com/TfInag6sQ2X3qfU9_3Jun2023130207GMT_1685797327432.Mky6enSxYoHaJ4PP_3Jun2023130207GMT_1685797327419.000.32.63.H49.2011.128.12.pdf";

  const handleDocumentLoad = (e) => {
    setTimeout(() => {
      let canvas = document.getElementsByClassName("rpv-core__canvas-layer");
      let listImg = [];
      for (var i = 0; i < canvas.length; i++) {
        listImg.push(canvas[i].firstChild.toDataURL());
      }
      listImg.forEach((img, index) => {
        fetch(img)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], "File name" + index, {
              type: "image/png",
            });
            const path = URL.createObjectURL(file);
            Tesseract.recognize(path, "vie", {
              logger: (m) => console.log(m),
            })
              .catch((err) => {
                console.error(err);
              })
              .then((result) => {
                // Get Confidence score
                console.log(result.data.text)
                // setText(text);
              });
          });
      });
    }, 1000);
  };
  return (
    <div className="overflow-y-scroll h-[calc(100vh-96px)]">
      <div>
        <Viewer
          fileUrl={test}
          onDocumentLoad={handleDocumentLoad}
          // renderPage={(renderPageProps) => (
          //   <CustomPageLayer renderPageProps={renderPageProps} />
          // )}
        />
      </div>
    </div>
  );
}

export default PDFViewer;
