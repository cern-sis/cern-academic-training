import { Button, Form, Input } from "antd";
import Title from "antd/lib/typography/Title";
import { useNavigate } from "react-router-dom";
import { login } from "../features/login/login_slice";
import { useAppDispatch } from "../hooks";
import "./login.css";

export const Login = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
  
    const onFinish = ({username, password}: {username: string, password: string}) => {
        if (username == "admin" && password == "admin") {
            dispatch(login(username))
            navigate("/")
        }
        else 
            throw Error("Nope !")
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <div className="login-flex-container">
                <div className="login-form-container">
                    <Title>Login</Title>
                    <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    )
}