---
layout: post
title:  "Восстановить пароль к базе mySQL для различных CMS (2012 год)"
date:   2012-03-30 13:35:59 +0300
annotation: "По долгу своих рабочих обязанностей мне было нужно устанавливать cms wordpress в отдельную папку в корневую директорию на хостинге множества клиентов. Основная проблема в особенностях отдельного хостинг-провайдера: у каждого свои настройки, свои правила и условия. Задача усложняется еще и тем, что зачастую общение происходит с заказчиком, который не разбирается в тонкостях устройства своего сайта и теряется при разговоре с отделом ведения и получить от него необходимые реквизиты сложно. Хорошо если клиент даст доступ \"от FTP\", настоятельно требовать от него реквизиты базы данных его сервера не этично, да и не выгодно: Клиент всегда может уйти к другим, которые будут задавать меньше вопросов."
annotationPicture: "/assets/images/articles/opensourceCMS.jpg"
categories: webdev
---
<p>По долгу своих рабочих обязанностей мне было нужно устанавливать cms wordpress в отдельную папку в корневую директорию на хостинге множества клиентов. Основная проблема в особенностях отдельного хостинг-провайдера: у каждого свои настройки, свои правила и условия. Задача усложняется еще и тем, что зачастую общение происходит с заказчиком, который не разбирается в тонкостях устройства своего сайта и теряется при разговоре с отделом ведения и получить от него необходимые реквизиты сложно. Хорошо если клиент даст доступ "от FTP", настоятельно требовать от него реквизиты базы данных его сервера не этично, да и не выгодно: Клиент всегда может уйти к другим, которые будут задавать меньше вопросов.</p>
<p>Методом проб и ошибок я выработал для себя несколько простых приемов, а конкретнее - я нашел в каком месте “лежат” параметры подключения к базе у различных популярных cms. В моей копилке знаний присутствуют такие системы как: <strong>Yii PHP Framework, CMS Prestashop,</strong> <strong>Wordpress</strong>, <strong>MODx-CMS</strong>, <strong>Joomla</strong>, <strong>Drupal</strong>, <strong>CMS Made Simple</strong>, <strong>PHPShop</strong>, <strong>Data Life Engine (DLE)</strong>, <strong>Bitrix CMS, Astra.CMS</strong>.</p>
<p>Если вы забыли или потеряли доступы (логин и пароль) к базе данных mySQL или надо восстановить пароль в админку, то с помощью этих приемов сможешь выцепить необходимую информацию. <br />И так всё по порядку, как говорится от простого к сложному.</p>
<h3>Yii PHP Framework: 2.0</h3>
<p>В корневой директории проекта, файл <strong>/.env</strong> , в котором следующие строки:</p>
<script type="text/javascript" src="https://gist.github.com/handleman/1d5edec1211e86da234f.js"></script>
<h3>СMS Prestashop 1.6</h3>
<p>Вам нужен файл: <strong>/config/settings.inc.php</strong>. В котором строки:</p>
<script type="text/javascript" src="https://gist.github.com/handleman/61c10d6c66f18935cb99.js"></script>
<h3> Для CMS Wordpress:</h3>
<p class="tip-wrap">Тут все просто: в корне сайта лежит файлик " <strong>wp-config.php</strong>". Там ты найдешь следующие строки:</p>
<script type="text/javascript" src="https://gist.github.com/handleman/7704066.js"></script>
<h3>Для CMS Joomla 1.5 - 3:</h3>
<p class="tip-wrap">В корне сайта лежит файл " <strong>configuration.php</strong>". Там нас интересуют следующие строки:</p>
<script type="text/javascript" src="https://gist.github.com/handleman/7704088.js"></script>
<h3>Для CMS Drupal:</h3>
<p class="tip-wrap">В директории " <strong>/sites/default/</strong>" файл " <strong>settings.php</strong>". В этом файле данные по mysql находятся в формате "connection string", нас интересует следующая строка вида:</p>
<script type="text/javascript" src="https://gist.github.com/handleman/7704111.js"></script>
<h3>Для CMS  MODX(Revolutoin) :</h3>
<p class="tip-wrap">Доступы к базе находятся в /core/config/config.inc.php, в следующем формате:</p>
<script type="text/javascript" src="https://gist.github.com/handleman/9034780.js"></script>
<h3>Для CMS  MODX(EVO) :</h3>
<p class="tip-wrap">Тут тебе нужен файл " <strong>config.inc.php</strong>" в директории " <strong>/manager/includes/</strong>" , находишь следующие строки:</p>
<script type="text/javascript" src="https://gist.github.com/handleman/7704146.js"></script>
<h3>Доступы для  Bitrix CMS</h3>
<p class="tip-wrap">Битрикс хранит свои настройки базы данных в файле " <strong>dbconn.php</strong>" в директории " <strong>/bitrix/php_interface/</strong>". Ищем строки типа:</p>
<script type="text/javascript" src="https://gist.github.com/handleman/7704166.js"></script>
<h3>Доступы для Shift CMS</h3>
<p class="tip-wrap">Доступы к базе данных прописаны в файле include/config/set.inc.php</p>
<script type="text/javascript" src="https://gist.github.com/handleman/9034520.js"></script>
<h3>У CMS Made Simple</h3>
<p class="tip-wrap">Прямо в корне сайта лежит файл " <strong>config.php</strong>", в котором тебе будут нужны строки:</p>
<script type="text/javascript" src="https://gist.github.com/handleman/7704178.js"></script>
<h3>Для CMS PHPShop</h3>
<p class="tip-wrap">Отредактируй файл связи с базой MySQL " <strong>config.ini</strong>", лежащий в папке " <strong>/phpshop/inc/</strong>”</p>
<script type="text/javascript" src="https://gist.github.com/handleman/7704188.js"></script>
<h3> CMS Data Life Engine (DLE)</h3>
<p class="tip-wrap">Тебе нужен файл " <strong>dbconfig.php</strong>" в директории “ <strong>/engine/data/</strong>”. <br />Следующие строки:</p>
<script type="text/javascript" src="https://gist.github.com/handleman/7704197.js"></script>
<h3>Astra.CMS</h3>
<p>В корне сайта лежит файл " <strong>config.php",</strong>в котором, тебе нужна строка:</p>
<script type="text/javascript" src="https://gist.github.com/handleman/7704213.js"></script>
<p>Не стоит даже упомниать что в кавычках будут другие данные специфичные для вашего случая, а не “твой текст”. На этом всё. Если кто-нибудь работал с другими CMS и сталкивался с подобной ситуацией, не поленитесь оставить комментарий, и я добавлю его в статью. Надеюсь, был полезен.  </p>

