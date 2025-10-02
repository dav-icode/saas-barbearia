import { Card, CardContent } from "./ui/card"

const Footer = () => {
  return (
    <footer className="mt-auto">
      <Card className="border-border/50 bg-card/50 rounded-none border-x-0 border-t border-b-0 backdrop-blur-sm">
        <CardContent className="px-5 py-6">
          <p className="text-muted-foreground text-sm">
            © 2023 Copyright{" "}
            <span className="text-foreground font-bold">FSW Barber</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}

export default Footer
