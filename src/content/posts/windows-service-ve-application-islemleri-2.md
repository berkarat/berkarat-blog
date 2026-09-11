---
title: "Windows Service ve Application İşlemleri – 2"
published: 2019-01-08
description: "Bu yazımız da devam niteliğinde bir yazıdır. [Windows Service ve Application İşlemleri](https://blog.berkarat.com/windows-islemleri/) yazısının devamı"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![App Min - Windows Service ve Application İşlemleri](/wp-images/2019_01_app-min.png "application")](/wp-images/2019_01_app-min.png)

Bu yazımız da devam niteliğinde bir yazıdır. [Windows Service ve Application İşlemleri](https://blog.berkarat.com/windows-islemleri/) yazısının devamıdır. İlk yazıda Windows applicationlar üzerinden start stop restart ve status işlemlerini anlatmıştım. Bu yazıda ise Windows service üzerinde bu işlemleri yapacağız. Servisler uygulamalar gibi benzer şekilde çalışmaktadır.  Bu işlemler için önce bir Ws adında bir class oluşturuyoruz. Metodlarımızı bu class üzerinden ilerleyeceğiz.

## Service Start

Bu metodda sadece servis adı gerekli. İlk önce çalıştırmak istediğimiz metodun durumuna bakıyoruz. Bu işlem için ServiceController classından yararlanıyoruz. Bu classa ulaşabilmemiz için ise System.ServiceProcess sınıfına erişmemiz gerekmektedir. References üzerinden System.ServiceProcess referans olarak ekliyoruz.

using System.ServiceProcess;

Daha sonra servis var mı diye kontrol etmemiz gerekmektedir. Bu işlemi de ManagementObjectSearcher nesnesi ile yapabiliyoruz. Bu class içinde aşağıdaki sınıfı referans olarak eklemeliyiz.

using System.Management;

Daha sonra buradan system32 içerisinde bir sorgu yolluyoruz. Eğer servis bilgileri var ise devam ediyoruz. Bu bilgilerde servis çalışıp çalışmadığı da bulunmaktadır. Eğer çalışıyor ise zaten start komutu çalışmayıp sadcee mesaj dönecektir. Çalışmıyor ise de  ServiceController service olarak oluşturulan nesne ile start() metodunu çalıştırıyoruz ve servisimiz çalışıyor.

try
               {
                   ServiceControl(servicename);
                   service.Refresh();
                   if (service.Status != ServiceControllerStatus.Running)
                   {
                       Console.WriteLine(servicename.ToString() + "  Service Starting....");                  
                       service.Start();
                       Thread.Sleep(200);
                       int i = 0;
                       while (service.Status != ServiceControllerStatus.Running)
                       {
                           service.Refresh();
                           Thread.Sleep(1000);
                           i++;
                           if (i >= RestartTimeout / 100)
                           {
                               break;
                           }
                       }
                       service.Refresh();
                       Console.WriteLine("Service Status  " + service.Status.ToString());
                   }
                   else
                   {
                       // already service started
                       Console.WriteLine("Service Status  " + service.Status.ToString());                
                   }
               }
               catch (Exception Ex)
               {
                   Console.WriteLine(Ex);
               }

## Service Stop

Yukarıdaki işlemler gibi servisin çalışıp çalışmadığına bakıyoruz. Ardından eğer çalışmıyor ise service.Stop() metodu ile servisi durdurabiliyoruz. Eğer servis otomatik olarak çalışmaya ayarlandıysa kapatma işlemi bazen yapılamadığı oluyor. Bu yüzden servisin kapatılıp kapanmadığını kontrol etmemiz gerekmektedir.

try
        {
            ServiceControl(servicename);
            if (service.Status != ServiceControllerStatus.Stopped)
            {
                Console.WriteLine(servicename.ToString() + "  Service Stoping....");
                service.Stop();
                int i = 0;
                while (service.Status != ServiceControllerStatus.Stopped)
                {
                    service.Refresh();
                    Thread.Sleep(1000);
                    i++;
                    if (i >= RestartTimeout / 100)
                    {
                             break;
                    }
                }
                Console.WriteLine("Service Status  " + service.Status.ToString());
       }
            else
            {
                Console.WriteLine(servicename.ToString() + "Service Already STOP");                
                // already service stop
            }
        }
        catch (Exception ex)
        {                   
            Console.WriteLine(ex.Message.ToString());
        }

## Service Restart

Restart işlemi için önce servisin durumuna bakıyoruz eğer çalışıyorsa stop işlemini uyguluyoruz.Ardından start metodunu çalıştırıyoruz. Böylece restart işlemini yapmış bulunuyoruz.

## Service Status

Yazının bana göre en önemli adımı burasıdır. Çünkü bir servise müdahale etmek sistemde bozulamalara yol açabilmektedir. Sisteme bağlı servisleri kimse kapatmak istemez. Bu yüzden servislerinin açıklamaları, başlama tipleri, açık kapalı gibi bilgilerin bulunduğu bir mesaj görmek ardından isteğe göre işlem yapmak isteriz. Bu yüzden GetServiceStatus adında bir class oluşturuyoruz. Bu class içerisine istediğimiz bilgileri doldurup döndüreceğiz.

ManagementObjectCollection services = query.Get();

Bu metod ile birlikte services nesnesi içerisine bu pathname, servistipi, start tipi, durumu, açıklaması gibi bilgiler dolacaktır. Bundan sonrasında bu nesneyi class içerisine pars etmek kalıyor. Böylece status bilgilerine ulaşmış oluyoruz.

class GetServiceStatus
    {
        private static string wsserviceName;
        public static string ServiceDescription { get; set; }
        public static string PathName { get; set; }
        public static string ServiceType { get; set; }
        public static string StartMode { get; set; }
        public static string State { get; set; }
        public string ServiceName
        {
            set
            {
                wsserviceName = value;
            }
        }
        public static void GetWindowsServiceStatus()
        {
            if (wsserviceName != null)
            {
                GetServiceStartMode(wsserviceName);
            }
        }
        private static void GetServiceStartMode(string serviceName)
        {
            string filter = String.Format("SELECT \* FROM Win32\_Service WHERE Name = '{0}'", serviceName);
            ManagementObjectSearcher query = new ManagementObjectSearcher(filter);
            if (query != null)
            {
                try
                {
                    ManagementObjectCollection services = query.Get();
                    foreach (ManagementObject service in services)
                    {
                        DateTime now = DateTime.Now;
                        PathName = service.GetPropertyValue("PathName").ToString();
                        ServiceType = service.GetPropertyValue("ServiceType").ToString();
                        StartMode = service.GetPropertyValue("StartMode").ToString();
                        State = service.GetPropertyValue("State").ToString();
                        ServiceDescription = "None";
                        if (service.GetPropertyValue("Description") != null) ServiceDescription = service.GetPropertyValue("Description").ToString();
                    }
                }
                catch (Exception ex)
                {
                }
            }
        }
    }

Konu ile ilgili kaynak kodları buradadır.

[https://github.com/berkarat/Windows-app-service-Process](https://github.com/berkarat/Windows-app-service-Process)