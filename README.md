<<<<<<< HEAD
# Vue 3 Comments Management Project

Bu proje, Vue 3 ve PrimeVue kullanılarak geliştirilmiş bir yorum yönetim sistemidir. Bileşen bazlı mimari kullanılarak oluşturulmuştur.

## Kullanılan Teknolojiler

- Vue 3 (Composition API)
- Vuex 4 (State Management)
- PrimeVue 3 (UI Components)
- Vuelidate (Form Validation)
- Axios (HTTP Client)
- Vite (Build Tool)

## Proje Yapısı

```
src/
├── components/
│   ├── CommentList.vue    # Ana bileşen
│   ├── CommentTable.vue   # Tablo bileşeni
│   └── EditCommentForm.vue # Düzenleme formu bileşeni
├── store/
│   ├── index.js          # Vuex store
│   └── modules/
│       └── comments.js   # Yorumlar için store modülü
└── main.js              # Uygulama giriş noktası
```

## Kurulum Adımları

1. Projeyi klonlayın:
```bash
git clone [proje-url]
cd vue3-project
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

4. Tarayıcınızda şu adresi açın:
```
http://localhost:5173
```

## Özellikler

- Yorumları listeleme
- Yorum düzenleme
- Form validasyonu
- Responsive tasarım
- Sayfalama
- Sıralama

## Bileşen Yapısı

### CommentList
- Ana bileşen
- Yorum listesini yönetir
- Edit modalını kontrol eder

### CommentTable
- Yorumları tablo formatında gösterir
- Sayfalama ve sıralama özellikleri
- Düzenleme butonu

### EditCommentForm
- Yorum düzenleme formu
- Form validasyonu
- Tab'lı arayüz

## API Endpoints

Proje JSONPlaceholder API'sini kullanmaktadır:
- GET /comments - Tüm yorumları getir
- PUT /comments/:id - Yorum güncelle

## Geliştirme

Projeyi geliştirmek için:

1. Yeni bir branch oluşturun:
```bash
git checkout -b feature/yeni-ozellik
```

2. Değişikliklerinizi commit edin:
```bash
git commit -m 'Yeni özellik eklendi'
```

3. Branch'inizi push edin:
```bash
git push origin feature/yeni-ozellik
```

=======
# vueProject
Vue 3 Comments Management Project
>>>>>>> cd27d11f68453233a7ee27a234453ce583f98107
