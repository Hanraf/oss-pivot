CREATE TABLE operator(
	id_operator varchar(100) NOT NULL,
    nama_operator varchar(100),
    PRIMARY KEY(id_operator)
);

CREATE TABLE evaluator(
	id_evaluator varchar(100) NOT NULL,
    nama_evaluator varchar(100),
    PRIMARY KEY(id_evaluator)
);

CREATE TABLE jenis_izin(
	id_jenis_izin int NOT NULL,
    nama_jenis_izin varchar(30),
    PRIMARY KEY(id_jenis_izin)
);

CREATE TABLE badan_usaha(
	id_badan_usaha varchar(100) NOT NULL,
    nama_badan_usaha varchar(255),
    PRIMARY KEY(id_badan_usaha)
);

CREATE TABLE status_oss(
	id_status_oss int NOT NULL,
    nama_status varchar(15),
    PRIMARY KEY(id_status_oss)
);

CREATE TABLE progress(
	id_progress int NOT NULL,
    nama_progress varchar(15),
    PRIMARY KEY(id_progress)
);

CREATE TABLE lokasi_kabupaten(
	id_kabupaten int NOT NULL,
    kode_kabupaten varchar(4),
    nama_kabupaten varchar(100),
    PRIMARY KEY(id_kabupaten)
);
CREATE TABLE lokasi_kecamatan(
	id_kecamatan int NOT NULL,
    id_kabupaten int,
    kode_kecamatan varchar(8),
    nama_kecamatan varchar(100),
    PRIMARY KEY(id_kecamatan),
    FOREIGN KEY(id_kabupaten) REFERENCES lokasi_kabupaten(id_kabupaten)
);
CREATE TABLE lokasi_desa(
	id_desa int NOT NULL,
    id_kecamatan int,
    kode_desa varchar(12),
    nama_desa varchar(100),
    PRIMARY KEY(id_desa),
    FOREIGN KEY(id_kecamatan) REFERENCES lokasi_kecamatan(id_kecamatan)
);

CREATE TABLE daftar_permohonan(
	id_permohonan int NOT NULL AUTO_INCREMENT,
    id_jenis_izin int,
    id_badan_usaha varchar(100),
    id_status_oss int,
    id_progress int,
    id_kabupaten int,
    id_kecamatan int,
    id_desa int,
    tautan_dokumen TEXT,
    nomor_permohonan varchar(100),
    tanggal_permohonan DATETIME,
    alamat TEXT,
    modal_usaha int,
    tanggal_selesai_permohonan DATETIME,
    durasi_permohonan_menit int,
    CONSTRAINT FK_MEMINTA FOREIGN KEY(id_jenis_izin) REFERENCES jenis_izin(id_jenis_izin),
    CONSTRAINT FK_MELIBATKAN FOREIGN KEY(id_badan_usaha) REFERENCES badan_usaha(id_badan_usaha),
    CONSTRAINT FK_MEMANTAU FOREIGN KEY(id_status_oss) REFERENCES status_oss(id_status_oss),
    CONSTRAINT FK_MEMBUTUHKAN FOREIGN KEY(id_progress) REFERENCES progress(id_progress),
    CONSTRAINT FK_BERKABUPATEN FOREIGN KEY(id_kabupaten) REFERENCES lokasi_kabupaten(id_kabupaten),
    CONSTRAINT FK_BERKECAMATAN FOREIGN KEY(id_kecamatan) REFERENCES lokasi_kecamatan(id_kecamatan),
    CONSTRAINT FK_BERADA FOREIGN KEY(id_desa) REFERENCES lokasi_desa(id_desa),
    PRIMARY KEY(id_permohonan)
);

CREATE TABLE daftar_evaluator_permohonan(
	id_evaluator_permohonan int NOT NULL,
    id_permohonan int,
    id_evaluator varchar(100),
    id_operator varchar(100),
    tanggal_disposisi TIMESTAMP,
    tautan_disposisi TEXT,
    tanggal_pengecekan_evaluator DATETIME,
    catatan_evaluasi TEXT,
    PRIMARY KEY(id_evaluator_permohonan),
    CONSTRAINT FK_DICATAT FOREIGN KEY(id_operator) REFERENCES operator(id_operator),
    CONSTRAINT FK_DIKERJAKAN FOREIGN KEY(id_evaluator) REFERENCES evaluator(id_evaluator),
    CONSTRAINT FK_MENGGUNAKAN FOREIGN KEY(id_permohonan) REFERENCES daftar_permohonan(id_permohonan)
);