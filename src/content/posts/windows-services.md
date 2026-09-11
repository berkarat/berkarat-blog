---
title: "Windows Service Oluşturma"
published: 2018-11-16
description: "_📌 Güncelleme (Ağustos 2026): Windows servis mantığı geçerli; Visual Studio’nun güncel sürümleri ve .NET Worker Service yaklaşımı için kısa notlar ek"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![windows service](/wp-images/2018_11_berkarat.com-windows-services.jpg "berkarat.com windows services")](/wp-images/2018_11_berkarat.com-windows-services.jpg)

_📌 Güncelleme (Ağustos 2026): Windows servis mantığı geçerli; Visual Studio’nun güncel sürümleri ve .NET Worker Service yaklaşımı için kısa notlar eklendi._

Bu yazımızın konusu windows service . Windows service arka planda çalışan, otomatik olarak çalışan, bir arayüz olmayan veya bir çıktısı bulunmayan sistemlerdir.  İşletim sistemlerinin arkasında çalışan programlar olarak değerlendirebiliriz. Dosya aktarımı güncelleme kontrolü log tutma gibi işlemlerin otomatik yapılması gibi olayları gerçekleştirebiliriz.

Windows arama kısmına Services yazdığımızda karşımıza servisler çıkmaktadır. Bunlara sağ tıklayıp > özellikler dedikten sonra karşımıza bazı özellikler gelmektedir. Burada başlangıç türünü, servisin ne zaman başlayacağını otomatik veya manuel olarak belirleyebiliriz. Görünen ad ve açıklama kısımlarını da değiştirmek mümkündür.  Buradan servisi başlat durdur duraklat gibi seçeneklerle kontrol edebilmekteyiz. Örneğin kendi yazacağımız servisin çalışmasının durdumak için bu yolu seçebiliriz.

## Windows Service Oluşturma Ayarları

Öncelikle Visual Studio içinden New Project diyoruz. Ardından Windows Service seçeneğini seçiyoruz. Güncel Visual Studio sürümlerinde .NET Framework altında Windows Service şablonu hâlâ kullanılabilir; modern .NET tarafında ise Worker Service projesi de tercih edilebilir. Karşımıza şu ekran geliyor.

![Berkarat.com Service Install - Windows Service Oluşturma](/wp-images/2018_11_berkarat.com-Service-Install.png)

Bu ekrandan sağ tıklayacağız. Ardından Add Installer seçeneğini tıklıyoruz. Burada karşımızıa bir adet Service Installer ve Service Process Installer geliyor. Service Installer üzerine gelip sağ tıklayıp özellikler kısmına gidiyoruz. Burada isim açıklama başlama tipini ekranda görünecek adını belirliyoruz. Daha sonra Service process Installer üzerine tıklayıp özelliklere gidiyoruz. Burada da Account kısmını değiştiriyoruz. Burayı Local System olarak işaretliyoruz.

![Berkarat.com - Windows Service Oluşturma](/wp-images/2018_11_berkarat.com_.png)

Daha sonra sağ tarafta Service 1 üzerine geliyoruz. Kaynak kodu görüntüle dediğimiz zaman karşımıza servise ait düzenleyeceğimiz kodlar geliyor. Burada OnStart() ve OnStop() olarak iki fonksiyonumuz bulunmaktadır. Adından da anlaşılacağı gibi servisin başlangıç ve kapatma durumunda neler yapılacağını belirliyoruz.

public partial class Service1 : ServiceBase
   {
       public Service1 ()
       {
           InitializeComponent ();
       }

       protected override void OnStart (string\[\] args)
       {
       }

       protected override void OnStop ()
       {
       }
   }

## Windows Service Oluşturma

Asıl işlemi yapacağımız yere geçersek öncelikle InnerOperation adından bir class oluşturuyoruz. Yazacağımız class kaynak klasörüne 5 saniye aralıklarla bir log yazacak ve servisin çalışır halde olduğunu göreceğiz. Bunun yanında başlangıç ve bitişlerde de mesajı text dosya içerisine yazacak. Daha önceki [Logger Kullanımı](https://blog.berkarat.com/c-logger-kullanimi/) yazısında dosya oluşturma ve dosya yazma işlemlerini anlatmıştım. Timer konusunu ise  [Thread işlemleri](https://blog.berkarat.com/c-thread-ve-multithread-islemleri/)  yazısında kullanmıştım.

public  class InnerOperation
   {
       Timer timer = new Timer ();
       public void Start ()
       {
           WriteToFile ("Service Başladı "+DateTime.Now);
           timer.Elapsed+=new ElapsedEventHandler (OnElapsedTime);
           timer.Interval=5000;
           timer.Enabled=true;
       }
       public void Stop ()
       {
           WriteToFile ("Service Durduruldu "+DateTime.Now);
       }

       public void WriteToFile (string Message)
       {
           string path = AppDomain.CurrentDomain.BaseDirectory+"Logs";
           if (!Directory.Exists (path))
           {
               Directory.CreateDirectory (path);
           }
           string filepath = AppDomain.CurrentDomain.BaseDirectory+"LogsServiceLog\_"+DateTime.Now.Date.ToShortDateString ().Replace ('/', '\_')+".txt";
           if (!File.Exists (filepath))
           {

               using (StreamWriter sw = File.CreateText (filepath))
               {
                   sw.WriteLine (Message);
               }
           }
           else {
               using (StreamWriter sw = File.AppendText (filepath))
               {
                   sw.WriteLine (Message);
               }
           }
       }
       private void OnElapsedTime (object source, ElapsedEventArgs e)
       {
           WriteToFile ("Service Message ! berkarat.com :    "+DateTime.Now);
       }
   }

Bu class içerisini de oluşturduktan sonra serviste oluşacak onstart ve onstop fonksiyonlarının içerisine start ve stop fonksiyonlarımızı çağırıyoruz. Ardından derleme işlemini gerçekleştiriyoruz. Standart bir console app uygulaması gibi bir exe oluşuyor.

InnerOperation obj = new InnerOperation ();
      protected override void OnStart (string\[\] args)
      {
          obj.Start ();
      }
      protected override void OnStop ()
      {
          obj.Stop();
      }

## Windows Servis Yükleme

Daha sonra cmd komut satırını **yönetici olarak** çalıştırıyoruz. InstallUtil.exe, .NET Framework Windows Service projeleri için geçerlidir; .NET 8/9 Worker Service projelerinde servis kaydı için sc.exe, PowerShell New-Service veya publish edilen exe üzerinden kurulum tercih edilir.  Daha sonra aşağıdaki dosya yolu üzerinden InstallUtil.exe ile servisi sisteme yüklemiş oluyoruz. Sonra servisi çalıştırıyoruz. Artık kaynağımıza servis çalışmasına dair loglar yazılmaya başlamış oluyor.

 C:WindowsMicrosoft.NETFramework64v4.0.30319>InstallUtil.exe "C:UsersberkDocumentsVisual Studio 2015ProjectsService\_berkarat.comService\_berkarat.combinDebugService\_berkarat.com.exe"

## Windows Service Başlatma

## ![2018 11 16 19 29 28 Min - Windows Service Oluşturma](/wp-images/2018_11_2018-11-16_19-29-28-min.png)

Servisi Hizmetler kısmına geliyoruz. Windows Service display name olarak verdiğimiz isimle görünmektedir. Buraya sağ tıklayıp çalıştır durdur veya restart et gibi işlemler uygulayabiliriz.

![Berkarat.com Service - Windows Service Oluşturma](/wp-images/2018_11_berkarat.com-Service.png)

Burada da göreceğimiz gibi loglar tarih olarak yazılıyor.