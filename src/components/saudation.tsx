"use client"
import { useSession } from "next-auth/react"

interface UserData {
  name: string | null
}

interface SaudationProps {
  nameUser: UserData[]
}

const Saudation = ({ nameUser }: SaudationProps) => {
  const { data } = useSession()

  function formatarDataHoje(): string {
    const hoje = new Date()

    const diasSemana = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ]

    const meses = [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ]

    const diaSemana = diasSemana[hoje.getDay()]
    const dia = hoje.getDate()
    const mes = meses[hoje.getMonth()]

    return `${diaSemana} ${dia} de ${mes}`
  }

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold">
        <span className="text-gray-400">Olá, </span>
        <span className="font-semibold text-slate-200">
          {data?.user ? nameUser[0].name : "Visitante"}!
        </span>
      </h2>
      <p className="ml-1 text-sm text-gray-400">{formatarDataHoje()}</p>
    </div>
  )
}

export default Saudation
