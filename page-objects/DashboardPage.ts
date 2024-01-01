import { Locator, Page } from "@playwright/test"
import { QuickPaymentsPage } from "./QuickPaymentsPage"
import { BasePage } from "./BasePage"
import { PhonePaymentsPage } from "./PhonePaymentsPage"
import { PaymentsPage } from "./PaymentsPage"
import { Payment, TopUp } from "../builders/PaymentBuilder"

export class DashboardPage extends BasePage {
  public readonly logo: Locator
  public readonly username: Locator
  public readonly quickPayment: Locator
  public readonly phonePayment: Locator
  public readonly payments: Locator
  public readonly selectReceiver: Locator
  public readonly inputAmount: Locator
  public readonly inputTitle: Locator
  public readonly executeButton: Locator
  public readonly inputPhone: Locator
  public readonly inputAmountPhone: Locator
  public readonly checkboxAgreement: Locator
  public readonly topUpPhoneButton: Locator

  public constructor(page: Page) {
    super(page)
    this.logo = page.locator(".logo")
    this.username = page.getByTestId("user-name")
    this.quickPayment = page.getByRole("link", { name: "szybki przelew" })
    this.phonePayment = page.getByRole("link", { name: "doładowanie telefonu" })
    this.payments = page.getByRole("link", { name: "płatności" })
    this.selectReceiver = page.locator("#widget_1_transfer_receiver")
    this.inputAmount = page.locator("#widget_1_transfer_amount")
    this.inputTitle = page.locator("#widget_1_transfer_title")
    this.executeButton = page.locator("#execute_btn")
    this.inputPhone = page.locator("#widget_1_topup_receiver")
    this.inputAmountPhone = page.locator("#widget_1_topup_amount")
    this.checkboxAgreement = page.locator("#widget_1_topup_agreement")
    this.topUpPhoneButton = page.locator("#execute_phone_btn")
  }

  public async goToQuickPayment(): Promise<QuickPaymentsPage> {
    await this.quickPayment.click()
    return new QuickPaymentsPage(this.page)
  }

  public async goToQuickPhoneTransfer(): Promise<PhonePaymentsPage> {
    await this.phonePayment.click()
    return new PhonePaymentsPage(this.page)
  }

  public async goToPayments(): Promise<PaymentsPage> {
    await this.payments.click()
    return new PaymentsPage(this.page)
  }

  public async fillFormQuickTransfer(getPaymentsData: Payment): Promise<void> {
    await this.selectReceiver.selectOption("2")
    await this.inputAmount.fill(getPaymentsData.amount)
    await this.inputTitle.fill(getPaymentsData.title)
  }

  public async executeButtonQuickTransfer(): Promise<void> {
    await this.executeButton.click()
  }

  public async fillFormTopUpPhone(
    selectedPhoneNumber: string,
    topUpValue: TopUp
  ): Promise<void> {
    await this.inputPhone.selectOption(selectedPhoneNumber)

    if (selectedPhoneNumber === "504 xxx xxx") {
      await this.inputAmountPhone.selectOption(topUpValue.chosenAmount)
    } else {
      await this.inputAmountPhone.fill(topUpValue.randomAmount)
    }

    await this.checkboxAgreement.check()
    await this.topUpPhoneButton.click()
  }
}
