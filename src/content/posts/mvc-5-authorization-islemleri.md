---
title: "ASP.NET MVC 5 Authorization ve Rol Bazlı Yetkilendirme"
published: 2020-01-15
description: "Bu yazıda authorization yani  yetkilendirmeyi ve çeşitlerini konu alacağız. MVC’de Rol bazlı Yetkilendirme konusuna değinip bu kavramı açıklığa kavuşt"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![Role based authorization](/wp-images/2020_01_Authorization-696x307.png "Authorization")](/wp-images/2020_01_Authorization.png)

Bu yazıda authorization yani  yetkilendirmeyi ve çeşitlerini konu alacağız. MVC’de Rol bazlı Yetkilendirme konusuna değinip bu kavramı açıklığa kavuşturup örnek uygulama ekleyeceğim. Rol bazlı yetkilendirme konusuna girmeden önce genel yetkilendirme authorization kavramından bahsetmek gerekir.

İlk olarak yetkilendirme (Authorization)  uygulama güvenliği açısından genel bir kontrol noktası olarak düşünebilriz. Daha önceki konumuzda cookielerden bahsetmiştik. Burada giriş yapan kullanıcının yetkisini de aldıktan sonra cookiemize ekleyelim. Ardından controllerlarda bulunan sayfalara giriş için eğer yetkisi var ise giriş yapabilsin eğer yapamazsa zaten belirlediğimiz bir sayfaya veya aynı  sayfaya dönüş yapacaktır.  
Bu yüzden genel web sitelerinde Login ekranını çağırdığımız controllerlara Allowanonymous özelliği kullanılmaktadır. Bu da genel olarak bir yetki sınıfından türetilmiştir. Kullandığımız yetkileri ActionResult olarak tanımlayabildiğimiz gibi Controller bazlı da tanımlayabilmekteyiz.

Bu **AuthorizeAttribute** classından türeteceğimiz bir class oluşturalım. Ardından kalıtım işlemi yapıyoruz. Bunun içindeki metodlar sayesinde yetkilendirme işlemini yapıyoruz. Bu durum eğer kullanıcı ve user doğru ise giriş yapmak olarak düşünebiliriz.

  \[AllowAnonymous\]
  public ActionResult Login() {
    // ...
  }

Yetkilendirmeyi kullanmak için öncelikle  Web.config dosyamıza giriyoruz. Authentication modunu belirlememiz gerekmektedir.Bunun için yetki tipini biz Formdan alacağımız için type kısmını Form olarak seçiyoruz.

##### Yetki Tipleri

-   Forms    Formdan doğrulama
-   None    Yetki verme durumu yok.
-   Passport  Yetkiyi Microsoft kullanıcı şifresiyle doğrulanır.
-   Windows  Bu yetki tipinde Windows ve IIS sertifikalarıyla doğrulama yapılır.

    <authentication mode="Forms">
      <forms loginUrl="Account/Login"></forms>
    </authentication>

<system.web></system.web> tagleri arasına yapıştırıyoruz.

## Rol Bazlı Yetkilendirme (Role Based Authorization)

Burada ise yetkilendirme yani Authorization işlmenin daha gelişmiş hali gibi düşünebiliriz. Rol bazında yetkilendirme yapabilmemiz için ise Veritabanımızda Rol sütununu da tanımlamayı unutmamak gerekir.  
Örneğin bir senaryoda rolü “Admin”  olan kullanıcı menüde Kullanıcı bilgilerini görebilirken, rolü “User”  olan kullanıcı göremeyecektir. Bunu sağlamak için de ActionResult kısmının üstüne **Authorize** sınıfından türettiğimiz Rolü de eklememiz gerekmektedir.

\[Authorize(Roles = "Admin,User")\]
        public ActionResult Logout()
        {
            CookieCheck.ExpireAllCookies();
            FormsAuthentication.SignOut();   
            return RedirectToAction("Login");
        }

##### RoleProvider Classının Kullanımı

İlk olarak RoleManager kısmını eklememiz ve provider olarak da hangisini kullanacağımızı belirlemek için aşağıdaki kod bloğunu  System.config içerisine ekliyoruz.

<roleManager enabled="true" defaultProvider="myprov">
      <providers >
        <add name="myprov" type="Monitoring.Models.UsersRoleProvider"/>
      </providers>
    </roleManager>

UsersRoleProvider adında bir adet class oluşturuyoruz. Ardından RoleProvider sınıfını kalıtımla içindeki metodları ekliyoruz. 

Rolleri oluşturmak için database üzerinden almamız gerektiğini söyledik. Bu rolün “Roles= “..”” şeklinde boş yeri doldurmamız gerekmektedir. Bunu da RoleProvider classından türeteceğimiz metodlarla sağlayacağız. Örneğin userın Rolünü öğrenmek için GetRolesForUser() metodunu kullanmamız gerekir. Bu metoda parametre olarak username’i string olarak verip database üzerinden Rol ataması gerçekleştiriyoruz.

Authorize(Roles\[\]) kısmı çalıştığı sırada buradaki metoda düşüyor. O metodda da gidip database üzerinden rolü seçmemiz gerekmektedir.

public class UsersRoleProvider : RoleProvider
    {
        public override string\[\] GetRolesForUser(string username)
        {
            // db CHECK  
            string\[\] Roles=new string\[1\];            
            if (username=="Berk")
            {
                 Roles\[0\]= "Admin";
            }
            else  
            {
                Roles\[0\] = "User";
            }
            if(Roles\[0\].ToString()!=null)           
            return Roles;
        }     
    }

## ValidateAntiForgeryToken Nedir ?

Bu metod da bizim controllerımızda bulunan action resultları korumaya yönelik bir yöntemdir. Nasıl çalışır. Öncelikle bir token oluşturulur ve o tokena bağlı olarak giriş izni verir veya vermez. Kullanımı için de controller başına ValidateAntiForgeryTokenAttribute daha sonra da view içerimize **@Html.AntiForgeryToken()**   ekliyoruz. Artık yapmamız gereken bir şey kalmadı. Burada SQL injection gibi dışarıdan gelebilecek saldırılara karşı bir koruma yöntemi olarak düşünebilirsiniz. Post metodlarında kullanılmaktadır. Get metodunda dışarıdan bir veri gönderilmediği için ihtiyaç duyulmamaktadır.

\[HttpPost\]
\[ValidateAntiForgeryToken\]
public IActionResult Control()
{
 return View();
}