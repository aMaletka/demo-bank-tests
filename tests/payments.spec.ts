import { test } from "@playwright/test"
import { getUserCredentials } from "../builders/UserBuilder"
import { loginToAccount } from "../support/Helpers"
import { DashboardPage } from "../page-objects/DashboardPage"
import { getPaymentsData } from "../builders/PaymentBuilder"

test.describe("Correct payments", () => {
  test("When the user makes a correct transfer and adds the recipient as trusted, then recipient is visible on the list", async ({
    page,
  }) => {
    const user = getUserCredentials(8, 8)
    const paymentData = getPaymentsData()
    await loginToAccount(page, user)
    const dashboardPage = new DashboardPage(page)
    const paymentsPage = await dashboardPage.goToPayments()
    await paymentsPage.fillForm(paymentData)
    await paymentsPage.verifyFeeAmount()
    await paymentsPage.addToListReceiver()
    await paymentsPage.clickDoneButton()
    await paymentsPage.closeModal()
    await paymentsPage.verifyAndCloseMessage(
      `Przelew wykonany! ${paymentData.amount},00PLN dla ${paymentData.receiverName}`
    )
  })

  test("When a user click send transfer without providing data then transfer isn't send and user sees mandatory fields.", async ({
    page,
  }) => {
    const user = getUserCredentials(8, 8)
    await loginToAccount(page, user)
    const dashboardPage = new DashboardPage(page)
    const paymentsPage = await dashboardPage.goToPayments()
    await paymentsPage.clearInputTitle()
    await paymentsPage.clickDoneButton()
    await paymentsPage.verifyMandatoryFieldsErrorMessage()
  })

  test("When user completes form and clicks cancel then provided data has been deleted", async ({
    page,
  }) => {
    const user = getUserCredentials(8, 8)
    const paymentData = getPaymentsData()
    await loginToAccount(page, user)
    const dashboardPage = new DashboardPage(page)
    const paymentsPage = await dashboardPage.goToPayments()
    await paymentsPage.fillForm(paymentData)
    await paymentsPage.clickCancelButton()
    await paymentsPage.verifyClearInputsForm()
  })

  test("When user makes a quick transfer from the desktop, it will sent and the information will be visible on the desktop", async ({
    page,
  }) => {
    const user = getUserCredentials(8, 8)
    const paymentData = getPaymentsData()
    await loginToAccount(page, user)
    const dashboardPage = new DashboardPage(page)
    await dashboardPage.fillFormQuickTransfer(paymentData)
    await dashboardPage.executeButtonQuickTransfer()
    await dashboardPage.closeModal()
    await dashboardPage.verifyAndCloseMessage(
      `Przelew wykonany! Chuck Demobankowy - ${paymentData.amount},00PLN - ${paymentData.title}`
    )
  })
})
