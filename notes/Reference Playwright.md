Установить Playwright
npm install -D @playwright/test@latest

Проверить версию Playwright
npx playwright --version

Инициализировать Playwright в новом проекте
npm init playwright@latest

Запустить тесты
npx playwright test
npx playwright test --workers 1
npx playwright test --project api-testing
npx playwright test example.spec.ts
npx playwright test -g 'Name of the test'
// Run only failed
npx playwright test --last-failed

To open **UI mode of Playwright**
npx playwright test --ui
https://playwright.dev/docs/test-ui-mode

Показать **Test report** после прогона
npx playwright show-report 

To debug all tests, run the Playwright test command followed by the --debug flag.
npx playwright test --debug

==============================

Запустить тесты можно ещё так:
npm run test

"test" тут - название скрипта.
Указывается в packege.json
"scripts": {
	"test": "playwright test --headed"
},

Флаг --headed запускает браузеры с отображением GUI.

==============================



==============================



