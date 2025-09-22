import Header from "../components/header"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { db } from "../app/_lib/prisma"
import BarbershopItem from "@/components/barbershop-item"
import Search from "@/components/search"
import Saudation from "@/components/saudation"

const Home = async () => {
  const barbershops = await db.barberShop.findMany({})
  const popularBarbershops = await db.barberShop.findMany({
    orderBy: {
      name: "desc",
    },
  })
  const nameUser = await db.user.findMany({
    select: {
      name: true,
    },
  })
  return (
    <div>
      <Header />
      <div className="p-5">
        {/* SAUDAÇÃO */}
        <Saudation nameUser={nameUser} />

        {/* BUSCA */}
        <div className="mt-6">
          <Search />
        </div>

        {/* BUSCA RÁPIDA */}
        <div className="mt-6 flex items-center justify-center gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          <Button className="ml-7.5 gap-2 px-5 py-5" variant="secondary">
            <Image src="/cabelo.svg" alt="cabelo" width={16} height={16} />
            Cabelo
          </Button>
          <Button className="gap-2 px-5 py-5" variant="secondary">
            <Image src="/barba.svg" alt="cabelo" width={16} height={16} />
            Barba
          </Button>
          <Button className="gap-2 px-5 py-5" variant="secondary">
            <Image src="/Acabamento.svg" alt="cabelo" width={16} height={16} />
            Acabamento
          </Button>
        </div>

        <div className="h-{150px} relative mt-6 w-full rounded-xl">
          <Image
            src="/banner-01.png"
            alt="banner"
            width={800}
            height={200}
            className="mt-6 rounded-lg object-cover"
          />
        </div>

        {/* AGENDAMENTO */}
        <h2 className="mt-6 mb-3 cursor-pointer text-xs font-bold text-gray-400 uppercase transition hover:text-gray-300 hover:underline">
          Agendamentos
        </h2>
        <Card>
          <CardContent className="flex justify-between p-0 pt-0 pb-0">
            {/* ⬅️ Força todos os paddings */}
            {/* ESQUERDA */}
            <div className="flex flex-col gap-2 p-0 pl-5">
              <Badge className="w-fit bg-blue-500 text-white">Confirmado</Badge>
              <h3 className="text-lg font-semibold">Corte de cabelo</h3>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    className="h-6 w-6 rounded-full pt-1"
                    src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"
                  />
                </Avatar>
                <p className="text-sm">Barbearia FSW</p>
              </div>
            </div>
            {/* DIREITA */}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              {/* ⬅️ Padding manual à direita */}
              <p className="text-sm">Agosto</p>
              <p className="text-2xl font-semibold">05</p>
              <p className="text-sm">20:00</p>
            </div>
          </CardContent>
        </Card>

        <h2 className="mt-6 mb-3 cursor-pointer text-xs font-bold text-gray-400 uppercase transition hover:text-gray-300 hover:underline">
          Recomendados
        </h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <h2 className="mt-6 mb-3 cursor-pointer text-xs font-bold text-gray-400 uppercase transition hover:text-gray-300 hover:underline">
          Populares
        </h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
