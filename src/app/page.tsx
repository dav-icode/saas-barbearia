import { SearchIcon } from "lucide-react"
import Header from "../components/header"
import { Input } from "../components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const Home = () => {
  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-2xl font-bold">Olá Davi!</h2>
        <p>Sexta-feira 29 de agosto</p>

        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca..." />
          <Button className="bg-purple-500 text-white hover:bg-purple-600">
            <SearchIcon />
          </Button>
        </div>

        <div className="h-{150px} relative w-full">
          <Image
            src="/banner-01.png"
            fill
            className="mt-6 rounded-lg object-cover"
            alt="banner"
          />
        </div>
      </div>
    </div>
  )
}

export default Home
