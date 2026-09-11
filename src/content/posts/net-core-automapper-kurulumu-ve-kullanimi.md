---
title: ".Net Core AutoMapper Kurulumu ve Kullanımı"
published: 2021-03-27
description: "Merhabalar bugünün konusu olarak benim sıkça kullandığım AutoMapper kütüphanesinden  bahsedeceğim ve bir örnek uygulama yapacağım."
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![Automapper - .Net Core AutoMapper Kurulumu ve Kullanımı](/wp-images/2021_03_automapper.png "automapper")](/wp-images/2021_03_automapper.png)

automapper

Merhabalar bugünün konusu olarak benim sıkça kullandığım AutoMapper kütüphanesinden  bahsedeceğim ve bir örnek uygulama yapacağım.

## Auto Mapper nedir ?

.Net Core projelerinde database katmanına erişmek sadece CRUD işlemlerinde kullanılır. Yazılı olmayan bir kuraldır bu. Ancak bu veriler üzerinde logic işlemler yapmamız da gerekmektedir. Bunun için DTO yani data transfer objeleri kullanırız. Bu database ve DTO sınıfflarını birbirine eşlemek için AutoMapper kütüphanesi yardımımıza koşuyor. Bu sayede ekstra kod fazlalığında kurtulmuş ve sade bir yapıda kod oluşturabiliyoruz.

## AutoMapper Kurulumu

İlk olarak Automapper kurulumu için package manager console üzerinden aşağıdaki nugetleri kurmamız gerekmektedir.

Install-Package AutoMapper
Install-Package AutoMapper.Extensions.Microsoft.DependencyInjection

Bu kurulumu yaptıktan sonra projenin altında MappingProfile adında bir class oluşturacağız ve burada CreateMap komutu ile  source ve destination yani neyi neye map edeceğimiz tanımlayacağız.

Bu tanımlama bize neyin neye map edileceğini belirtmemize yaramaktadır. Örnek olarak bir decimali longa ya da tam tersi olarak maplememizi sağlar. Burada ReverseMap komutu ise database classından oluşturulan DTO classına map etmemize yararken aynı zamanda tam tersi bir işlemi de gerçekleştirmemize yaramaktadır.

ForMember kullanımında ise class içerisindeki nesnenin tam olarak karşılığını belirttiğimiz durumlarda kullanılır. Buradaki örnekte ufak da olsa bir logic işlem gerçekleştirmekteyiz. Doğum tarihi verisini alıp günümüzden çıkararak yaş bilgisine ulaştırıp DTO üzerinde Age fieldına set etmiş oluyoruz. Buna benzer şekilde istediğimiz nesneyi belirttiğimiz nesneye atamamıza yarayan bir methoddur ForMember.

MapFrom ise datayı nereden aldığımız yani database classı üzerinden aldığımız veriyi belirtmektedir.

public MappingProfile()
    {
        CreateMap<UserDto, \_dbUser>().ReverseMap()
            .ForMember(x=>x.JsonString, opt=>opt.MapFrom(
               x=>JsonConvert.DeserializeObject(x.JsonString) ))
              .ForMember(dest => dest.Age, opt => opt
      .MapFrom(src => (DateTime.Now.Year - src.BirthDate.Year)
      ));                  
    }

Örnek üzerinden ilerleyeceğim için burada kullandığım ve karşılaştığım olaylardan bahsedeceğim.

Tanımlamalarda örnek bir json üzerinden ilerliyorum. Database kolonu içerisinde Json string olarak eklenmiş bir datayı karşıya obje olarak getirmek gerekmektedir. Bu durumlarda Newtonsoft kütüphanesi ile sadece mapper içinde küçük bir tanım yaparak  objeye çevirebilmekteyiz. Bunu eğer  mapper olmadan yaparsak tek tek objeyi oluşturup tanımlamaları yapmak gerekir ki bu da kod okunurluğu açısından olumsuz bir durumdur.

Daha sonra tanımladığımız nesneyi ekranda görüntüleme yapmaktayız. AutoMapper sayesinde database erişiminden kurtulmuş ve o data üzerinde logic işlemler yapmaktayız. Bu da Core katmanında datanın işlenmesini sağlamaktadır. Bu sayede N katmanlı mimari dediğimiz yapının temellerinden de uzaklaşmamış oluyoruz. Büyük çaplı projelerde N katmanlı mimari olmazsa olmazlardandır ve mapping işlemi bunun için çok faydalı bir konumda yer almaktadır.

public void ConfigureServices(IServiceCollection services)
{
    services.AddControllersWithViews();
    services.AddAutoMapper(typeof(MappingProfile));

}

Bu yazımda bahsettiğim konuya dair oluşturduğum basit ama anlaşılır bir kaynak kodu ekliyorum. Burada veritabanı bağlantısı kurmadan manuel bir şekilde ilerliyorum. Ancak sizler database üzerinden bağlantı kurarak da işlemlere devam edebilirsiniz. Aşağıda kaynak kod bilgilerini bırakıyorum Github üzerinden erişebilirsiniz.

[https://github.com/berkarat/MapperProfileExample](https://github.com/berkarat/MapperProfileExample)