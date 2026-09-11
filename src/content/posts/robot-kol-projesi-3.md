---
title: "Robot Kol ile Ayrım Yapan Bant Sistemi Projesi – 3"
published: 2018-05-26
description: "Daha önceki yazıların devamı ve sonuç bölümü olarak devam edeceğimiz bu yazıda projemizi tamamlayacağız. Bu yazıda robot kolun, bant sisteminin ve sen"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

Daha önceki yazıların devamı ve sonuç bölümü olarak devam edeceğimiz bu yazıda projemizi tamamlayacağız. Bu yazıda robot kolun, bant sisteminin ve sensörlerin ayarlarının nasıl yapılacağı, kodlamalarda nelere dikkat edilmesi gerektiğini ve sistemin, sensörlerin algoritmalarını anlatacağım. Önce yazımıza nasıl bir yöntem izlediğimiz hakkında başlayacağım.

# Yöntem

Projemizde temelde 3 bölüm vardır. Konveyör bant üzerinde bir noktadan diğer noktaya elektrik enerjisini mekanik enerjiye çeviren redüktörlü motor sayesinde taşınması ilk adım olarak nitelendirilebilir. Redüktörlü motor rulmanlarla oluşturulmuş karkasa bağlıdır ve mekanik olarak güç üreterek bantın hareketini bir diğer anlamıyla bant üzerindeki ürünün hareket etmesini sağlamaktadır. İkinci adım bu projedeki en kritik adımdır. Bu adımda IR kızılötesi sensörler tarafından konveyör bant kontrolü, renk sensörü ve robot kolunun tetiklenmesi sağlanır. Projemizde biri alta, diğeri üste yerleştirilmiş olmak üzere 2 adet IR sensör kullanılmıştır. Altta bulunan sensörden okunan veriye göre önünde engel olup olmamasına göre bantın hareketini kontrol etmektedir. Bu durum gerçekleştiği sırada motor durur ve renk sensörü ardından robot kol devreye girer. İki IR sensörünün birlikte çalışmasıyla ürünün büyük ve küçük ayrımı da yapılmaktadır.

Bant durup ürün gerekli yere geldiği zaman ürünün altına denk gelecek şekilde yerleştirilmiş TCS3200 renk algılama sensörü de tetiklenmiş olur.

Bu sensör projemizde ürün renginin hangi renk olduğunu veya istediğimiz renkle uyup uymadığını karşılaştırmak için kullanmaktayız. Sensörün bağlantılarını yaptıktan sonra sensör renkleri serial monitöre gönderir. Elimizde 2 adet renk bulunmaktadır. Renklerin sayısı arttırılabilir. Red ve blue. Bu renklerin kendi aralarında kıyaslayarak kalibrasyon işlemine tabii tutuyoruz. Ancak bunu yaparken hassas ve sürekli değişken değerler karşımıza çıkmakta ve bu durum hataya yol açmaktadır.Bu istenilmeyen durumu  engellemek için sensörün algılama kısmına dışarıdan ışık almasını engellemek için koruyucu kılıf koyulması daha doğru sonuçlara ulaşmamızı sağlar. OUT bacağından aldığımız sinyaller sayesinde renk algılamasını yapmış oluruz. Renk algılama işlemi de bittikten sonra robotik kol devreye girmektedir.

Ürünün boyutu ve rengi artık belleğe alındığından dolayı daha önceden koordinatları belli olan noktaya robotik kolumuz gelir ve ürünü alarak bırakması gereken yere bırakır ve başlangıç konumuna geri döner. Bu sayede gelen farklı ürünleri istenilen bölgelere istif etmiş bulunmaktayız. Aynı zamanda renklerin daha kolay anlaşılması için algılanan rengi RGB Led modülü sayesinde görsel bir şekilde de gösterilmektedir.

# Sistemin Çalışma Algoritması

![Sistem - Robot Kol ile Ayrım Yapan Bant Sistemi Projesi – 3](/wp-images/2018_05_sistem-1024x954.png)

# IR Sensörlerinin Çalışma Algoritması

# ![Robot Kol ile Ayrım Yapan Bant Sistemi Projesi – 3 ekran görüntüsü 2](/wp-images/2018_05_IR.jpg)

# Sistemin Devre Şeması

![Devre Min - Robot Kol ile Ayrım Yapan Bant Sistemi Projesi – 3](/wp-images/2018_05_devre-min-1024x731.jpg)

# Robot Kolun Programlanması

#include<Servo.h>
Servo servo\_on;
Servo servo\_arka;
Servo servo\_el;
Servo servo\_alt;

void setup() {
  servo\_arka.attach(5);
  servo\_on.attach(10);
  servo\_el.attach(9);
  servo\_alt.attach(6);
}

void loop(){
saga\_birak();
}

void al() {
  servo\_arka.write(25);//60-25
  ac();
  ileri();
  kapat();
  geri();
}
void saga\_birak(){
  servo\_arka.write(45);
  ac();
  ileri();
  kapat();
  geri();
  saga();
  en\_ileri();
  ac();
  en\_geri();
  sagdan\_baslangica();
}
void geri() {
  for (int i = 140; i > 65; i--)
  { // geri
    servo\_on.write(i); delay(7);
  }
}
void ileri() {
  for (int i = 65; i < 140; i++)
  { //ileri
    servo\_on.write(i); delay(7);
  }
}
void saga() {
  for (int i = 87; i > 30; i--)
  { //saga
    servo\_alt.write(i); delay(7);
  }
}
void sagdan\_baslangica() {
  for (int i = 30; i < 87; i++)
  { //sagdan baslangica
    servo\_alt.write(i); delay(7);
  }
}
void kapat() {
  for (int i = 85; i < 115; i++)
  { // kapa
    servo\_el.write(i); delay(7);
  }
}
void ac() {
  for (int i = 115; i > 85; i--)
  { // ac
    servo\_el.write(i); delay(7);
  }
}

Yukarıdaki kodda robot kolun sadece bir işlemi yapması için gereken komutlar mevcuttur. Diğer durumlarda yapması gerekenlerin de benzer şekilde programlanması gerekmektedir. Yazının sonunda GitHub linkinden ulaşılabilir detaylarına.

# Konveyör Bandın Programlanması

#define Motor\_enable  11 // motor sürücü hız kontrolü
#define Motor\_ileri 12// motor sürücü ileri
void setup() {
  pinMode(Motor\_enable, OUTPUT);
  pinMode(Motor\_ileri, OUTPUT);    // MOTOR  çıkış pinleri
}
void loop() {
basla\_motor();
dur\_motor(); }

/\* MOTOR SÜRÜCÜ KODLARI\*/
void basla\_motor() {
  digitalWrite(Motor\_ileri, HIGH);
  analogWrite(Motor\_enable, 100);
}

void dur\_motor() {
  digitalWrite(Motor\_ileri, LOW);
  analogWrite(Motor\_enable, 0);
}

# IR Sensörlerin Programlanması

char deger;
int val\_1; // IR Sensör-1
int val\_2;// IR Sensör-2
int d\_alt = 8;
int d\_ust = 7;
void setup() {
  pinMode(d\_alt, INPUT);
  pinMode(d\_ust, INPUT);}
void loop() {
  int val\_2 = digitalRead(d\_ust);
  int val\_1 = digitalRead(d\_alt);
  Serial.println(val\_1);
  Serial.println(val\_2);}

# TCS3200 Programlanması

int S2 = 3; // TCS3200 bağlantı
int S3 = 4;// TCS3200 bağlantı
int outpin = 2;// TCS3200 bağlantı
char col;
int r ; // kirmizi renk
int g ;// yesil renk
int b ;// mavi renk
int w ;// beyaz renk
unsigned int plusewidth;
void setup() {
  pinMode(S3, OUTPUT);            // TCS3200  sensör çikis pinleri
  pinMode(S2, OUTPUT);
  pinMode(outpin, INPUT);}
void loop() {
      col = renk\_oku();}
/\* RENK ALGILAMA KODLARI \*/
char renk\_oku() {
  char color;
  // kirimizi renk için okuma islemi
  digitalWrite(S2, LOW);
  digitalWrite(S3, LOW);
  r = pulseIn(outpin, LOW);
  //  r = plusewidth / 400. - 1;
  //  r = (255 - r);
  /\*----------------------\*/

  //yesil renk için okuma islemi
  digitalWrite(S2, HIGH);
  digitalWrite(S3, HIGH);
  g = pulseIn(outpin, LOW);
  // g = plusewidth / 400. - 1;
  //    g = (255 - g);

  /\*----------------------\*/

  //mavi renk için okuma islemi
  digitalWrite(S2, LOW);
  digitalWrite(S3, HIGH);
  b = pulseIn(outpin, LOW);
  //   b = plusewidth / 400. - 1;
  //  b = (255 - b);

  /\*----------------------\*/

  //beyaz renk için okuma islemi
  digitalWrite(S2, HIGH);
  digitalWrite(S3, LOW);
  w = pulseIn(outpin, LOW);
  //
  //    w = (255 - w);}

# Sonuçlar

Ülkemizde henüz robotik sistemler tam anlamıyla uygulama alanına geçmemiştir. Gelişmiş ülkelerde bu durum daha farklı ve uyum sağlanmıştır. Bu sayede fazla insan gücü kullanmak yerine robotik sistemlere geçilerek maaliyet ve zamandan tasarruf edilmiş, ekstra bir istihdam alanı yaratılmıştır. Dünya’da gelişen Endüstri 4.0 teknolojisiyle birlikte robotik sistemlerin üretimdeki rolü daha da artmıştır ve neredeyse zorunlu hale gelmiştir. Bu çalışmada prototip olarak bant sistemi – algılama bölümü( sensörlerin bulunduğu bölüm) ve robotik kol birbirleriyle  Arduino mikroişlemcisi sayesinde ortak iletişim kurarak birbirleriyle uyumlu bir şekilde çalışmaktadır. Maliyet açısından da en ucuz şekilde prototip olarak üretilmiştir. Çalışmadaki düzenekler geliştirilerek daha hızlı ve hassas duruma getirilebilir.  Bu sayede farklı alanlarda, farklı ortamlarda kullanılabilir.

-   Örnek-1 bant sistemini açılı bir şekilde kullanılması ile zeminden yükseğe doğru bir sistemde alttan üretilen ürün yukarıda işleme tabii tutulabilir.
-   Örnek-2 Robotik kolun plastik yerine metalden yapılması ile daha güçlü duruma gelmesi, kullanılan servo motorların güçlü servolarla değiştirilmesi ile sistem daha büyük yükler üzerinde işlemi rahatlıkla sağlayabilir.

Hiçbir düzeneği olmayan ortamlarda uygulanması açısından eksikleri vardır. Ancak düzenlemenin yapılacağı ortamlarda verimli çalışıp düzenleme maaliyetini amorti edecektir.

#### Ekler

[Projenin tez yazısı](https://yadi.sk/i/F3sGqmzr3WZkty)

[Projenin Poster Sunumu](https://yadi.sk/i/7lBhDBCk3WZm6z)

[Projenin Kaynak Kodları](https://github.com/berkarat/Robotik-kol-kontrollu-bant-sistemi)