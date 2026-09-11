---
title: "KMP (Knuth Morris Pratt) Arama Algoritması"
published: 2018-03-11
description: "Merhabalar bu yazımızda bir arama algoritması olan KMP( Knuth Morris Pratt ) Algoritmasından bahsedeceğim. Arama algoritmaları çeşitli özelliklere sah"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![kmp algorithm](/wp-images/2018_03_pattern_match-min.jpeg "kmp algoritması")](/wp-images/2018_03_pattern_match-min.jpeg)

Merhabalar bu yazımızda bir arama algoritması olan KMP( Knuth Morris Pratt ) Algoritmasından bahsedeceğim. Arama algoritmaları çeşitli özelliklere sahiptirler. Kimisi çok hızlı olması, kimisi hızdan ziyade doğruluk bakımından birbirlerinden farklılık göstermektedir. KMP algoritması ise dengede bir algoritmadır. Diğer arama algoritmalarının temelini oluşturur ve KMP tablosu olarak göreceğimiz tabloyu kullanmaktadır.

KMP’nin hedefinde aranılacak kelimenin metinde bulunup, bulunmadığına bakılır ve bu durumlarda neler yapılacağı vardır. Klasik arama yöntemlerinde bütün ihtimaller denenir ve sonuca varılması hedeflenir ancak bu durum uzun bir süre ve bellek kaybı anlamına gelmektedir. KMP ise bu ara işlemlerin bazılarını yapmayarak süreyi kısaltarak ve bellek kaybının önüne geçerek bir arama işlemi gerçekleştirir. Bu ara işlemleri yapmama durumunu aranacak olan kelimeden yola çıkarak hesaplar.

## KMP Özellikleri

-   KMP algoritmasının çalışması için öncelikle ön işlem olarak bir KMP tablosu oluşturmak gerekmektedir.
-   Arama işlemini soldan sağa doğru yapar.
-   Ön işlem zaman karmaşıklığı yani tablo oluşturma işlemi O(m) , arama zaman karmaşıklığı ise O(m+n) olur.
-   Genellikle DNA gibi çok fazla farklı karakter bulundurmayan metinlerde arama çok hızlı iken , doğal konuşma dili tarzındaki metinlerde ise biraz yavaş kalmaktadır.
-   Araştırmalar sonucunda Türkçe dil yapısında İngilizce dil yapısına göre daha etkili sonuçlar verdiği hesaplanmıştır.

## KMP Çalışma Yapısı

Bu işlemleri bir örnek üzerinden değerlendirirsek daha açıklayıcı olacağını düşündüğüm için bir örnek problem üzerinden ilerleyeceğim.

Öncelikle ön işlem aşamasını yapmamız gerekmektedir. Bu da tablo oluşturmamız anlamına geliyor. Bu yüzden bazı terimlere ve formüllere ihtiyacımız var.

### Terimler  
\\(i=kelime\\) \\( işaretçisi\\)  
\\(Shifting(kaydırma)=i-prefix\[i\]\\)  
\\(prefix=ön\\) \\(ek\\)  
\\(suffix=son\\) \\(ek\\)\\(pattern=\\) \\(aranacak\\) \\(kelime\\)

#### Örnek Soru

-   “ACAACACAACABACA” metininde ACABACA kelimesini KMP algoritmasıyla bulunuz.

## Tablo Oluşturma İşlemi

## Adım-1

-   **Kelime****:** ACABACA
-   **i** **= 1 :** A
-   **Prefix :** Yok
-   **Suffix :** Yok

**SONUÇ: 0**

<table style="height: 42px;" width="110"><tbody><tr><td style="text-align: center; width: 204px;"><strong>i</strong></td><td style="text-align: center; width: 47px;"><strong>1</strong></td><td style="text-align: center; width: 45px;"><strong>2</strong></td><td style="text-align: center; width: 47px;"><strong>3</strong></td><td style="text-align: center; width: 47px;"><strong>4</strong></td><td style="text-align: center; width: 47px;"><strong>5</strong></td><td style="text-align: center; width: 45px;"><strong>6</strong></td><td style="text-align: center; width: 50px;"><strong>7</strong></td></tr><tr><td style="text-align: center; width: 204px;"><strong>Pattern[i]</strong></td><td style="text-align: center; width: 47px;"><strong>A</strong></td><td style="text-align: center; width: 45px;"><strong>C</strong></td><td style="text-align: center; width: 47px;"><strong>A</strong></td><td style="text-align: center; width: 47px;"><strong>B</strong></td><td style="text-align: center; width: 47px;"><strong>A</strong></td><td style="text-align: center; width: 45px;"><strong>C</strong></td><td style="text-align: center; width: 50px;"><strong>A</strong></td></tr><tr><td style="text-align: center; width: 204px;"><strong>Prefix[i]</strong></td><td style="text-align: center; width: 47px;" bgcolor="#7CFC00">0</td><td style="text-align: center; width: 45px;"></td><td style="text-align: center; width: 47px;"></td><td style="text-align: center; width: 47px;"></td><td style="text-align: center; width: 47px;"></td><td style="text-align: center; width: 45px;"></td><td style="width: 50px; text-align: center;"></td></tr></tbody></table>

* * *

## Adım-2

-   **Kelime****:** ACABACA
-   **i** **= 2 :** AC
-   **Prefix :** A
-   **Suffix :** C

**SONUÇ:0**

<table style="height: 42px;" width="110"><tbody><tr><td style="text-align: center; width: 204px;"><strong>i</strong></td><td style="text-align: center; width: 47px;"><strong>1</strong></td><td style="text-align: center; width: 45px;"><strong>2</strong></td><td style="text-align: center; width: 47px;"><strong>3</strong></td><td style="text-align: center; width: 47px;"><strong>4</strong></td><td style="text-align: center; width: 47px;"><strong>5</strong></td><td style="text-align: center; width: 45px;"><strong>6</strong></td><td style="text-align: center; width: 50px;"><strong>7</strong></td></tr><tr><td style="text-align: center; width: 204px;"><strong>Pattern[i]</strong></td><td style="text-align: center; width: 47px;"><strong>A</strong></td><td style="text-align: center; width: 45px;"><strong>C</strong></td><td style="text-align: center; width: 47px;"><strong>A</strong></td><td style="text-align: center; width: 47px;"><strong>B</strong></td><td style="text-align: center; width: 47px;"><strong>A</strong></td><td style="text-align: center; width: 45px;"><strong>C</strong></td><td style="text-align: center; width: 50px;"><strong>A</strong></td></tr><tr><td style="text-align: center; width: 204px;"><strong>Prefix[i]</strong></td><td style="text-align: center; width: 47px;">0</td><td style="text-align: center; width: 45px;" bgcolor="#7CFC00">0</td><td style="text-align: center; width: 47px;"></td><td style="text-align: center; width: 47px;"></td><td style="text-align: center; width: 47px;"></td><td style="text-align: center; width: 45px;"></td><td style="width: 50px; text-align: center;"></td></tr></tbody></table>

* * *

## Adım-3

-   **Kelime****:** ACABACA
-   **i** **= 3 :** ACA
-   **Prefix :** A , AC
-   **Suffix :** A , CA

**SONUÇ:1(A)**

<table style="height: 42px;" width="110"><tbody><tr><td style="text-align: center; width: 204px;"><strong>i</strong></td><td style="text-align: center; width: 47px;"><strong>1</strong></td><td style="text-align: center; width: 45px;"><strong>2</strong></td><td style="text-align: center; width: 47px;"><strong>3</strong></td><td style="text-align: center; width: 47px;"><strong>4</strong></td><td style="text-align: center; width: 47px;"><strong>5</strong></td><td style="text-align: center; width: 45px;"><strong>6</strong></td><td style="text-align: center; width: 50px;"><strong>7</strong></td></tr><tr><td style="text-align: center; width: 204px;"><strong>Pattern[i]</strong></td><td style="text-align: center; width: 47px;"><strong>A</strong></td><td style="text-align: center; width: 45px;"><strong>C</strong></td><td style="text-align: center; width: 47px;"><strong>A</strong></td><td style="text-align: center; width: 47px;"><strong>B</strong></td><td style="text-align: center; width: 47px;"><strong>A</strong></td><td style="text-align: center; width: 45px;"><strong>C</strong></td><td style="text-align: center; width: 50px;"><strong>A</strong></td></tr><tr><td style="text-align: center; width: 204px;"><strong>Prefix[i]</strong></td><td style="text-align: center; width: 47px;">0</td><td style="text-align: center; width: 45px;">&nbsp;0</td><td style="text-align: center; width: 47px;" bgcolor="#7CFC00">&nbsp;1</td><td style="text-align: center; width: 47px;"></td><td style="text-align: center; width: 47px;"></td><td style="text-align: center; width: 45px;"></td><td style="width: 50px; text-align: center;"></td></tr></tbody></table>

* * *

## Adım-4

-   **Kelime** **:** ACABACA
-   **i** **= 4 :** ACAB
-   **Prefix :** A , AC , ACA
-   **Suffix :** B , AB , CAB

**SONUÇ:0**

<table style="height: 42px;" width="110"><tbody><tr><td style="text-align: center; width: 204px;"><strong>i</strong></td><td style="text-align: center; width: 47px;"><strong>1</strong></td><td style="text-align: center; width: 45px;"><strong>2</strong></td><td style="text-align: center; width: 47px;"><strong>3</strong></td><td style="text-align: center; width: 47px;"><strong>4</strong></td><td style="text-align: center; width: 47px;"><strong>5</strong></td><td style="text-align: center; width: 45px;"><strong>6</strong></td><td style="text-align: center; width: 50px;"><strong>7</strong></td></tr><tr><td style="text-align: center; width: 204px;"><strong>Pattern[i]</strong></td><td style="text-align: center; width: 47px;"><strong>A</strong></td><td style="text-align: center; width: 45px;"><strong>C</strong></td><td style="text-align: center; width: 47px;"><strong>A</strong></td><td style="text-align: center; width: 47px;"><strong>B</strong></td><td style="text-align: center; width: 47px;"><strong>A</strong></td><td style="text-align: center; width: 45px;"><strong>C</strong></td><td style="text-align: center; width: 50px;"><strong>A</strong></td></tr><tr><td style="text-align: center; width: 204px;"><strong>Prefix[i]</strong></td><td style="text-align: center; width: 47px;">0</td><td style="text-align: center; width: 45px;">&nbsp;0</td><td style="text-align: center; width: 47px;">&nbsp;1</td><td style="text-align: center; width: 47px;" bgcolor="#7CFC00">&nbsp;0</td><td style="text-align: center; width: 47px;"></td><td style="text-align: center; width: 45px;"></td><td style="width: 50px; text-align: center;"></td></tr></tbody></table>

* * *

## Adım-5

-   **Kelime****:** ACABACA
-   **i** **= 5 :** ACABA
-   **Prefix :** A , AC , ACA , ACAB
-   **Suffix :** A , BA , ABA , CABA

**SONUÇ:1(A)**

<table style="height: 42px;" width="110"><tbody><tr><td style="text-align: center; width: 204px;"><strong>i</strong></td><td style="text-align: center; width: 47px;"><strong>1</strong></td><td style="text-align: center; width: 45px;"><strong>2</strong></td><td style="text-align: center; width: 47px;"><strong>3</strong></td><td style="text-align: center; width: 47px;"><strong>4</strong></td><td style="text-align: center; width: 47px;"><strong>5</strong></td><td style="text-align: center; width: 45px;"><strong>6</strong></td><td style="text-align: center; width: 50px;"><strong>7</strong></td></tr><tr><td style="text-align: center; width: 204px;"><strong>Pattern[i]</strong></td><td style="text-align: center; width: 47px;"><strong>A</strong></td><td style="text-align: center; width: 45px;"><strong>C</strong></td><td style="text-align: center; width: 47px;"><strong>A</strong></td><td style="text-align: center; width: 47px;"><strong>B</strong></td><td style="text-align: center; width: 47px;"><strong>A</strong></td><td style="text-align: center; width: 45px;"><strong>C</strong></td><td style="text-align: center; width: 50px;"><strong>A</strong></td></tr><tr><td style="text-align: center; width: 204px;"><strong>Prefix[i]</strong></td><td style="text-align: center; width: 47px;">0</td><td style="text-align: center; width: 45px;">&nbsp;0</td><td style="text-align: center; width: 47px;">&nbsp;1</td><td style="text-align: center; width: 47px;">&nbsp;0</td><td style="text-align: center; width: 47px;" bgcolor="#7CFC00">1</td><td style="text-align: center; width: 45px;"></td><td style="width: 50px; text-align: center;"></td></tr></tbody></table>

* * *

## Adım-6

-   **Kelime****:** ACABACA
-   **i** **= 6 :** ACABAC
-   **Prefix :** A , AC , ACA , ACAB , ACABA
-   **Suffix :** C , AC , BAC , ABAC , CABAC

**SONUÇ:2(AC)**

<table style="height: 42px;" width="110"><tbody><tr><td style="text-align: center; width: 204px;"><strong>i</strong></td><td style="text-align: center; width: 47px;"><strong>1</strong></td><td style="text-align: center; width: 45px;"><strong>2</strong></td><td style="text-align: center; width: 47px;"><strong>3</strong></td><td style="text-align: center; width: 47px;"><strong>4</strong></td><td style="text-align: center; width: 47px;"><strong>5</strong></td><td style="text-align: center; width: 45px;"><strong>6</strong></td><td style="text-align: center; width: 50px;"><strong>7</strong></td></tr><tr><td style="text-align: center; width: 204px;"><strong>Pattern[i]</strong></td><td style="text-align: center; width: 47px;"><strong>A</strong></td><td style="text-align: center; width: 45px;"><strong>C</strong></td><td style="text-align: center; width: 47px;"><strong>A</strong></td><td style="text-align: center; width: 47px;"><strong>B</strong></td><td style="text-align: center; width: 47px;"><strong>A</strong></td><td style="text-align: center; width: 45px;"><strong>C</strong></td><td style="text-align: center; width: 50px;"><strong>A</strong></td></tr><tr><td style="text-align: center; width: 204px;"><strong>Prefix[i]</strong></td><td style="text-align: center; width: 47px;">0</td><td style="text-align: center; width: 45px;">&nbsp;0</td><td style="text-align: center; width: 47px;">&nbsp;1</td><td style="text-align: center; width: 47px;">&nbsp;0</td><td style="text-align: center; width: 47px;">1</td><td style="text-align: center; width: 45px;" bgcolor="#7CFC00">2</td><td style="width: 50px; text-align: center;"></td></tr></tbody></table>

* * *

## Adım-7

-   **Kelime****:** ACABACA
-   **i** **= 7 :** ACABACA
-   **Prefix :** A , AC , ACA , ACAB , ACABA , ACABCA
-   **Suffix :** A , CA , ACA , BACA , ABACA , CABACA

**SONUÇ:3(ACA)**

<table style="height: 42px;" width="110"><tbody><tr><td style="text-align: center; width: 204px;"><strong>i</strong></td><td style="text-align: center; width: 47px;"><strong>1</strong></td><td style="text-align: center; width: 45px;"><strong>2</strong></td><td style="text-align: center; width: 47px;"><strong>3</strong></td><td style="text-align: center; width: 47px;"><strong>4</strong></td><td style="text-align: center; width: 47px;"><strong>5</strong></td><td style="text-align: center; width: 45px;"><strong>6</strong></td><td style="text-align: center; width: 50px;"><strong>7</strong></td></tr><tr><td style="text-align: center; width: 204px;"><strong>Pattern[i]</strong></td><td style="text-align: center; width: 47px;"><strong>A</strong></td><td style="text-align: center; width: 45px;"><strong>C</strong></td><td style="text-align: center; width: 47px;"><strong>A</strong></td><td style="text-align: center; width: 47px;"><strong>B</strong></td><td style="text-align: center; width: 47px;"><strong>A</strong></td><td style="text-align: center; width: 45px;"><strong>C</strong></td><td style="text-align: center; width: 50px;"><strong>A</strong></td></tr><tr><td style="text-align: center; width: 204px;"><strong>Prefix[i]</strong></td><td style="text-align: center; width: 47px;">0</td><td style="text-align: center; width: 45px;">&nbsp;0</td><td style="text-align: center; width: 47px;">&nbsp;1</td><td style="text-align: center; width: 47px;">&nbsp;0</td><td style="text-align: center; width: 47px;">1</td><td style="text-align: center; width: 45px;">2</td><td style="width: 50px; text-align: center;" bgcolor="#7CFC00">3</td></tr></tbody></table>

Artık tablomuzu oluşturduğumuza göre ön işlem kısmı bitmiş ve arama bölümüne geçebiliriz.

## Arama İşlemi

<table style="height: 320px;" width="532"><tbody><tr><td style="text-align: center; width: 55px;">METİN</td><td style="text-align: center; width: 21px;"><b>A</b></td><td style="text-align: center; width: 20px;"><b>C</b></td><td style="text-align: center; width: 21px;"><b>A</b></td><td style="text-align: center; width: 21px;"><b>A</b></td><td style="text-align: center; width: 21px;"><b>C</b></td><td style="text-align: center; width: 21px;"><b>A</b></td><td style="text-align: center; width: 21px;"><b>C</b></td><td style="text-align: center; width: 21px;"><b>A</b></td><td style="text-align: center; width: 21px;"><b>A</b></td><td style="text-align: center; width: 21px;"><b>C</b></td><td style="text-align: center; width: 21px;"><b>A</b></td><td style="text-align: center; width: 21px;"><b>B</b></td><td style="text-align: center; width: 22px;"><b>A</b></td><td style="text-align: center; width: 22px;"><b>C</b></td><td style="text-align: center; width: 22px;"><b>A</b></td></tr><tr><td style="text-align: center; width: 55px;"></td><td style="text-align: center; width: 21px;" bgcolor="#7CFC00"><span style="font-size: 14pt;"><strong>A</strong></span></td><td style="text-align: center; width: 20px;" bgcolor="#7CFC00"><span style="font-size: 14pt;"><strong>C</strong></span></td><td style="text-align: center; width: 21px;" bgcolor="#7CFC00"><span style="font-size: 14pt;"><strong>A</strong></span></td><td style="text-align: center; width: 21px;" bgcolor="red">B</td><td style="text-align: center; width: 21px;">A</td><td style="text-align: center; width: 21px;">C</td><td style="text-align: center; width: 21px;">A</td><td style="text-align: center; width: 21px;"></td><td style="text-align: center; width: 21px;"></td><td style="text-align: center; width: 21px;"></td><td style="text-align: center; width: 21px;"></td><td style="text-align: center; width: 21px;"></td><td style="text-align: center; width: 22px;"></td><td style="text-align: center; width: 22px;"></td><td style="text-align: center; width: 22px;"></td></tr><tr><td style="text-align: center; width: 55px;"><b>–&gt;1</b></td><td style="text-align: center; width: 21px;"></td><td style="text-align: center; width: 20px;"></td><td style="text-align: center; width: 21px;" bgcolor="#7CFC00"><strong><span style="font-size: 14pt;">A</span></strong></td><td style="text-align: center; width: 21px;" bgcolor="red">C</td><td style="text-align: center; width: 21px;">A</td><td style="text-align: center; width: 21px;">B</td><td style="text-align: center; width: 21px;">A</td><td style="text-align: center; width: 21px;">C</td><td style="text-align: center; width: 21px;">A</td><td style="text-align: center; width: 21px;"></td><td style="text-align: center; width: 21px;"></td><td style="text-align: center; width: 21px;"></td><td style="text-align: center; width: 22px;"></td><td style="text-align: center; width: 22px;"></td><td style="text-align: center; width: 22px;"></td></tr><tr><td style="text-align: center; width: 55px;"><b>–&gt;1</b></td><td style="text-align: center; width: 21px;"></td><td style="text-align: center; width: 20px;"></td><td style="text-align: center; width: 21px;"></td><td style="text-align: --&gt;;" bgcolor="#7CFC00"><span style="font-size: 14pt;"><strong>A</strong></span></td><td style="text-align: center; width: 21px;" bgcolor="#7CFC00"><span style="font-size: 14pt;"><strong>C</strong></span></td><td style="text-align: center; width: 21px;" bgcolor="#7CFC00"><span style="font-size: 14pt;"><strong>A</strong></span></td><td bgcolor="red">B</td><td style="text-align: center; width: 21px;">A</td><td style="text-align: center; width: 21px;">C</td><td style="text-align: center; width: 21px;">A</td><td style="text-align: center; width: 21px;"></td><td style="text-align: center; width: 21px;"></td><td style="text-align: center; width: 22px;"></td><td style="text-align: center; width: 22px;"></td><td style="text-align: center; width: 22px;"></td></tr><tr><td style="text-align: center; width: 55px;"><b>–&gt;2</b></td><td style="text-align: center; width: 21px;"></td><td style="text-align: center; width: 20px;"></td><td style="text-align: center; width: 21px;"></td><td style="text-align: center; width: 21px;"></td><td style="text-align: center; width: 21px;"></td><td style="text-align: center; width: 21px;" bgcolor="#7CFC00"><strong><span style="font-size: 14pt;">A</span></strong></td><td style="text-align: center; width: 21px;" bgcolor="#7CFC00"><strong><span style="font-size: 14pt;">C</span></strong></td><td style="text-align: center; width: 21px;" bgcolor="#7CFC00"><strong><span style="font-size: 14pt;">A</span></strong></td><td style="text-align: center; width: 21px;" bgcolor="red">B</td><td style="text-align: center; width: 21px;">A</td><td style="text-align: center; width: 21px;">C</td><td style="text-align: center; width: 21px;">A</td><td style="text-align: center; width: 22px;"></td><td style="text-align: center; width: 22px;"></td><td style="text-align: center; width: 22px;"></td></tr><tr><td style="text-align: center; width: 55px;"><b>–&gt;2</b></td><td style="text-align: center; width: 21px;"></td><td style="text-align: center; width: 20px;"></td><td style="text-align: center; width: 21px;"></td><td style="text-align: center; width: 21px;"></td><td style="text-align: center; width: 21px;"></td><td style="text-align: center; width: 21px;"></td><td style="text-align: center; width: 21px;"></td><td style="text-align: center; width: 21px;" bgcolor="#7CFC00"><strong><span style="font-size: 14pt;">A</span></strong></td><td style="text-align: center; width: 21px;" bgcolor="red"><span style="font-size: 14pt;">C</span></td><td style="text-align: center; width: 21px;"><span style="font-size: 14pt;">A</span></td><td style="text-align: center; width: 21px;"><span style="font-size: 14pt;">B</span></td><td style="text-align: center; width: 21px;">A</td><td style="text-align: center; width: 22px;">C</td><td style="text-align: center; width: 22px;">A</td><td style="text-align: center; width: 22px;"></td></tr><tr><td style="width: 55px;"><b>&nbsp; –&gt;1</b></td><td style="width: 21px;"></td><td style="width: 20px;"></td><td style="width: 21px;"></td><td style="width: 21px;"></td><td style="width: 21px;"></td><td style="width: 21px;"></td><td style="width: 21px;"></td><td style="width: 21px;"></td><td style="width: 21px;" bgcolor="#7CFC00"><strong>A</strong></td><td style="width: 21px;" bgcolor="#7CFC00"><strong>C</strong></td><td style="width: 21px;" bgcolor="#7CFC00"><strong>A</strong></td><td style="width: 21px;" bgcolor="#7CFC00"><strong>B</strong></td><td style="width: 22px;" bgcolor="#7CFC00"><strong>A</strong></td><td style="width: 22px;" bgcolor="#7CFC00"><strong>C</strong></td><td style="width: 22px;" bgcolor="#7CFC00"><strong>A</strong></td></tr></tbody></table>

Bu arama işlemini de yaptıktan sonra aradığımız kelimeyi bulmuş oluyoruz. Yeşil olanlar eşleşmenin sağlandığı karakterler kırmızı olanlar ise hatalı eşleşmeleri temsil etmektedir. Birinci sütundaki okla gösterilmiş sayılar ise kaç karakter kayacağını göstermektedir. Bu kaydırma işlemini ise yukarıdaki tablo ve formüller sayesinde yapmaktayız.

### Örnek C Kodu

#include <stdlib.h>
#include <string.h>

void failure(char\* pattern, int\* f);
int kmp(char\* t, char\* p);

int\* init\_array(int size) {
  int\* arr = (int\*)malloc(size \* sizeof(int));
  int i;
  for(i = 0; i < size; i++) {
    arr\[i\] = 0;
  }

  return arr;
}

int main(void) {
  char\* pattern = "abacab";
  char\* text = "bbacbabcbabcbabbabcbabcbacbbbacbacbacbacbacbabacab";

  int match = kmp(text, pattern);

  printf("Match at: %d\\n", match);

  return 0;
}

int kmp(char\* t, char\* p) {
  int m = strlen(p);
  int n = strlen(t);

  int\* f = init\_array(m); 
  int i = 0;
  int j = 0;

  while (i < n) {
    if (t\[i\] == p\[j\]) {
      if (j == m - 1) {
        return i - j;
      }
      else {
        i += 1;
        j += 1;
      }
    }
    else {
      if (j > 0) {
        j = f\[j-1\];
      }
      else {
        i += 1;
      }
    }
  }

  return -1;
}

void failure(char\* p, int\* f) {
  f\[0\] = 0;
  int i = 1;
  int j = 0;
  int m = strlen(p);
  while (i < m) {
    if (p\[i\] == p\[j\]) {
      f\[i\] = j + 1; // j+1 matches up to the current character.
      i += 1;
      j += 1;
    }
    else if (j > 0) {
      j = f\[j - 1\];
    }
    else {
      f\[i\] = 0;
      i += 1;
    }
  }
}