---
title: "Windows IIS Kurulumu (Resimli Anlatım)"
published: 2019-01-12
description: "Merhabalar bu yazımızın konusu IIS (Internet Information Services) olacak. Bu konu hakkında genel bilgiler verdikten sonra, nasıl kullanıldığı, kurulu"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![Windows Iis - Windows IIS Kurulumu (Resimli Anlatım)](/wp-images/2019_01_windows_IIS-696x379.png "Windows IIS")](/wp-images/2019_01_windows_IIS.png)

Merhabalar bu yazımızın konusu IIS (Internet Information Services) olacak. Bu konu hakkında genel bilgiler verdikten sonra, nasıl kullanıldığı, kurulum gibi detaylı bilgilere değineceğim.

IIS yani internet sunucusu olarak düşünebiliriz. Microsoft tarafından geliştirilmiş olan bir windows sunucudur. Kısacası  windows tabanlı ve web üzerinden işlem yapan programların kullabileceği bir sunucu olarak görebiliriz. Localhost üzerinden web geliştirmeleri yapmak mümkündür. ASP.NET veya Visual Studio ortamında geliştirilmiş projeler IIS üzerinde uyumlu bir şekilde çalışmaktadır. Bu yüzden bu yazılımları geliştirmek ve görüntülemek için kullanılmaktadır. Uzak bir sunucu gereksinimini ortadan kaldırıp  localhost üzerinden web tabanlı projeleri test edebilmekteyiz. Bunlara ek olarak web server dışında FTP server olarak da kullanmak mümkündür.

## IIS KURULUMU

IIS kurulumu oldukça basittir. Kurulum için öncelikle Denetim Masasına giriyoruz. Ardından Programlar kısmına geliyoruz. Bunun kısa yolu olarak Windows+R yapıp Çalıştır menüsünden appwiz.cpl  yazarak ulaşabiliriz.

![2019 01 12 20 01 28 Min - Windows IIS Kurulumu (Resimli Anlatım)](/wp-images/2019_01_2019-01-12_20-01-28-min.png)

Ardından resimdeki gibi  Turn Windows features on or off kısmına tıklıyoruz.

![2019 01 12 20 02 43 Min - Windows IIS Kurulumu (Resimli Anlatım)](/wp-images/2019_01_2019-01-12_20-02-43-min.png)

Daha sonra karşımıza gelen ekrandan resimdeki gibi Internet Information Services kısmını seçiyoruz. Yukarıda bahsettiğim gibi FTP server olarak kullanmak istersek onu da seçmemiz gerekmektedir. Ardından OK seçeneğini seçiyoruz.

![2019 01 12 20 05 56 Min - Windows IIS Kurulumu (Resimli Anlatım)](/wp-images/2019_01_2019-01-12_20-05-56-min-e1547315407701.png)

Daha sonra bu ekran gelecek ve sonuç olarak Serverimiz kurulumu tamamlanmış olacak. Bu işlem bir iki dakika sürebilir.

![2019 01 12 20 08 52 Min - Windows IIS Kurulumu (Resimli Anlatım)](/wp-images/2019_01_2019-01-12_20-08-52-min.png)

Yükleme tamamlandıktan sonra karşımıza bir yönetim paneli gelmektedir. Bu panel üzerinden port ayarları serverimizin start stop restart gibi komutlarını ve diğer detaylı değişimleri yapmak mümkündür. Sol taraftaki Default Web Site sağ tıklayıp explore dediğimizde klasöre gitmekte. Sağ tarafta browse\*:80 yazan kısımda ise bu klasörde bulunan localhostumuzu çalıştıracaktır.

Ardından işlemlerin sisteme girmesi için bilgisayarımızı yeniden başlatmamız gerekiyor. Bilgisayar açıldıktan sonra C:inetpubwwwroot klasörü bizim localhost diyeceğimiz yer olacak. Bu dosya içerisinde  default olarak iisstart isminde bir html dosyası bulunmaktadır. Bizim bununla değil kendi yaptığımız html sayfasını koyup işlemleri yaptıracağız. O yüzden içerisine bir tane test.html koyalım. Ardından browser üzerinden localhost/test.html yazdığımızda bizim test.html sayfamıza ulaşacaktır. Bundan sonra artık html,css,js gibi tüm dosyaları wwwroot klasörüne ekleyeceğiz.

Microsoft son olarak IIS 10.0’ı piyasaya sürmüştür. Windows işletim sistemlerine özgün olduğundan ve diğer işletim sistemlerinde bulunmamaktadır. Aşağıda vereceğim linkler üzerinden güncel olarak kullanabilirsiniz.

[IIS 8.0](https://www.microsoft.com/tr-tr/download/details.aspx?id=34679)

[IIS 10.0](https://www.microsoft.com/tr-tr/download/details.aspx?id=48264)