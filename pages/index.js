import React from 'react'
import Link from 'next/link'
import Router from 'next/router'

export default function Index() {

  // 1.路由开始变化，参数为:  /av?name=深田
  Router.events.on('routeChangeStart', (...args) => {
    console.log('1.路由开始变化，参数为: ', ...args)
  })

  // 3.浏览器 history 模式开始切换，参数为:  /av?name=深田
  Router.events.on('beforeHistoryChange', (...args) => {
    console.log('3.浏览器 history 模式开始切换，参数为: ', ...args)
  })

  // 2.路由变化完成，参数为:  /av?name=深田
  Router.events.on('routeChangeComplete', (...args) => {
    console.log('2.路由变化完成，参数为: ', ...args)
  })

  // 4.开始切换 hash 值但是没有切换页面路由，参数为:  /#test
  Router.events.on('hashChangeStart', (...args) => {
    console.log('4.开始切换 hash 值但是没有切换页面路由，参数为: ', ...args)
  })

  // 5.完成切换 hash 值但是没有切换页面路由，参数为:  /#test
  Router.events.on('hashChangeComplete', (...args) => {
    console.log('5.完成切换 hash 值但是没有切换页面路由，参数为: ', ...args)
  })


  return (
    <div>
      <h1>这是首页</h1>
      <Link href='/a'><a>去a页</a></Link>
      <Link href='/a/b'><a>去b页</a></Link>
      <div>
        <button onClick={() => Router.push('/a')}>使用router去a页面</button>
      </div>
      <div>
        <Link href='/av?name=深田'><a>深田</a></Link>
        <br />
        <Link href={{ pathname: 'av', query: { name: '井空' } }}><a>井空</a></Link>
      </div>
      <div>
        <button onClick={() => Router.push({ pathname: '/av', query: { name: '深田' } })}>我要深田</button>
        <button onClick={() => Router.push('/av?name=井空')}>我要井空</button>
      </div>
      <div>
        <Link href='#test'><a>测试哈希模式的hook</a></Link>
      </div>
    </div>
  )
}
