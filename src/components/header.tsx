import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import SideBar from "./sidebar-sheet"

const Header = () => {
  return (
    <Card className="flex rounded-t-none">
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Image src="/logo.png" alt="logo" height={18} width={120} />

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
