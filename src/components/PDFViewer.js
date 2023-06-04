import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
function PDFViewer() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(null);
  const URL =
    "https://filegovmanagement.s3.ap-southeast-1.amazonaws.com/TfInag6sQ2X3qfU9_3Jun2023130207GMT_1685797327432.Mky6enSxYoHaJ4PP_3Jun2023130207GMT_1685797327419.000.32.63.H49.2011.128.12.pdf";

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    const docs = [];
    const docName = "XXX",
      pages = [];
    docs.push({
      name: docName,
      pages,
    });

    pdfjs
      .getDocument({
        url: URL,
        //password: "test",
      })
      .promise.then(function (doc) {
        for (let p = 1; p <= doc.numPages; p++) {
          const pageInfo = {
            number: p,
            name: docName + "-" + p,
            images: [],
            svg: {},
          };
          pages.push(pageInfo);

          doc.getPage(p).then((page) => console.log(page));
        }
      })
      .catch(function (error) {
        alert("Failed to open " + docName);
        console.log(error);
      });
  }
  function parsePage(page, pageInfo) {
    page.getOperatorList().then(function (ops) {
      console.log("ops", ops);
      const fns = ops.fnArray,
        args = ops.argsArray;

      let imgsFound = 0;
      args.forEach((arg, i) => {
        //Not a JPEG resource:
        if (fns[i] !== pdfjs.OPS.paintJpegXObject) {
          return;
        }

        console.log("loading", arg);
        imgsFound++;

        const imgKey = arg[0],
          imgInfo = {
            name: pageInfo.name + "-" + imgsFound + ".jpg",
            url: "",
          };
        pageInfo.images.push(imgInfo);

        page.objs.get(imgKey, (img) => {
          imgInfo.url = img.src;
        });
      });
    });

    //Full SVG:

    // Get viewport (dimensions)
    const scale = 1.5;
    const viewport = page.getViewport({ scale });

    pageInfo.svg = {
      w: viewport.width,
      h: viewport.height,
      doc: "",
    };

    // SVG rendering by PDF.js
    page
      .getOperatorList()
      .then((opList) => {
        var svgGfx = new pdfjs.SVGGraphics(page.commonObjs, page.objs);
        return svgGfx.getSVG(opList, viewport);
      })
      .then((svg) => {
        //console.log(svg);
        pageInfo.svg.doc = svg;
      });
  }
  return (
    <div className="overflow-y-scroll h-[calc(100vh-96px)]">
      <div>
        <Document file={URL} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    </div>
  );
}

export default PDFViewer;
