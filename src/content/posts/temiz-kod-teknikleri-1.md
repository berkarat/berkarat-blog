---
title: "Temiz Kod (Clean Code)  Yazma Teknikleri ve Kodlama standartları   – 1"
published: 2021-03-15
description: "Merhaba bu yazımızın konusu daha az kod satırı yazarak daha efektif yani temiz kod şeklinde bir uygulama yazmamız için gerekli niteliklerden bahsedece"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![temiz kod](/wp-images/2021_03_cleancode.png "cleancode")](/wp-images/2021_03_cleancode.png)

Merhaba bu yazımızın konusu daha az kod satırı yazarak daha efektif yani temiz kod şeklinde bir uygulama yazmamız için gerekli niteliklerden bahsedeceğim.

Bir programlama diliyle bir uygulama oluşturmak kolaydır. Ancak bu uygulamanın maliyeti refactoring işlemi gibi işlemler ve güvenlik açığı ne kadar az ise yazdığınız kod o kadar kalitelidir. Bu tip işlemleri (temiz kod yazma ) peki nasıl yapacağız ? Bunun için dünya çapında geliştirilmiş bazı isimlendirme teknikleri, kodlama stilleri ve yardımcı extensionslar  gibi belli başlı yöntemler vardır. Bu yazımda bu yöntemlerin bazılarından ve kişisel deneyimlerimden edindiğim tecrübelerden başlayacağım. Konuya başlamadan önce dil olarak dünya dili olan İngilizce kullanmak yazılı olmayan bir kuraldır. Bu sayede başka kişilerin de anladığı bir ortam sağlanmaktadır.

 İlk adım olarak isimlendirme kuralları.

## **Metodların ve Tanımlamaların İsimlendirilmesi**

#### CAMEL CASE

Genel olarak kullanılan standartlardan   Camel Case  ve Pascal Case den bahsedeceğim.

Camel case ilk harf küçük geri kalan her kelimede büyük harf kullanılarak başlanması gerekmektedir. Örnek olarak  bir db connection string oluştururkene bu tipte yapılmaktadır.

“databaseConnectionString”

#### PASCAL CASE

Bir diğer standart ise Pascal Casedir bu da Camel case tarzında ancak her kelime başlangıcında büyük harf kullanılarak başlanmasıdır.

“DatabaseConnectionString”

Bir diğer kullanılan yöntem ise Uppercase yöntemidir. Genellikle struct ve enum tanımlarında kullanılır ve tüm harfler bütük olarak yazılmaktadır ve ayrım olarak da alt çizgi kullanılır.

Const DATABASE\_CONNECTION\_STRING=”test.mysql.com;user=berk;password=123”

## **Hataların yönetimi ve Loglama**

İlk olarak bir projeye başlamadan önce loglama sistemini oluşturmak gerekmektedir. Yukarıda bahsettiğim gibi bakım maliyetinin düşük olması kodunuzun kalitesini arttıracaktır. Bunun için de olası hataların ya da güncellemelerin sebebini bulmak gerekmektedir. Bu durumu da ancak log kayıtlarından erişebiliriz. Kayıtları kullanmak için kimi sistemler text olarak tutarken kimisi database üzerinde tutarken bazı özel işlerde şifreli bir şekilde cloud üzerine anlık depolanabilmektir. Ben genel projelerimde Log4net hazır tool kullanmaktayım. Gelişmiş özelleştirebilir bir tool olduğu için tercih etmekteyim.

Hatalar konusunda da olmazsa olmaz .NET için try catch finally bloklarıdır. Ancak bu blokları ard arda kullanmak uygulamanın hızı ve maliyeti açısından çok fazlalık yaratmaktadır. Bunu ben son aşamada kullanmayı tavsiye ediyorum. Çünkü iç içe dallanan bir fonksiyon kümesinde kullanmak n^\* kadar bir maliyet çıkarır ki bu da çok fazladır. Örneğin database üzerinden veri alacak ve ekranda gösterecek bir web projesinde controller için bir try catch yerine database yani repository katmanında try catch koymak daha mantıklıdır. Eğer uygulamanızın throw atmayıp devam etmesini de istiyorsanız finally catch bloğunu da kullanmanız gerekmektedir. Execption kısmında ise birden fazla özelleşmiş tip vardır. Bunlardan biri de ThreadException. Bu threadlerin abort olmadığı durumlarda gibi olaylarda kullanılmaktadır.

### **Yorumlar, Summary, Gruplandırma ve TODO kavramı**

-   Kodlamaya ilk başlangıçta genel olarak tavsiyem her metodunuza comment yazmanızdır. Çünkü yazdığınız kodda ileride dönüp bakınca ne işe yaradığını anlamak için bir açıklama yazısı çok işe yarayacaktır. Ancak daha ileri seviyelerde özel durumlar haricinde comment kodun kalitesini bozmaktadır. Örneğin bir sql connection yapan fonksiyona ekstra comment yazmak yerine metodun adını doğru vererek bu sorunu giderebiliriz.
-   Summary ise genelde apiler için kullanılan fonksiyon üzerinde örnek request gibi ya da yaptığı işlemi açıklayan kısa metinler olan durumlarda kullanılır.
-   Gruplandırma işlemi için ise region tagi içerisinde kod bloğunu yazmanız sizin kodunuzu daha okunabilir ve temiz olması açısından fayda sağlamaktadır.
-   TODO ise olmazsa olmazlardandır. Karışık bir projede takım arkadaşlarınızın verdiği bilgileri ya da yapılacak işleri taglemek için TODO tagi kullanılır. Özel bir durum olduğu için Visual Studio –> Output içerisinden eklenen TODOları görebilirsiniz.

Daha detaylı bilgileri w3.org sayfasında bulabillirsiniz. 

[Daha Fazla Bilgi İçin](https://www.w3.org/standards/)