import 'antd/dist/antd.css';
import '../styles/globals.css'
import { AppProps } from 'next/app';
import { Layout } from 'antd';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
function MyApp({ Component, pageProps }: AppProps) {
  return <Layout>
    <Header className="header" style={{ background: '#f0f2f5' }}><div className="logo" /><h1>Community</h1></Header>
    <Content><Component {...pageProps} /></Content>
    <Footer style={{ textAlign: 'center' }}>©2021 Created by <a href="https://github.com/codetyphon/NextCommunity" target='_blank'>NextCommunity</a> (anonymous) version</Footer>
  </Layout>
}
export default MyApp
