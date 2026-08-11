---
title: Proje İş Akışı
description: İhtiyacınıza uyan en küçük skill grubuyla fikrinizi doğrulanabilir ve incelenebilir bir sonuca dönüştürün.
---

Doctrine katı bir işlem sırası dayatmaz, bir yaşam döngüsü sunar. İşinize uymayan aşamaları ve skill'leri atlayın. Yeni bir bulgu kararınızı değiştirirse önceki aşamaya dönün.

## Yaşam döngüsü

| Aşama | Ana soru | Tipik skill içerikleri |
|---|---|---|
| Planlama ve keşif | Neyi başarmaya çalışıyoruz, henüz ne bilinmiyor? | `wayfinder`, `grilling`, `research`, `project-groundwork` |
| Teknik tanım ve iş kaydı | Hangi küçük sonuçlar geliştirilip doğrulanabilir? | `spec-to-tickets` |
| Tasarım ve prototip | Önce hangi teknik seçim çözülmeli? | `prototype`, `codebase-design`, `architecture-diagram` |
| Geliştirme | Kullanıcının sırada gözlemleyeceği davranış nedir? | `tdd`, `secure-coding`, `code-style-lint` |
| İnceleme ve birleştirme | Değişiklik kod sağlığını iyileştiriyor ve hedefi karşılıyor mu? | `code-review`, `test-strategy`, `resolving-merge-conflicts` |
| Sürüm ve dağıtım | İş nasıl kaydedilmeli, sürümlenmeli ve dağıtılmalı? | `repo-ship`, `release-versioning`, `safe-deployment` |
| İşletim ve müdahale | Çalışan sistemde ne oluyor? | `observability`, `diagnosing-bugs`, `incident-response`, `handoff` |
| İyileştirme | Hangi yapısal sorun üzerinde sırada çalışmaya değer? | `improve-codebase-architecture` |

## Küçük görev döngüsü

Başlangıç görevlerinin çoğu daha kısa bir döngü kullanır:

1. **Sonucu yazın.** Görev tamamlandığında kullanıcının ne göreceğini belirtin.
2. **Skill'i seçin.** Alışkanlığa göre değil, önünüzdeki duruma göre karar verin.
3. **Sınırları belirleyin.** Kapsam dışını, değişebilecek dosyaları ve onay gerektiren eylemleri yazın.
4. **Tek parça geliştirin.** Bir davranışa ve onu doğrulayacak tek bir hedefe odaklanın.
5. **Sonucu inceleyin.** Diff'i okuyun ve ilgili en küçük kontrolü çalıştırın.
6. **Değişikliği kaydedin.** Tek bir mantıksal amacı commit olarak kaydedin ve kalan riski belirtin.

## Yaygın yollar

### Yeni ve belirsiz fikir

```text
wayfinder veya grilling
→ eksik bilgiler için research
→ project-groundwork
→ spec-to-tickets
→ tdd
→ code-review
→ repo-ship
```

### Bildirilen hata

```text
öncelik bilinmiyorsa triage
→ diagnosing-bugs
→ gerileme testi ve düzeltme için tdd
→ code-review
→ repo-ship
```

Güvenlik açısından hassas değişikliklerde `secure-coding` geliştirme sırasında uygulanmalıdır. İnceleme aşamasına ertelenmemelidir.

## “Tamamlandı” demeden önce kanıt

Bir yanıtın “tamamlandı” demesi, işin gerçekten bittiğini göstermez. Sonucu dört düzeyde kontrol edin:

1. **Diff:** Yalnızca amaçlanan dosyalar ve davranışlar mı değişti?
2. **Otomatik kontrol:** İlgili test, derleme veya doğrulama komutu başarılı mı?
3. **Kullanıcı davranışı:** Vadedilen sonucu gösterebiliyor musunuz?
4. **Depo durumu:** İlgisiz değişiklikler korunmuş mu, yapılan değişiklik açıkça kaydedilmiş mi?

Hata düzeltiyorsanız ilk yeniden üretme adımlarını tekrar uygulayın. Yeni özellikte ise belirtilen kabul sonucunu gösterin.

## İyi görev özeti

```md
Sonuç:
Kapsam dışı:
İlgili bağlam:
İzin verilen değişiklikler:
Onay gerektiren eylemler:
Tamamlanma kanıtı:
Kullanılacak Doctrine skill:
```

İşinize yaramayan alanları doldurmayın. Amaç evrak üretmek değil, gizli varsayımları görünür kılmaktır.
