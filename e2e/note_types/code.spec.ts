import { test, expect, Page } from "@playwright/test";
import App from "../support/app";

test("Displays lint warnings for backend script", async ({ page }) => {
    const app = new App(page);
    await app.goto();
    await app.closeAllTabs();
    await app.goToNoteInNewTab("Backend script with lint warnings");

    const codeEditor = app.currentNoteSplit.locator(".CodeMirror");

    // Expect two warning signs in the gutter.
    expect(codeEditor.locator(".CodeMirror-gutter-wrapper .CodeMirror-lint-marker-warning")).toHaveCount(2);

    // Hover over hello
    await codeEditor.getByText("hello").first().hover();
    await expectTooltip(page, "'hello' is defined but never used.");

    // Hover over world
    await codeEditor.getByText("world").first().hover();
    await expectTooltip(page, "'world' is defined but never used.");
});

test("Displays lint errors for backend script", async ({ page }) => {
    const app = new App(page);
    await app.goto();
    await app.closeAllTabs();
    await app.goToNoteInNewTab("Backend script with lint errors");

    const codeEditor = app.currentNoteSplit.locator(".CodeMirror");

    // Expect two warning signs in the gutter.
    expect(codeEditor.locator(".CodeMirror-gutter-wrapper .CodeMirror-lint-marker-error")).toHaveCount(1);

    // Hover over hello
    await codeEditor.getByText("world").first().hover();
    await expectTooltip(page, "Parsing error: Unexpected token world");
});

async function expectTooltip(page: Page, tooltip: string) {
    await expect(page.locator(".CodeMirror-lint-tooltip:visible", {
        "hasText": tooltip
    })).toBeVisible();
}