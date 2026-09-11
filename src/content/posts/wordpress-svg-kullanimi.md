---
title: "WordPress SVG Kullanımı ve Resim Optimizasyonu"
published: 2018-02-11
description: "Merhabalar wordpress kullanıcıların en temel sorularından birisi de google’da nasıl üst sıralara çıkacağıdır. Bunun için SEO(Search Engine Optimizatio"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![svg](/wp-images/2018_02_qq-min-696x696.png "svg")](/wp-images/2018_02_qq-min.png)

Merhabalar wordpress kullanıcıların en temel sorularından birisi de google’da nasıl üst sıralara çıkacağıdır. Bunun için SEO(Search Engine Optimization) yöntemleri bulunmaktadır. Ancak buna ek olarak site hızımız da önemli bir yer tutmaktadır. Site hızımızı yavaşlatan şeylerden birisi de resimlerdir. Resimleri nasıl yüklemeli, nelere dikkat etmeli ön sıralarda yer almak için bir kaç ipucu hakkında bahsedeceğim. SVG’nin ne olduğundan ve svg olarak sitemize nasıl resim yükleyebileceğimizden bahsedeceğim.

# Normal Resim Yükleme

Öncelikle yeni bir yazı eklemek için yeni yazı ekleme kısmına gidiyoruz ve içerik eklemek istiyoruz. Bunun için Ortam Ekle->Dosya Yükle-> Dosya Seçin -> İstenilenResim ->Yazıya ekle. En basit olarak yazımıza sayfamıza veya logomuza resim yüklemeleri böyle yapıyoruz.

![wordpress Resim yükleme](/wp-images/2018_02_2-1-1024x418.png)

Ancak bu kadar basit olmasının da bir bedeli olacak. Nedir bu bedel? Çok yer kaplaması. Bizim yüklediğimiz resmi bir sıkıştırma işleminden geçirmeden doğrudan yükledik. Bunun bize zararları en başta sunucuda ekstradan yer kaplayacak ve sayfanın yüklenmesini geciktirecek. Peki bunu nasıl sıkıştırabilirim?

# Resim Sıkıştırma

Resimlerin boyutlarını sıkıştırma işlemine optimizasyon diyoruz. Bu sayede hem seo alanında ön plana çıkmamıza hem de sitemizin performasına olumlu yönde etkileri bulunmuş oluruz. Ben kendi sitemde [http://compressjpeg.com](http://compressjpeg.com) sitesini kullanarak resimleri buradan sıkıştırıp optimize ettikten sonra siteme yüklüyorum. Bu sayede sunucumda yerden de tasarruf etmiş bulunuyorum

![Resim Sıkıştırma](/wp-images/2018_02_3-1-1024x546.png)![Resim Sıkıştırma](/wp-images/2018_02_4-1-1024x546.png)

# SVG(Scalable Vector Graphics) ile Resim Yükleme

SVG( Ölçeklendirilebilir Vektör Grefikleri) yapısı XML tabanlı iki boyutta grafiklerde tanımlama yapabilmek için W3C tarafından çıkarılmış bir vektör dilidir. Daha çok butonlarda ve logolarda kullanılan bu dil tamamen xml tabanlı olduğundan dolayı kapladığı alan çok çok küçüktür. Bu sebeple grafik çizimleri, tablolar gibi vektörel çizimlerde kullanmak büyük bir avantaj sağlamaktadır.

WordPress SVG ile resim yüklemeyi güvenlik sebepleriyle desteklememektedir. Ancak bunu yapmanın birden fazla yolu vardır. İlk ve en güvenilir yol [SVG Support](https://tr.wordpress.org/plugins/svg-support/) eklentisini kurarak svg formatındaki resimlerimizi yüklemek mümkündür. Bu eklentiyi kurduktan sonra etkinleştiriyoruz ve yukarıda bahsettiğim şekilde resim yükleme yapabiliriz. Bu  formatta olan resimleri ekstra bir optimizasyon işlemine tabii tutmaya gerek yoktur. Zaten metin tabanlı olduğundan dolayı bu işlemi yapmak pek mümkün değildir.

SVG dosyalarımızı yüklemenin başka bir yolu metin yazarken kod bloğu olarak yazımızın içeriğine eklemektir.

<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="121px" height="61px" version="1.1" content="&lt;mxfile userAgent=&quot;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.119 Safari/537.36&quot; version=&quot;8.0.9&quot; editor=&quot;www.draw.io&quot; type=&quot;device&quot;&gt;&lt;diagram id=&quot;c438b003-446f-c312-e4c8-7f790d17b349&quot; name=&quot;Page-1&quot;&gt;rZTBjpswEIafxsdKgCOSPW5ositV7aGRtmcHT8BaY1PHKaRP3wHGIYTsqlWXQ2J/M/bY8//AeFa1T07U5VcrQbMkki3jn1mSrJYJ/nbgPIBFtBpA4ZQcUDyCnfoNBCOiJyXhOEn01mqv6inMrTGQ+wkTztlmmnawelq1FgXMwC4Xek5/KOlLonH6MAaeQRUllV4lyyGwF/lr4ezJUD2W8EP/DOFKhL3oosdSSNtcIb5hPHPW+mFUtRnorrWhbcO67RvRy7kdGP83C0inX0KfIJy4P5c/h170t4EuP2J83ZTKw64WeRdtUHxkpa80zmIcHr2zr5BZbV2/mkfRFp9LJHSzyz0orUOmsQY3XBdOSIVHv8EHa/xWVEp3dnoBJ4URhMk7K5pOKncPcqFVYZDluDFgcE13BuehfbNv8UUNNDnYCrw7Ywot4JwEJIPHC5o3V3YJIpdXTkmJCXJocdl6VAkHJNR90fgd0VLtqQUT9dKfJxsCn459rx4xIV7W7RjEUUH//S77AHYvT5jMMs4e0u/fNl9CAh5wf7sI2VA94BsbYa/9e14JUs9NMdOvU07hy/pIgUpJ2ZW5a86pff/PSR9hnOWNcdK5cRZ3fJP8u29wOn5I+tjVx5pv/gA=&lt;/diagram&gt;&lt;/mxfile&gt;" style="background-color: rgb(255, 255, 255);"><defs/><g transform="translate(0.5,0.5)"><rect x="0" y="0" width="120" height="60" fill="none" stroke="#00ffff" pointer-events="none"/><g transform="translate(25.5,10.5)"><switch><foreignObject style="overflow:visible;" pointer-events="all" width="68" height="38" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"><div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block; font-size: 8px; font-family: Verdana; color: rgb(0, 0, 0); line-height: 1.2; vertical-align: top; width: 68px; white-space: normal; word-wrap: normal; text-align: center;"><div xmlns="http://www.w3.org/1999/xhtml" style="display:inline-block;text-align:inherit;text-decoration:inherit;"><font style="font-size: 17px"><b>SVG ÖRNEK</b></font></div></div></foreignObject><text x="34" y="23" fill="#000000" text-anchor="middle" font-size="8px" font-family="Verdana">\[Not supported by viewer\]</text></switch></g></g></svg>

Bu Html örneğini bir text editörde HTML olarak kaydettiğimizde karşımızda şu ekran gelecektir.

![svg Örnek](/wp-images/2018_02_svg.jpg)

İlk bakışta çok fazla metin resimle aynı yer kapladığı düşünülebilir ama durum böyle değildir. Text tabanlı olan bu html kodunun boyutu çok daha küçüktür.

Bu konuyla ile ilgili örnek uygulamalara W3School tutorial sitesinde ulaşmak mümkündür. Belli animasyonlar yapmak da mümkündür. https://www.w3schools.com/graphics/svg\_intro.asp

Sonuç olarak bu gibi yöntemleri kullanarak en iyi şekilde SEO ayarlarını ve site hızlandırma işlemlerinden bazılarını yapmak mümkündür. Ne kadar küçük dosya demek o kadar hızlı yükleme anlamına gelmektedir.