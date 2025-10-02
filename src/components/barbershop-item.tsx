import { BarberShop } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { StarIcon } from "lucide-react"
import Link from "next/link"

interface BarberShopProps {
  barbershop: BarberShop
}

const BarbershopItem = ({ barbershop }: BarberShopProps) => {
  return (
    <Card className="border-border/50 bg-card hover:border-primary/30 min-w-[167px] rounded-2xl pt-2 pb-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="p-0 px-1 pb-3">
        {/* IMAGEM */}
        <div className="relative h-[159px] w-full overflow-hidden rounded-2xl">
          <Image
            fill
            className="rounded-2xl object-cover transition-transform duration-500 hover:scale-110"
            src={barbershop.imageUrl}
            alt={barbershop.name}
          />
          <Badge
            className="bg-background/95 border-primary/20 hover:bg-background absolute top-2 left-2 backdrop-blur-sm"
            variant="secondary"
          >
            <StarIcon size={12} className="fill-primary text-primary mr-1" />
            <p className="text-xs font-semibold">5,0</p>
          </Badge>
        </div>

        {/* TEXTO */}
        <div className="space-y-2 px-2 py-3 pb-0">
          <h3 className="text-foreground truncate font-semibold">
            {barbershop.name}
          </h3>
          <p className="text-muted-foreground truncate text-sm">
            {barbershop.address}
          </p>
          <Button
            variant="secondary"
            className="bg-secondary hover:bg-primary hover:text-primary-foreground w-full rounded-xl font-medium transition-all duration-300"
            asChild
          >
            <Link href={`/barbershops/${barbershop.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarbershopItem
