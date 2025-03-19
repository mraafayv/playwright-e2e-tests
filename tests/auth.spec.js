// @ts-check

import { test, expect } from "@playwright/test";

//Test 1
test.describe("Authentication Tests", () => {
  test("User should login with valid credentials", async ({ page }) => {
    await page.goto("/login");

    await page.locator("#email-input").fill("test@maddox123.ai");
    await page.locator("#password-input").fill("supersecure");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL("/");
    await expect(page.locator("h1")).toContainText("Home");
  });

  test("User login with invalid credentials should show error", async ({
    page,
  }) => {
    await page.goto("/login");

    await page.locator("#email-input").fill("invalid_user@maddox.ai");
    await page.locator("#password-input").fill("wrongpassword");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL("/login");
    await expect(page.getByRole("paragraph")).toContainText(
      "Invalid email or password. Try again."
    );
  });

  //login edge cases
  //   test("Empty fields should show validation error", async ({ page }) => {
  //     await page.goto("/login");

  //     await page.getByRole("button", { name: "Login" }).click();

  //     await expect(page.getByRole("paragraph")).toContainText(
  //         "Fields cannot be empty"
  //       );
  //   });

  //   test("SQL injection attempt should not work", async ({ page }) => {
  //     await page.goto("/login");
  //     await page.locator("#email-input").fill("admin");
  //     await page.locator("#password-input").fill("' OR 1=1 --");
  //     await page.getByRole("button", { name: "Login" }).click();

  //     await expect(page.getByRole("paragraph")).toContainText(
  //         "Invalid credentials"
  //       );
  //   });
});

//Test 3
test.only("User should logout successfully", async ({ page }) => {
  await page.goto("/login");

  await page.locator("#email-input").fill("test@maddox123.ai");
  await page.locator("#password-input").fill("supersecure");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();

  await page.getByRole("button", { name: "Logout" }).click();

  await expect(
    page.getByRole("heading", { name: "Demo Login Form" })
  ).toBeVisible();
  await page.goto("/");
  await expect(page).toHaveURL("/login");
});

//redirection edge case
// test("User must redirect to home when accessing login page while logged in", async ({
//   page,
// }) => {
//   await page.goto("/login");

//   await page.locator("#email-input").fill("test@maddox123.ai");
//   await page.locator("#password-input").fill("supersecure");
//   await page.getByRole("button", { name: "Login" }).click();

//   await page.goto("/login");

//   await expect(page).toHaveURL("/")
// });
