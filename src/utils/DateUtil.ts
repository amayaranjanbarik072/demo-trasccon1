import { Locator, Page } from "@playwright/test";

export class DateUtil {

    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    /**
      * Generates a date string for native HTML5 date inputs (YYYY-MM-DD)
      * @param offset Days from today (e.g., 0 for today, 7 for next week, -1 for yesterday)
      */
    static async getFormattedDate(offset: number = 0): Promise<string> {
        const date = new Date();
        date.setDate(date.getDate() + offset);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    /**
     * Selects a date without triggering neighboring pop-ups
     */
    static async selectDate(dateField: Locator, targetDate: string): Promise<void> {
        await dateField.waitFor({ state: 'visible' });

        // Fill the value directly
        await dateField.fill(targetDate);

        // Remove focus safely to "save" the value without clicking next elements
        await dateField.blur();
    }
}
// How to use
//==============================
// 0= current date, crrent date + and current date - we can use
//  const date = await this.dateUtil.getFormattedDate(0);
// const datePluseFive = await this.dateUtil.getFormattedDate(+5);
// const dateMinusFive = await this.dateUtil.getFormattedDate(-5);
//  await this.dateUtil.selectDate(this.dateLocalor, date);
//  await this.dateUtil.selectDate(this.dateLocalor, datePlusFive);
//  await this.dateUtil.selectDate(this.dateLocalor, dateMinusFive);
