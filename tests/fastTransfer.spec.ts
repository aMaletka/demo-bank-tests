import { test } from "@playwright/test"
import { getUserCredentials } from "../builders/UserBuilder"
import { DashboardPage } from "../page-objects/DashboardPage"
import { loginToAccount } from "../support/Helpers"
import { getQuickPaymentData } from "../builders/PaymentBuilder"

test.describe("Fast transfers", () => {
  test("When user does correctly a quick transfer then his available funds are updated.", async ({
    page,
  }) => {
    const user = getUserCredentials(8, 8)
    const quickPaymentData = getQuickPaymentData()
    await loginToAccount(page, user)
    const dashboardPage = new DashboardPage(page)
    const quickPaymentsPage = await dashboardPage.goToQuickPayment()
    await quickPaymentsPage.fillForm(quickPaymentData)
    await quickPaymentsPage.closeModal()
    await quickPaymentsPage.verifyAndCloseMessage(
      `Przelew wykonany! Chuck Demobankowy - ${quickPaymentData.moneyValue}PLN - ${quickPaymentData.title} `
    )
  })
})
