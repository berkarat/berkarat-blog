---
title: "TCS3200 Kullanımı"
published: 2018-02-01
description: "TCS3200 en genel renk uzayı olan RGB ( red, green, blue) renk uzayını kullanarak yansıyan yüzeyin rengini bize çıktı olarak veren sensördür. Bu RGB re"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

TCS3200 en genel renk uzayı olan RGB ( red, green, blue) renk uzayını kullanarak yansıyan yüzeyin rengini bize çıktı olarak veren sensördür. Bu RGB renk skalasındaki renkleri bize ayrı ayrı vermesinden yola çıkarak doğada bulunan tüm renkleri bulmak mümkündür. Bu ana renklerin birbiriyle oranlanmasıyla farklı renkleri ortaya çıkarabiliriz.

![TCS3200](/wp-images/2018_02_tcs3200-300x186.jpg)

TCS3200 en çok kullanılan renk sensör kartıdır. Yuvalı ve yuvasız olmak üzere iki çeşidi mevucuttur. Yuvalı olmasının avantajı dış ortamdan gelen ışıklardan minimum seviyede etkilenir ve böylece hassasiyet artmış olur. Bu sayede daha keskin renk algılama işlemi yapabilmektedir. Tamamen mekanik bir durumdur. Sensörün çalışmasıyla veya programlanması ile ilgili değildir.

TCS3200 kartının üzerinde 4 adet led vardır. Bu ledlerin amacı yüzeyi aydınlatmaktır. Bu sayede yüzey renginin algılanması kolaylaştırılması amaçlanmıştır. Ledlerin tam merkezinde bir adet çip bulunur. Çipin içerisinde 4 adet fotodiyot vardır. Bu sayede renklerin algılanması sağlanır.

Kartın üzerinde 4 adet giriş 1 adet de çıkış pini mevcuttur. S1 S2 S3 ve S4 pinleri giriş Out pini ise çıkış pini olarak tanımlıdır.

<table style="height: 197px;" width="602"><tbody><tr><td style="width: 201px; text-align: center;">S2</td><td style="width: 201px; text-align: center;">S3</td><td style="width: 230px; text-align: center;">RENK</td></tr><tr><td style="width: 201px; text-align: center;">LOW</td><td style="width: 201px; text-align: center;">LOW</td><td style="width: 230px; text-align: center;">&nbsp;RED</td></tr><tr><td style="width: 201px; text-align: center;">LOW</td><td style="width: 201px; text-align: center;">HIGH</td><td style="width: 230px; text-align: center;">BLUE</td></tr><tr><td style="width: 201px; text-align: center;">&nbsp;HIGH</td><td style="width: 201px; text-align: center;">LOW</td><td style="width: 230px; text-align: center;">WHİTE</td></tr><tr><td style="width: 201px; text-align: center;">&nbsp;HIGH</td><td style="width: 201px; text-align: center;">HIGH</td><td style="width: 230px; text-align: center;">GREEN</td></tr></tbody></table>

* * *

<table style="height: 197px;" width="602"><tbody><tr><td style="width: 201px; text-align: center;">S0</td><td style="width: 201px; text-align: center;">S1</td><td style="width: 230px; text-align: center;">ÇIKIŞ FREKANSI</td></tr><tr><td style="width: 201px; text-align: center;">LOW</td><td style="width: 201px; text-align: center;">LOW</td><td style="width: 230px; text-align: center;">0</td></tr><tr><td style="width: 201px; text-align: center;">LOW</td><td style="width: 201px; text-align: center;">HIGH</td><td style="width: 230px; text-align: center;">%2</td></tr><tr><td style="width: 201px; text-align: center;">&nbsp;HIGH</td><td style="width: 201px; text-align: center;">LOW</td><td style="width: 230px; text-align: center;">%20</td></tr><tr><td style="width: 201px; text-align: center;">&nbsp;HIGH</td><td style="width: 201px; text-align: center;">HIGH</td><td style="width: 230px; text-align: center;">%100</td></tr></tbody></table>

S1 ve S2 pinlerinden dijital olarak LOW ve HIGH sinyallerini , S3 ve S4 pinlerinden ise 0-255 arasında frekans değerlerini alarak renkleri ayırt edilebilmesi mümkündür.

<table style="width: 694px;"><tbody><tr><td style="width: 93px;"><b>GİRİŞ ADI</b></td><td style="width: 123px;"><strong>INPUT/OUTPUT</strong></td><td style="width: 416px;"><b>AÇIKLAMASI</b></td></tr><tr><td style="width: 93px;">GND</td><td style="width: 123px;">–</td><td style="width: 416px;">Toprak bağlantısının yapıldığı bacaktır</td></tr><tr><td style="width: 93px;">OE</td><td style="width: 123px;">INPUT</td><td style="width: 416px;">Sensörü aktif hale getirmek için kullanılan enable bacağıdır.</td></tr><tr><td style="width: 93px;">OUT</td><td style="width: 123px;">OUTPUT</td><td style="width: 416px;">Çıkış frekansını aldığımız bacaktır.</td></tr><tr><td style="width: 93px;">S0,S1</td><td style="width: 123px;">INPUT</td><td style="width: 416px;">Frekans değerinde renk bilgilerinin işlendiği bacaklardır.</td></tr><tr><td style="width: 93px;">S2,S3</td><td style="width: 123px;">INPUT</td><td style="width: 416px;">Fotodiyotların renk bilgilerini seçtiği bacaklardır.</td></tr><tr><td style="width: 93px;">VCC</td><td style="width: 123px;">–</td><td style="width: 416px;">5v besleme gerilimi</td></tr></tbody></table>

Yukarıdaki tabloda TCS3200 sensör kartının bağlantı pinlerinin nereye bağlanacağı ve hangi işlevi yaptıklarının açıklaması vardır.

Bu sensör kartının bağlantısında ise arduino idesinde örnek olarak aşağıdaki kod bloğu ile setup yani bacakların tanımlaması yapılmıştır.

void setup() {
  pinMode(S3, OUTPUT);           //TCS3200 sensör giriş pini
  pinMode(S2, OUTPUT);           //TCS3200 sensör giriş pini
  pinMode(outpin, INPUT);       // TCS3200 sensör giriş pini
}

# Örnek Renk Algılama Kodu

digitalWrite(S2, LOW);
digitalWrite(S3, LOW);
r = pulseIn(outpin, LOW);
r = plusewidth / 400. - 1;
r = (255 - r);

Bu kod parçacığında r değişkeninin değeri 0 ile 255 arasında bir değer olacak ve bize kırmızı rengi verecektir. Benzer şekilde diğer ana renkleri(RGB) de bulmak mümkündür.

![renk kodları](/wp-images/2018_02_rgb-300x150.png)

Peki bu üç ana rengi bulduktan sonra aldığımız değerlere göre hangi rengin ne olduğunu bulmak için basit bir kod bloğu ile artık o rengin ne olduğunu ekranda görebiliriz.

if ( r < g && r < b && r > w && g > b && g > w && b > w && r < 550) {
   Serial.println("\*! RED \*!");
 }

Bu kod bloğunda sensörden gelen bilgilere göre birbirleri ile kıyaslayarak istediğimiz rengi bulabiliriz.

Böylece bu sensörü kullanarak bir çok alanda çalışmalarımıza ek veya temel olarak kullanmak mümkündür. Örneğin bir renk ayırma projesi yapmak istersek bu sensörü kullanmak zorundayız. Diyelim ki kırmızı renkleri sağ tarafa, yeşil renkleri sol tarafa, mavi renkleri ise orta tarafa koymak istiyoruz. İşte burada TCS3200 sensör kartı sayesinde renkleri algılayıp eğer gelen ürün seçilen renkle eşleşiyorsa uygun komutlarla yönlendirip sınıflandırma yapmak mümkündür.