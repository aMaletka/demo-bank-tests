import { Locator, Page } from "@playwright/test"
import { BasePage } from "./BasePage"

export class PhonePaymentsPage extends BasePage {
  public readonly inputPhone: Locator
  public readonly inputAmount: Locator
  public readonly checkboxAgreement: Locator
  public readonly doneButton: Locator

  public constructor(page: Page) {
    super(page)
    this.inputPhone = page.locator("#widget_1_topup_receiver")
    this.inputAmount = page.locator("#widget_1_topup_amount")
    this.checkboxAgreement = page.locator("#widget_1_topup_agreement")
    this.doneButton = page.locator("#execute_btn")
  }

  public async fillForm(amount: string): Promise<void> {
    await this.inputPhone.selectOption("502 xxx xxx")
    await this.inputAmount.fill(amount)
    await this.checkboxAgreement.check()
    await this.doneButton.click()
  }
}
