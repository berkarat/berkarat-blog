---
title: "C# Veritabanı İşlemleri-1"
published: 2018-11-01
description: "Bu yazımızda daha [önceki yazılarımda](https://blog.berkarat.com/stored-procedure-islemleri/)  bahsettiğim Stored Procedure işlemlerini C ortamında ku"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![C Logo - C# QrCode Generator Uygulaması (Logo eklenebilir)](/wp-images/2018_10_c-logo-696x748.png "c# logo")](/wp-images/2018_10_c-logo.png)

Bu yazımızda daha [önceki yazılarımda](https://blog.berkarat.com/stored-procedure-islemleri/)  bahsettiğim Stored Procedure işlemlerini C# ortamında kullanımından bahsedeceğim. Bu işlemleri örneklerle devam ederek anlatacağım.

Bu işlemlere başlamadan önce veritabanına bağlantı yapmamız gerekmektedir. Bu işlemler için bir db connection işlemi yapmamız gerekiyor.  Aşağıda verdiğim linkte bir çok sql bağlantı stringlerini bulabilirsiniz.

[https://www.connectionstrings.com/sql-server/](https://www.connectionstrings.com/sql-server/)

Data Source=berk;Initial Catalog=berkaratcom;Persist Security Info=False;User ID=berkaratsite;Password=123456

Bu connection string kullanımını register üzerinden yapacağız bunun için Bilgisayar\\HKEY\_LOCAL\_MACHINE\\SOFTWARE yoluna gidiyoruz. Burada Yenil>Anahtar diyerek bir alan oluşturuyoruz daha sonra bu anahtarın üzerine gelerek sağ tıklıyoruz ve  Yeni>Dize değeri diyerek stringimizi oluşturuyoruz. Bu string değere yukarıda verdiğim connection stringi yazıyoruz.

public static SqlConnection sqldbsconnect ()
{
    var hklm = RegistryKey.OpenBaseKey (RegistryHive.LocalMachine, RegistryView.Registry64);
    // System 64 üzerinden çalışıyor !! 
    var key = hklm.OpenSubKey (@"SOFTWARE\\berkarat\\sql");

    //  string constring = Settings.Default.dbconnection.ToString ();
    string constring = key.GetValue ("dbconnection").ToString ();
    SqlConnection con = new SqlConnection (constring);
    try
    {
        con.Open ();
    }
    catch (Exception)
    {
         MessageBox.Show(" Server Bağlantı Sorunu ", "UYARI", MessageBoxButtons.OK);
        //EventLogaYaz.HataMesajiYaz(ex, 0);
    }

    return con;
}

Buradaki C# örneği sqlconnection işlemini yapmamıza yarayan metodu göstermektedir. KEY ile register üzerinden sql sorgumuzu çağırıyoruz. Bunun bize avantajı eğer bu programı farklı bir veritabanında uygulamak isterseniz yapmanız gereken tek şey register üzerinden bilgileri değiştirmek. Daha sonrasında da bildiğimiz connection açma işlemleri

## C# ile Stored Procedure Select

Bu bölümde Stored procedure kullanacağız ve C# üzerinden select işlemini yapacağız. Yukarıda  bahsettiğim sqlconnection fonksiyonunu kullanarak bağlantıyı oluşturuyoruz. Ardından sql comand oluşturuyoruz ve tipini belirliyoruz. Daha sonra bu işlemleri DataTable’a aktaracağımız için Datatable olarak return dönüşü yapıyoruz.

public static DataTable sp\_select (string sp\_name, out string \_error)
 {
     DataTable ds = new DataTable ();
     \_error=null;
     try
     {
         using (SqlConnection con = sqldbsconnect ())
         {
             if (con.State.ToString ()=="Open")
             {
                 SqlCommand sqlComm = new SqlCommand (sp\_name, con);
                 sqlComm.CommandType=CommandType.StoredProcedure;
                 SqlDataAdapter da = new SqlDataAdapter ();
                 da.SelectCommand=sqlComm;
                 da.Fill (ds);
             }
             else
             {
                 \_error="DB SERVER CONNECTION = "+con.State.ToString ();
             }
         }
     }
     catch (Exception ex)
     {
         \_error=ex.ToString ();
     }
     return ds;
 }

Burada \_error ise out tipinde tanımlamış olan string değer bizim işlemimiz eğer bir hata oluşursa dönüş mesajını görünteleyecektir. Eğer istenilirse bu mesajlar Log olarak da tutulabilir.