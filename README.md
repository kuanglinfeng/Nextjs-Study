# Nextjs-Study
Nextjs入门

## Nextjs

它是服务端进行渲染的一种技术

### 优点
1. 搭建轻松
2. 自带数据同步
3. 插件丰富，生态好
4. 灵活配置
5. 解决了SPA首屏加载过慢、不能SEO的痛点

### 使用`create-next-app`脚手架搭建工程
1. pages 存放页面 页面即路由
2. component 一般用来存放公用组件
3. public 静态资源 如图片，icon，css等
4. yarn.lock 当前所依赖库版本锁定 

### 路由形式

nextjs只支持，query?形式的动态路由，不支持path方式

**Router.push()**

```js
import Router from 'next/router'
import Link from 'next/link'
```

1. 参数为字符串
```js
<button onClick={() => Router.push('/av?name=井空')}>我要井空</button>
```
```js
// /av页面接收结果
function Av({ router }) {
  return (
    <div>
      <h1>野麻地 我是{router.query.name}</h1>
      <Link href='/'><a>返回首页</a></Link>
    </div>
  )
}
```

2. 参数为对象

```js
<button onClick={() => Router.push({ pathname: '/av', query: { name: '深田' } })}>我要深田</button>
```

> Link的href属性也可以按照上面的方式传对象

### 路由的6个钩子事件

调用方式：
```js
Router.events.on('routeChangeStart', hook)
...
```
hooks: 

1. routeChangeStart(url) - 路由开始切换时触发
2. routeChangeComplete(url) - 完成路由切换时触发
3. routeChangeError(err, url) - 路由切换报错时触发
4. beforeHistoryChange(url) - 浏览器 history 模式开始切换时触发
5. hashChangeStart(url) - 开始切换 hash 值但是没有切换页面路由时触发
6. hashChangeComplete(url) - 完成切换 hash 值但是没有切换页面路由时触发
 
### getInitialProps

```js
function Av(props) {
  // list: ["Flinn", "Leon", "Mary"]
  const { router, list } = props
  return (
    <div>
      <h1>野麻地 我是{router.query.name}</h1>
      <Link href='/'><a>返回首页</a></Link>
       {list.map((item, index) => (<li key={index}>{item}</li>))}
    </div>
  )
}

// 一般用于发异步请求获取数据
Av.getInitialProps = async function () {
  const res = await axios.get('http://mock-api.com/DmgvxyKQ.mock/list')
  return res.data.data
}
```

### nextjs的样式

> nextjs不直接支持.css文件，它使用styled-jsx编写样式

```js
 <div>
  <h1>这是a页面</h1>
  <Link href='/'>
    <a>
      <span className='return'>返回首页</span>
      <span className='return'>我也要返回</span>
    </a>

  </Link>
  <button onClick={ swapColor }>交换颜色</button>
  <style jsx>
    {`
      h1 {color: ${colors.red}}
      .return {color: ${colors.blue}}
    `}
  </style>
</div>
```

**如果需要支持导入.css文件，可以安装`@zeit/next-css`**

1. yarn add @zeit/next-css
2. 根目录创建配置文件`next.config.js`
3. 文件配置如下：
```js
const withCss = require('@zeit/next-css')

if(typeof require !== 'undefined'){
    require.extensions['.css']=file=>{}
}

module.exports = withCss({})
```
4. 现在就可以愉快的导入css文件了

### 按需加载（异步加载）

1. 模块异步加载

```js
const [time, setTime] = useState(Date.now())

const changeTimeFormat = async () => {
  // 当调用这个函数的时候才导入模块
  const moment = await import('moment')
  // 这种异步导入需要加default关键字
  setTime(moment.default(Date.now()).format())
}
```

2. 组件异步加载

```js
import dynamic from 'next/dynamic'

// 预导入：在这里是不引入asyncComp组件的，等到真正渲染的时候才进行导入
const AsyncComp = dynamic(import('./asyncComp'))
```

### SEO

nextjs中的SEO优化，是将其重写的Head标签里写好title标签里的内容，便于让搜索引擎抓取关键字

```js
import React, { useState } from 'react'
import Head from 'next/head'

export default function HeaderComp() {
  return (
    <Head>
      <title>header进行了SEO</title>
      <meta charSet="utf-8" />
    </Head>
  )
}
```

### Ant Design UI库

**要使用antd前，首先先安装`@zeit/next-css`并进行配置，使支持导入css文件**

1. 安装
   `yarn add antd`
2. 为了按需加载，安装`babel-plugin-import`
  `yarn add babel-plugin-import`
3. 根目录创建`.babelrc`，并且写入如下配置
   ```js
   {
      "presets":["next/babel"],  //Next.js的总配置文件，相当于继承了它本身的所有配置
      "plugins":[     //增加新的插件，这个插件就是让antd可以按需引入，包括CSS
          [
              "import",
              {
                  "libraryName":"antd",
                  "style":"css"
              }
          ]
      ]
   }
   ```
### 使用`antd`后打包失败的解决方案

1. build error

```js
> Build error occurred
{ /Users/Flinn/Desktop/nextjs/next-demo/node_modules/antd/lib/style/index.css:7
body {
     ^

SyntaxError: Unexpected token {
    at new Script (vm.js:80:7)
    at createScript (vm.js:274:10)
    at Object.runInThisContext (vm.js:326:10)
    at Module._compile (internal/modules/cjs/loader.js:664:28)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:712:10)
    at Module.load (internal/modules/cjs/loader.js:600:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:539:12)
    at Function.Module._load (internal/modules/cjs/loader.js:531:3)
    at Module.require (internal/modules/cjs/loader.js:637:17)
    at require (internal/modules/cjs/helpers.js:22:18) type: 'SyntaxError' }
error Command failed with exit code 1.
```

2. 去掉`.babelrc`中的`"style": "css"`
```js
{
  "presets": [
    "next/babel"
  ], //Next.js的总配置文件，相当于继承了它本身的所有配置
  "plugins": [ //增加新的插件，这个插件就是让antd可以按需引入，包括CSS
    [
      "import",
      {
        "libraryName": "antd"
        // "style": "css"
      }
    ]
  ]
}
```

3. pages目录下，创建`_app.js`文件，写入如下代码
```js
import App from 'next/app'

import 'antd/dist/antd.css'

export default App
```
4. 现在就可以打包成功了

5. 打包成功后，可以`yarn start`开启服务了

6. 如果要部署到服务器，可以参考https://blog.csdn.net/weixin_34393428/article/details/88986319


