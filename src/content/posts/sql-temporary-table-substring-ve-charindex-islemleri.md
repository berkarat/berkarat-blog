---
title: "SQL Temporary Table, Substring ve Charindex İşlemleri"
published: 2019-01-10
description: "Bu yazıda Sql Server üzerinde kullanılan bazı sorgulama tiplerinden bahsedeceğiz. Bu sorgulamalar daha ileri seviye ve büyük verilerde kullanılan sorg"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![Microsoft Sql Server](/wp-images/2018_12_SQL-Server-min-696x758.png "Sql Server")](/wp-images/2018_12_SQL-Server-min.png)

Bu yazıda Sql Server üzerinde kullanılan bazı sorgulama tiplerinden bahsedeceğiz. Bu sorgulamalar daha ileri seviye ve büyük verilerde kullanılan sorgulama tipleridir. Temporary table  yani geçici tablolar kolaylık sağlamaları ve birden çok tablo işlemlerini tek bir sorguda halletmemize yaramaktadır. Bu yazıyı anlayabilmek için daha önceki yazılarımdan olan [Stored Procedur İşlemleri](https://blog.berkarat.com/stored-procedure-islemleri-2/) yazısını okumanızı tavsiye ederim aksi halde daha da karışacaktır.

## Substring ve Charindex

İlk olarak Substring ve Charindexin ne olduğu hakkından bahsedeceğim. Substring diğer dillerde de olduğu gibi aynı şekilde kullanılmaktadır. Adından da anlaşıldığı gibi sublara yani alt metinlere böler. Elimizde bulunan text veriyi parçalamaya yaramaktadır. Bu sayede örneğin xml verisini parçalara ayırıp parse etme işlemini sql üzerinde yapabilmekteyiz. Bu sayede programda değil database üzerinde hallederek yük dağılımı yapabilmekteyiz.

Charindex de substring gibi bir fonksiyondur. Anlamı içinde gizlidir aslında char ve index. Bize aradığımız karakterin index konumunu vermektedir. Bu sayede hangi karakter nerede gibi sonuçlar alabiliriz.

SELECT Name,
CHARINDEX('a',Name) AS " A  harfinin konumu" 
FROM Testtable

substring (\[MESSAGEBODY\], (SELECT CHARINDEX('<COMMANDID>', \[MESSAGEBODY\]))+len('<COMMANDID>'),(SELECT CHARINDEX('</COMMANDID>', \[MESSAGEBODY\])-len('</COMMANDID>'))-(SELECT CHARINDEX('<COMMANDID>', \[MESSAGEBODY\]))+1)

## Temporary Table (Geçici Tablo)

Sql ile çalışırken genellike büyük verilerle uğraşmamız gerekmektedir. Bu gibi durumlarda da iki veya daha fazla tablodan gelen verileri birbirleri ile ilşkilendirip diğer tablo üzerinde işlemler yapmak gibi anlatması bile zor olan durumlarla sık sık karşılaşmaktayız. Bu yüzden aldığımız bazı bilgileri geçici olarak bir depolama alanına koymalı ve sonra bunları oradan kullanmalıyız.

Bu bize ne fayda sağlamaktadır dersek. Bilgi karışıklığını önlemekte, sistem yükünü azaltmaktadır.

Gelelim Temptable nasıl kullanılmaktadır. 3 temel tipte kurulmaktadır. Önce temptable create ediyoruz. Daha sonra bu temptable içerisini dolduruyoruz ve son adım olarak da bu tablodan select işlemini alıyoruz. Temporary tablolar iki tipe ayrılır. Local ve global olarak ayrılmaktadır. Local tablolar sadece o anda çalışır ve biter. Başka sorgular içerisinde çağırılamaz. Eğer çağırılıyorsa aşağıdaki uyarıyı alacaksınız.

Msg 208, Level 16, State 1, Line 1
Invalid object name ‘temptable'

Ancak global tablolar bağlantı olduğu sürece istenilen her yerden her kullanıcı çağırabilmektedir.

Birbilerinin tek farkı  local -> # global-> ## şeklinde kullanılmaktadır.

\-- Eğer Global olarak tanımlamak isteseydik  ##TempLogTable şeklinde yazmamız yeterliydi
CREATE TABLE #TempLogTable ( 
  \[ID\] \[int\]  NULL,
  \[MESSAGELABEL\] \[nvarchar\](150) NULL,
  \[MESSAGEBODY\] \[text\] NULL,
         )
   insert INTO #TempLogTable (
  \[ID\],
  \[MESSAGELABEL\],
  \[MESSAGEBODY\])

  SELECT 
        \[ID\]
       ,\[MESSAGELABEL\]
       ,\[MESSAGEBODY\]
 FROM \[Test\_db\].\[dbo\].\[tbl\_test\]

Burada da görüldüğü gibi karmaşık bir yapısı bulunmamaktadır. Ancak select ve inser dışında update işlemini de yapmaktayız.

update #TempLogTable 
   SET 
   \[ID\] = (select top 1 COMMAND FROM \[APP\_LIST\] where ID = #TempSendCommandTable.ID),
   \[MESSAGELABEL\] = (select top 1 MESSAGELABEL FROM #TempLogTable2 where APP\_ID = #Temptabl2.ID and order by DATE\_TIME desc),
   \[MESSAGEBODY\] = (select top 1 \[RESPDESCRIPTION\] FROM #TempLogTable)

where ID=@ID

Ancak bunun gibi birazcık daha karmaşık bir yapı ve farklı tablolar işin içine girdiği zaman geçici tablolar hayat kurtarmaktadır. Bu gibi durumları farklı  sorgularla yazmak bazen mümkün olmamaktadır.  
Aynı sorgu içerisinde birden fazla temp tablo kullanılabilir ve birbirleri ile ilişkilendirebilmek mümkündür.

  update #TempLogTable 
  SET 
  \[RESPDESCRIPTION\] =  (select top 1 substring (\[MESSAGEBODY\], (SELECT CHARINDEX('<DESCRIPTION>', \[MESSAGEBODY\]))+len('<DESCRIPTION>'),(SELECT CHARINDEX('</DESCRIPTION>', \[MESSAGEBODY\])-len('</DESCRIPTION>'))-(SELECT CHARINDEX('<DESCRIPTION>', \[MESSAGEBODY\]))+1)   FROM \[DynamicKiosk\].\[dbo\].\[VK\_APPLOG\] where APPID=@APPID and KIOSKID=@KIOSKID and MESSAGETYPE = 4 order by INSERTDATE DESC),
  \[RESPONSECODE\] =  (select top 1 substring (\[MESSAGEBODY\], (SELECT CHARINDEX('<RESPONSE\_CODE>', \[MESSAGEBODY\]))+len('<RESPONSE\_CODE>'),(SELECT CHARINDEX('</RESPONSE\_CODE>', \[MESSAGEBODY\])-len('</RESPONSE\_CODE>'))-(SELECT CHARINDEX('<RESPONSE\_CODE>', \[MESSAGEBODY\]))+1)   FROM \[DynamicKiosk\].\[dbo\].\[VK\_APPLOG\] where APPID=@APPID and KIOSKID=@KIOSKID and MESSAGETYPE = 4 order by INSERTDATE DESC),
  \[COMMANDID\] = (select top 1 substring (\[MESSAGEBODY\], (SELECT CHARINDEX('<COMMANDID>', \[MESSAGEBODY\]))+len('<COMMANDID>'),(SELECT CHARINDEX('</COMMANDID>', \[MESSAGEBODY\])-len('</COMMANDID>'))-(SELECT CHARINDEX('<COMMANDID>', \[MESSAGEBODY\]))+1)   FROM \[DynamicKiosk\].\[dbo\].\[VK\_APPLOG\] where APPID=@APPID and KIOSKID=@KIOSKID and MESSAGETYPE = 4 order by INSERTDATE DESC),
  \[COMMANDDESCRIPTION\] =  (select top 1 COMMAND FROM \[DynamicKiosk\].\[dbo\].\[VK\_APP\_COMMAND\_LIST\] where COMMAND\_ID = @COMMANDID and APP\_ID = @APPID)
  

where KIOSKID = @KIOSKID and APPID=@APPID and COMMANDID = @COMMANDID

Burada da Substring, Charindex ve temptable birlikte kullanımı örnklenmiştir. Bu sayede farklı tablolar farklı şekillerde birbirleriyle bağlanıp sonuç elde edilebilir.

Ancak bunları test etmek için tavsiyen bir stored procedure oluşturmak ve bunun üzerinden işlemleri yapmaktır. Yoksa bir defa create ettiğimiz tabloyu ikinciye hata verecektir.

Msg 2714, Level 16, State 6, Line 1
There is already an object named '#Temptable' in the database.