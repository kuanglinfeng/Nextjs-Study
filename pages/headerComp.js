import React, { useState } from 'react'
import Head from 'next/head'

export default function HeaderComp() {
  return (
    <Head>
      <title>我是一个公共的header，并且我进行了SEO</title>
      <meta charSet="utf-8" />
    </Head>
  )
}
