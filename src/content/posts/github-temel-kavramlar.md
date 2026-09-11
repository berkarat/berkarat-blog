---
title: "GitHub Temel Kavramlar"
published: 2021-03-28
description: "Merhaba bu yazımız github üzerinde proje paylaşma hakkında yazımızın ([Visual Studio Github Publish İşlemi &8211; Resimli Anlatım](https://blog.berkar"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![Azure Repos - Azure DevOps & Azure Repos Git Depolama](/wp-images/2019_03_azure-repos.png "azure repos")](/wp-images/2019_03_azure-repos.png)

Merhaba bu yazımız github üzerinde proje paylaşma hakkında yazımızın ([Visual Studio Github Publish İşlemi &#8211; Resimli Anlatım](https://blog.berkarat.com/github-publish/) ) devamı niteliğindedir. Bu yazıda github üzerinden dosya paylaşımını branch oluşturma rebase işlemleri gibi konulara değineceğim.

İş hayatında bir proje üzerinde birden fazla kişinin çalıştığı projelerde kullanımınında source code kavramı olmazsa olmazdır. Bunlara örnek olarka bitbucket da kullanılabilir ancak ben github üzerinden örneklendireceğim bunun kullanımları benzerdir.

![Github Master - GitHub Temel Kavramlar](/wp-images/2021_03_github-master-300x163.png)

![Github - GitHub Temel Kavramlar](/wp-images/2021_03_github-171x300.png)

## Github Branch Oluşturma?

Branch kelime anlamı oolarak kol dal olarak telaffuz edilmektedir. Ancak bizim dilimizde bir projenin yapılacak bir kısmı olarak belirtilmektedir. Örnek olarak hesap makinesi üzerinden gideceğim. Projemizde 2 kişinin çalıştığını düşünürsek bunlardan birincisi toplama çıkarma diğer grup ise bölme ve çarpma işleemlerini gerçekleştirsin. Projemizin bir adet master adında ana bir dosyası vardır. Bu master dosyasından bir alan oluşturarak bu projenin bir anlamda kopyasını almaktayız. Bu alan içerisinde artık kendi alanımızda hareket etmekteyiz. Burada toplama ve çıkarma fonksiyonlarını yazarken takım arkadaşımız paralel olarak bölme ve çarpma fonksiyonlarını yazabilmektedir. Burada bağımsız bir şekilde hareket etme özgürlüğü ve projenin hızlı ilerlenmesi hedeflenmektedir.

Bizim oluşturduğumuz branch sayesinde bağımlılığı oratadan kaldırarak proejmizde kendi adımıza bir alanın kodlamasını gerçekleştirebiliriz.

## Github Commit nedir ?

Commit kaydet olarak dilimize geçmiştir. Yazdığımız kodda bir değişiklik yaptığımızda commit alanı değişikliğe uğrar ve bizi kaydetmemiz için bir uyarı verir. Burada olay aslında bir anlamda kaydetmek ancak source code üzerinde kayıt anlamına gelmektedir. Yaptığımız değişiklikleri git gibi alanlarda kaydetmeye yarar.

## Rebase ve Sync Nedir?

Sync kelime olarak senkronize etmek anlamına gelir. Bir projede birden fazla kişi çalışırken master (ana proje )projesinde birden fazla kişi projede değişikler yapmaktadır. Burada sizin yazdığınız kodda olan ve ana projeyi etkileyen durumlar olabilmektedir. Örnek vermek gerekirse .Net Core için örneğin bir mapper eklediniz ve bu mapperın projeye eklenmesi gerekir. Aynı anda başka birisi de bir mapper eklediğinde bunun sync yani eşlenmesi gerekir. Bunun için projemize rebase yani ana projeden örnek alıp bizim projemizle aynı duruma getirmemiz gerekir ki bu da projenin devamlılığı için gereklidir.

## Pull Request Nedir ?

Projelerde genelde bir istek ve tamamlanma durumu söz konusudur. Yazılımcı olarak siz kodunuzu yazarsınız ve tamamlandığını düşündüğünüz anda projenizi merkeze aktarmak istersiniz. Bu durumda direkt erişimin engellenmesi ve kontrollerin sağlanması için bir onay mekanizması vardır. Bu onayı bir veya birden fazla kişinin onayından geçtikten sonra ana projeye publish edilir. Buradaki asıl amaç yazılan kodun verimliliği ve doğruluğunun kontrolünün sağlanmasıdır.

## Conflict nedir ?  

Conflict kelime olarak ayrılık olarak algılanır. Genelde aynı projenin belli bölümlerinde çalışan developerlar arasında yaşanılır. Örnek vermek gerekirse siz toplama işleminde x=x+1; kullanırken diğer yazılımcı x++; olarak kullanmıştır. Bunlar temelde aynı şeylerdir. Ancak kod tarafında farklı olarak algılanır ve bunun bir ayırma gitmesi gerekir. Ya da daha önce birini eklediği kod ile sizin onu düzenlemeniz sonucu çıkan yeni bir kod bloğu oluşur. Bu da sonuç olarak bir fark yaratır. Bu farkta en güncel olan ve doğru olan kod bloğu merge edilir.

Burada aynı zamanda sizin yazdığınız kod ile merkezdeki (master) kod bloğu eşleşmediği durumlarda farklılıklar ortaya çıkmaktadır. Burada en doğrusu rebase alarak master üzerindeki kod ile sizin yazdığınız kodun karşılaştırılması ve doğru olanın son olarak mastera gönderilmesidir.