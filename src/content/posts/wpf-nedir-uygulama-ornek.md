---
title: "Visual Studio WPF(Windows Presentation Foundation) Nedir?  Uygulama Örnek"
published: 2018-10-23
description: "WPF (Windows Presentation Foundation) Microsoft’un çıkardığı .Net grafik altyapısını oluşturan XAML tabanlı sistemdir. Son kullanıcıya yönelik görsel"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![Wpf Logo - WPF Blend Uygulaması](/wp-images/2018_10_wpf_logo.png "wpf_logo")](/wp-images/2018_10_wpf_logo.png)

WPF (Windows Presentation Foundation) Microsoft’un çıkardığı .Net grafik altyapısını oluşturan XAML tabanlı sistemdir. Son kullanıcıya yönelik görsel amaçlar düşünülerek kurulmuş bir sistemdir

Daha eski teknoloji olan Windows Form uygulamalarının gelişmiş hali diyebiliriz. Bu platformun sağladığı birçok avantaj vardır. Bunlardan bazıları modern ara yüze sahip olması, ses ve görüntü eklemelerin hızlı ve rahat olması, kullanıcı ile etkileşimli olması gibi özellikleri avantaj sağlamaktır.

En büyük sorunlardan birisi de çözünürlük sorunuydu. Örneğin 1024×768 bir ekrana göre ayarladığınız bir uygulamayı 1680×1050 çözünürlükteki bir ekrana uyarlamak çok zordur. Çözünürlük anlamında kayıplar olmaktadır.

WPF bu sorunu çözerek görsellik ve çözünürlük sorununu ortadan kaldırmıştır. Daha modern bir görünüme geçmiştir.

Bunun yanı sıra en önemli kısmı donanımı en yüksek verimle kullanmasıdır.

Örneğin bir logonun 360 derece kendi etrafında dönmesini Windows Form tarafında ancak döngüler kullanılarak yapmak mümkünken. WPF ve Blend kullanarak çok daha hızlı ve verimli şekilde yapmak mümkündür.

Gelelim WPF örneklerine.

Tıpkı diğer uygulamalar gibi File>New>Project diyoruz ve karşımıza gelen ekrandan wpf uygulamasını seçiyoruz.

![C#](/wp-images/2018_02_wpf.png)

[Daha önceki yazımda](https://blog.berkarat.com/c-thread-ve-multithread-islemleri/) Threadlerden bahsetmiştim. Bu örnek de daha çok threadlerin kullanıldığı bir uygulama olacak. Windows Form uygulamalarında Timer kullanılırken WPF için timer kullanımı kaldırılmıştır. Onun yerine Background Worker denilen yapı kullanılmaya başlanmıştır.

public MainWindow ()
{
InitializeComponent ();

backgroundWorker1.WorkerReportsProgress=true;
backgroundWorker1.WorkerSupportsCancellation=true;
backgroundWorker1.ProgressChanged+=new ProgressChangedEventHandler (backgroundWorker1\_ProgressChanged);
backgroundWorker1.RunWorkerCompleted+=new RunWorkerCompletedEventHandler (backgroundWorker1\_Completed);
backgroundWorker1.DoWork+=new DoWorkEventHandler (backgroundWorker1\_DoWork);
}

private void backgroundWorker1\_Completed (object sender, RunWorkerCompletedEventArgs e)
{
DateTime t = DateTime.Now;
if (e.Cancelled)
{

// Canceled.

}
else if (e.Error!=null)
{
// Error while performing background operation.
}
else
{
// Task Completed...
}

}

private void backgroundWorker1\_ProgressChanged (object sender, ProgressChangedEventArgs e)
{
textBox.Text=DateTime.Now.ToString ();

}

private void backgroundWorker1\_DoWork (object sender, DoWorkEventArgs e)
{
do
{

backgroundWorker1.ReportProgress (1);

if (backgroundWorker1.CancellationPending)
{
e.Cancel=true;
return;
}
Thread.Sleep (1000);

} while (true);

}

Bu örnekte BackgorundWorkerların nasıl çalıştığını anlatacağım.

Üç adımdan oluşmaktadır.

İşlemi gerçekleştirme (Dowork)  
Süreyi geçirme ( Progress Changed)  
Tamamlama(Completed)  
Adından da  anlaşılacağı gibi Dowork kısmında “ReportProgress” diyerek işlemimizi gerçekleştiriyoruz. Bunun yerine daha detaylı karmaşık bir yapı oluşturabiliriz.

Progress Changed bölümünde ise bu örnekte ekrana görüntüleme yapılmış. Örneğin her adımda bir nesneyi new diyerek yeniden oluşturabiliriz veya  Thread başlatabiliriz.

Completed kısmı ise adı üzerinde tamamlandığında ne yapacağımızı belirliyoruz. RunWorkerCompletedEventArgs argümentini kullanarak “Cancel”,”Error”,”Result” gibi  eventlara göre yapılmasını istediğimiz olayları belirliyoruz.

### Örnek Uygulama

Daha iyi anlaşılabilmesi için bu linkteki örnek incelenebilir.  Bu örnek kronometre uygulamasının WPF ve BackgroundWorker kullanılarak yapılmıştır.

![WPF Blend](/wp-images/2018_10_4.png)

Uygulamanın ekran görüntüsü

[https://github.com/berkarat/BackgroundWorker\_Example](https://github.com/berkarat/BackgroundWorker_Example)