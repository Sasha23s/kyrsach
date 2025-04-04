
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация flatpickr для выбора дат
    flatpickr("#date-range", {
        mode: "range",
        locale: "ru",
        dateFormat: "d.m.Y",
    });
document.getElementById('myButton').onclick = opt;
function opt() {
alert('Данные отправлены, ожидайте подтверждение');
}
    // Получаем данные из localStorage
    const bookingData = JSON.parse(localStorage.getItem("bookingData"));

    if (bookingData) {
        // Заполняем поля на странице бронирования
        document.getElementById("date-range").value = bookingData.dateRange;
        document.getElementById("room-type").value = bookingData.roomType;
        document.getElementById("additional-service").value = bookingData.additionalService;

        // Очищаем localStorage после загрузки данных
        localStorage.removeItem("bookingData");
    }
});