import { type Locator, type Page } from "@playwright/test";

/* 
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
readonly installationHeading: Locator;
readonly javaButton: Locator;
readonly installingPWsubtitle: Locator;
readonly languageHover: Locator;

// constructor
constructor (page:Page) {
    this.page = page;
    this.getStartedButton = page.getByRole('link', { name: 'Get started' });
    this.installationHeading = page.getByRole('heading', { name: 'Installation' });
    this.javaButton = page.getByText('Java', {exact: true });
    this.installingPWsubtitle = page.getByText('Installing Playwright', {exact:true});
    this.languageHover = page.getByText('Node.jsNode.jsPythonJava.NET');
}

// methods (or functions)
async clickGetStarted(){
    await this.getStartedButton.click();
}
    
}  

export default HomePage;