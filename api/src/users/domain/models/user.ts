export type UserProps = Readonly<{
    id?: number
    firstname: string
    lastname: string
}>

/**
 * Un utilisateur de l'application.
 */
export class User {

    private _id?: number
    
    get id(): number|null {
        return typeof this._id === 'number'
            ? this._id
            : null
    }

    set id(id: number) {
        if (typeof this._id === 'number')
            throw Error('user already has an id')
        this._id = id
    }

    readonly firstname: string
    readonly lastname: string

    constructor(props: UserProps){
        this._id = props.id
        this.firstname = props.firstname
        this.lastname = props.lastname
    }
}