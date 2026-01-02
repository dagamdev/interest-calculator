export function Footer () {
  return (
    <footer className="w-full mt-12 border-t py-8 text-sm text-muted-foreground">
      <div className="max-w-4xl mx-auto px-4 space-y-4">

        {/* Descripción de la herramienta */}
        <p className="leading-relaxed">
          Esta calculadora utiliza un sistema de <strong>interés compuesto flexible</strong>, 
          permitiendo definir qué porcentaje de la ganancia se reinvierte en la siguiente 
          operación y cuánto se asegura. De esta manera puedes simular estrategias reales 
          de crecimiento progresivo, visualizar cada paso en una tabla detallada y ajustar 
          los parámetros para optimizar tus resultados.
        </p>

        {/* Disclaimer */}
        <p className="text-xs opacity-70">
          Esta herramienta es solo con fines educativos e informativos y no constituye 
          asesoramiento financiero. Opera bajo tu propio riesgo.
        </p>

        {/* Línea divisora */}
        <div className="border-t pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">

          {/* Créditos */}
          <p className="text-xs">
            © {new Date().getFullYear()} — Creado por <span className="font-semibold">Dagamdev</span>
          </p>

        </div>
      </div>
    </footer>
  )
}
