import {
  Row,
  Col,
  Typography,
  Card,
  Radio,
  Table,
  Button,
  Form,
  Input,
  Drawer,
  Popconfirm,
} from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { Notification, getAllData } from "../utils/utils";
const project = [
  {
    title: "№",
    dataIndex: "_id",
    width: "50px",
    render: (data, index, key) => `${key + 1}.`
  },
  {
    title: "Нэр",
    dataIndex: "Name",
    width: "32%"
  },
  {
    title: "📍 Байршил",
    dataIndex: "Location"
  }
];

function Supplier() {
  const { Title } = Typography;

  const [supplier, setSupplier] = useState([]);
  const [loadingSupplier, setLoadingSupplier] = useState(false);
  const [row, setRow] = useState();
  const [isAddModal, setIsAddModal] = useState();
  const [isUpdateModal, setIsUpdateModal] = useState();

  const getAll = () => {
    getAllData('supplier', setSupplier, setLoadingSupplier);
  };

  useEffect(() => {
    getAll();
  }, []);

  const onChange = (e) => {
  };

  const handleClickUpdate = () => {
    setIsUpdateModal(true);
  }

  const handleClickDelete = () => {
    axios.delete('http://localhost:3000/supplier/' + row._id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => {
      if (res.data.success) {
        Notification(res.data, res.message, true);
        getAll();
        setRow();
      } else {
        Notification(res.data, res.message, true);
      }
    })
  }

  const handleAddSupplier = (values) => {
    axios.post('http://localhost:3000/supplier', values, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => {
      if (res.data.success) {
        Notification(res.data, res.message, true);
        getAll();
        setIsAddModal(false);
      } else {
        Notification(res.data, res.message, true);
      }
    })
  }

  const handleUpdateSupplier = (values) => {
    axios.put('http://localhost:3000/supplier/' + row._id, values, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => {
      if (res.data.success) {
        Notification(res.data, res.message, true);
        getAll();
        setIsUpdateModal(false)
      } else {
        Notification(res.data, res.message, true);
      }
    })
  }

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card bordered={false} className="criclebox cardbody h-full">
              <div className="project-ant">
                <div>
                  <Title level={5}>🫱🏻‍🫲🏼 Нийлүүлэгч</Title>
                </div>
                <div className="ant-filtertabs">
                  <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
                    <Radio.Group defaultValue="all" onChange={onChange}>
                      <Radio.Button value="all" onClick={getAll}>Бүгд</Radio.Button>
                      <Radio.Button value="add" onClick={() => setIsAddModal(true)}>Нэмэх</Radio.Button>
                      <Radio.Button disabled={!row} value="update" onClick={handleClickUpdate}>Засах</Radio.Button>
                      <Popconfirm title="Нийлүүлэгчийг устгах уу?" onConfirm={handleClickDelete}>
                        <Radio.Button disabled={!row} value="delete" >Устгах</Radio.Button>
                      </Popconfirm>
                    </Radio.Group>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <Table
                  columns={project}
                  dataSource={supplier || []}
                  loading={loadingSupplier || false}
                  className="ant-border-space"
                  pagination={false}
                  rowKey={row => row._id}
                  onRow={e => ({
                    onClick: () => setRow(e)
                  })}
                  rowClassName={e => e._id === row?._id && 'active'}
                />
              </div>
            </Card>
          </Col>
        </Row>

        <Drawer title="Нийлүүлэгч бүртгэх" visible={isAddModal} onClose={() => setIsAddModal(false)} footer={false} destroyOnClose>
          <Form layout="vertical" onFinish={handleAddSupplier}>
            <Form.Item name="Name" label="Нэр" rules={[{ required: true, message: 'Нийлүүлэгчийн нэрийг оруулна уу.' }]}>
              <Input placeholder="Нийлүүлэгчийн нэр" autoFocus />
            </Form.Item>

            <Form.Item name="Location" label="Байршил" rules={[{ required: true, message: 'Нийлүүлэгчийн байршлыг оруулна уу.' }]}>
              <Input placeholder="Нийлүүлэгчийн байршил" />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary">Бүртгэх</Button>
            </Form.Item>
          </Form>
        </Drawer>

        <Drawer title="Мэдээлэл засах" visible={isUpdateModal} onClose={() => setIsUpdateModal(false)} footer={false} destroyOnClose>
          <Form layout="vertical" onFinish={handleUpdateSupplier} initialValues={row}>
            <Form.Item name="Name" label="Нэр" rules={[{ required: true, message: 'Нийлүүлэгчийн нэрийг оруулна уу.' }]}>
              <Input placeholder="Нийлүүлэгчийн нэр" />
            </Form.Item>

            <Form.Item name="Location" label="Байршил" rules={[{ required: true, message: 'Нийлүүлэгчийн байршлыг оруулна уу.' }]}>
              <Input placeholder="Нийлүүлэгчийн байршил" />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary">Хадгалах</Button>
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    </>
  )
}

export default Supplier;