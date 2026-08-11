---
title: İlk Projeniz
description: Hazır adımları kopyalamadan Doctrine ile küçük bir Karar Günlüğü projesi geliştirin.
---

Bu sayfa, satır satır izleyeceğiniz bir tarif değildir. Amaç, kararları giderek daha az yönlendirmeyle vermeniz, kaydetmeniz, uygulamanız ve doğrulamanızdır.

## Ürün

Karar Günlüğü, önemli kararları kaydetmek için kullanılan küçük bir tarayıcı uygulamasıdır. Her kayıtta durum, verilen karar, gerekçe, kategori ve tarih bulunur.

İlk sürümde kullanıcı kayıt oluşturup görüntüleyebilir. Kayıtlar sayfa yenilendiğinde kaybolmaz; arama ve kategori filtresiyle bulunabilir, JSON olarak dışa aktarılabilir.

## Sabit kısıtlar

Başlangıç sürümünde yalnızca HTML, CSS, tarayıcı JavaScript'i, `localStorage` ve statik barındırma kullanılır. Framework, paket yöneticisi, backend, kullanıcı hesabı, veritabanı sunucusu ve ücretli API kapsam dışındadır.

Yerel depolamanın şifreli bir yedek olmadığını unutmayın. Tarayıcı verileri silinirse veya başka bir tarayıcıya geçerseniz kayıtlara erişemeyebilirsiniz. JSON dışa aktarma, yanınızda taşıyabileceğiniz bir kopya sağlar.

## Geliştirmeden önce başarıyı tanımlayın

İlk sürüm şu koşullarda tamamlanır:

- Geçerli bir kayıt kaydedilip görüntülenebilir.
- Kayıtlar sayfa yenilendikten sonra kalır.
- Arama; durum, karar veya gerekçe alanlarında eşleşme bulur.
- Kategori filtresi beklenen kayıtları gösterir.
- Dışa aktarma, kayıtları içeren geçerli bir JSON dosyası indirir.
- Kullanıcı metni HTML olarak çalıştırılmaz, metin olarak gösterilir.
- Uygulama klavyeyle kullanılabilir ve dar ekranda okunabilir kalır.

Bu sonuçlar için gerekmeyen her şey ilk sürümün dışında kalır.

## İlk parça, tam gerekçeyle

İşe yarayan en küçük uçtan uca parça şudur:

> Kullanıcı bir karar ve gerekçe girer, kaydeder, sayfayı yeniler ve kaydı hâlâ görür.

Bu parça; formun, doğrulamanın, kayıt oluşturmanın, tarayıcı depolamasının, gösterimin ve yeniden yüklemenin birlikte çalıştığını kanıtlar. Arama, filtre, dışa aktarma, düzenleme ve görsel iyileştirmeler şimdilik bu parçaya dahil değildir.

Gözlemlenebilir kabul kontrolü kullanın:

> “Barındırma seçimi” adlı bir kayıt oluşturun, sayfayı yenileyin ve karar ile gerekçenin hâlâ görünür olduğunu doğrulayın.

## İkinci parça, daha az yönlendirmeyle

Sırada arama ya da kategori filtresinden biri var. Koda geçmeden önce kullanıcının göreceği sonucu, sıradan bir örneği, bir sınır durumunu ve çalıştığını kanıtlayacak en küçük kontrolü yazın.

Ajanınızdan, birden fazla davranışı aynı parçaya sıkıştırdığınızda bunu sorgulamasını isteyin. Bütün ayrıntıları sizin yerinize seçmesini istemeyin.

## Bağımsız tamamlayın

Geriye kalan arama veya filtre davranışını, JSON dışa aktarmayı, erişilebilirliği, farklı ekranlara uyumlu yerleşimi ve statik dağıtımı kendiniz sıralayın. Her parça için kod istemeden önce beklediğiniz sonucu ve kanıtı yazın.

Başarı ölçütü, dosyalarınızın bir örnekle aynı olması değildir. Verdiğiniz kararları ve doğrulama kanıtlarını açıklayabiliyorsanız proje amacına ulaşmıştır.

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

Bütün skill'leri aynı anda çağırmayın. O an çözmeye çalıştığınız soruna uyanı seçin.
