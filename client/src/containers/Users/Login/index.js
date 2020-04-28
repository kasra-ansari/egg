import React, {Component} from 'react';
import {Button, Card, Form, Icon, Input, Row, message} from "antd";
import "./styles.less";
import {batch, connect} from "react-redux";
import RequestService from "../../../services/requests";
import {setSession, setToken} from "../../../redux/app/actions";
import Api from "../../../services/Api";


const FormItem = Form.Item;

const mapStateToProps = state => (
    {
        isLogin: state.app.isLogin
    }
);

const mapDispatchToProps = dispatch => (
    {
        setTokenAction: data => dispatch(setToken(data)),
    }
)


@connect(mapStateToProps, mapDispatchToProps)
class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        }
    }

    componentDidMount() {
        this.userName.focus();

        // if login push to dashboard
        if (this.props.isLogin) this.props.history.push('/');
    }



    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log("submit value", values)
                RequestService.login(values).then(res => {
                    console.log("login res", res)
                    if (res) {
                        this.props.setTokenAction(res.data.data.token)
                    }
                })
            }
        });
    };


    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Row type="flex" align="middle" justify="center" className="login-container">
                <Card bordered={false} style={{borderRadius: '10px'}}>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem label="موبایل">
                            <div style={{direction: 'ltr'}}>
                                {getFieldDecorator('mobile', {
                                    rules: [
                                        {required: true, message: 'لطفا نام کاربری را وارد نمایید'},
                                    ],
                                })(
                                    <Input className="dir-left"
                                           ref={ref => this.userName = ref}
                                           prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    />
                                )}
                            </div>
                        </FormItem>
                        <FormItem>
                            <Button loading={this.state.loading} type="primary" htmlType="submit"
                                    className="login-form-button">
                                ورود
                            </Button>
                        </FormItem>

                    </Form>
                </Card>
            </Row>
        )
    }
}

export default Form.create()(Login);
