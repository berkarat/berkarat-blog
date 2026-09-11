---
title: "Model Performans Değerlendirme Ölçütleri-1"
published: 2018-02-15
description: "Merhabalar daha önceki yazılarımızda bahsettiğimiz yöntemlerle önce taslak model oluşturmuş daha sonrasında ise bu taslak modele uygun algoritmaları k"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![Makine öğrenmesi](/wp-images/2018_02_Makine-öğrenmesi-696x696.png "Makine öğrenmesi")](/wp-images/2018_02_Makine-öğrenmesi.png)

Merhabalar daha önceki yazılarımızda bahsettiğimiz yöntemlerle önce taslak model oluşturmuş daha sonrasında ise bu taslak modele uygun algoritmaları kullanarak modelimizi oluşturmuştuk. Bu uygun algoritmaları neye göre uygun olup olmadığından bahsetmemiştik. Bu yazının başlığından da anlaşılacağı gibi modelimizin performansını değerlendirip hangisinin uygun olup olmadığını belirlememize yarayacak bazı ölçütlerden bahsedeceğim.

## Confusion Matrix( Hata Matrixi)

Makine öğrenmesinde hedef verisi önceden belli olan veri setlerinden elde edilen ( [model performans değerlendirme yöntemleri](https://blog.berkarat.com/model-performans-degerlendirme-yontemleri/) yani bahsettiğimiz 8 yöntemden birisiyle ) modellerin performansını değerlendirmek üzere en sık kullanılan yöntem confisuon matrix’dir. ( karışıklık matrisi) Modelin pozitif ve negatif örnekleri içerisinde barındıran test veri setini ne ölçüde sınıflandırdığımı gösteren matrix’e confusion matrix denir.

[![confusion matrix](/wp-images/2018_02_confusion.svg)](/wp-images/2018_02_confusion.svg)

-   **TP (True Positive ):** Test verisindeki değer ile modelin değer ettiği sınıf aynıdır. Doğru sınıflandırma yapmıştır.
-   **FN (False Negative ):**Test verisindeki değer ile modelin ürettiği sınıf farklı. Pozitif ilken negatif sınıflandırılmış. Hatalı sınıflandırma yapmıştır.
-   **FP (False Positive ) :** Gerçek değer negatif iken pozitif sınıflandırılmış. Hatalı sınıflandırma yapmıştır.
-   **TN (True Negative ):** Gerçek değer negatif iken negatif sınıflandırılmıştır. Doğru sınıflandırma yapmıştır.

<table class=" aligncenter" style="border-color: #000000;"><tbody><tr><td style="width: 154.271px;"></td><td style="width: 502.049px;" colspan="3"><span style="font-size: 18pt;"><strong>GERÇEK DEĞERLER</strong></span></td></tr><tr><td style="width: 154.271px;" rowspan="3"><span style="font-size: 18pt;"><strong>TAHMİN EDİLEN DEĞERLER</strong></span></td><td style="width: 154.271px;"></td><td style="width: 154.271px;">POZİTİF</td><td style="width: 155.382px;">NEGATİF</td></tr><tr><td style="width: 154.271px;">POZİTİF</td><td style="width: 154.271px;">Gerçek Pozitif<p>True Positive – TP</p></td><td style="width: 155.382px;">Sahte Pozitif<p>False Positive – FP</p></td></tr><tr><td style="width: 154.271px;">NEGATİF</td><td style="width: 154.271px;">Sahte Negatif<p>False Negative – FN</p></td><td style="width: 155.382px;">Gerçek Negatif<p>True Negative – TN</p></td></tr></tbody></table>

Örnek bir problem üzerinde değerlendirirsek bazı öz niteliklerle bir hasta üzerinde X rahatsızlığı var ya da rahatsızlığı yok sonucuna varmak istiyoruz. Eğer ki;

-   Hasta olmayan kişilere X rahatsızlığı var teşhisi koyarsan **FP**
-   Hasta olmayanlara X rahatsızlığı yok dediysek **TN**
-   Hasta olanlara X teşhisi var dediysek **TP**
-   Hasta olanlara X teşhisi yok dediysek **FN**

## DUYARLILIK ( Sensivity-Precision)

Modelin girdilerden pozitif sınıf etiketini tahmin etmekteki etkililiğini gösterir. Doğru sınıflandırılan pozitif örneklerin toplam pozitif örnek sayısına oranıdır ( FN ayni zamanda doğrudur) sadece pozitif için geçerli.

\\(Duyarlılık=frac{TP}{TP+FN}\\)

Modelin girdilerden pozitif sınıf etiketini tahmin etmekteki etkililiğini gösterir. Doğru sınıflandırılan pozitif örneklerin toplam pozitif örnek sayısına oranıdır ( FN aynı zamanda doğrudur) sadece pozitif için geçerli.

## BELİRLEYİCİLİK (Specifity)

\\(Specifity=frac{TN}{TN+FP}\\)

Modelin girdilerdeki negatif sınıf etiketini tahmin etmedeki becerisidir. Doğru sınıflandırılan negatif örneklerin toplam negatif örnek sayısına oranı ile hesaplanır. (FP aynı zamanda negatifidir)

## KESİNLİK( Pozitif Öngörü- Recall)

\\(Recall=frac{TP}{TP+FP}\\)

Doğru sınıflandırılan pozitif örneklerin toplam pozitif tahmin edilen örneklere oranıdır.

## F-ÖLÇÜTÜ

Kesinlik ve duyarlık performans değerlendirme ölçütlerinin harmonik ortalamasıdır. Her iki ölçütü birlikte değerlendirme imkanı verir.

\\(F-Ölçütü=frac {2\*Precision\*Recall}{Precision+Recall}\\)

Sınıflandırıcının eşik değeri belirlenirken F değeri göz önünde bulundurulur.

## Doğruluk

Modelin gerçekte doğru sınıflandırdığı örneklerin sayısıdır.

​\\(Doğruluk=TP+TN\\)

Doğruluk modelin genel olarak doğru olup olmadığını karakterize eder.