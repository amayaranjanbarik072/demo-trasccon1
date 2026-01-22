import { Page } from "@playwright/test";

export class DateUtil {

    async setDateByFormControl(
        page: Page,
        formControlName: string,
        date: Date
    ) {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');

        const formattedDate = `${yyyy}-${mm}-${dd}`;

        await page
            .locator(`input[formcontrolname="${formControlName}"]`)
            .fill(formattedDate);
    }
}
