---
title: "C# XML Serialize ve Deserialize İşlemleri"
published: 2018-12-23
description: "Merhaba bu yazıda Serialize ve deserialize işlelerii hakkında kısa bir bilgi vereceğim. Xml (eXtensible Markup Language) anlamına gelmektedir. İnsan v"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![93659 Adobe 512X512 Min - C# XML Serialize ve Deserialize İşlemleri](/wp-images/2018_12_93659_adobe_512x512-min.png "xml")](/wp-images/2018_12_93659_adobe_512x512-min.png)

Merhaba bu yazıda Serialize ve deserialize işlelerii hakkında kısa bir bilgi vereceğim. Xml (eXtensible Markup Language) anlamına gelmektedir. İnsan ve bilgisayarın anlaşabilmesi açısından oluşturulmuş bir dildir.

Kök ve yaprak olarak dallanan bir ağaç yapısından oluşmaktadır. Bu standartlaşma sebebiyle web sitelerinden kaynak almak da kolaylaşmıştır.

Bu link üzerinden Merkez bankasından anlık kur bilgilerini çekebilmekteyiz.

[http://www.tcmb.gov.tr/kurlar/201401/03012014.xml](http://www.tcmb.gov.tr/kurlar/201401/03012014.xml)

Bir çok projelerde haberleşme yapısı olarak kullanılmaktadır. Daha önceki MSMQ yazılarımda bahsettiğim haberleşme şekli de xml olarak kullanılmaktadır. Kendisine rakip olarak json dili çıksa da yine de bir çok alanda sıklıkla karşımıza çıkmaktadır. Bu sebeple oluşturma serialize ve deserialize işlemlerinin üzerinde duracağım.

## Class Oluşturma

Öncelikle yapmamız gereken bir class oluşturmak ve bu class üzerinden obje oluşturacağız. Ardından bu objeye database üzerinden bilgileri ekleyeceğiz. Oluşan objeyi xml e çevirme işlemini gerçekleştireceğiz. Ardından işlemi tersine uygulayarak dosyaları obje türüne çevirme işlemini yapıp örneklerimizi tamamlayacağız.

public class Product
  {
      public int ID { get; set; }
      public string Type { get; set; }
      public ProductDetails\[\] ProductDetay { get; set; }
  }
  public class ProductDetails
  {
      public string ProductSerialNumber { get; set; }
      public string ProductName { get; set; }
  }

Burada   2 adet  class bulunmaktadır. İç içe gömülmüş olarak kullanacağız. Product classı en tepede ve geneldir. Product Details classı ise altındaki ve detaylandırdığımız class olacaktır.

Bilgileri database üzerinden almak için aşağıdaki metodu kullanmaktayız.

public DataTable Get\_Datas()
    {
        try
        {
            SqlConnection sqlcon = new SqlConnection("Server=DESKTOP-U34S2C6; Database=test; User Id=berk;Password = 123456; ");
            sqlcon.Open();
            SqlCommand \_cmd = new SqlCommand(@"SELECT TOP 1000 \[ID\] ,\[NAME\] ,\[TYPE\]  FROM \[test\].\[dbo\].\[tbl\_hardware\]", sqlcon);
            SqlDataAdapter dap = new SqlDataAdapter(\_cmd);
            DataTable dt = new DataTable();
            dap.Fill(dt);
            return dt;
        }
        catch (Exception)
        {
            return null;
        }
    }

## Bilgileri Objeye Aktarma

Burada bilgileri class içerisine aktaracağız. Bu işlemi de elle yapmayacağız. Önceki yazım olan [Drag&Drop Kullanımı](https://blog.berkarat.com/dragdrop-kullanimi/)nda kullandığım database üzerinden işlemler yapacağım. Buradaki  hardware bilgilerini objeye aktaracağım ardından da bu objeyi dönüştüreceğim.

public Product test(DataTable dt)
    {
        prd = new Product();
        prd.ProductDetay = new ProductDetails\[dt.Rows.Count\];
        Random rnd = new Random();
        prd.ID = rnd.Next();
        prd.Type = "Hardware";

        for (int i = 0; i < dt.Rows.Count; i++)
        {
            ProductDetails de = new ProductDetails();
            de.ProductName = dt.Rows\[i\]\["NAME"\].ToString();
            de.ProductSerialNumber = dt.Rows\[i\]\["TYPE"\].ToString();
            prd.ProductDetay\[i\] = de;
        }
        return prd;
    }

## XML Serialize

İşlemleri yapabilmek için aşağıdaki kütüphaneleri eklememiz gerekmektedir.

using System.Xml;
using System.Xml.Serialization;

Bir tane XmlSerializer nesnesi tanımlıyoruz. Daha sonra using bloğu içerisinde XmlWriter nesnesi ile birlikte objemizi ekleyerek seriliaze işlemi gerçekleştiriyoruz. Artık objemiz xml formatına gelmiş durumdadır.

public string XMLCreator()
    {
        XmlSerializer XML = new XmlSerializer(typeof(Product));
        using (var StringWriter = new StringWriter())
        {
            using (XmlWriter writer = XmlWriter.Create(StringWriter))
            {
                XML.Serialize(writer, prd);
                return StringWriter.ToString();
            }
        }
    }

## XML Deserialize

Burada ise oluşturduğumuz dosya içerisindeki bilgileri classımıza aktaracağız. Bu sefer TextReader ile dosyayı okuyor ve nesneye aktarıyoruz. Deserialize işlemini gerçejkeştiriyoruz.

public void XMLDeserialize(string xml)
   {
       XmlSerializer serializer = new XmlSerializer(typeof(Product));
       using (TextReader reader = new StringReader(xml))
       {
           Product result = (Product)serializer.Deserialize(reader);
       }
   }

## String Search

Bu metod sayesinde dosya içerisinde string olarak arama yapabilmekteyiz. Böylece deserialize  işlemine gerek kalmadan hızlıca  içerisindeki bilgiye kavuşabilmekteyiz. Ancak bu kısa süreli çözüm olsa da pek kullanışlı değildir. Birden fazla aynı string olduğu durumlarda sadece bir tane değer döndüğünden karışma durumu olabilir.

public string\[\] xml\_parser(string xmlmessage)
       {
           string\[\] foundvalue;

           if (xmlmessage != null)
           {
               string \_ProductName = "<ProductSerialNumber>";
               int\[,\] foundindex = new int\[3, 2\];
               foundvalue = new string\[3\];
               #region parse xml message
               if (xmlmessage.Length > 0) xmlmessage = xmlmessage.Replace("&lt;", "<");
               if (xmlmessage.Length > 0) xmlmessage = xmlmessage.Replace("&gt;", ">");

               //ProductSerialNumber
               foundindex\[0, 0\] = xmlmessage.IndexOf(\_ProductName) + \_ProductName.Length;
               foundindex\[0, 1\] = xmlmessage.IndexOf("</ProductSerialNumber>");
               if (foundindex\[0, 1\] != -1) foundvalue\[0\] = xmlmessage.Substring(foundindex\[0, 0\], foundindex\[0, 1\] - foundindex\[0, 0\]);
               #endregion
               return foundvalue;
           }
           else
           {
               return null;
           }
       }

Yazıya ait kaynak kodları : [https://github.com/berkarat/xml\_example](https://github.com/berkarat/xml_example)