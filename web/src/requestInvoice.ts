export async function getAllInvoices() {
  const response = await fetch('https://reimagined-eureka-x579rrp59v5x2r9r-3000.app.github.dev/invoices');

  return await response.json();
}