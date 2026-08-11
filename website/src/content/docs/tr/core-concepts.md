---
title: Temel Kavramlar
description: Model, istemci, araç, skill, prompt, bağlam, MCP ve SKILL.md kavramlarını anlayın.
---

Bir dil modelinin nasıl üretildiğini bilmeniz gerekmez. Sistemin hangi parçasının talimatları, yetenekleri, bilgiyi ve izinleri yönettiğini bilmeniz gerekir.

## Ana terimler

| Terim | Sade anlamı |
|---|---|
| **Model** | Bilgiyi yorumlayan ve yanıt üreten dil modeli |
| **İstemci** | Modelle etkileşim kurduğunuz ürün veya uygulama |
| **Yapay zekâ ajanı** | Bağlamı ve kullanılabilir araçları kullanarak bir görevi takip eden model tabanlı sistem |
| **Prompt** | Modele veya ajana verilen istek ya da talimat |
| **Bağlam** | Ajanın o anda erişebildiği konuşma, dosyalar, talimatlar ve araç sonuçları |
| **Araç (tool)** | Dosya okuma, komut çalıştırma veya belge arama gibi bir eylem yeteneği |
| **Skill** | Tanınabilir bir görev türünü ele almak için yeniden kullanılabilir talimat paketi |
| **Plugin** | Skill, araç veya entegrasyon içerebilen, ürüne özgü kurulabilir paket |
| **MCP** | İstemcilerin dış sunuculardaki prompt, araç ve kaynaklara erişmesini sağlayan protokol |
| **İzin** | Bir eyleme olanak veren insan onayı veya politika |
| **Sandbox** | Ajanın erişebileceği dosya, komut veya sistemleri sınırlayan yalıtılmış çalışma alanı |

Bir skill, ajana **nasıl çalışacağını** anlatır. Bir araç, ajan adına **eylem gerçekleştirir**. İzin, bu eylemin yapılıp yapılamayacağını belirler.

## Doctrine skill yapısı

Her Doctrine skill ayrı bir klasörde bulunur:

```text
skills/research/SKILL.md
```

Dosyanın başında YAML frontmatter bulunur:

```yaml
---
name: research
description: Investigate a technical question against primary sources...
---
```

### `name`

Skill için kararlı kimliktir. Doctrine içinde klasör adıyla tamamen aynı olmalıdır.

### `description`

Yönlendirme sözleşmesidir. Skill işinin ne olduğunu ve hangi durumda kullanılması gerektiğini açıklar. Çok geniş bir açıklama ilgisiz işlerde seçim yapılmasına, çok dar bir açıklama ise skill içeriğinin hiç bulunmamasına neden olabilir.

### Gövde

Doctrine skill gövdesi genellikle şunları içerir:

1. Skill yaklaşımını olağan varsayımdan ayıran temel kısıt.
2. Somut kurallar içeren numaralı aşamalar.
3. Tamamlanmanın ne anlama geldiğini belirleyen kontrol listesi.

Kontrol listesi tek başına kanıt değildir. Ajanın ilgili kontrolleri çalıştırması ve sonucu göstermesi gerekir.

## Skill nasıl seçilir?

Skill adını açıkça belirtebilirsiniz:

> Bu hatayı araştırmak için `diagnosing-bugs` kullan. Nedeni teşhis et, henüz düzeltme yapma.

Uyumlu bir istemci, görev skill açıklamasıyla eşleştiğinde örtük seçim de yapabilir. Öğrenme aşamasında, birden fazla skill eşleştiğinde veya önemli sınırlar bulunduğunda açık çağırma daha nettir.

## Aynı içerik, farklı dağıtım

Doctrine içeriği yerel skill sistemi, ürüne özgü plugin veya MCP sunucusunun sunduğu MCP prompt biçiminde taşınabilir. Bu yöntemler aynı otomatik seçim davranışını garanti etmez. Seçim arayüzü ve otomasyon istemciye bağlıdır.

## Karar sorumluluğu sizdedir

Yıkıcı veya dış sistemleri etkileyen eylemleri onaylamak, değişiklikleri incelemek, kimlik bilgilerini korumak, sonucun ihtiyacınızı karşılayıp karşılamadığına karar vermek ve kapsam değiştiğinde işi durdurmak sizin sorumluluğunuzdadır.
