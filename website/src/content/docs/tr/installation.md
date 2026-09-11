---
title: Kurulum
description: Kodlama istemcinize uygun Doctrine kurulum yöntemini seçin.
---

Doctrine'ı yerel plugin, MCP sunucusu veya skill dosyalarını elle kopyalayarak kullanabilirsiniz. İçerik değişmez, ancak skill'lerin nasıl bulunduğu ve çağrıldığı istemciye göre değişir.

## Yöntem seçin

| Yöntem | Ne zaman kullanılır? | Önemli davranış |
|---|---|---|
| Yerel plugin | İstemciniz Doctrine plugin'ini destekliyorsa | İstemci, açıklamalara bakarak skill seçebilir |
| MCP sunucusu | İstemciniz MCP prompt desteğine sahipse | Doctrine skill listesi prompt olarak görünür; seçim istemciye bağlıdır |
| Elle kopyalama | İstemciniz yerel talimat veya skill dosyalarını okuyabiliyorsa | Dosyaların konumunu ve ne zaman güncelleneceğini siz yönetirsiniz |

## Claude Code plugin

Claude Code için en kısa kurulum yolu:

```text
/plugin marketplace add aethrox/doctrine
/plugin install doctrine
```

Kurulumun çalıştığını görmek için bir skill'i adıyla çağırın:

> Doctrine'ın `explain-plainly` skill'ini kullanarak test ile kod incelemesi arasındaki farkı açıkla.

Otomatik seçim yararlı olsa da tek başına güvenilir bir kurulum testi sayılmaz.

## MCP sunucusu

MCP yöntemi Node.js 18 veya daha yeni bir sürüm gerektirir. İstemcinizin desteklediği yapılandırma biçimiyle Doctrine'ı yerel MCP sunucusu olarak ekleyin:

```json
{
  "mcpServers": {
    "doctrine": {
      "command": "npx",
      "args": ["-y", "github:aethrox/doctrine"]
    }
  }
}
```

Yapılandırma dosyasının yeri istemciye göre değişir; `command` ve `args` değerleri aynı kalır. Sunucuyu doğrudan da başlatabilirsiniz:

```bash
npx github:aethrox/doctrine
```

Doctrine, her `SKILL.md` dosyasını bir MCP prompt'u olarak kaydeder. MCP prompt'u, istemcinin kullanıcıya sunabildiği bir mesaj veya iş akışı şablonudur. MCP sunucusunu kurunca bütün skill'lerin otomatik olarak devreye gireceğini varsaymayın.

## Elle kurulum

Depoyu klonlayın:

```bash
git clone https://github.com/aethrox/doctrine.git
```

Gerekli skill klasörlerini istemcinizin belgelediği konuma kopyalayın. `~/.claude/skills` klasörünü okuyan bir istemci için şu Bash komutu bütün Doctrine skill klasörlerini kopyalar:

```bash
for s in doctrine/skills/*/; do
  name=$(basename "$s")
  cp -r "$s" ~/.claude/skills/"$name"/
done
```

Elle kurulan dosyalar kendiliğinden güncellenmez. Yeni sürümü almak istediğinizde Doctrine değişikliklerini çekip dosyaları yeniden kopyalayın.

## Kurulumu doğrulayın

1. `explain-plainly` adını açıkça yazarak çağırın.
2. Skill ile araç arasındaki farkı anlatmasını isteyin.
3. Yanıtın sade ve anlaşılır olup olmadığını kontrol edin.

Skill görünmüyorsa, istemcinizin seçtiğiniz yöntemi desteklediğinden emin olun ve tanımladığınız yolu yeniden kontrol edin. Bazı istemciler entegrasyonları yalnızca açılışta bulur, bu durumda istemciyi yeniden başlatmanız da gerekebilir.
