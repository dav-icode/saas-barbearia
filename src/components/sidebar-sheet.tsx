"use client"

import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { Button } from "./ui/button"
import Image from "next/image"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { quickSearchOptions } from "@/app/_constants/search"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { signIn, signOut, useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "./ui/avatar"

const SideBar = () => {
  const { data } = useSession()
  const handleLoginWithGoogleClick = () => signIn("google")
  const handleLogOutClick = () => signOut()

  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center justify-between gap-2 border-b border-solid py-5">
        {data?.user ? (
          <div className="flex items-center gap-2">
            <Avatar className="ml-5">
              <AvatarImage
                alt={data?.user?.name ?? ""}
                src={data?.user?.image ?? ""}
              />
            </Avatar>

            <div>
              <p className="font-bold">{data?.user?.name}</p>
              <p className="text-sm">{data?.user?.email}</p>
            </div>
          </div>
        ) : (
          <div className="ml-5 flex items-center justify-center space-x-15">
            <h2 className="text-lg font-semibold">Olá, faça seu login!</h2>
            <Dialog>
              <DialogTrigger>
                <Button
                  size={"icon"}
                  className="bg-purple-500 text-white hover:bg-purple-600 hover:text-black"
                >
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%]">
                <DialogHeader>
                  <DialogTitle>Faça seu login na plataforma</DialogTitle>
                  <DialogDescription>
                    Conecte-se usando sua conta no Google.
                  </DialogDescription>
                </DialogHeader>

                <Button
                  variant={"outline"}
                  className="gap-2 font-bold"
                  onClick={handleLoginWithGoogleClick}
                >
                  <Image
                    src={"/google.svg"}
                    alt="Fazer login com Google"
                    width={18}
                    height={18}
                  />
                  Google
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        )}
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
            <Link
              href={`/barbershops?search=${option.title}`}
              className="flex gap-2 py-5"
            >
              <Image
                alt={option.title}
                src={option.imageUrl}
                width={18}
                height={18}
              />
              {option.title}
            </Link>
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-1 border-b border-solid p-5 pt-0">
        <Button
          className="gap-2 py-5"
          variant={"destructive"}
          onClick={handleLogOutClick}
        >
          <LogOutIcon size={18} />
          Sair da conta
        </Button>
      </div>
    </SheetContent>
  )
}

export default SideBar
