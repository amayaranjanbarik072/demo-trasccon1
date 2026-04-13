import { Locator, expect, test } from '@playwright/test';
import path from 'path';

export class FileUtil {

    /**
     * MASTER METHOD: Executes the entire ERP File Upload Lifecycle
     * Assertions are handled inside each sub-method.
     */
    static async completeLifecycle(
        locators: {
            input: Locator,
            preview: Locator,
            save: Locator,
            view: Locator,
            modal: Locator,
            close: Locator
        },
        filePaths: string | string[]
    ) {
        const paths = Array.isArray(filePaths) ? filePaths : [filePaths];
        const names = paths.map(p => path.basename(p));

        await test.step(`File Lifecycle: ${names.join(', ')}`, async () => {
            // 1. Upload
            await this.uploadFiles(locators.input, paths);

            // 2. Verify UI Preview (Assertion inside)
            await this.verifyPreview(locators.preview, names);

            // 3. Save to Server (Assertion inside)
            await this.clickSave(locators.save);

            // 4. Persistence Audit (Assertion inside)
            await this.verifyInModal(locators.view, locators.modal, names);

            // 5. Cleanup (Assertion inside)
            await this.closeModal(locators.modal, locators.close);
        });
    }

    /**
     * MODULAR METHODS
     */
    static async uploadFiles(input: Locator, filePaths: string | string[]) {
        const paths = Array.isArray(filePaths) ? filePaths : [filePaths];
        const absolutePaths = paths.map(p => path.resolve(process.cwd(), p));
        await input.setInputFiles(absolutePaths);
    }

    static async verifyPreview(preview: Locator, fileNames: string | string[]) {
        const names = Array.isArray(fileNames) ? fileNames : [fileNames];
        for (const name of names) {
            // Checks if <input> value matches filename
            await expect(preview).toHaveValue(new RegExp(name, 'i'));
        }
    }

    static async clickSave(saveBtn: Locator) {
        await expect(saveBtn).toBeEnabled();
        await saveBtn.click();
        // Wait for button to disappear to ensure server processing is complete
        await expect(saveBtn).not.toBeVisible();
    }

    static async verifyInModal(viewBtn: Locator, modal: Locator, fileNames: string[]) {
        await viewBtn.click();
        await expect(modal).toBeVisible();
        for (const name of fileNames) {
            // Checks if filename exists within the modal content
            await expect(modal).toContainText(name);
        }
    }

    static async verifyUploadedFileInModal(viewBtn: Locator, modal: Locator, fileNames: string[]) {
        await expect(modal).toBeVisible();
        for (const name of fileNames) {
            // Checks if filename exists within the modal content
            await expect(modal).toContainText(name);
        }
    }

    static async closeModal(modal: Locator, closeBtn: Locator) {
        await closeBtn.click();
        // Verifies the modal is actually gone
        await expect(modal).not.toBeVisible();
    }
}