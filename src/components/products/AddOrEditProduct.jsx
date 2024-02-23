import React, { Component } from 'react'
import withRouter from '../../helpers/withRouter'
import { Button, Col, Divider, Row, Space, Steps, message } from 'antd';
import ProductForm from './ProductForm';
import UploadImage from './UploadImage';
import { SaveOutlined } from '@ant-design/icons'
import CategoryService from './../../services/categoryService';
import ManufacturerService from './../../services/manufacturerService';

const { Step } = Steps;
class AddOrEditProduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
            step: 0,
            categories: [],
            manufacturers: []
        }
    }

    goNext = (values) => {
        this.setState({ ...this.state, product: values, step: 1 })
    }

    goPrevious = () => {
        this.setState({ ...this.state, step: 0 })
    }

    saveProduct = () => {
        console.log('Save product');
    }

    componentDidMount = () => {
        this.loadData();
    }

    loadData = async () => {
        try {
            const categoryService = new CategoryService();
            const cateListResponse = await categoryService.getCategories();

            const manufacturerService = new ManufacturerService();
            const manuListResponse = await manufacturerService.getManufacturer();

            this.setState({
                ...this.state,
                categories: cateListResponse.data,
                manufacturers: manuListResponse.data
            })
        } catch (error) {
            console.log(error);
            message.error('Error : ' + error);
        }
    }

    render() {
        const { step, categories, manufacturers } = this.state;
        const { product } = this.props;

        return (
            <>
                <Divider></Divider>

                <Row>
                    <Col md={24}>
                        <Steps current={step}>
                            <Step title='Basic Information' description='Fill basic Information'></Step>
                            <Step title='Images' description='Choose the list of images'></Step>
                        </Steps>
                    </Col>
                </Row>

                <Row>
                    <Col md={24}>
                        {step === 0 && (<>
                            <Divider></Divider>
                            <ProductForm
                                product={{}}
                                goNext={this.goNext}
                                categories={categories}
                                manufacturers={manufacturers}
                            ></ProductForm>
                        </>)
                        }
                        {step === 1 && (<>
                            <Divider></Divider>
                            <Row>
                                <Col md={24}>
                                    <UploadImage></UploadImage>
                                    <Divider></Divider>
                                    <div>
                                        <Space>
                                            <Button
                                                type='primary'
                                                onClick={this.goPrevious}
                                            >
                                                Previous
                                            </Button>
                                            <Button
                                                type='primary'
                                                onClick={this.saveProduct}
                                            >
                                                {/* Nếu product tồn tại mới kiểm tra xem id có tồn tại hay không */}
                                                <SaveOutlined /> {product && product.id ? 'Update' : 'Save'}
                                            </Button>
                                        </Space>
                                    </div>
                                </Col>
                            </Row>

                        </>)
                        }
                    </Col>
                </Row>
            </>
        )
    }
}

export default withRouter(AddOrEditProduct);
