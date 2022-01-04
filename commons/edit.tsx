import { message } from "antd";
import { Button, Form, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { useEffect } from "react";
import User from "../types/user";
import UserSet from "./user";

const Editor = ({ onSubmit, submitting, buttonTitle, showTitle }: {
    onSubmit: Function,
    submitting: any,
    showTitle: boolean,
    buttonTitle: string
}) => {
    const [title, setTitle] = useState<string>("")
    const [text, setText] = useState<string>("")
    const [user, setUser] = useState<User | null>(null)
    useEffect(() => {
        if (!submitting) {
            setTitle("")
            setText("")
        }
    }, [submitting])
    return (
        <>
            <Form.Item>
                <UserSet onChange={(user: User) => {
                    setUser(user)
                }} />
            </Form.Item>
            {
                showTitle && <Form.Item>
                    <Input placeholder="Enter a subject" value={title} onChange={(e) => {
                        setTitle(e.target.value)
                    }} />
                </Form.Item>
            }
            <Form.Item>
                <TextArea rows={4} onChange={(e) => {
                    setText(e.target.value)
                }} value={text} />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" loading={submitting} onClick={() => {
                    if (showTitle) {
                        if (title.length === 0) {
                            message.error("title cannot be null or empty")
                            return false
                        }
                    }
                    if (text.length === 0) {
                        message.error("content cannot be null or empty")
                        return false
                    }
                    onSubmit(Object.assign({ time: Date.now() }, { text: text }, { author: { name: user.name, face: user.face } }, showTitle ? { title: title } : {}))
                    setTitle("")
                    setText("")
                }} type="primary">{buttonTitle}</Button>
            </Form.Item>
        </>)
}

export default Editor