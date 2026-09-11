---
title: "Json Nedir ? C# ile Json Verilerde İşlemler"
published: 2018-08-11
description: "Json bir veri formatıdır. Açılımı Javascript Object Notation dur. Çıkarılma amacı XML dosya yapısından daha az yer kaplaması ve aynı zamanda XML yapın"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![RestSharp](/wp-images/2018_08_json.png "json")](/wp-images/2018_08_json.png)

Json bir veri formatıdır. Açılımı Javascript Object Notation dur. Çıkarılma amacı XML dosya yapısından daha az yer kaplaması ve aynı zamanda XML yapını Javascript ile çok uyumlu çalşmamasıdır. İlk olarak Javascript uygulamaları için çıkarılsa da günümüzde hemen her yazılım geliştirme uygulamalarında tercih edilmektedir. Bir çok teknoloji artık Json veri formatını tercih etmektedir. Web servislerde de çokça kullanılmaktadır.

Json gövde yapısı Key :Value çiftlerinden oluştur  Key için özellik tanımlanır. Value için ise onun değeri tanımlanır. Tıpkı değişken tanımlama gibidir. Bu key value ikilisi string türünde tanımlanır.

Temelde iki yapıdan oluşur. Bunlar object ve array yapılarıdır.

**Object** yapısı küme parantezi arasına yazılır. Key:Value mantığını barındırır.

Bir object { ile başlar ve } ile de biter. Anahtar : Değer mantığı ile çalışır.  Ve her objemizi virgül ile ayırırız. Örneğin;

{
  "Ad": "Berk",
  "Soyad": "Arat",
  "DogumYılı": "1993",
  "DogumYeri": "İstanbul",
  "Cinsiyet": "Erkek"
}

**Array** yapısında ise key ve value çifti yoktur. Sadece değerleri aralarına virgül koyarak ayırırız.

\[ "Berk", "Bora", "Ali" \]

Yukarıda örnek bir Array veri yapısı bulunmaktadır.

Json verisi küme parantezleri içinde oluşturulur. Bu dosyada “Ad” kısmı keyi temsil ederken yanındaki kısım value değerini ifade etmektedir.

## Json Dosya Okuma

### Localde Dosya Okuma

public class Veriler
{
public string Ad { get; set; }
public string Soyad { get; set; }
public string DogumYili { get; set; }
public string DogumYeri { get; set; }
public string Cinsiyet { get; set; }
}

İlk önce yapmamız gereken Json dosyamızın keyleriyle ve tipleriyle uyumlu bir class oluşturmak. String olan bir veri için int gibi bir değer tanımlamak hataya yol açacaktır. İsimlerin de aynı olması gerekmektedir.

string path = "json\_dosya\_yolu";
StreamReader stream\_read = new StreamReader(path);
string js\_data = stream\_read.ReadToEnd();// dosyayı okuruz.
List<Veriler> veriler = JsonConvert.DeserializeObject<List<Veriler>>(js\_data); // json datasını convert edip, Veriler clasından türettiğimiz nesneye aktarıyoruz.

-   Oluşturduğumuz dosyanın veri yolunu tanımlarız.
-   Ardından StreamReader nesnesi ile dosyayı okuma işlemini gerçekletiririz.
-   JsonConvert ile bilgileri Veriler classımıza aktarırız.

Not: NuGet Package Manager üzerinden Newtonsoft’u kurmamız gerekmekte ardından using ile “using Newtonsoft.Json; ” paketi eklemeliyiz. JsonConverter classına bu paket aracılığı ile ulaşıyoruz.

Yukarıda yaptığımız işlem localde dosya okuma işlemiydi.

### Server Üzerinden Dosya Okuma

string adres = "json\_talep\_edeceğimiz\_url";
 WebRequest istek = HttpWebRequest.Create(adres); // istek yolladık
 WebResponse cevap=istek.GetResponse(); // cevabı aldık
 StreamReader donenBilgiler = new StreamReader(cevap.GetResponseStream()); // cevabı okuduk
 string bilgilerial = donenBilgiler.ReadToEnd(); // okuduğumuz cevabı stringe atadık
 List<Veriler> veriler= JsonConvert.DeserializeObject<List<Veriler>>(bilgilerial); // json dosyasını convert ettik

Tıpkı localdeki gibi okuyacağımız dosyanın içeriğine bağlı olarak class oluşturmamız gerekmektedir. Adresimize WebRequest classından oluşturduğumuz nesne ile  istek yolluyoruz. Ardından WebResponse ile gelen bilgiyi alıyoruz ve StreamReader ile bilgiyi okuyoruz. Aldığımız bilgiyi stringe atıyoruz. Daha sonra bu stringi oluşturduğumuz class tipine aktarıyoruz ve bilgilere ulaşmış oluyoruz.

# RestSharp İşlemleri

Restsharp bir Nuget paketidir. Client üzerinden serverdaki bilgiyi almamızda büyük kolaylık sağlayan bir pakettir. Nuget üzerinden “Restharp” yazarak indirilip kütüphaneye eklendikten sonra içeriğine ulaşabiliyoruz. Aşağıdaki örnekte bir kullanımı mevcuttur.

private string get (string token, string url, Method mt )
       {  
           var client = new RestClient(url);
           RestRequest requ = new RestRequest(mt);
           requ.AddHeader("Authorization", token);
           requ.AddParameter("param\_1", "Param\_1");
           IRestResponse response = client.Execute(requ);
          //RestResponse<Person> response2 = client.Execute<Person>(request);
 
           return response.Content;
       }

Bu fonksiyon örneğinde urlsi verilmiş adresten bir json dosyası çekmeye yaramaktadır. RestClient classından bir veri türetiyoruz. Ardından Method kısmını Post veya Get tipini belirleyerek servera ya da apiye bir istek gönderiyoruz. Bu isteğe ek olarak Header, Parameter gibi özellikler de ekleyebiliriz. Arından IRestResponse ile dosyayı alıyoruz. Artık elimizde bir Json dosyası var bunun content ile içeriğine ulaşabilir gerekli işlemleri yapabiliriz.  Veya RestResponse kullanarak verimizi belirlediğimiz bir classa atayarak işlemlerimizi gerçekleştirebiliriz.

[RestSharp Kullanım Örnekleri](http://restsharp.org/)

[İşlemler için gereken classları buradan kontrol edip, otomatik oluşturabilirsiniz.](https://jsonutils.com/)