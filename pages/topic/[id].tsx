import { Card, Space, Input, Table, Button, Spin, Modal, Select, List, Avatar, Badge, Comment, Breadcrumb } from 'antd'
import React, { useEffect, useState, useMemo } from 'react'
import { message } from 'antd';
import {
  DownloadOutlined,
  DeleteOutlined,
  MessageOutlined
} from '@ant-design/icons';
import Editor from '../../commons/edit';
import { title } from 'process';
import moment from 'moment';
const { Search } = Input;
const { Option } = Select;
export default function Topic({ id }: { id: string }) {

  const [topic, setTopic] = useState<any | null>(null)
  const [spinning, setSpinning] = useState<boolean>(false)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)

  const getTopic = async (id: string) => {
    setSpinning(true)
    const res = await fetch(`/api/topic/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    const topic = await res.json()
    console.log(topic)
    setTopic(topic)
    setSpinning(false)
  }
  const onSearch = (x: any) => {

  }
  useEffect(() => {
    getTopic(id)
  }, [])
  return (
    <Spin tip="Loading..." spinning={spinning}>
      <Card>
        <Breadcrumb>
          <Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
          <Breadcrumb.Item>
            topic
          </Breadcrumb.Item>
        </Breadcrumb>
      </Card>
      <Card title={<h2>{topic?.title}</h2>}>
        <Avatar src={topic?.author?.face} size={30} /> {moment(topic?.time).format("YYYY-MM-DD HH:MM")}
      </Card>
      <Card>
        {topic?.text}
      </Card>
      <Card title={<h2>{topic?.replys?.length || 0} Replies</h2>} extra={<Button onClick={() => {
        setShowModal(true)
      }} type="primary">Reply</Button>}>
        <List
          dataSource={topic?.replys}
          renderItem={(item: any) => (
            <List.Item key={item?.id}>
              <Comment
                // actions={[<span key={`comment-list-reply-to-${item?._id}`}>Reply to</span>]}
                author={item?.author?.name}
                avatar={item?.author?.face}
                content={item?.text}
                datetime={moment(item?.time).format("YYYY-MM-DD HH:MM")}
              />
            </List.Item>
          )} />
      </Card>
      <Card>
        <Modal title="Reply" visible={showModal}
          okButtonProps={{ hidden: true }}
          cancelButtonProps={{ hidden: true }}
          onCancel={() => { setShowModal(false) }}
        >
          <Editor onSubmit={async (data: any) => {
            console.log(data)
            setSubmitting(true)
            const res = await fetch('/api/reply', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(Object.assign(data, { topicId: id }))
            })
            const json = await res.json()
            console.log(json)
            setSubmitting(false)
            getTopic(id)
            setShowModal(false)
          }} submitting={submitting} showTitle={false} value={{}} buttonTitle="Reply" />
        </Modal>
      </Card>
    </Spin >
  )
}

Topic.getInitialProps = ({ query: { id } }: any) => {
  return { id }
}