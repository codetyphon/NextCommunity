import { Card, Breadcrumb } from 'antd'
import React, { useEffect, } from 'react'

export default function Post() {
    useEffect(() => {
    }, [])
    return (
        <>
            <Card>
                <Breadcrumb>
                    <Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
                    <Breadcrumb.Item>
                        about
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Card>
            <Card title="about">
                <p></p>
            </Card>
        </>
    )
}
