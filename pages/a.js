import React, { useState } from 'react'
import Link from 'next/link'

export default function A() {

  const [colors, setColors] = useState({red: 'red', blue: 'blue'})

  const swapColor = () => {
    if (colors.red === 'red') {
      setColors({ red: 'blue', blue: 'red' })
    } else {
      setColors({ red: 'red', blue: 'blue' })
    }
  }

  return (
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
  )
}
