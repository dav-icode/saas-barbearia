import { db } from "@/app/_lib/prisma"
import BarbershopItem from "@/components/barbershop-item"
import Header from "@/components/header"
import Search from "@/components/search"

interface BarberShopPageProps {
  searchParams: {
    title?: string
    BarbershopService?: string
  }
}

const BaerberShopspage = async ({ searchParams }: BarberShopPageProps) => {
  const barbershops = await db.barberShop.findMany({
    where: {
      OR: [
        searchParams?.title
          ? {
              name: {
                contains: searchParams?.title,
                mode: "insensitive",
              },
            }
          : {},
        searchParams?.BarbershopService
          ? {
              BarbershopService: {
                some: {
                  name: {
                    contains: searchParams?.BarbershopService,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
  })

  return (
    <div>
      <Header />
      <div className="my-6 px-5">
        <Search />
      </div>

      <div className="px-5">
        <h2 className="mt-6 mb-3 cursor-pointer text-xs font-bold text-gray-400 uppercase transition hover:text-gray-300 hover:underline">
          Resultados para &quot;
          {searchParams?.title || searchParams?.BarbershopService}&quot;
        </h2>

        <div className="mb-4 grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}
export default BaerberShopspage
