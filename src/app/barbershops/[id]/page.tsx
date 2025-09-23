import { db } from "@/app/_lib/prisma"
import PhoneItem from "@/components/phone-item"
import ServiceItem from "@/components/service-item"
import SideBar from "@/components/sidebar-sheet"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface BarbershopPageProps {
  params: Promise<{
    id: string
  }>
}
const page = async ({ params }: BarbershopPageProps) => {
  const { id } = await params

  const barbershop = await db.barberShop.findUnique({
    where: {
      id: id,
    },
    include: {
      BarbershopService: true,
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

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SideBar />
        </Sheet>
      </div>

      {/* TÍTULO */}
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

      {/* DESCRIÇÃO */}
      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="mt-6 cursor-pointer text-xs font-bold text-gray-400 uppercase transition hover:text-gray-300 hover:underline">
          Sobre nós
        </h2>
        <p className="text-sm">{barbershop?.description}</p>
      </div>

      {/* SERVIÇOS */}
      <div className="space-y-3 p-5">
        <h2 className="mt-6 cursor-pointer text-xs font-bold text-gray-400 uppercase transition hover:text-gray-300 hover:underline">
          Serviços
        </h2>
        <div className="space-y-4">
          {barbershop?.BarbershopService.map((services) => (
            <ServiceItem key={services.id} service={services} />
          ))}
        </div>
      </div>

      {/* CONTATO */}
      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="mt-6 cursor-pointer text-xs font-bold text-gray-400 uppercase transition hover:text-gray-300 hover:underline">
          Contato
        </h2>
        <p className="space-y-3 text-sm">
          {barbershop?.phone.map((phone) => (
            <PhoneItem key={phone} phone={phone} />
          ))}
        </p>
      </div>
    </div>
  )
}

export default page
