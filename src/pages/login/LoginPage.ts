import BasePage from "../../base/BasePage";
import { Page, Locator, expect } from "@playwright/test";
import { EnvUtils } from "../../utils/envUtils";

class LoginPage extends BasePage {
  private emailTextfield: Locator;
  private passwordTextfield: Locator;
  private showPasswordEyeIcon: Locator;
  private selectUnitDropdown: Locator;
  private signInButton: Locator;
  private toastMessage: Locator;

  private theUserIsActiveElseWhereAlertPopUp: Locator;
  private theUserIsActiveElseWhereAlertPopUpYesButton: Locator;
  private theUserIsActiveElseWhereAlertPopUpNoButton: Locator;



  constructor(page: Page) {
    super(page);
    this.emailTextfield = this.page.locator('xpath= //input[@type="email"]');
    this.passwordTextfield = this.page.locator('xpath= //input[@type="password"]');
    this.showPasswordEyeIcon = this.page.locator('#show_eye');
    this.selectUnitDropdown = this.page.locator('xpath= //select[contains(@class,"login__input")]');
    this.signInButton = this.page.locator('xpath= //button[@class="button login__submit"]');

    this.theUserIsActiveElseWhereAlertPopUp = this.page.locator('xpath= //ngb-modal-window//h4[contains(text(),"user is active else where")]');
    this.theUserIsActiveElseWhereAlertPopUpYesButton = this.page.locator('xpath= //ngb-modal-window//button[normalize-space()="Yes"]');
    this.theUserIsActiveElseWhereAlertPopUpNoButton = this.page.locator('xpath= //ngb-modal-window//button[normalize-space()="No"]');
    this.toastMessage = this.page.locator('#toast-container');
  }

  async InvalidLogin() {
    await this.emailTextfield.fill('amaya1@mail.com');
    await this.passwordTextfield.fill('amaya@123');
    await this.selectUnitDropdown.selectOption('Bangalore');
    await this.signInButton.click();
    await this.page.waitForTimeout(2000);
    // const toastText = await this.toastUtil.getToastMessage(this.page);
    // await this.toastUtil.verifyToastMessage(this.page, toastText);
    // console.log('🔔 Toast Message: ', toastText);
    await this.verifyToast("× User does not exist");
  }

  async secondValidLogin() {
    const { username, password, unit } = EnvUtils.getCredentials();
    await this.emailTextfield.fill(username);
    await this.passwordTextfield.fill(password);
    await this.selectUnitDropdown.selectOption(unit);
    await this.signInButton.click();
    await this.page.waitForTimeout(2000);
    if (await this.theUserIsActiveElseWhereAlertPopUp.isVisible()) {
      await this.theUserIsActiveElseWhereAlertPopUpYesButton.click();
    }
    await expect(this.page).toHaveURL(/\/dashboard$/); // ends with dashboard
    await expect(this.page).toHaveTitle(/GetaPCS/); // title contains GetaPCS

    // const toastText = await this.toastUtil.getToastMessage(this.page);
    // expect(await this.toastUtil.verifyToastMessage(this.page, toastText));
    // console.log('🔔 Toast Message: ', toastText);
    //await this.getToastMessage();
    await this.verifyToast("× Login Successfully!!!");
  }

}

export default LoginPage;