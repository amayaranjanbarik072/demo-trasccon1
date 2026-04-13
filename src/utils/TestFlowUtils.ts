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
    await mainOptionLocator.click();


    const subOptionLocator = page.locator(`//div[@class='submenu'][.//h4[contains(text(), '${mainOption}')]]//a[contains(text(), '${subOption}')]`);
    await subOptionLocator.waitFor({ state: 'visible' });
    await subOptionLocator.click();

    // const subSubOptionLocator = page.locator(iconSelector);
    // await subSubOptionLocator.waitFor({ state: 'visible' });
    // await subSubOptionLocator.click();
  }

  /**
   * Load a .properties file and return as a key-value object
   */
  static loadProperties(filePath: string): Record<string, string> {
    // Use the provided filePath; if it's relative, resolve it under ../testData
    const absolutePath = path.isAbsolute(filePath)
      ? filePath
      : path.resolve(__dirname, "../testData", filePath);

    if (!fs.existsSync(absolutePath)) {
      throw new Error(`Properties file not found: ${absolutePath}`);
    }

    const content = fs.readFileSync(absolutePath, 'utf-8');
    const lines = content.split(/\r?\n/);
    const props: Record<string, string> = {};

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const [key, ...rest] = trimmedLine.split('=');
        if (key) props[key.trim()] = rest.join('=').trim();
      }
    }

    return props;
  }

  /**
  * Returns a sorted and unique list of items of a specific type (fg, sa, pp)
  */
  static getSortedUniqueItems(properties: Record<string, string>, type: string): string[] {
    const uniqueValues = new Set<string>();
    const items: string[] = [];

    for (const key in properties) {
      const value = properties[key] ?? '';
      const keyStr = key.toString();
      if (!uniqueValues.has(value) && keyStr.toLowerCase().includes(type.toLowerCase())) {
        items.push(value);
        uniqueValues.add(value);
      }
    }

    items.sort((a, b) => {
      const aNum = parseInt(a.split('_')[1]) || 0;
      const bNum = parseInt(b.split('_')[1]) || 0;
      return aNum - bNum;
    });

    console.log(`Sorted ${type.toUpperCase()} Items:`, items);
    return items;
  }

  static getSortedUniqueFGItems(properties: Record<string, string>): string[] {
    return this.getSortedUniqueItems(properties, 'fg');
  }

  static getSortedUniqueSAItems(properties: Record<string, string>): string[] {
    return this.getSortedUniqueItems(properties, 'sa');
  }

  static getSortedUniquePPItems(properties: Record<string, string>): string[] {
    return this.getSortedUniqueItems(properties, 'pp');
  }



}