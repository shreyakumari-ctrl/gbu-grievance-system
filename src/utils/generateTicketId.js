export function generateTicketId() {
  const year = new Date().getFullYear();
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `GBU-${year}-${randomPart}`;
}