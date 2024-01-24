@Get
Feature: Get Users

    Scenario: Get fullnames of all users in Alphabetical order
        When Call GET to "/users"
        Then the response status code should be "200"
        And the response should be:
            | fullname          |
            | John DOE          |
            | Vincent LECLERC   |

     