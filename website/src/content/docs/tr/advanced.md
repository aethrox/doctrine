---
title: İleri Düzey
description: Tekrarlanan mühendislik işleri için yeni bir Doctrine skill'i yazın veya var olanı uyarlayın.
---

Aynı çalışma biçimi belirli bir durumda tekrar tekrar işe yarıyorsa yeni bir skill yazın. Tek seferlik istekler için prompt yeterlidir. Yalnızca bir depoyu ilgilendiren kuralları da o deponun talimat mekanizmasında tutun.

## Doctrine skill'i ne zaman uygundur?

- Aynı tür görev tekrar eder.
- Skill'i tetikleyen durum açıkça tanımlanabilir.
- Prosedür, işin ele alınış biçimini gerçekten değiştirir.
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

`name`, klasör adıyla tamamen aynı olmalıdır. Gövde şunları içermelidir: temel bir kısıt, somut kurallardan oluşan numaralı aşamalar, gerektiğinde başvuru kaynakları ve tamamlanma koşullarını gözlemlenebilir biçimde sıralayan son bir kontrol listesi.

## Açıklamayı seçim ölçütü olarak yazın

Kullanışlı bir açıklama şu soruları yanıtlar:

- Skill hangi işi yapar?
- Ajan bu skill'i ne zaman seçmelidir?
- Hangi ifadeler veya durumlar eşleşmeye işaret eder?
- Benzer görünen hangi skill'in yerine kullanılmamalıdır?

Skill'in adla çağrılmasını, açıklamasına göre seçilmesini ve seçilmemesi gereken benzer bir durumu ayrı ayrı test edin.

## Ajana yönelik metni uygulanabilir tutun

Metnin omurgasını numaralı uygulama adımları oluştursun. Tanımlar, tablolar ve kontrol listeleri bir bakışta taranabilsin. Ajanın ne yapacağını değiştirmeyen tarihsel bilgileri başka bir yerde tutun. `SKILL.md` bir eğitim metni değildir; ajanın uygulayabileceği bir prosedür sunmalıdır.

## Yerel özelleştirme veya Doctrine katkısı

Kuruma özgü politikaları, özel terimleri ve kişisel iş akışı tercihlerini yerel tutun. Skill farklı proje ve ürünlerde işe yarıyor, açık tetikleyicilere sahip, adı belli bir kaynağa dayanıyor ve mevcut skill'lerden ayrı bir disiplin getiriyorsa Doctrine'a katkı olarak önermeyi düşünün.

## Katkıyı doğrulayın

Depo kökünden çalıştırın:

```bash
npm install
npm test
```

Mevcut testler YAML frontmatter'ı, klasör adı eşleşmesini, MCP prompt keşfini, prompt içeriğinin birebir doğruluğunu ve paketlenmiş sunucuyu doğrular.
