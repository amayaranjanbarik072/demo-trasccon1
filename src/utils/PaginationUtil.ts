import { Page, Locator } from "@playwright/test";

export class PaginationUtils {
    private page: Page;

    pageSizeDropdown: Locator;
    paginationInfoText: Locator;
    nextButton: Locator;
    prevButton: Locator;
    firstButton: Locator;
    lastButton: Locator;
    pageNumbers: Locator;



    constructor(page: Page) {
        this.page = page;
        this.pageSizeDropdown = page.locator('xpath= //select[@id="example-per-page"]');
        this.paginationInfoText = page.locator('xpath= //div[@class="dataTables_info"]');
        this.nextButton = page.locator('xpath= //a[@class="next"]');
        this.prevButton = page.locator('xpath= //a[@class="prev"]');
        this.firstButton = page.locator('xpath= //a[@class="first"]');
        this.lastButton = page.locator('xpath= //a[@class="last"]');
        this.pageNumbers = page.locator('xpath= //a[@class="paginate_button current"]');
    }



}