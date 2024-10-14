import { expect, Locator, Page } from '@playwright/test'
import { getFrontendConfig } from '../helpers'

export type DisplayedUser = Readonly<{
    firstname: string
    lastname: string
}>

export class UsersListPage {

    constructor(private readonly page: Page){}

    async goto(): Promise<void> {
        const config = await getFrontendConfig()
        const url = config.origin()
        url.pathname = '/users'
        await this.page.goto(url.toString())
    }

    async nextPage(): Promise<Locator> {
        return this.page.locator('[aria-label="Page suivante"]')
    }

    async previousPage(): Promise<Locator> {
        return this.page.locator('[aria-label="Page précédente"]')
    }

    async getHeadingText(): Promise<string> {
        const heading = this.page.locator('h1')
        const text = await heading.textContent()
        expect(text, 'heading has not text').not.toBe(null)
        return text!
    }

    async setItemsPerPage(option: 5|10|25|50): Promise<void> {
        const selector = this.page.getByRole('combobox')
        
        // this does not work at all with materials select
        // await selector.selectOption(option.toString())
        
        // another way would be to use the actual clickable <div> (which is not the mat-select element that has the role="combobox")
        await selector.focus()
        await this.page.keyboard.press('Enter')
        
        const options = this.page.getByRole('option')
        await options.getByText(option.toString()).click()
    }

    async getPaginationRangeLabel(): Promise<string> {
        const label = this.page.locator('.mat-mdc-paginator-range-label')
        const text = await label.textContent()
        expect(text, 'pagination range label must have text').not.toBe(null)
        return text as string
    }

    async goToAdd(): Promise<void> {
        const button = this.page.getByText('Ajouter un utilisateur')
        await button.click()
    }

    async getHeaders(): Promise<readonly string[]> {
        const cellsLocator = this.page.getByRole('columnheader')
        await expect(cellsLocator, `table headers must have 2 cells`).toHaveCount(2)
        const cells = await cellsLocator.all()
        const headerContents = await Promise.all(cells.map(cell => cell.textContent()))
        expect(headerContents.every(content => content !== null), 'some headers have no text')
        return (headerContents as string[]).map(header => header.trim())
    }

    getNoUserText(): Locator {
        return this.page.getByText('Il n\'y aucun utilisateurs pour l\'instant...')
    }

    async getDisplayedUsers(expectedCount: number): Promise<readonly DisplayedUser[]>{
        const rowsLocator = this.page.locator('tbody').getByRole('row')
        await expect(rowsLocator, `table must contain ${expectedCount} users`).toHaveCount(expectedCount)
        const rows = await rowsLocator.all()
        const displayedUsers = await Promise.all(rows.map(async row => {
            const cellsLocator = row.locator('td')
            await expect(cellsLocator, `table rows must have 2 cells`).toHaveCount(2)
            const cells = await cellsLocator.all()
            const textContents = await Promise.all(cells.map(cell => cell.textContent()))
            expect(textContents.every(content => content !== null), 'some cells have no text')
            const [lastname, firstname] = (textContents as string[]).map(s => s.trim())
            return {
                firstname,
                lastname
            }
        }))
        return displayedUsers
    }
}