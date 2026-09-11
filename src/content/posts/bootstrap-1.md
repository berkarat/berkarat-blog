---
title: "Bootstrap Nedir ? Nasıl Eklenir ?   Uygulama Örnekleri"
published: 2019-02-26
description: "Merhabalar bu yazımızın konusu web programlamada front end kısmıyla ilgili. Konumuz bootstrap kütüphanesi. Bu yazıda bootstrap kütüphanesi ile örnek u"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![Bootstrap Logo - Bootstrap Nedir ? Nasıl Eklenir ?   Uygulama Örnekleri](/wp-images/2019_02_Bootstrap-Logo.png "Bootstrap-Logo")](/wp-images/2019_02_Bootstrap-Logo.png)

Merhabalar bu yazımızın konusu web programlamada front end kısmıyla ilgili. Konumuz bootstrap kütüphanesi. Bu yazıda bootstrap kütüphanesi ile örnek uygulamalar geliştireceğiz ve bu sayede sitemizin görsel olarak hoş ve kullanılabilir bir görüntü almasını sağlayacağız. Bu işlemleri yaparken de Jquery kullanmamız gerekmektedir. Bu yüzden bu yazıdan önce [Jquery İşlemleri](https://blog.berkarat.com/jquery-giris/) yazısındaki örnekleri incelemenizi öneririm. Aksi takdirde bazı komutları anlamak zorlaşacaktır.

# Bootstrap Nedir ?

Twitter tarafından desteklenen sitelerin tasarımlarını geliştirmeye yarayan bir stil dosyası diyebiliriz. Bu stil dosyası sayesinde butonlar, menüler, sliderlar gibi bir çok görsel efektler de ekleyerek hoş bir görüntüyü rahatça oluşturabilmekteyiz. Ayrıca responsive dediğimiz mobil uyumlu web siteleri yapmamız da mümkündür. Kurulumu oldukça basittir. Temel olarak 3 ve 4. versiyonları vardır. Bu yazımızda son versiyon olan Bootsrap V4.3.1 paketini kullanacağız.

Sayfaya import edilmesi için aşağıdaki metni <head> tagleri arasına ekliyoruz.

<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>

Ancak diğer js, jquery dosyalarını da eklememiz gerekmektedir. Bunun için de yine <head> tagleri arasına aşağıdaki linki ekliyoruz.

<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

Daha sonrasına örnekler üzerinden gidelim. Bu stil dosyasıyla yapabileceğimiz bir çok şey var ancak ben temel olarak belli başlı şeylere değineceğim.

## Grid Yapısı

Öncelikle Grid yani ızgara yapısından bahsetmemiz gerekmektedir. Bu yapı  sayfamızı 12 adet kolona bölmemize yaramaktadır. Bu 12 kolonu 4-4-4 veya 3-3-3-3 olarak gibi bir çok kombinasyonda bölerek kullanma rahatlığı sağlıyor. Boyut olarak ise xsmall, small, medium, large, xlarge gibi seçeneklerimiz de mevcuttur. Bu seçenekler ileride sitenin istenilen ekranlara uygun şekilde uyum sağlması için büyük kolaylık sağlamaktadır. Kısacasi responsive bir yapı kurmak gerekirse bu boyutlara dikkat etmemiz gerekmektedir.

<div class="container-fluid">
             <div class="container-fluid">
               <div class="row">
                 <div class="col-xs-6 col-sm-3  col-md-6  col-lg-9 bg-success">
                   Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br>
             
                 </div>
                 <div class="col-xs-6  col-sm-9 col-md-6  col-lg-3 bg-warning">
                   Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                 </div>
               </div>
             </div>
           </div>

Yukarıdaki yapıda sayfa 2ye 6-6  bölünmüştür. Ancak bu %100 bir yapıda eğer sayfa %50 olarak küçük bir ekrana geçerse yani mobile yakın veya tablet ekranına o zaman bölünme işlemi  %25 e %75 olarak bölünecek daha büyük bir ekrana geçerse de tam tersi olarak %75e %25 olarak değişecektir aşağıdaki resimdeki gibi olacaktır.![Bootstrap Example - Bootstrap Nedir ? Nasıl Eklenir ? Uygulama Örnekleri](/wp-images/2019_02_bootstrap-example.png)![Bootstrap Example 1 - Bootstrap Nedir ? Nasıl Eklenir ? Uygulama Örnekleri](/wp-images/2019_02_bootstrap-example-1.png)![Bootstrap Example 2 - Bootstrap Nedir ? Nasıl Eklenir ? Uygulama Örnekleri](/wp-images/2019_02_bootstrap-example-2-1024x148.png)

## Popover Menu

Bu popover işlemi ise son versiyonla gelen hoş bir güncellemedir. Bu sayede istediğimiz nesne üzerine tıklanınca ya da üzerine gelinince açılan bir bilgilendirme popup açılır.  Bu işlem için jquery kullanmamız gerekmektedir.

![Bootstrap Example 3 - Bootstrap Nedir ? Nasıl Eklenir ? Uygulama Örnekleri](/wp-images/2019_02_bootstrap-example-3-300x149.png)<div class="container">
       <h3>Popover Example</h3>
       <a href="#" title="Başlık - 1 " data-toggle="popover" data-content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis voluptatem iusto optio laborum ">Click Me !</a><br>
       <a href="#" title="Başlık - 1" data-toggle="popover" data-trigger="hover" data-content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis voluptatem iusto optio laborum ">Hover over me !</a>
   </div>

   <script>
       $(document).ready(function () {
           $('\[data-toggle="popover"\]').popover();
       });
   </script>

![Bootstrap Example 3 - Bootstrap Nedir ? Nasıl Eklenir ? Uygulama Örnekleri](/wp-images/2019_02_bootstrap-example-3.png)

## Collapse

Bu işlemde ise anlaşılacağı gibi bir bölümün açılır kapanır olmasını sağlamaktadır.

<div class="container mt-3">
       <h2>  Collapsible Example</h2>
            <a href="" data-toggle="collapse" data-target="#demo">Read More ! </a>
       <!-- <button type="button" class="btn btn-primary" data-toggle="collapse" data-target="#demo">Simple
           collapsible</button> -->
       <div id="demo" class="collapse">
           Lorem ipsum dolor sit amet, consectetur adipisicing elit,
           sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
           quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
       </div>
   </div>

## Open Modal

Bu işlem ise alert fonksiyonun güzel bir görüntü halinde görünmesine yarar. Böylece daha hoş bir uyarı ekranına sahip oluruz.

<div class="container mt-3">
           <h2>Activate Modal with JavaScript</h2>
           <!-- Trigger the modal with a button -->
           <button type="button" class="btn btn-primary" id="myBtn">Click Me !</button>
         
           <!-- The Modal -->
           <div class="modal fade" id="myModal">
             <div class="modal-dialog">
               <div class="modal-content">
               
                 <!-- Modal Header -->
                 <div class="modal-header">
                   <h4 class="modal-title">Header</h4>
                   <button type="button" class="close" data-dismiss="modal">X</button>
                 </div>
                 
                 <!-- Modal body -->
                 <div class="modal-body">
                 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum pariatur nostrum, perspiciatis dolorem tempore fugiat dicta quaerat assumenda blanditiis quod provident aut maxime hic magni! Ipsum, ea ex! Ab, quam!
                 </div>
                 
                 <!-- Modal footer -->
                 <div class="modal-footer">
                   <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                 </div>
                 
               </div>
             </div>
           </div>
           
         </div>
         
         <script>
         $(document).ready(function(){
           $("#myBtn").click(function(){
             $("#myModal").modal();
           });
         });
         </script>

Daha fazla örnek için [https://getbootstrap.com/docs/4.3/examples/](https://getbootstrap.com/docs/4.3/examples/)