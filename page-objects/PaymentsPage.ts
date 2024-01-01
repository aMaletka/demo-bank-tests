import { Locator, Page, expect } from "@playwright/test"
import { BasePage } from "./BasePage"
import { Payment } from "../builders/PaymentBuilder"

export class PaymentsPage extends BasePage {
  public readonly receiverName: Locator
  public readonly accountNumber: Locator
  public readonly amount: Locator
  public readonly titleForm: Locator
  public readonly normalType: Locator
  public readonly expressType: Locator
  public readonly feeValue: Locator
  public readonly dateForm: Locator
  public readonly addToReceiverListCheckbox: Locator
  public readonly trustReceiverCheckbox: Locator
  public readonly doneButton: Locator
  public readonly nameReceiverError: Locator
  public readonly accountError: Locator
  public readonly amountError: Locator
  public readonly titleError: Locator
  public readonly cancelButton: Locator

  public constructor(page: Page) {
    super(page)
    this.receiverName = page.getByTestId("transfer_receiver")
    this.accountNumber = page.getByTestId("form_account_to")
    this.amount = page.getByTestId("form_amount")
    this.titleForm = page.getByTestId("form_title")
    this.normalType = page.locator("#form_type1")
    this.expressType = page.locator("#form_type2")
    this.feeValue = page.locator("#form_fee")
    this.dateForm = page.locator("#form_date")
    this.dateForm = page.locator("#form_date")
    this.addToReceiverListCheckbox = page.locator("#form_add_receiver")
    this.trustReceiverCheckbox = page.locator("#form_trusted")
    this.doneButton = page.locator("#execute_btn")
    this.nameReceiverError = page.getByTestId(
      "error-widget-4-transfer-receiver"
    )
    this.accountError = page.getByTestId("error-widget-2-transfer-account")
    this.amountError = page.getByTestId("error-widget-1-topup-amount")
    this.titleError = page.getByTestId("error-form-title")
    this.cancelButton = page.getByRole("link", { name: "anuluj" })
  }

  public async verifyClearInputsForm(): Promise<void> {
    await expect(this.receiverName).toBeEmpty()
    await expect(this.accountNumber).toBeEmpty()
    await expect(this.amount).toBeEmpty()
    await expect(this.amount).toBeEmpty()
  }

  public async clickCancelButton(): Promise<void> {
    await this.cancelButton.click()
  }

  public async clearInputTitle(): Promise<void> {
    await this.titleForm.clear()
  }

  public async verifyMandatoryFieldsErrorMessage(): Promise<void> {
    await expect(this.nameReceiverError).toBeVisible()
    await expect(this.accountError).toBeVisible()
    await expect(this.amountError).toBeVisible()
    await expect(this.titleError).toBeVisible()
  }

  public async fillForm(paymentData: Payment): Promise<void> {
    await this.receiverName.fill(paymentData.receiverName)
    await this.accountNumber.fill(paymentData.accountNumber)
    await this.amount.fill(paymentData.amount)
    await this.titleForm.fill(paymentData.title)
    await this.dateForm.fill(paymentData.date)
    await this.receiverName.click()
  }

  public async verifyFeeAmount(): Promise<void> {
    await this.expressType.check()
    await expect(this.feeValue).toContainText("5,00")
    await this.normalType.check()
    await expect(this.feeValue).toContainText("0,00")
  }

  public async addToListReceiver(): Promise<void> {
    await this.addToReceiverListCheckbox.check()
    await this.trustReceiverCheckbox.check()
  }

  public async clickDoneButton(): Promise<void> {
    await this.doneButton.click()
  }
}
