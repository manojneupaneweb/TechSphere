import React from 'react'

function PageNotFound() {
  return (
    
    <div className='h-[80vh] w-full bg-slate-50 flex flex-col justify-center items-center'>
        <p className='text-center text-3xl font-bold'>404 <br />Page Not Found</p>
        <a href="/" className='mt-5'>Go to home page</a>
        <p></p>
    </div>
  )
}

export default PageNotFound