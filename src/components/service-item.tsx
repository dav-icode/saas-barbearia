"use client"

import { BarberShop, BarbershopService } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { useState } from "react"
import { format } from "date-fns"
import { set } from "date-fns"
import { createBooking } from "@/app/_actions/create-booking"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<BarberShop, "name">
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const [selectDay, setSelectDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )

  const { data } = useSession()

  const TIME_LIST = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ]

  const handleDaySelect = (date: Date | undefined) => {
    setSelectDay(date)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleCreateBooking = async () => {
    // 1. não exibir horários que já foram agendados
    // 2. Não deixar o usuario reservar se nao estiver logado
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
        userId: (data?.user as unknown as { id: string }).id,
        date: newDate,
      })
      toast.success("Agendamento criado com sucesso!")
    } catch (error) {
      console.log(error)
      toast.error("Erro ao criar agendamento. Tente novamente.")
    }
  }

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
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  className="flex min-w-[100px] rounded-2xl hover:bg-purple-950"
                  size="sm"
                  variant="secondary"
                >
                  Reservar
                </Button>
              </SheetTrigger>
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
                    {TIME_LIST.map((time) => (
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
                  <SheetClose asChild>
                    <Button
                      onClick={handleCreateBooking}
                      disabled={!selectDay || !selectedTime || !data?.user}
                    >
                      Confirmar
                    </Button>
                  </SheetClose>
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
