export function formatINR(amount: number | bigint): string {
  const numAmount = typeof amount === 'bigint' ? Number(amount) : amount;
  return `₹${numAmount.toLocaleString('en-IN')}`;
}

export function parseINR(formattedAmount: string): number {
  return Number(formattedAmount.replace(/[₹,]/g, ''));
}
