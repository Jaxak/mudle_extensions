let isInit = false;

function updateDates() {
    // Элементы начальной даты
    const allowDay = document.getElementById('id_allowsubmissionsfromdate_day');
    const allowMonth = document.getElementById('id_allowsubmissionsfromdate_month');
    const allowYear = document.getElementById('id_allowsubmissionsfromdate_year');
    const allowHour = document.getElementById('id_allowsubmissionsfromdate_hour');
    const allowMinuts = document.getElementById('id_allowsubmissionsfromdate_minute');

    // Элементы конечных дат
    const dueDay = document.getElementById('id_duedate_day');
    const dueMonth = document.getElementById('id_duedate_month');
    const dueYear = document.getElementById('id_duedate_year');
    const dueHour = document.getElementById('id_duedate_hour');
    const dueMinuts = document.getElementById('id_duedate_minute');


    const cutoffDay = document.getElementById('id_cutoffdate_day');
    const cutoffMonth = document.getElementById('id_cutoffdate_month');
    const cutoffYear = document.getElementById('id_cutoffdate_year');
    const cutoffHour = document.getElementById('id_cutoffdate_hour');
    const cutoffMinuts = document.getElementById('id_cutoffdate_minute');

    // Получаем числовые значения
    const day = parseInt(allowDay.value, 10);
    const month = parseInt(allowMonth.value, 10) - 1; // Корректировка месяца для JS
    const year = parseInt(allowYear.value, 10);

    // Проверка валидности данных
    if (isNaN(day)) return;
    if (isNaN(month)) return;
    if (isNaN(year)) return;

    // Создаем базовую дату
    const baseDate = new Date(year, month, day);
    if (isNaN(baseDate.getTime())) return;

    // Рассчитываем новые даты
    const dueDate = new Date(baseDate);
    dueDate.setDate(dueDate.getDate() + 1);
    
    const cutoffDate = new Date(baseDate);
    cutoffDate.setDate(cutoffDate.getDate() + 2);

    setSelectValue(allowHour, '16');
    setSelectValue(allowMinuts, '0')

    // Обновляем Due Date
    setSelectValue(dueDay, dueDate.getDate());
    setSelectValue(dueMonth, dueDate.getMonth() + 1); // Возвращаем нормальный месяц
    setSelectValue(dueYear, dueDate.getFullYear());
    setSelectValue(dueHour, '23');
    setSelectValue(dueMinuts, '59')

    // Обновляем Cutoff Date
    setSelectValue(cutoffDay, cutoffDate.getDate());
    setSelectValue(cutoffMonth, cutoffDate.getMonth() + 1);
    setSelectValue(cutoffYear, cutoffDate.getFullYear());
    setSelectValue(cutoffHour, '23');
    setSelectValue(cutoffMinuts, '59')
}


function init(){
    if(isInit){
        return;
    }
    // Элементы начальной даты
    const allowDay = document.getElementById('id_allowsubmissionsfromdate_day');
    const allowMonth = document.getElementById('id_allowsubmissionsfromdate_month');
    const allowYear = document.getElementById('id_allowsubmissionsfromdate_year');

    allowDay.addEventListener('change', updateDates);
    allowMonth.addEventListener('change', updateDates);
    allowYear.addEventListener('change', updateDates);
    
    // Вешаем обработчики на все компоненты начальной даты
    [allowDay, allowMonth, allowYear].forEach(element => {
        element.addEventListener('change', updateDates);
    });
}

function setSelectValue(selectElement, value) {
    const option = selectElement.querySelector(`option[value="${value}"]`);
    if (option) {
        option.selected = true;
    } else {
        console.warn(`Option ${value} not found in`, selectElement);
    }
}

document.addEventListener('DOMContentLoaded', init);

new MutationObserver(init).observe(document.body, {
    childList: true,
    subtree: true
});