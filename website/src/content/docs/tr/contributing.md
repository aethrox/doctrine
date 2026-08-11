---
title: Katkıda Bulunma
description: Doctrine skill'lerine, belgelerine, çevirilerine ve depo davranışına katkıda bulunun.
---

Doctrine; amacı belli düzeltmelere, standartlara dayanan skill'lere, daha iyi belgelere ve çevirilere açıktır. Her katkıda tek bir amaca odaklanın. Böylece değişiklik kendi başına incelenip doğrulanabilir.

## Bir skill'i değiştirmeden önce

Önce mevcut `SKILL.md` dosyasının tamamını okuyun. Ardından dosyanın yönlendirdiği ilgili skill'lere, `WORKFLOW.md` içindeki ilgili bölüme ve adı geçen birincil standarda ya da yerleşik uygulamaya bakın.

Skill'ler arasındaki sınırları koruyun. Bir skill'i yakın sorumlulukları da içine alacak kadar genişletmek, ajanın doğru skill'i seçmesini zorlaştırır.

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

Skill adları ve açıklamaları, doğruluğun tek kaynağı olan `skills/*/SKILL.md` dosyalarından gelmelidir. Rehberlerde bunları yeni başlayanların anlayacağı dille açıklayabilirsiniz. Ancak zamanla ana katalogdan kopacak, elle tutulan ikinci bir liste oluşturmayın.

Belgeler önce okuyucunun ne yapabileceğini söylemelidir. Bilinmeyen terimleri geçtiği yerde açıklayın, sayfaları kısa ve görev odaklı tutun, sonucu gözlemlemeyi sağlayan kontroller ekleyin. Okuru düşünmeden kopyala-yapıştır yapmaya yönelten tutorial döngülerinden kaçının.

## Çeviriye katkıda bulunun

İngilizce, esas alınan dildir. Türkçe sayfalar eşleşen `/tr/` yolu altında bulunur.

- Komutları, yolları, kodu ve skill adlarını olduğu gibi koruyun.
- Cümle yapısını değil, anlamı çevirin.
- Türkçe çeviri henüz hazır değil diye İngilizce bir düzeltmeyi bekletmeyin.
- Türkçe sayfa hazır değilse sitenin İngilizce içeriğe geri dönmesine izin verin.

## Kontrolleri çalıştırın

Doctrine için Node.js 18 veya daha yeni bir sürüm gerekir:

```bash
npm install
npm test
```

Başarısız olduğunu bildiğiniz bir kontrol varken pull request açmayın. Bunun tek istisnası, katkının doğrudan o hatayı düzeltmesi ve mevcut durumun açıkça belirtilmesidir.

## Commit biçimi

Conventional Commits kullanın ve ilgisiz değişiklikleri ayırın:

```text
feat: add accessibility review skill
fix: narrow research skill trigger
docs: explain manual installation
```

Pull request açmadan önce deponun tam [katkı rehberini](https://github.com/aethrox/doctrine/blob/main/CONTRIBUTING.md) okuyun.
