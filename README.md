## Таблица персонажей "Звездных войн"

Небольшое приложение, в котором выводятся данные в табличном виде, полученные с помощью API запроса.

###  Что из себя представлет приложение:

• Приложение написано на функциональных компонентах (хуках).
• Реализована кнопка, которая при нажатии отправляет запрос на получение данных с сервера.
• При успешном выполнении запроса выводятся данные в таблицу 5х10.
• Реализована кнопка очистки таблицы.
• При полной очистке таблицы выводится подсказка об отсутствии загруженных данных.
• Развернуто приложение на общедоступном ресурсе (GitHub Pages)
• Код написан на typescript.
• Реализован механизм управления состоянием приложения.
• Каждую строку таблицы можно удалить отдельно. Перед удалением выводится модальное окно для пользователя с кнопками подтверждения и отмены.
• Реализована сортировка по клику на заголовок столбца (с направлением сортировки).
• Реализован прелоадер загрузки данных.
• Реализован механизм сохранения данных и изменений при перезагрузке страницы.
• Реализовано перемещение строк между собой без библиотек (механизм drag & drop) (перезагрузка не сбрасывает изменения).
• Реализован ресайзинг строк и столбцов без библиотек (перезагрузка не сбрасывает изменения).
• Реализована пагинация для таблицы. Пагинация осуществляется в рамках одной страницы (без изменения URL’a).
• Добавлен роутинг в приложение (react-router-dom). Создана дополнительная страница, которая содержит форму для ручного добавления новой строки в таблицу.
• Реализована валидация (yup) инпутов формы (пустые поля, существование персонажа, парвильные сивмолы в соответствуюих полях). Если валидация заполненных данных не проходит – блокируется кнопка отправки формы.
• При успешном добавлении новой строки – выводится сообщение об успехе (react-toastify), после перенаправляет пользователя на страницу с таблицей, в которой уже есть добавленная строка.

### Дополнительно:

• Реализована адаптация к разным рамерам экрана.
• Реализована поддержка мультиязычности.
• Реализованы различные стили и анимации.

Ниже приведены инструкции для локального запуска проекта:

1. Склонируйте репозиторий к себе на устройство

```bash
$ git clone git@github.com:canekg/CharacterTable.git
```

Далее по пунктам все делайте в корне репозитория.

2. Установить зависимости

```bash
$ npm install
```

3. Запустите проект

```bash
$ npm run start
```

Перейдите пожауйста по ссылке и пощупайте это приложение :smile: **[haracterTable](https://canekg.github.io/CharacterTable/)**