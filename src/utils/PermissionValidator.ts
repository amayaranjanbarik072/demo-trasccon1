import { TablePage } from "./TablePage";

type PermissionSet = {
  table: boolean;
  create: boolean;
  edit: boolean;
  view: boolean;
};

export class PermissionValidator {
  constructor(private tablePage: TablePage) { }

  async validate(recordName: string, permission: PermissionSet) {

    if (!permission.table) {
      await this.tablePage.expectTableHidden();
      return;
    }

    await this.tablePage.expectTableVisible();

    permission.create
      ? await this.tablePage.expectCreateIconVisible(true)
      : await this.tablePage.expectCreateIconHidden();

    permission.edit
      ? await this.tablePage.expectEditIconVisible(recordName)
      : await this.tablePage.expectEditIconHidden(recordName);

    permission.view
      ? await this.tablePage.expectViewIconVisible(recordName)
      : await this.tablePage.expectViewIconHidden(recordName);
  }
}
