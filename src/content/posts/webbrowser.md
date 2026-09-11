---
title: "C# WebBrowser Kullanımı ve Örnek Uygulama"
published: 2019-01-15
description: "_📌 Güncelleme (Ağustos 2026): WinForms WebBrowser nesnesi artık eski IE altyapısında kaldığı için WebView2/CefSharp alternatifleriyle birlikte değerl"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![Browsers Min - C# WebBrowser Kullanımı ve Örnek Uygulama](/wp-images/2019_01_browsers-min-696x543.jpg "browser")](/wp-images/2019_01_browsers-min.jpg)

_📌 Güncelleme (Ağustos 2026): WinForms WebBrowser nesnesi artık eski IE altyapısında kaldığı için WebView2/CefSharp alternatifleriyle birlikte değerlendirildi._

Merhabalar bu yazımızda iki güçlü dilin hibrit şekilde kullanımından bahsedeceğiz. Bu iki dilden birisi C# diğeri ise web dilleri olarak geçen js ve html. Visual Studio üzerinden webbrowser işlemleri yapacağız. Bu işlemleri ilk önce normal olarak visual studionun default webbrowser nesnesi üzerinden yapacağız. Bu browser nesnesi browser olarak eski Internet Explorer altyapısını kullanmaktadır, bunun eksik yanlarını göreceğiz. Ardından Cefsharp paketi ile birlikte browserımız chrome a dönecek ve artık daha uyumlu bir hal aldığından işlerimiz hızlı ilerleyecek.

Bu yazımız ve devamındaki yazı serisinde iki programı birden kullanacağız. C# browser işlemlerimizi yapmak için Visual Studio diğer html css web işlemleri için ise editör olarak Visual Studio Code kullanacağız.

**2026 notu:** Yeni WinForms/WPF projelerinde WebBrowser yerine Microsoft Edge Chromium tabanlı WebView2 önerilir. Chromium’u uygulamaya gömmek isterseniz CefSharp hâlâ bir alternatiftir.

n

### C# Webbrowser Kullanımı

İlk olarak bir adet winform projesi oluşturuyoruz. Ardından sol taraftaki toolbox menüsünden webbrowser nesnesini seçiyoruz. Daha önce oluşturduğumuz panelin içerisine ekliyoruz. Ardından ileri geri gibi webbrowser komutlarını ve refresh komutlarını kullanmak için bir tasarım yapmamız gerekiyor. Ben bunun için bir toolstrip nesnesi kullanarak en üstte bir bar oluşturdum. Bu işlemlerden sonra açılış sayfası olarak google belirlemek istedim. Burada webbrowser nesnesi üzerinden Navigate metodu ile birlikte gideceğimiz sayfayı belirleyebiliyoruz. Sayfa oluştuğu anda google sayfasına gitmesini belirliyorum. Aynı navigate metodunu diğer şeylerde de kullanacağız.

![2019 01 13 13 30 37 Min - C# WebBrowser Kullanımı ve Örnek Uygulama](/wp-images/2019_01_2019-01-13_13-30-37-min.png)

**Forward** ve **Back** işlemleri için bir if bloğu oluşturup cangoforward değerine bakıyoruz. Bu değer bool türündedir. Eğer false ise ileriki sayfaya gidemez. Ancak değilse goforward() metodunu çalıştırıp bir sonraki sayfaya devam edebilmekteyiz.

private void forwardbtn\_Click(object sender, EventArgs e)
     {
         if (webBrowser1.CanGoForward)
         {
             webBrowser1.GoForward();
         }
     }

**Home** işlemi için ise yine navigate metodunu belirleyeceğimiz bir sayfaya yönlendirerek yapmaktayız.

**Search** işlemini gerçekleştirmek için ben google arama motorunu kullandım. İsterseniz başka motorlar da seçebilirsiniz. Burada textbox içerisinden aldığım metini google üzerinden arama işlemine tabii tutuyoruz. Eğer textbox boş ise de direkt google arama sayfasına yönlendiriyoruz.

private void toolStripButton2\_Click(object sender, EventArgs e)
       {
           if (toolStripTextBox2.Text.Length > 1)
           {
               webBrowser1.Navigate("https://www.google.com/search?q=" + toolStripTextBox2.Text);
           }
           else
           {
               webBrowser1.Navigate("https://www.google.com");
           }

       }

Web browser eventlerinden olan  DocumentCompleted eventini örnek olarak kullandım. Bu event üzerinden e.url diyerek yüklenen url string olarak almamız mümkün. Aynı zamanda sayfanın yüklenip yüklenmediği gibi durumları da kontrol edebilmekteyiz.

private void webBrowser1\_DocumentCompleted(object sender, WebBrowserDocumentCompletedEventArgs e)
      {
          gidilen\_url = e.Url.ToString();   
      }

Sık kullanılanlar işlemi için ise bir dropdown menü oluşturuyoruz. Ardından dropdown item olarak gidilen\_url stringini dropdowna ekliyoruz. Bunların tekrar etmemisi için o listede bulunan string ile gidilen\_url stringlerini karşılaştırmamız gerekmektedir. Aksi takdirde duplicate işlemi olur.

Gerçek bir browser gibi görünmesi için winformumuzun state kısmını maximized olarak dönüştürebilir ve tam ekran olarak kullanabiliriz.

### Web Browser Script Error

Ancak yazının başında bahsettiğim gibi winform browser olarak explorer kullandığından yeni scriptler ve csslerle uyumluluk sorunu göstermektedir.

![2019 01 13 13 31 20 Min - C# WebBrowser Kullanımı ve Örnek Uygulama](/wp-images/2019_01_2019-01-13_13-31-20-min.png)

Bu sebeple resimdeki gibi bir hata ile karşılaşabilirsiniz. Bu sorunu çözmek için farklı bir browser nesnesi kullanmak gerekmektedir. Güncel projelerde bunun için WebView2 veya CefSharp gibi Chromium tabanlı çözümler değerlendirilebilir.

Örnek uygulama linkini aşağıdan bulabilirsiniz.

[https://github.com/berkarat/C-Webbrowser-Example](https://github.com/berkarat/C-Webbrowser-Example)