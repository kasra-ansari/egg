import React, {Component} from "react";
import {connect} from "react-redux";
import {Form, Input, Modal, Radio, message} from "antd";
import RequestService from "../../../../services/requests";
import "./styles.less";

const mapStateToProps = (state) => (
    {
        settings: state.app.settings
    }
)

@connect(mapStateToProps)
class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        }
    }

    handleClick = e => {
        console.log("clicked", e)
        this.setState({
            visible: true
        })
    }

    handleCancel = () => {
        this.setState({
            visible: false
        })
    }

    formRender = () => {
        const {getFieldDecorator} = this.props.form;
        let array = [];
        //eslint-disable-next-line
        this.props.settings.length > 0 && this.props.settings.map((item, index) => {
            let elm;
            switch (item.type) {
                case 'string':
                    elm = (
                        <Form.Item key={index} label={item.name}>
                            {
                                getFieldDecorator(item.key, {
                                    initialValue: item.default
                                })(
                                    <Input/>
                                )
                            }
                        </Form.Item>
                    )
                    array.push(elm);
                    break;

                case 'radio':
                    elm = (
                        <Form.Item key={index} label={item.name}>
                            {getFieldDecorator(item.key, {
                                initialValue: item.default
                            })(
                                <Radio.Group>
                                    {
                                        item.data.map((innerItem, i) => (
                                            <Radio key={i} value={Object.keys(innerItem)[0]}>{Object.values(innerItem)[0]}</Radio>
                                        ))
                                    }
                                </Radio.Group>
                            )}
                        </Form.Item>
                    );
                    array.push(elm)
                    break;
                default:
            }
        })

        return array;
    };

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const params = () => {
                    let str = '';
                    for (let [key, value] of Object.entries(values)) {
                        str += `&${key}=${value}`
                    }

                    return str;
                };

                RequestService.setSetting(params(), cb => {
                    console.log("submitted",cb)
                    if (cb.data.status === 'success') {
                        message.success('تنظیمات با موفقیت انجام شد.');
                        this.setState({
                            visible: false
                        })
                    } else {
                        message.error(cb.data.message)
                    }
                })


            }
        })
    }

    render() {
        console.log("SETTINGS", this.props)
        return (
            <>
                <span onClick={this.handleClick}>تنظیمات</span>
                <Modal
                    className="modal-rtl setting-modal"
                    title="تنظیمات"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onOk={this.handleSubmit}
                >
                    <Form>
                        {this.formRender()}
                    </Form>
                </Modal>
            </>
        )
    }
}

export default Form.create()(Settings);
