import { faker } from "@faker-js/faker"

export interface QuickPayment {
  moneyValue: string
  title: string
}

export const getQuickPaymentData = (): QuickPayment => {
  const moneyValue = faker.finance
    .amount({ min: 5, max: 150 })
    .replace(".", ",")
  const title = faker.word.words(2)
  return {
    moneyValue,
    title,
  }
}

export interface Payment {
  receiverName: string
  accountNumber: string
  amount: string
  title: string
  date: string
}

export const getPaymentsData = (): Payment => {
  const receiverName = faker.person.fullName().replace("[^A-Za-z]", "")
  const accountNumber = faker.finance.accountNumber(26)
  const amount = faker.finance.amount().replace(".", ",")
  const title = faker.word.words({ count: { min: 1, max: 5 } })
  const date = faker.date.future().toLocaleDateString()
  return {
    receiverName,
    accountNumber,
    amount,
    title,
    date,
  }
}

export interface TopUp {
  chosenAmount: string
  randomAmount: string
}

const topUpValues = ["5", "10", "25", "40", "50", "100", "200"]

export const getTopUpValues = (): TopUp => {
  const arrayPlace = Math.floor(Math.random() * topUpValues.length)
  const chosenAmount = topUpValues[arrayPlace]

  const randomAmount = faker.finance.amount().replace(".", ",")

  return { chosenAmount, randomAmount }
}
