
 
import NoResult from '@/components/NoResult'
import prisma from '@/lib/prisma'
import React from 'react'
import BlogCard from '../../[slug]/_components/cards/BlogCard'

type Props = {}

const BlogsFeed = async(props: Props) => {
    const blogs = await prisma.blog.findMany()

  return (
    <div className='min-h-[200px]'>
      {!blogs.length && <div className='mt-2'><NoResult title='No BLogs' description='Create BLogs To Improve Site SEO' /></div>}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
      {blogs.map((blog)=><BlogCard key={blog.id} blog={blog} />)}
      </div>

    </div>
  )
}

export default BlogsFeed