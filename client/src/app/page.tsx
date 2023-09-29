'use client'
import { AuthProvider } from "../../context/authContext";
import Chat from "../../pages/chat";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import Image from 'next/image'

export default function Home() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen bg-[#111112] items-center relative justify-center">
        <Chat />
        <img src="/purple-lines.svg" alt="" className="absolute w-[12vw] z-0 left-0 bottom-0"/>
        <img src="/green-lines.svg" alt="" className="w-[10vw] absolute z-0 right-0 top-0 bottom-0"/>
      </div>
    </AuthProvider>

  )
}
