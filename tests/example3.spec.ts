import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import {
  BatchInfo,
  Configuration,
  EyesRunner,
  ClassicRunner,
  VisualGridRunner,
  BrowserType,
  DeviceName,
  ScreenOrientation,
  Eyes,
  Target
} from '@applitools/eyes-playwright';

const URL = 'https://playwright.dev/';
let homePage: HomePage; 
//const homePage = new HomePage(page);

// Applitools
// export const USE_ULTRAFAST_GRID: boolean = true;
export const USE_ULTRAFAST_GRID: boolean = false;
export let Batch: BatchInfo;
export let Config: Configuration;
export let Runner: EyesRunner;
let eyes: Eyes; //eyes is the class that actually perform the screenshot check for us when we need it
// end of Applitools

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
    // Click the get started link. -- This is what it looks like before
    //await page.getByRole('link', { name: 'Get started' }).click();
    await clickGetStarted(page);
    // Expects page to have a heading with the name of Installation.
    await expect(homePage.installationHeading).toBeVisible();
  });
  
  test('check Java page', async ({ page }) => {
    await clickGetStarted(page);
    await page.getByText('Node.jsNode.jsPythonJava.NET').hover();
    await homePage.javaButton.click();
    await expect(page).toHaveURL('https://playwright.dev/java/docs/intro');
    await expect(homePage.installingPWsubtitle).not.toBeVisible();
    
    //Because is a large text we declare it in a const
    const javaDescription = `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`
    await expect(page.getByText(javaDescription)).toBeVisible();
  });
  
});