import { useEffect, useState } from "react";
import {
  Card,
  Col,
  Row,
  Typography,
  Spin,
} from "antd";
import Echart from "../components/chart/EChart";
import LineChart from "../components/chart/LineChart";
import axios from "axios";
import { RiseOutlined, FallOutlined, AreaChartOutlined, DotChartOutlined } from "@ant-design/icons";

function Resource() {
  const { Title } = Typography;
  const [data, setData] = useState();

  useEffect(() => {
    axios.get("http://localhost:3000/dashboard", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => {
      if (res?.data?.success) {
        setData(res.data?.values);
      }
    })
  }, [])

  const DynamicIcon = icon => {
    switch (icon.icon) {
      case 'RiseOutlined':
        return <RiseOutlined />
      case 'FallOutlined':
        return <FallOutlined />
      case 'AreaChartOutlined':
        return <AreaChartOutlined />
      case 'DotChartOutlined':
        return <DotChartOutlined />
      default:
        return <DotChartOutlined />
    }
  }

  return (
    <Spin spinning={data === undefined} size="large">
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          {data?.count?.map?.((c, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              className="mb-24"
            >
              <Card bordered={false} className="criclebox ">
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18}>
                      <span>{c.today}</span>
                      <Title level={3}>
                        {c.title} <small className={c.bnb}>{c.persent}</small>
                      </Title>
                    </Col>
                    <Col xs={6}>
                      <div className="icon-box">
                        <DynamicIcon icon={c.icon} />
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              {data?.barchart?.items && <Echart values={data?.barchart || {}} />}
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
            {<LineChart values={data?.linechart || {}} />}
            </Card>
          </Col>
        </Row>
      </div>
    </Spin>
  );
}

export default Resource;
