import { expect } from '@playwright/test'
import { testWithUsers } from '../fixtures/test-with-users'
import { AddUserPage } from '../pages/add-user'
import { getFrontendConfig } from '../helpers'
import { UsersListPage } from '../pages/users-list'

const noUsersTest = testWithUsers([])

noUsersTest('create user', async ({ page: _page }) => {
    const addUserPage = new AddUserPage(_page)
    await addUserPage.goto()

    const submitBtn = await addUserPage.getSubmitButton()
    await expect(submitBtn).toBeDisabled()

    await addUserPage.fillForm({
        lastname: 'Chopin',
        firstname: 'Frédéric'
    })

    submitBtn.click()

    const message = await addUserPage.getMessage(`L'utilisateur Chopin Frédéric a été ajouté avec succès. Redirection en cours...`)
    await expect(message).toBeVisible()

    const config = await getFrontendConfig()
    const url = config.origin()
    url.pathname = '/users'
    await _page.waitForURL(url.toString())

    const usersListPage = new UsersListPage(_page)
    const listedUsers = await usersListPage.getDisplayedUsers(1)
    expect(listedUsers).toStrictEqual([
        {
            firstname: 'Frédéric',
            lastname: 'Chopin'
        }
    ])
})

const existingUserTest = testWithUsers([
    {
        lastname: 'Fauré',
        firstname: 'Gabriel'
    }
])

existingUserTest('user already exists', async ({ page: _page }) => {
    const addUserPage = new AddUserPage(_page)
    await addUserPage.goto()

    await addUserPage.fillForm({
        lastname: 'Fauré',
        firstname: 'Gabriel'
    })

    const submitBtn = await addUserPage.getSubmitButton()
    submitBtn.click()

    const message = await addUserPage.getMessage('Cet utilisateur existe déjà !')
    await expect(message).toBeVisible()
})