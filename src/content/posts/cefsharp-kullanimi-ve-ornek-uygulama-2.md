---
title: "CefSharp Kullanımı ve Örnek Uygulama -2"
published: 2019-01-23
description: "Merhaba bu yazıda Cefsharp Kullanımı yazımıza devam edeceğiz. Biraz daha detaylı olarak ilerleyip uygulamamızı yapacağız. Uygulamada localde oluşturac"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![cefsharp kurulum](/wp-images/2019_01_articleocw-58dff32e7375c-min.png "cefsharp")](/wp-images/2019_01_articleocw-58dff32e7375c-min.png)

Merhaba bu yazıda Cefsharp Kullanımı yazımıza devam edeceğiz. Biraz daha detaylı olarak ilerleyip uygulamamızı yapacağız. Uygulamada localde oluşturacağımız .html uzantılı bir index oluşturacağız. Daha sonra bu index.html içerisine yazacağımız bir Javascript  metodunu cefsharp üzerinden çağıracağız. Başlangıçta biraz karmaşık gibi görünse de yazının devamında çok da karışık olmadığını göreceksiniz. Bunalara değinmeden önce biraz Js konusuna değinmemiz ve html sayfamızı oluşturmamız gerekmektedir.

Uygulamamızda 3 tane sayfa olacak ve bu sayfaları kendi browserımız üzerinde çalıştıracağız. İlk sayfa ana sayfa ikincisi bir şifre girme paneli üçüncü ekran ise girilen parola doğru veya yanlışsa bir tepki veren ekran olacak. Tasarım detaylarını basit tutmak istedim çünkü buradaki amaç css değil daha çok cefsharp üzerinde yapacağımız işlemler olacak. İsteğe göre basit bir css örneği yapıyoruz. Ardından işlemlerimizi yapacak kısım Javascript kodlarını yazmamız gerekmektedir.

### Cefsharp Classları

Javascript kodlarını yazarken cefsharp uygulamamızda oluşturacağımız classı kullanacağız. İlk önce winform projesine Initialize sonrasında  aşağıdaki kodu ekliyoruz. Buradan CallBackObjectJS adında bir class oluşturuyoruz. Bu class Cefsharp içerisinde js kodlarını çağırmamıza ya da html sayfaya js komutları göndermemize yaramaktadır. Bu yazıda anlatılanların kalbini oluşturmaktadır.

chrome.RegisterJsObject("object", new CallbackObjectForJs());

Daha sonra bu class içerisine yapacağımız metodları yazıyoruz. Örneğin mainpage sayfasına gitmek için bir metod yapabiliriz. Bu metodda Load() sınıfını kullanarak  html bir sayfa çağırabiliriz.

public void getpage(string pageurl)
           {
               chrome.Load(path+pageurl);
           }

## Javascript İşlemleri

Bunun dışında sayfada bir script metodu çağırabiliriz. Bunu da yine oluşturduğumuz classtan türetip ExecuteScriptAsync() komutuyla işleyebilir, aşağıdaki gibi basit bir alert() scripti çağırabiliriz.

chrome.ExecuteScriptAsync("alert('Page Not Found !!');");

Html sayfadan da bilgi bize gelmektedir.  Örnek uygulamada şifre bilgileri html üzerinden winforma gelip orada doğruluk kontrolü yapıp bir sonuç döndürebiliyoruz. Böylece js ile c# arasında bir iletişim kurmuş oluyoruz. Parola bilgisi bizde olduğundan bu bilgiyi database ile check edip ona göre bir sonuç da döndürebiliriz.

Bu işlemleri yaptıracağımız js kodlarını da yazmamız gerekmektedir.  Örneğin basit olarak bir anasayfaya döndüren bir metod yazalım. C# üzerinde oluşturduğumuz object nesnesi üzerinden metodlara ulaşabiliyoruz.

function go\_mainpage(){

    object.getpage('mainpage.html');
    }

Biraz daha karmaşıklara geçersek c# tarafına array yollama metodunu da yazalım. Yine benzer mantıkla çalışmaktadır. Sadece JS tarafında diziye çeviriyoruz. c# tarafında da ayrıştırırken Array metodundan ayırıp işliyoruz.

function  go\_lastscreen (password,url){
   let arr = new Array();
 arr = \[password,url\];
  object.go\_lastscreen(arr);

}

Son olarak da bir timer ekleme örneği var. Bunda da eğer belli bir süreden sonra sayfayı yönlendirebiliriz. Burada timera vereceğimiz süre sonunda ana sayfaya dönüş yapacak bir metod.

function startTimer(duration, display) {
    var timer = duration;
   setInterval(function () {  display.textContent =   timer;  
    if    (timer <10) 
   {
       document.getElementById("timer").style.backgroundColor = "red";
   }
      if (--timer < 0) {
               timer = 0;      
               go\_mainpage();
           }
       }, 1000);
   }
   window.onload =
   function (seconds) {
   var seconds=60;
   
           display = document.querySelector('#timer'); 
       startTimer(seconds, display);
   };

Bu işlemleri de yaparken sayfanın yüklenme anında ya da sonrasinda gibi hareketleri de eventler üzerinden yakalayıp işlemek gerekmktedir. Bunun için loading state yani yüklenme bitti mi bitmedi mi kontrolü yapmak gerekmektedir. Aşağıdaki gibi bir örnek açıklayıcı olacaktır.

private void Chrome\_LoadingStateChanged(object sender, LoadingStateChangedEventArgs e)
     {
         if (!e.IsLoading)
         {
             // sayfa yüklendi
             switch (page)
             {
                 case "last":
                     if (passwordistrue)
                     {
                         // password true
                         chrome.ExecuteScriptAsync(" window.onload(writepassword('"+ password + "'));");
                     }
                     else
                     {
                         chrome.ExecuteScriptAsync(" window.onload(writewrong('WRONG PASSWORD'));");
                     }
                     page = string.Empty;
                     break;
             }

         }

     }

Son olarak dikkat etmemiz gereken bir konudanbahsedeceğim. Oluşturduğumuz browserı tıpkı sqlde connection kapatır gibi kapatmamız gerekmektedirç Aksi takdirde arka planda çalışacak ve CPU kullanımını etkileyecektir.

private void Form1\_FormClosing(object sender, FormClosingEventArgs e)
    {
        Cef.Shutdown();
    }

Son olarak bu html dosyalarını C:\\inetpub\\wwwroot dosya yoluna ekleyip çalıştırmamız gerekmektedir. Bu konuya dair detaylı bilgiyi   [IIS Kullanımı](https://blog.berkarat.com/windows-iis-kurulumu/) yazısında yazmıştım.

Uygulamaya ait kaynak dosyalara aşağıdan ulaşabilirsiniz.

[https://github.com/berkarat/Cefsharp\_Example](https://github.com/berkarat/Cefsharp_Example)