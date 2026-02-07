# Specification

## Summary
**Goal:** Persist checkout orders in the Motoko canister and show a post-checkout order confirmation screen.

**Planned changes:**
- Add a stable `Order` model in the single Motoko actor with: `orderId`, `items[{name, unitPriceInr, quantity}]`, `totalInr`, `minecraftUsername`, `upiUtr`, `createdAt`.
- Implement canister order persistence (stored in canister state) with backend-generated unique `orderId` and backend-computed `totalInr`.
- Expose canister methods for the checkout flow: `createOrder(payload) -> orderId` and `getOrderById(orderId) -> order | not found`.
- Wire the frontend checkout/transaction submission to `createOrder`, then navigate/render an order confirmation view that fetches (or uses returned id to fetch) and displays order details with ₹ INR formatting.
- Clear the cart only after `createOrder` succeeds.

**User-visible outcome:** After submitting UPI transaction details at checkout, users see an order confirmation showing the order id, Minecraft username, UPI UTR/reference, purchased items (name, quantity, unit price in ₹), and the final total in ₹; orders remain retrievable by id after refresh.
