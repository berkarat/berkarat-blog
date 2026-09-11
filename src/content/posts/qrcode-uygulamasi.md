---
title: "C# QrCode Generator Uygulaması (Logo eklenebilir)"
published: 2018-10-24
description: "Bu yazımda C WPFile yazmış olduğum genel olarak da kullanılabilir durumda olan QR code uygulamasından bahsedeceğim. Bu sadece Qrcode uygulamasından öt"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![C Logo - C# QrCode Generator Uygulaması (Logo eklenebilir)](/wp-images/2018_10_c-logo-696x748.png "c# logo")](/wp-images/2018_10_c-logo.png)

Bu yazımda C# WPFile yazmış olduğum genel olarak da kullanılabilir durumda olan QR code uygulamasından bahsedeceğim. Bu sadece Qrcode uygulamasından öte içerisinde logo barındırması açısından da farklılık göstermektedir.  Uygulamanın içerisinde isteğe bağlı olarak şifreleme yaparak da qrcode oluşturabilmektedir.

QR(Quick Response) kodu kolaylık olması amacıyla içerisine link, bilgiler, belirli şifreler gibi bilgilerin kod haline çevrilmesiyle oluşur.

![C#](/wp-images/2018_10_xx-min.png)

Uygulama Ekran Görüntüsü

Bu uygulamada Qrcode için Nuget üzerinden Zxing.Net indirip referans etmemiz gerekmektedir veya cmd üzerinden de yükleyebiliriz.

`Install-Package ZXing.Net`

Ardından System.Drawing, Newtonsoft gibi eklentileri de eklememiz gerekmektedir.

## Kodların İncelenmesi

public class JsonTest
   {
       public string Banka\_ID { get; set; }
       public DateTime date { get; set; }
       public string Language\_ID { get; set; }
       public string ReferansNo { get; set; }
       public string Terminal\_ID { get; set; }
   }

Bu bölümde newtonsoft ile bir json dosya oluşturmamız gerekmektedir. Bu json oluşması için bir mesaj yapısı yani bir class oluşturuyoruz. Bu class isteğe göre şekillendirilebilir. Qrcode içerisinde görünecek bilgileri belirliyoruz.

public static string js (string TerminalID, DateTime date, string LanguageID, string BankaID, string refno)
      {
          var test = new JsonTest ()
          {
              ReferansNo=refno,
              Terminal\_ID=TerminalID,
              date=date,
              Language\_ID=LanguageID,
              Banka\_ID=BankaID
          };
         return JsonConvert.SerializeObject (test, Formatting.Indented);
      }

Bu da json stringimizin “js” olarak oluşturmaya yarayan kod bloğudur.

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
               err="METİN  BOŞ GEÇİLEMEZ!";
               return null;
           }

           }

GenerateQR metodumuzda ise asıl işlem olan qrcode oluşturma işlemini gerçekleştiriyoruz. Burada sonuç Bitmap türünde dönmektedir. Daha sonra bu bitmap tipini bir image dosyasının içine gömüp ekranda göstereceğiz. Burada bitmap çıktısının en,boy ve kenar boşluklarını belirliyoruz.

Eğer içerisinde image yani logo kullanmak istersek birkaç ekleme yapmamız gerekmektedir. Bu eklemler de şöyle:

      
Bitmap bm = bw.Write (js);
Bitmap overlay = new Bitmap (imagePath);
int deltaHeigth = bm.Height-overlay.Height;
int deltaWidth = bm.Width-overlay.Width;
Graphics g = Graphics.FromImage (bm);
g.DrawImage (overlay, new System.Drawing.Point (deltaWidth/2, deltaHeigth/2));

Bu kodları ekledikten sonra artık logo ile birlikte kullanabilmekteyiz.

Burada dikkat edilmesi gereke diğer noktalar da eklenmek istenilen logonun tipi ( .jpg .png ) gibi türler olması ve verinin boyutunun bir sınırı olması gerekmektedir. Bunu da aşağıdaki kod örneğindeki gibi uygulayabiliriz.

           
if (openFileDialog.ShowDialog ()==true) 
    { 
    string path = openFileDialog.FileName;

    FileInfo fi = new FileInfo (path);
    string ext = fi.Extension;
    
    if (ext.ToLower ()==".jpg"||ext.ToLower()==".jpeg" ||ext.ToLower ()==".png")
    {
        if (File.Exists (path))
        {
            long length = new System.IO.FileInfo (path).Length;
        }
    }
    }

Buradan sonra yapacağımız tek şey bilgileri girip ardından qrcode okuyucu ile ekrandan çıkan bilgilerle sizin verdiğinizin eşleşmesi. Bunun için mobil üzerinden bir tarayıcı indirmeniz yeterlidir.

Bu uygulamada image kullanımında Bitmap kullanımını, wpf kullanımının pratikleştirilmesi başka kütüphanelerin nasıl kullanıldığına dair bilgiler aktarmaya çalıştım. Eğer sorularınız olursa sorabilirsiniz.

[UYGULAMA KAYNAK KODU](https://github.com/berkarat/QrCodeWithLogo)