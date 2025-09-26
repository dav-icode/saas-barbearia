import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import SideBar from "./sidebar-sheet"
import Link from "next/link"

const Header = () => {
  return (
    <Card className="flex rounded-t-none">
      <CardContent className="flex items-center p-5">
        <Link href={"/"}>
          <Image src="/logo.png" alt="logo" height={18} width={120} />
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="absolute right-4">
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SideBar />
        </Sheet>
      </CardContent>
    </Card>
  )
}
// composition pattern

export default Header
