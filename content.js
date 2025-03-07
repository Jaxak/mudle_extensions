function createWrap() {
    const wrapper = document.getElementById('lazy_rating_block');
    if(wrapper){
        return;
    }
    // Найти все элементы h3
    const allH3 = Array.from(document.querySelectorAll('h3'));

    // Фильтровать по точному тексту
    const targetH3 = allH3.find(h3 => 
        h3.textContent === 'Оценка'
    );

    if (targetH3) {
        console.log('Элемент найден:', targetH3);
        const wrapperSpan = document.createElement('div');
        wrapperSpan.id = 'lazy_rating_block';
        wrapperSpan.style.border = '1px solid #ccc';
        wrapperSpan.style.padding = '10px';
        wrapperSpan.style.margin = '10px 0';

        // Обернуть h3
        targetH3.parentNode.insertBefore(wrapperSpan, targetH3);
        wrapperSpan.appendChild(targetH3);
        
        // Создать контейнер для кнопок
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.gap = '5px';
        buttonContainer.style.marginTop = '8px';

        for (let i = 1; i <= 5; i++) {
            const button = createButton(i);

            button.addEventListener('click', (e) => {
              e.stopPropagation(); // Предотвращаем всплытие события
                
              setGradeInput(i);

              button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = '';
                }, 200);
            });
        
            buttonContainer.appendChild(button);
          }
        
        const plus = createButton('+');
        plus.addEventListener('click', (e) => {
            e.stopPropagation(); // Предотвращаем всплытие события
              
            plusGradeInput();

            button.style.transform = 'scale(0.95)';
              setTimeout(() => {
                  button.style.transform = '';
              }, 200);
          });
      
        buttonContainer.appendChild(plus);

        const minus = createButton('-');
        minus.addEventListener('click', (e) => {
            e.stopPropagation(); // Предотвращаем всплытие события
              
            minusGradeInput();

            button.style.transform = 'scale(0.95)';
              setTimeout(() => {
                  button.style.transform = '';
              }, 200);
          });
      
        buttonContainer.appendChild(minus);
        // Добавить кнопки в обертку
        wrapperSpan.appendChild(buttonContainer);
    } 
    else 
    {
        console.log('Элемент не найден');
    }
}

document.addEventListener('DOMContentLoaded', createWrap);

function createButton(value) {
    const button = document.createElement('button');
    button.style.padding = '6px 12px';
    button.style.cursor = 'pointer';
    button.style.backgroundColor = '#f0f0f0';
    button.style.border = '1px solid #999';
    button.style.borderRadius = '4px';
    button.textContent = value;
    return button;
}

function setGradeInput(value) {
    const gradeInput = document.getElementById('id_grade');
    
    if (gradeInput) {
      gradeInput.value = value;
      console.log(`Значение ${value} записано в id_grade`);
      
      // Дополнительно: подсветить поле на 1 секунду
      gradeInput.style.transition = 'none';
      gradeInput.style.backgroundColor = '#e0ffe0';
      setTimeout(() => {
        gradeInput.style.backgroundColor = '';
        gradeInput.style.transition = 'background 0.3s';
      }, 1000);
    } else {
      console.error('Элемент id_grade не найден!');
    }
}
function minusGradeInput() {
    const gradeInput = document.getElementById('id_grade');
    
    if (gradeInput) {
        value = Number(gradeInput.value);
        if(value > 5 && value < 0){
            return;
        }

        gradeInput.value = value - Number(0.5);
        console.log(`Значение ${value} записано в id_grade`);
        
        // Дополнительно: подсветить поле на 1 секунду
        gradeInput.style.transition = 'none';
        gradeInput.style.backgroundColor = '#e0ffe0';
        setTimeout(() => {
            gradeInput.style.backgroundColor = '';
            gradeInput.style.transition = 'background 0.3s';
      }, 1000);
    } else {
      console.error('Элемент id_grade не найден!');
    }
}

function plusGradeInput() {
    const gradeInput = document.getElementById('id_grade');
    
    if (gradeInput) {
        value = Number(gradeInput.value);
        if(value > 5 && value < 0){
            return;
        }

        gradeInput.value = value + Number(0.5);
        console.log(`Значение ${value} записано в id_grade`);
        
        // Дополнительно: подсветить поле на 1 секунду
        gradeInput.style.transition = 'none';
        gradeInput.style.backgroundColor = '#e0ffe0';
        setTimeout(() => {
            gradeInput.style.backgroundColor = '';
            gradeInput.style.transition = 'background 0.3s';
      }, 1000);
    } else {
      console.error('Элемент id_grade не найден!');
    }
}

new MutationObserver(createWrap).observe(document.body, {
    childList: true,
    subtree: true
});