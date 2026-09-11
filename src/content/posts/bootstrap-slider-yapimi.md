---
title: "Bootstrap Slider Yapımı"
published: 2019-02-28
description: "_📌 Güncelleme (Ağustos 2026): Carousel mantığı korunuyor; Bootstrap 5’te jQuery zorunluluğunun kalkması ve class adları güncel notlarla belirtildi._"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![Bootstrap Logo - Bootstrap Nedir ? Nasıl Eklenir ?   Uygulama Örnekleri](/wp-images/2019_02_Bootstrap-Logo.png "Bootstrap-Logo")](/wp-images/2019_02_Bootstrap-Logo.png)

_📌 Güncelleme (Ağustos 2026): Carousel mantığı korunuyor; Bootstrap 5’te jQuery zorunluluğunun kalkması ve class adları güncel notlarla belirtildi._

Merhabalar bu yazımızda bootstrap örneklerine devam etmekteyiz. Bu sefer slider yapımından bahsedeceğim. Genellikle sitelerin ana sayfasında olan kayan görüntüler olmaktadır. Bunu yapmak için bootstrap carouselden yararlanacağız. Böylece kendi bootstrap slider ımızı yapacağız. Bundan önce eğer JavaScript gibi konulara hakim değilseniz [bu yazıyı](https://blog.berkarat.com/jquery-giris/) okumanızı öneririm.

Bunun için öncelikle bootstrap linklerini <head> tagleri arasına ekliyoruz. Bu kütüphaneler  bize sliderda kullanacağımız  jQuery işlemleri için gereklidir. Bootstrap 4 kullanıyorsanız jQuery gerekir; Bootstrap 5’te carousel bileşeni Bootstrap’ın kendi JavaScript paketiyle jQuery olmadan da çalışır.

Ardından bir div oluşturuyoruz bu div içerisine slider eklemesini yapacağız. Bu divin classına “carousel slide” adını veriyoruz. Çünkü bootstrap içerisinde tanımlı class budur. Ardından Indıcators tanımlaması yapıyoruz. Bu indicatorler slider altında duran hangi sayfada olduğumuzu belirten küçük itemlerdir .Bunlar sayesinde hangi sayfada olduğumuzu belirleyebilir ya da istediğimiz sayfaya yönlendirme yapabiliriz.

<ul class="carousel-indicators">
             <li class="item1 active"></li>
             <li class="item2"></li>
             <li class="item3"></li>
         </ul>

Bu işlemi yaptıktan sonra slideshow kısmına geçiyoruz. Burada da div classını carousel-inner olarak ana bir div belirliyoruz. Bunun altına carousel-item olarak image ekliyoruz. Bunları yaparak sliderımızın bir sayfasının içeriğini ekliyoruz. İmage boyutunu önceden belirlememiz bizim için sayfa tasarımının image değiştikçe değişmesini engelleyecektir.

 <div class="carousel-inner">
    <div class="carousel-item active">
        <img src="1.jpg" alt="Los Angeles" width="1100" height="500">
    </div>
    <div class="carousel-item">
        <img src="2.jpg" alt="Chicago" width="1100" height="500">
    </div>
    <div class="carousel-item">
        <img src="3.jpg" alt="New York" width="1100" height="500">
    </div>
</div>

Ardındın yönlendirme işlemini yapmamız için ileri geri iconlarını eklemek gerekli bunlar aslında icon görünümlük linklerdir. Bu yüzden <a> tagi ile iki adet link kodu yazıyoruz. Bu linklerin classları ise  “carousel-control-” olarak belirlidir. Prev ve next olarak iki tane vardır. Anlaşılacağı üzere ileri ve geri komutlarıdır.

Buraya kadar olan işlemler slider için gereken görsel kısımlardı. Gerçekten bootstrap slider olması için bu işlemin hareket etmesi gerektir. Elbette bu işlemler için jquery metodları yazmak gerekir. Bunları aşağıda basamak basamak olarak açıklayacağım.

Slider oluşturmak için   $(“#myCarousel”).carousel(); komutunu <script> tagleri arasına yazmalıyız.

![bootstrap slider](/wp-images/2019_02_2019-02-24_16-43-03.png)

## Bootstrap Slider Özellikleri

**Interval** özelliği sayesinde belirtilen süre aralıklarında değişimi gösterebiliriz. Bu sayede süre ayarı yapmak mümkündür.

$("#myCarousel").carousel({ interval: 2000 });

* * *

**İleri ve geri** özelliği slider için diğer özellikler ise prev ve next komutlarıdır. Yukarıda bahsettiğim şekilde oluşturduktan sonra aşağıdaki jquery kodları sayesinde hareket ettirebiliriz.

$(".carousel-control-prev").click(function () {
     $("#myCarousel").carousel("prev");
 });
 $(".carousel-control-next").click(function () {
     $("#myCarousel").carousel("next");
 });

* * *

**İndex seçme özelliği** ise  indicator üzerine tıkladığımızda belirlediğimiz sayfaya yönlendirme işlemini yapmaktadır.

$(".item1").click(function () {
    $("#myCarousel").carousel(0);
});
$(".item2").click(function () {
    $("#myCarousel").carousel(1);
});
$(".item3").click(function () {
    $("#myCarousel").carousel(2);
});

* * *

**Cycle ve pause** özellikleri ile sliderın durma ve döngüye devam etmesi seçeneklerini kontrol edebilmekteyiz.

$("#myBtn").click(function () {
    $("#myCarousel").carousel("cycle");
});             
$("#myBtn2").click(function () {
    $("#myCarousel").carousel("pause");
});

Konuyla ilgili örnek html dosyasını buradan ulaşabilirsiniz.

[https://github.com/berkarat/Html-css-javascript](https://github.com/berkarat/Html-css-javascript)