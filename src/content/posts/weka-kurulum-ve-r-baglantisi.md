---
title: "Weka Kurulum ve Weka-R Bağlantısı"
published: 2018-02-17
description: "Weka Waikato Üniversitesinde makine öğrenmesi test etme ve geliştirme amacıyla kurulmuş “Waikato Environment for Knowledge Analysis” kelimelerinin baş"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![weka logosu](/wp-images/2018_02_2089b1_363fa40599b04c5090c38d8632a553db_mv2.png "weka logo")](/wp-images/2018_02_2089b1_363fa40599b04c5090c38d8632a553db_mv2.png)

Weka Waikato Üniversitesinde makine öğrenmesi test etme ve geliştirme amacıyla kurulmuş “Waikato Environment for Knowledge Analysis” kelimelerinin baş harflerinden oluşmuş açık kaynak kodlu bir yazılımdır.

[Weka download](https://www.cs.waikato.ac.nz/ml/weka/downloading.html) sitesinden indirilebilir olarak iki adet seçenek mevcuttur. Bunlardan birisi standart uygulaması bir de console application vardır. Geliştiriciler açısından console olanı öneririm. Bir hata olduğu zaman nerede hata yaptım diye aramaya gerek kalmadan console ekranında çıktı verecektir.

![Weka ana görünüm](/wp-images/2018_02_Weka-1-min.png)![Weka](/wp-images/2018_02_Weka-2-min.png)

Weka .rff uzantılı dosyalar içerisinde eğitim verilerini saklar. .csv,json, veri tabanı vb. aracılığı ile aktarılmış eğitim verisini explorer ekranında save butonuna basıldığında rff olarak dönüştürür ve kaydeder. Bir .rff dosyasının içeriğine bakıldığında relation parametresi dosya adini, attribute parametresi eğitim berisindeki öz niteliklerin adını ( sütun adı), ve devamında öz niteliğin numeric, nominal gibi belirtilir.

_**Not:**_ Supervised learning için eğitim verisi hazırlanmış ise son attribute classları gösterir ve küme işareti içerisinde classlar yazılır.

Data parametresinden sonra ise birbirinden virgüllerle ayrılmış tüm attributelere ait değerler satırlar halinde yer alır.

Veri tabanlarında Weka’ya veri aktarabilmek için JDBC driveri yüklenmelidir. Eğitim verisi Wekaya aktarıldıktan sonra,

-   Classify sınıflandırma problemlerinin çözümü için cluster kümeleme işlemleri gerçekleştirilir.
-   Associate birliktelik analizleri için
-   Preprocess eğitim verisinde ön işlemler için kullanılır.
-   Visualize ise verileri ve analiz sonuçlarını görselleştirmek için kullanılır.
-   Generate deneme yapabilmemiz için örnek eğitim verisi oluşturur.
-   Preprocess bölümünde filter alanında choose komutu ile eğitim verisi üzerinde indirgeme ön kontrol vb işlemler otomatik yapılabilir.

# Weka’da Model Üzerinde Test Yapma

Model oluşturma yöntem ve kurallarına göre bir model elde edildikten sonra sınıfının model tarafından tahmin edilmesini istediğimiz verileri aşağıdaki adımları izleyerek test edebiliriz.

Öncelikle test verilerinin eğitim verisi formatında hazırlanması gerekir. Kolaylık olarak eğitim verisinin tanımlayıcı başlık kısımları olduğu gibi kopyalanabilir. (relations attribute class gibi). Daha sonra @data ibaresinden itibaren modele sorulacak öz nitelik bilgilerini içeren satırlar yazılır.

Satır sonuna class isimleri silinerek “?” konulabilir veya olduğu gibi bırakılabilir. Eğer “?” konulursa model gerçek değeri bilemediği için performans değerlendirmesi yapamaz. Test verileri zaten eğitim verilerinin içerisinde varsa model %100 başarı gösterir ancak gerçekçi sonuçlar vermez.

-   Test verilerini içeren arff dosya hazırlandıktan sonra Weka-explorer ekranına gelinir ancak Weka herhangi bir veri seti açılmadan classify sekmesini aktif etmez, bu yüzden amaç eğitim olmasa da classify sekmesine geçmek için generate butonu ile bir veri seti açılır ve classify sekmesine geçilir.( Bu durum da Weka’nın olumsuz yönüdür.)
-   Supplied Test Set işaretlenir ve set butonuna basılır.
-   Test verisi seçilir. Result list bölümüne sağ tıklanır load model ile seçilen model dosyası yüklenir.
-   More options output predictions chose butonuna basılıp plain text seçilir.
-   Result Listte çıkan model verisine sağ tıklanır “re-evaluate model on current test set “ seçilir

Yukarıdaki işlemler yapıldıktan sonra model tahminini classifier output ekranına döker.

## Wekada Classify Bölümü

Bu bölüm wekaya aktarılan eğitim verisinin hangi algoritma tarafında, hangi oranlarda test ve eğitim verisi olarak kullanılacağının belirlendiği , analiz sonuçlarının görüntülendiği bölümdür.

Model oluşturulduktan sonra dış veriyle test etmek için Suplied test set kullanılır. Choose bölümünde ana başlıklarına göre tüm öğrenme algoritmaları listelenmiştir.

Eğitim ve test verileri oranları seçildikten sonra, start butonu ile model oluşturma başlatılır. Modelin değerlendirilmesine yarayacak performans ve hata göstergeleri classifier output ile gösterilir.

Modelin değerlendirme kriterlerine göre kabul edilebilir olduğu anlaşılırsa daha başarılı sonuçlar verecek yeni algoritmaların olduğu düşünülerek diğer algoritmalar da denendikten sonra en iyi performans veren belirlenir. Result List bölümünden algoritma adı sağ tık ile save model komutuyla model kaydedilir. Hiçbir algoritmada istenilen başarı elde edilememişse eğer,

-   Eğitim verisi miktarını arttırma-azaltma
-   Öz nitelik sayısını artırma veya azaltma
-   Eğitim verisi içerisinde gurultu arama
-   Farklı öğrenme teknikleri deneme yoluna gidilir.
-   Eğitim ve test verisi ayırma yöntemine değişme yoluna gidilir.

## Weka ve R Bağlantısı

Wekada görselleştirme yapmak için R eklentisi eklemek gereklidir. Bu ekletiyi [https://cran.r-project.org/bin/windows/base/](https://cran.r-project.org/bin/windows/base/) sitesinden indirmek mümkündür.Bu sayede görsel bir şekilde sonuçlarımızı değerlendirmek mümkündür.

Bağlantı adımları şöyle yapılır.

1.  Weka ve R project yükle
2.  R konsoluna install.packages(“rJava”) yaz eklentiyi kur.
3.  Bilgisayarınızın “ortam değişkenleri” bölümünü aç
4.  Yeniyi tıkladıktan sonra üstteki kutuya “R\_Home”, alttaki kutuya ise dosya yolu ( c://Program FilesRR-3.4-3 )
5.  Yeni dedikten sonra üstteki kutuya “R\_LIBS\_USER” alt kutuya ise c:Users….rwin-library
6.  Windows 7’de yeni yukarıya Path asagiya R.exeyi yazan klasör. windows 8/10 düzenle veya yeniden Path yaz asagiya R exeyi yaz
7.  Weka gui chooser ekranında tools ekranında package managera girilir. RPlugin yüklenir weka kapatılıp açılır. bağlantı yapılmış olur.