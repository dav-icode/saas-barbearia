"use server"
import { db } from "../_lib/prisma"
import { Prisma } from "@prisma/client"

interface CreateBookingParams {
  userId: string
  serviceId: string
  date: Date
}

export const createBooking = async (params: CreateBookingParams) => {
  await db.booking.create({
    data: {
      userId: params.userId,
      serviceId: params.serviceId,
      date: params.date,
    } as Prisma.BookingUncheckedCreateInput,
  })
}
