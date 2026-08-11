# Yapay Zeka ile İlk Proje Wiki Araştırması

Durum: kapsam netleştirme taslağı  
Tarih: 11 Ağustos 2026  
İncelenen Doctrine sürümü: `1.1.0`, yerel depo son commit `d18eb1dbee983a41fc687548b857d08ad55d0ca5`

## Araştırma sorusu

Yapay zeka ile ilk yazılım projesini yapacak bir kişinin, skill kullanımı ve skill içindeki tanımlardan başlayarak güvenli ve doğrulanabilir biçimde çalışan bir projeye ulaşması için wiki hangi kavramları, hangi sırayla ve hangi ayrımlarla anlatmalıdır?

## Kısa sonuç

"Her şeyi anlatan tek uzun sayfa" yeni başlayan biri için iyi bir öğrenme yolu değildir. En uygun yapı, kısa bir **Buradan Başla** sayfası ve buradan açılan görev odaklı alt sayfalardır. Ana sayfa ilk çalışan sonuca götürmeli, sözlük ve ayrıntılı referans ise gerektiğinde açılmalıdır.

Wiki'nin en önemli kavramsal görevi şu ayrımı öğretmektir:

- **Skill**, ajana bir işi nasıl yapacağını anlatan yeniden kullanılabilir talimat paketidir.
- **Tool**, ajanın dosya okuma, komut çalıştırma veya API çağırma gibi bir eylemi gerçekleştirdiği araçtır.
- **Script**, skill ile birlikte gelen ve gerektiğinde çalıştırılan deterministik koddur.
- **Plugin**, skill'leri, bağlantıları ve sunum metadatasını başkalarının kurabileceği biçimde dağıtan pakettir.
- **MCP prompt**, bir MCP sunucusunun istemciye sunduğu kullanıcı kontrollü mesaj veya iş akışı şablonudur. MCP tool ile aynı şey değildir.

Bu ayrım kurulmazsa kullanıcı skill yüklediğinde yeni bir çalıştırılabilir yetenek kazandığını, MCP prompt'un otomatik çalışan bir araç olduğunu veya skill'in güvenlik izinlerini aşabildiğini sanabilir.

## Bulgular

### 1. Skill'in çalışma modeli

Agent Skills standardına göre skill, en az bir `SKILL.md` içeren klasördür. Agent önce bütün skill'lerin yalnızca `name` ve `description` alanlarını görür. Görev eşleşirse `SKILL.md` gövdesini, daha sonra ihtiyaç duyarsa `scripts/`, `references/` ve `assets/` içeriğini yükler. Bu üç aşamalı modele progressive disclosure denir. Kaynak: [Agent Skills Specification](https://agentskills.io/specification), erişim 11 Ağustos 2026.

OpenAI Docs aynı modeli ChatGPT ve Codex için doğruluyor. Skill açıkça seçilebilir veya görev `description` alanına uyduğunda örtük olarak etkinleşebilir. Codex CLI ve IDE içinde `/skills` veya `$skill-adı` kullanılabilir. Kaynak: [OpenAI Docs, Build skills](https://learn.chatgpt.com/docs/build-skills), erişim 11 Ağustos 2026.

Sonuç: wiki, skill seçimini sihirli bir anahtar gibi değil, `description` ile başlayan ve talimatların bağlama alınmasıyla devam eden bir süreç olarak göstermelidir.

### 2. `SKILL.md` alanlarının anlamı

| Alan veya bölüm | Yeni başlayan için anlamı | Teknik kural |
|---|---|---|
| `name` | Skill'in makine tarafından kullanılan kısa kimliği | Zorunlu, 1 ile 64 karakter, küçük harf, rakam ve tire, klasör adıyla aynı |
| `description` | Skill'in ne yaptığı ve ne zaman çağrılması gerektiği | Zorunlu, 1 ile 1024 karakter, tetikleme kelimelerini ve sınırları içermeli |
| Markdown gövdesi | Agent'ın etkinleştikten sonra izleyeceği talimatlar | Serbest biçimli, odaklı adımlar, girdiler, çıktılar ve kontroller önerilir |
| `license` | Skill içeriğinin kullanım lisansı | İsteğe bağlı |
| `compatibility` | Gerekli ürün, işletim sistemi, paket veya ağ erişimi | İsteğe bağlı, en fazla 500 karakter |
| `metadata` | İstemciye veya yayıncıya özel ek bilgiler | İsteğe bağlı anahtar ve değer haritası |
| `allowed-tools` | Önceden izin verilmiş araçları bildirme girişimi | İsteğe bağlı ve deneysel, istemci desteği değişebilir |
| `scripts/` | Tekrarlanan veya kesin davranması gereken kod | İsteğe bağlı, çalıştırılmadan önce güven ve izin değerlendirmesi gerekir |
| `references/` | Yalnızca gerektiğinde okunacak ayrıntılı bilgi | İsteğe bağlı, bağlam tüketimini azaltır |
| `assets/` | Şablon, görsel ve statik kaynaklar | İsteğe bağlı |
| `agents/openai.yaml` | OpenAI ürünlerinde görünüm, çağırma politikası ve tool bağımlılıkları | OpenAI'ye özgü isteğe bağlı genişletme, temel Agent Skills standardının parçası değil |

Kaynaklar: [Agent Skills Specification](https://agentskills.io/specification) ve [OpenAI Docs, Build skills](https://learn.chatgpt.com/docs/build-skills), erişim 11 Ağustos 2026.

### 3. `description` sıradan açıklama değildir

`description`, agent'ın skill'i yükleyip yüklememe kararındaki temel eşleştirme sözleşmesidir. Hem yapılan işi hem de ne zaman kullanılacağını anlatmalıdır. Fazla genel yazılırsa ilgisiz görevlerde tetiklenir, fazla dar yazılırsa doğru görevleri kaçırır. OpenAI ayrıca büyük skill kataloglarında açıklamaların kısaltılabileceğini, bu nedenle temel kullanım alanının ve tetikleyici kelimelerin başta yazılmasını öneriyor. Kaynak: [OpenAI Docs, Build skills](https://learn.chatgpt.com/docs/build-skills), erişim 11 Ağustos 2026.

Wiki'de iyi ve kötü `description` örnekleri ile açık çağırma ve örtük çağırma deneyi bulunmalıdır.

### 4. Doctrine'in skill sözleşmesi, genel standardın üzerinde ek bir yazım kuralıdır

Bu depoda 33 skill vardır. Her skill şu yerel biçimi izler:

1. Gerçek ve adlandırılmış bir standarda veya yerleşik pratiğe dayanma.
2. Skill'i sıradan yaklaşımdan ayıran tek cümlelik ana kısıt.
3. Somut ve kontrol edilebilir aşamalar veya kurallar.
4. Kapanış kontrol listesi.

`npm test`, YAML frontmatter'ın geçerli olmasını, `name` ve `description` alanlarının boş olmamasını, `name` değerinin klasör adıyla aynı olmasını ve MCP üzerinden sunulan içeriğin kaynak `SKILL.md` ile birebir eşleşmesini kontrol eder. Test şu anda Agent Skills standardındaki bütün uzunluk ve karakter kümesi kurallarını doğrulamaz.

Yerel kaynaklar: [README.md](./README.md), [CONTRIBUTING.md](./CONTRIBUTING.md), [smoke-test.mjs](./smoke-test.mjs), [pack-test.mjs](./pack-test.mjs), sürüm `1.1.0`.

### 5. Doctrine'in üç kullanım biçimi aynı dosyayı farklı anlamlarla sunar

| Ortam | Doctrine içeriği nasıl görünür | Kim veya ne başlatır |
|---|---|---|
| Doğrudan Agent Skill | `SKILL.md` talimatı olarak | Kullanıcı açıkça seçer veya agent `description` eşleşmesine göre seçer |
| Claude Code plugin | Plugin içindeki skill olarak | Deponun README belgesine göre açıklama eşleşmesiyle otomatik seçilebilir |
| Doctrine MCP sunucusu | Her `SKILL.md`, MCP prompt olarak kaydedilir | MCP standardında prompt kullanıcı kontrollüdür, istemci farklı bir arayüz sunabilir |

MCP 2025-11-25 spesifikasyonu prompt'ları kullanıcı kontrollü şablonlar olarak tanımlar. `prompts/list` keşif, `prompts/get` içerik alma içindir. Bu nedenle wiki, "MCP ile kurunca skill her istemcide otomatik çalışır" iddiasında bulunmamalıdır. Otomatik seçim istemcinin davranışına bağlıdır. Kaynak: [MCP Specification 2025-11-25, Prompts](https://modelcontextprotocol.io/specification/2025-11-25/server/prompts).

Doctrine'in gerçek uygulaması `mcp-server.js` içinde her skill'i prompt olarak kaydeder ve ham `SKILL.md` metnini kullanıcı rolünde döndürür. Yerel kaynak: [mcp-server.js](./mcp-server.js).

### 6. Yeni başlayan wiki'si yalnızca skill referansı olamaz

İlk projeyi tamamlatmak için aşağıdaki öğrenme yolu gerekir:

1. Agent, model, prompt, bağlam, tool, skill, plugin, MCP, izin ve sandbox sözlüğü.
2. Proje hedefi, kapsam dışı maddeler ve kabul ölçütleri yazma.
3. Dosya ve klasör güvenliği, gizli bilgiler, komut izinleri ve geri alınabilir çalışma.
4. Küçük bir çalışan dilim planlama.
5. Uygun skill'i bulma, açıkça çağırma ve seçildiğini doğrulama.
6. Agent'ın yaptığı değişikliği diff ile inceleme.
7. En küçük çalıştırılabilir kontrolü veya testi çalıştırma.
8. Git ile güvenli kayıt noktası oluşturma.
9. Hata durumunda teşhis, geri alma ve yardım isteme.
10. Projeyi yayınlama ve sonraki küçük adıma karar verme.

Bu sıra, Doctrine'in [WORKFLOW.md](./WORKFLOW.md) yaşam döngüsü ile uyumludur. Ancak başlangıç eğitimi 33 skill'in tamamını sırayla öğretmemelidir. İlk tur için küçük bir çekirdek set yeterlidir: `grilling`, `research`, `project-groundwork`, `spec-to-tickets`, `tdd`, `diagnosing-bugs`, `code-review`, `secure-coding` ve `repo-ship`.

### 7. Önerilen bilgi mimarisi

Önerilen varsayılan yapı:

1. **Buradan Başla**: 15 dakikada kavramlar ve ilk güvenli görev.
2. **Temel Sözlük**: prompt, context, agent, tool, skill, plugin, MCP, izin, sandbox.
3. **Skill Kullanma**: bulma, açık çağırma, örtük çağırma, çıktıyı doğrulama.
4. **Bir Skill'i Okuma**: frontmatter ve klasörlerin satır satır anlamı.
5. **İlk Proje Rehberi**: fikirden çalışan küçük sürüme uçtan uca örnek.
6. **Güvenlik ve Kontrol**: sırlar, izinler, yıkıcı komutlar, diff, test ve Git.
7. **Doctrine Skill Haritası**: 33 skill'i yaşam döngüsüne ve kullanıcı niyetine göre bulma.
8. **Sorun Giderme**: skill tetiklenmiyor, yanlış skill seçiliyor, araç yok, test geçmiyor.
9. **Kendi Skill'ini Yazma**: ileri seviye, gerçek iş akışından çıkarma, test etme ve dağıtma.

Tek sayfa zorunluysa, aynı sıra tek bir ana sayfada kısa bölümler ve açılır ayrıntılarla uygulanabilir. Yine de önerilen çözüm bir ana sayfa ve bağlantılı alt sayfalardır.

### 8. İngilizce ana dil, Türkçe ikinci dil için GitHub Wiki yapısı

GitHub'ın resmî wiki belgeleri sayfa oluşturma, dosya adları, bağlantılar ve tek bir özel `_Sidebar.md` ile `_Footer.md` kullanımını açıklıyor. Yerleşik dil seçici, otomatik çeviri veya dile göre yönlendirme tanımlamıyor. Bu nedenle en güvenli çözüm, iki dilde eşleştirilmiş ayrı sayfalar ve her sayfanın başında manuel dil bağlantısı kullanmaktır. Bu, belgelerde açıkça sunulan özelliklerden çıkarılan bir uygulama önerisidir. Kaynaklar: [Adding or editing wiki pages](https://docs.github.com/en/communities/documenting-your-project-with-wikis/adding-or-editing-wiki-pages) ve [Creating a footer or sidebar for your wiki](https://docs.github.com/en/communities/documenting-your-project-with-wikis/creating-a-footer-or-sidebar-for-your-wiki), erişim 11 Ağustos 2026.

Önerilen sayfa eşleri:

| İngilizce, ana kaynak | Türkçe çeviri |
|---|---|
| `Home.md` | `TR-Ana-Sayfa.md` |
| `Start-Here.md` | `TR-Buradan-Basla.md` |
| `Core-Concepts.md` | `TR-Temel-Kavramlar.md` |
| `Using-Skills.md` | `TR-Skill-Kullanimi.md` |
| `First-Project.md` | `TR-Ilk-Proje.md` |
| `Safety-and-Verification.md` | `TR-Guvenlik-ve-Dogrulama.md` |

Her İngilizce sayfanın üstünde `English | Türkçe`, her Türkçe sayfanın üstünde `English | Türkçe` bağlantısı bulunmalıdır. Tek global `_Sidebar.md`, önce English, sonra Türkçe olmak üzere iki kısa gezinme grubu göstermelidir.

GitHub Wiki bazı MediaWiki biçimlerini desteklese de transclusion desteklemez. Bu nedenle bir metin parçasını iki dil sayfasına otomatik olarak dahil edemeyiz. Kaynak: [Editing wiki content, Supported MediaWiki formats](https://docs.github.com/en/communities/documenting-your-project-with-wikis/editing-wiki-content), erişim 11 Ağustos 2026.

Çeviri kaymasını azaltmak için:

1. İngilizce sürüm normatif kaynak kabul edilir.
2. İngilizce ve Türkçe sayfa aynı yerel wiki commit'inde güncellenir.
3. Uzun kod örnekleri wiki içinde iki kez kopyalanmaz. Depodaki tek örnek projeye iki dilden bağlantı verilir.
4. Türkçe sayfanın üstünde eş İngilizce kaynak sayfasına bağlantı bulunur.
5. Türkçe çeviri gecikmişse bu durum sayfanın üstünde açıkça belirtilir.

GitHub Wiki ayrı bir Git deposudur ve `REPOSITORY.wiki.git` adresinden yerel olarak klonlanabilir. Yalnızca varsayılan dala gönderilen değişiklikler okuyuculara canlı olarak görünür. Bu davranış, iki dildeki sayfaları tek commit ile eş zamanlı güncellemek için kullanılabilir. Kaynak: [Adding or editing wiki pages, Adding or editing wiki pages locally](https://docs.github.com/en/communities/documenting-your-project-with-wikis/adding-or-editing-wiki-pages), erişim 11 Ağustos 2026.

### 9. Ayrı statik dokümantasyon sitesi alternatifi

İngilizce ana dil ve Türkçe ikinci dil gereksinimi için ayrı statik site, GitHub Wiki'den daha az manuel bağlantı ve çeviri durumu yönetimi gerektirir.

Astro Starlight şu özellikleri yerleşik olarak sağlar:

- Çok dilli yönlendirme ve dil seçici.
- Varsayılan dil seçimi ve İngilizceyi kök URL'de sunma.
- Aynı dosya adına sahip sayfaları diller arasında eşleştirme.
- Türkçe dahil hazır çevrilmiş arayüz metinleri.
- Türkçe çevirisi bulunmayan sayfada İngilizce içeriği ve çeviri uyarısını gösterme.
- Pagefind tabanlı statik arama.

Kaynak: [Starlight, Internationalization](https://starlight.astro.build/guides/i18n/), erişim 11 Ağustos 2026. Bu kaynak Starlight'ın güncel resmî belgesidir ve ilgili sayfa 11 Ağustos 2026 tarihinde canlı olarak doğrulanmıştır.

Docusaurus da yerleşik i18n, dil menüsü, Markdown ve MDX çevirileri ile tek alan adı altında `/tr/` benzeri statik çıktılar sağlar. Ancak tema ve eklenti arayüz metinleri için ek JSON çeviri yapısı, React katmanı ve daha geniş bir yapılandırma yüzeyi getirir. Kaynak: [Docusaurus, i18n Tutorial](https://docusaurus.io/docs/i18n/tutorial), son güncelleme 10 Temmuz 2026.

shadcn/ui bir dokümantasyon motoru değildir. Resmî kurulum belgesi onu Next.js, Vite, React Router, Astro ve başka uygulama altyapılarına eklenen arayüz bileşenleri olarak sunar. Tailwind CSS ve ek paketler gerektirir. Bu nedenle shadcn; Markdown yönlendirme, dokümantasyon kenar çubuğu, arama veya çeviri yaşam döngüsünü tek başına çözmez. Kaynak: [shadcn/ui, Installation](https://ui.shadcn.com/docs/installation), erişim 11 Ağustos 2026.

Öneri: statik wiki için Astro Starlight kullanılsın. shadcn yalnızca Starlight'ın yerleşik bileşenleri yetmediğinde, gerçekten etkileşimli özel bir araç için eklensin. İlk sürümde shadcn eklenmesin.

### 10. Statik sitenin GitHub Pages üzerinde yayımlanması

Astro'nun resmî dağıtım belgesi, statik ve önceden oluşturulmuş Astro siteleri için GitHub Pages ile GitHub Actions kullanımını destekliyor. Astro'nun resmî GitHub Action'ı önerilen dağıtım yöntemidir. Kaynak: [Astro Docs, Deploy your Astro Site to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/), erişim 11 Ağustos 2026.

Bu depo `https://github.com/aethrox/doctrine.git` adresine bağlıdır. Site aynı depodan yayımlanırsa varsayılan adres `https://aethrox.github.io/doctrine/` olur ve Astro yapılandırmasında `base: '/doctrine'` gerekir. Özel alan adı daha sonra eklenebilir.

Öneri: ilk sürüm GitHub Pages üzerinde yayımlansın. Sunucu, veritabanı veya ayrı barındırma hesabı eklenmesin. Özel alan adı gerçek bir marka ve kalıcı URL kararı verildiğinde eklenebilir.

### 11. Skill kataloğunun kullanıcı odaklı gruplanması

Doctrine 1.1.0 içindeki 33 skill'ın `name` ve `description` alanları incelendi. Kaynak: bu depodaki `skills/*/SKILL.md` dosyaları, commit `d18eb1dbee983a41fc687548b857d08ad55d0ca5`.

Depo skill'lar için resmi bir kategori alanı tanımlamıyor. Aşağıdaki gruplar kaynak verisi değil, yeni başlayanların doğru skill'ı bulmasını kolaylaştıran editoryal bir sınıflandırmadır:

| Grup | Skill'lar |
|---|---|
| Clarify & Collaborate | `explain-plainly`, `teach`, `wait-what`, `grilling`, `to-questionnaire`, `wayfinder`, `handoff`, `triage`, `wizard` |
| Discover & Design | `research`, `project-groundwork`, `prototype`, `domain-modeling`, `architecture-diagram`, `codebase-design`, `api-design-standards`, `spec-to-tickets` |
| Build & Verify | `tdd`, `test-strategy`, `code-style-lint`, `secure-coding`, `diagnosing-bugs`, `code-review`, `resolving-merge-conflicts`, `improve-codebase-architecture` |
| Ship & Operate | `dependency-upgrade-management`, `observability`, `safe-deployment`, `release-versioning`, `repo-secure`, `repo-ship`, `incident-response` |
| Extend Doctrine | `writing-for-agents` |

Öneri: katalog bu görev gruplarını birincil gezinme olarak kullansın. Alfabetik dizin ve arama da korunsun. Her skill tek bir ana grupta gösterilsin, böylece aynı sayfa farklı yerlerde çoğaltılmasın.

## Kaynak değerlendirmesi

| Kaynak | Sürüm veya tarih | Değerlendirme |
|---|---|---|
| OpenAI Docs, Build skills | 11 Ağustos 2026 tarihinde erişildi | Codex ve ChatGPT davranışı için güncel birincil kaynak |
| Agent Skills Specification | 11 Ağustos 2026 tarihinde erişildi | Dosya biçimi ve progressive disclosure için standardın birincil kaynağı |
| MCP Specification, Prompts | Protokol sürümü 2025-11-25 | MCP prompt semantiği için normatif birincil kaynak |
| Doctrine yerel kaynak kodu ve belgeleri | Paket sürümü 1.1.0 | Bu deponun gerçek davranışı için birincil kaynak |
| GitHub Docs, Wiki belgeleri | 11 Ağustos 2026 tarihinde erişildi | Sayfalar, dosya adları, yerel Git iş akışı, kenar çubuğu ve desteklenmeyen transclusion için birincil kaynak |
| Astro Starlight, i18n | 11 Ağustos 2026 tarihinde erişildi | Çok dilli statik dokümantasyon davranışı için güncel birincil kaynak |
| Docusaurus, i18n Tutorial | 10 Temmuz 2026 tarihinde güncellendi | Docusaurus çok dil ve statik dağıtım davranışı için güncel birincil kaynak |
| shadcn/ui, Installation | 11 Ağustos 2026 tarihinde erişildi | shadcn'in desteklenen altyapıları ve bağımlılıkları için güncel birincil kaynak |
| Astro Docs, GitHub Pages deployment | 11 Ağustos 2026 tarihinde erişildi | Astro'nun GitHub Pages ve resmî GitHub Action dağıtımı için güncel birincil kaynak |

Kaynaklar arasında doğrudan çelişki bulunmadı. Farklı katmanları tanımlıyorlar. Agent Skills dosya biçimini, OpenAI ürün davranışını, MCP prompt taşıma biçimini, Doctrine ise kendi içerik ve dağıtım politikasını tanımlıyor.

## Onaylanan kararlar

1. Site Doctrine'a özgü olacak. Genel yapay zeka eğitimi yalnızca Doctrine kullanımını anlamak için gerektiği kadar ele alınacak.
2. Hedef kitle, kodlama, terminal ve Git deneyimi olmayan veya çok az olan ilk proje geliştiricisi olacak.
3. Öğrenme modeli bir kopyala-yapıştır tutorial döngüsü olmayacak. Gerçek bir proje üzerinden karar verme sorumluluğu aşamalı olarak okura bırakılacak.
4. Doctrine'ın anlatımı model ve ürün bağımsız olacak. Codex, Claude Code ve diğer istemciler yalnızca entegrasyon örnekleri olarak kullanılabilecek.
5. Bilgi mimarisi kısa bir Start Here sayfası ve görev odaklı modüler sayfalardan oluşacak.
6. Ana bölümler Start Here, Installation, Core Concepts, Your First Project, Project Workflow, Skill Catalog, Advanced ve Contributing olacak.
7. Referans proje, tarayıcıda çalışan ve veriyi yerel tutan bir Decision Journal olacak. Başlangıç yolu HTML, CSS ve JavaScript kullanacak. Backend, kimlik doğrulama, ücretli API, framework ve paket yöneticisi gerektirmeyecek.
8. Site bu depodaki `website/` klasöründe Astro Starlight ile oluşturulacak ve GitHub Pages üzerinde yayımlanacak.
9. İlk sürüm Starlight'ın yerleşik arama, gezinme, dil seçici, koyu tema ve içerik bileşenlerini kullanacak. shadcn ilk sürüme eklenmeyecek.
10. İngilizce normatif ana dil ve kök rota olacak. Türkçe `/tr/` altında ikinci dil olacak. Eksik Türkçe sayfalarda İngilizce içerik ve çeviri uyarısı gösterilecek.
11. İlk yayında Start Here, Installation, Core Concepts, Your First Project ve Project Workflow bölümleri iki dilde tamamlanacak. Skill Catalog ve Advanced önce İngilizce yayımlanabilecek.
12. `skills/*/SKILL.md` dosyaları skill referansı için tek doğruluk kaynağı olacak. Referans verisi otomatik alınacak, kavramsal rehberler elle yazılacak.
13. Skill Catalog görev grupları, arama ve alfabetik dizin sunacak.
14. Wiki güncel kararlı Doctrine sürümünü anlatacak ve sürüm numarasını gösterecek. İlk sürümde geçmiş sürüm seçici bulunmayacak.
15. Kendi skill'ini yazma ve özelleştirme ileri seviye içerik olacak, başlangıç yolunun zorunlu parçası olmayacak.
