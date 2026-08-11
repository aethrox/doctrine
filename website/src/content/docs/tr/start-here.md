---
title: Buradan Başla
description: Doctrine'ın neyi değiştirdiğini, skill sisteminin nasıl çalıştığını ve güvenli biçimde nasıl başlayacağınızı öğrenin.
---

Doctrine, yapay zekâ destekli çalışma için yazılım mühendisliği skill koleksiyonudur. Her skill, yerleşik bir uygulamayı veya adlandırılmış standardı somut talimatlara, aşamalara ve tamamlanma kontrollerine dönüştürür.

Doctrine; yapay zekâ modelinizin, kodlama istemcinizin, kararlarınızın veya testlerin yerine geçmez. Ajanın belirli bir işi disiplinli biçimde ele almasını sağlar.

## Doctrine neyi değiştirir?

İlgili bir skill olmadan ajan her görevde kendi sürecini seçebilir. Doctrine ile bilinen bir disiplini açıkça isteyebilirsiniz:

- `grilling`, işe başlamadan önce önemli cevapsız kararları kapatır.
- `research`, teknik iddiaları birincil kaynaklarla doğrular.
- `tdd`, davranışları kırmızı, yeşil ve düzenleme döngüsüyle geliştirir.
- `diagnosing-bugs`, kodu değiştirmeden önce hatayı yeniden üretir.
- `code-review`, kişisel tercihi değil kod sağlığını inceler.
- `repo-ship`, commit kayıtlarını amaçlarına göre ayırır.

Her görevde bütün skill listesini kullanmanız gerekmez. Duruma uyan en küçük grubu seçin.

## Kullanışlı bir zihinsel model

Doctrine'ı işletim prosedürleri koleksiyonu gibi düşünün.

Yapay zekâ istemciniz çalışma alanını, konuşmayı, araçları ve izinleri sağlar. Model isteğiniz hakkında akıl yürütür. Doctrine, iş yapılırken uygulanacak disiplini sağlar.

Bir skill dosya erişimi veremez, istemcide bulunmayan bir aracı çalıştıramaz ve onay gereksinimini ortadan kaldıramaz.

## Koddan önce kararla başlayın

Ajandan bir şey geliştirmesini istemeden önce üç noktayı yazın:

1. **Sonuç:** İş tamamlandığında ne doğru olmalı?
2. **Kapsam dışı:** Neler eklenmemeli?
3. **Kanıt:** Sonucu nasıl doğrulayacaksınız?

Örnek:

> Veriyi bu cihazda tutan, tarayıcı tabanlı bir karar günlüğü istiyorum. Hesap, backend, framework veya ücretli API gerektirmemeli. Bir kararı kaydedip sayfayı yenilediğimde hâlâ görebilirsem ilk parça tamamlanmış sayılacak. Engelleyici kararları bulmak için `grilling` kullan. Henüz geliştirmeye başlama.

Skill adını yazmak açık çağırmadır. Bazı istemciler açıklama eşleşmesine göre skill seçimini kendileri yapabilir. Bu davranış istemciye bağlıdır.

## Güvenlik döngünüz

Her anlamlı değişiklikte:

1. Hedeflenen sonucu doğrulayın.
2. Hangi dosyaların değişebileceğini kontrol edin.
3. Oluşan diff karşılaştırmasını inceleyin.
4. İlgili en küçük kontrolü veya testi çalıştırın.
5. Gerçek davranışı kendiniz doğrulayın.
6. Tek bir mantıksal değişikliği commit olarak kaydedin.

Kimlik bilgilerini konuşmaya yapıştırmayın veya Git deposuna göndermeyin. İzin isteklerini onaylamadan önce okuyun.

Sonraki adım: [Kurulum](../installation/) ve ardından [Temel Kavramlar](../core-concepts/).
