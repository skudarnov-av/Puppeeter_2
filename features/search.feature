Feature: Successful booking
  Scenario: Movie Selection
    Given the user is on the home page
    When the user selects a movie
    Then the user sees the movie session starting at 10:00

Scenario: booking 2 tickets
Given user is on "/client/index.php" page
        When user selects "7" day
        When user selects time
        When user selects "9" row and seat
        When user selects "10" row and seat
        When user clicks button 'Забронировать'
        When user clicks button 'Получить код бронирования'
        Then user sees text "Покажите QR-код нашему контроллеру для подтверждения бронирования."

        Scenario: no possibility of booking, with full boarding in the hall
        Given user is on "/client/index.php" page
        When user selects "7" day
        When user selects time
        Then user sees button disabled "true"