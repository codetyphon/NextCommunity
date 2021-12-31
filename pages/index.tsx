import { Card, Input, Button, Spin, Modal, Select, List, Avatar, Badge, Breadcrumb } from 'antd'
import React, { useEffect, useState } from 'react'
import {
  MessageOutlined
} from '@ant-design/icons';
import moment from 'moment';
import Editor from '../commons/edit';
export default function Home() {

  const [dataSource, setDataSource] = useState<any>([])
  const [spinning, setSpinning] = useState<boolean>(false)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)

  const getTopics = async () => {
    setSpinning(true)
    const res = await fetch("/api/topics", {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    const items = await res.json()
    console.log(items)
    setDataSource(items)
    setSpinning(false)
  }
  useEffect(() => {
    getTopics()
  }, [])
  return (
    <Spin tip="Loading..." spinning={spinning}>
      <Card>
        <Breadcrumb>
          <Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
        </Breadcrumb>
      </Card>
      <Card title={<h2>Topics</h2>} extra={<Button onClick={() => {
        setShowModal(true)
      }} type="primary">Post a Question</Button>}>
        <List
          dataSource={dataSource}
          renderItem={(item: any) => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={<Avatar src={item?.author?.face} size={60} />}
                title={<a href={`/topic/${item?._id}`}>{item?.title}</a>}
                description={<p>by {item?.author?.name} {moment(item?.time).format("YYYY-MM-DD HH:MM")}</p>}
              />
              <div>
                <Badge size="default" count={item?.numOfreplys || 0}><MessageOutlined style={{ fontSize: '28px' }} /></Badge>
              </div>
            </List.Item>
          )} />
      </Card>
      <Modal title="Post" visible={showModal}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        onCancel={() => { setShowModal(false) }}
      >
        <Editor onSubmit={async (data: any) => {
          console.log(data)
          setSubmitting(true)
          const res = await fetch('/api/post', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          const json = await res.json()
          console.log(json)
          setSubmitting(false)
          getTopics()
          setShowModal(false)
        }} submitting={submitting} showTitle={true} buttonTitle="Post" />
      </Modal>
    </Spin>
  )
}
