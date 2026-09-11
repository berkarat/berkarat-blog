---
title: "MSSQL Server Tetikleyici Kavramı ve Uygulaması"
published: 2019-07-08
description: "Merhabalar bu yazımızda MSSQL Serverda trigger kavramından bahsedeceğim. Bunlar birer tetikleyicidir. Bu tetikleyiciler bizim yapmamızı istediğimiz iş"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![Tetikleyiciler](/wp-images/2019_07_Trigger.png "trigger")](/wp-images/2019_07_Trigger.png)

Merhabalar bu yazımızda MSSQL Serverda trigger kavramından bahsedeceğim. Bunlar birer tetikleyicidir. Bu tetikleyiciler bizim yapmamızı istediğimiz işlevleri otomatik bir biçimde uygulamasını sağlamaktadır.

T-SQL’de yazılması zor veya karmaşık olan işlemlerde , CLR  
tetikleyiciler avantaj sağlamaktadır. Ya da SQL server üzerinde yapılan işlemlerin kaydını tutmak bunun tarih saat olarak güncellemek için arkada otomatik olarak işleyen bir yapının kurulmasında tetikleyiciler hayati öneme sahiptirler.

![Sql Trigger - MSSQL Server Tetikleyici Kavramı ve Uygulaması](/wp-images/2019_07_sql-trigger.png)

## Trigger Kullanımı ve Çeşitleri

#### Triggerlar 3 çeşittir

-   DML tetikleyiciler otomatik olarak INSERT, UPDATE ve DELETE işlemlerinde tetiklenir.
-   DDL tetikleyiciler CREATE , ALTER ve DROP işlemlerinde tetiklenirler.
-   Logon tetikleyiciler ise Login işlemleri esnasında bir stored procedure veya başka bir komutu yerine getirerek tetiklenmektedir.

```
CREATE TRIGGER <Schema_Name, sysname, Schema_Name>.<Trigger_Name, sysname, Trigger_Name> 
   ON  <Schema_Name, sysname, Schema_Name>.<Table_Name, sysname, Table_Name> 
   AFTER <Data_Modification_Statements, , INSERT,DELETE,UPDATE>
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for trigger here

END
GO
```

CREATE TRIGGER \[schema\_name.\]trigger\_nameON table\_nameAFTER  {\[INSERT\],\[UPDATE\],\[DELETE\]}\[NOT FOR REPLICATION\]AS{sql\_statements}

Yukarıdaki genel tetikleyici oluşturma şablonudur. Bu şablonda;

-   SchemaName hangi tablo olduğuna dair bilgiyi içerir. Opsiyonel olarak kullanılır ve zorunlu değildir.
-   nameON ise tetikleyicimizin adını belirtmekte kullanırız.
-   AFTER kelimesinden sonra seçeceğimiz işleme göre sql\_statements esnasında yapılacak sorguları yazarız.

Daha açıklayıcı olması açısından aşağıda basit bir tetikleyici örneği verilmiştir.

```
CREATE TRIGGER [dbo].[Logging] on [dbo].[tbl_Test] 
AFTER  UPDATE 
as
begin
INSERT INTO [dbo].[tbl_log]
           ([LOGDATE]
           ,[PROCESS])
     VALUES
           (
           GETDATE()
           ,'UPDATED')
end
```

Bu örnekte test adında bir tablomuz var ve buraya Logging adında bir tetitkleyici oluşturuyoruz. Bu işlem tabloda herhangi bir kolon update işlemi görürse bunun loglama işlemini başka bir tabloya işlenme anını yazan bir tetikleyici oluşturmuş oluruz. Bu kodu daha da geliştirerek database tarafında loglama işlemini de yapmış oluruz.

Aynı işlemleri INSERT ve DELETE gibi komutlarla farklı ihtiyaçlara göre modifiye etmek mümkündür. Aynı şekilde CREATE DROP gibi işlemlerin de uygulaması benzerlik göstermektedir.

Tetikleyiciler genel kullanım açısından programdan bağımsız bir şekilde database tarafında işlemleri yapmamıza yaramaktadır. Böylece daha hızlı bir şekilde ve sistemi yormadan işlemlerimize devam edebiliriz.

## Örnek Tetikleyici Kullanımı

Aynı zamanda bu tabloya uyguladığımız tetikleyiciler dışında databasae işlemlerini de kontrol edip log tutabileceğimiz database tetikleyicileri de kullanabiliriz. Bu sayede olan biteni kontrol altında tutabiliriz.

```
CREATE TRIGGER [trg_index_changes]
ON DATABASE
FOR 
    CREATE_INDEX,
    ALTER_INDEX, 
    DROP_INDEX
AS
BEGIN
    SET NOCOUNT ON;
 
    INSERT INTO index_logs (
        event_data,
        changed_by
    )
    VALUES (
        EVENTDATA(),
        USER
    );
END;
GO
```

Yukarıdaki örnek sorguyu çalıştırarak database tetikleyici oluşturabiliriz. Bu yazımızda standart triggerlara giriş yapmış bulunuyoruz. Bir sonraki adımda ise CLR triggerları kullanarak daha karmaşık işlemleri C# üzerinden kontrol edilmesini göstereceğim.

Daha fazla Sql örnekleri ve detaylı bilgi için : [https://blog.berkarat.com/category/yazilim/sql/](https://blog.berkarat.com/category/yazilim/sql/)