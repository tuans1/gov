import React from "react";
import { Form, Alert } from "react-bootstrap";

// interface Props {
//   content: string;
//   from: number;
//   to: number;
// }
export default function AlertComponent(props) {
  return (
    <>
      <Alert key={"success"} variant="success">
        {props.content} : {props.totalItems || props?.from + " / " + props?.to}
      </Alert>
    </>
  );
}
