import React from 'react'
import Link from 'next/link'

export default function B() {
  return (
    <div>
      <h1>这是b页面</h1>
      <Link href='/'><a>返回首页</a></Link>
    </div>
  )
}
