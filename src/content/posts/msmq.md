---
title: "MSMQ (Microsoft Message Queuing)"
published: 2018-08-12
description: "Msmq Microsoft’un yayınlamış olduğu dağıtık sistemlerin güvenli bir şekilde iletişim kurmalarını sağlayan, sürekli iletişim halinde olma gibi bir zoru"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![Msmq Logo - MSMQ (Microsoft Message Queuing)](/wp-images/2018_08_msmq-logo.png "msmq")](/wp-images/2018_08_msmq-logo.png)

# MSMQ Çalışma Yapısı

Msmq Microsoft’un yayınlamış olduğu dağıtık sistemlerin güvenli bir şekilde iletişim kurmalarını sağlayan, sürekli iletişim halinde olma gibi bir zorunluluğu olmayan bir mesajlaşma protokolüdür. Temelde güvenlik amacıyla çıkmıştır ve farklı modüllerin birbirleriyle haberleşmesini sağlayan bir mesaj yapısıdır. Genellikle Windows servislerinde kullanılmaktadır.

Bu fotoğrafta mesajlaşma adımları gösterilmiş. Soldaki uygulama kendi içerisinde işlem yapıp bir mesaj oluşturuyor. Bu mesajı msmq içerisine atıyor. Sağdaki uygulama dinleme yaparak kendisine gelen mesajı okuyor.

![Msmq Çalışma - MSMQ (Microsoft Message Queuing)](/wp-images/2018_08_msmq_çalışma.jpg)

Ardından kendi içerisinde ne yapması gerekiyorsa işlemi gerçekleştirip tamamlandı mesajı döndürüyor. Bu sayede iki veya daha fazla sistem birbirleriyle dilden bağımsız olarak çalışabilme olanağı bulur. Ayrıca birbirlerinin işlerinin bitmesini de beklemek zorunda kalmıyorlar.

Kullanım alanı olarak modüler olarak çalışan, güvenliğin ön planda olduğu, dağıtık sistemle kurgulanmış projelerde kullanılmaktadır.

Örneğin bankacılık sektöründe atmlerin servislerinde, birbirleriyle bağımlı olmak zorunda olmayan yazılımların haberleşmesinde kullanılmaktadır.

## MSMQ Oluşturma

Mesaj yapısını kullanabilmek için reference kısmından System.Messaging referans olarak eklememiz gerekmektedir. Ardından namespace olarak using System.Messaging; eklememiz gerekmektedir.

Mesaj yapısını elle oluşturabiliriz. Yönet>Hizmetler ve Uygulamalar >Message Queuing>Özel Sırlar >Yeni >Özel Sıra adımlarını takip ederek yeni bir mesaj oluşturmuş oluyoruz. Ardından karşımıza çıkan ekrandan isimlendiriyoruz ve artık bir mesaj yapımız oluşmuş oluyor. Bundan sonra işlemleri gerçekleştirebilirsiniz.

![Msmq - MSMQ (Microsoft Message Queuing)](/wp-images/2018_08_Msmq.png)

Bizim yapacağımız mesaj yapısını elle değil otomatik bir şekilde yazacağımız kod parçası sayesinde oluşturmak.

private MessageQueue CreateMsmq(string path , out string error)
      {
          MessageQueue msj = null;
          error = " ";
          try
          {

              if (MessageQueue.Exists(path))
              {
                  msj = new MessageQueue(path);
                  if (!msj.Transactional)
                  {
                      error = "Transaction Olmadı";
                      msj.Dispose();
                  }

              }
              else
              {
                  error = "Message queue bulunmadı";
              }
          }
          catch (Exception e)
          {
              error = "Message Queue Exception: " + e.Message;
              
          }
          return msj;

      }

Öncelikle try catch bloğuna alıyoruz böylece oluşabilecek sorunlarda neden kaynaklandığını bulmamız kolaylaşıyor.  İf bloğundaki MessageQueue.Exists(path) kısmı path olan yani bizim yolumuz kısmın daha önceden var olup olmadığını kontrol ederiz. Eğer var ise tekrardan oluşturmaz.

Örnek bir path : @”.Private$deneme”

Msmq yapımızı oluşturdan sonra içerisine bilgi alma ve okuma işlemlerine geçiyoruz.

## MSMQ İçerisine Bilgi Ekleme

Gireceğimiz verilerin özelliklerini bir classta oluşturmamız gerekiyor. Ardından bu classı kullanarak msmq içerisine bilgileri aktaracağız.

   public class msmq\_cl
    {
        public string id { get; set; }
        public string ad { get; set; }
        public string soyad { get; set; }
}

Burada 3 özellikli bir class oluşturuyoruz.

private void send(string ad,string soyad,string yas)
       {
           string path = @".Private$deneme";
           string err;
           MessageQueue mq = CreateMsmq(path, out err);
           if (mq != null)
           {
               msmq\_cl nesne = new msmq\_cl()
               {
                   ad = ad,
                   soyad = soyad,
                   id = yas
               };

               System.Messaging.Message m = new System.Messaging.Message(nesne);
               m.Priority = MessagePriority.Low;
               m.Label = "Label\_1";
               MessageQueueTransaction tr = new MessageQueueTransaction();
               mq.Send(m, tr);
           }
       }

Ardından yukarıdaki işlemleri yapıyoruz. Burada mq nesnesi null değilse işleme devam ediyoruz. Eğer null dönerse queue oluşma işlemi başarısız olmuştur. Bunun için Create fonksiyonu veya kütüphaneler kontrol edilmeli. Eğer msmq oluşturulduysa içerikleri nesne olarak ekliyoruz. Yeni bir mesaj oluşturuyoruz ardından eğer gerekli ise öncelik tanımını ve label belirliyoruz. Daha sonra transaction işlemini başlatıp nesnemizi msmq içerisine gönderiyoruz.

## MSMQ İçerisinden Bilgi Okuma

private void receive()
    {
        
        MessageQueueTransaction tr = new MessageQueueTransaction();
        tr.Begin();
        MessageQueue msq = new MessageQueue(@".Private$deneme");

        msq.Formatter = new XmlMessageFormatter(new Type\[\] { typeof(string) });
  
        try
        {
            System.Messaging.Message msj = msq.Receive();
            msj.Formatter= new XmlMessageFormatter(new Type\[\] { typeof ( string) });
            textBox1.Text = msj.Body.ToString();
            tr.Commit();
            msmq\_cl  s = (msmq\_cl)msj.Body;
            
           //label1.Text = s.ad;

            //System.Messaging.Message message = msq.Receive();
            //message.Formatter = new XmlMessageFormatter(new Type\[\] { typeof(string) });
            //label1.Text = message.ToString();
         
           // tr.Commit();
        }
        catch (Exception)
        {
            label1.Text = "--";
          
            throw;
        }
        

      //  string dz = msq.ReadHandle.ToString();
    }

Buradaki fonksiyonda ise bir transaction işlemi başlatıyoruz. Bunun sebebi eğer okuma işlemi son bulmadıysa tekrar okuma işlemini yapıyor. Böylece eksik bilgi geri dönmesinin önüne geçilmiş oluyor.Gelecek mesajın format tipini belirledikten sonra Receive() metodunu kullanarak veriyi nesnenin içine eklemiş oluyoruz. Bundan sonrasında bu mesajın içeriğine erişebilmiş oluyoruz.

## MSMQ Purge

Purge kelime anlamı olarak temizlemektir. Okunan mesajların tamamını temizlemek için kullanılan bir yapıdır. Bu sayede gereksiz mesajların veya istenmeyen mesajların silinmesi işlemini yapabilmekteyiz.

static public MessageQueue MSMQPURGE(string queueName, out string error)
        {
            MessageQueue mq = null;
            error = "";
            try
            {
                if (MessageQueue.Exists(queueName))
                {
                    mq = new MessageQueue(queueName);
                    mq.Purge();
                }
                else
                {
                    error = "Message queue does not exist.";
                }
            }
            catch (Exception e)
            {
                error = "Message Queue Exception: " + e.Message;
                mq = null;
            }
            return mq;
        }