import { Button, Checkbox, Col, DatePicker, Divider, Form, Input, InputNumber, Row, Select, Upload, message } from 'antd';
import React, { Component } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { MdCategory } from "react-icons/md";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

class ProductForm extends Component {
    form = React.createRef();

    constructor(props) {
        super(props)

        this.state = {
            descriptionCkData: ''
        }
    }

    goNext = () => {
        this.form.current
            //Kiểm tra tính hợp lệ trên form
            .validateFields()
            .then((values) => {
                console.log(values);

                //Nếu dữ liệu hợp lệ thì tiến hành lấy dữ liệu, tạo đối tượng dữ liệu
                const newValues = {
                    ...values,
                    description: this.state.descriptionCkData,
                    manufacturerDate: values.manufacturerDate.format('YYYY-MM-DD'),
                    // image: values.image[0].fileName ? values.image[0] : values.image[0].response
                }
                this.props.goNext(newValues)
            })
            .catch((info) => {
                console.log(info);
                message.error('Date validate Error, Please check your input fields')
            })
        this.props.goNext({});
    };
    render() {
        const { product } = this.props;
        const { descriptionCkData } = this.state;
        const { categories, manufacturers } = this.props;
        return (
            <>
                <Form
                    layout='vertical'
                    className='form'
                    size='middle'
                    ref={this.form}
                >
                    <Row>
                        <Col md={12}>
                            <Form.Item label='Product Id' name={'id'} initialValue={product.id}
                            >
                                <Input readOnly></Input>
                            </Form.Item>
                            <Form.Item
                                label='Name'
                                name={'name'}
                                initialValue={product.name}
                                required
                                rules={[{ required: true, min: 2 }]}
                                //Tạo đối tượng thêm chỉ dấu vào xem đối tượng nhập vào có hợp lệ hay không ?
                                hasFeedback
                            >
                                <Input></Input>
                            </Form.Item>
                            <Form.Item
                                label='Quantity'
                                name={'quantity'}
                                initialValue={product.quantity}
                                required
                                rules={[{ required: true }]}
                                //Tạo đối tượng thêm chỉ dấu vào xem đối tượng nhập vào có hợp lệ hay không ?
                                hasFeedback
                            >
                                <InputNumber
                                    min={0}
                                    formatter={(value) => {
                                        return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                                    }}
                                    parser={(value) => value.replace(/$\s?|(,*)/g, '')}
                                    style={{ width: '100%' }}
                                ></InputNumber>
                            </Form.Item>
                            <Form.Item
                                label='Price'
                                name={'price'}
                                initialValue={product.price}
                                rules={[{ required: true }]}
                                //Tạo đối tượng thêm chỉ dấu vào xem đối tượng nhập vào có hợp lệ hay không ?
                                hasFeedback
                            >
                                <InputNumber
                                    min={0}
                                    addonBefore={"$"}
                                    formatter={(value) => {
                                        return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                                    }}
                                    parser={(value) => value.replace(/$\s?|(,*)/g, '')}
                                    style={{ width: '100%' }}
                                ></InputNumber>
                            </Form.Item>
                            <Form.Item
                                label='Discount'
                                name={'discount'}
                                initialValue={product.discount}
                                rules={[{ required: true }]}
                                //Tạo đối tượng thêm chỉ dấu vào xem đối tượng nhập vào có hợp lệ hay không ?
                                hasFeedback
                            >
                                <InputNumber
                                    min={0}
                                    max={100}
                                    addonAfter={"%"}
                                    formatter={(value) => {
                                        return `${value}`
                                    }}
                                    parser={(value) => value.replace('%', '')}
                                    style={{ width: '100%' }}
                                ></InputNumber>
                            </Form.Item>
                            <Row>
                                <Col md={12}>
                                    <Form.Item
                                        label='Featured'
                                        name={'isFeatured'}
                                        initialValue={product.isFeatured}
                                        //Tạo đối tượng thêm chỉ dấu vào xem đối tượng nhập vào có hợp lệ hay không ?
                                        hasFeedback
                                    >
                                        <Checkbox></Checkbox>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={1}>
                            <Divider type='vertical' style={{ height: '100%' }}></Divider>
                        </Col>
                        <Col md={11}>
                            <Form.Item
                                label='Status'
                                name={'status'}
                                initialValue={product.status}
                                rules={[{ required: true }]}
                                //Tạo đối tượng thêm chỉ dấu vào xem đối tượng nhập vào có hợp lệ hay không ?
                                hasFeedback
                            >
                                <Select placeholder='Select Product Status'>
                                    <Select.Option value='InStock'>In Stock</Select.Option>
                                    <Select.Option value='OutOfStock'>Out of Stock</Select.Option>
                                    <Select.Option value='Discontinue'>Discontinue</Select.Option>
                                    <Select.Option value='OnBackOrder'>On BackOrder</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label='Category'
                                name={'category'}
                                rules={[{ required: true }]}
                                //Tạo đối tượng thêm chỉ dấu vào xem đối tượng nhập vào có hợp lệ hay không ?
                                hasFeedback
                                initialValue={product.categoryId}
                            >
                                <Select placeholder='Select Category'>
                                    {categories && categories.map((item) => (
                                        <Select.Option value={item.id} key={'cate' + item.id}>
                                            {item.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label='Manufacturer'
                                name={'manufacturerId'}
                                rules={[{ required: true }]}
                                //Tạo đối tượng thêm chỉ dấu vào xem đối tượng nhập vào có hợp lệ hay không ?
                                hasFeedback
                                initialValue={product.manufacturerId}
                            >
                                <Select placeholder='Select Manufacturer'>
                                    <Select.Option value='InStock'>FPT</Select.Option>
                                    <Select.Option value='OutOfStock'>Dell</Select.Option>
                                    <Select.Option value='Discontinue'>Asus</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label='Manufacturer Date'
                                name={'manufacturerDate'}
                                rules={[{ required: true }]}
                                //Tạo đối tượng thêm chỉ dấu vào xem đối tượng nhập vào có hợp lệ hay không ?
                                hasFeedback
                                initialValue={product.manufacturerDate}
                            >
                                <DatePicker></DatePicker>
                            </Form.Item>
                            <Form.Item
                                label='Main Image'
                                name={'image'}
                                rules={[{ required: true }]}
                                //Tạo đối tượng thêm chỉ dấu vào xem đối tượng nhập vào có hợp lệ hay không ?
                                hasFeedback
                                initialValue={product.image ? [{ ...product.image }] : []}
                            >
                                <Upload listType='picture' accept='.jpg,.png,.gif' maxCount={1}>
                                    <Button icon={<UploadOutlined />}></Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={24}>
                            <Form.Item
                                label='Brief'
                                name={'brief'}
                                rules={[{ required: true }]}
                                //Tạo đối tượng thêm chỉ dấu vào xem đối tượng nhập vào có hợp lệ hay không ?
                                hasFeedback
                                initialValue={product.brief}
                            >
                                <ReactQuill theme='snow'></ReactQuill>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={24}>
                            <Form.Item
                                label='Description'
                                name={'description'}
                                rules={[{ required: true }]}
                                //Tạo đối tượng thêm chỉ dấu vào xem đối tượng nhập vào có hợp lệ hay không ?
                                hasFeedback
                                initialValue={descriptionCkData}
                            >
                                <CKEditor editor={ClassicEditor}
                                    data={descriptionCkData}
                                    onReady={(editor) => {
                                        editor.editing.view.change((writer) => {
                                            writer.setStyle('height', '200px', editor.editing.view.document.getRoot())
                                        })
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData()
                                        this.setState({ ...this.state, descriptionCkData: data })
                                    }}
                                ></CKEditor>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={24}>
                            <Button
                                type='primary'
                                onClick={this.goNext}
                                style={{ float: 'right' }}
                            >
                                Next
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </>
        )
    }
}

export default ProductForm
