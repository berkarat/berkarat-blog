---
title: "ASP.NET MVC 5 Cookie Kullanımı"
published: 2020-01-13
description: "cookie Merhabalar bu yazımızda (cookie -çerezler) konusunda , web uygulamalarında sıkça karşımıza çıkan ve bir web gelişitirici için de olmazsa olmaz"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![C Logo - C# QrCode Generator Uygulaması (Logo eklenebilir)](/wp-images/2018_10_c-logo-696x748.png "c# logo")](/wp-images/2018_10_c-logo.png)

  
cookie Merhabalar bu yazımızda (cookie -çerezler) konusunda , web uygulamalarında sıkça karşımıza çıkan ve bir web gelişitirici için de olmazsa olmaz konu olan cookie konusuna değineceğim. Session konusuna da farkları olarak değinip küçük bir login uygulaması geliştireceğiz. Böylece kavramlar kafamızda tam oturacak neyi geliştirdiğimizi bileceğiz.

Çerezler bizlerin işlerini kolaylaştırılmak için geliştirilmiş kavramlardır. Bunlar bizim bilgilerimizi belirtilen süreler boyunca tutmaya yarayan yapılardır. Örneğin kullanıcının username bilgisini ile 1 ay boyunca tutmamız demek o kullanıcının username bilgisini tekrar sorup vakit kaybı yaşamadan direkt olarak gösterebiliriz.

Çerezler sessiondan farklı olarak sunucu tarafında değil client tarafında tutulur. Browserlar aracılığıyla uygulamımıza giren kullanıcının bilgilerini o bilgisayarda küçük bir metin dosyası içinde tutarız.  Çerezler iki tipte bulunmaktadır. Bunlardan birisi kalıcı diğeri de geçici cookilerdir. Kalıcı olması için belirli bir süre expire date verilmelidir. Eğer verilmezse browser kapandığı zaman cookie de silinmektedir.

**Cookilerin çalışma yapısı**

Çerezler sunucu tarafında değil kullanıcı tarafında çalıştırılır. Browser tarafından browserin cinsine göre farklı yapılarda tutulmaktadır.  Bu yüzden bir tarayıcıdaki çerez diğer tarayıcı da bulunmamaktadır.

#### **Avantajlar ve Dezavantajları nelerdir** ?

Avantaj olarak sayabileceğimiz şeyler; kolay bir şekilde kullanılmaktadır ve client tarafında tutulduğu için sunucu üzerinde veriler tutulmamaktadır. Bu da sunucuyu rahatlatmaktadır.

Dezavantajlar da şunlardır. Verilerde bir şifreleme olmadığı için güvenlik açığı oluşturur. Tarayıcıdan tarayıcıya göre farklılık göstermektedir. Boyut olarak 4 kB sınırı vardır.

#### Kullanım alanları nelerdir

-   Sitelerin reklam bilgilerini saklaması için kullanılabilir
-   Kullanıcı bilgileri Gerektiren durumlarda kullanılabilir
-   Örneğin bir e ticaret sitesinde Sepet bilgileri için kullanılabilir
-   Örneğimizle çerezler kavramını daha derinlemesine inceleyelim.

## Cookie Örnek Uygulama

##### Cookie Oluşturma

ASP.NET mvc de cookieler HttpContext sınıfı içerisinden türemektedir. Bu yüzden HttpCookie üzerinden çerezimizi tanımlıyoruz. Daha önce aynı isimli var ise Remove metoduyla siliyoruz. Yoksa yeni oluşturuyoruz. Pair key yapısıyla çalıştığı için adını veriyoruz ve value değeri neyse onu ekliyoruz. Ardından yukarıda bahsettiğim gibi eğer kalıcı istiyorsak bir Expire date ekliyoruz. Bu örnekte 10 günlük gibi bir süre ekliyoruz. Daha sonra da bu class üzerinden Add metoduyla ekliyoruz. Burada response metodunu kullanıyoruz yani bir sonucu döndürüyoruz.

        static public void CookieCreate(string cookiename, string value)
        {
            HttpCookie Cookie = null;
            if (HttpContext.Current.Response.Cookies\[cookiename\] != null)
            {
          HttpContext.Current.Request.Cookies.Remove(cookiename);
          HttpContext.Current.Response.Cookies\[cookiename\].Value = value;
          Cookie = HttpContext.Current.Response.Cookies\[cookiename\];
            }
            else { 
                //Yoksa oluşturuyoruz.
                Cookie = new HttpCookie("OrnekCookie");
            Cookie.Expires = DateTime.Now.AddDays(10);
            Cookie\[cookiename\] = value;
            }
            HttpContext.Current.Response.Cookies.Add(Cookie);
        }

##### Cookie Çağırma

Bu metod da aynı classtan oluştuğu için aynı yapıda ismini verip çağırıyoruz. Burada request yani talep ediyoruz.

    static public HttpCookie CookieGet(string cookiename)
        {
            if (HttpContext.Current.Request.Cookies\[cookiename\] != null)
                return HttpContext.Current.Request.Cookies\[cookiename\];
            else
                return null;
        }

##### Cookie Silme

    static public void CookieDelete(string cookiename)
        {
        HttpContext.Current.Response.Cookies\[cookiename\].Expires = DateTime.Now.AddYears(-1);
            HttpContext.Current.Request.Cookies.Remove(cookiename);
        }

Kaynak dosyasına buradan ulaşabilirsiniz.

Github Link

[https://github.com/berkarat/Asp.Net-MVC-cookie-Example](https://github.com/berkarat/Asp.Net-MVC-cookie-Example)

Azure Devops Link  
[https://dev.azure.com/berkarat930482/\_git/Cookie%20Example%20MVC%205](https://dev.azure.com/berkarat930482/_git/Cookie%20Example%20MVC%205)