import { Locator, Page, expect } from "@playwright/test"

export class BasePage {
  public readonly page: Page
  public readonly messageText: Locator
  public readonly okButton: Locator

  public constructor(page: Page) {
    this.page = page
    this.messageText = this.page.getByTestId("message-text")
    this.okButton = this.page.getByTestId("close-button")
  }

  public async clickInfoMessage(): Promise<void> {
    await this.messageText.click()
  }

  public async verifyAndCloseMessage(expectedText: string): Promise<void> {
    await expect(this.messageText).toContainText(expectedText)
    await this.messageText.click()
    await expect(this.messageText).toHaveText("Brak wiadomości")
  }

  public async closeModal(): Promise<void> {
    await this.okButton.click()
  }
}
