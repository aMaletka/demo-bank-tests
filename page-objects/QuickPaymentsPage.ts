import { Locator, Page, expect } from "@playwright/test"
import { BasePage } from "./BasePage"
import { QuickPayment } from "../builders/PaymentBuilder"

export class QuickPaymentsPage extends BasePage {
  public readonly selectReceiver: Locator
  public readonly inputAmount: Locator
  public readonly inputTitle: Locator
  public readonly executeButton: Locator

  public constructor(page: Page) {
    super(page)
    this.selectReceiver = page.locator("#widget_1_transfer_receiver")
    this.inputAmount = page.locator("#widget_1_transfer_amount")
    this.inputTitle = page.locator("#widget_1_transfer_title")
    this.executeButton = page.locator("#execute_btn")
  }

  public async fillForm(quickPaymentData: QuickPayment): Promise<void> {
    await this.selectReceiver.selectOption("2")
    await this.inputAmount.fill(quickPaymentData.moneyValue)
    await this.inputTitle.fill(quickPaymentData.title)
    await this.executeButton.click()
  }
}
