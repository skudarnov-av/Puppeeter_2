Feature: Booking tickets
    Scenario: Should book 1 ticket
        Given user is on "/client/index.php" page
        When user selects "7" day
        When user selects time
        When user selects "8" row and seat
        When user clicks button 'Забронировать'
        When user clicks button 'Получить код бронирования'
        Then user sees text "Покажите QR-код нашему контроллеру для подтверждения бронирования."

    Scenario: Should booking 2 tickets
        Given user is on "/client/index.php" page
        When user selects "7" day
        When user selects time
        When user selects "9" row and seat
        When user selects "10" row and seat
        When user clicks button 'Забронировать'
        When user clicks button 'Получить код бронирования'
        Then user sees text "Покажите QR-код нашему контроллеру для подтверждения бронирования."

    Scenario: Should not book without a seat
        Given user is on "/client/index.php" page
        When user selects "7" day
        When user selects time
        Then user sees button disabled "true"