import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'

export default function Home() {

  const [height, setHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight - 25 : 600
  )
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 500
  )
  const [platformWidth, setPlatformWidth] = useState(500)

  const [platforms, setPlatforms] = useState([{left: (width / 2) - (platformWidth / 2), right: (width / 2) + (platformWidth / 2), height: height}])
  const [platform, setPlatform] = useState({left: 0, right: platformWidth, height: height - 25})
  const [direction, setDirection] = useState(1)

  useEffect(() => {
      if(platform.left <= 0) {
          setDirection(1)
      }
      if(platform.right >= window.innerWidth - 50) {
          setDirection(-1)
      }
  } , [platform])

    useEffect(() => {
      const interval = setInterval(() => {
          setPlatform( prev => ({ ...prev, left: prev.left + direction, right: prev.right + direction }))
      } , 10)
      return () => clearInterval(interval)
    } , [direction])


  const handleInput = (e) => {
    if(e.key === ' ') {
      place()
    }
  }

  const place = () => {
    // trim the platform to match the last platform
    // add that to the stack
    // create a new platform with the width of the trimmed platform
    // set the new platform to the current platform
    const lastPlatform = platforms[platforms.length - 1]
    const newLeft = Math.max(platform.left, lastPlatform.left)
    const newRight = Math.min(platform.right, lastPlatform.right)
    setPlatformWidth(newRight - newLeft)
    if(newRight - newLeft <= 0) {
      alert('You lose')
    }
    setHeight(height - 25)
    setPlatforms([...platforms, {left: newLeft, right: newRight, height: height}])
    setPlatform({left: 0, right: newRight - newLeft, height: height - 25})
  }


  return (
  <>
    <div onKeyDown={(e) => handleInput(e)} tabIndex="0" >
      <div style={{display: 'inline-block', position: 'absolute', left: platform.left, width: platform.right - platform.left, top: platform.height, background: 'rgb(255,0,0)'}}>&nbsp;</div>
    </div>
    {platforms && platforms.map((p, i) => (
      <div key={i} style={{position: 'absolute', left: p.left, width: p.right - p.left, top: p.height, background: 'red' }}>&nbsp;</div>
    ))}
    </>
  )
}
