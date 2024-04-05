import {
  Card,
  Col,
  Row,
  Typography,
  Table
} from "antd";
import { useEffect, useState } from "react";
import moment from 'moment';
import { getAllData } from "../utils/utils";

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
    width: "20%",
    render: (date) => moment(date).format('YYYY-MM-DD HH:mm:ss')
  },
  {
    title: "🏡 Агуулах",
    dataIndex: "WarehouseId",
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
    render: (data) => <p style={{textAlign: "end"}}>{`${data?.toLocaleString?.()} ш`}</p>
  }
];

function Stock() {
  const { Title } = Typography;
  const [list, setList] = useState([]);
  const [loadingStock, setLoadingStock] = useState(false);
  

  const getAllStock = () => {
    getAllData('stock', setList, setLoadingStock);
  };

  useEffect(() => {
    getAllStock();
  }, []);

  return (
    <>
      <div className="layout-content">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24} >
            <Card bordered={false} className="criclebox cardbody h-full">
              <div className="project-ant">
                <div>
                  <Title level={5}>📂 Нөөц</Title>
                </div>
              </div>
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={list || []}
                  loading={loadingStock || false}
                  className="ant-border-space"
                  pagination={false}
                  rowKey={row => row._id}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Stock;
