---
title: "Makine Öğrenmesi Model Performans Değerlendirme Yöntemleri"
published: 2018-02-12
description: "Merhabalar bu yazımızda da makine öğrenmesi kurallarına devam ediyoruz. Daha önce belirttiğim [Makine Öğrenmesi Model Oluşturma](https://blog.berkarat"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![Makine öğrenmesi](/wp-images/2018_02_1-11.png "Makine öğrenmesi")](/wp-images/2018_02_1-11.png)

Merhabalar bu yazımızda da makine öğrenmesi kurallarına devam ediyoruz. Daha önce belirttiğim [Makine Öğrenmesi Model Oluşturma](https://blog.berkarat.com/makine-ogrenmesi-oznitelikler/) yazısında modelimizi taslak model olarak oluşturmuştum. Ancak bu adı üzerinde olduğu gibi taslak model bizim bunu belli yöntemler ve algoritmalarla düzenlememiz ve en uygun sonucu alana kadar denememiz gerektiğini yazmıştım. Şimdi bu yöntemlerin neler olduğundan bahsedeceğim.

Bir modelin performansı kullanılan öğrenme algoritmasının yanı sıra sınıf dağılımı hatalı sınıflandırma ya da eğitim ve test kümelerinin büyüklüğüne bağlı olabilir. Model performans değerlendirme yöntemleri mevcut veri setinde örneklemenin nasıl yapılacağını gösterir. Hatırlatma olarak Model Performans Değerlendirme yöntemleri nelerdi,

1.  Hold Out
2.  Tekrarlı Hold Out
3.  Tabakalı Örnekleme
4.  Üçlü Ayırma
5.  Çapraz geçerleme-doğrulama
6.  Rastgele Örnekleme Yöntemi
7.  Bootstrap Örnekleme Yöntemi

Makine öğrenmesi alanında en çok kullanılan yöntemlerin bazılarını aşağıda başlıklar ve örneklerle açıklayacağım.

## 1.Holdout (Dışarıda Tutma)

Veri setinin eğitim ve test olmak üzere iki parçaya ayrıldığı yöntemdir. Test setinde kullanılan veri eğitim setinin dışındaki verilerden oluştuğu için bu yönteme holdout ismi verilmiştir. Eğitim veri setiyle öğrenme sağlanmakta yani model kurulmaktadır, test veri setiyle de öğrenmenin ne kadar gerçekleştiği kontrol edilmekte ve model performansı elde edilmektedir.

Bu yöntemin iki dezavantajı vardır.

1.  Veri setindeki gözlem sayısının az olması durumunda ayrımın yeterince uygun yapılamaması.
2.  Veri setinin eğitim ve test olmak üzere bir defaya mahsus ayrılması, verilerin tamamının modelde kullanılamaması. ( test veri seti içinde modele iyileştirici katkı sunacak veriler bulunabilir.)

[![Tekrarlı Holdout Yöntemi](/wp-images/2018_02_holdout-1.svg)](/wp-images/2018_02_holdout-1.svg)

## 2.Tekrarlı Holdout (Tekrarlı Dışarıda Tutma)

Kısaca holdout yönteminin birkaç defa tekrarlanmasıdır. Bu yöntemde seçim işlemi her ne kadar rastgele yapılsa da farklı test veri setleri üst üste binebileceğinden elverişli görülmemektedir. Çok yaygın bir şekilde kullanılmamaktadır.

## 3.Tabakalı Öğrenme

Hedef niteliğin kategorik veri tipinde olduğu veri setlerinde hedef niteliğin bazı kategorilerine ait örnekler az sayıda ya da hiç olmayabilir. Bu gibi durumlarda veri seti eğitim ve test olarak ayrılırken hedef niteliğin kategorilerine ait oranların korunması istenebilir. Bu gibi durumlarda tabakalı örnekleme tercih edilir. Hedef niteliğin numeric olduğunda bu yöntemden faydalanmaz. Sadece kategorik özelliklerdeki veri setlerinde kullanılması uygundur.

## [![Tabakalı Öğrenme](/wp-images/2018_02_Tabakalı-son.svg)4.Üçlü Ayırma](/wp-images/2018_02_Tabakalı-son.svg)

Model seçimi ve performans tahmininin aynı anda gerçekleştirildiği yöntemdir. Veri setimizi eğitim, doğrulama ve test olmak üzere 3’e ayırırız. Ardından doğrulama veri setindeki örnekler ile kullanılan algoritmaya ait parametrelerin ince ayarı yapılır. Doğrulama veri setindeki çıktıları veren algoritma ve ona uygun parametre tespit edilinceye kadar denemeler yapılır. Bu yöntemde uygun algoritma en uygun parametresiyle birlikte verilir. Ardından test veri setiyle modelin nihai performansı denenir.

[![Üçlü Ayırma](/wp-images/2018_02_Üçlü-Ayırma.svg)](/wp-images/2018_02_Üçlü-Ayırma.svg)

Örnek vermek gerekirse, kabul ve red olarak 2 adet sonucumuz olduğunu varsayalım. Bizim doğrulama verilerimiz bizim belirlediğimiz değerler olsun. 7 Kabul ve 3 Red olarak tanımlayalım. Eğer algoritmamız bu sonucu vermez ise parametrelerde değişiklik yapılır bu da eğer istediğimiz sonucu vermez ise yeni bir algoritma seçilir. Yukarıdaki resimde farklı renklerde algoritmalar seçilmiştir. Kesin sonucu verene kadar eğitim süreci devam ettirilir. Hassasiyeti çok yüksek durumlarda kullanılmak için tasarlanmış bir yöntemdir.

## 5.Rastgele Örnekleme Yöntemi

Monte Carlo çapraz doğrulama(Monte Carlo Cross Validation) olarak da bilinen rastgele örnekleme yönteminde veri seti k defa kullanıcının belirlediği oranlarda eğitim ve test veri seti olarak bölünür. Elde edilen performans sonuçlarının ortalamasına göre nihai başarı elde edilir. Çapraz doğrulamadan farkı k adet rastgele ancak belirli oranlarda bölümlemelerin veri setinde aynı noktalara kısmen veya tamamen tekabül edebilmesidir. Bu durum aynı noktalara kısmen tekrar denk gelmesi aynı zamanda dezavantajdır. Bu örnek için düşünürsek veri setimizi 3 kere böldük ve en uygun sonuç veren algoritmayı seçmemiz gerekmektedir.

[![cross validation](/wp-images/2018_02_Rastgele-Örnekleme.svg)](/wp-images/2018_02_Rastgele-Örnekleme.svg)

## 6.Bootstrap örnekleme

Bootsrap örnekleme yönteminde elimizde “n” adet örnekten oluşan bir veri seti olsun bootstrap yöntemi veri setinden eğitim veri seti için “n” defa rastgele örnek seçmektedir. Ancak seçilen örnek veri setinden çıkarılmadan seçim işlemi sürdürülür. Bu nedenle eğitim veri setinde bir örnek birden fazla tekrar edebilmektedir. Eğitim veri seti oluşturulduktan sonra eğitim veri setine alınmayan bütün örnekler test veri setine aktarılmaktadır. Test veri setindeki her örnek yalnızca 1 defa tekrar edilebilir.

[![Bootsrap ](/wp-images/2018_02_Bootsrap-Örnekleme.svg)](/wp-images/2018_02_Bootsrap-Örnekleme.svg)