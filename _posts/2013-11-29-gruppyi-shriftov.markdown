---
layout: post
title:  "Разработка: Таблица группировки шрифтов в CSS"
date:   2013-11-29 13:35:59 +0300
annotation: "В наше время существует множество шрифтов в различных форматах, годных для встраивания на страницу, причем бесплатно. Существуют специальные хостинги шрифтов, благодаря которым встроить нужный шрифт занимает от силы две-три минуты. Причем сам процесс интеграции такого шрифта, немногим сложнее чем сменить статус в социальной сети."
annotationPicture: "/assets/images/articles/fonts_guide/gid_fonts.jpg"
categories: webdev
---

<p>В наше время существует множество шрифтов в различных форматах, годных для встраивания на страницу, причем бесплатно. Существуют специальные хостинги шрифтов, благодаря которым встроить нужный шрифт занимает от силы две-три минуты. Причем сам процесс интеграции такого шрифта, немногим сложнее чем сменить статус в социальной сети.</p>
<p>Тем не менее даже сейчас<strong> нельзя просто так взять и указать один шрифт для элемента страницы</strong>. Всегда необходимо продумывать связку шрифтов. Причин для этого достаточно много начиная от того, что браузер клиента может не поддерживать форматы веб-шрифтов (хотя, это маловероятно в современном мире) и заканчивая вопросами кросс-браузерного отображения (подмена шрифта отсутствующего в системе аналогичным по начертанию).</p>
<p>Для того чтобы постоянно не держать в голове сходные шрифты, я пользуюсь специальной таблицей которую нашел несколько лет назад в вебе. Беру на себя труд перевести ее и дополнить своими соображениями специально для вас, читателей моего блога. Ссылочка на оригинал будет в самом конце статьи.</p>
<div class="clearfix"> </div>
<table class="table table-striped">
<tbody>
<tr><th>Шрифт</th><th>...</th><th>Информация</th></tr>
<tr>
<td><img style="height: 39px; width: 140px;" src="/assets/images/articles/fonts_guide/helveticaRegular.png" alt="Helvetica Regular" /></td>
<td><img src="/assets/images/articles/fonts_guide/mac-logo.png" alt="Macintosh" /></td>
<td>
<p>Широко используемый шрифт без засечек, разработанный в 1957 швейцарским проектировщиком шрифта Максом Мидинджером и Эдуардом Хоффманом. Шрифт идет в комплекте шрифтов для Mac OS.</p>
<p><strong>font-family: Helvetica, 'Helvetica Neue' 'Arial Narrow', sans-serif;</strong></p>
</td>
</tr>
<tr>
<td><img style="height: 27px; width: 140px;" src="/assets/images/articles/fonts_guide/helveticaNeueMedium.png" alt="Helvetica Neue " /></td>
<td><img src="/assets/images/articles/fonts_guide/mac-logo.png" alt="Macintosh" /></td>
<td>
<p>Широко используемый на Mac Os и iOS шрифт без засечек, разработанный в 1983 проектировщиком шрифта Вольфгангом Шимпфом и Райнхардом Хаусом. Шрифт идет в комплекте шрифтов для Mac OS.</p>
<p><strong>font-family: 'Helvetica Neue Medium', Helvetica, 'Arial Narrow', sans-serif;</strong></p>
</td>
</tr>
<tr>
<td><img src="/assets/images/articles/fonts_guide/arial.gif" alt="Arial" width="47" height="19" /></td>
<td><img src="/assets/images/articles/fonts_guide/ie-logo.png" alt="MS Internet Explorer" /></td>
<td>
<p>На мой взгляд самый популярный шрифт без засечек, прямой конкурент для Helvetica.</p>
<p><strong>font-family: Arial, Helvetica, sans-serif;</strong></p>
</td>
</tr>
<tr>
<td><img style="width: 140px; height: 18px;" src="/assets/images/articles/fonts_guide/arialblack.gif" alt="Arial Black" /></td>
<td><img src="/assets/images/articles/fonts_guide/ie-logo.png" alt="MS Internet Explorer" /></td>
<td>
<p>Менее популярен нежели Arial.Не используйте его с font-weight:bold; Этот шрифт сам по себе достаточно жирный!</p>
<p><strong>font-family: "Arial Black", Arial, sans-serif;</strong></p>
</td>
</tr>
<tr>
<td><img style="width: 140px; height: 19px;" src="/assets/images/articles/fonts_guide/comicsans.gif" alt="FontName" /></td>
<td><img src="/assets/images/articles/fonts_guide/ie-logo.png" alt="MS Internet Explorer" /></td>
<td>
<p>Для этого шрифта очень сложно подобрать аналог, а главное, нужно ли его использовать вообще...</p>
<p><strong>font-family: "Comic Sans MS", cursive;</strong></p>
</td>
</tr>
<tr>
<td><img src="/assets/images/articles/fonts_guide/courier.gif" alt="Courier (Mac scalable)" width="101" height="17" /> <br /> <img style="width: 81px; height: 13px;" src="/assets/images/articles/fonts_guide/couriernew.png" alt="Courier New" /></td>
<td><img src="/assets/images/articles/fonts_guide/mac-logo.png" alt="Macintosh" /> <br /> <img src="/assets/images/articles/fonts_guide/ms-logo.png" alt="Windows" width="38" height="30" align="middle" /></td>
<td>
<p>Шрифт, имитирующий стиль печатной машинки. В наше время полностью устарел и встречается редко. Рекомендуется использовать «Courier New».</p>
<p><strong>font-family: "Courier New", Courier, monospace;</strong></p>
</td>
</tr>
<tr>
<td><img src="/assets/images/articles/fonts_guide/geneva.gif" alt="Geneva" width="83" height="20" /></td>
<td><img src="/assets/images/articles/fonts_guide/mac-logo.png" alt="Macintosh" /></td>
<td>
<p>Древний шрифт, предок Helvetica. Интересен в качестве музейного экспоната.</p>
<p><strong>font-family: Geneva, "MS Sans Serif", sans-serif;</strong></p>
</td>
</tr>
<tr>
<td><img src="/assets/images/articles/fonts_guide/georgia.gif" alt="Georgia" width="82" height="24" /></td>
<td><img src="/assets/images/articles/fonts_guide/ie-logo.png" alt="MS Internet Explorer" /></td>
<td>
<p>Шрифт с засечками. Разработан в Microsoft для использования в интернете. Рассчитан на четкое и читаемое отображение в малом размере. Очень похож на Times New Roman.</p>
<p><strong>font-family: Georgia, Times New Roman, serif;</strong></p>
</td>
</tr>
<tr><!-- MS SANS SERIF -->
<td><img style="width: 140px; height: 16px;" src="/assets/images/articles/fonts_guide/mssansserif.gif" alt="MS Sans Serif" /></td>
<td><img src="/assets/images/articles/fonts_guide/ms-logo.png" alt="Windows" width="38" height="30" align="middle" /></td>
<td>
<p>Системный шрифт MS Windows, использовался для диалоговых окон, системных сообщений и т. д.</p>
<p><strong>font-family: "MS Sans Serif", Geneva, sans-serif;</strong></p>
</td>
</tr>
<tr>
<td><img src="/assets/images/articles/fonts_guide/terminal9.gif" alt="Terminal (9 pt.)" width="63" height="9" /> <br /> <img src="/assets/images/articles/fonts_guide/terminal12.gif" alt="Terminal (12 pt.)" width="91" height="14" /> <br /> <img src="/assets/images/articles/fonts_guide/terminal14.gif" alt="Terminal (14 pt.)" width="77" height="14" /></td>
<td><img src="/assets/images/articles/fonts_guide/ms-logo.png" alt="Windows" width="38" height="30" align="middle" /></td>
<td>
<p>Немасштабируемый, моноширинный системный шрифт DOS или интерфейса командной строки.</p>
<p><strong>font-family: Terminal, monospace;</strong></p>
</td>
</tr>
<tr>
<td><img style="width: 140px; height: 15px;" src="/assets/images/articles/fonts_guide/timesnewroman.gif" alt="Times New Roman" /></td>
<td><img src="/assets/images/articles/fonts_guide/ie-logo.png" alt="MS Internet Explorer" /></td>
<td>
<p>Это — безусловно наиболее распространенный шрифт в Сети. Являлся шрифтом по умолчанию в большинстве браузеров.</p>
<p><strong>font-family: "Times New Roman", Times, serif;</strong></p>
</td>
</tr>
<tr>
<td><img src="/assets/images/articles/fonts_guide/verdana.gif" alt="Verdana" width="97" height="20" /></td>
<td><img src="/assets/images/articles/fonts_guide/ie-logo.png" alt="MS Internet Explorer" /></td>
<td>
<p>Возможно, самый удобочитаемый из шрифтов без засечек, разработанный в Microsoft для использования на экране. Однако, Verdana не должен использоваться бок о бок со схожими шрифтами того же размера, потому что Verdana зрительно кажется больше по размеру.</p>
<p><strong>font-family: Verdana, Arial, Helvetica, sans-serif;</strong></p>
</td>
</tr>
</tbody>
</table>
<p>Текст переведен, доработан и подчищен от устаревшей информации, Оригинал находится <a href="http://www.angelfire.com/al4/rcollins/style/fonts.html" target="_blank">тут</a></p>
<p>Желаю удачи во всех начинаниях.</p>
<p class="postovoy">Советую <a href="http://com.uanic.name/" target="_blank">Надежный хостинг и регистратор доменных имен</a></p>