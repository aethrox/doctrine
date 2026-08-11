---
title: Buradan Başla
description: Doctrine'ın ne işe yaradığını, skill sisteminin nasıl çalıştığını ve nereden başlayacağınızı öğrenin.
---

Doctrine, yapay zekâ ile çalışırken kullanabileceğiniz bir yazılım mühendisliği skill koleksiyonudur. Her skill, yerleşik bir uygulamayı veya adı belli bir standardı somut talimatlara, aşamalara ve tamamlanma kontrollerine çevirir.

Doctrine; yapay zekâ modelinizin, kodlama istemcinizin, kararlarınızın veya testlerin yerini almaz. Ajana belirli bir işi hangi disiplinle ele alacağını söyler.

## Doctrine neyi değiştirir?

İlgili bir skill yoksa ajan her görev için kendi çalışma biçimini seçebilir. Doctrine sayesinde bilinen bir disiplini adıyla isteyebilirsiniz:

- `grilling`, işe başlamadan önce önemli cevapsız soruları ortaya çıkarır.
- `research`, teknik iddiaları birincil kaynaklarla doğrular.
- `tdd`, önce başarısız bir test yazar, testi geçirir, ardından kodu iyileştirir.
- `diagnosing-bugs`, kodu değiştirmeden önce hatayı yeniden üretir.
- `code-review`, kişisel zevkler yerine kod sağlığına bakar.
- `repo-ship`, commit kayıtlarını amaçlarına göre ayırır.

Her görev için bütün skill listesini kullanmanız gerekmez. Duruma uyan en küçük grubu seçin.

## Kullanışlı bir zihinsel model

Doctrine'ı bir çalışma prosedürleri koleksiyonu gibi düşünebilirsiniz.

Yapay zekâ istemciniz çalışma alanını, konuşmayı, araçları ve izinleri sunar. Model isteğiniz üzerinde düşünür. Doctrine ise iş boyunca izlenecek disiplini getirir.

Skill, ajana dosya erişimi veremez, istemcide bulunmayan bir aracı çalıştıramaz ve onay gereksinimini ortadan kaldıramaz.

## Koddan önce kararla başlayın

Ajanınızdan bir şey geliştirmesini istemeden önce şu üç noktayı yazın:

1. **Sonuç:** İş tamamlandığında ne doğru olmalı?
2. **Kapsam dışı:** Neler eklenmeyecek?
3. **Kanıt:** Sonucu nasıl doğrulayacaksınız?

Örnek:

> Veriyi bu cihazda tutan, tarayıcı tabanlı bir karar günlüğü istiyorum. Hesap, backend, framework veya ücretli API gerektirmemeli. Bir kararı kaydedip sayfayı yenilediğimde hâlâ görebilirsem ilk parça tamamlanmış sayılacak. Engelleyici kararları bulmak için `grilling` kullan. Henüz geliştirmeye başlama.

Skill adını yazmak, onu açıkça çağırmak demektir. Bazı istemciler açıklamaya bakarak uygun skill'i kendileri seçebilir. Bunun nasıl çalıştığı istemciye bağlıdır.

## Güvenlik döngünüz

Her anlamlı değişiklikte:

1. Hedeflenen sonucu doğrulayın.
2. Hangi dosyaların değişebileceğini kontrol edin.
3. Oluşan diff'i inceleyin.
4. İlgili en küçük kontrolü veya testi çalıştırın.
5. Gerçek davranışı kendiniz doğrulayın.
6. Tek bir mantıksal değişikliği commit olarak kaydedin.

Kimlik bilgilerini konuşmaya yapıştırmayın ve Git deposuna göndermeyin. İzin isteklerini onaylamadan önce neye erişim verildiğini okuyun.

Sonraki adım: [Kurulum](../installation/) ve ardından [Temel Kavramlar](../core-concepts/).
