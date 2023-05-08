// import { DatePicker } from "antd";
// import "antd/dist/antd.css";
import { useEffect, useState } from "react";
import "./App.css";
import { Button, Table, Modal, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

function App() {
  const [isEditintg, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [dataSource, setDataSource] = useState();
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "3",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "4",
      title: "Address",
      dataIndex: "address",
    },
    {
      key: "5",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditStudent(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteStudent(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://localhost:4001";
      const res = await axios(url);
      const data = res.data;
      console.log("number");
      setDataSource(data);
    };
    fetchData();
  }, []);

  const onAddStudent = () => {
    const randomNumber = parseInt(Math.random() * 1000);
    const newStudent = {
      id: randomNumber,
      name: "Name" + randomNumber,
      email: randomNumber + "@gmail.com",
      address: "addres" + randomNumber,
    };
    setDataSource((pre) => {
      return [...pre, newStudent];
    });
  };

  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: "Are you sure , you want to delete this record",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((student) => student.id !== record.id);
        });
      },
    });
  };
  const onEditStudent = (record) => {
    setIsEditing(true);
    setEditingStudent({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="divforbutton">
          <Button onClick={onAddStudent}> add new student</Button>
        </div>
        <Table columns={columns} dataSource={dataSource}></Table>
        <Modal
          title="Edit Student"
          open={isEditintg}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setDataSource((pre) => {
              return pre.map((student) => {
                if (student.id === editingStudent.id) {
                  return editingStudent;
                } else {
                  return student;
                }
              });
            });
            resetEditing();
          }}
        >
          <Input
            value={editingStudent?.name}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, name: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.email}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, email: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.address}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, address: e.target.value };
              });
            }}
          />
        </Modal>
      </header>
    </div>
  );
}

export default App;
