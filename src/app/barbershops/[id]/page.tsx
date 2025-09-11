import { db } from "@/app/_lib/prisma"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, MenuIcon, MapPinIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface BarbershopPageProps {
  params: {
    id: string
  }
}

const page = async ({ params }: BarbershopPageProps) => {
  // chamar o banco de dados

  const barbershop = await db.barberShop.findUnique({
    where: {
      id: params.id,
    },
  })
  return (
    <div>
      {/* IMAGEM */}
      <div className="relative h-[250px] w-full">
        <Image
          src={barbershop?.imageUrl ?? "/placeholder.jpg"}
          alt={barbershop?.name ?? "Barbearia"}
          fill
          className="object-cover"
        />

        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 left-4"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 right-4"
        >
          <MenuIcon />
        </Button>
      </div>
      <div className="border-b border-solid p-5">
        <h1 className="mb-3 text-xl font-bold">{barbershop?.name}</h1>
        <div className="flex items-center gap-1">
          <MapPinIcon className="text-purple-500" size={16} />
          <p className="text-sm text-gray-400">{barbershop?.address}</p>
        </div>
        <div className="flex items-center gap-1">
          <StarIcon className="fill-purple-500 text-purple-500" size={16} />
          <p className="text-sm text-gray-400">5,0 / 409 avaliações</p>
        </div>
      </div>
      {/** DESCRIÇÃO */}
      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="mt-6 cursor-pointer text-xs font-bold text-gray-400 uppercase transition hover:text-gray-300 hover:underline">
          Sobre nós
        </h2>
        <p className="text-sm">{barbershop?.description}</p>
      </div>
    </div>
  )
}

export default page
