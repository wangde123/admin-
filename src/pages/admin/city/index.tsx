import {
  Card,
  Space,
  Button,
  Form,
  Input,
  Table,
  Select,
  Popconfirm,
  Pagination,
  Modal,
  DatePicker,
} from 'antd';
import { useState, useEffect } from 'react';
import { getData, getDel, getAdd, upDate } from '../../../untils/api';
import moment from 'moment';
const onFinish = (values: any) => {
  console.log('Finish:', values);
};

const Index = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [page_size, setpage_size] = useState(10);
  const [current_page, setcurrent_page] = useState(1);
  const [count, setCount] = useState(0);
  const [states, forceUpdata] = useState({});
  const [searchObj, setSearchObj] = useState({});
  //搜索
  const serach = () => {
    setSearchObj(form.getFieldsValue());
    //页码改回第一页，不然后面的搜索是基于当前页搜索，搜不到内容
    setcurrent_page(1);
  };
  //重置
  const reset = () => {
    form.resetFields();
    //设置成空对象，数据重新渲染一次
    setSearchObj({});
  };
  //分页
  useEffect(() => {
    (async () => {
      const res = await getData({ current_page, page_size, ...searchObj });
      setCount(res.count);
      const result = res.result.map((item: any) => {
        return { ...item, key: item._id };
      });

      setDataSource(result);
    })();
    //页码，条数，更新页面，搜索的依赖
  }, [current_page, page_size, states, searchObj]);
  const change = (page: number, pageSize: number) => {
    setcurrent_page(page);
    setpage_size(pageSize);
  };
  const onShowSizeChange = (current: number, size: number) => {
    console.log(current, size);
    setcurrent_page(current);
    setpage_size(size);
  };
  //新增
  const [form2] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState<string>('新增学生');
  const showModal = () => {
    setIsModalVisible(true);
    setTitle('新增学生');
    //点击新增清空内容
    form2.resetFields();
  };

  const handleOk = () => {
    setIsModalVisible(false);
    // console.log(form2.getFieldsValue());
    // console.log(moment(form2.getFieldsValue().birthday).valueOf());
    // console.log(new Date(form2.getFieldsValue().birthday).getTime());
    if (title === '新增学生') {
      form2
        .validateFields()
        .then(async (res) => {
          // console.log({
          //   ...res,
          //   birthday: new Date(form2.getFieldsValue().birthday).getTime(),
          // });

          const res1 = await getAdd({
            ...res,
            birthday: new Date(form2.getFieldsValue().birthday).getTime(),
          });
          forceUpdata({});
        })
        .catch((err) => {
          return err;
        });
    } else if (title === '编辑学员') {
      // console.log(form2.getFieldsValue());
      form2
        .validateFields()
        .then(async (res) => {
          // console.log(res._id);
          const id = res._id;
          // console.log({
          //   ...res,
          //   birthday: new Date(form2.getFieldsValue().birthday).getTime(),
          // });
          const res1 = await upDate({
            ...res,
            id: id,
            birthday: new Date(form2.getFieldsValue().birthday).getTime(),
          });
          forceUpdata({});
        })
        .catch((err) => {
          return err;
        });
    }
  };
  //点击取消关闭新增弹出框
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      render(text: string) {
        return <span>{text === '1' ? '男' : '女'}</span>;
      },
    },
    {
      title: '籍贯',
      dataIndex: 'city',
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      render(text: number) {
        const date = new Date(text);
        const y = date.getFullYear();
        const m = date.getMonth() + 1;
        const d = date.getDate();
        return y + '-' + m + '-' + d;
      },
    },
    {
      title: '操作',
      render(record: any) {
        // console.log(record);

        const confirm = async (record: any) => {
          const res = await getDel({ id: record._id }); //数据请求
          if (res) {
            if (res) {
              let lastPage = Math.ceil(count / page_size); //总条数跟当前条数向上取整，得到最后一页的页码
              if (current_page === lastPage && count % page_size === 1) {
                //判断当前页是最后一页&&最后一条
                setcurrent_page((v) => v - 1); //让页码返回上一页
              }
            }
            forceUpdata({});
          }
        };
        const cancel = () => {
          // console.log('cancel');
        };
        const time = (text: number) => {
          const date = new Date(text);
          const y = date.getFullYear();
          const m = date.getMonth() + 1;
          const d = date.getDate();
          return y + '-' + m + '-' + d;
        };
        const addData = (record: any) => {
          // console.log(time(record.birthday));
          // console.log(record);

          // const bir = time(record.birthday);

          form2.setFieldsValue({
            name: record.name,
            sex: record.sex,
            city: record.city,
            birthday: moment(time(record.birthday), 'YYYY/MM/DD'),
            _id: record._id,
          }),
            setIsModalVisible(true);
          setTitle('编辑学员');
        };
        return (
          <Space>
            <Button type="primary" onClick={() => addData(record)}>
              编辑
            </Button>
            <Popconfirm
              title="你确定删除吗？"
              okText="Yes"
              cancelText="No"
              onConfirm={() => confirm(record)}
              onCancel={cancel}
            >
              <Button type="primary">删除</Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  return (
    <Space direction="vertical" style={{ display: 'flex' }}>
      <Card>
        <Form
          form={form}
          name="horizontal_login"
          layout="inline"
          onFinish={onFinish}
        >
          <Form.Item name="name" label="姓名">
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item name="sex">
            <Select style={{ width: 120 }} allowClear>
              <Select.Option value="1">男</Select.Option>
              <Select.Option value="2">女</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item shouldUpdate>
            <Space>
              <Button type="primary" onClick={serach}>
                搜索
              </Button>
              <Button type="primary" onClick={reset}>
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
      <Card>
        <Button type="primary" style={{ float: 'right' }} onClick={showModal}>
          新增
        </Button>
        <Modal
          title={title}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            form={form2}
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            autoComplete="off"
          >
            <Form.Item name="_id" style={{ display: 'none' }}>
              <Input style={{ display: 'none' }} />
            </Form.Item>
            <Form.Item
              label="姓名"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="性别"
              name="sex"
              rules={[{ required: true, message: 'Please input your sex!' }]}
            >
              <Select allowClear>
                <Select.Option value="1">男</Select.Option>
                <Select.Option value="2">女</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="籍贯"
              name="city"
              rules={[{ required: true, message: 'Please input your city!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="生日"
              name="birthday"
              rules={[
                { required: true, message: 'Please input your birthday!' },
              ]}
            >
              <DatePicker />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
      <Card>
        <Table dataSource={dataSource} columns={columns} pagination={false} />
        <Pagination
          current={current_page}
          total={count}
          style={{ justifyContent: 'flex-end', display: 'flex', marginTop: 15 }}
          onChange={change}
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
        />
      </Card>
    </Space>
  );
};
Index.wrappers = ['@/wrappers/city'];
export default Index;
