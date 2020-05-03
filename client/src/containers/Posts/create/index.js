import React, {Component} from "react";
import {Button, Form, Input, message} from "antd";
import RequestService from "../../../services/requests";
import {withRouter} from "react-router-dom";

class CreatePosts extends Component {
    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                RequestService.createPost(values).then(res => {
                    console.log('Received values of form: ', res);
                    if (res) {
                        message.success("با موفقیت ایجاد شد");
                        this.props.history.push('/posts/list')
                    }

                })
            }
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item label="عنوان">
                        {
                            getFieldDecorator('title')(
                                <Input/>
                            )
                        }
                    </Form.Item>
                    <Form.Item label="زیر عنوان">
                        {
                            getFieldDecorator('subTitle')(
                                <Input/>
                            )
                        }
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">ارسال</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default withRouter(Form.create()(CreatePosts));
