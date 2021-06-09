---
layout: post
title: 'Frontend: Svelte в сравнении с другими популярными фреймворками'
date: 2021-06-09 12:48:59 +0300
description: 'Svelte это фронтендерский фреймворк, который стремительно ворвался в индустрию году так в 2018-2019, и произвел тогда невероятно сильное впечатление: новый подход, новый приятный синтаксис и невероятные показатели бенчмарков. Был только один вопрос, сможет ли такое более-менее-радикальное решение закрепиться на рынке и продержаться достаточно долго чтобы обрасти экосистемой вокруг - стать достаточно взрослым "для продакшена".'
image: '/assets/images/articles/svelte-logo.png'
categories: frontend, js, javascript
---
Svelte это фронтендерский фреймворк, который стремительно ворвался в индустрию году так в 2018-2019, и произвел тогда невероятно сильное впечатление: новый подход, новый приятный синтаксис и невероятные показатели бенчмарков. Был только один вопрос, сможет ли такое более-менее-радикальное решение закрепиться на рынке и продержаться достаточно долго чтобы обрасти экосистемой вокруг - стать достаточно взрослым "для продакшена".

Сейчас можно смело сказать что проект готов к реальным условиям: он живой, оброс различными готовыми решениями, получает поддержку от именитых организаций, и, мне захотелось попробовать его на практике, для того, чтобы сравнить по конкретным параметрам с другими популярными сейчас фреймворками, стандартами индустрии как React и Angular.

> p.s: я не взял Vue.js  в сравнение просто из-за нехватки свободного времени, в остальном прекрасный фреймворк, имею опыт.

Для надежности я решил сделать свой тестовый стенд - свое приложение, написанное на каждом из указанных выше фреймворках. Таким образом я контролирую всю кодовую базу и смогу попробовать именно те концепции   что я использую в реальной работе.

Меня интересует как будет себя вести и ощущаться разработка следующих концепций:

* роутинг
* стейт-менеджмент
* различные варианты вложенности компонентов, слоты.
* работа с формами
* препроцессинг стилей

Причем разработка должна быть на максимально популярных и массовых для этих фреймворках технологиях и подходах, но при этом структура компонентов и в целом структура и количество кода максимально похожей - чтобы увеличить точность. Поэтому, **местами код получился спорным**, но я это делал с умыслом, чтобы максимально сблизить примеры.

## стек технологий
Svelte: Sapper + встроенные средства для state management

React: Next.js + Redux

Angular : возможности стандартной Angular CLI + ngRx


## тестирование

Что я посчитал важным протестировать и сравнить:

* общая скорость и комфорт разработки (сугубо по ощущениям и затраченному времени)
* размер билда, размер кода в памяти.
* передача данных по сети, количество запросов, и т.д.
* скорость отрисовки и рендеринга при различных общих операциях
* ну и общий скоринг lighthouse и webpagetest.

## реализация

Описывать и разбирать код по частям не имеет смысла, прикладываю ссылки на репозиторий для каждого варианта.

### Svelte

**репозиторий:** [github: svelte-pomodore-timer-example](https://github.com/handleman/svelte-pomodore-timer-example)

**билд:** [surge: svelte-pomodoro-timer-example](http://svelte-pomodoro-timer-example.surge.sh)


### Angular

**репозиторий:** [github: angular-pomodoro-timer-example](https://github.com/handleman/angular-pomodoro-timer-example)

**билд:** [surge: angular-pomodoro-timer-example](http://angular-pomodoro-timer-example.surge.sh/)

### React

**репозиторий:** [github: angular-pomodoro-timer-example](https://github.com/handleman/angular-pomodoro-timer-example)

**билд:** [surge: angular-pomodoro-timer-example](http://angular-pomodoro-timer-example.surge.sh/)


## Результаты, сводная таблица

По субъективным ощущениям комфорта побеждает конечно Svelte, несмотря на то, что для меня это абсолютно новый синтаксис, работать с концепцией приятно. Код пишется легко и в малом количестве.

Тяжелее всего, было на реакте, в силу большого количества Boulerplate-like кода и файлов которые надо описывать вручную, где, например, в Angular, за тебя делает CLI.
 
По показателям, размера бандла и работой с сетью с уверенным отрывом побеждает Svelte, т.е. эта вещь точно нужна при условии ограниченной памяти на целевом устройстве.

В отношении скорости рендера **не все однозначно** отрыв незначительный, слишком небольшой, чтобы быть уверенным что это не результат погрешности.

Неприятно удивил React/Next, и бандл самый большой, и непонятная магия с запросами под капотом.

Ниже прилагаю сводную таблицу с конкретными данными.

<style type="text/css">
.svelte-color{
    background-color: #FFD966;
}
.angular-color{
    background-color: #E06666;
}
.react-color{
    background-color: #9FC5E8
}
.green-cell{
    background-color: #D9EAD3
}
.yellow-cell{
    background-color: #FFF2CC
}
.red-cell{
    background-color: #F4CCCC
}
.gray-cell{
    background-color: #EFEFEF;
    text-align:center;
}
.dark-green-cell{
    background-color: #6AA84F;
    text-align:center;
    color:white;
}
.frameworks-compare-table td {
    padding: .5em .5em .5em 1em;
}
</style>

<table class="frameworks-compare-table">
    <tr>
        <td>
        </td>
        <td class="svelte-color">
            <b>Svelte (Sapper)</b>
        </td>
        <td class="react-color">
            <b>React (Next.js)</b>
        </td>
        <td class="angular-color">
            <b>Angular (Angular-CLI)</b>
        </td>
    </tr>
    <tr>
        <td>
            <b>Github page</b>
        </td>
        <td>
            <a href="https://github.com/handleman/svelte-pomodore-timer-example" target="_blank">application code</a>
        </td>
        <td>
            <a href="https://github.com/handleman/react-pomodoro-timer-example" target="_blank">application code</a>
        </td>
        <td>
            <a href=" https://github.com/handleman/angular-pomodoro-timer-example" target="_blank"> application code</a>
        </td>
    </tr>
    <tr>
         <td>
            <b>Live demo</b>
        </td>
        <td>
            <a href="http://svelte-pomodoro-timer-example.surge.sh/" target="_blank">application example</a>
        </td>
        <td>
            <a href="http://react-pomodoro-timer-example.surge.sh/" target="_blank">application example</a>
        </td>
        <td>
            <a href="http://angular-pomodoro-timer-example.surge.sh/" target="_blank">application example</a>
        </td>
    </tr>
    <tr>
        <td colspan="4" class="gray-cell">
            <b>Build phase</b>
        </td>
    </tr>
    <tr>
        <td>Bundle build time (sec)
        </td>
        <td class="yellow-cell">9
        </td>
        <td class="green-cell">6
        </td>
        <td class="red-cell">12
        </td>
    </tr>
    <tr>
        <td>Production build export size
        </td>
        <td class="green-cell">104 KB
        </td>
        <td class="red-cell">380 KB and increasing every build
        </td>
        <td class="yellow-cell">292 KB
        </td>
    </tr>
    <tr>
        <td colspan="4" class="gray-cell">
            <b>Network</b>
        </td>
    </tr>
    <tr>
        <td>JS files in browser (kB)
        </td>
        <td class="green-cell">29,3
        </td>
        <td class="red-cell">83,778
        </td>
        <td class="yellow-cell">81,1
        </td>
    </tr>
    <tr>
        <td>CSS files in browser (kB)
        </td>
        <td class="green-cell">0,93
        </td>
        <td class="red-cell">2,1
        </td>
        <td class="yellow-cell">0,94
        </td>
    </tr>
    <tr>
        <td>Total resources loaded (kB)
        </td>
        <td class="green-cell">88,2
        </td>
        <td class="red-cell">276
        </td>
        <td class="yellow-cell">269
        </td>
    </tr>
    <tr>
        <td>Total requests
        </td>
        <td class="yellow-cell">8
        </td>
        <td class="red-cell">19
        </td>
        <td class="green-cell">6
        </td>
    </tr>
    <tr>
        <td>DOM Content Loaded (sec)
        </td>   
        <td class="yellow-cell">1,13
        </td>
        <td class="green-cell">0,581
        </td>
        <td class="red-cell">1,31
        </td>
    </tr>
    <tr>
        <td>Total Load (sec)
        </td>   
        <td class="yellow-cell">1,52
        </td>
        <td class="red-cell">1,82
        </td>
        <td class="green-cell">1,31
        </td>
    </tr>
    <tr>
        <td colspan="4" class="gray-cell">
            <b>Coverage</b>
        </td>
    </tr>
    <tr>
        <td>Js code used (%)
        </td>   
        <td class="green-cell">82
        </td>
        <td class="yellow-cell">74
        </td>
        <td class="yellow-cell">74
        </td>
    </tr>
    <tr>
        <td>CSS code used (%)
        </td>   
        <td class="green-cell">90
        </td>
        <td class="red-cell">57
        </td>
        <td class="yellow-cell">66
        </td>
    </tr>
    <tr>
        <td colspan="4" class="gray-cell">
                <b>Lighthouse scoring</b>
        </td>
    </tr>
    <tr>
        <td>Performance
        </td>   
        <td class="green-cell">100
        </td>
        <td class="yellow-cell">99
        </td>
        <td class="red-cell">97
        </td>
    </tr>
    <tr>
        <td>Accessibility
        </td>   
        <td class="green-cell">100
        </td>
        <td class="yellow-cell">94
        </td>
        <td class="yellow-cell">94
        </td>
    </tr>
    <tr>
        <td>Best Practices
        </td>   
        <td class="green-cell">93
        </td>
        <td class="green-cell">93
        </td>
        <td class="green-cell">93
        </td>
    </tr>
    <tr>
        <td>SEO
        </td>   
        <td class="green-cell">80
        </td>
        <td class="green-cell">80
        </td>
        <td class="green-cell">80
        </td>
    </tr>
    <tr>
        <td colspan="4" class="gray-cell">
            <b>webpagetest.org scoring</b>
        </td>
    </tr>
    <tr>
        <td>First Byte (sec)
        </td>   
        <td class="red-cell">0,365
        </td>
        <td class="yellow-cell">0,353
        </td>
        <td class="green-cell">0,324
        </td>
    </tr>
    <tr>
        <td>Start Render (sec)
        </td>   
        <td class="yellow-cell">0,7
        </td>
        <td class="green-cell">0,6
        </td>
        <td class="red-cell">1
        </td>
    </tr>
    <tr>
        <td>First Contentful Paint (sec)
        </td>   
        <td class="yellow-cell">0,647
        </td>
        <td class="green-cell">0,619
        </td>
        <td class="red-cell">0,97
        </td>
    </tr>
    <tr>
        <td>Largest contentful paint (sec)
        </td>   
        <td class="yellow-cell">0,646
        </td>
        <td class="green-cell">0,619
        </td>
        <td class="red-cell">0,97
        </td>
    </tr>
    <tr>
        <td colspan="4" class="dark-green-cell">
            <b>Performance investigation</b>
        </td>
    </tr>
    <tr>
        <td colspan="4" class="gray-cell">
            <b>When pomodoro timer decreased by one second</b>
        </td>
    </tr>
    <tr>
        <td>Scripting (ms)
        </td>   
        <td class="green-cell">0,4
        </td>
        <td class="red-cell">0,6
        </td>
        <td class="yellow-cell">0,5
        </td>
    </tr>
    <tr>
        <td>Rendering (ms)
        </td>   
        <td class="green-cell">0,3
        </td>
        <td class="green-cell">0,3
        </td>
        <td class="green-cell">0,3
        </td>
    </tr>
    <tr>
        <td>Painting (ms)
        </td>   
        <td class="green-cell">0,2
        </td>
        <td class="green-cell">0,2
        </td>
        <td class="green-cell">0,2
        </td>
    </tr>
    <tr>
        <td>System (ms)
        </td>   
        <td class="green-cell">0
        </td>
        <td class="green-cell">0
        </td>
        <td class="green-cell">0
        </td>
    </tr>
    <tr>
        <td colspan="4" class="gray-cell">
            <b>When user click "pause" button and timer goest into on-pause-state</b>
        </td>
    </tr>
    <tr>
        <td>Scripting (ms)
        </td>   
        <td class="green-cell">3
        </td>
        <td class="yellow-cell">5
        </td>
        <td class="green-cell">3
        </td>
    </tr>
    <tr>
        <td>Rendering (ms)
        </td>   
        <td class="green-cell">5
        </td>
        <td class="yellow-cell">6
        </td>
        <td class="yellow-cell">6
        </td>
    </tr>
    <tr>
        <td>Painting (ms)
        </td>   
        <td class="green-cell">4
        </td>
        <td class="green-cell">4
        </td>
        <td class="yellow-cell">5
        </td>
    </tr>
    <tr>
        <td>System (ms)
        </td>   
        <td class="green-cell">8
        </td>
        <td class="yellow-cell">9
        </td>
        <td class="yellow-cell">9
        </td>
    </tr>
    <tr>
        <td colspan="4" class="gray-cell">
            <b>Route change behaviour (User goes to /config SPA page)</b>
        </td>
    </tr>
    <tr>
        <td>Scripting (ms)
        </td>   
        <td class="green-cell">5
        </td>
        <td class="yellow-cell">9
        </td>
        <td class="red-cell">10
        </td>
    </tr>
    <tr>
        <td>Rendering (ms)
        </td>   
        <td class="yellow-cell">2
        </td>
        <td class="green-cell">1
        </td>
        <td class="green-cell">1
        </td>
    </tr>
    <tr>
        <td>Painting (ms)
        </td>   
        <td class="yellow-cell">0,4
        </td>
        <td class="yellow-cell">0,3
        </td>
        <td class="green-cell">0,2
        </td>
    </tr>
    <tr>
        <td>System (ms)
        </td>   
        <td class="green-cell">1
        </td>
        <td class="green-cell">1
        </td>
        <td class="green-cell">1
        </td>
    </tr>
    
</table>








