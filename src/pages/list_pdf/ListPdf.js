import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
export default function EnhancedTable() {
  return (
    <>
      <Button>Thêm File</Button>
      <Button>Giao Việc</Button>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Tên File</th>
            <th>Tiêu Đề </th>
            <th>Ngày Thêm</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Larry the Bird</td>
            <td>@twitter</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
