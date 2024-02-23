import { Button, Divider, Form, Image, Input, Modal, Radio, Upload } from 'antd';
import React, { Component, createRef } from 'react'
import withRouter from '../../helpers/withRouter';
import ManufacturerService from './../../services/manufacturerService';

class ManufacturerForm extends Component {

    form = createRef();

    constructor(props) {
        super(props)

        this.state = {
            manufacturer: {
                id: '',
                name: '',
                logo: ''
            },
            previewImage: '',
            previewVisible: false
        }
    }

    handlePreview = (file) => {
        console.log(file);
        if (file.thumbUrl) {
            this.setState({
                ...this.state,
                previewImage: file.thumbUrl,
                previewVisible: true,
            });
        }
    }

    handleRemove = (value) => {
        console.log(value);
    }

    normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        if (e.fileList.length > 1) {
            return [e.fileList[1]]
        }
        return e && e.fileList;
    }

    render() {
        const { open, onCreate, onCancel } = this.props;
        const { manufacturer } = this.props;
        let title = "Create a new manufacturer"
        let okText = 'Create'
        if (manufacturer.id) {
            title = "Update the manufacturer";
            okText = "Update"
        }
        const logoUrl = ManufacturerService.getManufacturerLogoUrl(manufacturer.logo);
        const initialLogo = {
            url: logoUrl, //Dùng để hiển thị logo
            uid: manufacturer.logo //Dùng để nhận diện logo
        }
        return (

            <Modal
                open={open}
                title={title}
                okText={okText}
                cancelText="Cancel"
                onCancel={onCancel}
                onOk={() => {
                    this.form.current
                        .validateFields()
                        .then((values) => {
                            this.form.current.resetFields();
                            onCreate(values);
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form
                    ref={this.form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{
                        modifier: 'public',
                    }}
                //Nếu có gì thay đổi thì React sẽ cập nhật lại form, nếu không có thì form nó chỉ hiển thị sản phẩm mình chọn đầu tiên thôi, chớ chọn sản phẩm mới thì nó cũng không cập nhật
                key={"f" + manufacturer.id + manufacturer.name}
                >
                    <Form.Item label="Manufacturer ID" name={'id'} initialValue={manufacturer.id}>
                        <Input readOnly></Input>
                    </Form.Item>
                    <Form.Item label="Name" name={'name'} initialValue={manufacturer.name}
                        rules={[{ required: true, min: 2 }]}
                    >
                        <Input></Input>
                    </Form.Item>
                    <Form.Item
                        label="Logo"
                        name={'logoFile'}
                        initialValue={[initialLogo]}
                        rules={[{ required: true }]}
                        valuePropName='fileList'
                        getValueFromEvent={this.normFile}
                    >
                        <Upload
                            listType='picture'
                            onPreview={this.handlePreview}
                            onRemove={this.handleRemove}
                            accept=".jpg,.png,.gif"
                            maxCount={1}
                            beforeUpload={() => false}
                        >
                            <Button type='primary'>Browse</Button>
                        </Upload>
                    </Form.Item>
                    <Divider></Divider>
                    {this.state.previewVisible &&
                        (<Image src={this.state.previewImage}
                            style={{ width: 200 }}
                            preview={{ visible: false }}
                        ></Image>)
                    }
                </Form>
            </Modal>
        )
    }
}

export default ManufacturerForm;