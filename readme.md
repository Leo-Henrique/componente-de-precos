# Desafio do Frontend Mentor | Componente de preços interativo

Este desafio pelo Frontend Mentor consistia em desenvolver uma página com controle deslizante personalizado que exibe preços fictícios com base em algumas condições e conforme o usuário interage com o controle deslizante. Este desafio é ótimo para sair um pouco da zona de conforto com CSS e praticar JavaScript.

![Captura de tela do projeto](https://user-images.githubusercontent.com/72027449/171880196-8412541f-85d8-436f-aabf-1ce5a7641bd0.png)

## 📋 Índice

* [Visão geral](#-visão-geral)
    * [Status](#-status)
    * [O desafio](#-o-desafio)
    * [Links](#-acesse-o-projeto)
* [Desenvolvimento](#%EF%B8%8F-desenvolvimento)
    * [Tecnologias utilizadas](#-tecnologias-utilizadas)
    * [Aprendizados](#-aprendizados)
        * [Estilizar um controle deslizante](#estilizar-um-controle-deslizante)
        * [Cor de fundo do controle deslizante](#cor-de-fundo-do-controle-deslizante)
        * [Toggle button](#toggle-button)
    * [Recursos úteis](#recursos-úteis)

## 🔎 Visão geral

### ✅ Status

Finalizado.

### 🏁 O desafio

Para a resolução deste desafio, os usuários devem ser capazes de:

* Visualizar exatamente o layout proposto de acordo com o tamanho da janela de exibição (responsividade)
* Visualizar os estados – pairar, clicar ou selecionar – nos elementos interativos para uma usabilidade adequada
* Usar o controle deslizante e visualizar os preços adequados com as visualizações de página referente ao mesmo preço

### 🔗 Acesse o projeto

* [Link do projeto](https://leo-henrique.github.io/componente-de-precos/)
* [Desafio no Frontend mentor](https://www.frontendmentor.io/challenges/interactive-pricing-component-t0m8PIyY8)

## ⚙️ Desenvolvimento

### 💻 Tecnologias utilizadas

* HTML
* CSS / SASS
* Vanilla JavaScript

### 💡 Aprendizados

#### Estilizar um controle deslizante

A princípio, achei que deveria abrir mão do elemento `input` com o atributo `type="range"` e criar um controle deslizante do zero para poder personaliza-lo com CSS. Entretanto, com apenas algumas propriedades e pseudo elementos foi possível deixar o campo de entrada padrão totalmente personalizado e com um ótimo suporte a vários navegadores.

Basta esconde-lo com algumas propriedades:
```scss
input[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    background: none;
}
```

E em seguida, utilizar o pseudo elemento necessário para estilizar a **linha (track)** e outro para estilizar o **polegar (thumb)**. Como é necessário repetir os estilos com outros pseudo elementos para dar suporte a mais navegadores, criei um **mixin** referente a linha do controle deslizante e outro referente ao polegar, já que por algum motivo o seletor de agrupamento (,) do CSS não era válido nessa ocasião.

```scss
input[type="range"] {
    /* TRACK: LINHA */
    &::-webkit-slider-runnable-track {
        @include slider-track;
    }
    &::-moz-range-track {
        @include slider-track;
    }
    &::-ms-track {
        @include slider-track;
    }
    /* FIM */

    /* THUMB: POLEGAR */
    &::-webkit-slider-thumb {
        @include slider-thumb;
    }
    &::-moz-range-thumb {
        @include slider-thumb;
    }
    &::-ms-thumb {
        @include slider-thumb;
    }
    /* FIM */
}
```

#### Cor de fundo do controle deslizante

Infelizmente, com apenas CSS não era possível setar uma cor para o lado esquerdo e outra para o lado direito do polegar do controle deslizante.

Para resolver esse problema, coloquei uma variável CSS para a propriedade `background-image` no mixin referente a linha do meu controle, para assim ser possível setar valores personalizados a propriedade com JavaScript, já que o seletor é um pseudo elemento.

```scss
@mixin slider-track {
    background-image: var(--background, initial);
}
```

No JavaScript criei uma função que simplesmente divide 100 pelo valor máximo do controle deslizante **(100 / 4 = 25)**, o resultado dessa conta é multiplicado pelo valor atual do controle deslizante e colocado em porcentagem. Assim, toda vez que o `value` do controle deslizante muda, o resultado é acrescentado na cor com `linear-gradient`.


```js
function handleSliderBackground() {
    const sliderCurrentValue = +slider.value;
    const maxValue = +slider.getAttribute("max");
    const stepInPercentage = +(100 / maxValue).toFixed(2);
    const gradientPercentage = (stepInPercentage * sliderCurrentValue).toFixed(2) + "%";
    const leftBgColor = "#10d5c2";
    const rightBgColor = "#eaeefb";
    const setPercentages = `linear-gradient(to right, 
        ${leftBgColor} ${gradientPercentage}, 
        ${rightBgColor} ${gradientPercentage}
        )`;

    slider.style.setProperty("--background", setPercentages);
}
```
![Porcentagens do linear gradient sendo adicionadas ao slider](https://user-images.githubusercontent.com/72027449/171924223-1fea1d0c-fef9-4140-9ffb-29c638b843d3.gif)


#### Toggle button

Assim como no controle deslizante, achei que teria abrir mão do `input` padrão e criar um botão totalmente personalizado. Porém descobri que o `input` do tipo `type="checkbox"` é aproveitado nessa ocasião, tornando possível a construção desse botão apenas com HTML e CSS.

A estrutura HTML fica assim:
```html
<label class="toggle">
    <input type="checkbox" />
    <span></span>
</label>
```

No CSS, você basicamente esconde o `input`, e estiliza o `span` para criar o botão, sendo o `::before` desse `span` exatamente o "elemento" que mostra quando o botão está ativado e quando não está. 

```scss
.toggle {
    display: inline-block;
    position: relative;
    width: 55px;
    height: 25px;

    input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    span {
        // estilização do botão
    }
    span::before {
        // estilização do elemento dentro do botão, que se move para a direita quando está ativo e para esquerda quando inativo
    }
}
```

Para a interação ocorrer, basta especificar o seletor `:checked` referente ao `input` e estilizar o botão diferente de quando está inativo, já que o botão em si (`span`) está envolvido em um `label` que faz referência ao campo invisível que sempre ganha ou perde o atributo `checked` quando é clicado.

```scss
input:checked + span {
    background-color: $secondary;

    &::before {
        transform: translate3D(29px, 0, 0);
    }
}
```

![Botão toggle em funcionamento com apenas HTML e CSS](https://user-images.githubusercontent.com/72027449/171925727-4c255c29-1d36-4365-b535-07084ca3008c.gif)


### Recursos úteis

* [Estilizando controles deslizantes compatíveis com vários navegadores com CSS](https://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/) - Esse foi o artigo do **CSS-Tricks**, responsável por citar todas as instruções necessárias para a estilização do controle deslizante

* [Estilize pseudo-elementos com JavaScript usando propriedades personalizadas](https://css-irl.info/quick-tip-style-pseudo-elements-with-javascript-using-custom-properties/) - Esse foi o artigo do **CSS {In Real Life}**, responsável por mostrar uma maneira de estilizar pseudo elementos com JavaScript

* [Criar um botão de alternância](https://www.w3schools.com/howto/howto_css_switch.asp) - Essa página no **W3Schools**, mostrou como criar e estilizar um botão de alternância (toggle button)