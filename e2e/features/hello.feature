Feature: Hello
  Scenario: Search on google (unrelated to app, this is a demo)
    Given I go to 'http://www.google.co.uk'
    When I search for 'Hello World'
    Then My title should contain 'Hello World'
