import { expect } from '@playwright/test'
import { testWithUsers } from '../fixtures/test-with-users'
import { UsersListPage } from '../pages/users-list'
import { getFrontendConfig } from '../helpers'

const performListCommonAssertions = async (page: UsersListPage) => {
  const headers = await page.getHeaders()
  expect(headers).toStrictEqual([
    'Nom',
    'Prénom'
  ])
}

const noUsersTest = testWithUsers([])

noUsersTest('no users', async ({ page: _page }) => {
  const page = new UsersListPage(_page)
  await page.goto()
  const headingText = await page.getHeadingText()
  expect(headingText).toContain('Liste des utilisateurs (0)')
  await page.getNoUserText().isVisible()
  expect(await page.getPaginationRangeLabel()).toContain('0 - 0 sur 0')
})

const oneUserTest = testWithUsers([
  {
    firstname: 'Frédéric',
    lastname: 'Chopin'
  }
])

oneUserTest('one user', async ({ page: _page }) => {
  const page = new UsersListPage(_page)
  await page.goto()

  await performListCommonAssertions(page)
  
  const headingText = await page.getHeadingText()
  expect(headingText).toContain('Liste des utilisateurs (1)')
  
  const users = await page.getDisplayedUsers(1)
  expect(users, 'la liste des utilisateurs doit contenir un utilisateur').toStrictEqual([
    {
      firstname: 'Frédéric',
      lastname: 'Chopin'
    }
  ])
  expect(await page.getPaginationRangeLabel()).toContain('1 - 1 sur 1')
})

const multiplePagesTest = testWithUsers([
  {
    firstname: 'Frédéric',
    lastname: 'Chopin'
  },
  {
    firstname: 'Franz',
    lastname: 'Liszt'
  },
  {
    firstname: 'Robert',
    lastname: 'Schumann'
  },
  {
    firstname: 'Sergueï',
    lastname: 'Rachmaninoff'
  },
  {
    firstname: 'Alexandre',
    lastname: 'Scriabine'
  },
  {
    firstname: 'Franz',
    lastname: 'Schubert'
  },
  {
    firstname: 'Maurice',
    lastname: 'Ravel'
  },
  {
    firstname: 'Claude',
    lastname: 'Debussy'
  }
])

multiplePagesTest('multiple pages of users', async ({ page: _page }) => {
  const expectedFirstPageUsers = [
    {
      firstname: 'Frédéric',
      lastname: 'Chopin'
    },
    {
      firstname: 'Claude',
      lastname: 'Debussy'
    },
    {
      firstname: 'Franz',
      lastname: 'Liszt'
    },
    {
      firstname: 'Sergueï',
      lastname: 'Rachmaninoff'
    },
    {
      firstname: 'Maurice',
      lastname: 'Ravel'
    }
  ]

  const expectedSecondPageUsers = [
    {
      firstname: 'Franz',
      lastname: 'Schubert'
    },
    {
      firstname: 'Robert',
      lastname: 'Schumann'
    },
    {
      firstname: 'Alexandre',
      lastname: 'Scriabine'
    }
  ]

  const page = new UsersListPage(_page)
  await page.goto()

  await performListCommonAssertions(page)

  const headingText = await page.getHeadingText()
  expect(headingText).toContain('Liste des utilisateurs (8)')

  const next = await page.nextPage()
  const back = await page.previousPage()

  // première page
  expect(await page.getDisplayedUsers(5), 'la première page doit contenir ces utilisateurs')
    .toStrictEqual(expectedFirstPageUsers)
  expect(await page.getPaginationRangeLabel()).toContain('1 - 5 sur 8')

  // seconde page
  await next.click()
  expect(await page.getDisplayedUsers(3), 'la seconde page doit contenir ces utilisateurs')
    .toStrictEqual(expectedSecondPageUsers)
  expect(await page.getPaginationRangeLabel()).toContain('6 - 8 sur 8')

  // retour première page
  await back.click()
  expect(await page.getDisplayedUsers(5), 'la première page doit contenir ces utilisateurs')
    .toStrictEqual(expectedFirstPageUsers)
  expect(await page.getPaginationRangeLabel()).toContain('1 - 5 sur 8')

  // changement de nombre d'items par page
  await page.setItemsPerPage(10)
  await expect(next).toBeDisabled()
  await expect(back).toBeDisabled()
  expect(await page.getDisplayedUsers(8), 'la première page doit contenir ces utilisateurs')
    .toStrictEqual([...expectedFirstPageUsers, ...expectedSecondPageUsers])
  expect(await page.getPaginationRangeLabel()).toContain('1 - 8 sur 8')
})

noUsersTest('link to add user', async ({ page: _page }) => {
  const page = new UsersListPage(_page)
  await page.goto()
  await page.goToAdd()

  const url = (await getFrontendConfig()).origin()
  url.pathname = '/users/add'
  await _page.waitForURL(url.toString())
})