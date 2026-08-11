---
title: İleri Düzey
description: Tekrarlayan mühendislik işleri için Doctrine tarzı skill oluşturun veya mevcut bir skill'i uyarlayın.
---

Aynı çalışma disiplininin tekrar tekrar fayda sağladığı, tanınabilir bir durum varsa yeni bir skill yazın. Bir defalık istekler için prompt kullanın. Depoya özgü kurallar, o deponun talimat mekanizmasında yer almalıdır.

## Doctrine skill ne zaman uygundur?

- Görev tekrarlanır.
- Skill'i tetikleyen durum açıkça tanımlanabilir.
- Prosedür, işin nasıl yapıldığını değiştirir.
- Tamamlanma durumu kontrol edilebilir.
- Disiplin, adı belirtilen bir standarda veya yerleşik bir uygulamaya dayanır.

“İyi kod yaz” gibi belirsiz bir tercih için skill oluşturmayın.

## Gerekli yapı

Şunu oluşturun:

```text
skills/<name>/SKILL.md
```

Dosyaya YAML frontmatter ile başlayın:

```yaml
---
name: example-skill
description: "What discipline this encodes and the situations in which it should be used."
---
```

`name`, klasör adıyla tamamen aynı olmalıdır. Gövde; temel bir kısıt, somut kurallar içeren numaralı aşamalar, yararlı olduğunda başvuru kaynakları ve gözlemlenebilir tamamlanma koşulları içeren son bir kontrol listesi barındırmalıdır.

## Açıklamayı yönlendirme sözleşmesi olarak yazın

Kullanışlı bir açıklama şu soruları yanıtlar:

- Skill hangi işi yapar?
- Bir ajan skill'i ne zaman seçmelidir?
- Hangi ifadeler veya durumlar eşleşmeye işaret eder?
- Hangi yakın skill'in yerine geçmez?

Açık çağırmayı, örtük seçimi ve skill'in etkinleşmemesi gereken benzer bir durumu test edin.

## Ajana yönelik metni uygulanabilir tutun

Numaralı uygulama adımlarını metnin omurgası olarak kullanın. Tanımları, tabloları ve kontrol listelerini kolay taranabilir tutun. Ajanın ne yapması gerektiğini değiştirmeyen tarihsel açıklamaları başka bir yere taşıyın. `SKILL.md` içinde öğretici anlatımdan kaçının; ajanın yürütülebilir bir prosedüre ihtiyacı vardır.

## Yerel özelleştirme veya Doctrine katkısı

Kuruma özgü politikaları, özel sözlüğü ve kişisel iş akışı tercihlerini yerel tutun. Bir skill; projeler ve ürünler arasında uygulanabiliyorsa, kesin tetikleyicilere sahipse, adı belirtilen bir kaynağa dayanıyorsa ve ayrı bir disiplin katıyorsa Doctrine'a katkıda bulunmayı değerlendirin.

## Katkıyı doğrulayın

Depo kökünden çalıştırın:

```bash
npm install
npm test
```

Mevcut testler YAML frontmatter'ı, klasör adı eşleşmesini, MCP prompt keşfini, prompt içeriğinin birebir doğruluğunu ve paketlenmiş sunucuyu doğrular.
