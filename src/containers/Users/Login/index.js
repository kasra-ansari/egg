import React, { Component } from 'react';
import { Button, Card, Form, Icon, Input, Row, message } from "antd";
import "./styles.less";
import { batch, connect } from "react-redux";
import sha1 from "sha1";
import md5 from "md5";
import RequestService from "../../../services/requests";
import { setSession } from "../../../redux/app/actions";


const FormItem = Form.Item;

const mapStateToProps = state => (
    {
        isLogin: state.app.isLogin
    }
);

const mapDispatchToProps = dispatch => (
    {
        setSessionAction: data => dispatch(setSession(data)),
    }
)


@connect(mapStateToProps, mapDispatchToProps)
class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            loginStart: false,
            passInput: {
                type: 'password',
                icon: 'eye'
            }
        }
    }

    componentDidMount() {
        // this.userName.focus();

        // if login push to dashboard
        if (this.props.isLogin) this.props.history.push('/');
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({ loading: true })
                const hashedPassword = sha1(md5(values.password))
                console.log("form submit", values, hashedPassword)
                RequestService.login(values.username, hashedPassword, cb => {
                    console.log("login cb", cb)
                    this.setState({ loading: false })

                    if (cb && cb.status === 200) {
                        if (cb.data.status === 'success') {
                            batch(() => {
                                this.props.setSessionAction(cb.data.sid);
                                this.props.history.push('/stocks');
                            })

                        } else {
                            message.error(cb.data.message)
                        }
                    } else {
                        message.error('متاسفانه خطایی در سرور رخ داده است')
                    }
                })

            }
        });
    };

    handleFormClick = e => {
        console.log("CLICK FORM", e)
        this.setState({
            loginStart: true
        })
    }

    handleShowPassword = e => {
        e.preventDefault();
        const currentState = this.state.passInput
        this.setState({
            passInput: {
                type: currentState.type === 'password' ? 'text' : 'password',
                icon: currentState.icon === 'eye' ? 'eye-invisible' : 'eye'
            }
        })

    }


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <>
                <div className={`${(this.state.loginStart && 'login-bg-with-animation') || 'login-bg'}`} />
                <Row type="flex" align="middle" justify="center" className="login-container">
                    <Card bordered={false} style={{ borderRadius: '10px' }}>
                        <div className="logo-type">
                            <img alt="کارگزاری تدبیرگران فردا" src="/login-quantra-logo-light.png" />
                        </div>
                        <Form onSubmit={this.handleSubmit} className="login-form" onClick={this.handleFormClick}>
                            <FormItem>
                                <div style={{ direction: 'ltr' }}>
                                    {getFieldDecorator('username', {
                                        rules: [
                                            { required: true, message: 'لطفا نام کاربری را وارد نمایید' },
                                        ],
                                    })(
                                        <Input className={`dir-left ${this.state.loginStart && 'white-login-input'}`}
                                            placeholder="نام کاربری"
                                            size="large"
                                            ref={ref => this.userName = ref}
                                            prefix={<Icon className="login-icon-color" type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        />
                                    )}
                                </div>
                            </FormItem>
                            <FormItem>
                                <div style={{ direction: 'ltr' }}>
                                    {getFieldDecorator('password', {
                                        rules: [
                                            { required: true, message: 'لطفا کلمه عبور را وارد نمایید' },
                                        ],
                                    })(
                                        <Input className={`dir-left ${this.state.loginStart && 'white-login-input'}`}
                                            type={this.state.passInput.type}
                                            size="large"
                                            placeholder="رمز عبور"
                                            prefix={<><Icon theme="filled" className="login-icon-color" type="lock" style={{ color: 'rgba(0,0,0,.25)' }} /><Icon theme="filled" className="login-icon-color" type={this.state.passInput.icon} onClick={this.handleShowPassword} /></>}
                                        />
                                    )}
                                </div>
                            </FormItem>
                            <FormItem>
                                {
                                    this.state.loginStart &&
                                    <Button icon="login" loading={this.state.loading} type="primary" htmlType="submit"
                                        className="login-form-button" ghost>
                                        ورود
                                    </Button>
                                }
                            </FormItem>

                        </Form>
                    </Card>
                </Row>
            </>
        )
    }
}

export default Form.create()(Login);
