export function convertToBRL(totalValue: string | number | undefined) {
  if (!totalValue) return

  const value = typeof totalValue === "string" ? parseFloat(totalValue) : totalValue
  
  if (isNaN(value)) return

  return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
}