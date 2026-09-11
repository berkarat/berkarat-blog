---
title: "Windows 10 IOT Core ve Raspberry Pi Kurulumu"
published: 2020-03-17
description: "Merhabalar bu yazımda Windows 10 IOT Core bildiklerimi sizlere aktaracağım. İlk olarak bu platformun ne olduğundan bahsedeceğim. Ardından nasıl yüklem"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![Win10Iotcore - Windows 10 IOT Core ve Raspberry Pi Kurulumu](/wp-images/2020_03_win10iotcore-696x392.jpg "win10iotcore")](/wp-images/2020_03_win10iotcore.jpg)

Windows 10 IOT Core

Merhabalar bu yazımda Windows 10 IOT Core bildiklerimi sizlere aktaracağım. İlk olarak bu platformun ne olduğundan bahsedeceğim. Ardından nasıl yükleme yapıldığı gibi konulara değineceğim

Windows 10 IoT (Internet of Things) Microsoft tarafından gömülü sistemler için ortaya çıkarmış olduğu bir işletim sistemidir. Adından da anlaşılacağı gibi Windows kurulumu olarak karşımıza çıkıyor. Ancak windows olmasına ragmen bir çok özellikleri kırpılmış ve sadece ihtiyaç duyulan şeylerin bulunduğu bir platformdur.

Raspberry Pi için konuşacak olursak genel işletim sistemi Raspbianda bahsedeyim. Bu işletim sisteminde komutlarla Raspberry üzerinden geliştirme yapabiliyorduk. Ancak bu bize bazı zorluklar çıkarıyordu. Windows 10 Iot ile birlikte artık tıpkı arduinoda olduğu gibi yazdığımız programı raspberry üzerine gömerek çalıştırabilmekteyiz.

Raspbianda geliştirme için ekstradan klavye mouse ve monitöre ihtiyaç duyuyorduk. Ancak bu platformda buna ihtiyaç bulunmamaktadır. Tek yapmamız gereken Visual Studio kullanarak oluşturduğumuz kodu raspberrye gömmek. Raspberry bilgisayar özelliğini yitirmiş olması bir dezavantaj olabilir ancak uzaktan Visual Studio üzerinden geliştirmek de çok büyük bir artı sağlamaktadır.

Tabii bunun avantajları rahatlık gibi görünse de asıl güzel yanı platform olarak .Net kodları yazarak istediğimiz şekilde program geliştirebilmekteyiz. Ayrıca Azure IoT desteğiyle cloud programlamaya da imkan sağlamaktadır.

Windows 10 IoT iki farklı modeli bulunmaktadır. Bir tanesi Enterprise diğeri ise IoT Core. Enterprise birden fazla cihaz üzerine kurulum sağlanırken Core ise tek bir cihazda kullanılabilmektedir.

Bu platform Raspberry üzerindeki ek sensörlerle etkileşimlere uyumlu bir şekilde çalışmaktadır.

IoT core arayüze sahip değildir. Bu yüzden geliştirdiğimiz uygulamayı Visual Studio üzerinden yapmalıyız. Buradaki görsellik için ise tıpkı WPF’de kullandığımız XAML yapısı karşımıza çıkıyor.

## Windows IoT Kurulumu

İhtiyacımız olan malzemeler 1 adet raspberry ve minimun 4 GB boyutunda SD kart.

İlk olarak yapmamız gerek aşağıdaki linkten Windows IoT Core Dashboard uygulamasını indirmek.

[https://docs.microsoft.com/en-us/windows/iot-core/downloads](https://docs.microsoft.com/en-us/windows/iot-core/downloads)

Ardından karşımıza aşağıdaki gibi bir ekran gelecek burada SD kartımızı takıyoruz ve gerekli yerleri dolduruyoruz. Eğer yazacağımız uygulama internet gerektiriyorsa buradan internet bağlantısını da yapabiliriz.

![Windows 10 Iot Core Dashboard - Windows 10 IOT Core ve Raspberry Pi Kurulumu](/wp-images/2020_03_Windows-10-IoT-Core-Dashboard-1024x676.png)

Daha sonra download ve install diyerek  işletim sistemini kurmuş oluyoruz. Ardından cihazımızı ethernet kartı üzerinden kendi bilgisayarımıza bağlıyoruz. My Devices kısmından Dashboard ve IP ayarlamaları gibi özellikleri düzenleyebiliriz.

Raspberrymizi bir ekrana bağladığımızda aşağıdaki ekran gelmektedir. Buradan birkaç ayar yapılabilir ancak bir geliştirmek yapmak mümkün değildir.

![Raspberrypi - Windows 10 IOT Core ve Raspberry Pi Kurulumu](/wp-images/2020_03_raspberrypi.jpeg)

Visual Studio Bağlantısı

İlk olarak Visual Studio üzerinden Universal Windows App uygulaması oluşturmamız gerekmektedir. Burada Mainpage. üzerinde XAML yapısında düzenlemeler yapabiliriz. Run ettğimizde aynı görüntü çıkacaktır.

![Visualstudioiot - Windows 10 IOT Core ve Raspberry Pi Kurulumu](/wp-images/2020_03_VisualStudioIOT-1024x392.png)

Burada artık geliştirdiğimiz uygulamaları Local Machine üzerinden kendi localimizde test edebileceğimiz gibi Remote Machine diyerek de Raspberry üzerinden Debug işlemi gerçekleştirebiliriz. Burada Debug tipi olarak ARM seçmemiz gerekmektedir. Debug> Properties alanından Find diyerek cihazımızın bağlantısını kontrol edebiliriz.