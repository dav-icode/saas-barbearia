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

  {
    /*  Atualiza o estado de selectDay */
  }
  const handleDaySelect = (date: Date | undefined) => {
    setSelectDay(date)
  }

  {
    /* Atualiza o estado de selectedTime */
  }
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  {
    /* Faz uma reserva */
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
    <Card>
      <CardContent className="item-center flex gap-3 pt-0 pb-0">
        {/* IMAGE ( ESQUERDA ) */}
        <div className="relative max-h-[110px] min-h-[110px] max-w-[110px] min-w-[110px]">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        {/* DIREITA */}
        <div className="space-y-2">
          <h3 className="font-semibold">{service.name}</h3>
          <p className="text-sm text-gray-400">{service.description}</p>

          {/* PREÇÕ E BOTÃO */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-purple-500">
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
                  className="flex min-w-[100px] rounded-2xl hover:bg-purple-950"
                  size="sm"
                  variant="secondary"
                  onClick={() => setBookingSheetIsOpen(true)}
                >
                  Reservar
                </Button>
              ) : (
                <Dialog>
                  <DialogTrigger>
                    <Button
                      className="flex min-w-[100px] rounded-2xl hover:bg-purple-950"
                      size="sm"
                      variant="secondary"
                    >
                      <LogInIcon />
                      Sign In
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[90%]">
                    <DialogHeader>
                      <DialogTitle>Faça seu login na plataforma</DialogTitle>
                      <DialogDescription>
                        Conecte-se usando sua conta no Google.
                      </DialogDescription>
                    </DialogHeader>

                    <Button
                      variant={"outline"}
                      className="gap-2 font-bold"
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

              <SheetContent className="overflow-y-auto px-0">
                <SheetHeader>
                  <SheetTitle>Fazer Reserva</SheetTitle>
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
                    className="rounded-md border-purple-500"
                  />
                </div>

                {selectDay && (
                  <div className="flex flex-row flex-nowrap gap-3 overflow-x-auto overflow-y-hidden border-t border-b border-solid px-1 py-1 [&::-webkit-scrollbar]:hidden">
                    {getTimeList(dayBookings).map((time) => (
                      <Button
                        key={time}
                        size="sm"
                        variant={selectedTime === time ? "default" : "outline"}
                        className="flex shrink-0 rounded-full p-5"
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                )}

                {selectedTime && selectDay && (
                  <div className="m-2 mt-0">
                    <Card>
                      <CardContent className="space-y-3 p-3">
                        <div className="flex items-center">
                          <h2 className="font-bold">{service.name}</h2>
                          <p className="ml-auto text-sm font-bold">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(Number(service.price))}
                          </p>
                        </div>

                        <div className="flex items-center justify-center">
                          <h2 className="text-sm text-gray-400">Data</h2>
                          <p className="ml-auto text-sm">
                            {format(selectDay, "d 'de' MMMM", { locale: ptBR })}
                          </p>
                        </div>

                        <div className="flex items-center justify-center">
                          <h2 className="text-sm text-gray-400">Horário</h2>
                          <p className="ml-auto text-sm">{selectedTime}</p>
                        </div>

                        <div className="flex items-center justify-center">
                          <h2 className="text-sm text-gray-400">Barbearia</h2>
                          <p className="ml-auto text-sm">{barbershop.name}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                <SheetFooter className="px-5">
                  <Button
                    onClick={handleCreateBooking}
                    disabled={!selectDay || !selectedTime || !data?.user}
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
