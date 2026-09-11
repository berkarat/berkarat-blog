---
title: "Jquery Json Parse İşlemi ve Örnek Uygulama"
published: 2019-03-01
description: "Merhabalar bu yazıda Jquery işlemlerinden Json verileri okuma işlemi yapacağız. Bu yazı [Jquery Giriş](https://blog.berkarat.com/jquery-giris/) yazısı"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![jquery example](/wp-images/2019_02_jquery.png "jquery")](/wp-images/2019_02_jquery.png)

Merhabalar bu yazıda Jquery işlemlerinden Json verileri okuma işlemi yapacağız. Bu yazı [Jquery Giriş](https://blog.berkarat.com/jquery-giris/) yazısının devamıdır. Bu yüzden öncelikle bu yazıdan yararlanmak gerekir. Konumuz olan json ile veri okumayı bir örnek üzerinden anlatacağım. Örneğin bir sayfanın dilini değiştirme işleminden bahsedeceğim bunun için öncelikle bir format oluşturmak gerekir. 4 adet dil seçeneğimiz olsun ve bunlara tıkladığımızda sayfaların dilleri değişsin istiyoruz. Bu işlemi yapmak için jquery kütüphanesinden jquery json parse json fonksiyonunu kullanacağız.

İlk önce yapmamız gereken işlem bir adet json dosyası oluşturmak bunun için json dosyasını html  içerisine de gömebiliriz. Bunun için <script> tagleri arasında bir var tanımılıyoruz ve json olarak metni yazıyoruz ardından json dosya okuma işlemini gerçekleştiriyoruz.

{
  "mainpage": \[{
      "description": "Merhaba bu yazı berkarat.com tarafından yazılmıştır. İletişim için aşağıdaki maile mesaj gönderebilirsiniz. Teşekkürler ",
      "btnsendmessage": "Mesaj Gönder"
    },
    {
      "description": "Hello this post was written by berkarat.com. You can send a message to the contact below. Thanks ",
      "btnsendmessage": "Send Message"
    },
    {
      "description": "Hola este post fue escrito por berkarat.com. Puede enviar un mensaje al contacto de abajo. gracias",
      "btnsendmessage": "Enviar mensaje"
    },
    {
      "description": "مرحبا هذه المشاركة كتبت بواسطة berkarat.com. يمكنك إرسال رسالة إلى جهة الاتصال أدناه. شكر",
      "btnsendmessage": "ارسل رسالة"
    }
  \]
}

# Jquery Json Parse İşlemi

Yukarıdaki json değişkeninden json parse işlemini uygulayarak bir obje oluşturuyoruz. Javascript objeye yönelik bir dil olmasının avantajını da burada görmüş oluyoruz. Yazacağımız fonksiyonu dillere göre ayarlıyoruz. Ardından dildeki değişimi görüyoruz. Burada asıl işlemi yapan jquery json parse metodu yapmaktadır.

var obj = jQuery.parseJSON(json);
 function setlang(id) {
     selected\_language = id;
     $("#description").text(obj.mainpage\[id\].description);
     $("#btnsendmessage").text(obj.mainpage\[id\].btnsendmessage);
 }

Html içerisinden json okuma işlemi oldukça basit ancak bir json dosyasından okuma işlemi için bazı gerekli ayarlamalar yapmamız gerekmektedir. Ben uygulamaları chrome üzerinden gerçekleştirdiğim için chrome için bazı izinleri gerçekleştirmek gereklidir. Eğer bu izinleri yapmamamız durumunda json dosyasını okuyamayacağız ve safyayı incele dediğimizde aşağıdaki hata ile karşılacağız.

var obj = JSON.parse($.getJSON({'url': "./text.json", 'async': false}).responseText);
function setlang(id) {
        selected\_language = id;
        $("#description").text(obj.mainpage\[id\].description);
        $("#btnsendmessage").text(obj.mainpage\[id\].btnsendmessage);
    }

![Jquery Example - Jquery Json Parse İşlemi ve Örnek Uygulama](/wp-images/2019_02_jquery-example.png)

## CORS Policy Hatası Çözümü

jquery.js:10254 Access to XMLHttpRequest at ‘file:///C:/Users/Berk/Desktop/text.json’ from origin ‘null’ has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https. 

![Chrome Allow - Jquery Json Parse İşlemi ve Örnek Uygulama](/wp-images/2019_02_chrome-allow.png)

Ancak bu hatanın çözümü ise olduça basit Chrome izinleri için Program Files klasörünün altında chrome’un dosya yolunu alıyoruz. Cmd yani komut satırını açıyoruz aşağıdaki texti kendi dosya yolumuzu seçerek yapıştırıyoruz ve bir çözüm oluşturuyoruz. Bunun için eğer chreome açık ise onu kapatmamız gerekmektedir.

"c:Program Files (x86)GoogleChromeApplicationchrome.exe" --allow-file-access-from-files

Ancak bu tek seferlik çözüm bunun sebebi chrome localden bir dosya almamıza geçici süreyle izin verecektir. Bunu engellemenin yolu bir web server kurup dosyalarımızı onun üzerinden çağırmayla kalıcı olarak çözülecektir. Bu web server kurlumu için [Windows IIS Kurulumu (Resimli Anlatım)](https://blog.berkarat.com/windows-iis-kurulumu/) yazısından yapabilirsiniz. Böylece lolcahost: üzerinden çağırdığımız html dosyalarda bu sorun ortadan kalkacaktır.

Bu dosyadan örnek html sayfasına ve json dosyaya ulaşabilirsiniz.

[https://github.com/berkarat/Html-css-javascript](https://github.com/berkarat/Html-css-javascript)