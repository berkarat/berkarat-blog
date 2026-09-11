---
title: "Azure Cognitive Services FACE"
published: 2020-01-05
description: "Merhabalar bu konumuzda Azure Marketinde bulunan servislerin genel kullanımından servislerin yapısına biraz giriş yapacağım."
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![Azure cognitive-service](/wp-images/2020_01_cognitive-service-696x348.png "cognitive-service")](/wp-images/2020_01_cognitive-service.png)

Merhabalar bu konumuzda Azure Marketinde bulunan servislerin genel kullanımından servislerin yapısına biraz giriş yapacağım.  
Azure portalda bulunan servisler bizlerin kullanması için hazır hale getirilmiş binlerce servis API bulunmaktadır. Bu servisleriden birisi olan FACE isimli servisin kullanımını ve örnek uygulamasını yapacağım. Bu gibi binlerce apilerin oluştuğu servislere Azure ortamında Cognitive Services adı verilmektedir. Market içerisinde bu şekilde arama yaparak da bulabiliriz.

Face servisi bulut tabanlı olarak geliştirilmiş bir yüz tanıma sistemidir. Artık sıfırdan yüz tanıma sistemi yazmak onun eğitimlerini testlerini gerçekleştirmek günümüzde anlamını yavaş yavaş yitirmektedir. Çünkü bu uygulama bizim için bunları yapmaktadır.

## Azure Cognitive Services Kullanımı

Bu servisler bizim kullanınımımız için markette mevcutlar. Bunun için bir azure hesabınız olmalıdır. Hesap oluşturmak için [https://azure.microsoft.com/tr-tr/free/](https://azure.microsoft.com/tr-tr/free/) bu linki tıklayarak oradan üyelik oluşturmanız gerekmektedir. İlk 12 ay boyunca ücretsiz kullanma imkanı sağlıyor. Benim de göstermiş olacağım uygulamaları da bu sayede gerçekleştirebiliriz.

#### Azure Cognitive Services Face

Markete ve birçok diğer şeylere ulaşmak için azure portal içerisine girmemiz gerekmektedir. Bu portala girdikten ve login olduktan sonra karşımızda solda Create Resource yani kaynak oluşturmamız gereken yeşil artı işaretine tıklıyoruz ve market açılıyor. Bu markette search kısmında Face uygulamasını aratıyoruz. Ardından Create diyerekp aşağıdaki var olan boşlukları doldurup ilerliyoruz ve finish diyerek oluşturuyoruz.

Bu işlemleri başarılı gerçekleştirdikten sonra artık bu servisi kullanabilmekteyiz. Bizim bu servisi kullanmamız için bir KEY ve API point veriyor. Bu key sayesinde uygulamamıza entegrasyon işlemlerini gerçekleştireceğiz.

-   ![Azure Cognitive Services Faceapp - Azure Cognitive Services FACE](/wp-images/2020_01_azure-cognitive-services-Faceapp-1024x483.png)
    
-   ![Azure Cognitive Services Face - Azure Cognitive Services FACE](/wp-images/2020_01_azure-cognitive-services-Face-1024x631.png)
    
-   ![Azure Cognitive Services - Azure Cognitive Services FACE](/wp-images/2020_01_azure-cognitive-services--1024x580.png)
    

[http:// https://azure.microsoft.com/tr-tr/features/azure-portal/](<http:// https://azure.microsoft.com/tr-tr/features/azure-portal/ >)

Artık projemizi oluşturma kısmına geçebilriz. Visual Studio üzerinden console app oluşturuyoruz. Ardından aşağıdaki kod bloğunu uyguluyoruz. Bu kod bloğunda bir api çağırma işlemi yapıyoruz. Header kısmına subscriptionKey yazıyoruz. Daha sonra istediğimiz request parametreleri de yazıyoruz. Bunlar içerisinde saç rengi göz rengi cinsiyet yaş gibi özellikler de var. Ardından apiye resmimizi byteData haline çevirip gönderdikten sonra gelen bilgiyi de json olarak elde ediyoruz.

Genellikle doğru sonuçlara ulaşşa da bazen hata yapabilmektedir. Ancak bunların gelişmesiyle birlikte çeşitli projeler uygulanabilirlik artmakta ve başka fikirlerle birleştirilerek daha büyük projelerde cognitive services kullanabiliriz.

Projeye dair örnek uygulamayı github ve azure repos linkleri aşağıdadır.

[https://github.com/berkarat/Azure-Cognitive-Services-Face](https://github.com/berkarat/Azure-Cognitive-Services-Face)

[https://dev.azure.com/berkarat93/\_git/Azure-Cognitive-Services-Face](https://dev.azure.com/berkarat93/_git/Azure-Cognitive-Services-Face)