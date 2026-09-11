---
title: "CDN (Content Delivery Network) Nedir?"
published: 2020-01-10
description: "CDN (_Content Delivery Network_) bir içerik dağıtım ağı olup sitelerin perfromansı için olmazsa olmazdır. Büyük sitelerin hemen hepsinde karşınıza çık"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![Cdn - CDN (Content Delivery Network) Nedir?](/wp-images/2020_01_cdn-696x348.png "cdn")](/wp-images/2020_01_cdn.png)

CDN (**_Content Delivery Network_**) bir içerik dağıtım ağı olup sitelerin perfromansı için olmazsa olmazdır. Büyük sitelerin hemen hepsinde karşınıza çıkıp sorun yaşamanızı engellemektedir.

  
CDN Web sitelerinin performansını arttırmak aynı zamanda kaynak tüketimini de azaltmak için İçerik Dağıtım Ağı kullanılmaktadır. Statik içerikleri, istek gönderen kullanıcıya en uygun sunucudan göndererek hız ve trafik kullanımı açısından büyük bir kazanç sağlar. Bu statik içerikler genellikle sitedeki resimler, videolar,CSS dosyaları gibi içeriklerdir.

Bu hizmet genellikle içerisinde çok fazla içerik barındıran veya trafik yoğunuluğu yüksek olan siteler için kullanılır. Az da olsa düşük trafikli siteler için de sunucu olarak kullanılabilmektedir. Sitelerde içerik sayısı arttıkça ya da istek sayısı sıklaştıkça performansta kayıplar kaçınılmazdır.Burada  hizmeti devreye girmekte ve performans sorununu çözüp sitenin hızını arttırabilirsiniz. Kısaca özetlersek web sitesinin en hızlı bir biçimde ve gecikmeyi minimize ederek kullanıcıya ulaştırmasını sağlayan çeşitli lokasyonlarda bulunan sunucu kümeleridir.

![Cdn - CDN (Content Delivery Network) Nedir?](/wp-images/2020_01_cdn.jpeg)

### **Nasıl Çalışır?**

CDN web sitesine ulaşmak için tarayıcıya o sitenin adresini yazıp sitenin bulunduğu sunucuya bir istek göndeririz.Bu sitenin içeriklerinin barındığı bir sunucu vardır. Bu sunucu sizin  istek yaptığınız lokasyon ne kadar yakınsa, sunucuda ne kadar az trafik yoğunluğu varsa istek o kadar hızlı bir şekilde yanıtlanır. Aynı sunucudan çok fazla istekte bulunulduğu zaman donma hata verme gibi sorunların oluşması kaçınılmazdır.

Bu sırada CDN çözümü devreye girmektedir. Sitenin içeriklerini tek bir sunucuda değil birden fazla sunucuda tutar ve cachleme işlemi yaptığından tekrar origin siteden içerik çekmez. Bu da en uygun lokasyonu ya da en az trafik olan yoldan isteğin yanıtlanmasını sağlar. Bu sayede ağda bir dengelenme olmuş ve bir yerin yoğunluk yaşayıp çökmesi gibi problem de ortadan kaldırılmış olur.

### **CDN Çeşitleri Nelerdir ve Nasıl Kullanılır?**

-   **Pull & Push**

En yaygın kullanılanı Pull CDN’dir. Kullanımı için sitenizde bulunan statik içeriklerin kaynaklarını değiştirmenizle geçiş yapılacak. Kaynak değişimi için URL adreslerini yenisi ile değiştirmek gerekmektedir. Sunucu ilk isteği sizin web sunucunuz üzerinden otomatik çekecek ve ardından gelen istekler bu hizöeüzerinden yanıtlanacaktır.

Push CDN için ise sağlayıcı tarafından verilmiş bir FTP alanına static içeriklerin yüklenmesi ile artık isteklerde sabit alanlar üzerinden yanıtlanacaktır.

-   **VOD Pull & Push** **CDN** **(Video On Demand)**

Pull ve push Cdn  ile aynı şekilde çalışmaktadır. Ancak bu tür daha çok videolar için kullanılmaktadır. Örneğin e-spor yayını yapan siteler için bu türü kullanmak avantaj sağlamaktadır. Videoların optimizasyonu gibi ekstralar ile daha da performans sağlanmaktadır.

**Hangi Durumlarda İhtiyaç Duyulur?**

Yukarıda bu sunucu kümelerinin daha çok sabit yapıların olduğu web sitelerinde kullanılmasının yanı sıra haber sayfaları e-ticaret siteleri gibi yüklenme süresinin de önemli olduğu sitelerde de kullanılmaktadır.

Çalışma yapısı olarak bir kümeleme ağ yapısıdır. Bir tane origin olarak isimlendirdiği asıl sunucu bulunmakta ve ağlar esas gereken bilgileri buradaki sunucudan almaktadır. Bu bilgileri istenilen süreye bağlı olarak cacheler. Bu süre dolduğunda yeniden istek gönderilerek bilginin yenilenmesi sağlanır. Genellikle cacheleme işlemini yaptığı dosyaları da sıkıştırma işleminden geçirip optimize eder bu sayede performansa ek katkı sağlanmış olur.

**_Hizmetlerden en çok yaralanan site tipleri şunlardır:_**

-   Haber Siteleri
-   E-Ticaret Siteleri
-   Online Oyun Hizmeti Veren Siteler
-   Haberleşme Siteleri

Kurulumu hakkında bilgilendirici bir yazı

> [WordPress CDN Kurulumu](https://boraarat.com/wordpress-cdn-kurulumu/)