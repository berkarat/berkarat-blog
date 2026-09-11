---
title: "Windows Service ve Application İşlemleri"
published: 2019-01-06
description: "Merhabalar bu yazımızda windows üzerinde çalışan uygulamalar ve servisler ile ilgili bazı işlemler yapacağız. Bunlar Start, Stop , Restart ve Status s"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![C Logo - C# QrCode Generator Uygulaması (Logo eklenebilir)](/wp-images/2018_10_c-logo-696x748.png "c# logo")](/wp-images/2018_10_c-logo.png)

Merhabalar bu yazımızda windows üzerinde çalışan uygulamalar ve servisler ile ilgili bazı işlemler yapacağız. Bunlar Start, Stop , Restart ve Status sorgulama işlemleri olacaktır. Bu bizim ne işimize yarayacak. Yazacağınız bir monitoring uygulamasında kullanabiliriz. Daha önceki [soket programlama](https://blog.berkarat.com/c-socket-programlama/) yazısındaki soket işlemleri ile birleşince uzaktaki windows makine içindeki service ve uygulamalar üzerinde yönetim elde edebiliriz. Bu da bize tam yetki vermekte ve işimizi rahatlıkla uızaktan yapmamıza yaramaktadır. Bu işlemleri bir console uygulaması olarak yazacağız. İsteğe göre diğer teknolojilere de uyarlayabilirsiniz. Yazımızın birinci kısmında application üzerinden devam edeceğim .

## Application Start

Uygulamamızı start metodunu yazacağız. Bunun için bir app sınıfı oluşturuyoruz. Böylece karmaşıklıktan kurtuluyoruz.

using System.Diagnostics;

Diagnostics namespaceini ekliyoruz. Process sınıfına ulaşmamıza yarayan bir namespacedir.

İlk adım olarak  appnin adını ve dosya yolunu kullanıcıdan alıyoruz. Daha sonra Process sınıfındanbir metod  türetiyoruz. Bu metodda procesnameinden yola çıkarak getprocess metodu ile işleme başlıyoruz. Eğer açıkta bir process yok ise bize null değer dönecek. Eğer açıkta bir process var ise start işlemi gerçekleşmez ve mesaj olarak dönüş yaparız.

Process metodundan proc diye bir nesne türetiyoruz. Arından filename için verdiğimiz dosya yolunu + name.exe olarak belirliyoruz. Ardından Start metodunu çağırıyoruz. Eğer işlem başarılı ise uygulamamız çalışmaya başlayacak. Değilse zaten exceptiona düşecektir.

#### Not:

Burada bazı uygulamaların açılması için onay isteyebilir. Bunu VisualStudio’yu veya exeyi admin olarak çalıştırmamız gerekmektedir. Bu durumda izinler ayarlanmış olduğundan bu soruyu sormayacak ve direkt çalışacaktır.

try
          {
              string \_appname = \_apppath + \_progressname;
              Process proc = new Process();
              proc.StartInfo.FileName = \_appname;
              proc.StartInfo.UseShellExecute = true;
              proc.StartInfo.Verb = "runas";
              proc.Start();
              \_retvalue = true;
          }
          catch (Exception ex)
          {
                \_retvalue = false;
          }

## Application Stop

Stop işleminin de başı start gibidir. Yine çalışan bir process var mı yok mu kontrolünü yapıyoruz. Ardından eğer yoksa zaten stop işlemi gerçekleşmeyecektir sadece mesaj döndürürüz. Eğer çalışan uygulama var ise Process metodundan türettiğimiz nesne ile Kill() metodunu çağırırız. Ardından WaitForExit() kapanması için bir bekleme metodu çağırırız ve böylece çalışan uygulamamız kapanmış olur.

if (\_progressname == null) return false;

 bool \_retvalue = false;
 Process prcid = GetProgress(\_progressname);
 if (prcid != null)
 {
     try
     {
         if (prcid.Id > 1)
         {
             prcid.Kill();
             prcid.WaitForExit();
             \_retvalue = true;
         }
     }
     catch (Exception ex)
     {
           \_retvalue = false;
     }

 }
 else
 {
  \_retvalue = false;
 }

 return \_retvalue;

## Application Restart

Restart işlemi aslında ayrı bir process değildir. Stop ve start işlemlerinin birlikte kullanılmasından oluşur. Program açıksa önce close edilir ardından start edilir. Böylece restart işlemi gerçekleşmiş olur. Eğer açık değilse start işlemi çalışır.

## Application Status

Applicationlar için status işlemleri ikiye ayrılır. Ya çalışıyordur ya da çalışmıyordur. Üçüncü bir seçenek yoktur. Yukarıdaki işlemleri yaparken aslında statuslerine bakıp açma kapama ve restart işlemleri yapmaktaydık. Sadece durumuna bakarak da status işleminin gerçekleştirebiliriz.

public bool Status(string \_progressname, string \_apppath)
       {
           bool \_retvalue = false;
           try
           {
               if (\_progressname == null) return false;
               \_status = "Not Found Progress";
               if (GetProgress(\_progressname) != null) \_status = "Running";
               if (GetProgress(\_progressname) == null) \_status = "Not Running";

               \_retvalue = true;
           }
           catch (Exception)
           {
               \_retvalue = false;
           }
           return \_retvalue;
       }