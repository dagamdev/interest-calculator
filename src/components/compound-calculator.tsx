"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { OperationsTable } from "@/components/operations-table"
import { SummaryCards } from "@/components/summary-cards"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { TrendingUp, Calculator, RefreshCw, Info } from "lucide-react"
import { useCalculatorStore } from "@/lib/store"

export interface OperationData {
  operation: number
  initialAmount: number
  profit: number
  reinvested: number
  withdrawn: number
  totalBalance: number
}

export function CompoundCalculator() {
  const initialCapital = useCalculatorStore((state) => state.initialCapital)
  const profitPercentage = useCalculatorStore((state) => state.profitPercentage)
  const numberOfOperations = useCalculatorStore((state) => state.numberOfOperations)
  const reinvestmentPercentage = useCalculatorStore((state) => state.reinvestmentPercentage)
  const decimalPlaces = useCalculatorStore((state) => state.decimalPlaces)
  const setInitialCapital = useCalculatorStore((state) => state.setInitialCapital)
  const setProfitPercentage = useCalculatorStore((state) => state.setProfitPercentage)
  const setNumberOfOperations = useCalculatorStore((state) => state.setNumberOfOperations)
  const setReinvestmentPercentage = useCalculatorStore((state) => state.setReinvestmentPercentage)
  const setDecimalPlaces = useCalculatorStore((state) => state.setDecimalPlaces)

  const operations = useMemo<OperationData[]>(() => {
    const ops: OperationData[] = []
    let currentAmount = initialCapital
    let totalWithdrawnAccumulated = 0

    for (let i = 1; i <= numberOfOperations; i++) {
      const profit = currentAmount * (profitPercentage / 100)
      const reinvested = profit * (reinvestmentPercentage / 100)
      const withdrawn = profit - reinvested
      const nextAmount = currentAmount + reinvested
      totalWithdrawnAccumulated += withdrawn

      const totalBalance = currentAmount + profit

      ops.push({
        operation: i,
        initialAmount: currentAmount,
        profit: profit,
        reinvested: reinvested,
        withdrawn: withdrawn,
        totalBalance: totalBalance,
      })

      currentAmount = nextAmount
    }

    return ops
  }, [initialCapital, profitPercentage, numberOfOperations, reinvestmentPercentage])

  const totalProfit = useMemo(() => {
    return operations.reduce((sum, op) => sum + op.profit, 0)
  }, [operations])

  const totalWithdrawn = useMemo(() => {
    return operations.reduce((sum, op) => sum + op.withdrawn, 0)
  }, [operations])

  const totalReinvested = useMemo(() => {
    return operations.reduce((sum, op) => sum + op.reinvested, 0)
  }, [operations])

  const finalCapital = initialCapital + totalReinvested + totalWithdrawn

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel de configuración */}
        <Card className="lg:col-span-1 border-border bg-card h-fit">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Calculator className="h-5 w-5 text-accent" />
              Configuración
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Capital inicial */}
            <div className="space-y-2">
              <Label htmlFor="capital" className="text-sm font-medium text-foreground">
                Capital inicial
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="capital"
                  type="number"
                  value={initialCapital}
                  onChange={(e) => {
                    const value = Number.parseFloat(e.target.value)
                    if (!isNaN(value) && value >= 0) {
                      const multiplier = Math.pow(10, decimalPlaces)
                      setInitialCapital(Math.round(value * multiplier) / multiplier)
                    } else if (e.target.value === "") {
                      setInitialCapital(0)
                    }
                  }}
                  className="pl-7 bg-secondary border-border text-foreground"
                  min={0}
                  step={decimalPlaces > 0 ? 1 / Math.pow(10, decimalPlaces) : 1}
                />
              </div>
            </div>

            {/* Porcentaje de ganancia */}
            <div className="space-y-2">
              <Label htmlFor="profit" className="text-sm font-medium text-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-accent" />
                Ganancia por operación
              </Label>
              <div className="relative">
                <Input
                  id="profit"
                  type="number"
                  value={profitPercentage}
                  onChange={(e) => {
                    const value = Number.parseFloat(e.target.value)
                    if (!isNaN(value) && value >= 0) {
                      setProfitPercentage(Math.round(value * 100) / 100)
                    } else if (e.target.value === "") {
                      setProfitPercentage(0)
                    }
                  }}
                  className="pr-7 bg-secondary border-border text-foreground"
                  min={1}
                  max={10000000}
                  step={0.01}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
              </div>
            </div>

            {/* Número de operaciones */}
            <div className="space-y-2">
              <Label htmlFor="operations" className="text-sm font-medium text-foreground">
                Número de operaciones
              </Label>
              <Input
                id="operations"
                type="number"
                value={numberOfOperations}
                onChange={(e) => {
                  const value = Number.parseInt(e.target.value)
                  if (!isNaN(value) && value >= 1 && value <= 200) {
                    setNumberOfOperations(value)
                  } else if (e.target.value === "") {
                    setNumberOfOperations(1)
                  }
                }}
                className="bg-secondary border-border text-foreground"
                min={1}
                max={200}
                step={1}
              />
            </div>

            {/* Porcentaje de reinversión */}
            <div className="space-y-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label className="text-sm font-medium text-foreground flex items-center gap-2 cursor-help">
                      <RefreshCw className="h-4 w-4 text-accent" />
                      Reinversión de ganancias
                      <Info className="h-3.5 w-3.5 text-muted-foreground" />
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Este porcentaje define cuánto de la ganancia se utiliza para la siguiente operación</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="space-y-3">
                <Slider
                  value={[reinvestmentPercentage]}
                  onValueChange={(value) => setReinvestmentPercentage(value[0])}
                  max={100}
                  min={0}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Reinvertir</span>
                  <span className="text-lg font-semibold text-accent">{reinvestmentPercentage}%</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Asegura: {100 - reinvestmentPercentage}%</span>
                </div>
              </div>
            </div>

            {/* Precisión decimal */}
            <div className="space-y-4 pt-2 border-t border-border">
              <Label htmlFor="decimal-places" className="text-sm font-medium text-foreground">
                Precisión decimal
              </Label>
              <div className="space-y-3">
                <Slider
                  id="decimal-places"
                  value={[decimalPlaces]}
                  onValueChange={(value) => setDecimalPlaces(value[0])}
                  max={8}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Decimales</span>
                  <span className="text-lg font-semibold text-accent">{decimalPlaces}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {decimalPlaces === 0
                    ? "Sin decimales"
                    : `Mostrando hasta ${decimalPlaces} ${decimalPlaces === 1 ? "decimal" : "decimales"}`}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <OperationsTable operations={operations} decimalPlaces={decimalPlaces} />
        </div>
      </div>

      <SummaryCards
        initialCapital={initialCapital}
        finalCapital={finalCapital}
        totalProfit={totalProfit}
        totalWithdrawn={totalWithdrawn}
        reinvestmentPercentage={reinvestmentPercentage}
        decimalPlaces={decimalPlaces}
      />
    </div>
  )
}
