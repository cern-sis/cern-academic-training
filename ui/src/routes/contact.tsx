import React, { Fragment, useEffect } from "react";
import {
    Layout,
    Form,
    Input,
    Button,
    Typography,
    Divider,
    Row,
    Col,
    Card,
} from "antd";
import { Helmet } from "react-helmet";
import { MailOutlined, UserOutlined } from "@ant-design/icons";

import "../App.css";
import AT_HEADER from "../components/AT_HEADER";
import CERN_FOOTER from "../components/CERN_FOOTER";
import CERN_TOOLBAR from "../components/CERN_TOOLBAR";
import { HOME_PAGE_METATAG_CONTENT } from "../common/constants";
import { getReveal } from "../events/reveal";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

function Contact() {
    window.scrollTo(0, 0);

    useEffect(() => {
        const revealFunc = getReveal();
        revealFunc();
    }, []);

    const onFinish = (values: any) => {
        const { name, email, message } = values;
        const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        const mailtoLink = `mailto:atc-contact@cern.ch?subject=${encodeURIComponent(
            "Contact from CERN Academic Training"
        )}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;
    };

    const inputStyle = {
        background: "rgba(0, 0, 0, 0.2)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        color: "#fff",
        borderRadius: "10px",
    };

    return (
        <Layout className="layout">
            <Helmet>
                <meta name="description" content={HOME_PAGE_METATAG_CONTENT} />
                <title>Contact | CERN Academic Training</title>
            </Helmet>
            <CERN_TOOLBAR />

            <AT_HEADER />

            <Content id="contact-content">
                <Fragment>
                    <div className="content-lists" style={{ paddingTop: "140px", width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
                        <div className="atc-title reveal" style={{ textAlign: "center" }}>
                            <Title level={2}>GET IN TOUCH</Title>
                            <Divider className="divider" />
                            <Paragraph style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "1.2rem", maxWidth: "800px", margin: "10px auto 40px", padding: "0 20px" }}>
                                Have questions about the CERN Academic Training?
                            </Paragraph>
                        </div>

                        <Row justify="center" style={{ marginBottom: "100px", padding: "0 20px" }}>
                            <Col xs={24} sm={22} md={20} lg={16} xl={14}>
                                <Card
                                    className="reveal"
                                    style={{
                                        background: "rgba(255, 255, 255, 0.03)",
                                        border: "1px solid rgba(255, 255, 255, 0.08)",
                                        borderRadius: "30px",
                                        backdropFilter: "blur(12px)",
                                        boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
                                    }}
                                    bodyStyle={{ padding: "40px" }}
                                >
                                    <Form
                                        layout="vertical"
                                        onFinish={onFinish}
                                        autoComplete="off"
                                        requiredMark={false}
                                    >
                                        <Row gutter={24}>
                                            <Col xs={24} md={12}>
                                                <Form.Item
                                                    label={<span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: "0.9rem", letterSpacing: "1px" }}>NAME</span>}
                                                    name="name"
                                                    rules={[{ required: true, message: 'Please enter your name' }]}
                                                >
                                                    <Input
                                                        prefix={<UserOutlined style={{ color: "rgba(255,255,255,0.3)" }} />}
                                                        placeholder="Your Name"
                                                        size="large"
                                                        className="dark-input"
                                                        style={inputStyle}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} md={12}>
                                                <Form.Item
                                                    label={<span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: "0.9rem", letterSpacing: "1px" }}>EMAIL</span>}
                                                    name="email"
                                                    rules={[
                                                        { required: true, message: 'Please enter your email' },
                                                        { type: 'email', message: 'Please enter a valid email' }
                                                    ]}
                                                >
                                                    <Input
                                                        prefix={<MailOutlined style={{ color: "rgba(255,255,255,0.3)" }} />}
                                                        placeholder="Your Email"
                                                        size="large"
                                                        className="dark-input"
                                                        style={inputStyle}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Form.Item
                                            label={<span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: "0.9rem", letterSpacing: "1px" }}>MESSAGE</span>}
                                            name="message"
                                            rules={[{ required: true, message: 'Please enter your message' }]}
                                        >
                                            <Input.TextArea
                                                rows={8}
                                                placeholder="Type your message here..."
                                                size="large"
                                                className="dark-input"
                                                style={{ ...inputStyle, paddingLeft: "11px" }}
                                            />
                                        </Form.Item>

                                        <Form.Item style={{ marginBottom: 0 }}>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                size="large"
                                                block
                                                style={{
                                                    height: "64px",
                                                    fontSize: "18px",
                                                    borderRadius: "15px",
                                                    background: "linear-gradient(135deg, #0093e9 0%, #0033a0 100%)",
                                                    border: "none",
                                                    marginTop: "20px",
                                                    boxShadow: "0 10px 25px rgba(0,51,160,0.4)",
                                                    letterSpacing: "2px"
                                                }}
                                            >
                                                SEND MESSAGE
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Fragment>

                {/* Anti-Gravity Style Overrides to ensure no white backgrounds */}
                <style dangerouslySetInnerHTML={{
                    __html: `
          .dark-input {
            background-color: rgba(0, 0, 0, 0.4) !important;
            transition: all 0.3s ease;
          }
          .dark-input:hover, .dark-input:focus {
            background-color: rgba(0, 0, 0, 0.6) !important;
            border-color: #0093e9 !important;
            box-shadow: 0 0 0 2px rgba(0, 147, 233, 0.2) !important;
          }
          .dark-input input {
            background-color: transparent !important;
            color: #fff !important;
          }
          .ant-form-item-label > label {
            color: rgba(255, 255, 255, 0.85) !important;
          }
          .ant-input-affix-wrapper-focused {
            box-shadow: 0 0 0 2px rgba(0, 147, 233, 0.2) !important;
          }
          .ant-input-affix-wrapper > input.ant-input {
             background-color: transparent !important;
          }
        `}} />
            </Content>

            <CERN_FOOTER />
        </Layout>
    );
}

export default Contact;
