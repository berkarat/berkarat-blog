---
title: "Arduino ve Çeşitleri"
published: 2018-01-31
description: "Arduino temel anlamda en basit tanımı elektronikle yazılımı bir araya getiren ve bir çok kontrol kabiliyeti sağlayan bir mikroişlemcisi olan, açık kay"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

Arduino temel anlamda en basit tanımı elektronikle yazılımı bir araya getiren ve bir çok kontrol kabiliyeti sağlayan bir mikroişlemcisi olan, açık kaynak kodu sayesinde geliştirilebilir, ekleme çıkarma yapılabilen bir platformdur.

Bu sayede en basitinden led yakıp söndürmeden, motor kontrol edebilme, elektronik aletlerin uzaktan bluetooth veya wifi ile kontrolüne hatta internet üzerinden bilgileri çekip bu bilgileri uygun durumlarda işlenmesine kadar bir çok işlem yaptırılabilir. Bu işlemler kişinin programlama kabiliyetine bağlıdır.

Arduino boardlarının bir çok çeşidi vardır boyutlarına göre. Ancak hepsi aynı temel mantıkla kontrol edilir. Üzerinde bulundurduğu  Atmega328 miktodenetleyicisi ( Uno için geçerli olan mikrodenetleyici ) bu kartın kalbidir. Bu işlemcinin programlanması sayesinde kart hayat bulur ve işlem yapmaya başlar.

Bu kartların hedef kitlesi çok geniştir. Elektronik ve yazılım alanlarında giriş seviyesinden uzman seviyesine kadar her kişiye hitap eder. Yukarıda bahsettiğimiz gibi bu kişinin programlama yeteneğine bağlıdır.

# Arduino Programlama

Arduino’ya program yüklemek için kendi ürettikleri bir IDE( Integrated development environment) yani tümleşik geliştirme ortamı vardır. Bu ideye yazacağımız kodlar sayesinde kontrol edeceğimiz elektronik aleti yazılımla birleştirmiş oluruz. Ancak bu yazılım kısmını yapabilmek için temel seviyede C/C++ veya Java dillerine hakim olmak gereklidir. Arduino da Java tabanlı bir yazılım sayesinde kodlanır.

Aynı zamanda Web Editör sayesinde de online olarak kodlama yapılabilinmektedir.

Açık kaynak kodu olması ve bir çok kütüphane barındırması sayesinde öğrenmesi kolay ve yazılan kodun somut bir şekilde görülmesi sayesinde klasik programlama (web, masaüstü, mobil vs.) dillerine göre daha eğlencelidir.

[IDE’ye bu linkten erişilebilir](https://www.arduino.cc/en/main/software)

void setup() {
  
  pinMode(LED\_BUILTIN, OUTPUT); // çıkış pini tanımlandı
}

void loop() {
  digitalWrite(LED\_BUILTIN, HIGH);   // Led yanar
  delay(1000);                       // 1 saniye bekler
  digitalWrite(LED\_BUILTIN, LOW);    // Led söner
  delay(1000);                       // 1 saniye bekler
}

![Blink - Arduino ve Çeşitleri](/wp-images/2018_01_blink-274x300.jpg)

# Arduino’yu neden seçmeliyim?

-   Açık kaynak kodlu olması ve bir çok kütüphane barındırması sebebi birinci önceliktir. Bu sayede geliştirilebilir ve uygun durumlara göre şekillendirilebilir.
-   Maliyet açısından günümüzde 10 tlden başlayan  fiyatlara bulunabilir olması sebebiyle tercih edilebilir.
-   Windows, Macintosh, Linux gibi işletim sistemlerinde uyum sorunu olmadan çalıştırılabilir.(Bunun sebebi ise Java tabanlı olmasından kaynaklıdır. Java dili de platform bağımsız çalışan bir dildir. )

# Çeşitleri

## Arduino Uno

Üzerinde atmega 328 mikrodenetleyici barındıran, usb port sayesinde bilgisayar üzerinden programlanabilen ve seri haberleşme yapabilen kartlar arasında en popüler olanı ve tercih edilenidir. Üzerinde 14 tane dijital giriş çıkış ve 5 adet de analog giriş çıkış vardır.

![Uno - Arduino ve Çeşitleri](/wp-images/2018_01_uno-300x190.jpg)

## Arduino Mega

Aslında bakılırsa teknik özellikler bakımından Uno ile aynıdır ancak üzerinde 54 adet dijital giriş çıkış ve 16 adet analog giriş çıkış bulundurması ayırt edici özelliktir. Avantaj olarak çoklu sensör kullanımlarında büyük bir katkı sağlar. Üzerinden yine atmega serisinin 2560 modelini bulundurur. Ancak kendi deneyimlerinden yola çıkarak arduino meganın besleme voltajı ve frekans değerleri unoya göre biraz farklılık gösterebilmektedir.

![Mega - Arduino ve Çeşitleri](/wp-images/2018_01_mega-300x197.jpg)

## Arduino Lilypad

Arduinonun geliştirlen bu kartı ( her ne kadar kart olmasa da ) kıyafetler için tasarlanmıştır. Günümüzde giyilebilir teknoloji olarak adlandırılan kıyafetlere uyumlu olarak tasarlandığından dolayı daha esnek ve küçük yapıdadır. Örneğin kalp nabız atım hızına göre bize uyarı veren bir projede rahatlıkla kullanılabilir.

![Lili - Arduino ve Çeşitleri](/wp-images/2018_01_lili-300x225.jpg)

## Arduino Nano

Bu kart serilerinin arasında en çok kullanılan ikinci kartıdır. Genellikle boyutu açısından ve hafifliğinden dolayı tercih edilir. Günümüzde artık klonları çıktığından dolayı fiyatları Uno serisiyle hemen hemen aynıdır. Tek veya iki sensörlü projelerde veya yerden tasarruf etmek amacıyla geliştirilen projelerde tercih edilir

![Nano - Arduino ve Çeşitleri](/wp-images/2018_01_nano-300x210.jpg)

## Arduino Bluetooth

Bu kartların bluetooth üzerinden haberleşme yapması için üzerinde iletişimi sağlayan bluetooth modülü tümleşik olarak bulunur. Bu sayede ekstra bir bluetooth modülü kullanmaya gerek kalmaz.

![Blue - Arduino ve Çeşitleri](/wp-images/2018_01_blue-300x199.jpg)

## Arduino Ethernet

İnternet bağlantısı yapmak için üzerinde ethernet portu ve çipi bulunur. İnternetten kontrol tabanlı projeler için tercih edilir. Ekstradan bir ethernet modülüne ihtiyaç duymaz. Diğerlerinden farklı olarak üzerinde sd kart girişi bulunur bu kartlar arasında tek depolama alanı olan serisidir.

![Ethernet - Arduino ve Çeşitleri](/wp-images/2018_01_ethernet-300x225.jpg)

Arduino projeleri hakkında bilgi almak için aşağıdaki linkler yararlı olacaktır.

[Örnek Projeler](https://create.arduino.cc/projecthub)

[Kütüphaneleri](https://www.arduino.cc/en/Reference/Libraries)