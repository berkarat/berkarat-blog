---
title: "RSA Şifreleme Algoritması"
published: 2018-02-24
description: "_📌 Güncelleme (Ağustos 2026): RSA’nın temel matematiği değişmedi; güvenli kullanım tarafında güncel anahtar boyutu ve dolgu önerileri ayrıca not edil"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![Rsaaa - RSA Şifreleme Algoritması](/wp-images/2018_02_rsaaa.png "RSA")](/wp-images/2018_02_rsaaa.png)

_📌 Güncelleme (Ağustos 2026): RSA’nın temel matematiği değişmedi; güvenli kullanım tarafında güncel anahtar boyutu ve dolgu önerileri ayrıca not edilmiştir._

Bu yazımızda çok popüler olan bir şifreleme algoritmasından bahsedeceğim RSA Şifreleme Algoritması.

Ron **R**ivest, Adi **S**hamir, Leonard **A**dleman kişileri tarafından bulunan bu algoritma ismini de yapan kişilerin soyadlarının baş harflerinden almaktadır. Güvenlik açısından uygulanan bu şifreleme algoritması açık anahtarlamalı bir şifreleme yöntemidir. Çözülme zorluğu bakımından tam sayıların çarpanlarına ayırmasına dayanmaktadır. Bilgisayarlar bildiğimiz üzere işlemleri çok hızlı bir seviyede yapmaktadır. Örneğin 1024×1024 sayısını çarpması çok kısa sürerken 1024 sayısını çarpanlara ayırma işlemi daha uzun sürmektedir. İşte bu algoritmada da metini şifrelerken çarpanlarına ayırma işlemini kullanır ve böylece dışarıdan bir kişinin şifreyi çözmesi için bizim anahtarımız olarak verilen değeri çarpanlarına ayırıp denemeler yapması gerektiğinden kısa bir metini çözmesi bile yıllarca sürebilecek bir işlem süreci kadardır.

**2026 notu:** Aşağıdaki örnekler algoritmayı anlamak için küçük sayılarla anlatılmıştır. Gerçek sistemlerde RSA için en az 2048 bit, tercihen 3072 bit ve üzeri anahtarlar ile OAEP/PSS gibi güvenli dolgu yöntemleri kullanılmalıdır; üretim ortamında kriptografi kütüphaneleri tercih edilmelidir.

n

# Açık Anahtarlı Şifreleme

Bu şifreleme yöntemi en çok kullanılan yöntemlerin başında gelir. Yapısı, şifreleme ve şifre çözmek için farklı anahtarların kullanıldığı bir yöntemdir. Bu yöntemde gizli anahtar (private key) ve açık anahtar ( public key) olmak üzere iki adet anahtar vardır. Bu anahtarlar sayısal değerlerle hesaplanıp metinlerimizi şifrelememize olanak sağlar. Gizli anahtarlar yalnızca bir kullanıcıya aittir. Açık anahtarlarla şifrelenmiş metinin deşifre edilmesini ancak gizli anahtarı kullanarak yani gizli kişinin bilgilerini doğrulamasıyla metini açıp okuma işlemi gerçekleştirebilir.

## Dezavantajları

-   Her kullanıcı kendine ait bir şifre tutmasıyla bütün gizlenmiş metinleri tek anahtarla çözme imkanına sahiptir. Bu da anahtarın kaybolması durumunda veya başka birinin ele geçirmesi durumunda büyük sıkıntılara yol açmaktadır.
-   Anahtarların değiş tokuş edilmesi gerektiğinden dolayı anahtarı karşı tarafa iletmek için bir ağ kullanmak zorundalığı vardır. Bu da ağda ekstra güvenlik önlemi almayı gerektirmektedir.

Örneğin \\(n\\) tane kullanıcı olması durumunda \\(n-1\\) adet şifre oluşturmak gerekli ve bu sistemde tutulmalıdır. Bu da ekstra bellek alanı tutacağından bu da bir dezavantaj olarak görülebilir.

![RSA Algoritması](/wp-images/2018_02_public_key_encripto-min.png)

# RSA Şifreleme ve De-şifreleme Adımları

RSA algoritması 3 adımdan oluşmaktadır. Anahtar oluşturma, şifreleme ve şifre çözme.

## Anahtar Oluşturma

Bu algoritmada iki adet anahtarımız olmak zorundadır. Açık anahtar ve Gizli anahtar. Açık anahtar herkes tarafından bilinir ve göndereceğimiz mesajın şifrelenmesi için kullanılırken, gizli anahtar ise tam tersi şekilde sadece 1 kişi tarafından bilinir ve mesajın çözülmesi için kullanılır.

### Anahtar Şöyle Oluşturulur;

1.  İki adet birbirleriyle asal olan ve birbirlerinden farklı olan iki sayı seçilir. Bunlar \\(p\\) ve \\(q\\) diyelim. Bu sayılar güvenlik sebebiyle rastgele, birbilerine yakın olmalı ve büyük seçilmelidir.
2.  \\(n=pq\\) bu işlemin gerçekleştirilmesinin amacı bir sonraki adımlarda n değerini mod alma işlemi için kullanacağız.
3.  Bu sayıların totient fonksiyonunu alırız. \\(T(n)=(p-1)(q-1)\\)
4.  \\(1<e<T(n)\\) aralığında bir tam sayı üretilir.  Bu ürettiğimiz \\(e\\) sayısı ile \\(T(n)\\) aralarında asal olmak zorundadır.  Burada kullanacağımız \\(e\\) bizim açık anahtarımız olacaktır.
5.  \\(deequiv 1 \\) \\(mod(T(n))\\) olacak şekilde bir \\(d\\) sayısı buluruz.  Buradan gelecek \\(d\\) değeri bizim gizli anahtarımız olacaktır.

Sonuç olarak ortak anahtarımız \\((n,e)\\) den oluşurken gizli anahtarımız \\((n,d)\\) den oluşur. Buna ek olarak ilk başta belirlediğimiz \\(p , q \\) ve \\( T(n) \\) değerleri de gizli kalmalıdır. Bu değerler \\(e\\) ve \\(d\\) değerlerini bulmamızda kullandığımızdan dolayı gizli kalmalıdır.

# Örnek Şifreleme

Örnek olarak “Hello” kelimesini şifreli bir şekilde karşı tarafa göndermemiz gerekirse bunu yukarıda bahsettiğim adımlarla yapmak mümkündür.

1.  Öncelikle iki adet asal sayı seçelim \\(p=11 \\)  \\(q=17 \\)
2.   \\(n=p\*q=11\*17 Longrightarrow n= 187 \\)
3.  \\(T(n)=(p-1)(q-1) = 10\*16 Longrightarrow T(n)=160 \\)
4.  \\(1<e<T(n)Longrightarrow e=3  \\)
5.  \\(deequiv 1 \\) \\(mod(T(n))\\) \\( d=107 Longrightarrow de=321equiv 1 mod(Tn(n)) \\)

Sonuç olarak public keyimiz \\(Longrightarrow n=187\\) \\( e=3\\)

Şimdi kelimemizi şifreleyip gönderme zamanı  ancak çok kısa bir metin olduğun tek tek harf olarak şifreleyip göndermemiz gerekmektedir.

1.  “H” harfinin ASCII karşılığı olan 72’yi alıyoruz ve \\(m=72\\)
2.  \\(m^e=72^3equiv183\\)\\(mod(187)\\)\\(Longrightarrow c=183\\)
3.  Şifrelenmiş “H” harfinin karşılığı 183 olduğundan dolayı saldırganın görebileceği tek şey 183 tür ve 183 ASCII’nin karşılığı ise \\(À\\) harfidir. Bu da hatalıdır.
4.  Şimdi şifrelenmiş karakterimizi de şifre işlemine geçelim.
5.  \\(c^d=183^{107}equiv72\\)\\(mod(187)\\)\\(Longrightarrow m=72\\)
6.   Alıcımız 72 ASCII kodunu görüyor ve bu da H harfine denk geldiğinden dolayı şifreli karakteri çözmüş oluyor. Bu işlemi metinin tamamına yaptığımız zaman karşı tarafa güvenli bir şekilde ulaştırmış oluruz.

#  ![RSA Algoritması](/wp-images/2018_02_RSA2-min.png)![RSA Algoritması](/wp-images/2018_02_RSA1-min.png)Örnek C Kodu

// C programlama dili ile yazılmış RSA algoritması
#include<stdio.h>
#include<math.h>

int gcd(int a, int h)
{
    int temp;
    while (1)
    {
        temp = a%h;
        if (temp == 0)
          return h;
        a = h;
        h = temp;
    }
}
 

int main()
{
    // Two random prime numbers
    double p = 3;
    double q = 7;
 
    //Public Keyler 
    double n = p\*q;
 
   
    double e = 2;
    double phi = (p-1)\*(q-1); // Totient fonksiyonou
    while (e < phi)
    {
     
        if (gcd(e, phi)==1)
            break;
        else
            e++;
    }
 
  
    int k = 2; 
    double d = (1 + (k\*phi))/e;
 
  
    double msg = 20;
 
    printf("Message data = %lf", msg);
 
    //Şifreleme
    double c = pow(msg, e);
    c = fmod(c, n);
    printf("nEncrypted data = %lf", c);
 
    // Deşifreleme  
    m = fmod(m, n);
    printf("nOriginal Message Sent = %lf", m);
 
    return 0;
}

//blog.berkarat.com