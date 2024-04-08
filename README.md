## Таблица персонажей "Звездных войн"
Ы

Представляю Вам небольшое приложение, в котором выводятся данные в табличном виде, полученные с помощью API.

Перейдите пожалуйста по ссылке и пощупайте это приложение :smile: **[CharacterTable](https://canekg.github.io/CharacterTable/)**

### Технические особенности


• Приложение написано на на typescript, в плане react используются функциональные компоненты (хуки) 

• Реализован механизм управления состоянием приложения с помощью mobx. 

• Роутинг с помощью react-router-dom. 

• Валидация и использованием yup.

• Нотификации (уведомления) с помощью react-toastify.

• Развернуто приложение на общедоступном ресурсе (GitHub Pages).


 ### Реализованные фичи:


• Кнопка, которая при нажатии отправляет запрос на получение данных с сервера.

• При успешном выполнении запроса выводятся данные в таблицу 5х10.

• Кнопка очистки таблицы.

• При полной очистке таблицы выводится подсказка об отсутствии загруженных данных.

• Каждую строку таблицы можно удалить отдельно. Перед удалением выводится модальное окно для пользователя с кнопками подтверждения и отмены.

• Сортировка по клику на заголовок столбца (с направлением сортировки).

• Прелоадер загрузки данных.

• Механизм сохранения данных и изменений при перезагрузке страницы.

• Перемещение строк между собой без библиотек (механизм drag & drop) (перезагрузка не сбрасывает изменения).

• Ресайзинг строк и столбцов без библиотек (перезагрузка не сбрасывает изменения).

• Пагинация для таблицы. Пагинация осуществляется в рамках одной страницы (без изменения URL’a).

• Создана дополнительная страница, которая содержит форму для ручного добавления новой строки в таблицу.

• Реализована валидация: пустые поля, существование персонажа, правильные символы в соответствующих полях. Если валидация заполненных данных не проходит – блокируется кнопка отправки формы.

• При успешном добавлении новой строки – выводится сообщение об успехе, после перенаправляет пользователя на страницу с таблицей, в которой уже есть добавленная строка.


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
