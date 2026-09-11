---
title: "ASP.NET CORE Entity FrameWork Kullanımı"
published: 2019-07-19
description: "Merhabalar bu yazımızda ASP.Net core işlemlerinde database işlemlerini yapacağız. Bunun için Microsoft Entity Framework kullanacağız. Bu yüzden önceli"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![asp.net](/wp-images/2019_07_net-core.jpg "asp.net core")](/wp-images/2019_07_net-core.jpg)

Merhabalar bu yazımızda ASP.Net core işlemlerinde database işlemlerini yapacağız. Bunun için Microsoft Entity Framework kullanacağız. Bu yüzden öncelikle bu Framework’ün ne olduğundan bahsedeceğim. Bu framework veritabanı ile programımızın arasındaki katmandır. Bu katman sayesinde veritabanında karmaşık sorgular yazmamızın önüne geçiliyor. Ado.Net teknolojisini kullanmaktadır. 

Bizim örneğimizde ise database işlemleri için Models Repositoryler gibi işlemleri adım adım yapacağız.  
Entity Framework yapısında birden farklı şekilde database işlemleri gerçekleşebilir. Ben en sık kullanılan ve güncel olan yöntemi kullanacağım bunun için Code First yöntemini kullanacağız.

### Entity FrameWork Kullanarak Tabloların Oluşturulması

İlk adım olarak modelimizi oluşturuyoruz. Burada oluşturduğumuz model veritabanında tabloyu ifade etmektedir. İçerisindekiler ise sütunları oluşturacaktır.

Not: Tanımlama yaparken Classadı+Id olarak belirlediğimiz property otomatik olarak algılanım ID olarak tanımlanır.

  public class Product
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public double Price { get; set; }
    }

Modeli oluşturduktan sonra veritabanı ile henüz bir bağlantı gerçekleştirmedik. Bu işlem için DbContext sınıfından bir Entity oluşturmamız gerekir. Models klasörüne aşağıdaki AppDbContexti tanımlıyoruz. Burası bizim veritabanı ile iletişimi sağlayacak context nesnemizi oluşturacak.

  public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options):base(options)
        {
        }
        public DbSet<Product> Products { get; set; }

    }

Bu classı oluşturduktan sonra  başlangıçta bu dbcontexti tanımlamamız gerekmektedir. Bu yüzden Startup.cs dosyası içerisinde ConfigureServices fonksiyonu içine aşağıdaki satırı eklememiz gerekmektedir.

            services.AddDbContext<AppDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

Burada DefaultConnection kısmını ise appsettings.json dosyasının içerisinden alıyoruz. Karışık gibi dursa bile uygulayınca kolaylaşıyor.Özet olarak diğer bağlantı yöntemlerinde olduğu gibi connectionstringini contextimizin içine ekleyip bağlantı kurmuş oluyoruz.

Ardından tablolarımız için gerekli bazı ayarları yapmamız gerekmektedir.

Projeye sağ tıklayıp EditProjectFiles üzerinden aşağıdaki dotnet toolunu eklememiz gerekmektedir.

<DotNetCliToolReference Include="Microsoft.EntityFrameWorkCore.Tools.Dotnet" Version="2.0.0"></DotNetCliToolReference>

Ardından tablomuza başlangıçta veri eklemek için SeedData isminde bir class oluşturuyoruz. Burada bir AppDbContext üzerinden bir context nesnesi oluşturuyoruz. Yukarıda dediğim gibi bizim database ile bağlantı ve işlemlerimizi sağlayacak.

Ardından Migrate  metodunu çağırıyoruz. Eğer bekleyen bir migration işlemi varsa onu gerçekleştiriyor ardından database boş ise verileri ekliyoruz.

Daha sonra bu Seed metodu bizden IApplicationBuilder nesnesi beklediği için Startup.cs içerisinden app nesnesini iletiyoruz. Ardından savechanges metodu ile işlemimizi kaydediyoruz.

Bu işlemler sonrasında migration çalıştırmamız gerekmekte. Bunun için projeye sağ tıklayıp dosya yoluna gideriz.Bu dosya yoluna “cmd” yazıp enter dediğimizde karşımıza komut satır ekranı çıkacak. Bu satır ekranına aşağıdaki komutu yazdığımızda migration eklenecek ve proje çalıştırdığımızda tablolar oluşturulmuş ve içerikleri doldurulacaktır.

dotnet ef migrations add "migrationname"

Bu işlemi kontrol etmek için sol tarafta SQL Server Object Explorer üzerinden tablomuzun durumunu görebiliriz. Buraya kadar projemize tablo ekleyip migration oluşturduk ve temel işlemleri gerçekleştirdik. Bundan sonraki yazımda repository kavramından bahsedeceğim.

Kaynak Kod : [_https://github.com/berkarat/.NetCore-EntityFramework-Example_](https://github.com/berkarat/.NetCore-EntityFramework-Example)