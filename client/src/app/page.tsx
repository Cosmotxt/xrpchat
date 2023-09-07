import { Chat } from "../components/chat";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../components/ui/hover-card";
export default function Home() {
  return (
    <div className="flex flex-col gap-[20px] min-h-screen bg-neutral-200 items-center justify-center">
      <Chat />
      <div className="flex max-md:hidden">
        <HoverCard>
          <HoverCardTrigger className="cursor-pointer">Quer aprender mais sobre o Real Digital?</HoverCardTrigger>
          <HoverCardContent>
            <a href="https://discord.com/invite/D6nMD2CSs6" style={{color: '#dc2c2a'}}>Clique aqui</a> para aprender mais sobre o Real Digital na comunidade da Vega Crypto
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  )
}
