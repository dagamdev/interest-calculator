import { create } from "zustand"
import { persist } from "zustand/middleware"

interface CalculatorState {
  initialCapital: number
  profitPercentage: number
  numberOfOperations: number
  reinvestmentPercentage: number
  decimalPlaces: number
  setInitialCapital: (value: number) => void
  setProfitPercentage: (value: number) => void
  setNumberOfOperations: (value: number) => void
  setReinvestmentPercentage: (value: number) => void
  setDecimalPlaces: (value: number) => void
}

export const useCalculatorStore = create<CalculatorState>()(
  persist(
    (set) => ({
      initialCapital: 10,
      profitPercentage: 86,
      numberOfOperations: 6,
      reinvestmentPercentage: 100,
      decimalPlaces: 2,
      setInitialCapital: (value) => set({ initialCapital: value }),
      setProfitPercentage: (value) => set({ profitPercentage: value }),
      setNumberOfOperations: (value) => set({ numberOfOperations: value }),
      setReinvestmentPercentage: (value) => set({ reinvestmentPercentage: value }),
      setDecimalPlaces: (value) => set({ decimalPlaces: value }),
    }),
    {
      name: "calculator-config",
    },
  ),
)
