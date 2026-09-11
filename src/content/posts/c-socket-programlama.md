---
title: "C# Socket Programlama – Send&Receive İşlemleri"
published: 2018-12-26
description: "Bu yazımızda socket programlama hakkında bilgiler vereceğim. Socket üzerinden receive ve send işlmelerinin birer örneklerini yapacağız. Öncelikle kavr"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![socket programming](/wp-images/2018_12_socket-min.png "socket")](/wp-images/2018_12_socket-min.png)

Bu yazımızda socket programlama hakkında bilgiler vereceğim. Socket üzerinden receive ve send işlmelerinin birer örneklerini yapacağız. Öncelikle kavramlardan bahsetmem gerekmektedir. Bu kavramları tam anlayamadan ilerlemek ilerde mantık sorunlarına yol açacaktır.

#### IP Nedir ?

TCP/IP protokolü ile haberleşen makinelerin birbirlerini tanımaları için verilmiş numaralardır. Örneğin: 192.168.10.54 gibi bir IP adresi olabilir. Bu karşıdaki bilgisayarla ilteişim kurabilmemiz için yeterlidir.

#### Port Nedir ?

Bilgisayarlardaki giriş çıkış noktaları port olarak adlandırılmaktadır. Örneğin USB giriş portu. Ancak bizim burada bahsedeceğimiz bu portlar değildir. Programların haberleşmesini yaptığı birbirleriyle köprü kurdukları portlardan bahsediyor olacağız.

#### Soket Nedir ?

Türkçesi soket olan bu kelimenin anlamı işe IP + PORT = socket olarak tanımlayabiliriz. Socketler sayesinde bir makineden diğerine iletişim kurulup veri transferi sağlayabiliriz. biz de bu yazıda veri transferinden bahsedeceğiz.

İlk önce soket üzerinden veri yollama işleminden bahsedeceğim. Bunlardan önce projemize aşağıdaki kütüphaneleri  eklememiz ve tanımlamaları yapmamız gerekmektedir.

using System.Net;
using System.Net.Sockets;

#region DECLARES
     static IPAddress localAddr = IPAddress.Parse("127.0.0.1");
     static TcpClient serverSocket;
    public static byte\[\] gonderveri\_dizi;
     byte\[\] gelenveri\_dizi = new byte\[2048\];
     public static bool read\_treadstop = true;
     Socket soket;
     string gelen;
     string autcode = string.Empty;
     string ip;
     private static readonly Random random = new Random();
     private static readonly object syncLock = new object();
 #endregion

## Socket Sender

Burada bir xml dosyayı karşı tarafa göndereceğiz. Bunun için bir soket yapısı kurmamız gerekmektedir. Bu da yukarıda bahsettiğim gibi ıp ve port numarasına ihtiyacımız var. Bu bilgileri register üzerinden belirtiyoruz. Ardından server socket oluşturuyoruz.

static TcpClient serverSocket;

public static bool SendServerXML(TestMessage Message, string \_BodyLabel, out string ret\_errorCode, out string ret\_errorDesc)
{
    //TODO: SendServerXML
    bool \_value = false;
    ret\_errorCode = string.Empty;
    ret\_errorDesc = string.Empty;
    string result = string.Empty;
    string errorCode = string.Empty;
    string errorDesc = string.Empty;

    // TODO: SERVER'A GÖNDERİLEN KISIM 
    #region connect server      
    RegistryKey key = Registry.LocalMachine.OpenSubKey(@"SOFTWARE\\Berk");

    if (key != null)
    {
        if (key.GetValue("ServerIP").ToString().Length > 0 &&   key.GetValue("ServerPort").ToString().Length > 0     )
        {
            localAddr = IPAddress.Parse(key.GetValue("ServerIP").ToString());
            IPEndPoint ipe = new IPEndPoint(localAddr, Convert.ToInt32(key.GetValue("ServerPort")));
            serverSocket = new TcpClient(ipe.Address.ToString(), ipe.Port);
            NetworkStream ns = serverSocket.GetStream();
            gonderveri\_dizi = new byte\[1024\];
            gonderveri\_dizi = Encoding.ASCII.GetBytes(Message.Serialize());
            if (gonderveri\_dizi.Length > 10)
            {               
              if (ns.CanWrite)
               {
                ns.Write(gonderveri\_dizi, 0, gonderveri\_dizi.Length);
                ns.Flush();
                \_value = true;
               }
            }
            else
            {
                \_value = false;
            }
            ns.Close();
        }
    }
    #endregion
    Thread.Sleep(1000);
    return \_value;
}

Daha sonra NetworkStream nesnesi üzerinden byte türünde bir değişken tanımlıyoruz. Ardından bu değişkenin içerisine mesajımızı ekliyoruz.

Oluşturduğumuz NetworkStream nesnesinin Write komutu ile diziyi yani bufferımızı ve uzunluğunu yolluyoruz.Ardından flush() komutunu çalıştırıyoruz. Böylece bufferımızın tamamını karşı tarafa geçirmiş oluyoruz. Daha sonra da soketimizi kapatıyoruz.

## Socket Receiver

Burada ise server üzerinde çalışacak komut olarak görebiliriz. Bu metodda ise IP adresi değil port numarası önemli olacak. Localde kendi belirtilen portunu dinlemesini sağladığımız zaman karşıdan gelen mesajı almış olacak. Karşıdan gelen mesajı dinlemek için önce bir Listener oluşturuyoruz. AcceptSocket() metodu ile gelen bağlantıyı kabul etmiş oluyoruz. Burada Thread ile işlem yapmamızın sebebi farklı soketlerden gelen taleplerin birbirini engellemesinin önüne geçilmiş olacak. Böylece birbirlerini beklemeyecekler.

private void socket\_read()
     {
         TestMessage message = new TestMessage();
         gelenveri\_dizi = new byte\[1024\]; // 1024 yeterli uzunluk gelmediği durumlarda arttırmak gerekir. Mesajın tamamı gelmez ! 
         dinleyici.Start();
         do
         {
             if (read\_treadstop)
             {
                 // TODO: SOKETİ DİNLEMEYE BAŞLADIĞI YER / SOCKET LISTENING START
                 Console.WriteLine("SOCKET LISTENING !!");
                 soket = dinleyici.AcceptSocket();
                 if (soket.Poll(1000, SelectMode.SelectRead))
                 {
                     //TODO: PARSING İŞLEMİNİ dYENİ BİR THREADLE YAPACAĞIZ !!
                     Thread th\_write = new Thread(new ThreadStart(get\_message));
                     th\_write.IsBackground = true;
                     th\_write.Name = "thread\_write";
                     th\_write.Start();
                     //Thread.Sleep(2000);
                 }
                 else
                 {
                     gelen = "NoReadData";
                     //no receive data
                 }

                 //	Console.WriteLine(gelen); 
             }

         }
         while (read\_treadstop);

         //Log("port close...", EventLogEntryType.Information);
         //logyaz("port close...");
         dinleyici.Stop();

     }
     public void get\_message ()
     {
         string \_error = null;
         try
         {
             IPEndPoint remoteIpEndPoint = soket.RemoteEndPoint as IPEndPoint;
             #region write db
             gelenveri\_dizi = new byte\[2048\];
             soket.Receive(gelenveri\_dizi, gelenveri\_dizi.Length, 0);
             if (gelenveri\_dizi\[0\] != 0)
             {
                 gelen = Encoding.ASCII.GetString(gelenveri\_dizi);
                 ip = soket.RemoteEndPoint.ToString();

                 int c = gelen.Length;
                 if (gelen\[0\] == 0)
                 {
                     Console.WriteLine("ERROR");
                 }
                 autcode = generation\_autcode(1, 10, 5).ToString();
                 string\[\] sonuc = xml\_parser(gelen);

                 RegistryKey key =                Registry.LocalMachine.OpenSubKey("SOFTWARE\\\\Berk");

                 DataSet ds = new DataSet("TimeRanges");
                 //XML ! 
                 XmlSerializer serializer = new XmlSerializer(typeof(TestMessage));
                 using (TextReader reader = new StringReader(gelen))
                 {
                     TestMessage result = (TestMessage)serializer.Deserialize(reader);
                     
                 }
             }

             else
             {
                Console.WriteLine(e.Message);
             }
             #endregion

         }
         catch (Exception e)
         {
             string tt = gelen;
             Console.WriteLine(e.Message);
         }
     }

Daha sonra oluşturduğumuz soketin Receive() metodu sayesinde bilgileri alıyoruz ardından Encoding işlemi uygulayıp stringe çevirmiş oluyoruz.

![socket ](/wp-images/2018_12_2018-12-23_14-12-49-min.png)

Burada programımız local adresi olan 10.142.0.2 ıpsinin 8002 numaralı portunu dinliyor. Karşımıza xml formatı geliyor. Bundan sonrası [C# XML serialize ve deserialize işlemleri](https://blog.berkarat.com/xml-serialize-deserialize/) yazısında göstermiş olduğum xml işlemlerini yapmak gerekmektedir.

Yazıya ait kaynak kodları : [https://github.com/berkarat/Socket\_Send\_Receive\_Example](https://github.com/berkarat/Socket_Send_Receive_Example)