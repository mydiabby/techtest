import { User } from '../models/user'

/**
 * Implémente l'écriture d'un utilisateur en base et la génération d'un identifiant.
 */
export interface PersistUser {
    /**
     * Sauvegarde l'utilisateur en base et place son identifiant unique.
     * @param user L'utilisateur à sauvegarder, sans identifiant (cette méthode mute l'utilisateur).
     */
    persist(user: User): Promise<void>
}