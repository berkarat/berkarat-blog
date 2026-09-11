---
title: "WPF Blend Uygulaması"
published: 2018-10-24
description: "Önceki yazımda Wpf nedir nasıl kullanılır bilgileri paylaşmıştım. Bu yazı devam niteliğindedir. Wpf tek başına görsel olarak yetersiz kalsa da bu konu"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![Wpf Blend - WPF Blend Uygulaması](/wp-images/2018_10_wpf_blend-696x693.png "wpf_blend")](/wp-images/2018_10_wpf_blend.png)

Önceki yazımda Wpf nedir nasıl kullanılır bilgileri paylaşmıştım. Bu yazı devam niteliğindedir. Wpf tek başına görsel olarak yetersiz kalsa da bu konuda yine Microfost tarafından geliştirlen Blend uygulaması devreye giriyor.

Blend nedir sorusunu tek bir cümleyle özetlemek gerekirse WPF için tasarım yapmaya yarayan ortamımız diyebiliriz.

Blend daha çok kod tarafından ziyade görsel olarak tasarım yapmamıza olanak sağlar. Böylece XAML dediğimiz asıl arka plan olan kodlara hiç dokunmamıza gerek kalmamaktadır. Tıpkı Web programlamada Html yazmak yerine sürükle bırak yapmamızı sağlayan uygulamalar nasıl varsa blend de buna örnek olabilir.

## Blend Uygulama

Blend uygulamasını yapmak için önceki  yazılarda bahsettiğim gibi bir adet WPF uygulaması açmamız gerekmektedir. Tek başına da blend uygulaması kullanılabilmektedir ancak görsel olduğundan dolayı pek tercih edilmemektedir.  
Wpf üzerinden yazdığımız uygulamaya görsellik katmak amacıyla WPF -> Blend geçişi bulunmaktadır.

![WPF ](/wp-images/2018_10_5.png)

Okla gösterilen yerden “Desing in Blend” Blend uygulamasının arayüzüne  geçiş yapabilmekteyiz.

Bu adımdan sonra sol tarafta bulunan toolbox bölümünden tıpkı wpf gibi button label vs gibi elementler ekleyebilmekteyiz.

## Blend Storyboard Kullanımı

Blend uygulamasında en çok kullanılan kısım storyboardlar ve animasyonlardır. Adı üzerinde olduğu gibi bir animasyon katmamızı ve bunu hiç kod yazmadan yapmamızı sağlıyor. Örneğin bir butonun veya bir logonun kendi etrafında 360 derece hareket etmesi veya başka bir sayfaya geçişin animasyon olarak geçiş yapması gibi özellikler uygulayabilmekteyiz.

Buna ek olarak effect bölümünden de gölge vs gibi efektler de ekleyebilmekteyiz.

![C#](/wp-images/2018_10_1.png)

Burada okla gösterilen bölümden “+” sembolüne tıklıyoruz. Ardından storyboardımızın adını belirliyoruz. Ekranın çerçevesinin köşesinde “recording on” yazısı gözükemtedir. Bu adımdan sonra ekran izlemesi başlar ve ekranda yapılan değişikler kişi kontrolünde animasyona çevrilebilir.

![c#](/wp-images/2018_10_2.png)

Bu adımda süre belirleme işlemi yapıyoruz. Bu örnekte $ logosunu 360 derece döndürme işlemi yapacağım. Bu işlem süresini 2sn olarak belirliyorum. Sarı çizgiyi sağ tarafa çekerek. Ardından logonun properties kısmından veya kenarlarındaki oklardan ekseni etrafında çeviriyorum. Daha sonra sol üst köşedeki recording on yazısında tıklıyorum ve off oluyor. Artık yaptığımız animasyon kayıt altına alındı.

![C#](/wp-images/2018_10_3.png)

Kayıt tamamlandıktan sonra sol tarafta bulunan Trigers kısmından neyin tetikleyeceğini belirlememiz gerekmektedir. Eğer belirlemezsek  varsayılan olarak Window Load yani ekran açıldığında animasyon çalışacaktır. Ancak bir çok event olduğundan istenilen durumlarda ayarlanabilir. Diğer ayarlardan da kaç kere tekrar edeceği ne zaman duracağı gibi özellikler eklenilerek geliştirilebilir.