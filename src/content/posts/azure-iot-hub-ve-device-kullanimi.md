---
title: "Azure IOT Hub ve Device Kullanımı"
published: 2020-04-12
description: "Merhabalar bu yazımızısn içeriği Azure IOT Hub ve Device bağlantıları gibi konulara değineceğim. Ardından device ve cloud arasında iletişimin sağlanma"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![Azure Iot Hub - Azure IOT Hub ve Device Kullanımı](/wp-images/2020_04_Azure_IoT_Hub-696x385.png "Azure_IoT_Hub")](/wp-images/2020_04_Azure_IoT_Hub.png)

Merhabalar bu yazımızısn içeriği Azure IOT Hub ve Device bağlantıları gibi konulara değineceğim. Ardından device ve cloud arasında iletişimin sağlanmasını gerçekleştireceğiz.

İlk adım olarak bir tane Azure IOT Hub kurmamız gerekmektedir. Bu hub içerisine device ekleyerek ortak noktadan kontrolleri sağlayacağımız bir alan olarak düşünebiliriz. Bunun için kaynak oluşturmamız gerekmektedir. Bununla ilgili adımları Blob Storage kullanımında anlatmıştım.

> [Azure Blob Storage .Net Örnek Uygulama](https://blog.berkarat.com/azure-blob-storage/)

İlk adımı tamamladıktan sonra hubımızın içerisine giriyoruz. Sol tarafta bir menu göreceğiz burada devices alanına tıklayıp yeni bir device eklemememiz gerekmektedir. Bu device bizim için Raspberry Pi olacak ama başka türde devicelar da bağlamak mümkün. Ben .Net üzerinde örneklerle devam edeceğim için cihazımda WindowsIOT Core yüklü olacak. Ancak bunu simulator üzerinden de console uygulamasıyla gerçekleştirmek mümkün.

### Device Komutları Dinleme

İlk olarak uygulamız çalıştığı sırada gelecek komutları dinlemesi için bir Listener metodu yazmamız gerekli bunun için device connection stringi kullanarak device ile hubımızın bağlantısını gerçekleştiriyoruz ve metod veya mesajın gelmesi için bunu thread olarak paralelde dinlemesini sağlıyoruz.

  s\_deviceClient = DeviceClient.CreateFromConnectionString(s\_connectionString, TransportType.Mqtt);
            
 s\_deviceClient.SetMethodHandlerAsync("GetLocalIPAddress", GetLocalIPAddress, null).Wait();

![Azureiot - Azure IOT Hub ve Device Kullanımı](/wp-images/2020_04_AzureIOT-1024x406.png)

Device Connection String

### Azure IOT Devices Mesaj Gönderme

Burada hub üzerinden mesajımızı deviceımıza gönderebiliriz. Kullanım tercihine göre cihazımızda bir mesaj geldiğinde yaptırabileceğimiz işlemi gerçekleştirebiliriz. Örneğim mesajı göndererek ona göre uygulamayı yeniden başlatabiliriz. Veya uygulamımıza gereken bilgiyi göndererek başka işlemler yaptırabiliriz.

 s\_deviceClient = DeviceClient.CreateFromConnectionString(s\_connectionString, TransportType.Mqtt);

            // Create JSON message
            var Message = new
            {
                msg = messages
            };
            var messageString = JsonConvert.SerializeObject(Message);
            var message = new Message(Encoding.ASCII.GetBytes(messageString));
    s\_deviceClient.SendEventAsync(message);

### Azure Devices Method Çağırma

Asıl önemli kısım aslında biraz da bu. Device üzerinde yazdığımız kodlarla uzaktan device üzerindeki bilgiliyi çekebilmekteyiz. Örneğin ben uygulamada örnek anlaşılması açısından device IP adresini geri döndüren bir metodu uzaktan çağırmayı gösterdim. Böylece birden fazla device için aynı komutla hepsinin durumlarını görebilmekteyim.

 s\_deviceClient = DeviceClient.CreateFromConnectionString(s\_connectionString, TransportType.Mqtt);
            // Create a handler for the direct method call
            s\_deviceClient.SetMethodHandlerAsync("GetLocalIPAddress", GetLocalIPAddress, null).Wait();

Aşağıda örnek uygulamanın Linkini paylaştım buradan detaylara ulaşabilirsiniz.

[https://github.com/berkarat/AzureIOTHubDevice](https://github.com/berkarat/AzureIOTHubDevice)