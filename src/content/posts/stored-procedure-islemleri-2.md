---
title: "Microsoft Sql Server Stored Procedure İşlemleri-2"
published: 2018-10-31
description: "Bu yazım daha önceki yazım olan Stored Procedure işlemlerinin devamı niteliğinde olan bir yazıdır. Veritabannı işlemlerine devam etmekteyiz. Bu seferk"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![sql server](/wp-images/2018_10_sql.png "sql")](/wp-images/2018_10_sql.png)

Bu yazım daha önceki yazım olan Stored Procedure işlemlerinin devamı niteliğinde olan bir yazıdır. Veritabannı işlemlerine devam etmekteyiz. Bu seferki konularımız update ve delete işlemleri olacak. Aslında sql işlemlerinde update ve delete işlemleri ayrı ayrı olarak görünse de update işlemi ile de delete işlemini gerçekleştirebilmekteyiz.

### Stored Procdure Update

Update işlemini sql olarak yazdıktan sonra aşağıdaki gibi bir Stored Procedure oluşturuyoruz. Buradaki işlemde parolamızı yenileme işlemini gerçekleştiriyoruz. Newpassword isimli parametremizi password isimli parametreye SET ederek güncelleme işlemi yapıyoruz. Bu sql sorgusunu aşağıdaki gibi stored procedure çeviriyoruz. Böylece daha sonra göreceğimiz sorguları çağırma işlemi yaparken tekrar tekrar yazmamıza gerek kalmayacak.

USE \[berkaratcom\]
GO
CREATE PROCEDURE  \[dbo\].sp\_Update

   @ad nvarchar(50),
   @soyad nvarchar(50),
   @email nvarchar(50) ,
   @newpassword nvarchar(50)
    	   
AS 
BEGIN 
  SET NOCOUNT ON;
  UPDATE tbl\_test
SET password=@newpassword
WHERE 
          ad=@ad and 
          soyad=@soyad and 
          email=@email   
END

Daha sonra yazmış olduğumuz procedure doğru çalışıp çalışmadığını kontrol etmek için aşağıdaki sql sorgusunu kullanabiliriz veya daha önce dediğim gibi execute kısmından da test edebiliriz.

USE \[berkaratcom\]
GO

DECLARE	@return\_value int

EXEC	@return\_value = \[dbo\].\[sp\_update\]
    @ad ='Berk',
    @soyad =  'Arat',
    @password = '123456',
    @newpassword =  '0012300',
    @email = '[\[email protected\]](/cdn-cgi/l/email-protection)'

SELECT	'Return Value' = @return\_value

GO

### Stored Procedure Delete

Silme işlemi için de update işlemi gibi benzer bir yapıya sahiptir. Genellikle drop komutuyla karıştırılmaktadır. Ancak drop tamamen tablo üzerinde işlem yaparken delete ise sadece şartı sağlayan satırı silmektedir.

Aşağıda belirttiğimiz Stored procedure örneğinde email adresi bizim verdiğimiz mail ile eşleşen üyenin kaydını tablodan silmektedir.

USE \[berkaratcom\]
GO
CREATE PROCEDURE  \[dbo\].\[sp\_delete\]
    @ad nvarchar(50),
    @soyad nvarchar(50),
    @email nvarchar(50) 
    	   
AS 
BEGIN 
  SET NOCOUNT ON;  
  Delete tbl\_uyebilgi 
WHERE 
ad=@ad       and 
soyad=@soyad and 
email=@email   
END

Bu işlemi yaptıktan  sonra yazdığımız sorgunun doğruluğunu kontrol etmek için aşağıdaki sorguyu execute ediyoruz ve kaydımızın silindiğini görüyoruz.

USE \[berkaratcom\]
GO

DECLARE	@return\_value int

EXEC	@return\_value = \[dbo\].\[sp\_delete\]
    @ad =  'Berk',
    @soyad =  'Arat',
    @email =  '[\[email protected\]](/cdn-cgi/l/email-protection)'

SELECT	'Return Value' = @return\_value

GO

Bu iki yazımdaki örnekleri daha sonra C# üzerinde kullanacağımız programlarda çağıracağız. Böylece C# üzerinden stored procedureler kullanarak veritabanı işlemleri gerçekleştirebileceğiz. Program üzerinde yazılacak olan sıfırdan sorgular performans açısından çok yetersiz kalmaktadır. Bunun yanı sıra dinamik bir yapının oluşmasının da önüne geçmektedir. Genelde projelerde stored procedureler kullanılmakta ve bunlar temel rol almaktadır.

Örneğin bir monitoring yani takip programı yazıldığını düşünürsek ve sürekli veri tabanına bilgi akışının olduğu bir senaryoyu ele alalım. Bu senaryoda program içerisinde farklı threadler farklı tablolara bilgi yazacak update edecek veya select işlemlerini yapacaklar. Eğer program üzerinden sorgular gönderilirse sorgulama işlemi c# üzerinde yapılmış olacak. Ancak stored procedureler kullanıldığı takdirde iş yükü paylaşılmış olacak ve c# üzerinden sadece parametreler gönderilecek sorgulama kısmı sql server üzerinde gerçekleşecektir.