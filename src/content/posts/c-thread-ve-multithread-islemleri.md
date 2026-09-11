---
title: "C# Thread  ve Multithread  İşlemleri"
published: 2018-10-15
description: "_📌 Güncelleme (Ağustos 2026): Thread kavramları hâlâ temel; modern .NET’te Task, async/await ve ThreadPool tercihleriyle ilgili uyarılar eklendi._"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![C Logo Min](/wp-images/2018_10_c-logo-min.jpg "c# logo")](/wp-images/2018_10_c-logo-min.jpg)

_📌 Güncelleme (Ağustos 2026): Thread kavramları hâlâ temel; modern .NET’te Task, async/await ve ThreadPool tercihleriyle ilgili uyarılar eklendi._

Bu yazımızda programlamanın en temel konularından biri olan Thread konusundan bahsedeceğim. İş parçacıkları olarak da bilinir ve projelerde olmazsa olmaz terimler arasındadır.

İş parçacıkları tek başına kullanıldığı gibi çoklu yani multithreading olarak da kullanılır. Genel kullanımı bu şekildedir. Bunun amacı da eş zamanlı olarak -paralel – yapılması istenilen işlemlerde kullanılmaktadır.

Örneğin saati gösteren bir uygulamada aynı zamanda başka bir işlem de yapması gerekebilir. Bu durumda iş parçacıkları kullanılır ve ikisi de birbirinden bağımsız olarak işlemiş olurlar.

**2026 notu:** Thread sınıfı hâlâ kullanılabilir; ancak yeni .NET uygulamalarında çoğu senaryoda Task, async/await, ThreadPool ve CancellationToken daha güvenli ve yönetilebilir çözümler sunar.

n

## Threadlerde Öncelik (Thread Priority)

Eşzamanlı olarak çalışabilen iş parçacıkları olduğunu söylemiştim. Ancak bazı durumlarda öncelik değişebilmektedir. Aynı anda başlatılan iki parçacığın kullanımında birisini önce başlatabiliriz. **Thread.Priority** özelliği ile bunu yapabiliriz

_Highest, AboveNormal, Normal, BelowNormal, Lowest_ gibi türleri vardır.

thread\_1.Priority = ThreadPriority.Normal;

## Thread.Join İşlemi

Thread işleminde bazı durumların da birbirini beklemesi gerekmektedir. Bu durumlarda join işlemini uyguluyoruz. Böylece bir önceki iş bitmeden diğerine geçiş yapılmamış oluyor. Ayrıca bu metodun belirlenen bir süre kadar işlem yapılması gibi overload özellikleri de bulunur.

### İş parçacıkları için bazı genel kullanılan özellikler şunlardır

-   **IsAlive :** Bu özellik iş parçacıklarının durumunu sorgulamaya yarar. Dönüş olarak bool değer tipi döner. Fakat Thread.ThreadState değerinden farklı olarak true veya false değer döner.
-   **ThreadState:**  Bu özellik ise durumu çalışıyor, iptal edildi, beklemede gibi daha detaylı özelliklerine ayırmamıza yarar.
-   **Suspend:**  Eski örneklerde görülebilir; modern .NET’te Thread.Suspend desteklenmez/önerilmez. Bunun yerine CancellationToken, lock/semaphore ve kontrollü bekleme mekanizmaları kullanılmalıdır.

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Threading;

namespace ThreadExample
{
    public partial class Form1 : Form
    {
        Thread      thread\_1,
                    thread\_2,
                    thread\_3,
                    thread\_4,
                    thread\_5;

        System.Windows.Forms.Timer timer = new System.Windows.Forms.Timer ();
        string Thread\_State;
        public Form1 ()
        {
            InitializeComponent ();
            thread\_1=new Thread (new ThreadStart (t\_1));
            thread\_2=new Thread (new ThreadStart (t\_2));
            thread\_3=new Thread (new ThreadStart (t\_3));
            thread\_4=new Thread (new ThreadStart (t\_4));
            thread\_5=new Thread (new ThreadStart (t\_5));

            Control.CheckForIllegalCrossThreadCalls=false;       // THREAD ÇAKIŞMASINI ENGELLER
            timer.Tick+=new EventHandler (Timer\_Tick);
            timer.Interval=(1000); timer.Start ();
            timer.Enabled=true;

        }

        private void button1\_Click (object sender, EventArgs e)
        {
            try
            {
                thread\_1.Start ();
                //thread\_1.Abort () ;  // Thread İptal İşlemi
                Thread\_State=thread\_1.ThreadState.ToString ();
                Thread\_State=thread\_1.IsAlive.ToString ();
                thread\_1.Join ();
                //thread\_1.Join (300);   //300 ms kadar işlem yapar
                Console.WriteLine ("thread\_1 bitti");
                label1.Text="thread\_1 bitti";
                Thread.Sleep (2000);
                //thread\_2.Start ();
                //thread\_2.Join ();
                label1.Text="thread\_2 bitti";
                Console.WriteLine ("thread\_2 bitti");
                thread\_3.Start ();
                thread\_4.Start ();

            }
            catch (Exception ex)
            {

                MessageBox.Show (ex.Message);
            }

        }

        private void t\_1 ()
        {
            thread\_5.Start ();

            for (int i = 0; i<=100; i++)
            {
                progressBar1.Value=i;
                Thread.Sleep (20);

            }

        }
        private void t\_2 ()
        {
            for (int i = 0; i<=100; i++)
            {
                //  trackBar1.Value=i;
                progressBar2.Value=i;
                Thread.Sleep (20);

            }

        }
        private void t\_3 ()
        {
            for (int i = 100; i>=0; i--)
            {
                //  trackBar1.Value=i;
                progressBar3.Value=i;
                Thread.Sleep (20);

            }
        }
        private void t\_4 ()
        {

            for (int i = 0; i<=10; i++)
            {
                trackBar1.Value=i;

                Thread.Sleep (200);

            }

        }
        private void t\_5 ()
        {

            for (int i = 0; i<=100; i++)
            {
                listBox1.Items.Add (i);

                Thread.Sleep (30);

            }

        }
        private void Timer\_Tick (object sender, EventArgs e)
        {
            label2.Text=DateTime.Now.ToString ();
        }

    }
}

![Berkarat.com Form - C# Thread ve Multithread İşlemleri](/wp-images/2018_10_berkarat.com-Form-300x239.png)

Bu örnekte konuyla alakalı örnekleri yaptım. Burada uygulama alanları, nasıl kullanıldıkları, paralel işlem yapmaları gibi noktalara vurgu yapıldı.

Örneğin tanımlı iş parçacıklarına paralel olarak arka planda çalışan bir de timer bulunmakta.

” Control.CheckForIllegalCrossThreadCalls=false ” komutu örneği basitleştirmek için kullanılmıştır. Gerçek uygulamalarda UI kontrollerine farklı threadlerden doğrudan erişmek yerine Invoke/BeginInvoke veya async/await desenleri tercih edilmelidir.

Programın Linki : [https://github.com/berkarat/Threading.git](https://github.com/berkarat/Threading.git)