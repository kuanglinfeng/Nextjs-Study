import React from 'react'
import { withRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'

function Av(props) {
  // list: ["Flinn", "Leon", "Mary"]
  const { router, list } = props
  return (
    <div>
      <h1>野麻地 我是{router.query.name}</h1>
      <Link href="/">
        <a>返回首页</a>
      </Link>
      {list.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </div>
  )
}

// 一般用于发异步请求获取数据
Av.getInitialProps = async function () {
  const res = await axios.get('http://mock-api.com/DmgvxyKQ.mock/list')
  return res.data.data
  // const p = new Promise(function(resolve) {
  //   axios.get('http://mock-api.com/DmgvxyKQ.mock/list').then(res => {
  //     resolve(res.data.data)
  //   })
  // })
  // return await p
}






export default withRouter(Av)
