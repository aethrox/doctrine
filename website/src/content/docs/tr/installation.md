---
title: Kurulum
description: Yapay zekâ kodlama istemcinizin desteklediği Doctrine kurulum yöntemini seçin.
---

Doctrine; yerel plugin, MCP sunucusu veya skill dosyalarını elle kopyalama yoluyla kullanılabilir. Skill içeriği aynıdır, ancak bulunma ve çağırma davranışı istemciye göre değişir.

## Yöntem seçin

| Yöntem | Ne zaman kullanılır? | Önemli davranış |
|---|---|---|
| Yerel plugin | İstemciniz Doctrine plugin desteğine sahipse | İstemci, açıklamalarına göre skill seçimi yapabilir |
| MCP sunucusu | İstemciniz MCP prompt desteğine sahipse | Doctrine skill listesi prompt olarak görünür; seçim istemciye bağlıdır |
| Elle kopyalama | İstemciniz yerel talimat veya skill dosyaları okuyorsa | Dosyaların konumunu ve güncelleme zamanını siz yönetirsiniz |

## Claude Code plugin

Claude Code için en kısa kurulum yolu:

```text
/plugin marketplace add aethrox/doctrine
/plugin install doctrine
```

Kurulumdan sonra kullanılabilirliği doğrulamak için bir skill adını açıkça belirtin:

> Doctrine `explain-plainly` skill kullanarak test ile kod incelemesi arasındaki farkı açıkla.

Otomatik seçim kullanışlıdır, ancak tek başına güvenilir bir kurulum testi değildir.

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

Yapılandırma dosyasının konumu istemciye göre değişir. `command` ve `args` değerleri aynı kalır. Sunucuyu doğrudan da başlatabilirsiniz:

```bash
npx github:aethrox/doctrine
```

Doctrine her `SKILL.md` dosyasını MCP prompt olarak kaydeder. MCP prompt, istemcinin kullanıcıya sunduğu mesaj veya iş akışı şablonudur. MCP sunucusunu kurmanın bütün skill içeriklerini otomatik olarak etkinleştirdiğini varsaymayın.

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

Elle yapılan kurulumlar otomatik güncellenmez. Güncellemek istediğinizde Doctrine değişikliklerini çekip dosyaları tekrar kopyalayın.

## Kurulumu doğrulayın

1. `explain-plainly` adını açıkça yazarak çağırın.
2. Skill ile araç arasındaki farkı açıklamasını isteyin.
3. Yanıtın sade dil disiplinini izlediğini doğrulayın.
