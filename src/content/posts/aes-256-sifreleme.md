---
title: "C# AES 256 Şifreleme ve Deşifreleme"
published: 2018-11-09
description: "Bu yazıda şifreleme teknikleri arasında sıkça kullanılan AES 256 şifreleme yönteminden bahsedeceğim. Özelliklerine değindikten sonra şifreleme ve çözm"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![Aes 256 Min - C# AES 256 Şifreleme ve Deşifreleme](/wp-images/2018_11_aes-256-min.jpg "aes 256")](/wp-images/2018_11_aes-256-min.jpg)

Bu yazıda şifreleme teknikleri arasında sıkça kullanılan AES 256 şifreleme yönteminden bahsedeceğim. Özelliklerine değindikten sonra şifreleme ve çözme işlemini yapan bir uygulama örneğinden bahsedeceğim.

Şifreleme simetrik ve asimetrik şifreleme olarak 2 kategoriye ayrılmaktadır. AES 256 bu tekniklerden simetrik şifreleme grubuna dahil olmaktadır. Şifrelemek için tek bir anahtar bulunur. Aynı anda şifreyi çözmek için de bu anahtara ihtiyaç duyulur. AES Rijndael şifreleme algoritmasının standartlaşmış hali olarak da tanımlanabilir. Kelime anlamı olarak da AES(Advanced **Encryption** Standard) gelişmiş şifreleme standartı olarak kabul edilmiştir. Uluslararası olarak bir standart haline gelmiştir. 256 bit anahtar uzunluğuna sahiptir.

## AES 256 Şifreleme

C# üzerinden Cryptography sınıfı üzerinden işlemlerimizi yapacağız. Bu yüzden System.Security namespaceini projemize eklememiz gerekmektedir.

Bu namespace içerisinde AES  sınıfından bir nesne türetiyoruz. Bu nesne üzerinden şifreleme modunu belirliyoruz. AES 256 blok şifreleme yaptığından dolayı ChiperMode üzerinden hangi blok kullanacağımızı belirliyoruz. Bu uygulamada CBC modu kullandım ancak CFB,CTS gibi 5 adet daha modu bulunmaktadır.

CBC (Cipher Block Chaning)  blok olarak her bir blok yapısının ile şifrelenmesinden  önce bir önceki blok ile XOR işlemine tabii tutulması anlamına gelmektedir. Ancak ilk blok hangi blok ile XOR işlemine gireceği belirsizdir. Bunun önüne geçmek için IV dediğimiz kavram ortaya çıkmıştır. Bu sebeple son bloktaki şifrelenmiş bloğun çözümü bize metini vermeyecektir. IV ile tekrardan çözümü ana metini verir.

Sonrasında blocksize ve keysize gibi kısıtlamalar yaparak şifreleme yöntemini düzenleyebiliyoruz. Ardından key ve IV dediğimiz şifrelemeyi yapacağımız anahtarları girmemiz gerekiyor. Bu anahtarlar gizli ve kimse tarafından bilinmemesi gerekmektedir.

Metnimizi bloklara böldükten sonra okuma işlemi yapıp  her bloğu okuyup şifreleme işlemini gerçekleştiriyoruz. Ardından Convert.ToBase64() metodu ile şifreli metine hash işlemini uyguluyoruz.

public static string EncryptString (string plainText, byte\[\] key, byte\[\] iv)
{
    Aes encryptor = Aes.Create ();
    encryptor.Mode=CipherMode.CBC;
   
    //encryptor.KeySize = 256;
    //encryptor.BlockSize = 128;
    //encryptor.Padding = PaddingMode.Zeros;

    // Set key and IV
    encryptor.Key=key;
    encryptor.IV=iv;
    MemoryStream memoryStream = new MemoryStream ();
    ICryptoTransform aesEncryptor = encryptor.CreateEncryptor ();
   
    CryptoStream cryptoStream = new CryptoStream (memoryStream, aesEncryptor, CryptoStreamMode.Write);
    byte\[\] plainBytes = Encoding.ASCII.GetBytes (plainText);
    cryptoStream.Write (plainBytes, 0, plainBytes.Length);
    cryptoStream.FlushFinalBlock ();
    byte\[\] cipherBytes = memoryStream.ToArray ();
   
    memoryStream.Close ();
    cryptoStream.Close ();
    string cipherText = Convert.ToBase64String (cipherBytes, 0, cipherBytes.Length);

    return cipherText;
}

## AES 256 Deşifreleme

Şifre çözme işlemini de gerçekleştirirken yine benzer bir mantığın tersten işleyişi olarak düşünebiliriz. Blok olarak gelen şifreli metni elimizde bulundurduğumuz IV ve Key ile tersine şifreleme uygulayarak ana metine ulaşabilmekteyiz. Bunun için hangi CipherMode ile şifrelendiğini de bilmek zorundayız. Blok yapısını bilmeden okuma işlemini yapamayız.

public static string DecryptString (string cipherText, byte\[\] key, byte\[\] iv)
{
    Aes encryptor = Aes.Create ();
    encryptor.Mode=CipherMode.CBC;
    //encryptor.KeySize = 256;
    //encryptor.BlockSize = 128;
    //encryptor.Padding = PaddingMode.Zeros;

    // Set key and IV
    encryptor.Key=key;
    encryptor.IV=iv;
   
    MemoryStream memoryStream = new MemoryStream ();
    ICryptoTransform aesDecryptor = encryptor.CreateDecryptor ();
    
    CryptoStream cryptoStream = new CryptoStream (memoryStream, aesDecryptor, CryptoStreamMode.Write);
    
     string plainText = String.Empty;
    
   try
    {
        byte\[\] cipherBytes = Convert.FromBase64String (cipherText);
        cryptoStream.Write (cipherBytes, 0, cipherBytes.Length);
        cryptoStream.FlushFinalBlock ();
        byte\[\] plainBytes = memoryStream.ToArray ();
        plainText=Encoding.ASCII.GetString (plainBytes, 0, plainBytes.Length);
    }
    finally
    {
        memoryStream.Close ();
        cryptoStream.Close ();
    }
               return plainText;
}

## SHA 256 Şifreleme

SHA 2- altında geliştirilmiş bir şifreleme algoritmasıdır. Aşağıda örnek kodu bulunmaktadır.

public static string CreateSHA256 (string clearpwd, int x)
     {
         using (var sha = SHA256.Create ())
         {
             var computedHash = sha.ComputeHash (Encoding.Unicode.GetBytes (clearpwd+RandomString (x)));
             return Convert.ToBase64String (computedHash);
         }
     }

Örnek Proje : [GitHub](https://github.com/berkarat/AES256-SHA_Encrypt_Decrypt)