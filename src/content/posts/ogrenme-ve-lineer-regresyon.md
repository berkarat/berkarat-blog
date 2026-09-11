---
title: "Makine Öğrenmesi Öğrenme ve Lineer Regresyon"
published: 2018-02-09
description: "Merhabalar bu yazıda  [Makine Öğrenmesi Giriş](https://blog.berkarat.com/makine-ogrenmesi-giris/) isimli sayfada bahsettiğimiz konuların devamı niteli"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![machine learning](/wp-images/2018_02_machine_learning-min-696x492.jpg "makine öğrenmesi")](/wp-images/2018_02_machine_learning-min.jpg)

Merhabalar bu yazıda  [Makine Öğrenmesi Giriş](https://blog.berkarat.com/makine-ogrenmesi-giris/) isimli sayfada bahsettiğimiz konuların devamı niteliğinde bir yazıyla devam edeceğim. Lineer regresyon ve öğrenme yöntemlerinin neler olduğuna değinip avantaj ve dezavantajlarından bahsedeceğim.

# **Makine Öğrenmesi Öğrenme Süreci**

Tanım-1 Verileri ve algoritmaları kullanarak karar modeli oluşturma sürecine **eğitim**, sistemin istenilen başarıyı verecek hale getirilmesi durumuna da **öğrenme** denir.

Tanım-2: Eğitim verileri ve algoritmaları kullanılarak gerçekleştirilen işlemlere **eğitim**, modelin ortaya çıkmasıyla sonuçlanan duruma **öğrenme** denir.

Karar modeli oluşturmak için genel olarak iki öğrenme yöntemi vardır.

-   Denetimli öğrenme   (Supervised learning)
-   Denetimsiz öğrenme (Unsupervised learning)

## **Denetimli Öğrenme (Supervised Learning)**

Bir durumu etkileyen parametrelerin ve bu duruma bağlı olarak durumun nasıl sonuçlandığı bilgisini öğrenen sisteme aktarıp karar modeli oluşturmasını sağlamak bu yöntemin temel felsefesidir. Sınıflar önceden belirlenmiştir.

![denetimli öğrenme](/wp-images/2018_02_denetimli-öğrenme-min-1024x354.png)

## Denetimli Öğrenmenin Özellikleri

-   En yaygın uygulanan öğrenme yöntemidir.
-   Olayların,parametrelerin çıktıları eğitim verisinde bulunur.
-   Var olan olayların örnekleri kullanılarak makine öğrenmesi sistemi tarafından en genel karar modeli kurulmaya çalışılır. Tüm sürüm uzayı temsil eder.
-   Bu öğrenme yönteminde temel amaç girdileri ve çıktıları belli olan geçmiş olay örneklerini kullanarak gelecek durumlar için sonucu tahmin etmektir.

## **Denetimsiz Öğrenme (Unsupervised Learning)**

Olayların,durumların örnekler önceden bilinir ama onlara karşılık gelen sonuçlar yani sınıflar önceden bilinmez.

Denetimsiz öğrenmede temel amaç eldeki verilerden ortaya bir model veya örüntü( pattern) çıkarmak için sistemi algoritmalarla eğitmektir.

Eldeki verinin yapısını belirlemek üzere sınıflara ayırma işlemine **kümeleme(clustering)**, ortaya çıkan sınıflara **küme** denir.

![kümeleme](/wp-images/2018_02_kümeleme-300x201.png)

Kümeleme verilerin yakınlık uzaklık benzerlik gibi ölçütlere göre analiz edilerek sınıflara ayrılması işlemidir.

![denetimsiz öğrenme](/wp-images/2018_02_denetimsiz-öğrenme-min.png)

## Denetimsiz öğrenmenin özellikleri

-   Var olan girdilere karşı çıktılar yoktur ( sınıflar önceden belli değildir. )
-   Algoritmaların verilerde var olan örüntüyü bulması beklenir.
-   Verilerin kümeleme yöntemiyle analizi sık yapılır.
-   Burada amaç veri kaç gruba ayrılabilir, hangi parametre belirleyicidir vb. gibi sorulara cevap bulmaktır.
-   Örneğin bir marketin kaç çeşit müşteri grubu olduğunu öğrenmek istemesi problemi bu yöntemle çözülebilir. Bu sayede günlük indirimler yapılabilir. Pazar günleri sabahları kahvaltı yapan insan sayısı daha çoktur ve süt ürünlerinde indirime gidilmesi gibi örnekler çoğaltılabilir.

# **Lineer Regresyon(Linear Regression)**

**Regresyon**: iki veya daha fazla değişken arasındaki ilişkiye denir. Bu ilişkinin düzeyini, kapsamını ölçme işine de regresyon analizi denir.

Parametreler arasındaki ilişkiyi fonksiyon olarak elde etmek gerekir. Parametreler birbirinden bağımlı veya bağımsız olabilir.Lineer regresyonun anacı parametreler arasındaki ilişki fonksiyonunu elde etmektir. En basit makine öğrenme modelidir. Temel felsefe neden ve sonuç arasında lineer ilişki olup olmadığını belirlemektir.

![lineer regresyon](/wp-images/2018_02_qq-min-300x198.jpg)

Öğrenme sürecinde uygun modelin oluşturulması demek eğitim kümesini kullanarak hipotez fonksiyona en uygun parametrelerin seçilmesi demektir. Önceden var olan veriler hipotezdeki uygun parametreleri seçmemizi ve gelecekte farklı X girdilerine karşılık tahmin yapabilmemizi sağlayacaktır. Hipotez fonksiyonu bir ya da birden fazla parametreye bağlı olabilir.

Lineer modeller ilişkisel yeni neden sonuç modellerdir. Belirli neden parametrelerinin listesi(x1,x2…) için bir sonuç yanı Y tahmin edilmeye çalışılır. Aralarında lineer ilişki bulunan durumları analiz etmek bu modelle mümkündür.

## Lineer Modelin Avantajları

-   Teorisi çok iyi geliştirilmiştir, özellikleri ve davranışları iyi bilinir.
-   Parametrelerin tahmini ve problemlere göre geliştirilmesi kolaydır.
-   Çok geniş ve çeşitli ilişkiler ifade edilebilir.
-   Spesifik veriler için tahmin problemi büyük olasılıkla çözümlenebilir.
-   Yüz binlerce parametre ve faktör içeren lineer modeller bilgisayar ile kurmak mümkündür.
-   Lineer olmayan parametreler geçici değişkenler tanımlanarak standart bir şekile dönüştürülür.
-   Genişletilmiş veri kümesinde ilişki tespiti için lineer model kullanılabilir.
-   Modelde lineer olmayan parametreler varsa bu parametreler değişkenlerden hesaplanıp veri kümesine eklenmelidir.
-   Lineer modelinde sınıflandırma probleminde doğrusal bir sınıf sınırı oluşturulur.