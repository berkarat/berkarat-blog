---
title: "Azure DevOps & Azure Repos Git Depolama"
published: 2019-03-11
description: "Merhabalar bu yazımızda Microsoft tarafından geliştirilen Azure platformunun DevOps kısmından , bunun yanında azure repos dediğimiz depolama alanların"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![Azure Repos - Azure DevOps & Azure Repos Git Depolama](/wp-images/2019_03_azure-repos.png "azure repos")](/wp-images/2019_03_azure-repos.png)

Merhabalar bu yazımızda Microsoft tarafından geliştirilen Azure platformunun DevOps kısmından , bunun yanında azure repos dediğimiz depolama alanlarının kullanımından bahsedeceğim.

Azure DevOps development ve operations sözcüklerinden türetilmiştir. Geliştirme ve opreasyon süreçlerini birlikte kullanabildiğimiz bir yapı ortaya çıkmıştır. Bir çok avantajı da birlikte getirmiştir. Ben bu yazıda Azure repos konusuna değineceğim. Daha önceki github repositorieslerinden bahsetmiştim. [https://blog.berkarat.com/github-publish/](https://blog.berkarat.com/github-publish/) Bu sefer de benzer yapıda olan azure reposlardan bahsedeceğim.

## Azure DevOps Ayarları

Daha önce olduğu gibi işlemlerimi Visual Studio 2017 üzerinden gerçekleştireceğim. İlk olarak bir microsoft accountumuz olması gerekmektedir. Azure erişimi için de bu account üzerinden işlem yapacağız. Eğer Azure DevOps hesabınız yok ise buradan ulaşabilirsiniz. [https://azure.microsoft.com/tr-tr/services/devops/](https://azure.microsoft.com/tr-tr/services/devops/)

![Azure 1 - Azure DevOps & Azure Repos Git Depolama](/wp-images/2019_03_azure-1-1024x555.png)

![Azure 2 - Azure DevOps & Azure Repos Git Depolama](/wp-images/2019_03_azure-2.png)

## Azure Repos Oluşturma

Bu işlemi yapmak için iki yol vardır birisi manuel olarak girip new diyerek yeni bir depolama alanı oluşturabilirsiniz. Ancak bu yazıda Visual Studio üzerinden kurulumunu göstereceğim. Yapı github yapısıyla benzerlik göstermektedir. Aynı şekilde bir adet C# projesi oluşturuyoruz. Ardından sağ tarafta Team Explorer alanına geliyoruz burada üst tarafta Azure DevOps alanı bulunmaktadır. Buradan Connect seçeneğini tıklayıp hesabımıza giriş yapıyoruz.

-   ![Azure 3 - Azure DevOps & Azure Repos Git Depolama](/wp-images/2019_03_azure-3-1024x555.png)
    

## Azure Publish Git Repo

Repository alanımızı oluşturduktan sonra projemizde yapacağımız değişikler. Alt tarafta mavi alanda görünmektedir. Tıpkı githubda olduğu gibi burada da sağ taraftaki Publish Git Repo seçeneğini seçiyoruz.

Daha sonrasında karşımıza oluşturmamızı istediğimiz Repoya ait bilgiler istemektedir. Bunları doldurduktan sonra Changes bölümüne gelerek değişiklikleri Commit and Push seçeneğini seçerek karşıya yollamış oluyoruz.

![Azure 5 - Azure DevOps & Azure Repos Git Depolama](/wp-images/2019_03_azure-5.png)

Daha sonrasında browserda azure üzerinden giriş yapıyoruz. Sol tarafta bulunan Repos alanında varsa daha önceki alanlarımız bulunmaktadır. Oluşturduğumuz alana geliyoruz ve Commits kısmına tıkladığımızda aşağıdaki gibi bir ekran karşımıza gelmektedir. Projemize eklediğimiz alanlar + işareti ile çıkardığımız alanlar ise – işareti ile karşımıza çıkmaktadır.

![Azure 6 - Azure DevOps & Azure Repos Git Depolama](/wp-images/2019_03_azure-6-1024x555.png)

Pushes alanında da anlaşılacağı gibi yaptığımız güncellemelerin başlık olarak karşımıza sunmaktadır. Tıpkı github History alanında olduğu gibi burada da benzer bir yapı kullanılmıştır.

![Azure 7 - Azure DevOps & Azure Repos Git Depolama](/wp-images/2019_03_azure-7-1024x496.png)

Azure Reposun githuba göre avantajı private paylaşımlar yapmamızdan bir ücret talep etmemektedir. Bu da projelerimizi gizli bir alanda kayıt altında tutabilmemize yaramaktadır.