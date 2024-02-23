import React, { Component } from 'react'
import withRouter from '../../helpers/withRouter';
import { Button, Col, Divider, Form, Input, Popconfirm, Row, Select } from 'antd';
import { insertCategory, getCategory, clearCategory, updateCategory, clearCategoryState } from '../../redux/actions/categoryAction';
import { connect } from 'react-redux';
import categoryReducer from '../../redux/actions/reducers/categoryReducer';
import commonReducer from '../../redux/actions/reducers/commonReducer';
class AddOrEditCategory extends Component {
    formRef = React.createRef();
    constructor(props) {
        super(props);

        this.state = {
            category: {
                id: '',
                name: '',
                status: 'Visible'
            },
        }
    }
    componentDidMount = () => {
        const { id } = this.props.router.params
        if (id) {
            this.props.getCategory(id);
        } else {
            this.props.clearCategory();
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.category && prevState.category.id !== nextProps.category.id) {
            return {
                ...prevState, category: nextProps.category
            }
        } else if (!nextProps.category) {
            return {
                ...prevState,
                category: { id: '', name: '', status: 'Visible' }
            }
        }

        return null;
    }

    confirmUpdate = () => {
        console.log("Update category");
        this.formRef.current.submit();
    }

    onSubmitForm = (values) => {

        console.log(values);
        const { navigate } = this.props.router;
        const { id } = this.state.category;

        if (!id) {
            this.props.insertCategory(values, navigate);
        } else {
            this.props.updateCategory(id, values, navigate);
        }
    }

    render() {
        const { navigate } = this.props.router;

        const { isLoading } = this.props;

        const { category } = this.state;
        return (
            <div>
                {/* <ContentHeader navigate={navigate} title="Add New Category" className="site-page-header"></ContentHeader> */}

                <Divider></Divider>
                <Form layout='vertical' className='form' onFinish={this.onSubmitForm} key={category.id} ref={this.formRef}>
                    <Row>
                        <Col md={12} >
                            <Form.Item label="Category ID" name="categoryId" initialValue={category.id}>
                                <Input readOnly></Input>
                            </Form.Item>
                            <Form.Item label="Name" name="name" rules={[{ required: true, min: 2 }]} initialValue={category.name}>
                                <Input></Input>
                            </Form.Item>
                            <Form.Item label="Status" name="status" initialValue={category.status === 'Visible' ? "0" : "1"}>
                                <Select>
                                    <Select.Option value="0">Visible</Select.Option>
                                    <Select.Option value="1">In-Visible</Select.Option>
                                </Select>
                            </Form.Item>
                            <Divider></Divider>
                            {!category.id && (
                                <Button htmlType='submit' type='primary' style={{ float: 'right' }}
                                    loading={isLoading} onClick={() => console.log(this.state.category)}
                                >
                                    Save
                                </Button>)}
                            {category.id  && (
                                <Popconfirm
                                    title="Update the task"
                                    description="Are you sure update this category ?"
                                    onConfirm={this.confirmUpdate}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button  type='primary' style={{ float: 'right' }}
                                        loading={isLoading}
                                    >
                                        Update
                                    </Button>
                                </Popconfirm>
                            )}
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    category: state.categoryReducer.category,
    isLoading: state.commonReducer.isLoading,
})

const mapDispatchToProps = {
    insertCategory,
    getCategory,
    clearCategory,
    updateCategory,
    clearCategoryState
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AddOrEditCategory)
);
