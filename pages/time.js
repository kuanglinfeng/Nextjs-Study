import React, { useState } from 'react'
import dynamic from 'next/dynamic'

// 在这里是不引入asyncComp组件的，等到真正渲染的时候才进行引用
const AsyncComp = dynamic(import('./asyncComp'))

function Time() {
  
  const [time, setTime] = useState(Date.now())

  const changeTimeFormat = async () => {
    // 当调用这个函数的时候才导入模块
    const moment = await import('moment')
    // 这种异步导入需要加default关键字
    setTime(moment.default(Date.now()).format())
  }

 
  return (
    <>
      <AsyncComp />
      <div>当前时间为：{time}</div>
      <button onClick={changeTimeFormat}>改变时间格式</button>
    </>
  )
}

export default Time