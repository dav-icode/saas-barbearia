import { CalendarIcon, HomeIcon, LogOutIcon } from "lucide-react"
import { Button } from "./ui/button"
import Image from "next/image"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { Avatar, AvatarImage } from "./ui/avatar"
import { quickSearchOptions } from "@/app/_constants/search"
import Link from "next/link"

const SideBar = () => {
  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center gap-3 border-b border-solid py-5">
        <Avatar className="ml-5">
          <AvatarImage
            src="/avatar.jpg
                "
          />
        </Avatar>
        <div>
          <p className="font-bold">Davi Franco</p>
          <p className="text-sm">davi.fcosinha@gmail.com</p>
        </div>
      </div>

      <div className="flex flex-col gap-1 border-b border-solid p-5 pt-0">
        <SheetClose asChild>
          <Button
            className="justify-start gap-2 py-5"
            variant={"ghost"}
            asChild
          >
            <Link href="/">
              <HomeIcon size={18} />
              Inicio
            </Link>
          </Button>
        </SheetClose>

        <Button className="justify-start gap-2" variant="ghost">
          <CalendarIcon size={18} />
          Agendamentos
        </Button>
      </div>

      <div className="flex flex-col gap-1 border-b border-solid p-5">
        {quickSearchOptions.map((option) => (
          <Button
            key={option.title}
            className="justify-start gap-2 py-5"
            variant={"ghost"}
          >
            <Image
              alt={option.title}
              src={option.imageUrl}
              width={18}
              height={18}
            />
            {option.title}
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-1 border-b border-solid p-5 pt-0">
        <Button className="gap-2 bg-purple-100 py-5" variant={"destructive"}>
          <LogOutIcon size={18} />
          Sair da conta
        </Button>
      </div>
    </SheetContent>
  )
}

export default SideBar
