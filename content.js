function createWrap() {
    const wrapper = document.getElementById('lazy_rating_block');
    if(wrapper){
        return;
    }
    handleModal();
    // Найти все элементы h3
    const allH3 = Array.from(document.querySelectorAll('h3'));

    // Фильтровать по точному тексту
    const targetH3 = allH3.find(h3 => 
        h3.textContent === 'Оценка'
    );

    if (targetH3) {
        initGradeInput();
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

function initGradeInput(){
  const gradeInput = document.getElementById('id_grade');
      setGradeInput(gradeInput.value === '' ? 0 : gradeInput.value);
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

function handleModal() {
        const okButton = document.querySelector('.modal.show')?.querySelector('button.btn-primary[data-action="cancel"]');
        if (!okButton) return;
        console.log('Нашли ', okButton);
        const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        okButton.dispatchEvent(clickEvent);
        showCheckmark();
    }

function showCheckmark() {
        const checkmark = document.createElement('div');
        checkmark.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100px;
            height: 100px;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.5s;
        `;

        checkmark.innerHTML = `
            <svg viewBox="0 0 65 65" style="width: 90%; height: 90%;">
                <path fill="none" stroke="#4CAF50" stroke-width="4" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
        `;

        document.body.appendChild(checkmark);

        // Плавное появление
        setTimeout(() => checkmark.style.opacity = '1', 10);

        // Исчезновение через секунду
        setTimeout(() => {
            checkmark.style.opacity = '0';
            setTimeout(() => checkmark.remove(), 500);
        }, 1000);
    }

new MutationObserver(createWrap).observe(document.body, {
    childList: true,
    subtree: true
});