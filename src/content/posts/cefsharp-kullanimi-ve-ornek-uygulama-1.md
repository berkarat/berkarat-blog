---
title: "CefSharp Kullanımı ve Örnek Uygulama – 1"
published: 2019-01-19
description: "_📌 Güncelleme (Ağustos 2026): CefSharp hâlâ kullanılabiliyor; yeni sürümlerde platform hedefi ve JavaScript binding kullanımındaki değişikliklere dik"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![cefsharp kurulum](/wp-images/2019_01_articleocw-58dff32e7375c-min.png "cefsharp")](/wp-images/2019_01_articleocw-58dff32e7375c-min.png)

_📌 Güncelleme (Ağustos 2026): CefSharp hâlâ kullanılabiliyor; yeni sürümlerde platform hedefi ve JavaScript binding kullanımındaki değişikliklere dikkat edilmelidir._

Merhaba bu yazımız devam niteliğinde bir yazı olacaktır. Daha önce  [C# Web Browser Kullanımı](https://blog.berkarat.com/webbrowser/) yazısında browser kullanımından bahsetmiştim. Ancak bu browser yapı olarak eski Internet Explorer altyapısını kullandığından dolayı JavaScript uyumluluk hataları almaktaydı. Bu sebeple bugün Cefsharp eklentisinin kurulumundan ve örnek uygulamadan bahsedeceğim. Bu anlatma işlemini winform üzerine bir web browser kurup onun üzerinde işlemler yaparak anlatacağım.

## Cefsharp Nedir ?

Chromium altyapısını kullanan chrome web browserını kullanmamıza yarayan bir pakettir. Bu paket sayesinde chrome içerisinde kullandığımız browser özelliklerinin hepsine erişebilmekteyiz.

## Cefsharp Kurulumu

Bu paketin iki türlü kurulum mevcuttur. Ya aşağıda vereceğim link üzerinden dosyaları indirip projemize eklemek. Diğer yol ise NuGet içerisinden CefSharp.WinForms paketini kurmaktır; güncel projelerde NuGet kurulumu tercih edilir. Ben NuGet üzerinden indirip işlemleri yapacağım. Aşağıdaki gibi install dedikten sonra birkaç saniye içinde hızlıca kurulum da gerçekleşmiş oluyor.

![cefsharp ](/wp-images/2019_01_2019-01-19_13-10-25-min.png)

Kurulum yaptıktan sonra debug işleminde  _” cefsharp.common contains unmanaged resources ”_  hatasını alacağız. Bu hata aslında işlemci uyumundan kaynaklı olduğundan hangi işlemciyle debug etmemiz gerektiğini  ayarlamalıyız. Bunun için üstteki menüden Build>Configuration Manager yoluna gidiyoruz. Açılan ekranda platform sekmesine tıklayarak New seçeneğini seçiyoruz. Bu örnekte x86 yani 32 bitlik işlemci seçilmiştir. Güncel CefSharp sürümlerinde hedef platformu (x86/x64/AnyCPU) kullandığınız paket sürümü ve işletim sistemiyle uyumlu seçmelisiniz.

![cefsharp kurulum](/wp-images/2019_01_2019-01-19_13-19-08-min.png)

## Cefsharp Kullanım

Cefsharp kullanımı için bir adef winform/wpf gibi browser görüntülemek için gereken bir alan oluşturmamız yeterlidir. Bundan sonrasında using bloğuna gereken referansları ekleriz.

using System.Windows.Forms;
using CefSharp;
using CefSharp.WinForms;

Sonrasında aşağıdaki kod bloğunu Form oluşturulduktan hemen sonra ekliyoruz.

public Form1()
 {
     InitializeComponent();
     this.WindowState = FormWindowState.Maximized;
     CefSettings settings = new CefSettings();
     CefSharpSettings.LegacyJavascriptBindingEnabled = true;
     Cef.Initialize(settings);    
     chrome = new ChromiumWebBrowser("http://google.com");
     chrome.StatusMessage += Chrome\_StatusMessage;
     chrome.IsBrowserInitializedChanged += Chrome\_IsBrowserInitializedChanged;
     chrome.FrameLoadStart += Chrome\_FrameLoadStart;
     chrome.FrameLoadEnd += Chrome\_FrameLoadEnd;
     chrome.RegisterJsObject("object", new CallbackObjectForJs());
     this.panel1.Controls.Add(chrome);
     chrome.Dock = DockStyle.Fill;
 }

**2026 notu:** Yeni CefSharp sürümlerinde JavaScript binding tarafında JavascriptObjectRepository.Register kullanımını ve seçtiğiniz CefSharp sürümünün dokümantasyonunu kontrol edin; LegacyJavascriptBindingEnabled daha çok eski kodlarla uyumluluk içindir.

nBu kodda Settings ayarlarını yapıyoruz. Tıpkı webbrowser örneğimizdekine benzer şekildedir. O örnekte Navigate metodu sayfaya gitmemize yaraken burada Load metodunu kullanıyoruz. Burada bazı eventlerden de bahsetmem gerekmekte. Bu eventler sayesinde sayfanının durumunu 404 hatası alıp almadığı gibi start stop durumlarını kontrol edebilmekteyiz. Durumuyla ilgili sorgulamaları da bu eventler sayesinde ulaşabiliriz.

private void Chrome\_FrameLoadEnd(object sender, FrameLoadEndEventArgs e)
      {   
          if (e.HttpStatusCode == 404 || e.HttpStatusCode == 0)
          {
              // 404 Not Found !!
          }
      }

Bu Event sayesinde sayfa yüklenmediği hata aldığı durumları kontrol etmek mümkündür. Bir diğer event ise sayfanın değil browserın yüklenip yüklenemediğini sorgulamamıza yarayan Chrome\_IsBrowserInitializedChanged eventi. Bu eventi de aşağıdaki gibi kullanıyoruz. Burada da !e.IsBrowserInitialized komutunu if bloğunda kullanarak browsera ait bir problem olduğunda nasıl bir refleks göstereceğimizi belirleyebiliriz.

Kurulum dosyaları

[https://github.com/cefsharp/CefSharp](https://github.com/cefsharp/CefSharp)