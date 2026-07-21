 
import prisma from '@/lib/prisma'
import React from 'react'
import CategoryCard from '../cards/CategoryCard'
import NoResult from '@/components/NoResult'

type Props = {}

const CategoriesFeed = async(props: Props) => {
    const categories = await prisma.blogCategory.findMany({orderBy:{
      createdAt:'desc'
    }})

  return (
    <div>
        {!categories.length && <div className='mt-2'><NoResult title='No Categories' description='Create Categories For Your Blogs' /></div>}
        {!!categories.length && <div className='min-h-[100px] flex gap-2 items-center flex-wrap mt-2'>
      {categories.map(category=><CategoryCard key={category.id} category={category} />)}
    </div>}
    </div>
 
  )
}

export default CategoriesFeed