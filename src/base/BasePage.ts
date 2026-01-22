import { Page } from '@playwright/test';
//import { SearchBarUtils } from '../utils/SearchBarUtils';
//import { PaginationUtils } from '../utils/PaginationUtil';
import { SecondaryMasterFaker } from '../utils/SecondaryMasterFakerUtils';
import { DateUtil } from '../utils/DateUtil';
import { ToastUtils } from '../utils/ToastUtils';
import { TablePage } from '../utils/TablePage';

export default class BasePage {
  protected page: Page;

  // searchBarUtils: SearchBarUtils;
  // paginationUtils: PaginationUtils;
  secondaryMasterFakerUtils: SecondaryMasterFaker;
  dateUtil: DateUtil;
  toastUtil: ToastUtils;
  tablePageUtil: TablePage;

  constructor(page: Page) {
    this.page = page;
    // this.searchBarUtils = new SearchBarUtils(this.page);
    // this.paginationUtils = new PaginationUtils(this.page);
    this.secondaryMasterFakerUtils = new SecondaryMasterFaker();
    this.dateUtil = new DateUtil();
    this.toastUtil = new ToastUtils();
    this.tablePageUtil = new TablePage(this.page);
  }

  async goto(url: string) {
    await this.page.goto(url);
  }
}

