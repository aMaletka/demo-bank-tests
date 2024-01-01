import { expect, test } from "@playwright/test"
import { LoginPage } from "../page-objects/LoginPage"
import { getUserCredentials } from "../builders/UserBuilder"
import { DashboardPage } from "../page-objects/DashboardPage"
import { loginToAccount } from "../Support/Helpers"

test.describe("Login page", () => {
  test("User can login with valid credentials", async ({ page }) => {
    const user = getUserCredentials(8, 8)
    await loginToAccount(page, user)
    const dashboardPage = new DashboardPage(page)
    await expect(page).toHaveURL("/pulpit.html")
    await expect(dashboardPage.username).toBeVisible()
  })
  test("When user log in with incorrect login and incorrect password then user sees error messages", async ({
    page,
  }) => {
    const user = getUserCredentials(7, 7)
    const loginPage = new LoginPage(page)
    await loginPage.goTo()
    await loginPage.fillLoginCredentials(user)
    await loginPage.verifyMandatoryFieldsErrorMessage()
    await loginPage.clearLoginAndPassword()
    await loginPage.verifyMandatoryFieldsErrorMessage()
  })
})
