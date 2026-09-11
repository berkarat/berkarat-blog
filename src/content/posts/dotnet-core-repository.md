---
title: "ASP.NET Core Repository Kavramı"
published: 2019-07-20
description: "Daha önce bahsettiğim .Net projesinin devamı olan bu yazıda repository oluşturmadan bahsedip bunun içerisine önce statik yapıda bir repository oluştur"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![asp.net](/wp-images/2019_07_net-core.jpg "asp.net core")](/wp-images/2019_07_net-core.jpg)

Daha önce bahsettiğim .Net projesinin devamı olan bu yazıda repository oluşturmadan bahsedip bunun içerisine önce statik yapıda bir repository oluşturacağız. Ardından dinamik olması açısından Generic kavramından bahsedeceğim. İlk olarak bu kavramın ne olduğundan bahsetmem gerek. Ardından da uygulamaya kaldığı yerden devam edebiliriz.

## Repository Nedir?

Artık database oluşturma işlemini gerçekleştirdik ve sıra geldi yapmak istediğimiz işlemlere. Bu işlemler ekleme edit veya update gibi standart işlemler olabilir veya daha spesifik sorgular olabilmektedir. Bu sebeple yani depolama alanları oluşturmamız bizim için daha dinamik bir kullanım yaratmaktadır. Her controller için tekrar aynı sorguları yasmak performans açısından hayli olumsuz etkilere yol açacaktır.

Repository kelimesi havuz depo olarak da kullanılmaktadır. Biz de burada metodlarımızı depolayacağımız bir alan olarak kullanacağız.Bunun için Repositorys adında bir klasör tanımlıyoruz. Ardından bu klasörün içerisine Abstract ve Concrete adında iki kasör oluşturuyoruz.

### Abstract Repository

Bu klasör altında bir adet interface tanımlayacağız. **_IProductRepository_** adında bir interface tanımladım. Burada kullanacağımız metodları tanımlıyoruz.

Ardından Concrete klasörü altından **_EfProductRepository_** adında bir class tanımlıyoruz. Bu class içerisine IProductRepository interface üzerinden kalıtım işlemi yapıyoruz. Böylece metodlar içerisine eklenmiş oluyor.

İlk adım olarak db bağlantımızı sağlayacak context nesnesini constructor içerisinden alıyoruz.Bu context ile işlemlerimizi gerçekleştireceğiz.

 private AppDbContext context;
        public EfProductRepository(AppDbContext \_context)
        {
            context = \_context;
        }

## Generic Repository

Yukarıda bahsetiğimiz yapı static olarak oluşan depolardı. Benzer şekilde kategori tablosu yaratıp kullansaydık yine add delete gibi işlemler gerçekleştireceğiz. Bu sebeple tekrara düşmemek için Generic bir repository kavramından yola çıkarsak her yerde kullanabiliriz.

Generic türünde sınıf için ilk olarak <T> tipinde bir interface tanımlaması yapmamız gerekir.

 public interface IGenericRepository<T> where T:class //class tipinde
    { 
        T GetAll();
    }

Benzer şekilde Concrete klasörüne de bu interfaceden türetilmiş bir EfGenericRepository adında bir class tanımlarız. Bu class da generic tipinde olması gerekmktedir. Artık elimizde bir generic yapıda olan repositorymiz var bunu controller içerisinden kullanabiliriz. Kullanımı aşağıdaki gibidir.

public class EfGenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected readonly DbContext context;
        public EfGenericRepository(DbContext ctx)
        {
            context = ctx;
        }
         public IQueryable<T> GetAll()
        {
            return context.Set<T>();
        }
}

## IUnitOfWork Kavramı

Bu kavramda aslında bir controllerda kullanılan birden fazla repositoryleri birlikte kullanımında kullanılır. Bunun için IUnitOfWork tipinde bir interface yaratıp bunun içerisine diğer Repositoryleri tanımlayıp çağırıyoruz. Bu bize böylece ortak metodları bir nesne içerisinde çağırma imkanı sağlamaktadır.

  public interface IUnitOfWork: IDisposable
    {
        ICategoryRepository Categories { get; }
        IProductRepository Products { get; }
     }

public class EfUnitOfWork : IUnitOfWork
    {
        private readonly EduraContext dbContext;
        public EfUnitOfWork(EduraContext \_dbContext)
        {
            dbContext = \_dbContext;

        }
        private IProductRepository \_products;
        private ICategoryRepository \_categories;
        public ICategoryRepository Categories
        {
            get
            {

                if (\_categories == null)
                {
                    \_categories = new EfCategoryRepository(dbContext);
                }
                return \_categories;
            }
        }

        public IProductRepository Products
        {
            get
            {
                if (\_products == null)
                {
                    \_products = new EfProductRepository(dbContext);
                }
                return \_products;
            }
        }
         
        public void Dispose()
        {
            dbContext.Dispose();
        }
    }

Kaynak Kod : [https://github.com/berkarat/.NetCore-EntityFramework-Example](https://github.com/berkarat/.NetCore-EntityFramework-Example)