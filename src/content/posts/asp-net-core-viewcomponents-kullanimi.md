---
title: "Asp.NET Core ViewComponents Kullanımı"
published: 2019-07-18
description: "Merhabalar bu yazımızda MVC ViewComponents konusundan bahsedeceğim. View Component ASP.Net Core ile kullanılmaya başlamıştır. Daha önce ASP  .Net MVC"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![asp.net](/wp-images/2019_07_net-core.jpg "asp.net core")](/wp-images/2019_07_net-core.jpg)

Merhabalar bu yazımızda MVC ViewComponents konusundan bahsedeceğim. View Component ASP.Net Core ile kullanılmaya başlamıştır. Daha önce ASP  .Net MVC de partial viewlere benzemektedir. Ancak daha performanslı çalışmaktadır ve güncel olanıdır. Bu yüzden bu konuya değineceğim ve bir örnek yapacağız.

Neden partial view değil de ViewComponents kullanırız ? Çünkü daha performanslıdır. Dışarıdan url üzerinden erişilemez. Test etmesi ve derlenmesi daha kolaydır.

#### Nerelerde kullanılır ?

-   Menüler
-   Login Panelleri
-   E ticaret Sitelerinin sepetleri
-   Sidebarlar gibi bir çok yerde kullanmaktadır.

Bu sayede tekrardan kurtulmuş oluruz ve her seferinde  view oluşturup eklemek yerine 1 satırlık kod ile işimizi halledebilmekteyiz.

## Uygulamaya Giriş

Yapacağımız Bu örnekte 2 adet sayfam olacak ve 1 tane Component View oluşturacağım. Bu parçayı iki sayfada da kullanımını göstereceğim. Yalın bir anlatım olacağı için fazla detaya boğmayacağım.

-   ![Asp.net - Asp.NET Core ViewComponents Kullanımı](/wp-images/2019_07_asp.net_-1024x710.png)
    
-   ![Viewcomponents - Asp.NET Core ViewComponents Kullanımı](/wp-images/2019_07_viewcomponents-1024x710.png)
    
-   ![Viewcomponents Mvc - Asp.NET Core ViewComponents Kullanımı](/wp-images/2019_07_viewcomponents-mvc-1024x710.png)
    

İlk olarak bir  adet MVC CORE projesi oluşturuyoruz. Daha sonra Modellerimizi oluşturuyoruz.

 public class Product
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
    }
}

Burada Products ve Categories olarak 2 adet modelimiz bulunmaktadır. Bu iki modeli de aynı sayfada kullanmak için ortak bir model daha oluşturmamız gerekmektedir. ProductCategory adında bir class oluşturup Liste tipinde product ve category modellerimizi içine ekliyoruz. Bu işlemin adı da “ NAVIGATION PROPERTY “ olarak geçmektedir. Ortak tablo oluşturmak gibi düşünebiliriz.

Modellerimizi oluşturduktan sonra  yeni bir Repository adında bir klasör bu klasörün içine de **Abstract** ve **Entity** adında 2 adet yeni klasör oluşturuyoruz. İlk olarak Abstract klasörünün içerisine   **IProductRepository** ve **ICategoryRepository**  adında 2 tane interface tanımlıyoruz. Bu interfaceler içerisine yapacağımız işlemleri (Get, Edit,Add) sadece method olarak ekliyoruz.

 public  interface IProductRepository
    {

       IEnumerable<Product> Products { get;  }

        void AddProduct(Product product);
        
    }

Sonraki adım olarak entity klasörüne de 2 adet  **EfProductRepository** ve **EfCategoryRepository** adında iki adet class oluşturuyoruz. Bu classlar içerisinde interface üzerinden kalıtım işlemi yaparak methodlarımızı alıyoruz. Aynı zamanda ben burada modellerin içerilerini de doldurdum. Daha sonra bu işlemleri database üzerinden yapacağız. Şimdilik yalın olması açısından elimizde veriler hazır olacak.

   public class EfProductRepository : IProductRepository
    {
        List<Product> \_products = new List<Product>()
      {
          new Product(){Name="Computer",Price=2250},
          new Product(){Name="Camera",Price=500},
          new Product(){Name="Monitor",Price=1250},
          new Product(){Name="Mouse",Price=50},
      };

        public IEnumerable<Product> Products => \_products;

        public void AddProduct(Product product)
        {
            \_products.Add(product);
        }
    }

Burada dikkat etmemiz gereken nokta Startup.cs dosyası içerisinde ConfigureServices alanına aşağıdakileri eklememiz gerekmektedir. Bu işleme de **Depency Injection** denmektedir.

services.AddSingleton<IProductRepository, EfProductRepository>();
services.AddSingleton<ICategoryRepository,EfCategoryRepository>();

Bu sayede örneğin **IProductRepository** çağırıldığı zaman **EfProductRepository** classının çağrılacağını söylemiş bulunuyoruz.

## ViewComponents Oluşturma

Sıra geldi Component classımızı oluşturmaya burada Components adında bir yeni klasör daha açıyoruz. Ardından içerisine CategoryMenu adından bir class oluşturuyoruz.

**ComponentViewinin dışarıdan alacağı modeli burada gönderiyoruz. Bu sebeple bu classın adıyla daha sonra View Kısmında oluşturacağımız klasörün aynı olması gerekmektedir aksi halde hata ile karşılaşılmaktadır.**

Burada ViewComponents oluşturma işlemini kalıtım kullanarak yapıyoruz. Diğer yöntemler ise,  ViewComponents Attribute ve Oluşturacağımız class sonuna ViewComponents ekini koyarak oluşturabiliriz.

public class CategoryMenu : ViewComponent
    {
        private ICategoryRepository repository;
        public CategoryMenu(ICategoryRepository reposit)
        {
            repository = reposit;
        }
        public IViewComponentResult Invoke()
        {
            return View(repository.GetCategories);
        }
    }

Bu işlemi de yaptıktan sonra geldik View kısmını oluşturmaya Aynı isimde klasör oluşturduktan sonra default.cshtml adında bir view oluşturuyoruz. Bu view içerisine ben menu yapmak istediğim için menu tipinde bir html ekliyorum. Model olarak da Category gönderdiğim için category ekliyorum. Ardından foreach döngüsü ile işlemimi tamamlıyorum.

@model IEnumerable<Category>
  <div class="tab">
        @foreach (var item in Model)
        {
        <button>  @item.CategoryName</button>
        }    </div>

Bu işlemden sonra geriye sadece bu component kullanmak kalıyor. Bunun da kullanımı aşağıdaki gibidir

@await Component.InvokeAsync("\[ViewComponentName\]") 
Eğer parameter alıyorsa
@await Component.InvokeAsync("\[ViewComponentName\]",\[parameters\])

Bizim işlemimizde dışarıdan parametreyi class ile gönderdiğimiz için ilkini kullanıyoruz ve çalıştırınca sonuç aşağıdaki gibi oluyor. Böylece iki farklı sayfada da aynı component kullanarak tekrar kod yazmaktan kurtuluyoruz ve dinamik bir yapıya kavuşturuyoruz.

Kaynak Kod : [https://github.com/berkarat/.Net-Core-ViewComponents](https://github.com/berkarat/.Net-Core-ViewComponents)