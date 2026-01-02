import { CompoundCalculator } from "@/components/compound-calculator"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8 relative">
          <div className="absolute right-0 top-0 cursor-pointer">
            <ThemeToggle />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 text-balance">
            Calculadora de Interés Compuesto
          </h1>
          <p className="text-muted-foreground text-lg">Optimiza tu estrategia de trading con crecimiento exponencial</p>
        </header>
        <CompoundCalculator />
      </div>
    </main>
  )
}
