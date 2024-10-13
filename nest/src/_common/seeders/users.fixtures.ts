import { UserTestBuilder } from '../__test__/builders/user-test.builders'

export const usersFixtures = [
    new UserTestBuilder()
        .withId('536faa19-fb35-45c8-8f3b-368ead888c6e')
        .withFirstName('John')
        .withLastName('Doe')
        .build(),
    new UserTestBuilder()
        .withId('536faa19-fb35-45c8-8f3b-368ead888c6f')
        .withFirstName('Jane')
        .withLastName('Doe')
        .build(),
    new UserTestBuilder()
        .withId('536faa19-fb35-45c8-8f3b-368ead888c6a')
        .withFirstName('Albert')
        .withLastName('Doe')
        .build(),
    new UserTestBuilder()
        .withId('536faa19-fb35-45c8-8f3b-368ead888c6b')
        .withFirstName('Nathan')
        .withLastName('Babayaga')
        .build(),
    new UserTestBuilder()
        .withId('536faa19-fb35-45c8-8f3b-368ead888c6c')
        .withFirstName('Xavier')
        .withLastName('Doe')
        .build(),
]
