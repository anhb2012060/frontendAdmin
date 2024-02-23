import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Row, Col, Avatar, message } from 'antd';
import "./DashBoardPage.css";
import { MdAddCircleOutline, MdCategory, MdFormatListBulleted, MdInsertChartOutlined, MdLogout, MdManageAccounts, MdOutlineHome, MdOutlineInventory2, MdOutlineShoppingBag, MdRequestPage, MdSupervisorAccount } from 'react-icons/md';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Home from '../components/home/Home';
import AddOrEditCategory from '../components/categories/AddOrEditCategory';
import ListCategory from '../components/categories/ListCategory';
import { useDispatch, useSelector } from 'react-redux';
import { setError, setMessage } from '../redux/actions/commonAction';
import ListManufacturers from '../components/manufacturers/ListManufacturers';
import UploadImage from '../components/products/UploadImage';
import AddOrEditProduct from '../components/products/AddOrEditProduct';
const { Header, Sider, Content } = Layout;

function DashBoardPage() {
  const [marginLeft, setMarginLeft] = useState(200);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // phiên bản React 18 cần sử dụng navigate
  const navigate = useNavigate();

  const msg = useSelector(state => state.commonReducer.message);
  const err = useSelector(state => state.commonReducer.error);
  const dispatch = useDispatch();
  useEffect(() => {
    if (msg) {
      const tempMsg = msg;
      dispatch(setMessage(""))
      message.success(tempMsg);
    }
    if (err) {
      const tempErr = err;
      dispatch(setError(""))
      message.error(tempErr);
    }
  }, [msg, err, dispatch]);

  const siteLayoutStyle = { marginLeft: marginLeft };
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          buttom: 0
        }}>
        <div className="demo-logo-vertical logo">
          <h2>{collapsed ? "SS" : "SpringShop"}</h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <MdOutlineHome />,
              label: 'Home',
              onClick: () => navigate("/"),
            },
            {
              key: '2',
              icon: <MdCategory />,
              label: 'Categories',
              children: [
                {
                  key: '21',
                  icon: <MdAddCircleOutline />,
                  label: 'Add Category',
                  onClick: () => navigate("/categories/add")
                  // khi khai báo vậy nó sẽ gọi path sau đó nó lấy element nộp lên <Outlet></Outlet>
                },
                {
                  key: '22',
                  icon: <MdFormatListBulleted />,
                  label: 'List Categories',
                  onClick: () => navigate("/categories/list")
                },
              ]
            },
            {
              key: '021',
              icon: <MdCategory />,
              label: 'Others',
              children: [
                {
                  key: '211',
                  icon: <MdAddCircleOutline />,
                  label: 'List Manufacturer',
                  onClick: () => navigate("/manufacturers/list")
                  // khi khai báo vậy nó sẽ gọi path sau đó nó lấy element nộp lên <Outlet></Outlet>
                },
                {
                  key: '212',
                  icon: <MdFormatListBulleted />,
                  label: 'List Coutries',
                  onClick: () => navigate("/coutries/list")
                },
                {
                  key: '213',
                  icon: <MdFormatListBulleted />,
                  label: 'List Provinces',
                  onClick: () => navigate("/provinces/list")
                },
              ]
            },
            {
              key: 'P3',
              icon: <MdCategory />,
              label: 'Product',
              children: [
                {
                  key: 'P3-01',
                  icon: <MdAddCircleOutline />,
                  label: 'Upload Images',
                  onClick: () => navigate("/products/upload")
                  // khi khai báo vậy nó sẽ gọi path sau đó nó lấy element nộp lên <Outlet></Outlet>
                },
                {
                  key: 'P3-02',
                  icon: <MdAddCircleOutline />,
                  label: 'Add Products',
                  onClick: () => navigate("/products/add")
                },
                {
                  key: 'P3-03',
                  icon: <MdFormatListBulleted />,
                  label: 'List Products',
                  onClick: () => navigate("/products/list")
                },
              ]
            },
            {
              key: '3',
              icon: <MdOutlineInventory2 />,
              label: 'Products',
            },
            {
              key: '4',
              icon: <MdOutlineShoppingBag />,
              label: 'Orders',
            },
            {
              key: '5',
              icon: <MdRequestPage />,
              label: 'Invoices',
            },
            {
              key: '6',
              icon: <MdInsertChartOutlined />,
              label: 'Statistics',
            },
            {
              key: '7',
              icon: <MdManageAccounts />,
              label: 'Profiles',
            },
            {
              key: '8',
              icon: <MdSupervisorAccount />,
              label: 'Accounts',
            },
            {
              key: '9',
              icon: <MdLogout />,
              label: 'Logout',
            }
          ]}
        />
      </Sider>
      <Layout className='site-layout' style={siteLayoutStyle}>
        <Header
          className='site-layout-background'
          style={{
            padding: 0,
            background: colorBgContainer,
            right: 16,
            left: marginLeft + 16,
            top: 0,
            position: 'fixed',
            height: 70
          }}
        >
          <Row>
            <Col md={20}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => {
                  const sts = !collapsed;
                  setCollapsed(sts);
                  setMarginLeft(sts ? 80 : 200);
                }}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
            </Col>
            <Col md={4}>
              <div>
                <Avatar size='default' icon={<UserOutlined />}></Avatar>
                Tran Duy Anh
              </div>
            </Col>
          </Row>

        </Header>
        <Content
          style={{
            margin: '80px 24px 16px 24px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <div className='content-panel'>
            <Routes>
              <Route path='/' element={<Home />} key={"h"}></Route>
              <Route path='/categories/add' element={<AddOrEditCategory key="a" />}></Route>
              <Route path='/categories/update/:id' element={<AddOrEditCategory key="u" />}></Route>
              <Route path='/categories/list' element={<ListCategory />} ></Route>
              <Route path='/manufacturers/list' element={<ListManufacturers />} ></Route>
              <Route path='/products/upload' element={<UploadImage />} ></Route>
              <Route path='/products/add' element={<AddOrEditProduct />} ></Route>
            </Routes>
            <Outlet></Outlet>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
export default DashBoardPage


