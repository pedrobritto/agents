# Interface Design for Testability

1. **Accept dependencies, don't create them** — see [mocking.md](mocking.md).

2. **Return results, don't produce side effects**

   ```typescript
   // Testable
   function calculateDiscount(cart): Discount {}

   // Hard to test
   function applyDiscount(cart): void {
     cart.total -= discount;
   }
   ```
