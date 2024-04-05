import {
  Card,
  Col,
  Row,
  Typography,
  Radio,
  Table
} from "antd";
import React, { useEffect, useState } from "react";
import moment from 'moment';
import { getAllData, add, fetchData, renderFormItems } from "../utils/utils";

const columns = [
  {
    title: "№",
    dataIndex: "_id",
    width: "50px",
    render: (data, index, key) => `${key + 1}.`
  },
  {
    title: "🗓️ Он - Сар - Өдөр",
    dataIndex: "DateAt",
    render: (date) => moment(date).format('YYYY-MM-DD HH:mm:ss')
  },
  {
    title: "🏡 Илгээгч агуулах",
    dataIndex: "SendWarehouseId",
    render: (data) => data?.Name
  },
  {
    title: "🏡 Хүлээн авагч агуулах",
    dataIndex: "RecieveWarehouseId",
    render: (data) => data?.Name
  },
  {
    title: "📦 Бараа",
    dataIndex: "ProductId",
    render: (data) => data?.Name
  },
  {
    title: "Тоо ширхэг",
    dataIndex: "Quantity",
    width: "50px",
    render: (data) => <p style={{ textAlign: "end" }}>{`${data?.toLocaleString?.()} ш`}</p>
  }
];

function Movement() {
  const { Title } = Typography;
  const [list, setList] = useState([]);
  const [senderWarehouse, setSetsenderWarehouse] = useState();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [warehouse, setWarehouse] = useState([])
  const [isAddModal, setIsAddModal] = useState();
  
  const handleChangeSender = (e) => {
    setSetsenderWarehouse(e);
  };
  const formConfig = {
    title: 'Бараа бүртгэх',
    visible: isAddModal,
    onClose: () => setIsAddModal(false),
    items: [
      {
        name: 'SendWarehouseId',
        label: 'Илгээгч - Агуулах',
        rules: [{ required: true, message: 'Нийлүүлэгчийг сонгоно уу.' }],
        type: 'select',
        onChange: handleChangeSender,
        options: warehouse.map(x => ({ value: x?._id, label: x?.Name })),
      },
      {
        name: 'RecieveWarehouseId',
        label: 'Хүлээн авагч - Агуулах',
        rules: [{ required: true, message: 'Агуулахыг сонгоно уу.' }],
        type: 'select',
        onChange: null,
        options: warehouse.map(x => x?._id !== senderWarehouse && { value: x?._id, label: x?.Name }),
      },
      {
        name: 'ProductId',
        label: 'Бараа',
        rules: [{ required: true, message: 'Барааг сонгоно уу.' }],
        type: 'select',
        onChange: null,
        options: products.map(x => ({ value: x?._id, label: x?.Name })),
      },
      {
        name: 'Quantity',
        label: 'Барааны тоо ширхэг',
        rules: [{ required: true, message: 'Нийлүүлсэн барааны тоо ширхэгийг оруулна уу.' }],
        type: 'input',
        placeholder: 'Тоо ширхэг',
        inputType: 'number',
        min: 0,
      },
    ],
    submitButtonText: 'Хадгалах', // Optional, defaults to 'Submit'
  };
  const getAllMovement = () => {
    getAllData('movement', setList, setLoading);
  };
  useEffect(() => {
    getAllMovement();
    fetchData("http://localhost:3000/warehouse", setWarehouse);
    fetchData("http://localhost:3000/product", setProducts);
  }, []);
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  const handleAdd = (values) => {
    const apiEndpoint = 'http://localhost:3000/movement';
    add(values, getAllMovement, setIsAddModal, apiEndpoint);
  };

  return (
    <>
      <div className="layout-content">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24} >
            <Card bordered={false} className="criclebox cardbody h-full">
              <div className="project-ant">
                <div>
                  <Title level={5}>🛵 Хөдөлгөөн</Title>
                </div>
                <div className="ant-filtertabs">
                  <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
                    <Radio.Group onChange={onChange} defaultValue="a">
                      <Radio.Button value="all" onClick={getAllMovement}>Бүгд</Radio.Button>
                      <Radio.Button value="add" onClick={() => setIsAddModal(true)}>➕ Нэмэх</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={list || []}
                  loading={loading || false}
                  className="ant-border-space"
                  pagination={false}
                  rowKey={row => row._id}
                />
              </div>
            </Card>
          </Col>
        </Row>
        {renderFormItems(formConfig, handleAdd)}
      </div>
    </>
  );
}

export default Movement;