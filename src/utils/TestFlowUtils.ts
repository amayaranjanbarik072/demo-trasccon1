import fs from 'fs';
import path from 'path';
import assert from 'assert';
import type { Locator, Page } from '@playwright/test';
import BasePage from "../base/BasePage";

export class TestFlowUtils extends BasePage {

    // ---------------- Menu click helper ----------------
    // static async clickOnOption(page: Page, topMenu: string, mainOption: string, subOption: string | { name: string; exact?: boolean }, iconSelector: string) {
    static async clickOnOption(page: Page, topMenu: string, mainOption: string, subOption: string | { name: string; exact?: boolean }) {
        const topMenuLocator = page.locator(`//a[contains(text(), '${topMenu}')]`);
        await topMenuLocator.waitFor({ state: 'visible' });
        await topMenuLocator.hover();
        await topMenuLocator.click();

        const mainOptionLocator = page.locator(`//h4[contains(text(), '${mainOption}')]`);
        await mainOptionLocator.waitFor({ state: 'visible' });
        await mainOptionLocator.hover();

        const subOptionLocator = page.locator(`//div[@class='submenu'][.//h4[contains(text(), '${mainOption}')]]//a[contains(text(), '${subOption}')]`);
        await subOptionLocator.waitFor({ state: 'visible' });
        await subOptionLocator.click();

        // const subSubOptionLocator = page.locator(iconSelector);
        // await subSubOptionLocator.waitFor({ state: 'visible' });
        // await subSubOptionLocator.click();
    }

}