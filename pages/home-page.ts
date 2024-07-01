import { type Locator, type Page } from "@playwright/test";

/* Retry on CI only 
export class HomePage{
-- variables
-- constructor
-- methods (or functions)
}  
*/

export class HomePage{
// variables (read onlies)
// await page.getByRole('link', { name: 'Get started' }).click();
readonly page:Page;
readonly getStartedButton:Locator; // Locator type annotation because of Typescript

// constructor
constructor (page:Page) {
    this.page = page;
    this.getStartedButton = page.getByRole('link', { name: 'Get started' });
}

// methods (or functions)
async clickGetStarted(){
    await this.getStartedButton.click();
}
    
}  

export default HomePage;