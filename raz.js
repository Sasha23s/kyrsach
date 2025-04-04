document.addEventListener('DOMContentLoaded', () => {
    // Инициализация flatpickr для выбора дат
    flatpickr("#date-range", {
        mode: "range", // Разрешаем выбор диапазона дат
        locale: "ru",
        dateFormat: "d.m.Y",
    });

    // Объект с ценами для номеров
    const prices = {
        "кот стандарт": 500,
        "кот комфорт": 850,
        "кот vip": 1000,
        "собака стандарт": 1450,
        "собака комфорт": 1950,
        "собака vip": 2450,
    };

    // Объект с ценами для доп. предложений
    const additionalPrices = {
        "не нужно": 0,
        "груминг": 1500,
        "дрессировка": 2000,
        "лакомства": 300,
    };

    // Функция для расчета стоимости
    function calculateCost(event) {
        event.preventDefault(); // Отменяем стандартное поведение формы

        // Получаем выбранный номер
        const roomType = document.getElementById("room-type").value;
        if (!prices[roomType]) {
            alert("Выберите номер.");
            return;
        }

        // Получаем выбранные даты
        const selectedDates = document.getElementById("date-range")._flatpickr.selectedDates;
        if (!selectedDates || selectedDates.length === 0) {
            alert("Выберите дату или диапазон дат.");
            return;
        }

        // Вычисляем количество дней
        let days;
        if (selectedDates.length === 1) {
            days = 1; // Однодневное проживание
        } else {
            const startDate = selectedDates[0];
            const endDate = selectedDates[1];
            const timeDifference = endDate - startDate;
            days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        }

        // Получаем выбранное дополнительное предложение
        const additionalService = document.getElementById("additional-service").value;

        // Вычисляем стоимость
        const baseCost = prices[roomType] * days;
        const additionalCost = additionalPrices[additionalService];
        const totalCost = baseCost + additionalCost;

        // Выводим стоимость в textarea
        document.getElementById("total-cost").value = `Стоимость: ${totalCost} рублей\n ${roomType}, ${additionalService}`;
    }

    // Добавляем обработчик события на кнопку "Рассчитать"
    document.getElementById("calculate-btn").addEventListener("click", calculateCost);

    // Обработчик для кнопки "Забронировать"
    document.querySelector(".ras").addEventListener("click", (event) => {
        event.preventDefault(); // Отменяем стандартное поведение формы

        // Собираем данные для бронирования
        const roomType = document.getElementById("room-type").value;
        const dateRange = document.getElementById("date-range").value;
        const additionalService = document.getElementById("additional-service").value;

        // Проверяем, что все поля заполнены
        if (!roomType || !dateRange || !additionalService) {
            alert("Пожалуйста, заполните все поля.");
            return;
        }

        // Сохраняем данные в localStorage
        localStorage.setItem("bookingData", JSON.stringify({
            roomType,
            dateRange,
            additionalService,
        }));

        // Перенаправляем пользователя на страницу бронирования
        window.location.href = "bron.html";
    });
});