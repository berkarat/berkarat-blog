---
title: "Jquery  Virtual Keyboard Kullanımı"
published: 2019-11-12
description: "Merhabalar bu yazımızda html ve js kullanarak virtual keyboard oluşturup bu keyboard ile inputlara bilgiler gireceğiz. Virtual keyboard windowslarda i"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

Merhabalar bu yazımızda html ve js kullanarak virtual keyboard oluşturup bu keyboard ile inputlara bilgiler gireceğiz. Virtual keyboard windowslarda işletim sisteminde bulunmaktadır ancak bu programın içinde gömülü olmadığından pek efektif kullanım sağlamamaktadır.

Bir diğer konu da günümüzde dokunmatik ekranlarda html tasarımları yapıp üstüne virtual keyboard eklentisi yapmakta. Genel araştırmalarım sonucunda internette de bolca bulunan standart Jquery kütüphaneleri iş görmektedir. Ancak benim bahsetmek istediğim konu :

## Aynı virtual keyboard ile birden fazla inputa bilgi girmek.

Bu yüzden her zamanki gibi örnek üzerinden başlayacağım. virtual keyboard anlatımında kodların ne işe yaradıkları neler yapılacağı gibi açıklamalar yapacağım.

HTML sayfa yapısını kurmak için öncelikle aşağıdaki gibi bir kod bloğuna ihtiyacımız var. Ardından inputları bootstrap 4.3.1 ile birlikte kullanıyoruz. Aynı zamanda Jquery de kullanacağımız için link olarak eklememiz gerekmektedi. Sadece aşağıdaki linkleri eklesek yeterli ilk etap olarak.  
Bunlar jquery ve bootstrap için yeterlidir.

Daha fazla bilgi için bootstrap yazımı incelemenizi tavsiye ederim.  
  

> [Bootstrap Nedir ? Nasıl Eklenir ? Uygulama Örnekleri](https://blog.berkarat.com/bootstrap-1/)

Kaynak : [https://getbootstrap.com/](https://getbootstrap.com/)

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">

Ardından inputları ekleme yapıyor. Bunun için tekrar tasarım yapmamıza gerek yok. Burada tasarımdan ziyade asıl konu virtural keyboard tarafına yoğunlaşmamız gerekli. O yüzden bootstrap üzerinden aldığımız input gruplarını düzenleyip divlerin arasına ekleyeceğiz. Bunun için bir adet örnek yeterlidir. Diğerlerini birbirinin tekrarı olarak eklerseniz bir problem olmaz. Sadece aynı ID ile farklı elementlerin olmamasına dikkat etmeniz yeterlidir.

        <div class="input-group ">
            <div class="input-group-prepend">
              <span class="input-group-text"   id="inputGroup-sizing-default">ADINIZ</span>
            </div>
            <input id="name" type="text" class="virtualKeyboard form-control" aria-label="Default"  aria-describedby="inputGroup-sizing-default">
          </div>

Ardından keyboard kısmına yavaş yavaş geçiyoruz. Bir div içerisine “virtualKeyboard” class ile keyboard ekleme işlemini yapıyoruz

 <div class="container-fluid" style="height: 120px;"id="keybd" ></div>

Şimdi son olarak 1-2 script daha ekledikten sonra script geçme işlemine başalayacağız. Bu ekleyeceğimiz scriptleri yazacağız.

<link rel="stylesheet" href="./virtualKeyboard.css">    <script src="./virtualKeyboard.js"></script>    
<script>  $('.virtualKeyboard').vkb();</script>

Yukarıdaki eklemelerle “virtualKeyboard.js” adındaki script dosyası bizim keyboard işlemimizi yapacak asıl görevli script. “virtualKeyboard.css” ise keyboard tarafında görünürlüğün css dosyasıdır. “$(‘.virtualKeyboard’).vkb()” metodunu sayfa yüklendiğinde çalışır.

Gelelim şimdi artık Script dosyasını yazmaya. html dosyamızla aynı dosya yolunda bir tane “virtualKeyboard.js” adında bir javascript dosyası oluşturalım. Yazacağımız jQuery Kütüphanesi olduğu için aşağıdaki fonksiyonun içerisinde çalışacaktır.

(function($){
   ...JQUERY KODUMUZU BURAYA EKLEYECEĞİZ ...
})(jQuery);

Baştan sona adım adım gideceğimiz yöntemde ilk olarak çağırdığımız fonksiyonu yazmalıyız. Bu fonksiyonda neler olması gerektiği altta yazılıdır.

 function Vkb(element, options) {
        this.config = $.extend({}, defaults, options);
        this.element = element;
        this.init();
    }
 $.fn.vkb = function (options) {
        new Vkb(this, options);
        return this;
    }

Default olarak genel classlarımızı yazalım.

   var defaults = {
        styleClassParentInput: 'vkb-css-parent-input',
        styleClassKeyboardIcon: 'vkb-css-keyboard-icon',
        srcKeyboardIcon: 'image/keyboard.gif'
    };

Artık bu işlem ile bir çok adımın ön planını yaptık. Şimdi keyboard template dediğimiz kısmı yani butonların olacağı yerleri ekleyeceğiz. Burada isteyen sadece numeric isteyen büyük küçük harf gibi seçenekler de ekleyebilir. Ben ortalama bir template ekleyeceğim.

   var virtualKeyboard = {
template: ' <div  id="vkb-js-keyboard"   class="vkb-css-hide"><div class="vkb-css-background vkb-js-close" ></div><div class="vkb-css-keyboard-box" >    <div class="vkb-css-button-box">            <div class="vkb-css-button-line"> <button type="button">1</button> <button type="button">2</button> <button type="button">3</button> <button type="button">4</button> <button type="button">5</button> <button type="button">6</button> <button type="button">7</button> <button type="button">8</button> <button type="button">9</button> <button type="button">0</button>      <button type="button" id="vkb\_8">SİL</button></div>  <div class="vkb-css-button-line"> <button type="button">Q</button> <button type="button">W</button> <button type="button">E</button> <button type="button">R</button> <button type="button">T</button> <button type="button">Y</button> <button type="button">U</button> <button type="button">İ</button> <button type="button">O</button> <button type="button">P</button></div>  <div class="vkb-css-button-line"> <button type="button">A</button> <button type="button">S</button> <button type="button">D</button> <button type="button">F</button> <button type="button">G</button> <button type="button">H</button> <button type="button">J</button> <button type="button">K</button> <button type="button">L</button> </div>  <div class="vkb-css-button-line"> <button type="button">Z</button> <button type="button">X</button> <button type="button">C</button>  <button type="button">Ç</button> <button type="button">V</button> <button type="button">B</button> <button type="button">N</button> <button type="button">M</button></div><div class="vkb-css-button-line"> <button type="button"id="vkb\_close">VAZGEÇ</button> <button type="button" id="vkb\_success">TAMAM</button></div></div></div>'
...
}

Burada template sonrası metodları da ekleyeceğiz.Örneğin butonların her birine tıkladığımızda inputlara yazması gerekli onun için de aşağıdaki metodu kullanacağız. Burada özel olarak tırnak space gibi butonlar için de ekstra butonlar ekleyip classlar verebilirsiniz. Aşağıda switch case işlemini gösterdim. Eğer özel butonlar dışında bir butona tıklarsanız en altta default olarak bulunan “pasteSymbolInPosition” metodu çağırılacak. Tıklanan butonun da içeriği inputa yazılacak.

 cClickSymbolButton: function (e) {           
            return function (e) {        
                e.currentTarget
                switch($(e.currentTarget).attr('id')) {
                      case "vkb\_close":
                        this.keyboard.hide();
                        this.source.val('');
                        break
                    case "vkb\_success":
                        this.source.val(this.source.val());                  
                        break
                    default:
  this.pasteSymbolInPosition($(e.currentTarget).html());
 
                      

                }
            }
        },

Şimdi de ekrana yazdığımız kısmı ekleyelim. Burası nispeten daha karışık bir yer. Ancak yapılanı anlatacağım için çok da karışık gelmeyeceğini düşünüyorum. İlk olarak kod bloğunu aşağı ekleyeyim altında da açıklamasını yaparım.

pasteSymbolInPosition: function (symbol) {
                var selectionStart = (!symbol.length && this.source\[0\].selectionStart === this.source\[0\].selectionEnd && this.source\[0\].selectionStart !== 0) ? this.source\[0\].selectionStart - 1 : this.source\[0\].selectionStart; // 0 1 2 3 4 5 
                var part1 = this.source.val().slice(0, selectionStart); // 0 dan son rakama kadar
                var part2 = this.source.val().slice(this.source\[0\].selectionEnd, this.source.val().length);
                this.source.val(part1+ symbol + part2);
                this.setCursorPosition(selectionStart + symbol.length+1); // cursoru sona gelir 
                this.source.focus();
        }

Burada “selectionStart” dediğimiz kısım bizim harfi nereye ekleyeceğimiz cursor nerede yani. Başı ve sonu ortası gibi yerleri bulmamıza yarayan küçük bir if else bloğu bulunmakta bu selectionStart bize 0,1,2,3… gibi pozisyon bilgileri vermektedir.

part1 ve part2 dediğimiz kısımlar ise bize eğer cursor ortada bir yerde ise işimize yarar. Örnek vermek gerekirse PARİS kelimesini ele alalım

Eğer cursor başta ise part1=”” , part2=kelime uzunluğu kadar yani “PARİS”  
Eğer cursor A’dan sonra ise part1=”PA” part2=”RİS” olacak  
Eğer cursor sonda bulunuyorsa da part1=”PARİS” part2=”” olacaktır.

Yukarıdaki örnekten anlaşılacağı gibi sonuç olarak bize tıkladığımız harfin yerini buluyoruz. Daha sonra da this.source dediğimiz yani inputumuzun value değerini değiştirmiş oluyoruz ve cursor pozisyonunu +1 arttırıyoruz.

En son olarak da init işlemini açıklayacağım

Vkb.prototype.init = function () {
        this.element.addClass(this.config.styleClassParentInput);
        $('#keybd').append(virtualKeyboard.template);
        virtualKeyboard.keyboard = $('#vkb-js-keyboard');
        virtualKeyboard.input = $('#vkb-js-input');
        $('#vkb-js-keyboard button').on('click', $.proxy(virtualKeyboard.clickSumbolButton(this), virtualKeyboard));

        $('<img/>',{
            alt: 'Keyboard',
            src: this.config.srcKeyboardIcon,
            class: this.config.styleClassKeyboardIcon + ' vkb-js-key'
        })
            .insertAfter(this.element)
            .on('click', function(e) {
                virtualKeyboard.show($(e.currentTarget).prev('input'));
                $('#vkb-js-input').val($(e.currentTarget).prev('input').val()).focus();
 
            });
    }

  
Burada en başta “keybd” idsi ile verdiğimiz dive append yani sonuna ekleme yaparak keyboard templatmizi ekliyoruz. Ardından <img> ile bir resim dosyası ekliyoruz ki tıklanıldığında keyboarda açılıp kapansın.

Burada işlemlerimiz şimdilik bu kadar buna ek olarak css bilgilerini de vereceğim linkte bulabilirsiniz. Ancak css bilgilerini kendi keyfinize göre de yapabilirsiniz.

Buraya kadar okuduğunuz için teşekkür ederim umarım faydalı bir yazı olmuştur.

**Github Link :**  
[https://github.com/berkarat/Jquery-Virtural-Keyboard-](https://github.com/berkarat/Jquery-Virtural-Keyboard-)

**Azure Link :**

[https://berkarat93.visualstudio.com/Jquery%20Virtural%20Keyboard](https://berkarat93.visualstudio.com/Jquery%20Virtural%20Keyboard)