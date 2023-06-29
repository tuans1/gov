import React, { ReactNode, useState } from "react";
import { Form, Table } from "react-bootstrap";

// type Props = {
//   header: Array<{ label: string }>;
//   data: Array<any>;
//   handleDbClick: Function;
//   onCheckAll
//   showCheckbox
// };
export default function BaseTable(props) {
  const [checkAll, setCheckAll] = useState(false);

  const headerAndKey = props.header;
  const listData = props.data;
  console.log(props)
  const handleCheckAll = () => {
    setCheckAll(true);
    props.onCheckAll();
  };
  const handleChecked = (index) => {
    props.handleChecked(index);
  };
  return (
    <>
      <Table bordered hover size="sm">
        <thead>
          {props.showCheckbox && (
            <th>
              <Form.Check
                type="checkbox"
                checked={checkAll}
                onChange={handleCheckAll}
              />
            </th>
          )}
          <tr>
            {headerAndKey.map((x, i) => {
              return <td key={i}>{x.label}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {listData.map((item, index) => {
            return (
              <tr
                className="cursor-pointer"
                key={item.id}
                onDoubleClick={() => props.handleDbClick(item, index)}
              >
                {props.showCheckbox && (
                  <td>
                    <Form.Check
                      type="checkbox"
                      onChange={() => handleChecked(index)}
                      checked={item.isCheck}
                    />
                  </td>
                )}
                <td>{index + 1}</td>
                {/* loop td data and bind with key from header */}
                {headerAndKey.map((obj) => {
                  return <td key={obj.key}>{item[obj.key]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
