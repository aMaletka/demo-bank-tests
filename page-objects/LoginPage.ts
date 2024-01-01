import { Locator, Page, expect } from "@playwright/test"
import { Credentials } from "../builders/UserBuilder"

export class LoginPage {
  public readonly page: Page
  public readonly loginInput: Locator
  public readonly passwordInput: Locator
  public readonly loginButton: Locator
  public readonly loginError: Locator
  public readonly passwordError: Locator

  public constructor(page: Page) {
    this.page = page
    this.loginInput = page.getByTestId("login-input")
    this.passwordInput = page.getByTestId("password-input")
    this.loginButton = page.getByTestId("login-button")
    this.loginError = page.getByTestId("error-login-id")
    this.passwordError = page.getByTestId("error-login-password")
  }

  public async goTo(): Promise<void> {
    await this.page.goto("/")
  }

  public async login({ username, password }: Credentials): Promise<void> {
    await this.loginInput.fill(username)
    await this.passwordInput.fill(password)
    await this.loginButton.click()
  }

  public async fillLoginCredentials({
    username,
    password,
  }: Credentials): Promise<void> {
    await this.loginInput.fill(username)
    await this.passwordInput.fill(password)
  }

  public async verifyMandatoryFieldsErrorMessage(): Promise<void> {
    await this.loginInput.click()
    await expect(this.loginError).toBeVisible()
    await expect(this.passwordError).toBeVisible()
  }

  public async clearLoginAndPassword(): Promise<void> {
    await this.loginInput.clear()
    await this.passwordInput.clear()
  }
}
