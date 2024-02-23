import { Button, Col, Divider, Form, Input, Modal, Pagination, Row } from 'antd'
import React, { Component } from 'react'
import ManufacturerList from './ManufacturerList';
import withRouter from './../../helpers/withRouter';
import ManufacturerForm from './ManufacturerForm';
import { connect } from 'react-redux';
import { getManufacturerByName, updateManufacturer, insertManufacturer, getManufacturers, deleteManufacturer,getManufacturerPage } from './../../redux/actions/manufacturerAction';
import manufacturerReducer from './../../redux/actions/reducers/manufacturerReducer';
import { ExclamationCircleOutlined } from "@ant-design/icons";

class ListManufacturers extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            manufacturer: { id: '', name: '', logo: '' }
        }
    }
    componentDidMount = () => {
        this.props.getManufacturerPage(0);
        console.log("Did mount");
    }
    onCreate = (values) => {
        console.log(values);

        if (values.id) {
            this.props.updateManufacturer(values);
        } else {
            this.props.insertManufacturer(values);
        }

        this.setState({ ...this.state, manufacturer: {}, open: false });
    }
    deleteManufacturer = () => {
        this.props.deleteManufacturer(this.state.manufacturer.id);
        console.log("Delete manufacturer");
    }
    onDeleteConfirm = (value) => {
        this.setState({ ...this.state, manufacturer: value })
        const message = "Do you want to delete manufacturer" + value.name;

        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: message,
            onOk: this.deleteManufacturer,
            onText: 'Delete',
            cancelText: "Cancel",
        })
    }

    onEdit = (value) => {
        this.setState({ ...this.state, manufacturer: value, open: true })
    }

    // onShowSizeChange = (current, pageSize) => {
    //     // console.log(current, pageSize);

    //     const { pagination } = this.props;
    //     const params = {
    //         query: pagination.query,
    //         page: 0,
    //         size: pageSize,
    //     }
    //     this.props.getManufacturerByName(params);
    // }

    // onChange = (pageNumber, pageSize) => {
    //     const { pagination } = this.props;
    //     const params = {
    //         query: pagination.query,
    //         page: pageNumber - 1,
    //         size: pageSize,
    //     }
    //     this.props.getManufacturerByName(params);
    // }
    onChange = (pageNumber, pageSize) => {
        const { pagination } = this.props;
        const params = {
            query: pagination.query,
            page: pageNumber - 1,
            size: pageSize,
        }
        this.props.getManufacturerPage(params);
    }

    handleSearch = (value) => {
        console.log(value);

        const { pagination } = this.props;
        const params = {
            query: value.query,
            size: pagination.size,
        }
        if(value!==null){
            this.props.getManufacturerByName(params);
        } else {
            this.props.getManufacturerPage(0);
        }
        
    }
    render() {
        const { navigate } = this.props.router;
        const { open } = this.state;
        const { manufacturers, pagination } = this.props
        return (
            <div>
                {/* <ContentHeader navigate={navigate} title="List categories" className="site-page-header"></ContentHeader> */}

                <Divider></Divider>

                <Row style={{ marginBottom: 10 }}>
                    <Col md={18}>
                        <Form layout='inline' name='searchForm' onFinish={this.handleSearch}>
                            <Form.Item name={'query'} initialValue={pagination.query}>
                                <Input placeholder='Enter manufacturer name'></Input>
                            </Form.Item>
                            <Button type='primary' htmlType='submit'>Search</Button>
                        </Form>
                    </Col>
                    <Col md={6} style={{ textAlign: 'right' }}>
                        <Button
                            type="primary"
                            onClick={() => {
                                this.setState({ ...this.state, open: true })
                            }}
                        >
                            New Manufacturer
                        </Button>
                    </Col>
                </Row>
    
                <ManufacturerList
                    dataSource={manufacturers}
                    onDeleteConfirm={this.onDeleteConfirm}
                    onEdit={this.onEdit}
                />

                <Row style={{ marginTop: 10 }}>
                    <Col md={24} style={{ textAlign: 'right' }}>
                        <Pagination
                            defaultCurrent={pagination.page}
                            defaultPageSize={pagination.size}
                            total={pagination.totalElements}
                            // onShowSizeChange={this.onShowSizeChange}
                            onChange={this.onChange}
                            showSizeChanger="true"
                        ></Pagination>
                    </Col>
                </Row>
                <ManufacturerForm
                    manufacturer={this.state.manufacturer}
                    open={open}
                    onCreate={this.onCreate}
                    onCancel={() => {
                        this.setState({ ...this.state, open: false })
                    }}
                />
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    manufacturers: state.manufacturerReducer.manufacturers,
    pagination: state.manufacturerReducer.pagination
})

const mapDispatchToProps = {
    insertManufacturer,
    getManufacturers,
    deleteManufacturer,
    updateManufacturer,
    getManufacturerByName,
    getManufacturerPage
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListManufacturers))

