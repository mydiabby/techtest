export type UserProps = Readonly<{
    id: number
    firstname: string
    lastname: string
}>

/**
 * Réprésente un utilisateur.
 */
export class User {

    readonly id: number
    readonly firstname: string
    readonly lastname: string

    get fullname(){
        return `${this.lastname} ${this.firstname}`
    }

    constructor(props: UserProps){
        this.id = props.id
        this.firstname = props.firstname
        this.lastname = props.lastname
    }
}