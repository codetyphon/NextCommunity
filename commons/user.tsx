import { SyncOutlined } from "@ant-design/icons"
import { Avatar, Button } from "antd"
import React, { useEffect, useState } from "react"
import User from '../types/user'

const UserSet = ({ onChange }: { onChange: Function }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const rand = async () => {
        setLoading(true)
        const res = await fetch('/api/randomuser')
        const u = await res.json()
        if (u.name != user?.name) {
            setUser(u)
            onChange(u)
            setLoading(false)
        } else {
            rand()
        }
    }
    useEffect(() => {
        rand()
    }, [])
    return (
        <>
            <Avatar src={user?.face} />
            &nbsp;&nbsp;
            {user?.name}
            &nbsp;&nbsp;
            <Button shape="circle" loading={loading} onClick={() => {
                rand()
            }}><SyncOutlined /></Button>
        </>
    )
}
export default UserSet