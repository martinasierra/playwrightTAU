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
export const USE_ULTRAFAST_GRID: boolean = false; //**The Ultrafast Grid will manage all the test execution in the cloud first, so if you want to run more browsers and devices, you can use that and Applitools will take care of everything. **
export let Batch: BatchInfo;
export let Config: Configuration;
export let Runner: EyesRunner;
let eyes: Eyes; //eyes is the class that actually perform the screenshot check for us when we need it
// end of Applitools

// beforeAll for Applitools
test.beforeAll(async() => {

  if (USE_ULTRAFAST_GRID) {
      Runner = new VisualGridRunner({ testConcurrency: 1 });
  }
  else {
      Runner = new ClassicRunner(); //you need to manage everything locally, so you don't pass any parameters, you need to run every single browser or device in the local machine.
  }
  
  const runnerName = (USE_ULTRAFAST_GRID) ? 'Ultrafast Grid' : 'Classic runner';
  Batch = new BatchInfo({name: `Playwright website - ${runnerName}`}); //A batch is a collection of checkpoints for each test suite.
  
  Config = new Configuration();
  // Config.setApiKey("<your-api-key>");
  
  Config.setBatch(Batch);
  if (USE_ULTRAFAST_GRID) {
      Config.addBrowser(800, 600, BrowserType.CHROME);
      Config.addBrowser(1600, 1200, BrowserType.FIREFOX);
      Config.addBrowser(1024, 768, BrowserType.SAFARI);
      Config.addDeviceEmulation(DeviceName.iPhone_11, ScreenOrientation.PORTRAIT);
      Config.addDeviceEmulation(DeviceName.Nexus_10, ScreenOrientation.LANDSCAPE);
  }

});

test.beforeEach(async ({page}) => {
    await page.goto(URL);    
    homePage = new HomePage(page);
})

test.afterEach(async () => {
  await eyes.close();
});

test.afterAll(async() => {
  // forces Playwright to wait synchronously for all visual checkpoints to complete.
  const results = await Runner.getAllTestResults();
  console.log('Visual test results', results);
});

async function clickGetStarted(page: Page) {
  await homePage.clickGetStarted();
}

test.describe('Playwright website', () => {

test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Playwright/);
     // https://applitools.com/docs/api-ref/sdk-api/playwright/js-intro/checksettings
     await eyes.check('Home page', Target.window().fully()); //Target.window, it'll consider only the view port  .fully, it will scroll and take the screenshot of the full page.
  });
  
  test('get started link', async ({ page }) => {
    await clickGetStarted(page);
    await expect(page).toHaveTitle(/Playwright/);
    // https://applitools.com/docs/api-ref/sdk-api/playwright/js-intro/checksettings#region-match-levels
    // Layout: Check only the layout and ignore actual text and graphics.
    await eyes.check('Get Started page', Target.window().fully().layout());
  });
  
  test('check Java page', async ({ page }) => {
    await test.step('Act', async () => {
    await clickGetStarted(page);
    await homePage.languageHover.hover();
    await homePage.javaButton.click();
  });    
  await test.step('Assert', async () => {
    await expect(page).toHaveURL('https://playwright.dev/java/docs/intro');
    await expect(homePage.installingPWsubtitle).not.toBeVisible();
    const javaDescription = `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`
    await expect(page.getByText(javaDescription)).toBeVisible();
    // https://applitools.com/docs/api-ref/sdk-api/playwright/js-intro/checksettings#region-match-levels
    // Ignore colors: Similar to the strict match level but ignores changes in colors.
    await eyes.check('Java page', Target.window().fully().ignoreColors());
  });
  });

});    