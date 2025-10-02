"use client"

import { BarberShop, BarbershopService, Booking } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { useEffect, useState } from "react"
import { addDays, format } from "date-fns"
import { set } from "date-fns"
import { createBooking } from "@/app/_actions/create-booking"
import { signIn, useSession } from "next-auth/react"
import { toast } from "sonner"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"
import { getBookings } from "@/app/_actions/get-bookings"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { LogInIcon } from "lucide-react"

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<BarberShop, "name">
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const [selectDay, setSelectDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )

  const [dayBookings, setDayBookings] = useState<Booking[]>([])

  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      if (!selectDay) return
      const bookings = await getBookings({
        date: selectDay,
        serviceId: service.id,
      })
      setDayBookings(bookings)
    }
    fetch()
  }, [selectDay, service.id])

  const { data } = useSession()

  const TIME_LIST = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:40",
    "11:00",
    "11:40",
    "12:00",
    "12:40",
    "13:00",
    "13:40",
    "13:00",
    "14:00",
    "14:40",
    "15:00",
    "15:40",
    "16:00",
    "16:40",
    "17:00",
    "17:40",
    "18:00",
  ]

  const getTimeList = (bookings: Booking[]) => {
    return TIME_LIST.filter((time) => {
      const hour = Number(time.split(":")[0])
      const minute = Number(time.split(":")[1])

      const hasBookingOnCurrentTime = bookings.some(
        (booking) =>
          booking.date.getHours() === hour &&
          booking.date.getMinutes() === minute,
      )
      if (hasBookingOnCurrentTime) {
        return false
      }
      return true
    })
  }

  const handleDaySelect = (date: Date | undefined) => {
    setSelectDay(date)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleCreateBooking = async () => {
    try {
      if (!selectDay || !selectedTime || !data?.user) return

      const hour = Number(selectedTime.split(":")[0])
      const minute = Number(selectedTime.split(":")[1])

      const newDate = set(selectDay, {
        hours: hour,
        minutes: minute,
      })

      await createBooking({
        serviceId: service.id,
        date: newDate,
      })
      handleBookingSheetOpenChange()
      toast.success("Agendamento criado com sucesso!")
    } catch (error) {
      console.log(error)
      toast.error("Erro ao criar agendamento. Tente novamente.")
    }
  }

  const handleBookingSheetOpenChange = () => {
    setSelectDay(undefined)
    setSelectedTime(undefined)
    setDayBookings([])
    setBookingSheetIsOpen(!bookingSheetIsOpen)
  }

  const handleLoginWithGoogleClick = () => signIn("google")

  return (
    <Card className="border-border/50 bg-card hover:border-primary/30 transition-all duration-300">
      <CardContent className="item-center flex gap-3 pt-3 pb-3">
        {/* IMAGE ( ESQUERDA ) */}
        <div className="relative max-h-[110px] min-h-[110px] max-w-[110px] min-w-[110px] overflow-hidden rounded-lg">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="rounded-lg object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>

        {/* DIREITA */}
        <div className="flex flex-1 flex-col justify-between space-y-2">
          <div>
            <h3 className="text-foreground font-semibold">{service.name}</h3>
            <p className="text-muted-foreground line-clamp-2 text-sm">
              {service.description}
            </p>
          </div>

          {/* PREÇO E BOTÃO */}
          <div className="flex items-center justify-between">
            <p className="text-primary text-sm font-bold">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>
            <Sheet
              open={bookingSheetIsOpen}
              onOpenChange={handleBookingSheetOpenChange}
            >
              {data?.user ? (
                <Button
                  className="bg-secondary hover:bg-primary hover:text-primary-foreground rounded-xl font-medium transition-all duration-300"
                  size="sm"
                  variant="secondary"
                  onClick={() => setBookingSheetIsOpen(true)}
                >
                  Reservar
                </Button>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="bg-secondary hover:bg-primary hover:text-primary-foreground gap-2 rounded-xl font-medium transition-all duration-300"
                      size="sm"
                      variant="secondary"
                    >
                      <LogInIcon className="h-4 w-4" />
                      Entrar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="border-border/50 bg-card w-[90%]">
                    <DialogHeader>
                      <DialogTitle className="text-foreground">
                        Faça seu login na plataforma
                      </DialogTitle>
                      <DialogDescription className="text-muted-foreground">
                        Conecte-se usando sua conta no Google.
                      </DialogDescription>
                    </DialogHeader>

                    <Button
                      variant="outline"
                      className="border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary gap-2 font-medium transition-all duration-200"
                      onClick={handleLoginWithGoogleClick}
                    >
                      <Image
                        src={"/google.svg"}
                        alt="Fazer login com Google"
                        width={18}
                        height={18}
                      />
                      Google
                    </Button>
                  </DialogContent>
                </Dialog>
              )}

              <SheetContent className="border-border/50 overflow-y-auto border-l px-0">
                <SheetHeader className="px-5">
                  <SheetTitle className="text-foreground">
                    Fazer Reserva
                  </SheetTitle>
                </SheetHeader>

                <div className="flex items-center justify-center overflow-hidden px-5 pt-3 pb-5">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={selectDay}
                    onSelect={handleDaySelect}
                    disabled={(date) => date < addDays(new Date(), -1)}
                    styles={{
                      head_cell: {
                        width: "100%",
                        textTransform: "capitalize",
                      },
                      cell: {
                        width: "100%",
                      },
                      button: {
                        width: "100%",
                      },
                      nav_button_previous: {
                        width: "32px",
                        height: "32px",
                      },
                      nav_button_next: {
                        width: "32px",
                        height: "32px",
                      },
                      caption: {
                        textTransform: "capitalize",
                      },
                    }}
                    className="border-border/50 rounded-md border"
                  />
                </div>

                {selectDay && (
                  <div className="border-border/50 flex flex-row flex-nowrap gap-3 overflow-x-auto overflow-y-hidden border-t border-b px-5 py-3 [&::-webkit-scrollbar]:hidden">
                    {getTimeList(dayBookings).map((time) => (
                      <Button
                        key={time}
                        size="sm"
                        variant={selectedTime === time ? "default" : "outline"}
                        className="border-border/50 hover:border-primary/50 shrink-0 rounded-full px-4 transition-all duration-200"
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                )}

                {selectedTime && selectDay && (
                  <div className="m-5 mt-3">
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardContent className="space-y-3 p-3">
                        <div className="flex items-center justify-between">
                          <h2 className="text-foreground font-bold">
                            {service.name}
                          </h2>
                          <p className="text-primary text-sm font-bold">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(Number(service.price))}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <h2 className="text-muted-foreground text-sm">
                            Data
                          </h2>
                          <p className="text-foreground text-sm font-medium">
                            {format(selectDay, "d 'de' MMMM", { locale: ptBR })}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <h2 className="text-muted-foreground text-sm">
                            Horário
                          </h2>
                          <p className="text-foreground text-sm font-medium">
                            {selectedTime}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <h2 className="text-muted-foreground text-sm">
                            Barbearia
                          </h2>
                          <p className="text-foreground text-sm font-medium">
                            {barbershop.name}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                <SheetFooter className="px-5">
                  <Button
                    onClick={handleCreateBooking}
                    disabled={!selectDay || !selectedTime || !data?.user}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground w-full transition-all duration-200 disabled:opacity-50"
                  >
                    Confirmar
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
