"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, List } from "lucide-react"
import type { OperationData } from "@/components/compound-calculator"

interface OperationsTableProps {
  operations: OperationData[]
  decimalPlaces: number
}

export function OperationsTable({ operations, decimalPlaces }: OperationsTableProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("es-MX", {
      minimumFractionDigits: decimalPlaces === 0 ? 0 : Math.min(2, decimalPlaces),
      maximumFractionDigits: decimalPlaces,
    }).format(value)
  }

  const copyToClipboard = async (value: number, index: number) => {
    try {
      await navigator.clipboard.writeText(value.toFixed(decimalPlaces))
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <Card className="border-border bg-card h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <List className="h-5 w-5 text-accent" />
          Detalle de Operaciones
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {operations.map((op, index) => (
            <Card
              key={op.operation}
              className="border-border bg-secondary/30 hover:bg-secondary/50 transition-colors p-0"
            >
              <CardContent className="p-2">
                <div className="flex items-center gap-x-3 flex-wrap">
                  <span className="font-bold text-md">#{op.operation}</span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(op.initialAmount, index)}
                    className="h-8 px-3 bg-background hover:bg-accent/10 hover:text-accent hover:border-accent font-mono font-medium cursor-pointer"
                    title="Copiar monto"
                  >
                    {copiedIndex === index ? (
                      <span className="flex items-center gap-1.5">
                        <Check className="h-4 w-4 text-accent" />
                        {formatNumber(op.initialAmount)}
                      </span>
                    ) : (
                      formatNumber(op.initialAmount)
                    )}
                  </Button>

                  <div className="flex items-center gap-1.5">
                    <span className="text-muted-foreground text-sm">Ganancia:</span>
                    <span className="font-mono font-medium text-accent">+{formatNumber(op.profit)}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-muted-foreground text-sm">Reinvertido:</span>
                    <span className="font-mono text-foreground">{formatNumber(op.reinvested)}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-muted-foreground text-sm">Asegurado:</span>
                    <span className="font-mono text-muted-foreground">{formatNumber(op.withdrawn)}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-muted-foreground text-sm">Balance:</span>
                    <span className="font-mono font-semibold text-accent">{formatNumber(op.totalBalance)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3 text-center">
          Haz clic en el monto para copiarlo al portapapeles
        </p>
      </CardContent>
    </Card>
  )
}
