import React, { Component } from 'react'
class ContentHeader extends Component {
  
  render() {
    const { navigate, title, className } = this.props;
    return (
      <div>
        {/* Trong phiên bản mới thì <PageHeader></PageHeader> không được hổ trợ nên phải tìm thay thế mới */}
                {/* <PageHeaderWrapper 
                className={className}
                style={{marginLeft : 0}}
                title={title}
                onBack={() => navigate(-1)}></PageHeaderWrapper> */}
      </div>
    )
  }
}

export default ContentHeader
