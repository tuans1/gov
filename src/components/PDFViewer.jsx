import { useState } from "react";
import { Viewer, Worker, ProgressBar } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// Import styles
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
function PDFViewer({ fileUrl }) {
  const plugin = defaultLayoutPlugin();
  // const handleDocumentLoad = (e) => {
  //   setTimeout(() => {
  //     let canvas = document.getElementsByClassName("rpv-core__canvas-layer");
  //     const listImg = [];
  //     for (var i = 0; i < canvas.length; i++) {
  //       listImg.push({
  //         img: canvas[i].firstChild.toDataURL(),
  //         index: i,
  //       });
  //     }
  //     listImg.forEach((img, index) => {
  //       fetch(img.img)
  //         .then((res) => res.blob())
  //         .then((blob) => {
  //           const file = new File([blob], "File name" + index, {
  //             type: "image/png",
  //           });
  //           const path = URL.createObjectURL(file);
  //           Tesseract.recognize(path, "vie", {
  //             logger: (m) => console.log(m),
  //           })
  //             .catch((err) => {
  //               console.error(err);
  //             })
  //             .then((result) => {
  //               const list = [...listText];
  //               setListText([
  //                 ...list,
  //                 {
  //                   text: result.data.text,
  //                   index,
  //                 },
  //               ]);
  //             });
  //         });
  //     });
  //   }, 1000);
  // };
  return (
    <div className="overflow-y-scroll h-[calc(100vh-96px)]">
      <div>
        <Worker
          textLayerRendered={true}
          workerUrl="https://unpkg.com/pdfjs-dist@3.6.172/build/pdf.worker.min.js"
        >
          <Viewer
            fileUrl={
              "https://filegovmanagement.s3.ap-southeast-1.amazonaws.com" +
              fileUrl?.replace("filegovmanagement", "")
            }
            plugins={[plugin]}
            renderLoader={(percentages) => (
              <div style={{ width: "240px" }}>
                <ProgressBar progress={Math.round(percentages)} />
              </div>
            )}
          />
        </Worker>
      </div>
    </div>
  );
}

export default PDFViewer;
