# demo-bank-tests

## Zbiór testów E2E napisanych w Playwright z zastosowaniem TypeScript

## Opis projektu

Projekt został stworzony w celu udokumentowania umiejętności pisania testów end-to-end (E2E) z użyciem Playwright i Typescript. Projekt ten nie tylko obejmuje testy, ale również konfigurację, szablon architektury oraz przykładowe testy. W celu zachowania czytelności i łatwości zarządzania, zastosowano wzorzec Page Object Model do oddzielenia logiki testów od szczegółów implementacyjnych.

***
Została wykorzystana publiczna strona [Demo Bank](https://demo-bank.vercel.app/) do napisania testów.
 Warto zaznaczyć, że testy nie weryfikują poprawności strony, ale dostosowują się do jej aktualnego stanu skupiając się na podkreśleniu umiejętności pisania testów E2E.

## Instalacja

1. Sklonuj repozytorium:

```bash
git clone https://github.com/aMaletka/demo-bank-tests.git
```

2. Przejdź do katalogu projektu
```cd demo-bank-tests```

3. Zainstaluj zależności 
```npm i```

## Uruchamianie testów
Aby uruchomić testy w trybie debug wykonaj poniższą komendę w terminalu:
```npm run e2e:debug```

Aby uruchomić testy w trybie headless wykonaj poniższą komendę w terminalu:
```npm run e2e:run```