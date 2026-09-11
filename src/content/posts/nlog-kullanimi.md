---
title: "Nlog Kullanımı ve Örnek Uygulama"
published: 2019-02-16
description: "Bu yazımızda daha önceden değindiğin  [C Logger Kullanımı](https://blog.berkarat.com/c-logger-kullanimi/) yazısında bahsettiğim loglama konusundan bah"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![NLog](/wp-images/2018_11_c-logger-min.png "c# logger")](/wp-images/2018_11_c-logger-min.png)

Bu yazımızda daha önceden değindiğin  [C# Logger Kullanımı](https://blog.berkarat.com/c-logger-kullanimi/) yazısında bahsettiğim loglama konusundan bahsedeceğim. Bu sefer yine loglama yapacağız ancak bu işlemi bir Nuget paketi kullanarak kolayca yapabileceğiz. Kullanacağımız paketin adı Nlog.

## Neden loglamaya gerek var ? Nlog Nedir ?

Loglama işlemi projeler için vazgeçilmez olmazsa olmaz işlemlerin başında gelir. Yaptığımız bir çok işlemin kaydının tutulması projede oluşabilecek tersliklerin çözümünde büyük kolaylık sağlamaktadır. Projelerin belli kritik yerlerinde loglama yapmak gerekmektedir.

NLog, .NET platformları için oluşturulmuş rahatça loglama yapmamıza yaran bir loglama paketidir. Ücretsizdir. Nlog sayesinde evetviewer, database , txt uzantılı dosyalara rahatça kayıtları tutabilmekteyiz.

### Nlog Kurulumu

Yazının devamına uygulamalı olarak devam edeceğim. Öncelikle bir console uygulaması açacağız. Bu console uygulamasını servise çevirerek arka planda çalıştırabiliriz. Böylece projemize dahil etmeden servis olarak kullanabiliriz.

![Nlog3 - Nlog Kullanımı ve Örnek Uygulama](/wp-images/2019_02_nlog3.png)

Bu paket programı Nuget Package Manager üzerinden Nlog ve Config dosyasının kurulumunu yapıyoruz.  Sağ tarafta Nlog.config dosyasını açıyoruz. Karşımıza bazı karışık gibi görünen yazılar çıkıyor. Ancak bu yazılar bizim hangi işlemi database loglama, texte loglama gibi işlemleri belirlediğimiz en önemli kısım. Bu config dosyası 2 bölümden oluşuyor. Targets ve Rules tagleri bu bölümlerdir.

![Nlog2 - Nlog Kullanımı ve Örnek Uygulama](/wp-images/2019_02_nlog2.png)

### Nlog Eventlog Kullanımı

Örneğin Event log için target taglerinin arasına şu yazılmalı;

<target xsi:type="EventLog"
            name="eventlog"
            layout="${message}${newline}${exception:format=ToString}"/>

Burada type olarak File, database gibi seçenekler de belirleyebiliriz. Ardından name kısmını dolduruyoruz ve layout kısmına da hangi formatta dolduracağımızı belirliyoruz.

Rules kısmına ise name kısmını hepsini kullanmak istediğimiz için \* seçiyoruz. Minlevel ise Trace seçiyoruz böylece tüm seviye logları görebileceğiz. İstenilirse Error, Warning olarak da filtreleme yapabilmekteyiz.

<logger name="\*"  minlevel="Trace" writeTo="file"/>

### Nlog File Kullanımı

File olarak bulunduğu klasöre text formatında tutmamız için aşağıdaki yazıyı targets tagleri arasına ekliyoruzç Burada type file seçiyoruz. Filename kısmında ${basedir} kısmı projenin bulunduğu dosyaya text olarak log dosyası oluşturur. Bunun dosya yolunu istenilen bir yer seçilebilir.

<target xsi:type="File" name="file" fileName="${basedir}/logs/${shortdate}.log"
        layout="${longdate} ${uppercase:${level}}  ${message}  " />

Rules kısmını da aynı yukarıdaki şekilde level belirliyoruz. WriteTo ile de hangi name verdiğimiz targeti çağırıyoruz.

<logger name="\*"  minlevel="Trace" writeTo="file"/>

### Nlog Database Kullanımı

Burada işler biraz karmaşık oluyor. Ancak sistem basit ve aynı şekilde devam ediyor. Yine name  vs aynı şekilde ekliyoruz. Ancak bu sefer ekstradan database olduğu için bir connection string ve bu dbye yazma işlemi için de bir stored procedure ve tablo gerekiyor.

<target     xsi:type="Database"
            name="db"
               connectionString="${gdc:item=myConnectionstring}"
            commandType="StoredProcedure"
            commandText="\[dbo\].\[NLog\_AddEntry\]"        >
  <parameter name="@machineName"    layout="${machinename}" />
  <parameter name="@logged"         layout="${date}" />
  <parameter name="@level"          layout="${level}" />
  <parameter name="@message"        layout="${message}" />
  <parameter name="@logger"         layout="${logger}" />
  <parameter name="@properties"     layout="${all-event-properties:separator=|}" />
  <parameter name="@callsite"       layout="${callsite}" />
  <parameter name="@exception"      layout="${exception:tostring}" />
</target>

Burada farklı olarak ben connection stringi  dışarıdan alıyorum. Böylece programa gömülü bir şey yok. Bu da esneklik sağlayarak her yerde kullanıma uygun hale geliyor. Database bilgilerini ise Settings kısmından alacağız.

<logger name="\*"  minlevel="Trace" writeTo="db"  />

Yine aynı şekilde rules kısmını da aynı şekide belirliyoruz.

Database ile ilgili kodları aşağıda vereceğim. Bunu sadce MSsql üzerinden bir sorgu ekranı açıp çalıştırmak yeterli.

CREATE TABLE \[dbo\].\[NLog\] (
   \[ID\] \[int\] IDENTITY(1,1) NOT NULL,
   \[MachineName\] \[nvarchar\](200) NULL,
   \[Logged\] \[datetime\] NOT NULL,
   \[Level\] \[varchar\](5) NOT NULL,
   \[Message\] \[nvarchar\](max) NOT NULL,
   \[Logger\] \[nvarchar\](300) NULL,
   \[Properties\] \[nvarchar\](max) NULL,
   \[Callsite\] \[nvarchar\](300) NULL,
   \[Exception\] \[nvarchar\](max) NULL,
 CONSTRAINT \[PK\_dbo.Log\] PRIMARY KEY CLUSTERED (\[ID\] ASC) 
   WITH (PAD\_INDEX = OFF, STATISTICS\_NORECOMPUTE = OFF, IGNORE\_DUP\_KEY = OFF, ALLOW\_ROW\_LOCKS = ON, ALLOW\_PAGE\_LOCKS = ON) ON \[PRIMARY\]
) ON \[PRIMARY\] TEXTIMAGE\_ON \[PRIMARY\];

GO

CREATE PROCEDURE \[dbo\].\[NLog\_AddEntry\_p\] (
  @machineName nvarchar(200),
  @logged datetime,
  @level varchar(5),
  @message nvarchar(max),
  @logger nvarchar(300),
  @properties nvarchar(max),
  @callsite nvarchar(300),
  @exception nvarchar(max)
) AS
BEGIN
  INSERT INTO \[dbo\].\[NLog\] (
    \[MachineName\],
    \[Logged\],
    \[Level\],
    \[Message\],
    \[Logger\],
    \[Properties\],
    \[Callsite\],
    \[Exception\]
  ) VALUES (
    @machineName,
    @logged,
    @level,
    @message,
    @logger,
    @properties,
    @callsite,
    @exception
  );
END

Config işlemleri bu kadar. Şimdi console uygulamamıza dönelim. Burada ben Commander adından bir class oluşturdum. Bu işlemleri de yaptıktan sonra classımızı yazıyoruz.

public class Commander
{
    public Commander()
    {
        try
        {
            Commander.SetEventlogConfig(Properties.Settings.Default.EventLogName);
            Commander.SetDatabaseConfig
        (

                Properties.Settings.Default.ServerName,
                Properties.Settings.Default.DatabaseName,
                 Properties.Settings.Default.UserName,
                  Properties.Settings.Default.Password
        );
        }
        catch (Exception ex)
        {
            WriteLog(LogLevel.Error, "Connection Error", ex);
        }
    }
    Logger logger = LogManager.GetCurrentClassLogger();
    public void WriteLog(LogLevel loglevel, string Message)
    {
        logger.Log(loglevel, Message);
    }
    public void WriteLog(LogLevel loglevel, string Message, Exception ex)
    {
        logger.Log(loglevel, Message, ex);
    }

    public static void SetDatabaseConfig(string ServerName, string DatabaseName, string UserId, string Password)
    {
        var databaseTarget = (DatabaseTarget)LogManager.Configuration.FindTargetByName("db");
        databaseTarget.ConnectionString = "Server=" + ServerName + ";Database=" + DatabaseName + ";User id=" + UserId + ";Password=" + Password + ";";
        LogManager.ReconfigExistingLoggers();

    }
    public static void SetEventlogConfig(string EventLogName)
    {
        var eventlogTarget = (EventLogTarget)LogManager.Configuration.FindTargetByName("eventlog");
        eventlogTarget.Log = EventLogName;
        eventlogTarget.Source = EventLogName;
        LogManager.ReconfigExistingLoggers();
    }

}

Bu class oluşturduktan sonra sadece yapmamız gereken classı çağırmak böylece db,text ve eventviewer üzerinde loglama işlemi yapabiliyoruz. Devre dışı bırakmak için config dosyasında istemediğimizi disable etmek yeterlidir.

Kaynak Kod : [https://github.com/berkarat/Nlog\_Example](https://github.com/berkarat/Nlog_Example)