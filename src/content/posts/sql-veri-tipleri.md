---
title: "SQL Veri Tipleri & Cannot bulk load Error"
published: 2018-12-28
description: "Merhaba bu yazımızda sql işlemlerinden bazılarına genel bir bakış yapacak ve örneklerle açıklamaya çalışacağım."
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![Microsoft Sql Server](/wp-images/2018_12_SQL-Server-min-696x758.png "Sql Server")](/wp-images/2018_12_SQL-Server-min.png)

Merhaba bu yazımızda sql işlemlerinden bazılarına genel bir bakış yapacak ve örneklerle açıklamaya çalışacağım.

İlk adım olarak sql işlemlerinden birisi olan insert işlemi ve veri tiplerinden bahsedeceğim. Ardından #TempleTable kullanımından ve substring ile arama işlemlerini örneklerle açıklayacağım.

Bu veri tiplerinden birisi image tipindeki verilerdir. İmage tipindeki veriler db üzerine kaydedilerek de kullanılabilmektedir. Genelede küçük iconlar burada tutulur. Ancak büyük dosyalar tutulmamaktadır.

İlk olarak bir tane tablo oluşturacağız.

USE \[test\]
GO
-- =============================================
-- Author:	<BERK ARAT>
-- Create date: <...>
-- Description:	<....>
-- =============================================
SET ANSI\_NULLS ON
GO
SET QUOTED\_IDENTIFIER ON
GO

CREATE TABLE \[dbo\].\[Test\_table\](
  \[image\] \[image\] NULL,
  \[xml\] \[xml\] NULL,
  \[geography\] \[geography\] NULL,
  \[money\] \[money\] NULL
  
) ON \[PRIMARY\] TEXTIMAGE\_ON \[PRIMARY\]

GO

	    INSERT INTO \[dbo\].\[Test\_table\] 
                  (
		   image        
         
                  )
	 	  VALUES 
		    (
		      'C:\\Users\\Berk\\Desktop\\images\\close.png'	
		    )  

Burada gördüğümüz gibi türünü image seçiyoruz ve ekleme işlemini standart bir string ekler gibi image path seçerek gerçekleştiriyoruz.

Xml dosya eklemek için ise biraz daha komplike bir işlem var ancak temel mantık yine aynı. İlk önce yapmamız gereken bir tane xml oluşturmak ardından bu xmli declare ederek xml türünde yazdırmak.

  DECLARE  @txt varchar(MAX)  
SET @txt = '<Root><Name>Berk</Name><LastName>Arat</LastName></Root>'   

INSERT INTO \[dbo\].\[Test\_table\]
           (
           \[xml\]
         
         )
     VALUES
           (cast (@txt as xml))

------------------------------------------------
   INSERT INTO \[dbo\].\[Test\_table\]
           (		 
          \[xml\]
         
         ) 
     VALUES 
          ( convert (xml,@txt)  )

Burada iki adet xml ekleme yöntemi bulunmaktadır. Bunlardan birisi cast ederek xmli ekleyebiliriz veya convert ederek xml ekleme işlemini yapabiliriz.

## Msg 4861 Cannot bulk load Error

Bir diğer xml ekleme yöntemi ise dosyadan eklemektir. Bunun için aşağıdaki komutu kullanmak gerekmektedir.

INSERT INTO Test\_table (xml) 
SELECT BulkColumn 
FROM Openrowset( Bulk 'C:\\Users\\Berk\\Desktop\\tst.xml', Single\_Blob) as xml

Ancak bu komutu kullanınca aşağıdaki gibi bir hata alabiliriz.

Msg 4861, Level 16, State 1, Line 1
Cannot bulk load because the file "C:\\Users\\Berk\\Desktop\\tst.xml" 
could not be opened. Operating system error code 5(Access is denied.).

Bunun sebebi ya doğru formatta yazmamışızdır.

**Örneğin** ” ~\\Desktop\\tst ” şeklinde yazım yanlıştır. Uzantıyı yazmamız gerekmektedir.”~\\Desktop\\tst.xml ” doğru formattır.

Ancak genelde diğer sorun SQL izinleriyle alakalı bir sorundan kaynaklanmaktadır. Bu sorunu çözmek için çağıracağımız dosyaya gidiyoruz sağ tıklayıp properties diyoruz. Ardından _**Security>Edit>Add>Advanced>Find Now**_ kısmına kadar ilerliyoruz. Karşımıza bir liste çıkıyor SQL ile ilgili kısmı seçiyor ve OK diyoruz. Ardından Allow kısmından izinleri veriyoruz.

![sql example](/wp-images/2018_12_2018-12-23_15-54-31-min.png)

Daha sonra SQL server **admin** olarak çalıştırıyoruz. Artık xml dosyamızı sorunsuz bir şekilde yükleyebiliyoruz.

Sonuç olarak aşağıdaki kod sayesinde farklı çeşitte sorgular yazılabilir. Farklı formattaki verileri ekleme işlemini gösterdim. Birkaç değişiklik dışında eklenmesi string ekleme ile aynı.

INSERT INTO Test\_table (
\[xml\],
\[image\],
\[geography\],
\[money\] )
values(
  (SELECT BulkColumn FROM Openrowset( Bulk 'C:\\Users\\Berk\\Desktop\\tst.xml', Single\_Blob) as xml),
  (SELECT BulkColumn  FROM Openrowset( Bulk 'C:\\Users\\Berk\\Desktop\\images\\back.png', Single\_Blob) as image),
  (geography::Point(47.65100, -122.34900, 4326)),
  ('999.87629')
)