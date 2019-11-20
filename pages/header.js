import React, { useState } from 'react'
import HeaderComp from './headerComp'
import '../public/index.css'
import { Button } from 'antd'

export default function Header() {
  return (
    <>
      <HeaderComp></HeaderComp>
      <div>我是一个header</div>
      <Button>我是按钮</Button>
    </>
  )
}
