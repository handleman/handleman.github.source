---
layout: post
title: 'Python: Бэкап в B2 Cloud Storage с помощью Python'
date: 2020-09-26 12:48:59 +0300
description: 'В этом посте мы напишем и разберем скрипт на Python для бэкапа любых файлов (любого размера и количества) в облачное объектное хранилище "B2 Cloud Storage" от компании Backblaze. Почему именно "B2"? - Потому-что он дешевле раза в четыре популярного S3, ставшего уже для нас стандартом "Де-факто". По своим возможностям и удобству использования B2 конечно уступает, но, для простого бэкапа - этого более чем достаточно.'
image: '/assets/images/articles/backblaze.jpg'
categories: python
---

В этом посте мы напишем и разберем скрипт на Python для бэкапа любых файлов (любого размера и количества) в облачное объектное хранилище "B2 Cloud Storage" от компании Backblaze. Почему именно "B2"? - Потому-что он дешевле раза в четыре популярного S3, ставшего уже для нас стандартом "Де-факто". По своим возможностям и удобству использования B2 конечно уступает, но, для простого бэкапа - этого более чем достаточно.

Сравнить цены с другими популярными решениями можно [тут](https://www.backblaze.com/b2/cloud-storage-pricing.html)

## Планирование

В качестве среды выполнения задачи будем использовать Python 3.8 (актуальный на момент написания).

Предположим, что в итоге мы хотим видеть скрипт, консольную утилиту, которой мы будем передавать наши "креды" для B2 и путь к директории которую мы хотим загрузить.

Например:
```bash
python3 b2_backup.py -k <KEY_ID> -a <APP_KEY> <PATH_TO_FILES>
```


## Подготовка

Для того, чтобы начать, нам нужно зарегистрироваться [на самом сервисе](https://www.backblaze.com/b2/sign-up.html), затем [активировать B2 Cloud Storage](https://www.backblaze.com/b2/docs/quick_account.html), подключить платежную карточку, создать "бакет" и **настроить доступ к нему**, получив в итоге два ключа:

1. **"keyID"** - привязанный к конкретному бакету id-шник
2. **"Application key"** - тоже привязанный к конкретному бакету ключ, по которому мы и будем коннектиться к файловому хранилищу.

Подробно расписывать процесс регистрации не нужно, там все достаточно просто, единственное, акцентирую внимание на том, что **необходимо добавлять новые ключи** для каждого созданного бакета, а не использовать общий "Master Application Key".

![registering access keys for B2 Cloud](/assets/images/articles/b2_backup/app_key.jpg){:class="adaptive-image}


## Принципы работы с B2 Cloud Service API

Работать с B2 мы будем через https запросы к нативному API сервиса.

Главное отличие нативного API B2 от того же S3 в том, что, в целях экономии, они не используют балансировку трафика на стороне сервера. Вместо автоматической балансировки и единого API URL для всех операций, они построили апишку согласно понятию "Архитектура Контрактов" ([Contract Architecture](https://www.backblaze.com/blog/design-thinking-b2-apis-the-hidden-costs-of-s3-compatibility/))

Это значит что вместо единого URL для всех операций (авторизация, добавить/удалить файл, список файлов), API разбито на множетсов отдельных URL, **по одному для каждой операции**. Что, в принципе имеет смысл, но требует немного больше операций в коде клиента, который мы сейчас и напишем.

И так, разобраавшись с [документацией](https://www.backblaze.com/b2/docs/integration_checklist.html), приходим к выводу, что для нашей простой задачи - "загрузить указанный каталог в облако" нам нужно использовать всего 3 операции:

1. **Авторизация на сервисе** ([b2_authorize_account](https://www.backblaze.com/b2/docs/b2_authorize_account.html)). API URL: `https://api.backblazeb2.com/b2api/v2/b2_authorize_account`
2. **Запрос адреса сервера загрузки** ([b2_get_upload_url](https://www.backblaze.com/b2/docs/b2_get_upload_url.html)). API URL: `https://<AUTHORIZED_API_URL>/b2api/v2/b2_get_upload_url`
3. **Загрзука файла** ([b2_upload_file](https://www.backblaze.com/b2/docs/b2_upload_file.html)). API URL: `https://<UPOLOAD_URL>/b2api/v2/b2_upload_file`

Определившись с тем что конкретно нам нужно делать, мы готовы описать каждую операцию в Python.

## Шаг 1. Авторизация на сервисе

Первый шаг, на котором мы "скармливаем" полученные ранее **"keyID"** и **"Application key"** для того чтобы получить токен и все необходимое для остальных операций.

```python
import base64
from urllib.request import Request, urlopen

def b2_authorize(applicationKeyId: str, applicationKeyValue: str) -> dict:
    id_and_key = f'{applicationKeyId}:{applicationKeyValue}'
    id_and_key_base64 = base64.b64encode(
        id_and_key.encode('utf-8')).decode('utf-8')
    basic_auth_string = f'Basic {id_and_key_base64}'
    headers = {'Authorization': basic_auth_string}
    b2_auth_url = 'https://api.backblazeb2.com/b2api/v2/b2_authorize_account'

    request = Request(b2_auth_url, headers=headers)
    with urlopen(request) as response:
        auth = json.loads(response.read())
    response.close()
    return auth
```
Описанная функция принимает 2 параметра: `applicationKeyId` и `applicationKeyValue`, в которые мы передадим **"keyID"** и **"Application key"** соответственно.  Функция возвращает объект `auth` который содержит в себе токен, API URL для остальных операций и другую вспомогательную информацию.

Для построения запроса мы используем `urllib.request` стандартно по дефолту без каких либо специфических настроек и заголовков, за исключением `'Authorization'` заголовка.

*Обратите внимание:*
```python
id_and_key_base64 = base64.b64encode(
        id_and_key.encode('utf-8')).decode('utf-8')
```
В Python начиная с версии 3, модуль `base64` не работает с ASCII строками, поэтому для шифрования приходится строку с ключами вначале переводить в кодировку 'UTF-8', а затем - обратно.

## Шаг 2. Адрес свободного сервера и токен для него

Эта операция ключевая для, упомянутой выше, "Архитектуры Контрактов" ([Contract Architecture](https://www.backblaze.com/blog/design-thinking-b2-apis-the-hidden-costs-of-s3-compatibility/)) - на этом шаге мы просим у B2 Cloud Service дать нам **адрес свободного на данный момент сервера** на который мы будем грузить свои файлы. Таким образом ответственность за балансировку переносится на сторону клиента.

```python
from urllib.request import Request, urlopen
import json

def b2_get_upload_url(apiUrl: str, authToken: str, bucketId: str) -> dict:
    b2_get_upload_url = f'{apiUrl}/b2api/v2/b2_get_upload_url'
    get_url_body = {'bucketId': bucketId}
    get_url_headers = {'Authorization': authToken}
    request = Request(b2_get_upload_url, data=json.dumps(
        get_url_body).encode('utf-8'), headers=get_url_headers)
    with urlopen(request) as response:
        uploadData = json.loads(response.read())
    response.close()
    return uploadData
```
Описанная функция принимает три параметра:
1. `apiURl` - API URL привязанный к нашей авторизованной сессии.
2. `authToken` - Токен для второго уровня авторизации.
3. `buckedId` - Внутренний ID вашего бакета в который мы авторизовались.

Все эти три параметра у нас уже есть - мы получили их на первом шаге авторизации. Все эти данные находятся в `auth` объекте.

Данная функция вернет нам условный `uploadData` объект, в котором уже все что нужно для того, чтобы перейти непосредственно к загрузке файлов - т.е. `uploadUrl` и новый `authorizationToken`.

## Шаг 3. Загрузка файла

Самая большая и сложная функция, которая принимает параметр `filePathName` - путь к файлу, и собрав все нужные данные и оформив нужные заголовки - отправляет указанный файл на сервер.

```python
from urllib.request import Request, urlopen
from urllib.error import HTTPError
import json
import hashlib
import urllib.parse

def b2_upload_file_callback(filePathName: str) -> None:
    global uploadUrl, authTokenUpload
    print(f'[ Upload in progress ]: {filePathName}', end='...', flush=True)
    allowed_codes = [500, 503]
    content_type = 'b2/x-auto'
    file_path_name_encoded = urllib.parse.quote(filePathName)

    # we trim backslash in order to create right directories structure on B2 Cloud
    if file_path_name_encoded[0] == '/':
        file_path_name_encoded = file_path_name_encoded[1:]

    with open(filePathName, 'br') as file:
        file_data = file.read()
    file.close()

    file_hash = hashlib.sha1(file_data).hexdigest()

    headers = {
        'Authorization': authTokenUpload,
        'X-Bz-File-Name': file_path_name_encoded,
        'Content-Type': content_type,
        'X-Bz-Content-Sha1': file_hash
    }

    request = Request(uploadUrl, data=file_data, headers=headers)
    try:
        response = urlopen(request)
        response.close()
        print('<- [DONE] ')
    except HTTPError as err:
        print('<- [FAILED] ')
        # B2 Cloud sends 500,503 errors when need to re-establish upload connection (upload url and authenticationToken could be changed)
        if err.code in allowed_codes:
            print('[ 503 error, reiastablishing connection... ]')
            uploadSettings = b2_get_upload_url(apiUrl, authToken, bucketId)
            uploadUrl = uploadSettings['uploadUrl']
            authTokenUpload = uploadSettings['authorizationToken']
            b2_upload_file_callback(filePathName)
```
Главным отличием этой функции от остальных является наличие "try-except" блока.

В этом блоке мы проверяем код ошибки и если это 500 или 503, то мы **должны повторить шаг  2 - "Запросить адрес сервера загрузки"**,  обновить  `uploadUrl` и  токен для `authTokenUpload` после чего повторить попытку его загрузки.

При работе с **b2_upload_file** API код ошибки 500 или 503 зарезервированы как сигнал разработчику  о том, что необходимо обратится за новым токеном и получить доступ к другому серверу, т.к. текущий может быть перегружен или заполнен. Таким образом и осуществляется "ручная балансировка" на стороне клиента. ([см. доку](https://www.backblaze.com/blog/b2-503-500-server-error/))

Мы поместили некоторые важные данные в глобальные переменные, например для адреса сервера загрузки и токена:

```python
global uploadUrl, authTokenUpload
```
И, после их обновления, вызываем эту же функцию рекурсивно, дабы полностью повторить весь этап загрузки.


Помиомо прочего, перед отправкой файла, формируем специфические для API "b2_upload_file" заголовки запроса:

```python
headers = {
        'Authorization': authTokenUpload,
        'X-Bz-File-Name': file_path_name_encoded,
        'Content-Type': 'b2/x-auto',
        'X-Bz-Content-Sha1': file_hash
    }
```
Где:
1. `Authorization` - Токен полученный на предыдущем шаге `b2_get_upload_url()`
2. `X-Bz-File-Name` - Имя файла, под которым мы хотим хранить данные.
3. `Content-Type` - Мы указали как `'b2/x-auto'`, для того чтобы B2 определил тип файла автоматически (с чем он, кстати, неплохо справляется).
4. `X-Bz-Content-Sha1` - обязательный для B2 заголовок в который мы передаем хеш файла, для того чтобы B2 имело возможность проверить целостность файла после загрузки.


Сам файл мы достаем из файловой системы  стандартной в Python процедурой `open()` и содержимое передаем в теле запроса для `urllib.request.Request()` метода.

## Дополнительная работа

Мы описали кодом все три операции, которые нам нужны для работы с B2 Cloud Storage, теперь нам осталось добавить несколько вспомогательных функций.

### Аргументы командной строки
Для того, чтобы мы могли передавать в наш скрипт аргументы из командной строки необходимо их описать с помощью либы `argparse` ([см. доки](https://docs.python.org/3.8/library/argparse.html))

```python
import argparse

def init_argparse() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description='''Makes copy of your files to given B2 folder.
            You need to have "keyID" and "App Key" to authorize in B2 services.
            KeyId and App Key can be found in B2 Cloud Storage client dashboard
            ''')
    parser.add_argument(
        "-v", "--version", action="version",
        version=f"{parser.prog} version 1.0.0"
    )
    parser.add_argument(
        'directory', help="Path to directory you want to upload to B2 cloud")
    requiredNamed = parser.add_argument_group('required named arguments')
    requiredNamed.add_argument(
        '-k', '--key-id', help='B2 "keyID" value (is given to you when you create B2 bucket and access "App key" for it)', required=True
    )
    requiredNamed.add_argument(
        '-a', '--app-key', help='B2 "Application Key" value (is given to you when you create B2 bucket and access "App key" for it)', required=True
    )
    return parser
```
Таким образом, помимо самих аргументов, мы получим  еще "help" страницу с подробным описанием "из коробки", как в настоящем консольном приложении.

### Доступ  к файлам

Согласно плану, пользователь должен нам передать путь к директории которую он/она хочет загрузить, и мы должны загрузить все содержимое независимо от глубины вложенности и количества файлов.

При условии, что нам неизвестно количество файлов, необходимо продумать максимально эффективное решение.

Очевидный подход - составить список всех файлов в данной директории и потом циклически запускать для каждого загрузку - затратно по памяти, т.к. список может быть на сотни тысяч позиций. Поэтому в дело вступают структуры данных и метод `os.walk()` который возвращает iterable структуру для содержимого указанного каталога. Извлекаем из полученного iterable данные по порядку и передаем их в коллбек `b2_upload_file_callback()` из третьего  шага (операции).

Опишем функцию:
```python
import os

def applyForFile(filesPath: str, callback: Callable[[str], None]) -> None:
    excludes = ['.DS_Store', '.Trashes', '.fseventsd',
                '.Spotlight-V100', 'desktop.ini']

    for root, directories, files in os.walk(filesPath):
        for name in files:
            if name not in excludes:
                full_name = os.path.join(root, name)
                callback(full_name)
```
где два параметра:
1. `filesPath` - путь к каталогу, содержимое которого мы хотим загрузить.
2. `callback` -  функция как параметр, коллбэк в который мы будем передавать путь к каждому конкретному файлу.

## Собираем все вместе

Все готово, теперь соберем все вместе и правильно расставим вызовы функций и данные. В итоге мы получим целый скрипт вот такого вида:


```python
import argparse
import os
import base64
import json
import hashlib
import urllib.parse
from urllib.request import Request, urlopen
from urllib.error import HTTPError
from typing import Callable

# global variables
uploadUrl: str = None
authTokenUpload: str = None
authToken: str = None
apiUrl: str = None
bucketId: str = None
# add Callable annotation


def init_argparse() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description='''Makes copy of your files to given B2 folder.
            You need to have "keyID" and "App Key" to authorize in B2 services.
            KeyId and App Key can be found in B2 Cloud Storage client dashboard
            ''')
    parser.add_argument(
        "-v", "--version", action="version",
        version=f"{parser.prog} version 1.0.0"
    )
    parser.add_argument(
        'directory', help="Path to directory you want to upload to B2 cloud")
    requiredNamed = parser.add_argument_group('required named arguments')
    requiredNamed.add_argument(
        '-k', '--key-id', help='B2 "keyID" value (is given to you when you create B2 bucket and access "App key" for it)', required=True
    )
    requiredNamed.add_argument(
        '-a', '--app-key', help='B2 "Application Key" value (is given to you when you create B2 bucket and access "App key" for it)', required=True
    )
    return parser


def b2_authorize(applicationKeyId: str, applicationKeyValue: str) -> dict:
    id_and_key = f'{applicationKeyId}:{applicationKeyValue}'
    id_and_key_base64 = base64.b64encode(
        id_and_key.encode('utf-8')).decode('utf-8')
    basic_auth_string = f'Basic {id_and_key_base64}'
    headers = {'Authorization': basic_auth_string}
    b2_auth_url = 'https://api.backblazeb2.com/b2api/v2/b2_authorize_account'

    request = Request(b2_auth_url, headers=headers)
    with urlopen(request) as response:
        auth = json.loads(response.read())
    response.close()
    return auth


def b2_get_upload_url(apiUrl: str, authToken: str, bucketId: str) -> dict:
    b2_get_upload_url = f'{apiUrl}/b2api/v2/b2_get_upload_url'
    get_url_body = {'bucketId': bucketId}
    get_url_headers = {'Authorization': authToken}
    request = Request(b2_get_upload_url, data=json.dumps(
        get_url_body).encode('utf-8'), headers=get_url_headers)
    with urlopen(request) as response:
        uploadData = json.loads(response.read())
    response.close()
    return uploadData


def b2_upload_file_callback(filePathName: str) -> None:
    global uploadUrl, authTokenUpload
    print(f'[ Upload in progress ]: {filePathName}', end='...', flush=True)
    allowed_codes = [500, 503]
    content_type = 'b2/x-auto'
    file_path_name_encoded = urllib.parse.quote(filePathName)

    # we trim backslash in order to create right directories structure on B2 Cloud
    if file_path_name_encoded[0] == '/':
        file_path_name_encoded = file_path_name_encoded[1:]

    with open(filePathName, 'br') as file:
        file_data = file.read()
    file.close()

    file_hash = hashlib.sha1(file_data).hexdigest()

    headers = {
        'Authorization': authTokenUpload,
        'X-Bz-File-Name': file_path_name_encoded,
        'Content-Type': content_type,
        'X-Bz-Content-Sha1': file_hash
    }

    request = Request(uploadUrl, data=file_data, headers=headers)
    try:
        response = urlopen(request)
        response.close()
        print('<- [DONE] ')
    except HTTPError as err:
        print('<- [FAILED] ')
        # B2 Cloud sends 500,503 errors when need to re-establish upload connection (upload url and authenticationToken could be changed)
        if err.code in allowed_codes:
            print('[ 503 error, reestablishing connection... ]')
            uploadSettings = b2_get_upload_url(apiUrl, authToken, bucketId)
            uploadUrl = uploadSettings['uploadUrl']
            authTokenUpload = uploadSettings['authorizationToken']
            b2_upload_file_callback(filePathName)


def applyForFile(filesPath: str, callback: Callable[[str], None]) -> None:
    excludes = ['.DS_Store', '.Trashes', '.fseventsd',
                '.Spotlight-V100', 'desktop.ini']

    for root, directories, files in os.walk(filesPath):
        for name in files:
            if name not in excludes:
                full_name = os.path.join(root, name)
                callback(full_name)


def main() -> None:
    global authToken, uploadUrl, authTokenUpload, apiUrl, bucketId
    parser = init_argparse()
    args = vars(parser.parse_args())

    directory = args["directory"]
    keyId = args["key_id"]
    keyValue = args["app_key"]

    auth = b2_authorize(keyId, keyValue)

    apiUrl = auth['apiUrl']
    authToken = auth['authorizationToken']
    bucketId = auth['allowed']['bucketId']
    uploadSettings = b2_get_upload_url(apiUrl, authToken, bucketId)

    uploadUrl = uploadSettings['uploadUrl']
    authTokenUpload = uploadSettings['authorizationToken']
    applyForFile(directory, b2_upload_file_callback)

    print('[ All files were successfully uploaded ]!')


if __name__ == "__main__":
    main()

```

## Выводы

Итого мы получили скрипт для бэкапа данных в облако вида:
```bash
python3 b2_backup.py -k <KEY_ID> -a <APP_KEY> <PATH_TO_FILES>
```
Разобрались в особенностях работы с нативным API сервиса B2 Cloud Storage и по пути научились "шагать" по файловой системе и отправлять файлами по http\https запросам.

Полная актуальная версия моего скрипта находится на моем [github](https://github.com/handleman/b2_backup)







