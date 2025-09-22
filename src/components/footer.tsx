import { Card, CardContent } from "./ui/card"
const Footer = () => {
  return (
    <Card className="rounded-b-none">
      <CardContent className="px-5 py-6">
        <p className="text-sm text-gray-400">
          © 2023 Copyright <span className="font-bold">FSW Barber</span>
        </p>
      </CardContent>
    </Card>
  )
}

export default Footer
