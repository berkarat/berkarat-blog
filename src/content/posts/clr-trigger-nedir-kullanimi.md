---
title: "CLR Trigger Nedir? Kullanımı"
published: 2019-07-16
description: "Merhabalar, bu yazımda da  SQL trigger kavramından devam edeceğiz. Eğer Triggerlar ile alakalı daha fazla bilgi almak için aşağıdaki linki kullanabili"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![Microsoft Sql Server](/wp-images/2018_12_SQL-Server-min-696x758.png "Sql Server")](/wp-images/2018_12_SQL-Server-min.png)

Merhabalar, bu yazımda da  SQL trigger kavramından devam edeceğiz. Eğer Triggerlar ile alakalı daha fazla bilgi almak için aşağıdaki linki kullanabilirsiniz.

[https://blog.berkarat.com/mssql-trigger/](https://blog.berkarat.com/mssql-trigger/)

### CLR TRIGGER NEDİR ?

CLR (Common Language Runtime) ne olduğunu açıklayayım. CLR .Net platformunun çalışabilmesi için gereken ortamı yaraktmaktadır böylece Sql üzerinde daha karmaşık olabilecek sorguları .Net platformuna taşımış oluruz. Burada artık .Net ortamında olduğumuzdan dolayı yapabileceklerimiz çok daha basit bir şekil alacaktır.

#### CLR TRIGGER UYGULAMA ADIM-1 (.Net Tarafı)

İlk olarak dll dosyamızı oluşturalım. .Net ortamında geliştireceğim için Visual Studio kullanacağım. Visual Studio üzerinden .Net Class Library üzerinden bir tane class library oluşturuyoruz. Ardından karşımıza boş bir class gelecektir

Burada “SqlTriggerContext triggContext = SqlContext.TriggerContext; ” komutu ile bir trigger nesnesi oluşturuyoruz. Bu nesne üzerinden trigger actionları alabileceğimiz kodu yazıyoruz. Bu da triggContext.TriggerAction;

Bu actionlar INSERT UPDATE DELETE türlerindedir. Daha sonra bu işlemin Insert,Update veya Delete olduğunu anlamak için switch case yapısını kuruyoruz. Bu işlemden sonra artık triggerlarımızı yakalamış oluyoruz.

 public static void SqlTrigger1()
    {
        SqlTriggerContext triggContext = SqlContext.TriggerContext;       
        SqlContext.Pipe.Send("Trigger FIRED");
        SqlCommand command;
        SqlDataReader reader;
        SqlPipe pipe = SqlContext.Pipe;       
        switch (triggContext.TriggerAction)
        {
            case TriggerAction.Insert:
                using (SqlConnection conn = new SqlConnection("context connection=true"))
                {
                    conn.Open();
                    command = new SqlCommand(@"SELECT \* FROM INSERTED;", conn);
                    reader = command.ExecuteReader();
                    reader.Read();
                    SendMessage(reader, "insert", TransactionType.QuoteInsert);
                }
                break; }    }

Sonrasında sql bağlantısını yapıp hangi case geldiyse oradan işlemimizi gerçekleştiriyoruz. Ben bu örnekte MSMQ içerisine mesaj olarak yazdım isterseniz bir dosyaya da text olarak kaydedebilir veya başka bir program tetikleyebilirsiniz.

#### CLR TRIGGER UYGULAMA ADIM-2 (SQL TARAFI)

İlk önce boş bir sorgu açıyoruz CLR trigger enable etmek için aşağıdaki sorguyu çalıştırıyoruz. Bu sorgu çalıştığında CLR\_Enabled 0 dan 1 konumuna geçmiş olur.

```
EXEC sp_configure 'clr enabled', 1;
GO
    reconfigure
GO
```

İkinci adım olarak konfigürasyon işlemini gerçekleştiriyoruz. Daha sonrasında bir adet Assembly oluşturuyoruz. Burada oluşturduğumuz dl dosyasının yolunu ekliyoruz.

```
EXEC sp_configure 'show advanced options', 1;
RECONFIGURE;
EXEC sp_configure 'clr strict security', 0;
RECONFIGURE;
```

Dikkat etmemiz gereken konu eğer izinler verilmediyse dosyaya ulaşamayacağı için hata verecektir. Bunun için dosyaya izinleri vermemiz gerekmektedir. PERMISSION\_SET=UNSAFE diyerek de bağlantının güvenlik dışında olduğunu belirtiyoruz.

```
alter database "databasename" set trustworthy on;
GO
CREATE ASSEMBLY CLRTrigger
FROM 'path of the dll file'
WITH PERMISSION_SET = UNSAFE
GO 
```

Son adım olarak trigger oluşturma adımına geçiyoruz. Aşağıdaki komut satırında TriggerName olarak istediğimiz adı verebiliriz. Burada dikkat etmemiz gereken nokta EXTERNAL NAME kısmıdır. Buradaki sıralama oluşturduğunmuz **_dll projesinin adı +class adı + fonksiyon adı_**  olacak şekilde yapmamız gerekmektedir. Aksi durumda hata ile karşılaşırız.

```
CREATE TRIGGER  "triggername" 
ON  "databasename" 
FOR INSERT, UPDATE, DELETE
AS
EXTERNAL NAME "(dllname+classname+functionname)"
```

Bu adımları da yapıp çalıştırdıktan sonra artık işlemimiz tamamlanmış oluyor. Artık tablomuzda değişiklik yaptığımız zaman yaptığımız değişiklik mesaj olarak queue kuyruğuna eklenecek. Eğer isterseniz başka şekillerde tetikleme de yapmanız mümkündür. Bu işlemi de yazdığımız dll dosyasını güncelleyerek yapabilirsiniz. Burada dikkat etmemiz gereken konu SQL Server ile dll aynı bilgisayarda bulunmalıdır. Yani dosya yolu erişilemez ise triggerlar devreye girmeyecektir.

  
Kaynak dosya:[https://github.com/berkarat/CLR-Trigger-Csharp](https://github.com/berkarat/CLR-Trigger-Csharp)