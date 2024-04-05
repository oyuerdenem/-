import { notification } from "antd"
import axios from "axios"
import { ShopOutlined, WalletOutlined, CarOutlined, SendOutlined, UsergroupAddOutlined, BarChartOutlined, ProfileOutlined, HddOutlined, FileTextOutlined } from '@ant-design/icons'
import { Form, Select, Input, Button, Drawer } from 'antd';

const { Option } = Select;

const Notification = (res, description = "", isshow = false) => {
  if (res?.success && isshow) {
    return notification["success"]({
      message: "Амжилттай",
      description: description || ''
    })
  }

  if (!res.success) {
    return notification["warning"]({
      message: "Амжилтгүй",
      description: description || ''
    })
  }
}
const Response = (description = "", isshow = false) => {
  if (isshow) {
    return notification["warning"]({
      message: "Алдаа гарлаа.",
      description: description || ''
    })
  }
}
const menulist = [
  {
    url: "dashboard",
    icon: <span className="icon"><BarChartOutlined /></span>,
    label: "Үзүүлэлтүүд"
  },
  {
    url: "stock",
    icon: <span className="icon"><ProfileOutlined /></span>,
    label: "Нөөц"
  },
  {
    url: "warehouse",
    icon: <span className="icon"><HddOutlined /></span>,
    label: "Агуулах"
  },
  {
    url: "product",
    icon: <span className="icon"><FileTextOutlined /></span>,
    label: "Бараа"
  },
  {
    url: "store",
    icon: <span className="icon"><ShopOutlined /></span>,
    label: "Дэлгүүр"
  },
  {
    url: "supplier",
    icon: <span className="icon"><UsergroupAddOutlined /></span>,
    label: "Нийлүүлэгч"
  },
  {
    url: "sale",
    icon: <span className="icon"><WalletOutlined /></span>,
    label: "Борлуулалт"
  },
  {
    url: "movement",
    icon: <span className="icon"><CarOutlined /></span>,
    label: "Хөдөлгөөн"

  },
  {
    url: "supplying",
    icon: <span className="icon"><SendOutlined /></span>,
    label: "Татан авалт"
  }
];
const deleteRow = async (row, getAll, setRow, apiEndpoint) => {
  try {
    const response = await axios.delete(`${apiEndpoint}/${row._id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.success) {
      Notification(response.data, response.message, true);
      getAll();
      setRow();
    } else {
      Notification(response.data, response.message, true);
    }
  } catch (error) {
    console.error('Error deleting row:', error);
  }
};
const addEntity = async (values, getAll, setIsModal, apiEndpoint) => {
  try {
    const response = await axios.post(`${apiEndpoint}`, values, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.success) {
      Notification(response.data, response.message, true);
      getAll();
      setIsModal(false);
    } else {
      Notification(response.data, response.message, true);
    }
  } catch (error) {
    console.error('Error adding entity:', error);
  }
};
const updateEntity = async (id, values, getAll, setIsModal, apiEndpoint) => {
  try {
    const response = await axios.put(`${apiEndpoint}/${id}`, values, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.success) {
      Notification(response.data, response.message, true);
      getAll();
      setIsModal(false);
    } else {
      Notification(response.data, response.message, true);
    }
  } catch (error) {
    console.error('Error updating entity:', error);
  }
};
const add = async (values, getAll, setIsModal, apiEndpoint) => {
  try {
    const response = await axios.post(`${apiEndpoint}`, values, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response?.data?.success) {
      Notification(response.data, response.message, true);
      getAll();
      setIsModal(false);
    } else {
      Notification(response.data, response.message, true);
    }
  } catch (error) {
    console.error('Error adding supply:', error);
  }
};
const fetchData = async (url, setter) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.data.success) {
      setter(response.data.values || []);
    }
  } catch (error) {
    // Handle error appropriately
    console.error('Error fetching data:', error);
  }
};
const renderFormItems = (formConfig, onFinish) => (
  <Drawer title={formConfig.title} visible={formConfig.visible} onClose={formConfig.onClose} footer={false} destroyOnClose>
    <Form layout="vertical" onFinish={onFinish}>
      {formConfig.items.map(item => (
        <Form.Item key={item.name} name={item.name} label={item.label} rules={item.rules}>
          {item.type === 'select' ? (
            <Select defaultValue="" style={{ width: 200 }} onChange={item.onChange}>
              {item.options.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          ) : item.type === 'input' ? (
            <Input placeholder={item.placeholder} type={item.inputType} min={item.min} />
          ) : null}
        </Form.Item>
      ))}
      <Form.Item>
        <Button htmlType="submit" type="primary">
          {formConfig.submitButtonText || 'Submit'}
        </Button>
      </Form.Item>
    </Form>
  </Drawer>
);
const getAllData = async (endpoint, setList, setLoading) => {
  try {
    setLoading(true);
    const response = await axios.get(`http://localhost:3000/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response?.data.success) {
      setList(response?.data.values);
    }
  } catch (error) {
    // Handle error appropriately
    console.error('Error fetching data:', error);
  } finally {
    setLoading(false);
  }
};
export {
  Notification, menulist, Response, deleteRow, addEntity, updateEntity, add, fetchData, renderFormItems, getAllData
}