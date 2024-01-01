import { faker } from "@faker-js/faker"

export interface Credentials {
  username: string
  password: string
}

export const getUserCredentials = (
  usernameLenght: number,
  passwordLenght: number
): Credentials => {
  const username = faker.word.adjective(usernameLenght)
  const password = faker.word.adjective(passwordLenght)
  return {
    username,
    password,
  }
}
