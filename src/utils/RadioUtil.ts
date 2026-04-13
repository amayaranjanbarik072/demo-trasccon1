import { Locator, expect, test } from '@playwright/test';

export class RadioUtil {

    /**
     * Selects a radio button by clicking it
     * @param locator The specific radio input locator
     * @param fieldName Name for the report (e.g., "Gender: Male")
     */
    static async select(locator: Locator, fieldName: string) {
        await test.step(`Radio Selection: ${fieldName}`, async () => {

            // 1. Check if already selected to save time
            const isSelected = await locator.isChecked();

            if (!isSelected) {
                // Use check() for standard radios, or click() for custom styled ones
                await locator.check();
            }

            // 2. Functional Validation
            await expect(locator, `❌ Radio [${fieldName}] was not selected`).toBeChecked();
        });
    }

    /**
     * Validates which radio button in a group is currently selected
     * @param locator The locator for the radio button that SHOULD be on
     * @param fieldName Name for the report
     */
    static async verifySelected(locator: Locator, fieldName: string) {
        await expect(locator, `❌ Expected [${fieldName}] to be selected, but it was not.`).toBeChecked();
    }
}    