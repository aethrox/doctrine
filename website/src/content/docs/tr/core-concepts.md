---
title: Temel Kavramlar
description: Model, istemci, ajan, araç, skill, prompt, bağlam, MCP ve SKILL.md arasındaki farkı öğrenin.
---

Bir dil modelinin nasıl eğitildiğini bilmeniz gerekmez. Ancak talimatların, yeteneklerin, bilginin ve izinlerin sistemin hangi parçasından geldiğini bilmek işinizi kolaylaştırır.

## Ana terimler

| Terim | Sade anlamı |
|---|---|
| **Model** | Bilgiyi yorumlayıp yanıt üreten dil modeli |
| **İstemci** | Modelle etkileşim kurduğunuz ürün veya uygulama |
| **Yapay zekâ ajanı** | Bağlamı ve kullanabildiği araçlarla bir görevi yürüten model tabanlı sistem |
| **Prompt** | Modele veya ajana verilen istek ya da talimat |
| **Bağlam** | Ajanın o anda erişebildiği konuşma, dosyalar, talimatlar ve araç sonuçları |
| **Araç (tool)** | Dosya okuma, komut çalıştırma veya belge arama gibi bir eylem yeteneği |
| **Skill** | Tanınabilir bir görev türünü ele almak için yeniden kullanılabilir talimat paketi |
| **Plugin** | Skill, araç veya entegrasyon içerebilen, ürüne özgü kurulabilir paket |
| **MCP** | İstemcilerin dış sunuculardaki prompt, araç ve kaynaklara erişmesini sağlayan bir protokol |
| **İzin** | Bir eyleme olanak veren insan onayı veya politika |
| **Sandbox** | Ajanın erişebileceği dosya, komut veya sistemleri sınırlayan yalıtılmış çalışma alanı |

Bir skill, ajana **nasıl çalışacağını** anlatır. Araç, ajan adına **eylem yapar**. İzin ise bu eylemin yapılıp yapılamayacağını belirler.

## Doctrine skill yapısı

Her Doctrine skill ayrı bir klasörde bulunur:

```text
skills/research/SKILL.md
```

Dosyanın başında, üç tire arasında tutulan YAML frontmatter adlı metadata bloğu bulunur:

```yaml
---
name: research
description: Investigate a technical question against primary sources...
---
```

### `name`

Skill'in değişmeyen kimliğidir. Doctrine içinde klasör adıyla tamamen aynı olmalıdır.

### `description`

Skill'in ne yaptığını ve hangi durumlarda seçilmesi gerektiğini açıklayan yönlendirme sözleşmesidir. Fazla geniş yazılırsa ilgisiz işlerde devreye girer, fazla dar yazılırsa ihtiyaç duyulduğunda bulunamayabilir.

### Gövde

Doctrine skill gövdesi genellikle şunları içerir:

1. Skill'in yaklaşımını olağan çalışma biçiminden ayıran temel kısıt.
2. Somut kurallar içeren numaralı aşamalar.
3. Tamamlanmanın ne anlama geldiğini belirleyen kontrol listesi.

Kontrol listesinin varlığı tek başına kanıt sayılmaz. Ajan ilgili kontrolleri çalıştırmalı ve sonucu göstermelidir.

## Skill nasıl seçilir?

Skill adını açıkça belirtebilirsiniz:

> Bu hatayı araştırmak için `diagnosing-bugs` kullan. Nedeni teşhis et, henüz düzeltme yapma.

Uyumlu bir istemci, görev açıklamayla eşleştiğinde skill'i kendisi de seçebilir. Sistemi yeni öğreniyorsanız, birden fazla skill uygun görünüyorsa veya önemli sınırlar varsa skill adını açıkça yazmak daha nettir.

## Aynı içerik, farklı dağıtım

Doctrine içeriği yerel skill sistemiyle, ürüne özgü bir plugin'le veya MCP sunucusunun sunduğu prompt'larla dağıtılabilir. Bu yöntemlerin otomatik seçim davranışı aynı olmak zorunda değildir. Skill'in nasıl seçildiğini ve arayüzde nasıl göründüğünü istemci belirler.

## Karar sorumluluğu sizdedir

Yıkıcı ya da dış sistemleri etkileyen eylemlere izin vermek, değişiklikleri incelemek, kimlik bilgilerini korumak ve sonucun ihtiyacınızı karşılayıp karşılamadığına karar vermek sizin sorumluluğunuzdadır. Kapsam değişirse işi durdurmak da buna dahildir.
