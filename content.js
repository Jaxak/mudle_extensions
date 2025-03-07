document.title = "МикиВики"
count = 0

function createWrap() {
    // Найти все элементы h3
    const allH3 = Array.from(document.querySelectorAll('h3'));

    // Фильтровать по точному тексту
    const targetH3 = allH3.find(h3 => 
        h3.textContent === 'Оценка'
    );

    if (targetH3 && count == 0) {
        count=count+1;
        console.log(count);
        console.log('Элемент найден:', targetH3);
        const wrapperSpan = document.createElement('span');

        wrapperSpan.style.cursor = 'pointer';
        wrapperSpan.style.backgroundColor = '#f0f0f0';
        wrapperSpan.style.padding = '5px';

        targetH3.parentNode.insertBefore(wrapperSpan, targetH3);
        wrapperSpan.appendChild(targetH3);
        
        wrapperSpan.addEventListener('click', clickWrap);
    } 
    else 
    {
        console.log('Элемент не найден');
    }
}

document.addEventListener('DOMContentLoaded', createWrap);

function clickWrap() {
    const needDiv = document.getElementsByClassName('assignsubmission_file')[0];
    
    if (!needDiv) {
      console.log('Не нашел');
      return;
    }

    console.log('Нашел');

    const links = needDiv.querySelectorAll('a');
  
    links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Отменяем стандартное действие
                window.open(link.href, '_blank');
            });
    
            const imgPreview = document.createElement('img');
            
            console.log('Нашел' + link.href);
            imgPreview.src = link.href;
            imgPreview.style.maxWidth = '100px';
            imgPreview.style.margin = '5px';
            link.parentNode.insertBefore(imgPreview, link);
      });
}



new MutationObserver(createWrap).observe(document.body, {
    childList: true,
    subtree: true
});

  