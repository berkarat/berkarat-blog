---
title: "C# Veritabanı İşlemleri-2"
published: 2018-11-03
description: "Bu yazımızda Stored Procedure işlemlerine ve sql sorgularına devam edeceğiz. Önceki yazımızın devamı niteliğindedir."
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![C Logo - C# QrCode Generator Uygulaması (Logo eklenebilir)](/wp-images/2018_10_c-logo-696x748.png "c# logo")](/wp-images/2018_10_c-logo.png)

Bu yazımızda Stored Procedure işlemlerine ve sql sorgularına devam edeceğiz. Önceki yazımızın devamı niteliğindedir.

Bu yüzden registerdan bilgileri nasıl çektiğimiz veya sp nasıl oluşturduğumuz gibi temek konuların üzerinde tekrar durmayacağım.

Bu yazıda Stored procedure ile Insert, Update, Delete işlemlerini C# kullanacağız ve proje olarak sayfanın sonunda paylaşacağım.

Insert işlemi ile birlikte veritabanımıza gerekli olan bilgileri eklememize olanak sağlar. Bu bilgileri C# ortamından alıp  veritabanına sorgu göndererek yapabiliriz. Bu klasik bir yöntem olarak görülmektedir. Ancak her Insert işlemi için sorgu çalıştırmamız gerekirse bu durum yazdığımız prograrım şişmesine yol açar. Bunun yerine SQL Server üzerinde bir tane insert Stored Procedure yazmıştık önceki yazımızda. Şimdi bu spye parametreleri vererek insert işlemini gerçekleştireceğiz.

Aynı durumlar Update işlemi için de gerekli. Burada update edeceğimiz bilgilerin de parametrelerini vererek eğer var ise güncelleme işlemini yapacağız.

Diğer işlemimiz ise Delete işlemi burda da eğer var ise istenilen kişinin veya ID üzerinden belirlediğimiz bir satırı sileceğiz. Aynı zamanda bu satır silme işlemi yapılırken sadece satırdaki bilgiler silinmektedir. Indexleri de silmek için Truncate komutu kullanılmaktadır.Aşağıdaki komut tablodaki bilgileri tamamen siler. Delete işlemine göre daha etkilidir. Tamamen geri dönüş olmayacak şekilde siler. Tıpkı delete işleminde olduğu gibi truncate komutuna da where komutu kullanılarak bazı şartlar getirilerek istenilen bilginin silnmesi sağlanabilmektedir.

TRUNCATE TABLE Tablo\_Adı;

Bu işlemlerle beraber örnek gösterdiğimiz stored procedure işlemlerinin C# tarafını da tamamlamış olacağız.

## C# ile Stored Procedure Insert

Burada ad,soyad,şifre,mail,yaş gibi parametreleri textbox üzerinden girdiğimiz bu bilgileri veri tabanına yazan fonksiyonu göreceğiz. Bu fonksiyon parametrelerin alıp bool tipinde dönüş yapmaktadır. İlk adım olarak kontrol etmemiz gereken bu kullanıcının daha önce sistemde kayıtlı olup olmadığıdır. İlk adım olarak mail durumunu tablodan kontrol ederek duplicate işlem olmasının önüne geçiyoruz daha sonra stored procedure kullanarak işlemi tamamlayacağız. Parametreleri addwithValue komutuyla parametreleri ekliyoruz ve sp çalıştırıyoruz.

public static bool sp\_insert (string sp\_name, string ad, string soyad, string parola, int yas, string email, out string \_error)

{
    DataSet ds = new DataSet ();

    \_error=null;

    bool xs = true;

    ds=check ();

    List<string> l = new List<string> ();

    foreach (DataRow item in ds.Tables\[0\].Rows)

    {

        //     l.Add (item\["ad"\].ToString ());

        if (item\["email"\].ToString ()==email)

        {

            xs=false;

        }

    }

    try

    {
        using (SqlConnection con = sqldbsconnect ())

        {
            if (con.State.ToString ()=="Open"&&xs==true)

          {

                SqlCommand sqlComm = new SqlCommand (sp\_name, con);

                sqlComm.Parameters.AddWithValue ("ad", ad);

                sqlComm.Parameters.AddWithValue ("soyad", soyad);

                sqlComm.Parameters.AddWithValue ("yas", yas);

                sqlComm.Parameters.AddWithValue ("password", parola);

                sqlComm.Parameters.AddWithValue ("email", email);

                sqlComm.CommandType=CommandType.StoredProcedure;

                SqlDataAdapter da = new SqlDataAdapter ();

                da.SelectCommand=sqlComm;

                da.Fill (ds);

                return true;

            }

            else

            {

                if (xs==false)

                {

                    \_error="KULLANICI ZATEN KAYITLI ";

                    return false;

                }

                \_error="DB SERVER CONNECTION = "+con.State.ToString ();

                return false;

            }

        }

 

    }

    catch (Exception ex)

    {

        if (xs==false)

        {

            \_error="KULLANICI ZATEN KAYITLI ";

        }

        \_error=ex.ToString ();

        return false;

 

    }

 

}

Eğer değerimiz true yani başarılı dönmüşse sp\_select fonksiyonu ile datagridviewin içeriğini doluruyoruz.

private void button2\_Click (object sender, EventArgs e)
       {
           if (db.sp\_insert ("sp\_insert", textBox1.Text, textBox2.Text, textBox4.Text, Convert.ToInt32 (textBox3.Text), textBox5.Text, out \_err))
           {
               dataGridView1.DataSource=db.sp\_select ("sp\_select\_uye", out \_err);

           }
           else
           {
               MessageBox.Show ("INSERT SUCCESS");
           }
       }

## C# ile Stored Procedure Update

Bu bölümde de update işleminden bahsedeceğim. Senaryomuzu şifresini değiştirmek isteyen bir kullanıcı üzerinden düşünelim. Sistemin ilk yapması gereken kullanıcının kim olduğunu bulmak. Burada da ad soyad ve mail kullanarak kullanıcının kim olduğunu buluyoruz. Diğer adım olarak da kullanıcının yeni parolasını alıyoruz ve eski parolasının yerine SET ediyoruz. Bu set etme işlemini sp kullanarak yapıyoruz.

public static bool sp\_update (string sp\_name, string ad, string soyad, string parola, string email, string newpassw, out string \_error)

{
    DataSet ds = new DataSet ();

    \_error=null;

    bool xs = true;

 

    ds=check ();

    List<string> l = new List<string> ();

    foreach (DataRow item in ds.Tables\[0\].Rows)

    {

        //     l.Add (item\["ad"\].ToString ());

        if (item\["email"\].ToString ()==email)

        {
            xs=false;
        }

    }

    if (!xs)

    {

        try

        {

            using (SqlConnection con = sqldbsconnect ())

            {

                if (con.State.ToString ()=="Open"&&xs==false)

                {

                    SqlCommand sqlComm = new SqlCommand (sp\_name, con);

                    sqlComm.Parameters.AddWithValue ("ad", ad);

                    sqlComm.Parameters.AddWithValue ("soyad", soyad);

                    sqlComm.Parameters.AddWithValue ("password", parola);

                    sqlComm.Parameters.AddWithValue ("email", email);

                    sqlComm.Parameters.AddWithValue ("newpassword", newpassw);

 

                    sqlComm.CommandType=CommandType.StoredProcedure;

                    SqlDataAdapter da = new SqlDataAdapter ();

                    da.SelectCommand=sqlComm;

 

                    da.Fill (ds);

                    return true;

                }

                else

                {

                    \_error="DB SERVER CONNECTION = "+con.State.ToString ();

                    return false;

                }

            }
        }

        catch (Exception ex)

        {

            return false;

        }

    }

    else

    {
        \_error="KULLANICI  YOK !  ";
        return false;

    }

 

 

}

Eğer işlem başarılı ise ekranda gösteriyoruz.

private void button3\_Click (object sender, EventArgs e)
       {
           if (db.sp\_update ("sp\_update", textBox1.Text, textBox2.Text, textBox4.Text, textBox5.Text, textBox6.Text, out \_err))

           {
                MessageBox.Show ("UPDATE SUCCESS");
               dataGridView1.DataSource=db.sp\_select ("sp\_select\_uye", out \_err);
           }

           else
           {
               MessageBox.Show ("UPDATE FAIL!");
           }
       }

## C# ile Stored Procedure Delete

Tıpkı Update işlemine benzer şekilde çalışmaktadır. Yapmamız gereken silinmek istenen kişilerin bilgilerini alıyoruz eğer sistemde böyle birisi var ise sistemden bilgilerini siliyoruz

public static bool sp\_delete (string sp\_name, string ad, string soyad, string email, out string \_error)

  {
      DataSet ds = new DataSet ();

      \_error=null;

      bool xs = true;

      ds=check ();

      List<string> l = new List<string> ();

      foreach (DataRow item in ds.Tables\[0\].Rows)

      {

         //     l.Add (item\["ad"\].ToString ());

          if (item\["email"\].ToString ()==email)

          {

              xs=false;

          }

      }

      if (!xs)

      {

          try

          {

              using (SqlConnection con = sqldbsconnect ())

              {

                  if (con.State.ToString ()=="Open"&&xs==false)

                  {

                      SqlCommand sqlComm = new SqlCommand (sp\_name, con);

                      sqlComm.Parameters.AddWithValue ("ad", ad);

                      sqlComm.Parameters.AddWithValue ("soyad", soyad);

                      sqlComm.Parameters.AddWithValue ("email", email);

                      sqlComm.CommandType=CommandType.StoredProcedure;

                      SqlDataAdapter da = new SqlDataAdapter ();

                      da.SelectCommand=sqlComm;

 

                      da.Fill (ds);

                      return true;

                  }

                  else

                  {
                      \_error="DB SERVER CONNECTION = "+con.State.ToString ();

                      return false;

                  }
              }

          }

          catch (Exception ex)

          {
              return false;

          }
      }

      else

      {
          \_error="KULLANICI  YOK !  ";
          return false;

      }

 

 

  }

### Projenin kaynak dosyaları :

[GitHub](https://github.com/berkarat/stored_procedure-example)