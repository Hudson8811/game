// padding-top для main
document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header');
  const main = document.querySelector('main');

  if (!header || !main) {
    return;
  }

  function setMainPadding() {
    const headerHeight = header.offsetHeight;
    main.style.paddingTop = `${headerHeight}px`;
  }

  // Инициализация
  setMainPadding();

  // Отслеживание изменений размеров через ResizeObserver
  const resizeObserver = new ResizeObserver(setMainPadding);
  resizeObserver.observe(header);

  // Отслеживание изменений в DOM (если header динамически меняется)
  const mutationObserver = new MutationObserver(setMainPadding);
  mutationObserver.observe(header, {
    childList: true,       // отслеживание добавления/удаления дочерних элементов
    subtree: true,         // отслеживание изменений во всём поддереве
    attributes: true,      // отслеживание изменений атрибутов
    characterData: true    // отслеживание текстовых изменений
  });

  // Очистка при размонтировании
  window.addEventListener('unload', () => {
    resizeObserver.disconnect();
    mutationObserver.disconnect();
  });
});
// header - задаётся класс fixed при скролее
document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header');

  if (!header) {
    return;
  }

  function handleScroll() {
    if (window.scrollY > 0) {
        header.classList.add('fixed');
    } else {
        header.classList.remove('fixed');
    }
  }

  window.addEventListener('scroll', handleScroll);

  handleScroll();
});

// Открытие меню на странице пользователя
document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.getElementById('mobileMenuOpen');
  const expandedMenu = document.getElementById('expandedMenu');
  const fixedMenu = document.getElementById('mobileMenu');

  if (toggleButton && expandedMenu && fixedMenu) {
    toggleButton.addEventListener('click', function(e) {
        e.stopPropagation();
        fixedMenu.classList.toggle('active');
        this.classList.toggle('active');
    });

    expandedMenu.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            fixedMenu.classList.remove('active');
            toggleButton.classList.remove('active');
        }
    });

    document.addEventListener('click', function() {
        fixedMenu.classList.remove('active');
        toggleButton.classList.remove('active');
    });

    fixedMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });
  }
});

// Задаётся pading-top для информационного окна на основе высоты header
document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header');
  const mainRestrictions = document.querySelector('.main-restrictions');

  if (!header || !mainRestrictions) return;

  // Функция для обновления позиции
  function updateMainRestrictionsPosition() {
    const headerHeight = header.offsetHeight;
    mainRestrictions.style.top = `${headerHeight}px`;
  }

  // Проверяем ширину экрана
  function handleScreenResize() {
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    if (mediaQuery.matches) {
        // Если экран >= 768px — включаем
        updateMainRestrictionsPosition();
        const resizeObserver = new ResizeObserver(updateMainRestrictionsPosition);
        resizeObserver.observe(header);

        // Очищаем старый обработчик
        window.removeEventListener('resize', updateMainRestrictionsPosition);
    } else {
        // Если экран < 768px
        mainRestrictions.style.top = '0';
    }
  }

  handleScreenResize();

  window.addEventListener('resize', handleScreenResize);
});

// Открытие списка
document.addEventListener('DOMContentLoaded', function() {
  function handleFormSelect(formSelect) {
    const btn = formSelect.querySelector('.formSelect-btn');
    const list = formSelect.querySelector('.formSelect-list');

    if (!btn || !list) return;

    // Устанавливаем padding-top для списка на основе высоты кнопки
    const btnHeight = btn.offsetHeight;
    list.style.paddingTop = `${btnHeight}px`;

    btn.addEventListener('click', function(event) {
      event.stopPropagation();
      // Закрываем все другие открытые меню перед открытием текущего
      document.querySelectorAll('.formSelect.active').forEach(openFormSelect => {
        if (openFormSelect !== formSelect) {
          openFormSelect.classList.remove('active');
        }
      });
      formSelect.classList.toggle('active');
    });

    formSelect.addEventListener('click', function(event) {
      const item = event.target.closest('.formSelect-list__item');
      if (item) {
        const selectedText = item.querySelector('p').textContent;
        btn.querySelector('p').textContent = selectedText;
        formSelect.classList.remove('active');
      }
    });
  }

  function initFormSelects() {
    document.querySelectorAll('.formSelect').forEach(formSelect => {
      if (!formSelect.dataset.init) {
        formSelect.dataset.init = 'true';
        handleFormSelect(formSelect);
      }
    });
  }

  document.addEventListener('click', function(event) {
    document.querySelectorAll('.formSelect.active').forEach(formSelect => {
      if (!formSelect.contains(event.target)) {
        formSelect.classList.remove('active');
      }
    });
  });

  const observer = new MutationObserver(initFormSelects);
  observer.observe(document.body, { childList: true, subtree: true });

  initFormSelects();
});

// Задаётся буква "Р" в конец числа у поля
document.addEventListener('DOMContentLoaded', function() {
  const transferFormValueInput = document.getElementById('transferFormValue');

  if (transferFormValueInput) {
    transferFormValueInput.addEventListener('input', function(e) {
      let value = e.target.value;
      const cursorPosition = e.target.selectionStart;

      const pureValue = value.replace(/[^0-9]/g, '');

      if (pureValue) {
        const formattedValue = pureValue + ' ₽';
        e.target.value = formattedValue;

        const newCursorPosition = Math.min(cursorPosition, pureValue.length);
        e.target.setSelectionRange(newCursorPosition, newCursorPosition);
      } else {
        e.target.value = '';
      }
    });
  }
});
// Задаётся буква "Р" в конец числа у поля
document.addEventListener('DOMContentLoaded', function() {
  const transferFormValueInput = document.getElementById('adminBalanceValue');

  if (transferFormValueInput) {
    transferFormValueInput.addEventListener('input', function(e) {
      let value = e.target.value;
      const cursorPosition = e.target.selectionStart;

      const pureValue = value.replace(/[^0-9]/g, '');

      if (pureValue) {
        const formattedValue = pureValue + ' ₽';
        e.target.value = formattedValue;

        const newCursorPosition = Math.min(cursorPosition, pureValue.length);
        e.target.setSelectionRange(newCursorPosition, newCursorPosition);
      } else {
        e.target.value = '';
      }
    });
  }
});
