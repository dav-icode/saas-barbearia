"use client"
import { SmartphoneIcon } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"

interface PhoneItemProps {
  phone: string
}

export const PhoneItem = ({ phone }: PhoneItemProps) => {
  function handleClick(phone: string) {
    navigator.clipboard.writeText(phone)
    toast.success("Telefone copiado com sucesso!")
  }

  return (
    <div className="flex justify-between" key={phone}>
      {/* ESQUERDA */}
      <div className="flex items-center">
        <SmartphoneIcon />
        <p>{phone}</p>
      </div>
      {/* DIREITA */}
      <Button variant="outline" size="sm" onClick={() => handleClick(phone)}>
        Copiar
      </Button>
    </div>
  )
}

export default PhoneItem
