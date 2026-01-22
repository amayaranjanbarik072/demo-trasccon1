import BasePage from "../../base/BasePage";
import { Page, Locator, expect } from "@playwright/test";
import { CREDENTIALS } from "../../config/Credentials";

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

    this.theUserIsActiveElseWhereAlertPopUp = this.page.locator('xpath= //div[@class="modal-content"]');
    this.theUserIsActiveElseWhereAlertPopUpYesButton = this.page.locator('xpath= //button[.="Yes"]');
    this.theUserIsActiveElseWhereAlertPopUpNoButton = this.page.locator('xpath= //button[.="No"]');
    this.toastMessage = this.page.locator('#toast-container');
  }

  async InvalidLogin() {
    await this.emailTextfield.fill('amaya1@mail.com');
    await this.passwordTextfield.fill('amaya@123');
    await this.selectUnitDropdown.selectOption('Bangalore');
    await this.signInButton.click();
    await this.page.waitForTimeout(2000);
    const toastText = await this.toastUtil.getToastMessage(this.page);
    await this.toastUtil.verifyToastMessage(this.page, toastText);
    console.log('🔔 Toast Message: ', toastText);
  }

  async secondValidLogin() {
    await this.emailTextfield.fill(CREDENTIALS.amayaAdmin.username);
    await this.passwordTextfield.fill(CREDENTIALS.amayaAdmin.password);
    await this.selectUnitDropdown.selectOption(CREDENTIALS.amayaAdmin.unit);
    await this.signInButton.click();
    await this.page.waitForTimeout(2000);

    if (await this.theUserIsActiveElseWhereAlertPopUp.isVisible()) {
      await this.theUserIsActiveElseWhereAlertPopUpYesButton.click();
    } else {
      return null;
    }
    await this.page.waitForTimeout(2000);
    await expect(this.page).toHaveURL(/\/dashboard$/); // ends with dashboard
    await expect(this.page).toHaveTitle(/GetaPCS/); // title contains GetaPCS

    const toastText = await this.toastUtil.getToastMessage(this.page);
    expect(await this.toastUtil.verifyToastMessage(this.page, toastText));
    console.log('🔔 Toast Message: ', toastText);
  }

}

export default LoginPage;