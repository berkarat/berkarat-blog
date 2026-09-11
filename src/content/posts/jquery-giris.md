---
title: "Jquery İşlemleri – Giriş"
published: 2019-02-23
description: "Merhabalar önceki yazımda bahsettiğim [web programlama genel bilgiler](https://blog.berkarat.com/web-programlama-genel-bilgiler/) konusunda bu seferki"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![jquery example](/wp-images/2019_02_jquery.png "jquery")](/wp-images/2019_02_jquery.png)

Merhabalar önceki yazımda bahsettiğim [web programlama genel bilgiler](https://blog.berkarat.com/web-programlama-genel-bilgiler/) konusunda bu seferki yazımızda Jquery nedir ne değildir gibi konulara değineceğim. Bunun dışında nasıl kullanıldığını neler gerektiği gibi konulara değinip örnek uygulamalar yapacağız.

## Jquery Nedir ?

Aslında Javascriptin daha hızlı ve kısa bir şekilde yazılması için geliştirilen bir tekniktir. Altyapı olarak Javascript kullansa da bunu kullanmamız için kendi kütüphanesini referans etmemiz gerekmektedir. Bu kütüphaneyi kendi sitesinden indirip html kodumuza referans edebiliriz. Bu bize localde çalışma olanağı verecektir. Genel yaygın kullanımı bir link üzerinden bu dosyalara ulaşmaktır.

[https://jquery.com/download/](https://jquery.com/download/) bu link üzerinden kütüphanesini indirebilirsiniz.

<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
</head>

Yukarıdaki gibi referans edilir. Tıpkı javascript deki gibi <script> tagleri arasına yazılarak kullanılır.

## Jquery Kullanımı ve Kütüphane Ekleme

Eğer javascript altyapınız var ise jqueryi anlamanız çok kısa bir zaman alacaktır. Ancak hiç javascript bilmiyorsanız jqueryi anlamak oldukça zor olacaktır. Genel yapıp seçici ve fonksiyon olarak iki bölümden oluşur. Tüm jquery kodları $ işareti ile başlamaktadır. Genel yapı aşağıdaki gibidir. İki bölümden oluşur.

$(Seçici).fonksiyon();

Basit bir örnek vererek başlarsak javascript de “window.onload” fonksiyonunun jquery karşılığı şudur  -> $(window).load(); Burada seçici kısım window yani seçtiğimiz bölüme dair fonksiyonlara yön vermekteyiz window yüklendiği zaman.

Diğer örneklerle açıklarsak sayesinde animasyon olarak görüntüleme seçenekleri artmıştır. Örneğin fade efektinden bahsedeceğim. Bu sayede belirlediğimiz bir nesneyi bir alanı açılır kapanır bir şekle sokmamıza olanak sağlıyor. Bu sayede açılır kapanır menüler yapmak mümkündür. Bunun dışında bir süre veya slow gibi parametreler alabilmektedir.

<script>
    function Fadein() {
        $("#paragraph2").fadeIn();
        //     $("#paragraph2").fadeIn("slow");
        $("#paragraph2").fadeIn(3000);
    }
    function Fadeout() {
        // $("#paragraph2").fadeOut();
        // $("#paragraph2").fadeOut("slow");
        $("#paragraph2").fadeOut(3000);
    }
</script>

Bir diğer değineceğim slideup, slidedown ve toggle fonksiyonları. Bu fonksiyonlar genelde bir alanın açılıp kapanması için kullanılır. Adlarından da anlaşılacağı gibi slideup kapanma slidedown açılma anlamına gelir. İkisini bir arada yapmak için toggle fonksiyonunu kullanıyoruz. Tıpkı fade gibi bu da süre gibi parametreler alabilmektedir.

## Jquery Chaining

Bu kütüphanin diğerlerinden ayrılan özellik bu özellikleri zincirleme olarak yapabilmek.  Yani ilk önce bir paragrafın görüntülenmesini ardından renginin değişmesi sonrasında da aşağı doğru kayması gibi işlemleri sırası ile yaptırabilmek avantaj sağlamaktadır. Üstelik bu işlemi kolay ve sade bir biçimde yapmak mümkündür.

<script>
    $(document).ready(function () {
        $("#button2").click(function () {
            $("#button2").css("color", "red").text("THANK YOU !").css("font-size", "40px").slideUp(4000).slideDown(4000);
        });
    });
</script>

Bu örnekte butona tıklandığı zaman butona dair tüm özellikleri arka arkaya kullanabilmek mümkündür. Bu sayede kolayca işlem yapabilmekteyiz.

Bu tarz web işlemlerine diğer yazılarda devam edeceğiz.