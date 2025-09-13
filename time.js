let isInit = false;
let isSettingsInit = false;

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
    setSelectValue(allowMinuts, '0');

    // Обновляем Due Date
    setSelectValue(dueDay, dueDate.getDate());
    setSelectValue(dueMonth, dueDate.getMonth() + 1); // Возвращаем нормальный месяц
    setSelectValue(dueYear, dueDate.getFullYear());
    setSelectValue(dueHour, '23');
    setSelectValue(dueMinuts, '59');

    // Обновляем Cutoff Date
    setSelectValue(cutoffDay, cutoffDate.getDate());
    setSelectValue(cutoffMonth, cutoffDate.getMonth() + 1);
    setSelectValue(cutoffYear, cutoffDate.getFullYear());
    setSelectValue(cutoffHour, '23');
    setSelectValue(cutoffMinuts, '59');

    setSettingsGroupDefaultValues();
}

function init(){
    if(isInit){
        return;
    }
    // Элементы начальной даты
    const allowDay = document.getElementById('id_allowsubmissionsfromdate_day');
    if(!allowDay) return;
    const allowMonth = document.getElementById('id_allowsubmissionsfromdate_month');
    if(!allowMonth) return;
    const allowYear = document.getElementById('id_allowsubmissionsfromdate_year');
    if(!allowYear) return;

    allowDay.addEventListener('change', updateDates);
    allowMonth.addEventListener('change', updateDates);
    allowYear.addEventListener('change', updateDates);
    
    // Вешаем обработчики на все компоненты начальной даты
    [allowDay, allowMonth, allowYear].forEach(element => {
        element.addEventListener('change', updateDates);
    });

    
    expandSettingsBlock();
    isInit = true;
}

// Функция для раскрытия блока настроек
function expandSettingsBlock() {
    const fieldset = document.querySelector('fieldset#id_modstandardelshdr');
    if (!fieldset) return false;

    // Проверяем, свернут ли блок
    const isCollapsed = fieldset.classList.contains('collapsed');
    if (!isCollapsed) return true; // Уже раскрыт

    // Находим кнопку/ссылку для раскрытия
    const toggleLink = fieldset.querySelector('legend.ftoggler a.fheader');
    if (!toggleLink) return false;

    // Создаем и отправляем событие клика для раскрытия
    const clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
    });
    
    toggleLink.dispatchEvent(clickEvent);
    return true;
}

function setSelectValue(selectElement, value) {
    const option = selectElement.querySelector(`option[value="${value}"]`);
    if (option) {
        option.selected = true;
    } else {
        console.warn(`Option ${value} not found in`, selectElement);
    }
}

function setSettingsGroupDefaultValues() {
    // Находим блок с общими настройками модуля
    const fieldset = document.querySelector('fieldset#id_modstandardelshdr');
    if (!fieldset || isSettingsInit) return;
    console.log('Нашли', fieldset);

    const changedSettings = [];
    changedSettings.push('Общие настройки модуля изменены на рекомендуемые:\n');
    setDefaultVisible(fieldset, changedSettings);
    setDefaultGroupMode(fieldset, changedSettings);
    setDefaultGrouping(fieldset, changedSettings);
    if(changedSettings.length > 1){
        showNotification(changedSettings);
    }
    isSettingsInit = true;
}

function setDefaultVisible(fieldset, changedSettings){
    // Устанавливаем значение "Отображать на странице курса" для доступности
    setValue(fieldset, 'select#id_visible', 'Отображать на странице курса', changedSettings);
}

function setDefaultGroupMode(fieldset, changedSettings){
    // Устанавливаем значение для группового режима
    setValue(fieldset, 'select#id_groupmode', 'Изолированные группы', changedSettings);
}

function setDefaultGrouping(fieldset, changedSettings){
    // Устанавливаем значение для потока
    setValue(fieldset, 'select#id_groupingid', 'Пусто', changedSettings);
}

function setValue(fieldset, selector, value, changedSettings){
    const select = fieldset.querySelector(selector);
    if (select) {
        const emptyOption = Array.from(select.options).find(opt => 
            opt.textContent.trim() === value
        );
        if (emptyOption && emptyOption.value != select.value) {
            select.value = emptyOption.value;
            changedSettings.push("➡️ " + value);
        }
    }
}

function showNotification(message) {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    console.log(message);
    notification.id = 'showNotification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-family: Arial, sans-serif;
        font-size: 16px;
        z-index: 10000;
        max-width: 80%;
        min-width: 200px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        opacity: 0;
        transform: translateX(100px);
        transition: opacity 0.3s, transform 0.3s;
        white-space: pre-line; /* Это свойство позволяет отображать переносы строк */
    `;
    notification.style.backgroundColor = '#4CAF50';
    notification.textContent = message.join("\n");
    document.body.appendChild(notification);

    // Показываем уведомление
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);

    // Скрываем через 5 секунды
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

document.addEventListener('DOMContentLoaded', init);

new MutationObserver(init).observe(document.body, {
    childList: true,
    subtree: true
});