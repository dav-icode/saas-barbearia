"use client"
import { useRouter } from "next/navigation"
import { SearchIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"

const formSchema = z.object({
  title: z.string().trim().min(1, {
    message: "Digite algo para buscar.",
  }),
})

const Search = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  const rounter = useRouter()

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    rounter.push(`/barbershops?title=${data.title}`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Faça sua busca..."
                  {...field}
                  className="border-border/50 bg-secondary/50 placeholder:text-muted-foreground/60 focus:border-primary/50 focus:bg-secondary w-full backdrop-blur-sm transition-all duration-200"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md transition-all duration-200 hover:shadow-lg"
          type="submit"
          size="icon"
        >
          <SearchIcon className="h-5 w-5" />
        </Button>
      </form>
    </Form>
  )
}

export default Search
