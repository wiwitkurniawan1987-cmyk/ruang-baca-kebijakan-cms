import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

type Block = { kind: 'heading' | 'paragraph'; text: string }

type ArticleSeed = {
  title: string
  slug: string
  sectionSlug: string
  contentType: 'article' | 'policy-brief' | 'working-paper' | 'event' | 'library'
  excerpt: string
  publishedAt: string
  eventDate?: string
  eventLocation?: string
  featured?: boolean
  mainAgenda?: boolean
  blocks: Block[]
}

const h = (text: string): Block => ({ kind: 'heading', text })
const p = (text: string): Block => ({ kind: 'paragraph', text })

function lexicalContent(blocks: Block[]) {
  const textNode = (text: string) => ({
    type: 'text',
    version: 1,
    detail: 0,
    format: 0,
    mode: 'normal',
    style: '',
    text,
  })

  return {
    root: {
      type: 'root',
      version: 1,
      direction: 'ltr',
      format: '',
      indent: 0,
      children: blocks.map((block) => block.kind === 'heading'
        ? {
            type: 'heading',
            tag: 'h2',
            version: 1,
            direction: 'ltr',
            format: '',
            indent: 0,
            children: [textNode(block.text)],
          }
        : {
            type: 'paragraph',
            version: 1,
            direction: 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
            textStyle: '',
            children: [textNode(block.text)],
          }),
    },
  }
}

const articles: ArticleSeed[] = [
  {
    title: 'Pendidikan Digital dan Keadilan Akses',
    slug: 'pendidikan-digital-dan-keadilan-akses',
    sectionSlug: 'terbitan-terbaru',
    contentType: 'policy-brief',
    excerpt: 'Empat pertanyaan yang perlu dijawab sebelum pemerintah memperluas investasi perangkat digital.',
    publishedAt: '2026-07-30T09:00:00+07:00',
    featured: true,
    blocks: [
      h('Ringkasan'),
      p('Digitalisasi pendidikan sering dipresentasikan sebagai jalan cepat untuk memperluas akses dan meningkatkan mutu pembelajaran. Namun perangkat, platform, dan koneksi internet tidak bekerja di ruang hampa. Manfaatnya ditentukan oleh kondisi keluarga, kapasitas guru, dukungan sekolah, tata kelola data, serta kemampuan peserta didik menggunakan teknologi secara bermakna.'),
      p('Karena itu, ukuran keberhasilan tidak boleh berhenti pada jumlah perangkat yang dibagikan atau akun yang diaktifkan. Kebijakan perlu dinilai dari siapa yang benar-benar memperoleh kesempatan belajar lebih baik, siapa yang tertinggal, dan apakah teknologi memperkuat atau justru memperlebar kesenjangan yang sudah ada.'),
      h('Pertanyaan pertama: masalah apa yang hendak diselesaikan?'),
      p('Investasi digital harus dimulai dari diagnosis masalah pembelajaran. Sekolah yang kekurangan guru, memiliki listrik tidak stabil, atau menghadapi hambatan bahasa membutuhkan jawaban yang berbeda. Perangkat digital dapat membantu, tetapi tidak dapat menggantikan kebijakan tenaga pendidik, dukungan sosial, dan infrastruktur dasar.'),
      h('Pertanyaan kedua: siapa yang dapat menggunakan teknologi secara efektif?'),
      p('Akses fisik tidak sama dengan akses yang bermakna. Satu perangkat untuk satu keluarga, biaya data, ruang belajar di rumah, kebutuhan peserta didik disabilitas, dan literasi digital orang tua memengaruhi hasil. Pemetaan kelompok pengguna perlu dilakukan sebelum program diperluas.'),
      h('Pertanyaan ketiga: apakah guru memiliki waktu dan dukungan?'),
      p('Teknologi yang baik tetap membutuhkan guru yang dapat memilih materi, merancang aktivitas, menilai pemahaman, dan menjaga relasi belajar. Pelatihan satu kali tidak cukup. Guru memerlukan pendampingan, waktu untuk mencoba, komunitas praktik, serta kebebasan menyesuaikan alat dengan konteks kelas.'),
      h('Pertanyaan keempat: bagaimana data dan pengadaan diawasi?'),
      p('Platform pendidikan mengumpulkan data tentang identitas, kebiasaan belajar, dan capaian peserta didik. Pemerintah harus menetapkan batas pengumpulan data, masa penyimpanan, keamanan, akses pihak ketiga, serta mekanisme pengaduan. Kontrak pengadaan juga perlu terbuka agar sekolah tidak terkunci pada satu penyedia.'),
      h('Arah kebijakan'),
      p('Prioritas pertama adalah memastikan infrastruktur minimum dan dukungan bagi kelompok paling rentan. Program kemudian diuji dalam skala terbatas dengan indikator hasil belajar, beban kerja guru, biaya keluarga, aksesibilitas, dan perlindungan data. Perluasan hanya dilakukan setelah evaluasi independen menunjukkan manfaat yang lebih besar daripada risikonya.'),
      p('Keadilan digital bukan berarti semua sekolah menerima alat yang sama. Keadilan berarti setiap peserta didik memperoleh dukungan yang sesuai agar dapat belajar, berpartisipasi, dan berkembang. Teknologi seharusnya menjadi sarana untuk tujuan tersebut, bukan tujuan kebijakan itu sendiri.'),
    ],
  },
  {
    title: 'Sekolah, Pilihan, dan Segregasi',
    slug: 'sekolah-pilihan-dan-segregasi',
    sectionSlug: 'terbitan-terbaru',
    contentType: 'working-paper',
    excerpt: 'Menilai klaim efisiensi dan kebebasan memilih sekolah dari sudut keadilan sosial.',
    publishedAt: '2026-06-18T09:00:00+07:00',
    blocks: [
      h('Pilihan sekolah dan janji kebebasan'),
      p('Kebijakan pilihan sekolah biasanya dibenarkan dengan dua argumen: keluarga berhak menentukan pendidikan yang sesuai dan persaingan akan mendorong sekolah meningkatkan mutu. Argumen tersebut menarik, tetapi mengasumsikan semua keluarga mempunyai informasi, waktu, jaringan, dan biaya yang setara untuk memilih.'),
      p('Dalam praktiknya, pilihan selalu berlangsung di dalam struktur sosial. Jarak tempat tinggal, ongkos transportasi, seleksi akademik, iuran informal, bahasa, agama, disabilitas, dan reputasi sekolah membatasi pilihan yang benar-benar tersedia bagi setiap keluarga.'),
      h('Bagaimana segregasi terbentuk'),
      p('Segregasi tidak selalu lahir dari aturan yang secara terang-terangan memisahkan peserta didik. Ia dapat muncul ketika sekolah populer memilih calon dengan nilai tinggi, keluarga mampu berpindah tempat tinggal, atau informasi pendaftaran hanya beredar melalui jaringan tertentu. Akibatnya, peserta didik dengan latar belakang serupa semakin terkonsentrasi di sekolah yang sama.'),
      p('Konsentrasi tersebut memengaruhi pengalaman belajar. Sekolah dengan kebutuhan terbesar sering menghadapi pergantian guru lebih tinggi, dukungan orang tua yang terbatas, dan sumber daya tambahan yang lebih sedikit. Sementara itu, sekolah yang sudah unggul memperoleh keuntungan dari reputasi dan komposisi siswanya.'),
      h('Efisiensi untuk siapa?'),
      p('Persaingan dapat mendorong inovasi, tetapi juga mendorong sekolah mengejar indikator yang mudah dipasarkan. Jika keberhasilan diukur hanya dari nilai rata-rata, sekolah memiliki insentif untuk memilih peserta didik yang sudah diuntungkan. Efisiensi administratif belum tentu menghasilkan keadilan pendidikan.'),
      h('Prinsip kebijakan yang lebih adil'),
      p('Sistem penerimaan perlu mengurangi kemampuan sekolah untuk menyaring secara terselubung. Informasi harus tersedia dalam format yang mudah dipahami, dukungan transportasi perlu diberikan, dan pendanaan harus mengikuti tingkat kebutuhan peserta didik. Pemerintah juga perlu memantau komposisi sosial sekolah, bukan hanya jumlah pendaftar.'),
      p('Pilihan keluarga tetap penting, tetapi pilihan yang adil membutuhkan pilihan yang benar-benar dapat diakses. Tujuan akhirnya bukan sekadar menempatkan anak di sekolah yang diinginkan, melainkan memastikan setiap sekolah layak dipilih dan setiap anak dapat belajar bersama warga yang beragam.'),
    ],
  },
  {
    title: 'Netralitas Guru di Ruang Kelas',
    slug: 'netralitas-guru-di-ruang-kelas',
    sectionSlug: 'terbitan-terbaru',
    contentType: 'article',
    excerpt: 'Mengapa keterbukaan posisi dapat lebih demokratis daripada netralitas yang semu.',
    publishedAt: '2026-05-22T09:00:00+07:00',
    blocks: [
      h('Netralitas bukan ketiadaan nilai'),
      p('Guru sering diminta netral ketika membahas isu publik. Permintaan ini penting untuk mencegah indoktrinasi, tetapi netralitas tidak berarti ruang kelas bebas dari nilai. Pemilihan materi, pertanyaan yang dianggap penting, aturan berbicara, dan cara menilai argumen selalu mencerminkan pertimbangan pendidikan.'),
      p('Masalah muncul ketika netralitas dipahami sebagai kewajiban menyembunyikan semua posisi. Sikap tersebut dapat membuat pandangan dominan terlihat alamiah, sementara pengalaman kelompok yang kurang terdengar dianggap terlalu politis untuk dibicarakan.'),
      h('Perbedaan antara mengajar dan mengarahkan'),
      p('Guru dapat menjelaskan posisi pribadi tanpa menuntut peserta didik menyetujuinya. Batasnya terletak pada penggunaan kekuasaan: apakah nilai diberikan berdasarkan kesamaan pendapat, apakah pandangan lain dipermalukan, dan apakah peserta didik memiliki kesempatan aman untuk bertanya serta berbeda.'),
      h('Keterbukaan yang bertanggung jawab'),
      p('Keterbukaan membantu peserta didik melihat bahwa pengetahuan dibangun melalui alasan dan bukti. Guru dapat mengatakan dasar penilaiannya, menunjukkan sumber yang digunakan, mengakui keterbatasan, dan mengundang sanggahan. Dengan cara ini, posisi guru menjadi objek pemeriksaan, bukan perintah.'),
      h('Aturan untuk diskusi demokratis'),
      p('Ruang kelas memerlukan aturan yang melindungi martabat setiap orang. Klaim harus dibedakan dari serangan pribadi, pengalaman dapat menjadi sumber pengetahuan tetapi tetap dapat ditafsirkan, dan kelompok yang menjadi sasaran diskriminasi tidak boleh dibebani untuk selalu membela keberadaannya.'),
      p('Sekolah juga perlu mendukung guru melalui pedoman, bahan ajar yang beragam, dan mekanisme penyelesaian konflik. Menyerahkan semua risiko kepada guru membuat diskusi isu sulit mudah dihentikan oleh tekanan.'),
      h('Tujuan pendidikan'),
      p('Tujuan diskusi bukan menghasilkan satu pendapat seragam. Tujuannya adalah melatih peserta didik mendengarkan, menguji alasan, memperbaiki pandangan, dan hidup bersama perbedaan. Dalam kerangka ini, guru tidak harus tanpa posisi; guru harus adil dalam menggunakan kewenangannya.'),
    ],
  },
  {
    title: 'Koleksi Pilihan: Keadilan Pendidikan',
    slug: 'koleksi-pilihan-keadilan-pendidikan',
    sectionSlug: 'perpustakaan',
    contentType: 'library',
    excerpt: 'Panduan awal membaca kesetaraan kesempatan, integrasi sekolah, kemampuan manusia, dan demokrasi pendidikan.',
    publishedAt: '2026-07-30T08:30:00+07:00',
    blocks: [
      h('Mengapa keadilan pendidikan perlu dibaca dari banyak arah?'),
      p('Keadilan pendidikan tidak hanya berbicara tentang pembagian anggaran atau jumlah sekolah. Ia juga menyangkut tujuan pendidikan, pengalaman sehari-hari peserta didik, pengakuan terhadap identitas, kesempatan berpartisipasi, dan kemampuan menjalani kehidupan yang bernilai.'),
      h('Kesetaraan kesempatan'),
      p('Bacaan pada tema ini membantu membedakan kesempatan yang sama secara formal dari kesempatan yang benar-benar dapat digunakan. Dua peserta didik dapat menerima aturan yang sama, tetapi kondisi keluarga, kesehatan, bahasa, lokasi, dan diskriminasi membuat hasilnya berbeda.'),
      h('Integrasi dan pengalaman bersama'),
      p('Sekolah adalah salah satu tempat warga dari latar berbeda belajar hidup bersama. Literatur integrasi sekolah membahas manfaat perjumpaan, risiko segregasi, serta kebijakan penerimaan dan pendanaan yang dapat memperluas pengalaman demokratis.'),
      h('Pendekatan kemampuan manusia'),
      p('Pendekatan kemampuan mengajak pembaca menilai pendidikan dari kebebasan nyata yang dimiliki seseorang. Pertanyaannya bukan hanya berapa tahun anak bersekolah, tetapi apakah ia dapat memahami dunia, menyuarakan pendapat, membangun relasi, dan menentukan masa depannya.'),
      h('Demokrasi pendidikan'),
      p('Keadilan juga menyangkut siapa yang boleh menentukan tujuan, kurikulum, dan aturan sekolah. Bacaan demokrasi pendidikan membahas keterlibatan peserta didik, guru, keluarga, serta masyarakat dalam pengambilan keputusan.'),
      h('Cara menggunakan koleksi'),
      p('Mulailah dari satu persoalan nyata, kemudian baca dua atau tiga pendekatan yang berbeda. Catat asumsi setiap penulis, kelompok yang paling terdampak, bukti yang digunakan, dan konsekuensi kebijakannya. Koleksi ini dirancang sebagai pintu masuk untuk diskusi, bukan daftar jawaban tunggal.'),
    ],
  },
  {
    title: 'Kebijakan & Tata Kelola',
    slug: 'kebijakan-tata-kelola',
    sectionSlug: 'perpustakaan',
    contentType: 'library',
    excerpt: 'Analisis kebijakan, ekonomi politik pendidikan, hukum pendidikan, dan administrasi publik.',
    publishedAt: '2026-07-21T09:00:00+07:00',
    blocks: [
      h('Ruang lingkup koleksi'),
      p('Rak Kebijakan & Tata Kelola menghimpun bacaan tentang bagaimana masalah pendidikan didefinisikan, keputusan dibuat, anggaran dibagikan, program dijalankan, dan hasil dipertanggungjawabkan. Koleksi mencakup analisis kebijakan, administrasi publik, hukum pendidikan, pembiayaan, dan ekonomi politik.'),
      h('Membaca proses, bukan hanya hasil'),
      p('Sebuah kebijakan tidak lahir hanya dari bukti teknis. Kepentingan lembaga, aturan hukum, tekanan politik, kapasitas birokrasi, dan suara masyarakat memengaruhi pilihan. Karena itu, pembaca diajak menelusuri siapa yang menetapkan agenda, siapa yang dilibatkan, serta masalah apa yang tidak masuk pembahasan.'),
      h('Pelaksanaan di tingkat sekolah'),
      p('Kebijakan yang tampak jelas di tingkat pusat dapat berubah ketika diterapkan. Kepala sekolah, guru, pemerintah daerah, dan keluarga menafsirkan aturan sesuai sumber daya dan kebutuhan. Studi implementasi membantu menjelaskan jarak antara desain program dan pengalaman warga.'),
      h('Akuntabilitas yang bermakna'),
      p('Akuntabilitas tidak cukup berupa pelaporan angka. Masyarakat perlu dapat memahami alasan keputusan, melihat penggunaan sumber daya, dan memperoleh mekanisme koreksi. Indikator kinerja harus dibaca bersama dampaknya pada beban kerja, perilaku sekolah, dan kelompok rentan.'),
      h('Panduan membaca'),
      p('Gunakan koleksi ini dengan memilih satu kebijakan, memetakan aktor dan kewenangannya, lalu membandingkan tujuan resmi dengan pelaksanaan. Perhatikan pula siapa yang menerima manfaat, siapa yang menanggung biaya, dan alternatif apa yang tidak dipilih.'),
    ],
  },
  {
    title: 'Filsafat & Keadilan',
    slug: 'filsafat-dan-keadilan',
    sectionSlug: 'perpustakaan',
    contentType: 'library',
    excerpt: 'Tujuan pendidikan, demokrasi, etika, pedagogi kritis, dan teori sosial.',
    publishedAt: '2026-07-20T09:00:00+07:00',
    blocks: [
      h('Pertanyaan dasar pendidikan'),
      p('Rak Filsafat & Keadilan dimulai dari pertanyaan yang sering tersembunyi di balik kebijakan: manusia seperti apa yang ingin didukung oleh pendidikan, pengetahuan apa yang dianggap penting, dan siapa yang berhak menentukan tujuan sekolah.'),
      h('Keadilan sebagai distribusi dan pengakuan'),
      p('Sebagian bacaan menekankan pembagian kesempatan, sumber daya, dan hasil. Bacaan lain menunjukkan pentingnya pengakuan terhadap bahasa, identitas, pengalaman, serta martabat. Keduanya diperlukan untuk melihat ketidakadilan yang tidak selalu tampak dalam angka.'),
      h('Pedagogi dan relasi kuasa'),
      p('Proses belajar berlangsung dalam relasi antara guru, peserta didik, kurikulum, dan institusi. Pedagogi kritis membantu pembaca memeriksa siapa yang boleh berbicara, pengetahuan siapa yang dianggap sah, dan bagaimana pendidikan dapat membuka kemampuan bertindak.'),
      h('Demokrasi sebagai cara hidup'),
      p('Literatur demokrasi pendidikan tidak hanya membahas pelajaran kewargaan. Ia melihat sekolah sebagai tempat berlatih mendengarkan, menyampaikan alasan, mengelola konflik, dan mengambil keputusan bersama.'),
      h('Menggunakan koleksi'),
      p('Pilih satu persoalan konkret—misalnya seleksi sekolah, disiplin, atau kurikulum—lalu tanyakan konsep keadilan apa yang digunakan. Bandingkan jawaban dari beberapa tradisi pemikiran dan periksa konsekuensinya bagi kebijakan serta praktik kelas.'),
    ],
  },
  {
    title: 'Agama & Masyarakat',
    slug: 'agama-dan-masyarakat',
    sectionSlug: 'perpustakaan',
    contentType: 'library',
    excerpt: 'Sekularisme, pluralisme, pendidikan agama, identitas, dan hubungan negara dengan warga.',
    publishedAt: '2026-07-19T09:00:00+07:00',
    blocks: [
      h('Membaca agama dalam kehidupan publik'),
      p('Rak Agama & Masyarakat menghimpun karya yang memandang agama sebagai keyakinan, praktik sosial, identitas, tradisi intelektual, dan sumber tindakan publik. Pendekatan yang beragam membantu pembaca menghindari gambaran agama yang terlalu sederhana.'),
      h('Pendidikan agama dan kebebasan berkeyakinan'),
      p('Bacaan pada tema ini membahas tujuan pendidikan agama, hak keluarga dan anak, posisi kelompok minoritas, serta batas kewenangan negara. Pertanyaan utamanya adalah bagaimana sekolah menghormati keyakinan tanpa mengubah pendidikan menjadi pemaksaan.'),
      h('Pluralisme dan perjumpaan'),
      p('Keberagaman tidak otomatis menghasilkan saling pengertian. Perjumpaan memerlukan ruang yang aman, pengetahuan yang memadai, dan aturan yang setara. Literatur pluralisme membantu menilai program dialog serta kondisi yang membuatnya bermakna.'),
      h('Sekularisme dalam beragam bentuk'),
      p('Sekularisme tidak memiliki satu model. Hubungan negara dan agama berbeda menurut sejarah, hukum, dan institusi setiap masyarakat. Koleksi mengajak pembaca membandingkan model tersebut tanpa menyalin pengalaman negara lain secara langsung.'),
      h('Panduan membaca'),
      p('Saat membaca, perhatikan definisi agama dan kebebasan yang digunakan penulis. Tanyakan kelompok mana yang dilindungi, siapa yang dibatasi, dan bagaimana kebijakan dirasakan dalam kehidupan sehari-hari. Diskusi sebaiknya berangkat dari rasa ingin tahu dan penghormatan terhadap martabat.'),
    ],
  },
  {
    title: 'Sabtu Membaca Bersama',
    slug: 'sabtu-membaca-bersama',
    sectionSlug: 'taman-baca',
    contentType: 'event',
    excerpt: 'Sesi membaca, menggambar, dan bercakap untuk anak serta pendamping keluarga.',
    publishedAt: '2026-07-30T08:00:00+07:00',
    eventLocation: 'Taman Baca · Setiap Sabtu',
    blocks: [
      h('Tentang program'),
      p('Sabtu Membaca Bersama adalah ruang perjumpaan mingguan bagi anak dan keluarga. Kegiatan dirancang agar membaca terasa hangat, menyenangkan, dan tidak menyerupai ujian. Anak boleh mendengarkan, bertanya, bergerak, menggambar, atau menceritakan kembali dengan caranya sendiri.'),
      h('Alur kegiatan'),
      p('Pertemuan dimulai dengan memilih buku dan mengenali sampul, tokoh, serta pertanyaan yang muncul. Fasilitator kemudian membaca nyaring sambil memberi waktu bagi anak untuk menebak, menghubungkan cerita dengan pengalaman, dan memperhatikan gambar.'),
      p('Setelah membaca, peserta melakukan aktivitas sederhana seperti menggambar adegan, membuat akhir cerita alternatif, bermain peran, atau menyusun pertanyaan. Kegiatan ditutup dengan rekomendasi buku yang dapat dibaca bersama di rumah.'),
      h('Peran pendamping keluarga'),
      p('Orang tua dan pendamping tidak dituntut mengajar. Mereka diajak menjadi teman membaca: mendengarkan, mengikuti rasa ingin tahu anak, dan menghindari koreksi berlebihan. Fasilitator akan membagikan cara mengajukan pertanyaan terbuka dan memilih buku sesuai minat.'),
      h('Keikutsertaan'),
      p('Program terbuka bagi anak usia 6–12 tahun dan pendampingnya. Peserta dapat datang tanpa membawa buku. Apabila anak memiliki kebutuhan akses tertentu, keluarga dapat menyampaikan kepada pengelola agar kegiatan disesuaikan.'),
      h('Prinsip kegiatan'),
      p('Kami menjaga ruang yang aman, menghargai perbedaan kemampuan membaca, tidak membandingkan anak, dan tidak menggunakan kegiatan untuk penilaian akademik. Tujuan utamanya adalah membangun hubungan yang akrab dengan buku dan dengan orang lain.'),
    ],
  },
  {
    title: 'Baca Nyaring',
    slug: 'baca-nyaring',
    sectionSlug: 'taman-baca',
    contentType: 'event',
    excerpt: 'Cerita anak Indonesia dan dunia, dilanjutkan aktivitas kreatif.',
    publishedAt: '2026-07-18T09:00:00+07:00',
    eventLocation: 'Setiap Sabtu · 10.30',
    blocks: [
      h('Mendengar cerita, membangun makna'),
      p('Baca Nyaring mempertemukan anak dengan cerita melalui suara, gambar, gerak, dan percakapan. Anak tidak harus sudah lancar membaca. Dengan mendengarkan, mereka dapat mengenal kosakata, alur, emosi tokoh, dan berbagai cara melihat dunia.'),
      h('Apa yang terjadi dalam sesi?'),
      p('Fasilitator memperkenalkan buku, mengajak anak memperhatikan ilustrasi, lalu membaca dengan tempo yang memberi ruang untuk berpikir. Pada beberapa bagian, anak diajak memprediksi, bertanya, atau menghubungkan cerita dengan pengalaman mereka.'),
      p('Sesudah cerita selesai, peserta memilih aktivitas kreatif: menggambar tokoh, membuat boneka kertas, bermain peran, atau menceritakan adegan favorit. Tidak ada jawaban tunggal dan karya tidak dinilai berdasarkan kerapian.'),
      h('Pemilihan buku'),
      p('Buku dipilih berdasarkan mutu cerita, kekayaan ilustrasi, kesesuaian usia, serta keberagaman tokoh dan pengalaman. Kami berusaha menghadirkan karya Indonesia dan dunia tanpa menjadikan satu latar kehidupan sebagai ukuran semua anak.'),
      h('Untuk keluarga'),
      p('Pendamping dipersilakan mengikuti sesi dan mempraktikkan membaca nyaring di rumah. Kuncinya bukan kemampuan memainkan suara secara sempurna, melainkan kesediaan hadir, mendengarkan respons anak, dan menikmati cerita bersama.'),
    ],
  },
  {
    title: 'Klub Penjelajah Buku',
    slug: 'klub-penjelajah-buku',
    sectionSlug: 'taman-baca',
    contentType: 'event',
    excerpt: 'Membaca nonfiksi ringan dan belajar mengajukan pertanyaan.',
    publishedAt: '2026-07-17T09:00:00+07:00',
    eventLocation: 'Sabtu kedua · 13.00',
    blocks: [
      h('Belajar melalui rasa ingin tahu'),
      p('Klub Penjelajah Buku ditujukan bagi pembaca usia 10–14 tahun yang ingin memahami dunia melalui buku nonfiksi. Setiap pertemuan berangkat dari pertanyaan, bukan dari kewajiban menghafal fakta.'),
      h('Tema dan bahan bacaan'),
      p('Tema dapat berupa lingkungan, teknologi, sejarah lokal, tubuh manusia, kota, hewan, atau kehidupan sosial. Fasilitator memilih bacaan pendek dengan tingkat kesulitan beragam agar peserta dapat masuk melalui gambar, diagram, cerita, maupun teks penjelasan.'),
      h('Cara kerja klub'),
      p('Peserta membaca bagian terpilih, menandai hal yang mengejutkan, dan menyusun pertanyaan lanjutan. Kelompok kemudian membedakan fakta, pendapat, dan dugaan serta mencari sumber tambahan untuk menguji informasi.'),
      p('Kegiatan dapat dilanjutkan dengan pengamatan sederhana, peta konsep, wawancara, atau presentasi singkat. Peserta tidak harus menyelesaikan satu buku penuh sebelum dapat berkontribusi.'),
      h('Kemampuan yang dikembangkan'),
      p('Klub melatih kebiasaan membaca kritis, menjelaskan dengan bahasa sendiri, mendengarkan teman, dan berani mengubah kesimpulan ketika menemukan bukti baru. Kemampuan tersebut berguna di sekolah sekaligus dalam kehidupan sehari-hari.'),
      h('Keikutsertaan'),
      p('Peserta dapat mengikuti satu pertemuan atau bergabung secara berkala. Buku dan alat kegiatan disediakan. Kami mendorong anggota membawa pertanyaan dari rumah, lingkungan, atau berita yang ingin mereka pahami bersama.'),
    ],
  },
  {
    title: 'Orang Tua Membaca',
    slug: 'orang-tua-membaca',
    sectionSlug: 'taman-baca',
    contentType: 'event',
    excerpt: 'Percakapan tentang kebiasaan membaca di rumah tanpa tekanan akademik.',
    publishedAt: '2026-07-16T09:00:00+07:00',
    eventLocation: 'Pertemuan bulanan untuk keluarga',
    blocks: [
      h('Membangun kebiasaan tanpa paksaan'),
      p('Orang Tua Membaca adalah forum bulanan untuk membicarakan pengalaman mendampingi anak membaca. Fokusnya bukan mengejar jumlah buku atau mempercepat kemampuan akademik, melainkan membangun suasana rumah yang membuat buku mudah dijangkau dan percakapan terasa menyenangkan.'),
      h('Masalah yang sering ditemui'),
      p('Keluarga sering menghadapi keterbatasan waktu, pilihan buku yang sedikit, perbedaan minat, penggunaan gawai, atau kekhawatiran anak tertinggal. Forum membantu peserta memisahkan kebutuhan nyata anak dari tekanan perbandingan.'),
      h('Praktik sederhana di rumah'),
      p('Kebiasaan dapat dimulai dari sepuluh menit membaca bersama, membiarkan anak memilih buku, membicarakan gambar, atau menceritakan kembali pengalaman sehari-hari. Orang tua tidak harus selalu membeli buku; perpustakaan, pertukaran buku, dan bahan bacaan lingkungan dapat digunakan.'),
      h('Menghormati perkembangan anak'),
      p('Anak belajar membaca dengan kecepatan dan cara yang berbeda. Kesalahan adalah bagian dari proses. Pendamping dianjurkan memberi bantuan secukupnya, tidak mempermalukan, dan mencari dukungan profesional bila ada kesulitan yang terus berlangsung.'),
      h('Format pertemuan'),
      p('Setiap pertemuan memadukan pengantar singkat, berbagi pengalaman, praktik membaca buku anak, dan penyusunan satu rencana kecil yang realistis. Peserta boleh hadir tanpa menceritakan hal pribadi dan semua pengalaman diperlakukan dengan hormat.'),
    ],
  },
  {
    title: 'Sekolah, Negara, dan Masa Depan Demokrasi',
    slug: 'sekolah-negara-dan-masa-depan-demokrasi',
    sectionSlug: 'agenda',
    contentType: 'event',
    excerpt: 'Forum panel tentang pendidikan kewargaan, kebebasan akademik, dan tanggung jawab sekolah dalam demokrasi.',
    publishedAt: '2026-07-30T07:30:00+07:00',
    eventDate: '2026-08-08T14:00:00+07:00',
    eventLocation: 'Hibrida · Ruang Baca Utama dan daring',
    featured: true,
    mainAgenda: true,
    blocks: [
      h('Tentang diskusi'),
      p('Sekolah tidak hanya menyiapkan peserta didik untuk bekerja. Sekolah juga membentuk cara warga memahami perbedaan, menggunakan kebebasan, menilai informasi, dan berhubungan dengan kekuasaan. Karena itu, hubungan antara pendidikan dan demokrasi perlu dibicarakan secara terbuka.'),
      h('Pertanyaan utama'),
      p('Forum akan membahas bagaimana pendidikan kewargaan dapat mengembangkan penilaian kritis tanpa berubah menjadi indoktrinasi. Peserta juga akan mendiskusikan batas netralitas guru, kebebasan akademik, partisipasi peserta didik, serta tanggung jawab negara melindungi ruang belajar.'),
      h('Mengapa tema ini penting?'),
      p('Polarisasi politik dan penyebaran informasi yang menyesatkan masuk ke ruang kelas melalui percakapan sehari-hari. Menghindari seluruh isu kontroversial tidak membuat sekolah netral; hal itu dapat membiarkan prasangka dan ketimpangan berbicara tanpa pemeriksaan.'),
      p('Di sisi lain, kewenangan guru dan institusi dapat disalahgunakan untuk menutup perbedaan pendapat. Pendidikan demokratis harus mampu menjaga keseimbangan antara keterbukaan, perlindungan martabat, disiplin intelektual, dan hak peserta didik.'),
      h('Format kegiatan'),
      p('Kegiatan terdiri dari pengantar panel, tanggapan peserta, dan sesi tanya jawab. Pertanyaan dapat disampaikan secara langsung atau melalui formulir daring. Ringkasan pembahasan akan diterbitkan setelah acara.'),
      h('Siapa yang dapat mengikuti?'),
      p('Forum terbuka bagi guru, mahasiswa, peneliti, orang tua, pengelola sekolah, pembuat kebijakan, dan warga umum. Tidak diperlukan latar belakang khusus. Peserta diharapkan membaca ringkasan tema dan mematuhi panduan diskusi yang menghormati perbedaan.'),
      h('Hasil yang diharapkan'),
      p('Diskusi tidak diarahkan untuk menghasilkan satu jawaban. Tujuannya adalah memperjelas perbedaan gagasan, menemukan prinsip bersama, dan menyusun pertanyaan kebijakan yang dapat diteliti lebih lanjut.'),
    ],
  },
  {
    title: 'Mengapa Tujuan Pendidikan Diperdebatkan?',
    slug: 'mengapa-tujuan-pendidikan-diperdebatkan',
    sectionSlug: 'agenda',
    contentType: 'event',
    excerpt: 'Percakapan pengantar tentang human flourishing, efisiensi sosial, dan demokrasi.',
    publishedAt: '2026-07-29T07:30:00+07:00',
    eventDate: '2026-08-22T15:30:00+07:00',
    eventLocation: 'Luring · Ruang Baca Utama',
    mainAgenda: true,
    blocks: [
      h('Pendidikan selalu mengandung pilihan nilai'),
      p('Ketika orang berbicara tentang mutu pendidikan, mereka sering menggunakan ukuran yang berbeda. Ada yang menekankan kesiapan kerja, pertumbuhan ekonomi, karakter, kebahagiaan, kebebasan, kebudayaan, atau kemampuan menjadi warga demokratis. Perbedaan ukuran tersebut menunjukkan bahwa tujuan pendidikan tidak pernah sepenuhnya teknis.'),
      h('Human flourishing'),
      p('Gagasan human flourishing memandang pendidikan sebagai dukungan agar manusia dapat menjalani kehidupan yang bernilai. Pengetahuan, kesehatan, relasi, imajinasi, kemandirian, dan kemampuan berpartisipasi menjadi penting. Tantangannya adalah menentukan siapa yang mendefinisikan kehidupan yang baik tanpa memaksakan satu cara hidup.'),
      h('Efisiensi sosial'),
      p('Pandangan efisiensi sosial menekankan kemampuan pendidikan memenuhi kebutuhan masyarakat dan dunia kerja. Ia mengingatkan bahwa sekolah menggunakan sumber daya publik dan perlu menghasilkan manfaat. Namun orientasi yang terlalu sempit dapat mereduksi peserta didik menjadi tenaga kerja dan mengabaikan tujuan pribadi maupun demokratis.'),
      h('Demokrasi'),
      p('Tujuan demokratis melihat pendidikan sebagai proses belajar hidup bersama dalam kesetaraan. Peserta didik perlu mampu menyampaikan alasan, mendengar pengalaman yang berbeda, memeriksa kekuasaan, dan terlibat dalam keputusan yang memengaruhi kehidupan bersama.'),
      h('Mengapa perdebatan perlu dipelihara?'),
      p('Tidak ada satu tujuan yang otomatis menyelesaikan semua persoalan. Kebijakan harus membuat prioritas, dan setiap prioritas membawa konsekuensi. Perdebatan terbuka membantu masyarakat melihat nilai yang dipilih, kelompok yang diuntungkan, serta tujuan yang mungkin terabaikan.'),
      h('Tentang kegiatan'),
      p('Bedah gagasan ini menggunakan bacaan pengantar singkat dan contoh kebijakan pendidikan. Peserta akan membandingkan tiga kerangka tujuan, menilai ketegangan di antaranya, dan mencoba menggunakannya untuk membaca masalah sekolah sehari-hari.'),
      h('Hasil pertemuan'),
      p('Peserta diharapkan pulang dengan peta konsep yang lebih jelas, bukan jawaban tunggal. Catatan pertemuan akan dirangkum sebagai bahan diskusi lanjutan tentang tujuan pendidikan di tingkat sekolah dan kebijakan publik.'),
    ],
  },
  {
    title: 'Dari Masalah Publik ke Pertanyaan Penelitian',
    slug: 'dari-masalah-publik-ke-pertanyaan-penelitian',
    sectionSlug: 'agenda',
    contentType: 'event',
    excerpt: 'Lokakarya menyusun pertanyaan penelitian yang jelas, dapat diteliti, dan relevan bagi kebijakan.',
    publishedAt: '2026-07-28T07:30:00+07:00',
    eventDate: '2026-09-05T13:00:00+07:00',
    eventLocation: 'Luring · Terbatas 20 peserta',
    blocks: [
      h('Tentang lokakarya'),
      p('Masalah publik biasanya hadir dalam bahasa yang luas: mutu menurun, guru terbebani, anak kecanduan gawai, atau kebijakan tidak tepat sasaran. Penelitian membutuhkan langkah tambahan untuk mengubah kegelisahan tersebut menjadi pertanyaan yang jelas dan dapat dijawab dengan bukti.'),
      h('Membedakan masalah, gejala, dan asumsi'),
      p('Peserta akan memetakan apa yang benar-benar diamati, siapa yang terdampak, serta penjelasan apa yang masih berupa dugaan. Latihan ini mencegah pertanyaan penelitian hanya mengulang kesimpulan yang sudah diyakini sejak awal.'),
      h('Menentukan ruang lingkup'),
      p('Pertanyaan yang baik tidak harus mencakup seluruh persoalan. Batas waktu, lokasi, kelompok, kebijakan, dan jenis bukti membantu penelitian menjadi realistis. Ruang lingkup yang sempit dapat menghasilkan penjelasan yang lebih kuat dan berguna.'),
      h('Menghubungkan dengan kebijakan'),
      p('Relevansi kebijakan bukan berarti penelitian harus langsung memberi rekomendasi. Penelitian dapat memperjelas mekanisme, menunjukkan pengalaman kelompok tertentu, menguji asumsi program, atau mengidentifikasi konsekuensi yang tidak direncanakan.'),
      h('Alur kegiatan'),
      p('Peserta membawa satu masalah yang ingin dipahami. Melalui kerja individu dan kelompok kecil, peserta menyusun peta masalah, merumuskan beberapa pertanyaan, memilih satu pertanyaan utama, lalu menerima umpan balik tentang kejelasan, kelayakan, etika, dan kebutuhan data.'),
      h('Siapa yang dapat mengikuti?'),
      p('Lokakarya ditujukan bagi mahasiswa, peneliti pemula, guru, pegiat komunitas, dan pengelola program. Peserta tidak harus sudah memiliki proposal. Membawa catatan awal, berita, atau dokumen kebijakan akan membantu proses.'),
      h('Hasil lokakarya'),
      p('Setiap peserta akan memiliki rumusan pertanyaan penelitian, batas studi, daftar bukti awal yang diperlukan, serta langkah berikutnya. Lokakarya tidak menjanjikan proposal selesai, tetapi menyediakan fondasi yang dapat dikembangkan secara bertanggung jawab.'),
    ],
  },
]

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // The organisation page is user-authored content and should not occupy an
  // editorial homepage slot by default.
  await db.execute(sql`
    UPDATE "navigation"
    SET
      "parent_id" = (SELECT "id" FROM "navigation" WHERE "slug" = 'fokus-kami' LIMIT 1),
      "order" = 11,
      "updated_at" = now()
    WHERE "slug" = 'struktur-pengurus';

    UPDATE "posts"
    SET
      "section_id" = (SELECT "id" FROM "navigation" WHERE "slug" = 'struktur-pengurus' LIMIT 1),
      "updated_at" = now()
    WHERE "slug" = 'struktur-organisasi-ruang-baca-kebijakan';

    UPDATE "posts"
    SET "main_agenda" = false, "updated_at" = now()
    WHERE "slug" = 'struktur-organisasi-ruang-baca-kebijakan';

    UPDATE "_posts_v"
    SET
      "version_section_id" = (SELECT "id" FROM "navigation" WHERE "slug" = 'struktur-pengurus' LIMIT 1),
      "version_main_agenda" = false,
      "updated_at" = now()
    WHERE "parent_id" = (
      SELECT "id" FROM "posts"
      WHERE "slug" = 'struktur-organisasi-ruang-baca-kebijakan'
      LIMIT 1
    ) AND "latest" = true;
  `)

  for (const article of articles) {
    const content = JSON.stringify(lexicalContent(article.blocks))
    const seoDescription = article.excerpt.slice(0, 160)

    await db.execute(sql`
      INSERT INTO "posts" (
        "title", "slug", "section_id", "content_type", "excerpt", "content",
        "event_date", "event_location", "featured", "main_agenda",
        "published_at", "seo_title", "seo_description",
        "updated_at", "created_at", "_status"
      )
      SELECT
        ${article.title},
        ${article.slug},
        "navigation"."id",
        ${article.contentType}::"public"."enum_posts_content_type",
        ${article.excerpt},
        ${content}::jsonb,
        ${article.eventDate ?? null}::timestamptz,
        ${article.eventLocation ?? null},
        ${article.featured ?? false},
        ${article.mainAgenda ?? false},
        ${article.publishedAt}::timestamptz,
        ${article.title},
        ${seoDescription},
        now(),
        ${article.publishedAt}::timestamptz,
        'published'::"public"."enum_posts_status"
      FROM "navigation"
      WHERE "navigation"."slug" = ${article.sectionSlug}
      LIMIT 1
      ON CONFLICT ("slug") DO UPDATE SET
        "title" = EXCLUDED."title",
        "section_id" = EXCLUDED."section_id",
        "content_type" = EXCLUDED."content_type",
        "excerpt" = EXCLUDED."excerpt",
        "content" = EXCLUDED."content",
        "event_date" = EXCLUDED."event_date",
        "event_location" = EXCLUDED."event_location",
        "featured" = EXCLUDED."featured",
        "main_agenda" = EXCLUDED."main_agenda",
        "published_at" = EXCLUDED."published_at",
        "seo_title" = EXCLUDED."seo_title",
        "seo_description" = EXCLUDED."seo_description",
        "updated_at" = now(),
        "_status" = 'published'::"public"."enum_posts_status";
    `)

    await db.execute(sql`
      UPDATE "_posts_v"
      SET "latest" = false
      WHERE "parent_id" = (
        SELECT "id" FROM "posts" WHERE "slug" = ${article.slug} LIMIT 1
      ) AND "latest" = true;

      INSERT INTO "_posts_v" (
        "parent_id", "version_title", "version_slug", "version_section_id",
        "version_content_type", "version_excerpt", "version_content",
        "version_featured_image_id", "version_attachment_id",
        "version_event_date", "version_event_location",
        "version_featured", "version_main_agenda", "version_published_at",
        "version_seo_title", "version_seo_description",
        "version_updated_at", "version_created_at", "version__status",
        "created_at", "updated_at", "latest", "autosave"
      )
      SELECT
        "posts"."id",
        "posts"."title",
        "posts"."slug",
        "posts"."section_id",
        "posts"."content_type"::text::"public"."enum__posts_v_version_content_type",
        "posts"."excerpt",
        "posts"."content",
        "posts"."featured_image_id",
        "posts"."attachment_id",
        "posts"."event_date",
        "posts"."event_location",
        "posts"."featured",
        "posts"."main_agenda",
        "posts"."published_at",
        "posts"."seo_title",
        "posts"."seo_description",
        "posts"."updated_at",
        "posts"."created_at",
        "posts"."_status"::text::"public"."enum__posts_v_version_status",
        now(), now(), true, false
      FROM "posts"
      WHERE "posts"."slug" = ${article.slug}
      LIMIT 1;
    `)
  }
}

// Editorial content is preserved if the code migration is rolled back.
export async function down(_args: MigrateDownArgs): Promise<void> {}
