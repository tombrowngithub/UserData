import React, { Fragment, useEffect, useState } from "react";
import { Alert, Button, Table, Form } from "react-bootstrap";
import axios from "axios";
import { data } from "./data";

export default function TableData() {
  const [grid, setGrid] = useState([]);
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);
  //const [editKey, setEditKey] = useState("")
  const [editRow, setEditRow] = useState(false);

  const loadData = async () => {
    setLoading(true);
    //const res = await axios.get("https://jsonplaceholder.typicode.com/comments")
    setGrid(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const modifiedData = grid.map(({ body, ...item }) => ({
    ...item,
    key: item.id,
    comment: body
  }));

  function Delete(ID) {
    const list = [...grid];
    list.splice(ID, 1);
    setGrid(list);
  }

  function Edit(itemID) {
    setEditRow(itemID);
  }

  function cancelUpdate() {
    setEditRow(false);
  }

  function EditableCell() {
    return (
      <>
        <Button style={{ width: "75px" }} variant="secondary">
          Save
        </Button>
        <Button
          style={{ width: "75px" }}
          variant="warning"
          onClick={cancelUpdate}
        >
          Cancel
        </Button>
      </>
    );
  }

  return (
    <>
      <Table bordered hover>
        <thead>
          <tr className="text-center">
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Comment</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {modifiedData.map((item, index) => {
            return (
              <Fragment key={item.id}>
                <tr>
                  <td>{item.id}</td>
                  <td>
                    {editRow ? (
                      <Form.Control type="text" placeholder={item.name} />
                    ) : (
                      item.name
                    )}
                  </td>
                  <td>
                    {editRow ? (
                      <Form.Control type="text" placeholder={item.email} />
                    ) : (
                      item.email
                    )}
                  </td>
                  <td>
                    {editRow ? (
                      <Form.Control as="textarea" placeholder={item.comment} />
                    ) : (
                      item.comment
                    )}
                  </td>
                  <td className="d-flex justify-content-md-evenly">
                    {!editRow && (
                      <Button
                        style={{ width: "75px" }}
                        variant="danger"
                        type="submit"
                        onClick={() => Delete(index)}
                      >
                        Delete
                      </Button>
                    )}
                    {editRow === item.id ? (
                      <EditableCell /> // I want this function to only run on the specific index, to change the "Name", "Email", "Comment" area to an input but on the specific cell without affecting the rest of the cells
                    ) : (
                      <Button
                        style={{ width: "75px" }}
                        className="ms-1"
                        variant="secondary"
                        onClick={() => Edit(item.id)}
                      >
                        Edit
                      </Button>
                    )}
                  </td>
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
