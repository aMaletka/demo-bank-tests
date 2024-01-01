import { Page, expect } from "@playwright/test"
import { Credentials } from "../builders/UserBuilder"
import { LoginPage } from "../page-objects/LoginPage"
import { DashboardPage } from "../page-objects/DashboardPage"

export const loginToAccount = async (
  page: Page,
  user: Credentials
): Promise<void> => {
  const loginPage = new LoginPage(page)
  await loginPage.goTo()
  await loginPage.login(user)
  const dashboardPage = new DashboardPage(page)
  await expect(dashboardPage.logo).toBeVisible()
}

const phoneNumbers = [
  "500 xxx xxx",
  "502 xxx xxx",
  "503 xxx xxx",
  "504 xxx xxx",
]

export async function getRandomPhoneNumber() {
  const randomIndex = Math.floor(Math.random() * phoneNumbers.length)
  return phoneNumbers[randomIndex]
}
