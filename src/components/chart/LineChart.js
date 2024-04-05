import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";

function LineChart({ values = {} }) {
  const { Title, Paragraph } = Typography;

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Ашгийн үзүүлэлт</Title>
          <Paragraph className="lastweek">
            энэ сард <span className="bnb2">+30%</span>
          </Paragraph>
        </div>
        <div className="sales">
          <ul>
            <li>{<MinusOutlined />} Орлого</li>
            <li>{<MinusOutlined />} Зарлага</li>
          </ul>
        </div>
      </div>
      <div>
        {values?.options && (
          <ReactApexChart
            className="full-width"
            options={{
              ...values.options, tooltip: {
                y: {
                  formatter: function (val) {
                    return "$ " + val + " thousands";
                  },
                },
              },
            }}
            series={values.series}
            type="area"
            height={350}
            width={"100%"}
          />
        )}

      </div>


    </>
  );
}

export default LineChart;
