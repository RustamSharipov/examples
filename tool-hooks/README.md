# Thyngyfy

### Запуск
* `yarn`
* `yarn start`

### Переменные
Можно создать локальный файл `.env.local`, где переопределить переменные окружения:

* `REACT_APP_ROOT`: корень роутинга (по умолчанию `/`)
* `REACT_APP_EMAIL_CLIENT`: почтовый клиент, куда отправляем фидбэк

### Контент
* `src/data/products/index.js`: спецификации всех объективов
* `src/data/links/index.js`: ссылки, например, в разделе Shop

### Макет
[https://www.figma.com/file/Tqt6gNBNDJ82YBnJ3FiVvp/Tool](https://www.figma.com/file/Tqt6gNBNDJ82YBnJ3FiVvp/Tool)

### Форма фидбэка
* [Создаём](https://github.com/dwyl/learn-to-send-email-via-google-script-html-no-server) google web app на основе Google Docs
* Прописываем полученную ссылку в `.env.local` на локалхосте или `.env` на тесте или проде в переменной `REACT_APP_EMAIL_CLIENT`

#### Пример почтового клиента
```javascript
var TO_ADDRESS = "rustam.sharipov@gmail.com"; // where to send form data
var SUBJ = "New feedback to Thyngyfy from user";

function doPost(e) {
  try {
    Logger.log(e); // the Google Script version of console.log see: Class Logger
    MailApp.sendEmail(
      TO_ADDRESS,
      SUBJ,
      e.parameters.message,
      {
        htmlBody: "<p><strong>From:</strong> " + e.parameters.email + "</p><p><strong>Message:</strong><br />" + e.parameters.message + "</p>"
      }
    );

    // return json success results
    return ContentService
          .createTextOutput(
            JSON.stringify({"result":"success",
                            "data": JSON.stringify(e.parameters) }))
          .setMimeType(ContentService.MimeType.JSON);
  }

  catch(error) {
    Logger.log(error);
    return ContentService
          .createTextOutput(JSON.stringify({"result":"error", "error": e}))
          .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### CORS на localhost
Для того, чтобы cross origin запросы работали на локалхосте, нужно настроить браузер особым образом:

* [Chrome](https://alfilatov.com/posts/run-chrome-without-cors/) (инструкцию по запуску отдельного инстанса бразуера)
* [Safari](https://stackoverflow.com/a/12158217) (как отключить CORS в бразуере)
* [Firefox](https://addons.mozilla.org/ru/firefox/addon/access-control-allow-origin/) (расширение)
