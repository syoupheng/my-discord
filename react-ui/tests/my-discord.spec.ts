import test, { expect } from "@playwright/test";

test("Redirect to login page if not authenticated and connect to access profile page", async ({ page }) => {
  await page.goto("http://localhost:4173/");

  const emailField = page.getByLabel("E-mail");
  const passwordField = page.getByLabel("Mot de passe");
  await emailField.fill("pheng@gmail.com");
  await passwordField.fill("password");

  const loginBtn = page.getByRole("button", { name: "Connexion" });
  await loginBtn.click();

  await expect(page).toHaveURL("http://localhost:4173/channels/@me");

  const addFriendBtn = page.getByTestId("ADD_FRIEND");
  await addFriendBtn.click();
  const sendFriendRequestBtn = page.getByRole("button", { name: "Envoyer une demande d'ami" });
  await expect(sendFriendRequestBtn).toBeDisabled();

  const logoutBtn = page.getByTestId("Déconnexion");
  await logoutBtn.click();

  await expect(page).toHaveURL("http://localhost:4173/login");
});
