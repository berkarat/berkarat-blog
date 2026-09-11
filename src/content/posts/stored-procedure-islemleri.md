---
title: "Microsoft Sql Server Stored Procedure İşlemleri-1"
published: 2018-10-30
description: "Merhaba bu yazımda Sql server üzerinden bazı temel işlemlerin nasıl yapıldığına dair açıklamalar ve örneklerden bahsedeceğim."
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![sql server](/wp-images/2018_10_sql.png "sql")](/wp-images/2018_10_sql.png)

Merhaba bu yazımda Sql server üzerinden bazı temel işlemlerin nasıl yapıldığına dair açıklamalar ve örneklerden bahsedeceğim.

Öncelikle Stored Procedure dediğimiz kavramı açıklamak istiyorum. Bunlar bir görevi tamamlamak için yazmış olduğumu kod parçalarıdır. Örneğin bir tablo oluşturma işleminin sorgusunu biz hazır bir format haline getirip dışarıdan parametre alabilir bir forma dönüştürürsek bunu sp olarak kaydetme imkanımız vardır. Spler parametre aldıkları gibi kendi içlerinde de başka bir sp çağırabilirler. Performans açısından büyük verilerde çok hızlıdırlar.

USE "Database Name" 
GO
  
CREATE PROCEDURE  "Stored Procedure Name"
// Varsa parametrelerin declare edileceği bölüm  

AS
BEGIN

SET NOCOUNT ON;

// Yazacağımız Sorgu 
END

Yukarıda gördüğümüz gibi temelde normal sql sorguları gibi aynıdır yapıdadır ancak parametre alma durumlarında declare dediğimiz tanımlama işlemleri yapmamız gerekmektedir.

### Stored Procedure Create

Örnek olarak bir tablo oluşturalım ardından o tabloya veri ekleyelim ve ardından bu verileri çekme işlemini yapacak spleri oluşturalım.

USE \[berkaratcom\]
GO
CREATE PROCEDURE \[dbo\].\[sp\_CreateTable\]
AS
BEGIN
  SET NOCOUNT ON;

CREATE TABLE  tbl\_test(
  \[ad\] \[nvarchar\](50) NULL,
  \[soyad\] \[nvarchar\](50) NULL,
  \[yas\] \[int\] NULL,
  \[password\] \[nvarchar\](50) NULL,
  \[email\] \[nvarchar\](50) NULL,
  
) ON \[PRIMARY\]
END

Bu sql sorgumuz bize tbl\_test adında 5 tane parametresi olan bir tablo oluşturmaktadır. Stored procedur adımız ise sp\_CreateTable olarak belirledik bu sorguyu execute ettiğimiz zaman Programmability>Stored Procedure yolunun altında procedure görünecektir.

### Stored Procedure Select

Bu sql işleminde select yani çağırma işlemini gerçekleştireceğiz.

Burada dikkat edilmesi gereken nokta iki farklı tablo ile işlem yapmaktayız. Bu tabloların birine “a” diğerine “b” olarak tanımlıyoruz. Ardından a. veya b. şeklinde o tablonun istenilen sütununu çağırabiliyoruz. Böylece bir sorguda iki tabloya hükmedebiliyoruz. Bu sayede birbirleriyle ilişkili tablolar da oluşturabilmekteyiz.

USE \[berkaratcom\]
GO
CREATE PROCEDURE \[dbo\].\[sp\_select\]
AS
BEGIN

  SET NOCOUNT ON;

 SELECT 
   a.film\_ad,
   b.koltuk\_sayisi,
   a.dolu\_koltuk sayisi
 	  
  FROM 
     dbo.tbl\_koltukdurumu a,
     dbo.tbl\_koltukdurumu b
 WHERE
    a.film\_id=b.film\_id

 
END

USE \[berkaratcom\]
GO

DECLARE	@return\_value int

EXEC	@return\_value = \[dbo\].\[sp\_select\]

SELECT	'Return Value' = @return\_value

GO

### Stored Procedure Insert

Daha sonra tablolar kısmında tbl\_test tablomuza insert işlemi gerçekleştirecek bir procedure oluşturalım.

USE \[berkaratcom\]
GO

CREATE PROCEDURE  \[dbo\].\[sp\_insert\]

    @ad nvarchar(50),
    @soyad nvarchar(50),
    @yas int, 
    @password nvarchar(50),
    @email nvarchar(50) 
    	   
AS 
BEGIN 
  SET NOCOUNT ON;
   
  INSERT INTO \[dbo\].tbl\_test
           (\[ad\]
           ,\[soyad\]
           ,\[yas\]
           ,\[password\]
           ,\[email\])
 
     VALUES
            ( 
         @ad,@soyad,@yas,@password,@email )
     
END

Buradaki sql örneğimizde  sp\_insert adından bir sp oluşturuyoruz ve ardından declare dediğimiz parametreleri tanımlama yapıyoruz. Burada dikkat edilmesi gereken nokta parametrelerin değerleri ile tablodaki değerler aynı olmalıdır aksi takdirde hata mesajı ile karşılaşırız.

USE \[berkaratcom\]
GO

DECLARE	@return\_value int

EXEC	@return\_value = \[dbo\].\[sp\_insert\_test\]
    @ad = 'Berk',
    @soyad = 'Arat',
    @yas = 25,
    @password = '123456',
    @email = N'[\[email protected\]](/cdn-cgi/l/email-protection)'

SELECT	'Return Value' = @return\_value

GO

Ardından sql querry modundan da yapacağımız bu sorgu ile işlemimizin doğru olup olmadığını test edebiliriz. Eğer sorgusuz yapılmasını istiyorsanız modify seçeneği ile de yapılabilir.

#### _**Ek bilgi**_ 

#### nvarchar ile varchar arasındaki fark şudur :

varchar : latif alfabesi için kullanılır ve her karakter için 1 byte veri boyutuna sahiptir.

nvarchar : Arap, Çin alfabeleri gibi Latin olmayan alfabeleri de kapsamaktadır ve her karakter için 2 byte veri boyutuna sahiptir.