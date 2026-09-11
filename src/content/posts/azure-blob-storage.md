---
title: "Azure Blob Storage  .Net Örnek Uygulama"
published: 2020-03-26
description: "Merhabalar bugünkü yazımızda Azure Blob Storage servisinden bahsedeceğim. Uygulamalarımızdaki logları, test verilerimizi ve daha bir çok dosyayı özel"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![Blob Storage - Azure Blob Storage  .Net Örnek Uygulama](/wp-images/2020_03_blob_Storage.png "blob_Storage")](/wp-images/2020_03_blob_Storage.png)

Merhabalar bugünkü yazımızda Azure Blob Storage servisinden bahsedeceğim. Uygulamalarımızdaki logları, test verilerimizi ve daha bir çok dosyayı özel veya public bir şekilde depolayabilmek için Blob Storage servisini kullanabilmekteyiz.

Genel Kullanım alanları verilerin depolanması ve tarayıcıda doğrudan bir şekilde aktarılması gibi alanlarda çokça kullanılır.İstenildiği durumda bu blob depoları herhangi bir kullanıcının ulaşabileceği bir alana yönlendirilip tarayıcıda görüntülenebilir.

## Azure Blob Storage Hesabı Oluşturma

Bu işlem için Microsoft Azure hesabınız olması gerekmektedir. Aşağıdaki linkten ücretsiz olarak bir hesap edinebilirsiniz ya da varsa hesabınız devam edebilirsiniz.

[https://azure.microsoft.com/tr-tr/free/](https://azure.microsoft.com/tr-tr/free/)

İlk adım olarak hesabı açtıktan sonra sol tarafta panelde bulunan “Create Resource” diyerek bir kaynak oluşturuyoruz. Ardından marketten Storage account – blob, file, table, queue seçiyoruz.

-   ![Azure Blob Storage .Net Örnek Uygulama ekran görüntüsü 1](/wp-images/2020_03_2020-03-27_17-51-39.png)
    
-   ![Azure Blob Storage .Net Örnek Uygulama ekran görüntüsü 2](/wp-images/2020_03_2020-03-27_17-52-38-1024x897.png)
    
-   ![Azure Blob Storage .Net Örnek Uygulama ekran görüntüsü 3](/wp-images/2020_03_2020-03-27_17-53-26.png)
    

Arından karşımıza gelen ekranda gerekli yerleri storage name gibi alanları dolduruyoruz. Review and Create dedikten sonra All Resources kısmında artık storage depomuzu görebiliyoruz.

![Azure Blob Storage .Net Örnek Uygulama ekran görüntüsü 4](/wp-images/2020_03_2020-03-27_18-02-47-1024x644.png)

Burada manual olarak da container oluşturma ve dosya yükleme seçeneği var ancak bizim bunu otomatik yapmamız doğru olandır. O yüzden kalan kısmı .net ortamındaki bir örnek üzerinden devam edeceğim.

#### **Storage Explorer**

Bu uygulamayı aşağıdaki linkten indirebiliriz.

[https://azure.microsoft.com/tr-tr/features/storage-explorer/](https://azure.microsoft.com/tr-tr/features/storage-explorer/)  
  
Burası da tıpkı portal gibi bize storagelarımızı control etmemizi sağlayan masaüstü bir uygulamadır. Avantajlı olarak portala bağlanmadan durumları görüntüleyebilmekteyiz. Ayrıca monitoring ile kontrol de sağlayabilimekteyiz.

#### Azure Blob Storage Uygulama

Burada ilk olarak bir tane .Net Console application oluşturuyoruz. Ardından projemize WindowsAzure.Storage paketini yüklüyoruz. Bu paket içerisindeki classları kullanarak depolarımıza ulaşıp upload download gibi işlemleri yapacağız

Install-Package Azure.Storage.Blobs -Version 12.4.0

Ardından metodlarımızı yazmaya başlıyoruz. Azure portal>Settings>AccessKeys dosyasının altından connection stringimizi alıyoruz. Bunu uygulamamızda bir stringe atıyoruz. Bu string değer bizim storage ile bağlantımızı sağlayacaktır.

Bunun ardından containerımızı oluşturuyoruz. Bu containerları klasör gibi de düşünebiliriz. Böylece birden fazla projenin klasörlerini ayrı ayrı depolayabilmekteyiz.

Ardından aşağıdaki gibi basit bir kod bloğu oluşturuyoruz. ExistsAsync komutu ile aynı isimde bir container var mı onu control edip ardından yoksa yeni bir tane oluşturuyoruz. Ardından log dosyamızı yani bizim txt dosyamızı oluşturup karşıya gönderiyoruz. Eğer aynı dosyanın içine tek tek yasmak istiyorsak da yine aynı isimle verdiğimiz konteynır altındaki dosyaya ekleyebiliriz. İşlem aslında bu kadar basit.

 CloudBlobClient cloudBlobClient = storageAccount.CreateCloudBlobClient();
                 cloudBlobContainer = cloudBlobClient.GetContainerReference("berkaratcontainer");
                bool isExists = cloudBlobContainer.Exists();
                if (!isExists)
                {                     
await  CloudBlobContainer.CreateAsync();
                    Console.WriteLine($"Created container '{cloudBlobContainer.Name}'");
                }

Bu kod bloğuyla blob tipinde yetkilendirme verdik.

Container adını verirken dikkat etmemiz gereken şey küçük harfler kullanmaktır aksi taktirde exceptiona düşmektedir.Burada upload download  ve delete kodlarını paylaşıyorum. İsteğe bağlı olarak yeni farklı dosya tipleri de eklenebilmektedir. Bunu örnek uygulamanın git linkinden indirip test edebilirsiniz.

Git Linki[https://github.com/berkarat/AzureBlobStorage](https://github.com/berkarat/AzureBlobStorage)