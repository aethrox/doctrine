---
title: Katkıda Bulunma
description: Doctrine skill'lerini, belgelerini, çevirilerini ve depo davranışını iyileştirin.
---

Doctrine; belirli bir amaca odaklanan düzeltmeleri, standartlara dayanan skill'leri, belge iyileştirmelerini ve çevirileri memnuniyetle karşılar. Her katkıyı tek bir amaçla sınırlayın. Böylece katkı bağımsız olarak incelenebilir ve doğrulanabilir.

## Bir skill'i değiştirmeden önce

Mevcut `SKILL.md` dosyasının tamamını, dosyada başvurulan ilgili skill'leri, `WORKFLOW.md` dosyasının ilgili bölümünü ve adı verilen birincil standardı veya yerleşik uygulamayı okuyun.

Skill'ler arasındaki ayrımı koruyun. Bir skill'i komşu sorumlulukları da kapsayacak kadar genişletmek, doğru skill'e yönlendirme yapılmasını zorlaştırır.

## Skill ekleyin veya iyileştirin

1. `skills/<name>/SKILL.md` dosyasını oluşturun veya güncelleyin.
2. `name` değerini klasör adıyla tamamen aynı tutun.
3. `description` alanını kesin bir yönlendirme sözleşmesi olarak yazın.
4. Disiplini adı belirtilmiş bir kaynağa dayandırın.
5. Temel kısıtı, aşamaları ve kapanış kontrol listesini ekleyin.
6. Katalog veya yaşam döngüsü değiştiğinde `README.md` ve `WORKFLOW.md` dosyalarını güncelleyin.
7. Gereken yerlerde kod içine yazılmış skill sayılarını güncelleyin.
8. Test komutunun tamamını çalıştırın.

## Belgelere katkıda bulunun

Skill adları ve açıklamaları, doğruluğun tek kaynağı olan `skills/*/SKILL.md` dosyalarından gelmelidir. Rehberler bu bilgileri yeni başlayanların anlayabileceği bir dille açıklayabilir. Ancak zamanla asıl katalogdan kopabilecek, elle yazılmış ikinci bir katalog tutmamalıdır.

Belgeler önce okuyucunun ne yapabileceğini anlatmalı, bilinmeyen terimleri tanımlamalı, kısa ve göreve odaklı sayfalar kullanmalı, gözlemlenebilir doğrulama adımları içermeli ve kopyala-yapıştır tutorial döngülerinden kaçınmalıdır.

## Çeviriye katkıda bulunun

İngilizce, esas alınan dildir. Türkçe sayfalar eşleşen `/tr/` yolu altında bulunur.

- Komutları, yolları, kodu ve skill adlarını olduğu gibi koruyun.
- Cümle yapısını değil, anlamı çevirin.
- Türkçe çevirisi tamamlanmadı diye İngilizce bir düzeltmeyi geciktirmeyin.
- Türkçe sayfa hazır değilse sitenin İngilizce içeriğe geri dönmesine izin verin.

## Kontrolleri çalıştırın

Doctrine için Node.js 18 veya daha yeni bir sürüm gerekir:

```bash
npm install
npm test
```

Başarısız olduğu bilinen bir kontrol varken pull request açmayın. Tek istisna, katkının doğrudan bu hatayı ele alması ve hatanın açıkça açıklanmasıdır.

## Commit biçimi

Conventional Commits kullanın ve ilgisiz değişiklikleri ayırın:

```text
feat: add accessibility review skill
fix: narrow research skill trigger
docs: explain manual installation
```

Pull request açmadan önce deponun tam [katkı rehberini](https://github.com/aethrox/doctrine/blob/main/CONTRIBUTING.md) okuyun.
