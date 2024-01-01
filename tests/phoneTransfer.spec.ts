import { expect, test } from "@playwright/test"
import { getUserCredentials } from "../builders/UserBuilder"
import { getRandomPhoneNumber, loginToAccount } from "../support/Helpers"
import { DashboardPage } from "../page-objects/DashboardPage"
import { PhonePaymentsPage } from "../page-objects/PhonePaymentsPage"
import { getQuickPaymentData, getTopUpValues } from "../builders/PaymentBuilder"

test.describe("Phone transfers", () => {
  test("Correct phone transfer", async ({ page }) => {
    const user = getUserCredentials(8, 8)
    const quickPaymentData = getQuickPaymentData()
    await loginToAccount(page, user)
    const dashboardPage = new DashboardPage(page)
    const phonePaymentsPage = await dashboardPage.goToQuickPhoneTransfer()
    await phonePaymentsPage.fillForm(quickPaymentData.moneyValue)
    await phonePaymentsPage.closeModal()
    await expect(phonePaymentsPage.messageText).toContainText(
      "Doładowanie wykonane!"
    )
    await phonePaymentsPage.clickInfoMessage()
  })

  test("When user tops up the phone from the desktop, then he sees information about the successful top-up", async ({
    page,
  }) => {
    const user = getUserCredentials(8, 8)
    const selectedPhoneNumber = await getRandomPhoneNumber()
    const topUpValue = getTopUpValues()
    await loginToAccount(page, user)
    const dashboardPage = new DashboardPage(page)
    await dashboardPage.fillFormTopUpPhone(selectedPhoneNumber, topUpValue)
    await dashboardPage.closeModal()
    if (selectedPhoneNumber === "504 xxx xxx") {
      await dashboardPage.verifyAndCloseMessage(
        `Doładowanie wykonane! ${topUpValue.chosenAmount},00PLN na numer ${selectedPhoneNumber}`
      )
    } else {
      await dashboardPage.verifyAndCloseMessage(
        `Doładowanie wykonane! ${topUpValue.randomAmount},00PLN na numer ${selectedPhoneNumber}`
      )
    }
  })

  test("Given user when select phone number, top-up amount then perform the top-up correctly", async ({
    page,
  }) => {
    const user = getUserCredentials(8, 8)
    const topUpValue = getTopUpValues()
    const selectedPhoneNumber = await getRandomPhoneNumber()
    await loginToAccount(page, user)
    const dashboardPage = new DashboardPage(page)
    await dashboardPage.fillFormTopUpPhone(selectedPhoneNumber, topUpValue)
    await dashboardPage.closeModal()
    if (selectedPhoneNumber === "504 xxx xxx") {
      await dashboardPage.verifyAndCloseMessage(
        `Doładowanie wykonane! ${topUpValue.chosenAmount},00PLN na numer ${selectedPhoneNumber}`
      )
    } else {
      await dashboardPage.verifyAndCloseMessage(
        `Doładowanie wykonane! ${topUpValue.randomAmount},00PLN na numer ${selectedPhoneNumber}`
      )
    }
  })
})
