---
title: "Makine Öğrenmesi – Öznitelikler ve Seçimi"
published: 2018-02-10
description: "Merhaba bu yazımı [makine öğrenmesi öğrenme süreci](https://blog.berkarat.com/ogrenme-ve-lineer-regresyon/) konusunun devamı olacak şekilde anlatacağı"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![makine öğrenmesi](/wp-images/2018_02_makine-öğ-696x492.jpg "makine öğrenmesi")](/wp-images/2018_02_makine-öğ.jpg)

Merhaba bu yazımı [makine öğrenmesi öğrenme süreci](https://blog.berkarat.com/ogrenme-ve-lineer-regresyon/) konusunun devamı olacak şekilde anlatacağım. Bu seferki konumuzda makine öğrenmesi içerisinde özniteliklerin seçimi, tipleri ve nerelerde kullanıldığı gibi temel konulara değineceğim.

# Öznitelikler ve Seçimi

Makine öğrenmesi için en kritik süreçlerden birisi de öznitelik seçimidir. Bir durumun ya da olgunun ölçülebilen ve anlamlandırılmış bir özelliğine _**öznitelik**_ denir. Matematik olarak ise lineer modeldeki Y değişkenine sonuç Xm değişkenine ise _**öznitelik**_ denir. Modelin başarısı için çok önemlidir. Seçilen nitelikler tahmin edilmek istenen durumu temsil ederken bazıları etmez. Hiçbir etkisi olmayabilir veya bozucu etkisi bile olabilir.  X1 , X2,…Xn öznitelikler serisi veya öznitelik vektörü tahmin edilmeye çalışan durumu tahminize eder ve bu seri Y’nin ( sonucun) tahmininde kullanılır. Öznitelikler temel, birleşik, ortak etki eden ve tekrarlanan öznitelikler olarak 4 tanedir.

-   Temel öznitelikler
-   Birleşik öznitelikler
-   Ortak etki eden öznitelikler
-   Tekrarlanan öznitelikler

![Makine öğrenmesi](/wp-images/2018_02_Makine-öğrenmesi-300x200.jpg)

## 1-Temel Öznitelikler

Sonucu veya problemi karakterize eden orijinal özellikler temel öznitelik kümesini oluşturur. Örneğin, yarınki hava durumunu tahmin etmek istiyorsak bugünkü hava durumunu ve nem ölçüm değerlerini almamız gerekir. Bu tipteki öznitelikler temel özniteliklerdir. Temel özniteliklerin seçiminde uzman desteği alınması gerekir. Aynı zamanda problemi de tanımlar. Temel özniteliklerin problemin doğası ile doğrudan alakalı olduğu varsayılır.

Temel öznitelikler 3 kategoride olabilir.

1.  Kategorik (kötü/orta/iyi)
2.  Sayısal(2000tl maaş gibi)
3.  Binary ( true/false veya 1/0 gibi)

Temel öznitelikler sonuç ya da durumla alakalı olmalıdır. Tekrarlanabilir şekilde veri sağlamalıdır.

## 2-Birleşik Öznitelikler

Temel öznitelikler bir çok durumda dar bir model sağlar. ( Yarının hava sıcaklığı tahmini için nem ve basıncın bilinmesi gibi ) Bu durum problemin sonucunun tahmin edilmesini olumsuz etkiler. Temel öznitelik vektörüne temel özniteliklerle lineer olmayan ancak fonksiyonel şekilde bağlı olan birleşik öznitelikler adını verdiğimiz parametreler eklenebilir.

## 3-Ortak Etki Eden Öznitelikler

İki ya da daha çok faktör beraber çalışır ve sonucu farklı şekilde etkileyebilirler. Örneğin kredi başvurusu yapan bir kişinin yaşadığı yer ve gelir durumu sonuca ortak etki eder ancak farklı şekilde etkileyebilirler.

## 4-Tekrarlanan  Öznitelikler

Bazı öznitelikler ortaya çıkan durum ve sonuca aynı etkiyi yaptıkları halde öznitelik vektöründe bulunabilirler. Örneğin yaş ve doğum tarihi bilgisinin ikisinin birden öznitelik vektöründe bulunması tekrarlanan etki öznitelikleri olarak tanımlanır sonuca aynı derecede etki eder. Ancak ikisinin toplamı değil bir tanesinin etkisi dikkate alınır. Ancak aynı etkiyi yapmayan fakat birbirine çok yakın olan yani sonuca etkileri arasında çok az bir fark bulunan öznitelikler bulunduğunda model sonucu en iyi kategorize eden özniteliği seçer. Diğer özniteliğe düşük katsayı değeri atayarak devre dışı bırakır.

# Öz Niteliklerin Normalizasyonu

Bu işlemin ana fikri tüm özniteliklerin benzer olmasını sağlamaktır. Sayısal büyüklük açısından farklılık gösteren öznitelikler sonucun elde edilmesine olumsuz etki yapabilir.  Öznitelikler içerisindeki aşırı dalgalanmalar, aykırılıklar matematiksel işlemlerle giderilmeye çalışılır. Örneğin sıcaklık ve basınç değerleri büyüklük açısından farklılık gösterir. Özniteliklerin normalleşmesinde sayısal değerlerde bölme işlemi yapılabilir. Öznitelik değerlerinden ortalama değerleri çıkarmak ve standart sapmasına bölmek sık kullanılan ikinci bir yöntemdir. Veri karmaşıklığını engeller. Normalizasyon yöntemlerini kullanarak yapılan işlemler sonucunda lineer model bu durumdan etkilenmez.