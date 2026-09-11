---
title: "C# DragDrop Kullanımı ve Örnek Uygulama"
published: 2018-12-16
description: "Bu yazıda kendi yazmış olduğum bir örnek uygulamadan ve DragDrop kullanımından bahsedeceğim. Bu uygulama öz olarak içinde bir çok event barındırmaktad"
tags: ["İçe Aktarıldı"]
category: "Genel"
draft: false
---

[![2018 12 16 14 16 05 Min - C# DragDrop Kullanımı ve Örnek Uygulama](/wp-images/2018_12_2018-12-16_14-16-05-min-696x394.png "DragDrop")](/wp-images/2018_12_2018-12-16_14-16-05-min.png)

Bu yazıda kendi yazmış olduğum bir örnek uygulamadan ve DragDrop kullanımından bahsedeceğim. Bu uygulama öz olarak içinde bir çok event barındırmaktadır. Bunların yanı sıra sql işlemlerini daha derinlemesine örnekler de bulundurmaktadır. Uygulamanın konusu bir adet bilgisayar oluşturma veya bu bilgisayarın bilgilerini update etmek. Bunların dışında içindeki donanımları da ekleme çıkarma yapmaktadır. Tabii bunları yaparken drag drop özelliğini kullanmaktayız. Bu örnekleri sizler çoğaltabilirsiniz.

Öncelikle kod yazmaya başlamadan önce projemizin iskeletini oluşturmamız gerekmektedir. Bu da tasarım demektir. Bunun için önceden düşünülmesi gerekir. Yoksa ilerde bir tasarım değişikliği veya çıkarma işlemi işinizi daha da uzatacaktır. Bu yüzden ben daha sade bir tasarım ile ilerledim.

![2018 12 16 13 47 43 Min - C# DragDrop Kullanımı ve Örnek Uygulama](/wp-images/2018_12_2018-12-16_13-47-43-min.png)

Burada olduğu gibi yatay olarak 3 bölüme ayırdım. Tepeye de bir adet toolstrip menüsü ekledim. Böylece yukarıdaki toolstrip üzerinden yeni bilgisayar oluşturma save update gibi işlemlerini yönetebileceğim. İlk groupbox bölümünde bilgilerin girileceği bölüm bulunmaktadır. İkinci alanda datagridview vardır. Burada listelenen bilgisayarlar gelmektedir. En altta ise bir adet search butonu ve textbox vardır. Buradan Computer Id ile aranılan bilgisayara ulaşılabilir.

![2018 12 16 13 47 57 Min - C# DragDrop Kullanımı ve Örnek Uygulama](/wp-images/2018_12_2018-12-16_13-47-57-min.png)

Bu kısım ise hardware ekleme alanıdır. Burada solda ana sabit listemiz bulunmaktadır. Bu liste db üzerinden gelir ve sabittir. Diğer liste ise bilgisayar üzerinde bulunan donanımları db üzerinde bir sp çalıştırarak getirmektedir. Eğer ekleme değil çıkarma işlemi yapacaksak da burada listeden tutup çöp kutusuna sürüklememiz yeterlidir.

**Not**: Burada dikkat edilmesi gereken nokta listelerin AllowDrop=True özellini yapmamız gerekir. Aksi takdirde seçmemize izin vermeyecektir.

## New&Save

Bu butona tıkladığımızda eğer  bir değişiklik var ise çalışacaktır. Yok ise uyarı verecektir. Yeni oluşturduğumuz bir kayıt durumunda save işlemi çalışır.   Computer ID ise sql üzerindeki MAX komutur ile çalışır. En son ID üzerinden +1 fazlasını ID olarak kabul eder.

SELECT MAX(ID)+1 FROM \[test\].\[dbo\].\[tbl\_computer\]

## DragDrop Event

Dragdrop özelliği için bazı eventleri kullanmamız gerekmektedir. Bu eventler sayesinde mouse tıklandığını veya sürüklendiğini algılıyoruz ve o durumda ne yapacağımızı belirliyoruz.

#region List1->List2

    private void listView1\_SelectedIndexChanged\_1(object sender, EventArgs e)
    {
        msj.changed = true;
        if (listView1.SelectedItems.Count > 0)
        {
            ListViewItem item2 = listView1.SelectedItems\[0\];
            string path = get\_image(out err, item2.Tag.ToString()).Rows\[0\]\["IMG\_PATH"\].ToString();
            pictureBox1.BackgroundImage = Image.FromFile(path);
        }
    }

    private void listView1\_MouseDown(object sender, MouseEventArgs e)
    {
        msj.changed = true;
        if (listView1.SelectedItems.Count > 0)
        {
            listView2.AllowDrop = true;
            panel1.AllowDrop = false;
            //ListViewItem lt = new ListViewItem();
            //lt.Text = listView1.SelectedItems\[0\].Text;
            //listView1.DoDragDrop(lt, DragDropEffects.Copy | DragDropEffects.Move);

            ListViewItem item2 = listView1.SelectedItems\[0\];
            //string selected\_device\_id = item2.Tag.ToString();
            msj.selected\_hardware\_name = item2.Text;
            msj.selected\_hardware\_id = item2.Tag.ToString();
            listView1.DoDragDrop(item2, DragDropEffects.Copy | DragDropEffects.Move);

        }

    }
    private void listView2\_DragEnter\_1(object sender, DragEventArgs e)
    {
        msj.changed = true;
        var obj = e.Data.GetData(e.Data.GetFormats()\[0\]);
        if (typeof(ListViewItem).IsAssignableFrom(obj.GetType()))
        {
            e.Effect = DragDropEffects.Copy;
        }
    }
    private void listView2\_DragDrop\_1(object sender, DragEventArgs e)
    {
        msj.changed = true;
        bool check = false;
        ListViewItem lt = new ListViewItem();
        lt.Tag = msj.selected\_hardware\_id;
        lt.Text = msj.selected\_hardware\_name;
        for (int i = 0; i < listView2.Items.Count; i++)
        {
            if (listView2.Items\[i\].Tag.ToString() == lt.Tag.ToString())
            {
                MessageBox.Show(listView2.Items\[i\].Text + " Still Exist ! ");
                check = true;
                break;
            }
        }

        if (!check)
        {
            listView2.Items.Insert(0, lt);
        }
    }

    #endregion

Eğer bir örnek verilmesi gerekirse, tıklandığında listenin seçilen indexinin tagi ve text ini seçip bir item içine aktarıyoruz. Mouse seçili halde sürükleniyorsa yani drag işlemi başladıysa bu itemi kopyalayıp move komutunu çalıştırıyoru. List2 üzerine geldiğ zaman drop özelliği devreye girer ve burada da list2 içine ekleme işlemi yapılmaktadır.

Yukarıdaki koddan da anlaşıldığı gibi dragrop işlemi bu kadardır. Delete işlemini ayıran tek nokta ise drop ettiğimiz anda list2 selecteditem silinmesi gerekmektedir. Başta karmaşık gibi bir yapı görünse de mantık olarak anlaşıldığında uygulaması kolaydır.

Yazıya ait kaynak kodları : [https://github.com/berkarat/Drag\_Drop\_Example-](https://github.com/berkarat/Drag_Drop_Example-)