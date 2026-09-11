---
title: "C# DLL Nedir ? DLL Oluşturma ve Kullanma"
published: 2018-11-08
description: "_📌 Güncelleme (Ağustos 2026): DLL/Class Library mantığı geçerliliğini koruyor; güncel Visual Studio ve NuGet kullanımına dair notlar eklendi._"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![Dll Logo Min - C# DLL Nedir ? DLL Oluşturma ve Kullanma](/wp-images/2018_11_dll-logo-min.jpg "dll logo")](/wp-images/2018_11_dll-logo-min.jpg)

_📌 Güncelleme (Ağustos 2026): DLL/Class Library mantığı geçerliliğini koruyor; güncel Visual Studio ve NuGet kullanımına dair notlar eklendi._

Bu yazımızda dll nedir, nasıl kullanılır gibi tanımlamaları yapacağız. Ardından da örnek bir kütüphane oluşturma uygulamasını yapacağız. Açılımı Dynamic Link Library olan bir kütüphanedir.

Programlamada aynı kod satırlarını tekrar tekrar yazmak bir program geliştici açısından yorucu bir iştir. Bu sebeple tekrar eden metodların tek bir yerde kullanılması düşünülmüştür. Farklı programlarda ya da dağıtık sistemlerde kullanılan aynı metodlar açısından bir kütüphane yani dll dosyası oluşturmak en mantıklı çözüm olarak bulunmuştur.

Aynı zamanda kendi yazdığınız kodları başkasının kullanımına açık hale getirebilirsiniz. Bu kullanıcı kaynak koda erişemez ancak izin verilen metodları kullanabilmektedir. Böylece hem başkalarının kullanımına açık hem de kaynak kodu gizli bir durum gerçekleşir.

Daha önce yazdığımız classların bir araya getirilerek oluşturduğumuz, içerisinde main yapısı olmadan çağırabildiğimiz uygulamalara benzerdir. Buradaki dikkat edilmesi gereken kısım başka modüllerin çağırılıyor olmasıdır.

## C# DLL Oluşturma

C# ile kütüphane oluşturmak için daha önceden yazdığımız metodları, sınıfları kullanabiliriz veya bunları direkt kütüphane olarak da oluşturabiliriz. Bu oluşturacağım örnekte daha önceki yazılarda bahsettiğim metodları kütüphane olarak kullanacağım. Örneğin [qrcode generator](https://blog.berkarat.com/qrcode-uygulamasi/) konusunda  verdiğim örneği oradaki metodları kullanacağım. Uygulamalı örnek olarak da oradaki random sayı metodunu çağıracağım.

Geçelim kodumuzu yazmaya. İlk önce Visual Studio içerisinde File>New>Project veya Ctrl+Shift+N işlemini yapıp ardından gelen ekrandan Class Library seçimini yapıyor ve isimlendiriyoruz. Güncel Visual Studio sürümlerinde hedef framework olarak .NET veya .NET Framework seçimini projenizin ihtiyacına göre belirleyebilirsiniz.

![2018 11 04 14 35 05 Min - C# DLL Nedir ? DLL Oluşturma ve Kullanma](/wp-images/2018_11_2018-11-04_14-35-05-min.png)

Daha sonra burada Class isimini veriyoruz.  Daha sonrasında  çalıştırmak istediğimiz metodu bu class içerisine ekliyoruz.

public class QRCreate
  {
      public static Bitmap GenerateQR (int width, int height, string js, out string err)
      {
          err="";
          try
          {
              if (js!=null)
              {
                  IBarcodeWriter barcodeWriter = new BarcodeWriter ();
                  barcodeWriter.Format=BarcodeFormat.QR\_CODE;
                  QrCodeEncodingOptions options = new QrCodeEncodingOptions ();
                  options=new QrCodeEncodingOptions
                  {
                      Width=width,
                      Height=height,
                      Margin=0
                  };
                  options.Hints.Add (EncodeHintType.ERROR\_CORRECTION, ErrorCorrectionLevel.H);
                  barcodeWriter.Options=options;
                  var result = new Bitmap (barcodeWriter.Write (js));
                  return result;
              }
              else
                  return null;
          }
          catch (Exception)
          {
              err="METİN GİRİNİZ!";
              return null;
          }
      }
       }

Bu örnekte GenerateQR() isimli metodumuzu kullanıyoruz. Burada ZXing.Net isimli referansı eklememiz gerekmektedir. Güncel projelerde bu tür paketleri NuGet üzerinden PackageReference ile eklemek en pratik yoldur. Bununla ilgili bilgiler örnek yazımızda mevcuttur. Daha sonra bu kod satırını ekledikten sonra Solution üzerinden Build işlemini yapıyoruz. Böylece 06kütüphanemiz oluşmuş oluyor.

## C# Dll Kullanımı

DLL kütüphanemizi oluşturduktan sonra kullanmamız için örnek olarak bir form uygulaması açıyoruz. İçerisine picturebox ve button ekliyoruz. Sade bir uygulama olup qr code üretecek ancak bunu bir kütüphane içerisinden çağıracağız. Bu işlemi de Zxing üzerinden yaptığımız için bunu nuget üzerinden projemize ekliyoruz. Daha sonra sağ  tarafta Reference kısmından Add diyerek oluşturduğumuz dll dosyasını projemize referans olarak ekiyoruz.

![2018 11 04 14 46 58 Min - C# DLL Nedir ? DLL Oluşturma ve Kullanma](/wp-images/2018_11_2018-11-04_14-46-58-min.png)

Burada dikkat etmemiz gereken namespace kısmına oluşturduğumuz kütüphaneyi eklememiz gerekmektedir.

using DLL\_ADI;

Daha sonra Metodumuzun adı ile qrCode oluşturma işlemini tamamlıyoruz. Böylece başka birisine veya başka bir uygulamada bu metodu tekrar yazmadan tek bir referans işlemi ile tamamlamış oluyoruz.

pictureBox1.Image=berkarat.QRCreate.GenerateQR (150, 150, "berkarat.com", out err);

QrCreate üzerine sağ tıklayıp Go to Definition veya F12’ye bastığımızda kaynağımıza gideriz. Ancak sadece o class içerisindeki metodları görürüz içeriklerine erişemeyiz.

**Not:** Bu örneğin eski GitHub kaynak bağlantısı artık erişilebilir olmadığı için kaldırıldı; makaledeki kod parçaları temel akışı göstermeye devam ediyor.