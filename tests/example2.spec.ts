import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/home.page'

const URL = 'https://playwright.dev/';
let homePage: HomePage; // Create new variable
//const homePage = new HomePage(page);

test.beforeEach(async ({page}) => {
    await page.goto(URL);    
    homePage = new HomePage(page); //New instance of the homePage variable
})

async function clickGetStarted(page: Page) {
    await homePage.clickGetStarted();
}

test.describe('Playwright website', () => {

test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Playwright/);
  });
  
  test('get started link', async ({ page }) => {
    // Click the get started link. -- This is what it looks like before
    //await page.getByRole('link', { name: 'Get started' }).click();
    await clickGetStarted(page);
    await expect(page).toHaveTitle(/Playwright/);
    // Expects page to have a heading with the name of Installation.
    await expect(homePage.installationHeading).toBeVisible();
  });
  
  test('check Java page', async ({ page }) => {
    await clickGetStarted(page);
    await homePage.languageHover.hover();
    await homePage.javaButton.click();
    await expect(page).toHaveURL('https://playwright.dev/java/docs/intro');
    await expect(homePage.installingPWsubtitle).not.toBeVisible();
    //Because is a large text we declare it in a const
    const javaDescription = `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`
    await expect(page.getByText(javaDescription)).toBeVisible();
  });
  
});