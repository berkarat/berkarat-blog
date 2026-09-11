---
title: "L298-N Motor Sürücü Kullanımı"
published: 2018-02-01
description: "Merhaba, bu yazımda sizlere bir çok projede kullanılan L298-N motor sürücü kartını, çalışma şeklini ve arduino kartı ile bağlantısının nasıl yapılacağ"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![L298-N motor sürücü](/wp-images/2018_02_l298n-696x696.jpg "L298-N")](/wp-images/2018_02_l298n.jpg)

Merhaba, bu yazımda sizlere bir çok projede kullanılan L298-N motor sürücü kartını, çalışma şeklini ve arduino kartı ile bağlantısının nasıl yapılacağı hakkında bilgi vereceğim. Kullanılan örnek projelerdeki öneminden bahsedeceğim.

L298 N entegresi ile başta Dc motorlar olmak üzere bir çok Arduino projelerinde kullanılan bir motor sürücü entegresidir. İki adet çıkışı vardır. Ve her çıkış maksimum olmak üzere 2 ampere kadar akım vermektedir. Çıkışlar 6 ile 15 volt arası gerilim verebilmektedir.

Besleme geriliminde ise 2 tip besleme girişi mevcuttur. +5v besleme ve 12v besleme girişleri

Bu girişlerden +5v besleme gerilimi arduinomuzun +5v pininden beslenmektedir. Ancak bu besleme tipi pek önerilmemektedir. [Arduino ve Çeşitleri](https://blog.berkarat.com/arduino-ve-cesitleri/) yazımızda belirttiğimiz gibi arduinonun çalışma gerilimi 5 volttur ancak verebileceği  akım değeri az olduğundan dolayı güçlü bir cihazın fazla akım çekmesinden kaynaklı Arduino kartımız zarar görmesi muhtemeldir.

Diğer besleme yöndemi ise +12V besleme gerilimidir. L298N datasheeti incelendiğinde üzerindeki entegrenin çalışma gerilimi 6-32 v aralığında gösterilmektedir. Bu sebeple maksimum 32 voltluk bir dc güç kaynağıyla beslemek mümkündür. Genel yaygın kullanım olarak beslemelerde 9V’luk piller kullanılmaktadır. Fakat motorların çektiği akım göz önüne alındığında bu pilin yetersiz kaldığı ve güç düşmesinin de yaptığınız projenin stabil olmasını engellediğini göreceksiniz. Ben kendi projelerimde polimer pil veya 18650 serisi pilleri kullanmaktayım. Böylece şarj etme imkanı sunarak ve yüksek kapasiteleri sebebiyle diğer 9Vluk pillere göre daha kullanışlıdır.

![L298-N Devre Şeması](/wp-images/2018_02_l298-config-300x225.jpg)

L298N sürücü entegremizin üzerinde ilk bakışta 4 adet giriş pini bulunmaktadır. Bu pinler in1,in2,in3,in4 pinleridir. In1 ve in2 pinler sol çıkışa bağlı olan motorları kontrol etmektedir. Bu pinler sayesinde arduinomuzdan gönderdiğimiz sinyallere göre ileri geri hareket ettirmek mümkündür. Veya başka tarzda bir projede kullanımı yine aynı mantıkla çalışmaktadır.

Yukarıdaki pinlerin yanında üzerleri kapalı olarak görünen sol ve sağda olmak üzere iki adet enable pini mevcuttur. Bu pinler sayesinden 0-256 değerleri arasında analog voltaj gerilimi vererek motorumuzun hız ayarını yapmak mümkündür. 0 değeri low yani hiç voltaj gerilimi yok anlamına gelir bu sayede motorumuza enerji gitmez ve durur. 256 değerini verdiğimizde ise motor tam gücüyle çalışarak maksimum hıza ulaşır.

#define MotorR1  5
#define MotorR2  6
#define MotorRE  2
#define MotorL1  9
#define MotorL2  10
#define MotorLE  3

void setup() {
  pinMode(MotorL1, OUTPUT);
  pinMode(MotorL2, OUTPUT);
  pinMode(MotorLE, OUTPUT);         //Motorlarımızı çıkış olarak tanımlıyoruz.
  pinMode(MotorR1, OUTPUT);
  pinMode(MotorR2, OUTPUT);
  pinMode(MotorRE, OUTPUT);
}

Yukarıdaki Arduino kodunda da görüleceği üzere 4 adet giriş pini bulunmaktadır bu sayede sensörler veya arduinodan direkt gelen sinyaller ile süreceğimiz elemanın ne yapması gerektiğine, ne kadar voltaj gerilmesini ayarlayabilmekteyiz.

![L298-N bağlantı şeması](/wp-images/2018_02_Untitled-Sketch-2_bb-300x185.png)

# Peki motor sürücüsü olmadan projelerimizi yapamaz mıyız ?

Aslında yukarıdaki yazıda da bahsettiğim gibi arduino kartımızın verebileceği akım değerlerinin altındaki elemanlarla yapabileceğimiz bir projede mümkün. Ancak birden fazla sensörlü orta seviye bir proje yapmaya kalkıştığımız zaman yetersiz güç hem arduinomuza zarar verecektir. Zarar vermese dahi sensörlerin veya motorların güçten düşmesine yol açacaktır bu da bizi hataya sürükleyecektir. Bu hataların en başında gelen ise sensörler çalışıyor olarak gözükür ancak göstediği değerler arasında farklılıklar olacağı için projemizi doğrudan etkileyecektir. Bu sebeple ya kendi motor sürücü kartımızı yapacağız ya da aliexpress gibi Çin menşeili sitelerden çok daha ucuza sipariş edebileceğimiz hazır sürücü kartlarını kullanmamız gereklidir.

Bu linkten L298-N  sürücü kartı hakkında daha detaylı bilgilere ulaşmak mümkündür

[Motor sürücü datasheet](https://www.sparkfun.com/datasheets/Robotics/L298_H_Bridge.pdf)

[Motor sürücü kodları](https://github.com/berkarat/Arduino-L298-N_Motor_Surucu)