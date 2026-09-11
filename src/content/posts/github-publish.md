---
title: "Visual Studio Github Publish İşlemi – Resimli Anlatım"
published: 2019-03-10
description: "Merhabalar bu yazımızda Visual Studio kullanarak Github publish işleminden bahsedeceğim. Öncelikle bu konu proje geliştirme safhasında olmazsa olmaz k"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![Gt 2](/wp-images/2018_02_gt-2-696x365.png "github publish")](/wp-images/2018_02_gt-2.png)

Merhabalar bu yazımızda Visual Studio kullanarak Github publish işleminden bahsedeceğim. Öncelikle bu konu proje geliştirme safhasında olmazsa olmaz konulardan biridir. Kimse o kadar emek verdiği projeyi yedek almadan çalışmak istemez. Ayrıca takım olarak çalışılması gereken projelerde projenin farklı yerlerden de ulaşılıp güncellenebilmesi için Github örneğinden bahsedeceğim.

Daha önceki yazım olan [](https://blog.berkarat.com/github-proje-yukleme/)[https://blog.berkarat.com/github-proje-yukleme/](https://blog.berkarat.com/github-proje-yukleme/) bu konuyu manuel olarak da anlatmıştım. Ancak burada yaptığımız işlem kendi bilgisayarımızda bir depolama alanı oluşturuyoruz ve orada olan işlemleri teker teker sürükleyerek güncelliyorduk. Bu sefer yapacağımız işlemi otomatik bir biçimde Visual Studio kullanarak yapacağız.

## Github Ayarları

İlk önce yapmamız gereken bir adet proje açıyoruz. Ben burada örnek olarak testappforgithub adından bir console uygulaması açtım. Ardından tools>Extensions and Updates kısmından Online bölümüne tıklıyoruz. Search kısmına GithubExtensions for Visual Studio yazıyoruz ve yükleme işlemini gerçekleştiriyoruz. Bu yükleme ardından programı tekrar açıp kapatmamız gerekmektedir.

-   ![Github 6 - Visual Studio Github Publish İşlemi - Resimli Anlatım](/wp-images/2019_03_github-6.png)
    
-   ![Github 7 - Visual Studio Github Publish İşlemi - Resimli Anlatım](/wp-images/2019_03_github-7.png)
    

## Github Repository Oluşturma

-   ![Github 9 - Visual Studio Github Publish İşlemi - Resimli Anlatım](/wp-images/2019_03_github-9.png)
    
-   ![Github 11 - Visual Studio Github Publish İşlemi - Resimli Anlatım](/wp-images/2019_03_github-11.png)
    

Bu işlemleri gerçekleştirdikten sonra publish işlemi için sağ tarafta bulunan Team Explorer bölümüne tıklıyoruz. Burada karşımıza 3 adet Connect bağlantısı çıkıyor. Bir tanesi Azure DevOps ( buna başka bir yazıda değineceğim.) bir diğeri ise Github ([https://github.com/](https://github.com/)). Bizim burada ilgilenmemiz gereken konu burasıdır. Eğer daha önceden bir github hesabınız yok ise ücretsiz olarak oluşturmanız gerekmektedir. Bu işlemleri yaptıktan sonra sol altta connect kısmını seçip hesabımıza giriş yapıyoruz. Giriş başarılı olduktan sonra sağ tarafta eğer daha önceden varsa repositorylerimiz teker teker çıkıyor. İster burada güncelleme yapmamız için istersek de yeni bir alan oluşturmak için seçenekler mevcut.

-   ![Github 1 - Visual Studio Github Publish İşlemi - Resimli Anlatım](/wp-images/2019_03_github-1-588x1024.png)
    

![Github 10 - Visual Studio Github Publish İşlemi - Resimli Anlatım](/wp-images/2019_03_github-10.png)

Biz yeni bir alan oluşturmak istediğimiz için Create seçeneğini seçip çıkan ekranda alan adını, açıklama gibi ilgili alanları dolduruyoruz. Github public paylaşımlar için ücretsizdir ancak private bir paylaşım yapmak için ücret talep etmektedir. Bu sebeple private seçeneğini işaretlemeden devam ediyoruz. Artık alanımızı oluşturduk. Geriye yapmamız gereken tek şey bu depolama alanını doldurmak.

## Github Publish İşlemi

![Github 1 - Visual Studio Github Publish İşlemi - Resimli Anlatım](/wp-images/2019_03_github-1-588x1024.png)

Burada ise yazdığımız kod bloğunu veya classları artık paylaşmamız gerekmektedir. Bunun için birkaç seçenek mevcuttur. Bunlardan ilki Team Explorer kısmına gelerek changes alanına tıklamaktır. Ardından değişiklik yaptığımızı bize gösteren ibare bulunmaktadır. Üstte de açıklama kısmı yer almaktadır. Örneğin yaptığımız güncellemenin özetini buraya yazabiliriz. Böylece ileri bir zamanda baktığımızda güncelleme sebebimizi rahatlıkla görebilmelteyiz. Daha sonrasında Commit All kısmını seçiyoruz. Commit All sadece localdeki repositoryleri güncellemektedir. Commit All and push ve sync seçenekleri github hesabınızda oluşturduğunuz alanın da güncellenmesini sağlamaktadır.

## Failed to Push Hatası

  
Eğer bu işlemde aşağıdaki hata ile karşılaşıyorsanız. Yapmanız gereken Visual Studio güncellemelerini kontrol etmektir. Bu sebeple bu hatayı vermektedir. Güncellemeleri yaptıktan sonra işlemi başarıyla gerçekleştirebiliriz.

![Fail - Visual Studio Github Publish İşlemi - Resimli Anlatım](/wp-images/2019_03_fail-1024x265.png)

_“Failed to push the branch to the remote repository. See the Output window for more details.”_

## Incoming Commits

Yukarıda bahsettiğim olaylar bizim bir projeyi publish etme işlemleriydi. Ancak başka birinin güncelleme yapması durumunda o bilgileri de almamız gerekmktedir. Bunun için Synchronization kısmında Incoming Commits alanından Fetch tıklayarak bir değişiklik olup olmadığını kontrol edebiliriz. Eğer var ise Pull işlemi ile projemize ekleyebiliriz.

![Github 5 - Visual Studio Github Publish İşlemi - Resimli Anlatım](/wp-images/2019_03_github-5-588x1024.png)

Ardından github hesabımıza girip kontrol ediyoruz. Baktığımızda güncellemeler ve açıklamalarıyla birlikte history kısmında görebiliyoruz. Burada + ile işaretli yerler o güncellemede değişen yerleri göstermektedir.

![Github 4 - Visual Studio Github Publish İşlemi - Resimli Anlatım](/wp-images/2019_03_github-4-970x1024.png)

Genel olarak yazıya değinirsek github publish işlemleri birden fazla kişinin çalışıtığı ortak projelerde olmazsa olmaz bir yapıdır. Bu sayede son güncellemelerden haberdar olabilecek ve mesafe sorunu yaşamadan projelere ulaşabileceksiniz.