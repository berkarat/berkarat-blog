---
title: "Temiz Kod (Clean Code) Yazma Teknikleri ve Kodlama standartları – 2"
published: 2021-03-16
description: "Bu yazımız   [https://blog.berkarat.com/temiz-kod-teknikleri-1](https://blog.berkarat.com/temiz-kod-teknikleri-1/) konusunun devamı niteliğindedir. Ay"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![temiz kod](/wp-images/2021_03_cleancode.png "cleancode")](/wp-images/2021_03_cleancode.png)

Bu yazımız   [https://blog.berkarat.com/temiz-kod-teknikleri-1](https://blog.berkarat.com/temiz-kod-teknikleri-1/) konusunun devamı niteliğindedir. Aynı zamanda source control, iş takibi, memory leak gibi konulara da değineceğim

## OOP(Object Oriented Programming) Nesne Yönelimli Programlama

Eğer üst seviye bir dil kullanıyorsanız nesne yapısı kaçınılmazdır. Örnek olarak C# dili  için nesne tabanlı bir dildir. Bu sayede lokal ya da genel olarak nesneler üretip bunlara işlemler ekleyip kullanıp sönümlendirebiliriz. Ancak burada da bir handikap olarak her oluşturulan nesne ramde yer kaplamaktadır. Bu yüzden nesneleri oluştururken 2 kere düşünmek gerekmektedir.

Gereksiz yere nesne oluşturmak yerine duruma göre oluşturmak daha mantıklıdır. Örneğin sadece bir yerde kullanılacak nesneyi en başta constructor adımında oluşturmak  daha faydalıdır. Uygulama açılmadan constructor üzerinde oluşan nesne daha sonra başka bir yerde çağrılabilir.

## Unit Testlerin Yazılması

Bir metod olsun class olsun ya da topyekün bir proje olsun Unit Teslerden geçmesi gerekmektedir. Bu testleri siz de yazabilirsiniz ya da hazır toollar kullanarak da gerçekleştirebilirsiniz. Bu sayede kodunuzda karşılaşabileceğiniz senaryoları test etmiş olup olası hataları ya da geliştirme gereken yerleri kolaylıkla görebilirsiniz.

## Katmanlara Ayırmak

İlk olarak yapacağınız projeyi kafanızda oturttuktan sonra küçük parçalara bölmek çok önemlidir. Devasa yapılar bile en başta küçük parçalarla başlamıştır bunu unutmamak gerekir. En basitinden hesap makinesi uygulaması bile yazsak bunun bunun logic ve business yapılarını ayrı tutmak gerekir. Örneğin toplama işleminin yapıldığı şartların konulduğu kısımları logic olarak tanımlayabiliriz.

Ayrıca MVC yapılarında model view ve controller katmanlarını erişimlerini keskin bir şekilde ayırmak da çok önemlidir. Örneğin Controller üzerinden bir database işlemi yapmak mümkün ancak kesinlikle yanlış bir durumdur. Bunun için önce servis katmanında logic kısmı işlenip daha sonra CRUD işlemlerine geçilip oradan bir dönüş sağlanmalıdır. Bu dönüşlerin de database olarak değil bir DTO (Data Transfer Object)  nesnesine maplenip bunun üzerinden dönmesi gerekmektedir. Her katmanın sadece bir işi olup diğer işleri yapmaması gerekmektedir.

## Kalıtım ve Abstract Yapı

Uygulamalarımızda benzer metodlar aynı ya da benzer işleri gerçekleştiriyorsa bunları ortak bir yapıda oluşturmak daha mantıklıdır. Bu sayede hem kod tekrarından kurtuluruz ve standartı yakalamış oluruz. Bir  Base yapısı kurup Interface oluşturup bu Interfacede kullanılması zorunlu metodları belirlersek işimizi yönetmemiz çok daha kolay olur.  Örnek vermek gerekirse CRUD işlemleri için verebilirim. Bu işlemlerden Insert metodunu bir Generic class oluşturup Interface üzerinden tanımlarsak başka class üzerinde kalıtım yaparak kullanabiliriz.

## Dökümanlaştırma

Bir api veya kullanıcıya sağlanan bir veri sağlayıcı yazdıysanız bunların örnek request gibi hangi metodların ne yaptığı gibi şeyleri doküman olarak hazırlamak sizin kodunuzun kullanımını kolaylaştıracaktır.

Bu bahsettiğim şeyler en genel kolaylaştırıcı tarzlardır. Bunun gibi bir çok kural vardır.

## İş Takibi

İşe başlamadan önce kendinize tecrübelerinize dayanarak bir plan oluşturmanız gerekmektedir. Bu işlem için işlerinizi parçalara bölüp kendinize tasklar ve süreler oluşturmak genel kuraldır. Dört işlem yapan basit bir hesap makinesi uygulamasında her işlem grubu için bir task oluşturup bu deadline süresi vermeniz hem işinizi kontrollü yapacak hem de takibini kolaylaştıracaktır. Bu işlem için JIRA gibi iş takip uygulamaları kullanarak kolayca akışlar dashboardlar oluşturarak yönetebilirsiniz.

## Source Control

Eğer bir projede birden fazla kişi kod yazıyosa source control kaçınılmazdır. Yine hesap makinesi örneğinden devam etmek gerekirse bir kişi toplama bölümünü diğer kişi de bölme kısımını yazıyor diyelim. Bu durumda bir tane master proje oluşturulur. Bu master base olarak kabul edilir ve bunun üzerinde geliştirme yapılmaz. Master üzerinden rebase  alarak kendi branchlerinizi oluşturur ve taşkınız ne ise o işi o branch üzerinde geliştiririz. Bu sayede başkasının yazdığı kodla çakışma ya da birbirinizi ezme gibi durumlar ortadan kalkmış olur. Ayrıca her yerden erişim için de kodunuz localde değil cloud ortamda tutulmuş olur. Belli başlı GIT, Bitbucket gibi açık platformlar kullanılabilir.

> [Visual Studio Github Publish İşlemi – Resimli Anlatım](https://blog.berkarat.com/github-publish/)

### Bonus

## Memory Leak

Genelde threadlerde ya da paralel çalışan uygulamalarda karşılaşılan bir hata durumudur. Bir thread açtıysanız tavsiyem abort ettikten sonra bir daha check etmenizdir. Çünkü bazı durumlarda threadler kapanamıyor ve arka planda açık kalıp bir süre sızıntı yani memory leak meydana gelir.Daha  sonra memory sınırına ulaştığında uygulamanız crash olabilmektedir. Örnek olarak 1024Mb hafızalı bir cihazda çalışan uygulamanız sürekli fiş versin. Bu fiş verme uygulamasında threadleri kapatmayı unutursanız eğer ve her adımda 1Mb gibi bir data kaybınız olması durumunda uygulamanızın ömrü maksimum 1024 işlem kadardır. Daha sonrasında out of memory hatasına düşersiniz ve uygulamanız fail olur.

Bu memory leak olayını fark etmek için visual studioda diagnostic tool kullanabilirsiniz adım adım takip ederek nerede bir sızıntı olduğunu bulabilirsiniz. Ya da Jetbrainsin dotmemory uygulamasını kullanarak uygulamanızda nerede hata olduğunu detaylı dökümanlarla bulabilirsiniz. Bunun için belli aralıklarla snapshot alarak karşılaştırıp çözüme varabilirsiniz.

[https://www.jetbrains.com/dotmemory](https://www.jetbrains.com/dotmemory)