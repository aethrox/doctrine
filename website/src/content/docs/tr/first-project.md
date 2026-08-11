---
title: İlk Projeniz
description: Kopyala-yapıştır tutorial izlemeden Doctrine ile bir Karar Günlüğü projesini şekillendirin.
---

Bu proje satır satır tekrarlanacak bir talimat dizisi değildir. Kararları giderek daha az yönlendirmeyle vermeyi, kaydetmeyi, uygulamayı ve doğrulamayı öğretir.

## Ürün

Karar Günlüğü önemli kararları kaydeden küçük bir tarayıcı uygulamasıdır. Bir kayıt; durumu, seçilen kararı, gerekçeyi, kategoriyi ve tarihi içerir.

İlk sürüm kullanıcının kayıt oluşturmasını ve görüntülemesini, sayfa yenilendiğinde kayıtları korumasını, arama ve kategori filtresi kullanmasını ve kayıtları JSON olarak dışa aktarmasını sağlar.

## Sabit kısıtlar

Başlangıç sürümü HTML, CSS, tarayıcıya özgü JavaScript, `localStorage` ve statik barındırma kullanır. Framework, paket yöneticisi, backend, kullanıcı hesabı, veritabanı sunucusu veya ücretli API kullanmaz.

Yerel depolama şifreli bir yedek değildir. Tarayıcı verilerinin silinmesi veya başka bir tarayıcıya geçilmesi kayıtlara erişimi kaybettirebilir. JSON dışa aktarma taşınabilir bir kopya sağlar.

## Geliştirmeden önce başarıyı tanımlayın

İlk sürüm şu koşullarda tamamlanır:

- Geçerli bir kayıt kaydedilip görüntülenebilir.
- Kayıtlar sayfa yenilendikten sonra kalır.
- Arama; durum, karar veya gerekçe alanlarında eşleşme bulur.
- Kategori filtresi beklenen kayıtları gösterir.
- Dışa aktarma, kayıtları içeren geçerli bir JSON dosyası indirir.
- Kullanıcı metni HTML olarak çalıştırılmaz, metin olarak gösterilir.
- Uygulama klavyeyle kullanılabilir ve dar ekranda okunabilir kalır.

Bu sonuçları karşılamak için gerekli olmayan her şey ilk sürümün kapsamı dışındadır.

## İlk parça, tam gerekçeyle

En küçük kullanışlı uçtan uca parça:

> Kullanıcı bir karar ve gerekçe girer, kaydeder, sayfayı yeniler ve kaydı hâlâ görür.

Bu parça form, doğrulama, kayıt oluşturma, tarayıcı depolaması, gösterim ve yeniden yükleme yolunu birlikte kanıtlar. Arama, filtre, dışa aktarma, düzenleme ve görsel iyileştirme bu parçaya ait değildir.

Gözlemlenebilir kabul kontrolü kullanın:

> “Barındırma seçimi” adlı bir kayıt oluşturun, sayfayı yenileyin ve karar ile gerekçenin hâlâ görünür olduğunu doğrulayın.

## İkinci parça, daha az yönlendirmeyle

Arama veya kategori filtresinden birini seçin. Geliştirmeden önce kullanıcı tarafından görülen sonucu, normal bir örneği, bir sınır durumunu ve çalıştığını kanıtlayan en küçük kontrolü yazın.

Ajanın birden fazla davranışı birleştiren parçaları sorgulamasını isteyin. Her ayrıntıyı sizin yerinize seçmesini istemeyin.

## Bağımsız tamamlayın

Kalan arama veya filtre davranışını, JSON dışa aktarmayı, erişilebilirliği, duyarlı yerleşimi ve statik dağıtımı kendiniz sıralayın. Her parçada kod istemeden önce sonuç ile kanıtı belirtin.

Proje, dosyalarınız bir örnekle aynı olduğunda değil, kararları ve doğrulama kanıtlarını açıklayabildiğinizde başarılıdır.

## Yardımcı olabilecek skill içerikleri

| Durum | Skill |
|---|---|
| Önemli seçimler belirtilmemiş | `grilling` |
| Bir tarayıcı bilgisinin doğrulanması gerekiyor | `research` |
| Proje özeti belirsiz olabilir | `project-groundwork` |
| İş küçük, test edilebilir parçalara ayrılmalı | `spec-to-tickets` |
| Bir davranış geliştirilmeye hazır | `tdd` |
| Kullanıcı girdisi HTML çıktısına giriyor | `secure-coding` |
| Bir şey bozuk ve nedeni bilinmiyor | `diagnosing-bugs` |
| Tamamlanan diff incelenmeli | `code-review` |
| Mantıksal değişiklik kaydedilmeye hazır | `repo-ship` |

Bütün skill listesini aynı anda çağırmayın. O anki soruna uyan skill içeriğini seçin.
