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
    <SheetContent className="border-border/50 bg-card/95 w-[300px] border-l backdrop-blur-md sm:w-[350px]">
      <SheetHeader>
        <SheetTitle className="text-foreground text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="border-border/50 flex items-center justify-between gap-3 border-b py-5">
        {data?.user ? (
          <div className="flex items-center gap-3 px-2">
            <Avatar className="ring-primary/20 h-10 w-10 ring-2">
              <AvatarImage
                alt={data?.user?.name ?? ""}
                src={data?.user?.image ?? ""}
              />
            </Avatar>

            <div className="min-w-0 flex-1">
              <p className="text-foreground truncate font-bold">
                {data?.user?.name}
              </p>
              <p className="text-muted-foreground truncate text-sm">
                {data?.user?.email}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex w-full items-center justify-between px-2">
            <h2 className="text-foreground text-lg font-semibold">
              Olá, faça seu login!
            </h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="icon"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md transition-all duration-200"
                >
                  <LogInIcon className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="border-border/50 bg-card w-[90%]">
                <DialogHeader>
                  <DialogTitle className="text-foreground">
                    Faça seu login na plataforma
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    Conecte-se usando sua conta no Google.
                  </DialogDescription>
                </DialogHeader>

                <Button
                  variant="outline"
                  className="border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary gap-2 font-medium transition-all duration-200"
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

      <div className="border-border/50 flex flex-col gap-1 border-b py-5">
        <SheetClose asChild>
          <Button
            className="hover:bg-primary/10 hover:text-primary justify-start gap-3 transition-all duration-200"
            variant="ghost"
            asChild
          >
            <Link href="/">
              <HomeIcon size={20} />
              Inicio
            </Link>
          </Button>
        </SheetClose>

        <SheetClose asChild>
          <Button
            className="hover:bg-primary/10 hover:text-primary justify-start gap-3 transition-all duration-200"
            variant="ghost"
            asChild
          >
            <Link href="/bookings">
              <CalendarIcon size={20} />
              Agendamentos
            </Link>
          </Button>
        </SheetClose>
      </div>

      <div className="border-border/50 flex flex-col gap-1 border-b py-5">
        {quickSearchOptions.map((option) => (
          <SheetClose asChild key={option.title}>
            <Button
              className="hover:bg-primary/10 hover:text-primary justify-start gap-3 transition-all duration-200"
              variant="ghost"
              asChild
            >
              <Link href={`/barbershops?BarbershopService=${option.title}`}>
                <Image
                  alt={option.title}
                  src={option.imageUrl}
                  width={20}
                  height={20}
                  className="opacity-80"
                />
                {option.title}
              </Link>
            </Button>
          </SheetClose>
        ))}
      </div>

      {data?.user && (
        <div className="flex flex-col gap-2 py-5">
          <Button
            className="hover:bg-destructive/90 gap-3 font-medium transition-all duration-200"
            variant="destructive"
            onClick={handleLogOutClick}
          >
            <LogOutIcon size={20} />
            Sair da conta
          </Button>
        </div>
      )}
    </SheetContent>
  )
}

export default SideBar
