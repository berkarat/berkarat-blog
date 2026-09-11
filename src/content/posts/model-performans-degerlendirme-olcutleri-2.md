---
title: "Model Performans Değerlendirme Ölçütleri-2"
published: 2018-02-16
description: "Merhabalar bu yazımızda önceki yazı olan [model performans değerlendirme ölçütleri](https://blog.berkarat.com/performans-degerlendirme/)nin devamı ola"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![Makine öğrenmesi](/wp-images/2018_02_Makine-öğrenmesi-696x696.png "Makine öğrenmesi")](/wp-images/2018_02_Makine-öğrenmesi.png)

Merhabalar bu yazımızda önceki yazı olan [model performans değerlendirme ölçütleri](https://blog.berkarat.com/performans-degerlendirme/)nin devamı olarak kalan ölçütlerden bahsedeceğim.

## ROC Eğrisi(Receiver Operating Characteristic Curves)

Roc eğrisinin gelişimine tarihi açısından bakarsak İkinci Dünya Savaşı sırasında dost ve düşman uçakların sinyallerini doğru tanımlayıp belirlemek, yorumlamak icin geliştirilmiş bir yöntemdir. Roc eğrisine bakılarak model performansı hakkında genel bir değerlendirme yapılabilir X ekseni sahte pozitif oranını gösterirken Y ekseni gerçek pozitif oranını gösterir.

![Roc Curve](/wp-images/2018_02_ROC.svg)

-   Roc eğrisi monoton olarak yukarı giden artan fonksiyondur.
-   Sol alt köşe yüksek eşiğe karşılık gelir. Sağ üst köşe ise düşük esiğe karşılık gelir.
-   Yüksek eşik demek sadece gerçek pozitiflerin yakalandığını (TP) fakat çok fazla pozitif durumun gözden kaçırıldığı anlamına gelir.
-   Düşük eşik demek neredeyse tüm durumları pozitif olarak etiketlemektir. Dolayısıyla anma yüksektir. Fakat bununla birlikte çok sayıda negatif durum da yanlışlıkla yakalanıyor demektir.
-   ROC grafiğinde (0,0) noktası hiçbir zaman pozitif bir sınıflandırmanın yapılamayacağını, (1,1) noktası mutlak pozitif sınıflandırmanın elde edileceğini, (0,1) noktası ise mükemmel sınıflandırmayı gösterir.
-   İyi bir sınıflandırıcının eğrisi grafiğin sol üst kösesine yakın olması ile elde edildiği söylenebilir.
-   Hedef değişkeninin nominal veri tipi olduğu durumlarda tahminler ROC uzayında tek bir noktaya karşılık gelir.

## PRC EĞRİSİ (Precision-Recall Curves)

Eşik değişimine göre PRC eğrisini gösterir.

### Özellikleri :

-   PRC eğrisi monoton aşağı gider.
-   Sol üst köşe yüksek eşige karşılık gelirken, sağ alt köşe düşük eşiğe karşılık gelir.
-   Yüksek eşik seçildiğinde gercek pozitifleri yakalıyoruz fakat fazla pozitif durum yakalanmıyor demektir.
-   Düşük eşik demek anma yüksek fakat yanlışlıkla çok fazla negatif durum yakalanıyor demektir.

[![Precision recall curves](/wp-images/2018_02_PRC.svg)](/wp-images/2018_02_PRC.svg)

## AUC EĞRİSİ(Area Under Curves)

-   Genel performans için kullanılır.
-   Bir sınıflandırma çözümünün genel performansını karakterize etmek için AUC ölçeği kullanılır.
-   AUC TP ve TN yakalama oranını gösterir.

Eğrinin altında kalan alanın 1 e yaklaşması istenir.[![Auc curves](/wp-images/2018_02_auc.svg)](/wp-images/2018_02_auc.svg)

# Modelin Hata Ölçekleri

Model  tahmini ile gerçek değer arasındaki farka **_hata_** denir.

Model tahminlerinin ortalama hatasına **_maliyet_** denir.

## Ortalama Karesel Hata(Root Mean Square Error)

Ortalama karesel hata tahmin ile gerçek değer çizgisinin arasındaki uzaklıkların karelerinin ortalamasını alarak birbirlerine olan yakınlığını hata hesabıyla göstermeye çalışır.

Ortalama karesel hata ne kadar küçükse tahminle gerçek değer arasındaki uyum o kadar iyidir. Regresyon modellerinin tahmin edebilme ölçeği olarak da kullanılabilir. Modelin RMSE’sinin varyansı denir.

## Korelasyon Katsayısı

Modelin tahminleriyle gerçek değerler arasında doğru orantılı bir ilişki olup olmadığı hakkında bilgi verir. \\(r^2\\) ile gösterilir.

Korelasyon katsayısı \\(r^2\\) -1/ ile +1 arasında değişir. Eğer -1’e eşitse tahmin edilen ile gerçeklerim uyuşmadığını, 0’a eşit ise tahminlerin gerçek değerlerle alakasız olduğunu, +1 e eşit ise tahminlerin gerçek değerlerle birebir uyuştuğunu gösterir.

[![korelasyon katsayısı](/wp-images/2018_02_korelasyon.svg)](/wp-images/2018_02_korelasyon.svg)

Root Mean Squared Error( ortalama karesel hatanın karekökü). RMSE Ortalama karesel hatanın karekökü alınarak elde edilir. RMSE hassasiyet ölçüsüdür. Parametrik güven aralıklarının elde edilmesinde yaklaşık dağılım özelliklerinin bilinmesini sağlar. Bir sistemden diğer bir sisteme dönüşümün doğruluğunu belirlemek için de kullanılır.

## Kappa Katsayısı

İki veya daha fazla gözlem arasındaki uyuşmayi etkileşimi ölçmek için kappa istatistiği sık kullanılan bir yöntemdir. Kappa gözlemler arasındaki uyuşmasın büyüklüğü nicel olarak tanımlanmadı icin vardır. -1/+1 arasında değişen ölçüdür. Bu değer +1 ise gözlemler arasında mükemmel bir uyuşma vardır.

<table><tbody><tr><td style="text-align: center;"><strong>Dereceler</strong></td><td style="text-align: center;">Düşük</td><td style="text-align: center;">Zayıf</td><td style="text-align: center;">Makul</td><td style="text-align: center;">Orta</td><td style="text-align: center;">Önemli</td><td style="text-align: center;">Mükemmel</td></tr><tr><td style="text-align: center;"><strong>Kappa Katsayısı</strong></td><td style="text-align: center;">0.00</td><td style="text-align: center;">0.20</td><td style="text-align: center;">0.40</td><td style="text-align: center;">0.60</td><td style="text-align: center;">0.80</td><td style="text-align: center;">1.00</td></tr></tbody></table>

<table><tbody><tr><td style="text-align: center;"><strong>Kappa Katsayısı</strong></td><td style="text-align: center;"><strong>Kabul Edilebilirlik Seviyesi</strong></td></tr><tr><td style="text-align: center;">&lt;= 0</td><td style="text-align: left;">Kabul edilebilir değil.</td></tr><tr><td style="text-align: center;">0.01-0.20</td><td style="text-align: left;">Yeterli değil.</td></tr><tr><td style="text-align: center;">0.21-0.40</td><td style="text-align: left;">Makul seviyede kabul edilebilir.</td></tr><tr><td style="text-align: center;">0.41-0.60</td><td style="text-align: left;">Orta düzeyde yeterli.</td></tr><tr><td style="text-align: center;">0.61-0.80</td><td style="text-align: left;">Önemli ölçüde kabul edilebilir.</td></tr><tr><td style="text-align: center;">0.81-0.99</td><td style="text-align: left;">Mükemmel seviyede uyuşma</td></tr></tbody></table>