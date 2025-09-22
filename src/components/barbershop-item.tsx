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
    <Card className="min-w-[167px] rounded-2xl pt-1">
      <CardContent className="p-0 px-1">
        {/* IMAGEM */}
        <div className="relative h-[159px] w-full">
          <Image
            fill
            className="rounded-2xl object-cover"
            src={barbershop.imageUrl}
            alt={barbershop.name}
          />
          <Badge className="absolute top-2 left-2" variant="secondary">
            <StarIcon size={12} className="fill-purple-500 text-purple-500" />
            <p className="text-xs font-semibold text-white">5,0</p>
          </Badge>
        </div>

        {/* TEXTO */}
        <div className="py-3 pb-0">
          <h3 className="text-semibold">{barbershop.name}</h3>
          <p className="mb-3 text-sm text-gray-400">{barbershop.address}</p>
          <Button
            variant="secondary"
            className="right-0 mt-1 w-full rounded-2xl"
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
