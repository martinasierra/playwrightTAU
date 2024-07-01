import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/home-page'

const URL = 'https://playwright.dev/';
let homePage: HomePage; // I still don't understand this

test.beforeEach(async ({page}) => {
    await page.goto(URL);    
    homePage = new HomePage(page);
})

async function clickGetStarted(page: Page) {
    await homePage.clickGetStarted();
}

test.describe('Playwright website', () => {

test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Playwright/);
  });
  
  test('get started link', async ({ page }) => {
    // Click the get started link.
    //await page.getByRole('link', { name: 'Get started' }).click();
    await clickGetStarted(page);
    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });
  
  test.only('check Java page', async ({ page }) => {
    await clickGetStarted(page);
    await page.getByText('Node.jsNode.jsPythonJava.NET').hover();
    await page.getByText('Java', { exact: true }).click();
    await expect(page).toHaveURL('https://playwright.dev/java/docs/intro');
    await expect(page.getByText('Installing Playwright', {exact:true})).not.toBeVisible();
    
    //Because is a large text we declare it in a const
    const javaDescription = `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`
    await expect(page.getByText(javaDescription)).toBeVisible();
  });
  
});