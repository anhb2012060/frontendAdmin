import React, { Component } from 'react'
import withRouter from '../../helpers/withRouter'
import { Button, Divider, Modal, Skeleton, Space, Table, Tag } from 'antd';
import ContentHeader from '../common/ContentHeader';
import Column from 'antd/es/table/Column';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { connect } from 'react-redux';
import categoryReducer from '../../redux/actions/reducers/categoryReducer';
import { clearCategoryState, getCategories, deleteCategory } from '../../redux/actions/categoryAction';
import CategoryService from '../../services/categoryService';

class ListCategory extends Component {
    constructor() {
        super()

        this.state = {
            category: {}
        };

    }

    componentDidMount = () => {
        this.props.getCategories();
        console.log("did mount");
    }

    componentWillUnmount = () => {
        this.props.clearCategoryState();
        console.log("Will unmount");
    }

    componentDidUpdate(prevProps) {
        if (prevProps.categories !== this.props.categories) {
            this.setState({
                category: {} // Cập nhật lại state nếu cần thiết
            });
        }
    }

    editCategory = (category) => {
        console.log(category);

        const {navigate} = this.props.router;

        navigate("/categories/update/"+ category.id);
    }

    deleteCategory = async () => {
        const { category } = this.state;

        try {
            this.props.deleteCategory(category.id);

            // Refresh danh sách danh mục sau khi xóa
            this.props.getCategories();

            // Cập nhật lại state nếu cần thiết
            this.setState({
                category: {}
            });
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };


    openDeleteConfirmModal = (category) => {
        this.setState({ ...this.state, category: category });

        console.log(category);

        const message = 'Do you want delete the category ' + category.name;
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: message,
            onOk: this.deleteCategory,
            onText: 'Delete',
            cancelText: "Cancel",
        })
    }
    render() {
        const { navigate } = this.props.router;
        const { categories, isLoading } = this.props;

        if (isLoading) {
            return (
                <>
                    <Divider></Divider>
                    <Skeleton active />
                </>
            );
        }
        return (
            <div>
                {/* <ContentHeader navigate={navigate} title="List categories" className="site-page-header"></ContentHeader> */}

                <Divider></Divider>

                <Table dataSource={categories} size='small' rowKey={'id'}>
                    <Column
                        title='Category ID'
                        key={'id'}
                        dataIndex={'id'}
                        width={40}
                        align='center'
                    ></Column>
                    <Column
                        title='Name'
                        key={'name'}
                        dataIndex={'name'}
                    ></Column>
                    <Column
                        title='Status'
                        key={'status'}
                        dataIndex={'status'}
                        width={80}
                        render={(status) => {
                            let color = "volcano"
                            let name = "In-visible"
                            if (status === 'Visible') {
                                color = "green"
                                name = "Visible"
                            }
                            return <Tag color={color}>{name}</Tag>
                        }}
                    ></Column>
                    <Column
                        title='Action'
                        key={'action'}
                        width={150}
                        align='center'
                        render={(_, record) => (
                            <Space size={'middle'}>
                                <Button key={record.key} type='primary' size='small'
                                    onClick={() => this.editCategory(record)}
                                >
                                    <EditOutlined style={{ marginRight: 8 }} /> Edit
                                </Button>
                                <Button key={record.key} type='primary' danger size='small'
                                    onClick={() => this.openDeleteConfirmModal(record)}
                                >
                                    <DeleteOutlined style={{ marginRight: 8 }} /> Delete
                                </Button>
                            </Space>
                        )}
                    ></Column>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    categories: state.categoryReducer.categories,
    isLoading: state.commonReducer.isLoading
})

const mapDispatchToProps = {
    getCategories,
    clearCategoryState,
    deleteCategory,
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ListCategory)
)

