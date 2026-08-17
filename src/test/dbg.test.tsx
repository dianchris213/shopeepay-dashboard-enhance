import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { AddTransactionSheet } from "@/components/AddTransactionSheet";
import { hydrateCategories } from "@/lib/categories-store";
import { ensureShopeePayAccount, hydrateState, initialState, shopeePayAccount, type Account } from "@/lib/finance-store";
const cash: Account = { id: "a1", name: "Cash", type: "Cash", amount: 100000, color: "#22c55e", icon: "Banknote", sub: "Cash" };
describe("dbg", () => {
  beforeEach(() => {
    hydrateState({ ...initialState, accounts: [cash], transactions: [], bills: [] });
    ensureShopeePayAccount();
    hydrateCategories([{ id: "cod", name: "Driver COD", icon: "transport", kind: "income" }]);
  });
  it("dbg", async () => {
    const user = userEvent.setup();
    render(<AddTransactionSheet open onClose={() => {}} />);
    await screen.findByRole("dialog");
    const walletGroup = screen.getByRole("group", { name: /Wallet Source|Sumber/i });
    console.log("wallets", Array.from(walletGroup.querySelectorAll("button")).map(b=>[b.textContent,b.getAttribute("aria-pressed")]));
    await user.click(screen.getByRole("button", { name: /Pemasukan|income/i }));
    console.log("after income", Array.from(walletGroup.querySelectorAll("button")).map(b=>[b.textContent,b.getAttribute("aria-pressed")]));
    const g = screen.getByRole("group", { name: /Category|Kategori/i });
    console.log("cats", Array.from(g.querySelectorAll("button")).map(b=>[b.textContent,b.getAttribute("aria-pressed")]));
    await user.click(screen.getByRole("button", { name: shopeePayAccount()!.name }));
    console.log("cats2", Array.from(screen.getByRole("group", { name: /Category|Kategori/i }).querySelectorAll("button")).map(b=>[b.textContent,b.getAttribute("aria-pressed")]));
    expect(true).toBe(true);
  });
});
