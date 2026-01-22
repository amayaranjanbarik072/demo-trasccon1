import { Page, Locator, expect } from '@playwright/test';

export class AdminUserAccessPage {
  constructor(private page: Page) { }

  // ---------- User Selection ---------- 
  selectUserNameDropdown(): Locator {
    return this.page.locator('xpath= //div[@class="ng-input"]');
  }

  userNameOption(username: string): Locator {
    return this.page.locator('xpath= //div[@class="ng-option"]', { hasText: username });
  }

  async selectUser(username: string) {
    await this.selectUserNameDropdown().click();
    await this.page.keyboard.type('amayaranjan');
    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  // ---------- Permission Table ----------
  rowByFormName(formName: string): Locator {
    return this.page.locator('tr', { hasText: formName });
  }

  permissionCheckbox(formName: string, permission: string): Locator {
    // permission = Table | Create | Edit | View | Delete | Download ...
    return this.rowByFormName(formName)
      .locator(`td`, { hasText: permission })
      .locator('input[type="checkbox"]');
  }

  async setPermission(
    formName: string,
    permission: string,
    enable: boolean
  ) {
    const checkbox = this.permissionCheckbox(formName, permission);
    const isChecked = await checkbox.isChecked();

    if (enable !== isChecked) {
      await checkbox.click();
    }
  }

  // ---------- Save ----------
  saveButton(): Locator {
    return this.page.getByRole('button', { name: 'Save' });
  }

  async savePermissions() {
    await this.saveButton().click();
    await this.page.waitForLoadState('networkidle');
  }
}
