import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'

export default function BasicHeader() {
  return (
    <header className="flex items-center justify-between p-4  w-full">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/Logo.png"
            alt="Logo"
            width={180}
            height={60}
            className="mr-3"
            priority
          />
        </Link>

        <div>
          <Button
            asChild
            variant="outline"
            className="bg-black rounded-lg border border-purple-400 transition-colors hover:bg-gradient-to-t hover:via-black hover:text-white hover:from-purple-300 hover:to-balck"
          >
            <Link href="/login" className="text-gray-300">
              Login Now
            </Link>
          </Button>
        </div>
      </header>
  )
}
