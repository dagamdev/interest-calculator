"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="border-border bg-card cursor-pointer">
          {resolvedTheme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          <span className="sr-only">Cambiar tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")} className="gap-2 cursor-pointer">
          <Sun className="h-4 w-4" />
          Claro
          {theme === "light" && <span className="ml-auto text-accent">*</span>}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="gap-2 cursor-pointer">
          <Moon className="h-4 w-4" />
          Oscuro
          {theme === "dark" && <span className="ml-auto text-accent">*</span>}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="gap-2 cursor-pointer">
          <Monitor className="h-4 w-4" />
          Sistema
          {theme === "system" && <span className="ml-auto text-accent">*</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
