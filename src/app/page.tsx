import Header from "../components/header"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { db } from "../app/_lib/prisma"
import BarbershopItem from "@/components/barbershop-item"
import Search from "@/components/search"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { quickSearchOptions } from "./_constants/search"
import Link from "next/link"
import BookingItem from "@/components/booking-item"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
import { getConfirmedBookings } from "./_data/get-confirmed-bookings.ts"

const Home = async () => {
  const session = await getServerSession(authOptions)
  const barbershops = await db.barberShop.findMany({})
  const popularBarbershops = await db.barberShop.findMany({
    orderBy: {
      name: "desc",
    },
  })
  const confirmedBookings = await getConfirmedBookings()

  return (
    <div className="min-h-screen">
      <Header />

      <div className="space-y-6 p-5">
        {/* SAUDAÇÃO */}
        <div className="space-y-1">
          <h2 className="text-foreground text-2xl font-bold">
            Olá,{" "}
            <span className="text-primary">
              {session?.user ? session.user.name?.split(" ")[0] : "bem vindo"}
            </span>
            !
          </h2>
          <p className="text-muted-foreground text-sm">
            <span className="capitalize">
              {format(new Date(), "EEEE, dd", { locale: ptBR })}
            </span>
            <span> de </span>
            <span className="capitalize">
              {format(new Date(), "MMMM", { locale: ptBR })}
            </span>
          </p>
        </div>

        {/* BUSCA */}
        <Search />

        {/* BUSCA RÁPIDA */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              className="border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary shrink-0 gap-2 font-medium transition-all duration-300"
              variant="secondary"
              key={option.title}
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  width={18}
                  height={18}
                  alt={option.title}
                  className="opacity-80"
                />
                {option.title}
              </Link>
            </Button>
          ))}
        </div>

        {/* BANNER */}
        <div className="group relative h-[150px] w-full overflow-hidden rounded-xl md:h-[200px] lg:h-[250px]">
          <Image
            alt="Agende nos melhores com FSW Barber"
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            priority
          />
        </div>

        {/* AGENDAMENTOS */}
        {confirmedBookings.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
              Agendamentos
            </h2>
            <div className="flex gap-3 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </div>
          </section>
        )}

        {/* RECOMENDADOS */}
        <section className="space-y-3">
          <h2 className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
            Recomendados
          </h2>
          <div className="flex gap-4 overflow-x-auto scroll-smooth pb-2 [&::-webkit-scrollbar]:hidden">
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </section>

        {/* POPULARES */}
        <section className="space-y-3 pb-6">
          <h2 className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
            Populares
          </h2>
          <div className="flex gap-4 overflow-x-auto scroll-smooth pb-2 [&::-webkit-scrollbar]:hidden">
            {popularBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
