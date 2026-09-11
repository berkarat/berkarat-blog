---
title: "Makine Öğrenmesi-Model Oluşturma"
published: 2018-02-11
description: "Merhaba bu yazımız [Makine Öğrenmesi Öğrenme Süreci](https://blog.berkarat.com/ogrenme-ve-lineer-regresyon/) yazımızın devamı niteliği taşımaktadır. B"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![machine-learning](/wp-images/2018_02_machine-learning-696x461.png "makine öğrenmesi")](/wp-images/2018_02_machine-learning.png)

Merhaba bu yazımız [Makine Öğrenmesi Öğrenme Süreci](https://blog.berkarat.com/ogrenme-ve-lineer-regresyon/) yazımızın devamı niteliği taşımaktadır. Bu makaleyi anlamak için öncelikle bu konuyu okumanız gerekmektedir. Bu sefer makine öğrenmesinde model kavramını açıklayacağız ve nasıl oluşturulduğunu nelere dikkat etmemiz gerektiğiniz açıklayacağım. İlk olarak model oluşturma ile başlayacağım ve örnek problem üzerinden anlatacağım.

# Model Oluşturma

Bir problemi makine öğrenmesi yöntemleriyle çözmek için özniteliklerin doğru seçilmesi ve doğru şekilde temsil edilmesi çok önemlidir. Bunu birçok yerde belirtmiştim şimdi neden böyle belirttiğimi yazının sonunda daha iyi anlamış olacağız.

![Makine öğrenmesi model](/wp-images/2018_02_model-min-1024x862.png)

## **Örnek**

Bir banka düşünelim ve kredi başvurusu yapan müşterilerin kredi risk durumlarının kontrolünü makine öğrenmesi yöntemiyle yapmak istiyor. Kısaca kredi vermeden önce müşterisinin kredi riskini belirlemek istiyor. Bunun için bizden uygun bir model oluşturmamız bekleniyor.

## **Çözüm**

Öncelikle temel açıklayıcı nitelikler, faktörler veya değişkenler belirlenmelidir. Bunun için bir kredi uzmanından destek alınmalı ve önemli faktörlerin neler olduğu hakkında bilgiler alınmalıdır.( Aylık geliri, yaşadığı şehir gibi öznitelikler) Makine öğrenmesi yöntemleriyle ortaya çıkacak modelin sığım uzayı (kapsamı) bu özniteliklerinin çeşidini arttırılarak genişletilebilir.

-   Kredi riskini etkileyen özniteliklerin tipleri belirlenir.
-   Örneğin müşterinin ikamet ettiği il —> kategoriktir.
-   Müşterinin geliri —> sayısal
-   Müşterinin ödeme performansı —> binary

Modelin üretmesi beklenen çıktıları sayısı ve tipi belirlenir. ​Modelin çıktısı binary (kredi almaya uygun veya uygun değil gibi) olabilir. Numeric seçilmesi hassasiyet oranını arttırır, binary seçilmesi sınıf sayısını azaltırken hassasiyeti düşürebilir. Bu yüzden sonuç sınıfını belirlerken istenilen durum göz önünde bulundurulmalıdır. Bazı algoritmalar sadece numeric veya kategorik olarak çalıştığından bu çıktıyı belirlerken kullanacağımız algoritmayı da göz önünde bulundurmak zorundayız. ( Örneğin müşterinin yaşadığı il string tipindeyse algoritma tarafından kabul edilmeyebilir. Bunu numerice çevirmek gerekebilir. İzmir yerine plaka kodu olan 35 yazmak gibi) Aksi takdirde bir sonuç elde edemeyiz.

Veriler türlerine uygun olarak veri tabanına veya text dosyasına aktarılır. Örneğin Müşterinin geliri sürekli bir değişkendir. Bu durum kredi riskine oransal olarak etki etmeyebilir. Yani sistem maaşı 1000₺ olan müşteri ile 2000₺ arasındaki müşteri kıyası yaparken iki kat risk görebilir. Ancak bu durum yanlıştır. Bunu ortadan kaldırmak için müşterinin geliri düşük, orta, yüksek gibi kategorik hale getirilebilir. (düşük=0, orta=1, yüksek=2) Ancak bu sayısal katsayılar lineer model kurallarına uymayabilir bu durumu da göz önünde bulundurmak gerekmektedir. [Lineer regresyon](https://blog.berkarat.com/ogrenme-ve-lineer-regresyon/) yazımızda nelere dikkat edeceğimizi açıklamıştım.

Bu tip işlemleri yaptıktan sonra 4 aşamada oluşturduğumuz bir taslak modeli karşımıza çıkmış bulunmaktadır. Bu 4 aşamayı [Makine Öğrenmesi Giriş](https://blog.berkarat.com/makine-ogrenmesi-giris/) yazımızda detaylı olarak açıklamıştım.

![eğitim verisi ](/wp-images/2018_02_tablo-min-1024x582.png)

Eğitim verisinin sınıfının belli olup olmamasına bu eğitim verisi kullanılarak çözülmek istenen problemin mantıksal gerekliliklerine ve beklentilere göre algoritma seçimi, öğrenme yöntemi belirlenir. Her problemde en yüksek başarıyı veren belirli bir algoritma yoktur. Bu nedenle çok sayıda algoritma, algoritmanın iç ayarlarını da değiştirerek defalarca denenmelidir. Algoritmaların ürettiği matematiksel, istatiksel değerlendirme çıktıları, geçmiş tecrübeler algoritma seçiminde temel belirleyicilerdir.

Bu algoritmaların çeşitleri aşağıda verilmiştir.

## Model Performans Değerlendirme Yöntemleri

1.  Hold Out
2.  Tekrarlı Hold Out
3.  Tabakalı Örnekleme
4.  Üçlü Ayırma
5.  Çapraz geçerleme-doğrulama
6.  Rastgele Örnekleme Yöntemi
7.  Bootstrap Örnekleme Yöntemi

Bir sonraki yazımızda bu model performans değerlendirme yöntemlerini madde madde açıklayacağız.