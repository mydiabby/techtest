import { Locator, Page } from '@playwright/test'
import { getFrontendConfig } from '../helpers'

type FormParams = Readonly<{
    lastname: string
    firstname: string
}>

export class AddUserPage {
    constructor(private readonly page: Page){}

    async goto(): Promise<void> {
        const config = await getFrontendConfig()
        const url = config.origin()
        url.pathname = '/users/add'
        await this.page.goto(url.toString())
    }

    async getHeading(): Promise<Locator> {
        return this.page.getByText('Nouvel utilisateur')
    }

    async fillForm(params: FormParams): Promise<void> {
        await this.page.click('label:has-text("Nom")')
        await this.page.keyboard.type(params.lastname)

        await this.page.click('label:has-text("Prénom")')
        await this.page.keyboard.type(params.firstname)
    }

    async getMessage(message: string): Promise<Locator> {
        return this.page.getByText(message)
    }

    async getSubmitButton(): Promise<Locator> {
        return this.page.locator('button[type="submit"]')
    }

    async getBackButton(): Promise<Locator> {
        return this.page.getByText('Retour...')
    }
}