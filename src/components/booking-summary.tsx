import { format } from "date-fns"
import { Card, CardContent } from "./ui/card"
import { BarberShop, BarbershopService } from "@prisma/client"
import { ptBR } from "date-fns/locale"

interface BookingSummaryProps {
  service: Pick<BarbershopService, "name" | "price">
  barbershop: Pick<BarberShop, "name">
  selectedDate: Date
}

const BookingSummary = ({
  service,
  barbershop,
  selectedDate,
}: BookingSummaryProps) => {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardContent className="space-y-3 p-3">
        <div className="flex items-center justify-between">
          <h2 className="text-foreground font-bold">{service.name}</h2>
          <p className="text-primary text-sm font-bold">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(service.price))}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-muted-foreground text-sm">Data</h2>
          <p className="text-foreground text-sm font-medium">
            {format(selectedDate, "d 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-muted-foreground text-sm">Horário</h2>
          <p className="text-foreground text-sm font-medium">
            {format(selectedDate, "HH:mm")}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-muted-foreground text-sm">Barbearia</h2>
          <p className="text-foreground text-sm font-medium">
            {barbershop.name}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingSummary
