---
title: "C# Logger Kullanımı"
published: 2018-11-05
description: "Merhabalar bu yazımızda c ile Logger kullanımından bahsedeceğim. Programların en temel yapılarından bir tanesidir logger. Loglama kelime anlamı olarak"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![NLog](/wp-images/2018_11_c-logger-min.png "c# logger")](/wp-images/2018_11_c-logger-min.png)

Merhabalar bu yazımızda c# ile Logger kullanımından bahsedeceğim. Programların en temel yapılarından bir tanesidir logger. Loglama kelime anlamı olarak günlük tutmak olarak çevrilebilir. Bir geliştirici için olmazsa olmazdır. Bir sistem veya programın hareketlerinin, yaptığı işlemlerin hareketini tutmamıza yarayan bir yapıdır.

Logger sayesinde bir projede oluşan hataları, yapılan işlemleri kayıt altına alabiliriz. Hataların ayıklanmasında da sıkça kullanılmaktadır.

Windows sistemlerinde Event log kavramı logger işleminin yapıldığı logların tutulduğu yer anlamındadır. İşletim sistemindeki hareketler buraya kaydedilir. Böylece hareket takibi yapılabilir. Arka planda çalışan servislerde oluşabilecek önemli bir hatayı veya saldırı gibi izinsiz hareketleri loglarda görüp müdahale edebiliriz.  Bu logları tarihe göre filtreleyebiliriz.

![Event Viewer](/wp-images/2018_11_logger-1024x539.png)

Windows için bu logları inceleyebileceğimiz kısım ise Event Viewer yani olay görüntüleyicidir.

Başlat arama kısmına Event Viewer üzerinden ulaşabiliriz. Sol tarafta bulunan applications and services logs kısmından loglara ulaşabilmekteyiz.

### Event Viewer ile Yapılabilecek İşlemler

-   Event Viewer üzerinden logların kayıtlarına text olarak kayıt altına alıp depolayabiliriz.
-   Filtreleme yaparak olayların önceliklerine göre sıralama yapabiliriz.
-   Loglara görev ekleyebiliriz. Örneğin seçeceğimiz bir log geldiği zaman başka bir programı veya servisi aktif hale getirebiliriz.

## C# ile Logger Oluşturma

Loglama işlemini C# ile yapmak için öncelikle System.Diagnostic.EventLog sınıfını kullanmaız gerekmektedir. Bu sınıf sayesinde loglama işlemini gerçekleştirebiliriz. Loglama işlemi için öncelikle bir log oluşturmamız gerekmektedir. Bu işlem için EventLog.CreateEventSource() metodunu kullanmamız gerekmektedir. Bu metoda kaynak ve logname parametrelerini eklediğimizde yeni bir log oluşturmuş oluyoruz.

private bool CheckEventLog ()
{
     //TODO:   LOG CREATE
    try
    {
         if (!EventLog.Exists (logName))
        {
            EventLog.CreateEventSource (logName, logName);
            Log ("CREATE NEW LOG", EventLogEntryType.SuccessAudit);
            return true;
        }
        else
        {
            Log ("LOG HAS ALREADY EXIST", EventLogEntryType.SuccessAudit);
            return true;
        }
    }
    catch (Exception e1)
    {
        Log ("Cannot check and create event log: "+e1.Message, EventLogEntryType.Error);
        return false;
    }
}

## C# ile Log Yazma

Log yazma işleminde de EventLog.WriteEntry() metodu ile yapılmaktadır. Bu metoda logname, mesaj ve tipini belirlediğimiz parametreleri vereceğiz.

 private void Log (string message, EventLogEntryType type)
 {
    //   EventLog.WriteEntry (logName, message, type);
     try
     {
         if (EventLog.Exists (logName))
         {
             EventLog.WriteEntry (logName, message, type);
             using (StreamWriter w = File.AppendText (DateTime.Now.ToLongDateString ()+"-"+logName+".txt"))
             {
                Logtxt (message, w);
             }
        }
         else
         {
             //CheckEventLog ();
             Console.WriteLine ("LOG YOK");
         }
     }
     catch (Exception ex)
     {
         Console.WriteLine ("FAIL");
     }    
}

### Bu parametreler şunlardır

-   EventLogEntryType.Error
-   EventLogEntryType.FailureAudit
-   EventLogEntryType.Information
-   EventLogEntryType.SuccessAudit
-   EventLogEntryType.Warning

## C# ile Text Log Yazma

Log tutarken bir yandan da text ile de tutmak bizim için bir avantaj sağlamktadır. Bunlardan bazıları text kayıt altına alırken depolama kolaylığı sağlamaktadır. Ek olarak da günlük olarak ayrı ayrı log tutma imkanı sunmaktadır.

public static void Logtxt (string logMessage, TextWriter w)
      {
          try
          {
              w.WriteLine ("{0} {1}", DateTime.Now.ToLongTimeString (),DateTime.Now.ToLongDateString ()+" --> "+logMessage);
              w.WriteLine ("-------------------------------");
          }
          catch (Exception)
          {
              Console.WriteLine ("FAIL");
          }
               }

Text yazarken StreamWriter I/O kullanmamız gerekmektedir. AppendText diyerek logumuzu text içerisine sona eklemiş oluruz. Log eklerken o anki tarih ve saati eklememiz kaydımızın ne zaman eklendiği açısından önemlidir.

##  C# Log Silme

Log silme işlemi için de EvenLog.Delete() metodunu kullanıyoruz. Metodun içine de sileceğimiz log ismini yazıyoruz.

private void Log\_Delete (string logname)
     {
         string msg = logname+"-->LOG DELETED !";
         try
         {
             EventLog.Delete (logname);
             using (StreamWriter w = File.AppendText (DateTime.Now.ToLongDateString ()+"-"+logName+".txt"))
             {
                 Logtxt (msg, w);
             }
         }
         catch (Exception)
         {
             Console.WriteLine ("FAIL");
         }
     }

_**Programın kaynak kodu :**_  [GitHub](https://github.com/berkarat/Logger)