---
title: "Web Programlama Hakkında Genel Bilgiler"
published: 2019-02-18
description: "Merhabalar bu yazı web programlama kategorisinin ilk yazısıdır. Bu yazımda genellikle bilinmesi gereken basit terimlerden ve bu terimlerin uygulanması"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![javascript](/wp-images/2019_02_web1-696x392.png "web programlama")](/wp-images/2019_02_web1.png)

Merhabalar bu yazı web programlama kategorisinin ilk yazısıdır. Bu yazımda genellikle bilinmesi gereken basit terimlerden ve bu terimlerin uygulanmasında ne gibi durumlarla karşılaştığımız gibi konulara değineceğim genel bir yazı olacak. Daha ileriki yazılarda ise dillere ayırarak detaylar hakkında örnekler ve projeler paylaşmaya devam edeceğim.

Web dediğimizde genel anlamda front end ve back end tarafı olarak iki bölüme ayrılmaktadır. Front end dediğimiz kısım kullanıcının doğrudan iletişim halinde olduğu görsel kısımlardır. Back end ise daha çok sunucu tarafında arka planda işleyişlerin yapıldığı kısımdır.

![backend](/wp-images/2019_02_frontend.png)

Front end programlama dillerine örnek vermek gerekirse bunların başında HTML CSS ve Javascript gibi diller ön plandadır. Back end için ise verebileceğim en genel olarak .Net MVC ve PHP vardır.

### **HTML**

Html (hyper text markup language) bir işaretleme dilidir. Web programlama için olmazsa olmazdır. Aslında bir iskelet olarak düşünülebilir. Bir sayfanın menüsünden, sliderına , footer kısmına kadar gözle görünen her alanın arkasında olan bir iskelettir. Bir programlama dili değildir. Yazılması için herhangi bir program uygulama kullanmaya gerek yoktur.  HTML dili head ve body taglerinden oluşmaktadır.

### **CSS**

CSS tam olarak bir programlama dili sayılmamaktadır. Html dosyalarının stil dosyaları olarak açıklayabiliriz. Görünen alanın estetik boyutu olarak bakabiliriz. Css için html içerisinde style taglerinin arasında yazacağız. Ancak ben genellikle ayrı bir .css dosyası oluşturup orada yazıp dosyayı referans olarak html içerisine ekliyorum.

### **JavaScript**

Javascript ise şu an dünyada en popüler dillerin başında gelmektedir. Genellikle yazılarım Javascript üzerine olacak çünkü gerçek anlamda bir programlama dilidir. Html iskelet css derimiz olarak düşünürsek Javascript ise tüm kasları gösteriyor diyebiliriz. Yaptığımız her işlemin hareketin arkasında  bir javascript kodu bulunmaktadır.

### **Kullandığım Programlar**

Bu saydığım dillerin yazılması için ekstra bir programa gerek yoktur. Notepad++ içerisinde yazıp .html uzantılı olarak kaydettiğimiz zaman çalıştırabiliriz. Ancak gerçekçi projeler yapmaya başladıkça işler karmaşık hale geldiğinden ben kendi projelerimde Microsoftun desteklediği VisualStudio Code kullanacağım. Bir çok dili destekleyen bir text editör olarak düşünebilirsiniz. Daha gelişmiş gibi duran Adobe’un desteklediği Adobe Dreamweaver programı da vardır. Ancak bu sisteme ben pek alışamadım daha çok tasarımcı bakışı olarak faydalıdır ben daha çok işin arka planına baktığım için performasn olarak VisualStudio Code benim için daha pratik bir yerde bulunmaktadır.

<!DOCTYPE html>
<html>
<head>
<title>Berk Arat</title>
<style>
body{
background-color:"grey"
}
</style>
</head>
<body>
 <p> Hello berkarat.com </p>
</body>

<script>
alert("Hello World");
</script>

</html>

Yazdığınız kodların derlenmesi gibi bir durum olmadığından debug işlemi de olmayacaktır. Bir diğer dezavantajı ise hata olsa bile çalışmaya devam edecektir. Diğer dilerde debug olamadığından çalışmıyor ve hatayı düzeltmemiz gerekmektedir.

[IIS KURULUM](https://blog.berkarat.com/windows-iis-kurulumu/) yazısında yazdıklarımızı devam ettikçe daha açıklayıcı ve anlaşılır olacaktır.