import React from 'react'
import LoadingText from '../components/LoadingText'

const LoadingPage = () => {
  return (
    <div className="bg-gunmetal-800 relative h-screen w-screen flex items-center justify-center">
      <LoadingText />
    </div>
  )
}

export default LoadingPage