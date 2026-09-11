---
title: "Robotik Kol ile Ayrım Yapan Bant Sistemi Projesi – 2"
published: 2018-05-27
description: "Projemizin birinci adımında sorunun ne olduğu nasıl bir hedefimiz olduğunu saptadık. Bu soruna çözüm olarak robotik kolların kullanılması böylece zama"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

Projemizin birinci adımında sorunun ne olduğu nasıl bir hedefimiz olduğunu saptadık. Bu soruna çözüm olarak robotik kolların kullanılması böylece zaman ve iş gücünden tasarruf edileceğini ve daha hızlı bir üretimin gerçekleştiğinden bahsetmiştik. Bu yazımızda devam niteliğinde olup malzemelerin neler olduğu  nasıl kullanıldığı gibi konulara değineceğim.

# Konveyör Bant Sistemi

Bu projede ürünleri bir noktadan diğer noktaya taşıması ardından robotik kolun alabileceği bir konuma getirmesi için kullanılmıştır.

Konveyör bantlar çeşitli malzemelerin bir yerden başka bir yere taşımada kullanılan kauçuk kaplamalı veya bezli olarak üretilen taşıma ünitesidir. Kullanılacak ortamlara göre farklı malzemelerden üretilmeleri mümkündür. Kullanım alanları seri üretimin olduğu hemen her yere uygun şekilde tasarlanabilmektedir. Genel olarak başta demir-çelik fabrikaları olmak üzere, maden ocakları gibi üretimin önemli olduğu yerlerde kullanılmaktadır.

Yapı olarak 2 ana bölümden oluşmaktadır. Birincisi “Karkas” denilen kısım ve “Kauçuk” denilen kısımlardır. Karkas kısmı yükü çeken kısımdır. Kauçuk kısım ise bandın genel görünen kısmıdır ve ürünle doğrudan temas halindedir.

### Bu bantlar tiplerine göre 3 ana tiptedir

-   Karkas tipine göre
-   Kaplamasına göre
-   Tırmanma açısına göre

![Konveyör Bant - Robotik Kol ile Ayrım Yapan Bant Sistemi Projesi - 2](/wp-images/2018_05_konveyör-bant.jpg)

# Malzeme Listesi ve Tanıtımı

<table style="width: 580px;" align="center"><tbody><tr><td style="width: 30px; text-align: center;"><strong>No</strong></td><td style="width: 413px; text-align: center;"><strong>Malzeme</strong></td><td style="width: 46px; text-align: center;"><strong>Adet</strong></td></tr><tr><td style="width: 30px; text-align: center;">1</td><td style="width: 413px; text-align: left;">Arduino Uno R3</td><td style="width: 46px; text-align: center;">1</td></tr><tr><td style="width: 30px; text-align: center;">2</td><td style="width: 413px; text-align: left;">Robotik Kol</td><td style="width: 46px; text-align: center;">1</td></tr><tr><td style="width: 30px; text-align: center;">3</td><td style="width: 413px; text-align: left;">Konveyör Bant</td><td style="width: 46px; text-align: center;">1</td></tr><tr><td style="width: 30px; text-align: center;">4</td><td style="width: 413px; text-align: left;">Servo Motor (180° açılı)</td><td style="width: 46px; text-align: center;">4</td></tr><tr><td style="width: 30px; text-align: center;">5</td><td style="width: 413px; text-align: left;">IR Kızılötesi Sensör</td><td style="width: 46px; text-align: center;">2</td></tr><tr><td style="width: 30px; text-align: center;">6</td><td style="width: 413px; text-align: left;">L298-N Motor Sürücü Kart</td><td style="width: 46px; text-align: center;">1</td></tr><tr><td style="width: 30px; text-align: center;">7</td><td style="width: 413px; text-align: left;">TCS3200 Renk Sensörü</td><td style="width: 46px; text-align: center;">1</td></tr><tr><td style="width: 30px; text-align: center;">8</td><td style="width: 413px; text-align: left;">6V 250 Rpm Redüktörlü Motor</td><td style="width: 46px; text-align: center;">1</td></tr><tr><td style="width: 30px; text-align: center;">9</td><td style="width: 413px; text-align: left;">TP 4056 Şarj Devresi</td><td style="width: 46px; text-align: center;">1</td></tr><tr><td style="width: 30px; text-align: center;">10</td><td style="width: 413px;">Pil yuvası (18650 uyumlu)</td><td style="width: 46px; text-align: center;">1</td></tr><tr><td style="width: 30px; text-align: center;">11</td><td style="width: 413px;">18650 Lityum İyon Pil ( 3.7V)</td><td style="width: 46px; text-align: center;">2</td></tr><tr><td style="width: 30px; text-align: center;">12</td><td style="width: 413px;">Rulman</td><td style="width: 46px; text-align: center;">2</td></tr></tbody></table>

## Arduino Uno R3

Arduino, sensörler yardımıyla çevresiyle etkileşime geçebilen, bu durumları kontrol edebileceğimiz açık kaynaklı bir geliştirme platformudur. Açık kaynak kütüphanesi olduğundan kolaylıkla programlanabilmektedir. Daha önceki yazılarımızda bu platform hakkında detaylı olarak bilgi vermiştik. [Arduino Nedir?](https://blog.berkarat.com/arduino-ve-cesitleri/)

## TCS3200 Renk Sensörü Kartı

TCS3200 renk algılama sensörüdür. Projemizde gelen ürünlerin rengini algılamakta kullanılmıştır. Bu sensör kartı hakkında detaylı bir yazı yazmıştım. Bu yüzden [TCS3200 Kullanımı](https://blog.berkarat.com/tcs3200-kullanimi/)  yazısını okumanızı öneririm.

## Robotik Kol

Projemizde 4 yönde ( yukarı-aşağı, öne-arkaya, sağa-sola, açma-kapatma) hareket edebilen sert plastik materyalden yapılmış, omuz, kol, dirsek ve el olmak üzere 4 ana parçadan meydana getirilen bir robot kolu kullandık. Arduino üzerinden gelen bilgiler doğrultusunda ürünlerin nereye konulacağını belirler ve ona uygun şekilde ürünü istenilen yere koyar. Yukarıda bahsedilen eklemli robot sınıfına girmektedir. Hareket gücünü üzerinde bulunan 4 adet servo motordan almaktadır. Bu sayede açı değerleri ile ayarlama yapılabilmektedir. Dikey ve yatay yönde çalışabilmektedir.

## IR Kızılötesi Sensör

IR kızılötesi engel algılama sensörlerinin çalışma mantığı verici sinyali gönderir ve gönderilen sinyal yansıdığı zaman alıcı bu sinyali alır ve devreyi tamamlamış olur. Bu projedek konveyör bantı durdurmak, renk sensörü ve robotik kolu tetikleme görevi vardır. Projemizde 2 tane IR sensör bulunduğundan gelen ürünün boyutunun da belirlenmesi işlemi sağlanmaktadır. Sensör üzerinde bulunan ayarlama bölmesi üzerinden de mesafe ayarı yaparak konumlandırma yapılabilir.

![Ir Sensor - Robotik Kol ile Ayrım Yapan Bant Sistemi Projesi - 2](/wp-images/2018_05_IR-Sensor.jpg)

## Servo Motor (180 ° açılı)

Servo motorlar, robot teknolojilerinde en çok kullanılan motor çeşididir. En çok kullanım alanı RC ( Radio Control) uygulamalarıdır. İstenilen pozisyonu alması ve yeni bir komut girilene kadar o pozisyonu değiştirilmemesi gibi özellikleri vardır. Çalışma mekanizması iki parçadan oluşur. İçerisinde bir tane DC motor ve dişli takımı bulundurmaktadır.

![Servo Motor Min - Robotik Kol ile Ayrım Yapan Bant Sistemi Projesi - 2](/wp-images/2018_05_Servo-Motor-min.jpg)

Dc motor dişlilerin hareket etmesini sağlar. Bu dişliler de hareket doğrultusunda yüksek tork üreterek servonun ucuna bağlanan nesneyi döndürebilmektedir. Açı verilerek kontrol edilmektedir. Bu projede robot kolunun hareket etmesini sağlamaktadır, dönüş açısı genellikle 180 derecedir fakat bazı özel servo motorlar 360 derece dönüş açısına da sahiptirler. 6V çalışma gerilimine sahiptir.

Arduino üzerinde PWM (Pulse Width Modulation) pinlerin üzerinden kontrol edilmektedir. PWM pinlerinden gelen sinyallere göre koordinatları belirlenir ve en az hatayla hareket ederler

## L298N Motor Sürücü Kartı

L298-N motor sürücü devresi 24V’a kadar motorları sürmek için tasarlanan sürücü kartı iki kanallıdır. İki adet motor sürebilme imkanı sunmakta ve kanal başına 2 ampere kadar akım verme kabiliyetine sahiptir. Biz bu projemizde bu kartı konveyör bantın hareketini sağlayan redüktörlü motoru sürmesi için kullandık. Üzerinde bulunan enable pinleri sayesinde motor hız kontrolüne de imkan sağlamaktadır. Bu sebeple konveyör bantımızın hız ayarını da kontrol etmek mümkün hale gelmektedir.

[L298-N Motor Sürücü Kullanımı](https://blog.berkarat.com/l298-n-motor-surucu-kullanimi/)  yazımızda daha detaylı anlatımı mevcuttur.

## 6V 250 Rpm Redüktörlü Motor

Motorlar elektrik enerjisini mekanik enerjiye çeviren elemanlarıdır.Bu projede konveyör bantın hareketini sağlamaktadır. Redüktörlü olmasının avantajı ise daha az amper çekerek daha çok tork üretebilmesidir. Bunu da içinde bulundurduğu dişliler sayesinde yapmaktadır. Bu sebeple tercih edilmiştir. Çalışma gerilimi 6V’dur. Projenin durumuna göre daha güçlü motorlar da kullanılabilmek mümkündür.

![Redüktörlü Motor Min 1 - Robotik Kol ile Ayrım Yapan Bant Sistemi Projesi - 2](/wp-images/2018_05_redüktörlü-motor-min-1-300x300.jpg)

## 18650  3.7 V Lityum İyon Pil

18650 pil  bu projede tekrar şarj edilebilme ve normal pillere göre daha yüksek akım verebilmesi sebebiyle tercih edilmiştir. 3.7V 25Ampere kadar bir enerji sağlayabilmektedir. Maksimum 4.2 V enerji verebilmektedir. Kullanım alanları olarak en başta laptopların pilleri birden fazla 18650 pilin bir araya getirilmesiyle tasarlanabilmektedir.

![18650 Min - Robotik Kol ile Ayrım Yapan Bant Sistemi Projesi - 2](/wp-images/2018_05_18650-min-300x300.jpg)

18650 sayısı da pilin geometrik şeklini ifade etmektedir. 18mm çapında, 65mm uzunluğunda ve 0 ise pilin silindir olduğunu belirtmekte kullanılır.

## TP4056

Lityum iyon pillerin tekrar kullanılabilmesi için bir şarj ünitesine ihtiyacı vardır. TP4056 entegresi sayesinde pillerimizi tekrar tekrar kullanabilme imkanımız vardır. 5V’luk bir kaynakla besleyerek bu şarj devresi sayesinde pillerimizi tekrar şarj edebilmekteyiz.

## Rulman

Rulmanların asıl işlevi verilmesi gereken hareketin mümkün olan en az sürtünmeyle yani güçten en az ödün verilerek iletimini sağlamaktır. İç ve dış kabuk arasına yerleştirilmiş bilyeler sayesinde sürtünme en aza indirgenmiştir.

![Rulman Min - Robotik Kol ile Ayrım Yapan Bant Sistemi Projesi - 2](/wp-images/2018_05_rulman-min-300x211.jpg)

Bu projede ise karkasların içlerine geçirilmiş redüktörlü motorla bağlantısı yapılmıştır. Bu sayede en az şekilde motoru ve motor sürücü kartını zorlayacak şekilde tasarlanmıştır. Bu sayede konveyör bantın dönüşünde bir aksama meydana gelmeden kusursuz bir şekilde hareket sağlanmış olacaktır.