'use client'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


const Sidebar = ({ user }: SiderbarProps) => {
  const path = usePathname()
  return (
    <section className='sidebar'>
      <nav className='flex flex-col gap-4'>
        <Link href="/" className=' flex mb-12 cursor-pointer items-center gap-2'>
          <Image src="/icons/logo.svg" width={34} height={34} alt='clone logo' className='size-[24px] max-xl:size-14'/>
          <h1 className='sidebar-logo'>Clone</h1>
        </Link>

        {sidebarLinks.map((item) => {
          const isActive = path === item.route || path.startsWith(`${item.route}/`)
          return (
            <Link href={item.route} key={item.label} className={cn ('sidebar-link', {
              'bg-bank-gradient': isActive
            })}>
              <div className='relative size-6'>
                <Image src={item.imgURL} alt={item.label} fill className={cn({
                  'brightness-[3] inset-0': isActive
                })}/>
              </div>
              <p className={cn ('sidebar-label', {
                '!text-white' : isActive
              })}>{item.label}</p>
            </Link>
          )
        })}

        USER

      </nav>
      FOOTER
    </section>
  )
}

export default Sidebar