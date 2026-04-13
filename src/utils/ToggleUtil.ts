import { Locator, expect, test } from '@playwright/test';

export class ToggleUtil {

    /**
     * Changes the toggle to the desired state (ON or OFF)
     */
    static async set(locator: Locator, targetState: boolean, fieldName: string) {
        await test.step(`Setting ${fieldName} to ${targetState ? 'ON' : 'OFF'}`, async () => {
            // The slider is the clickable <span> next to the hidden <input>
            const slider = locator.locator('xpath=..//span[contains(@class, "slider")]');
            const isCurrentlyChecked = await locator.isChecked();
            if (isCurrentlyChecked !== targetState) {
                await slider.click();
            }
            // Verify the action worked
            await this.verifyState(locator, targetState, fieldName);
            await this.verifyColor(locator, targetState, fieldName);
        });
    }

    /**
     * Verifies if the toggle is checked or unchecked
     */
    static async verifyState(locator: Locator, expectedState: boolean, fieldName: string) {
        await expect(locator, `❌ ${fieldName} state should be ${expectedState}`).toBeChecked({ checked: expectedState });
    }
    /**
     * Verifies the UI color (Green for ON, Red for OFF)
     */
    static async verifyColor(locator: Locator, isOn: boolean, fieldName: string) {
        const slider = locator.locator('xpath=..//span[contains(@class, "slider")]');
        // Industry Standard: Define colors as constants
        const GREEN = 'rgba(0, 128, 0, 0.65)';
        const RED = 'rgba(239, 72, 72, 0.73)';
        const expectedColor = isOn ? GREEN : RED;
        await expect(slider, `❌ ${fieldName} color should be ${isOn ? 'Green' : 'Red'}`)
            .toHaveCSS('background-color', expectedColor);
    }
}