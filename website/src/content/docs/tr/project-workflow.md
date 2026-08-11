---
title: Proje İş Akışı
description: İhtiyaca uyan en küçük Doctrine skill grubuyla fikirden doğrulanmış ve incelenebilir işe ilerleyin.
---

Doctrine katı bir işlem hattı değil, yaşam döngüsü tanımlar. Uygulanmayan aşama ve skill içeriklerini atlayın. Yeni kanıt bir kararı değiştirdiğinde önceki aşamaya dönün.

## Yaşam döngüsü

| Aşama | Ana soru | Tipik skill içerikleri |
|---|---|---|
| Planlama ve keşif | Neyi başarmaya çalışıyoruz, henüz ne bilinmiyor? | `wayfinder`, `grilling`, `research`, `project-groundwork` |
| Teknik özellik ve iş kaydı | Hangi küçük sonuçlar geliştirilip doğrulanabilir? | `spec-to-tickets` |
| Tasarım ve prototip | Önce hangi teknik seçim çözülmeli? | `prototype`, `codebase-design`, `architecture-diagram` |
| Geliştirme | Sıradaki gözlemlenebilir davranış nedir? | `tdd`, `secure-coding`, `code-style-lint` |
| İnceleme ve birleştirme | Değişiklik kod sağlığını iyileştiriyor ve hedefi karşılıyor mu? | `code-review`, `test-strategy`, `resolving-merge-conflicts` |
| Sürüm ve dağıtım | İş nasıl kaydedilmeli, sürümlenmeli ve dağıtılmalı? | `repo-ship`, `release-versioning`, `safe-deployment` |
| İşletim ve müdahale | Çalışan sistemde ne oluyor? | `observability`, `diagnosing-bugs`, `incident-response`, `handoff` |
| İyileştirme | Hangi yapısal sürtünme sıradaki çalışmaya değer? | `improve-codebase-architecture` |

## Küçük görev döngüsü

Başlangıç görevlerinin çoğu daha kısa bir döngü kullanır:

1. **Sonucu belirtin.** Görev çalıştığında kullanıcının ne gözlemleyeceğini yazın.
2. **Skill seçimini yapın.** Alışkanlığa göre değil mevcut duruma göre seçin.
3. **Sınırları belirleyin.** Kapsam dışını, değişebilecek dosyaları ve onay gerektiren eylemleri yazın.
4. **Tek parça geliştirin.** Bir davranışa ve tek doğrulama hedefine odaklanın.
5. **Sonucu inceleyin.** Diff karşılaştırmasını okuyun ve ilgili en küçük kontrolü çalıştırın.
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

Bir yanıtın “tamamlandı” demesi kanıt değildir. Sonucu dört seviyede kontrol edin:

1. **Diff:** Yalnızca amaçlanan dosya ve davranışlar mı değişti?
2. **Otomatik kontrol:** İlgili test, derleme veya doğrulama komutu başarılı mı?
3. **Kullanıcı davranışı:** Vadedilen sonucu gösterebiliyor musunuz?
4. **Depo durumu:** İlgisiz değişiklikler korunuyor ve mantıksal değişiklik açıkça kaydediliyor mu?

Bir hata düzeltmesinde özgün yeniden üretme adımlarını tekrarlayın. Yeni özellikte belirtilen kabul sonucunu gösterin.

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

Önemli olmayan alanları doldurmayın. Amaç evrak üretmek değil, gizli varsayımları önlemektir.
