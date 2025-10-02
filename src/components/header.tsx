import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { MenuIcon, LogInIcon } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import SideBar from "./sidebar-sheet"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ThemeToggle } from "./theme-toggle"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/_lib/auth"

const Header = async () => {
  const session = await getServerSession(authOptions)

  return (
    <header>
      <Card className="border-border/50 bg-card/80 rounded-none border-x-0 border-t-0 border-b backdrop-blur-md">
        <CardContent className="flex w-full items-center p-5">
          <Link
            href={"/"}
            className="relative h-6 w-28 transition-opacity duration-200 hover:opacity-80 md:h-7 md:w-32"
            legacyBehavior
          >
            <Image
              src="/logo.png"
              alt="FSW Barber"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Navigation Menu - Desktop only */}
          <NavigationMenu className="mx-auto hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} hover:bg-primary/10 hover:text-primary bg-transparent transition-colors duration-200`}
                  >
                    Início
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/bookings" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} hover:bg-primary/10 hover:text-primary bg-transparent transition-colors duration-200`}
                  >
                    Agendamentos
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/barbershops" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} hover:bg-primary/10 hover:text-primary bg-transparent transition-colors duration-200`}
                  >
                    Barbearias
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right side - Desktop only */}
          <div className="ml-auto hidden items-center gap-3 lg:flex">
            <ThemeToggle />

            {session?.user ? (
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    className="hover:bg-primary/10 flex items-center gap-2 transition-all duration-200"
                  >
                    <Avatar className="ring-primary/20 h-8 w-8 ring-2">
                      <AvatarImage
                        src={session.user.image ?? ""}
                        alt={session.user.name ?? ""}
                      />
                      <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                        {session.user.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">
                      {session.user.name?.split(" ")[0]}
                    </span>
                  </Button>
                </SheetTrigger>
                <SideBar />
              </Sheet>
            ) : (
              <Link href="/" legacyBehavior>
                <Button
                  variant="ghost"
                  className="hover:bg-primary/10 hover:text-primary gap-2 transition-all duration-200"
                >
                  <LogInIcon className="h-4 w-4" />
                  Entrar
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10 hover:text-primary ml-auto transition-all duration-200 lg:hidden"
              >
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SideBar />
          </Sheet>
        </CardContent>
      </Card>
    </header>
  )
}

export default Header
