@Create
Feature: Create a User

    Scenario: Insert a new user
        When Call POST to "/users" with the following body:
            | firstName | lastName  |
            | Vincent   | LECLERC   |

        Then the response status code should be "201"
        And the response should be:
            | firstName | lastName  |
            | Vincent   | LECLERC   |

    Scenario: Insert another new user
        When Call POST to "/users" with the following body:
            | firstName | lastName  |
            | John      | DOE       |

        Then the response status code should be "201"
        And the response should be:
            | firstName | lastName  |
            | John      | DOE       |

    Scenario: A user already exists
        When Call POST to "/users" with the following body:
            | firstName | lastName  |
            | Vincent   | LECLERC   |

        Then the response status code should be "409"
