CREATE TABLE operator(
	id_operator int NOT NULL AUTO_INCREMENT,
    nama_operator varchar(100),
    PRIMARY KEY(id_operator)
);

CREATE TABLE evaluator(
	id_evaluator int NOT NULL AUTO_INCREMENT,
    nama_evaluator varchar(100),
    PRIMARY KEY(id_evaluator)
);

CREATE TABLE jenis_izin(
	id_jenis_izin int NOT NULL AUTO_INCREMENT,
    nama_jenis_izin varchar(30),
    PRIMARY KEY(id_jenis_izin)
);

CREATE TABLE badan_usaha(
	id_badan_usaha int NOT NULL AUTO_INCREMENT,
    nama_badan_usaha varchar(255),
    PRIMARY KEY(id_badan_usaha)
);

CREATE TABLE status_oss(
	id_status_oss int NOT NULL AUTO_INCREMENT,
    nama_status varchar(15),
    PRIMARY KEY(id_status_oss)
);

CREATE TABLE progress(
	id_progress int NOT NULL AUTO_INCREMENT,
    nama_progress varchar(15),
    PRIMARY KEY(id_progress)
);

CREATE TABLE lokasi_kabupaten(
	id_kabupaten int NOT NULL AUTO_INCREMENT,
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
	id_desa int NOT NULL AUTO_INCREMENT,
    id_kecamatan int,
    kode_desa varchar(12),
    nama_desa varchar(100),
    PRIMARY KEY(id_desa),
    FOREIGN KEY(id_kecamatan) REFERENCES lokasi_kecamatan(id_kecamatan)
);

CREATE TABLE daftar_permohonan(
	id_permohonan int NOT NULL AUTO_INCREMENT,
    id_jenis_izin int,
    id_badan_usaha int,
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
    FOREIGN KEY(id_jenis_izin) REFERENCES jenis_izin(id_jenis_izin),
    FOREIGN KEY(id_badan_usaha) REFERENCES badan_usaha(id_badan_usaha),
    FOREIGN KEY(id_status_oss) REFERENCES status_oss(id_status_oss),
    FOREIGN KEY(id_progress) REFERENCES progress(id_progress),
    FOREIGN KEY(id_kabupaten) REFERENCES lokasi_kabupaten(id_kabupaten),
    FOREIGN KEY(id_kecamatan) REFERENCES lokasi_kecamatan(id_kecamatan),
    FOREIGN KEY(id_desa) REFERENCES lokasi_desa(id_desa),
    PRIMARY KEY(id_permohonan)
);

CREATE TABLE daftar_evaluator_permohonan(
	id_evaluator_permohonan int NOT NULL AUTO_INCREMENT,
    id_permohonan int,
    id_evaluator int,
    id_operator int,
    tanggal_disposisi DATETIME,
    tautan_disposisi TEXT,
    tanggal_pengecekan_evaluator DATETIME,
    catatan_evaluasi TEXT,
    PRIMARY KEY(id_evaluator_permohonan),
    FOREIGN KEY(id_operator) REFERENCES operator(id_operator),
    FOREIGN KEY(id_evaluator) REFERENCES evaluator(id_evaluator),
    FOREIGN KEY(id_permohonan) REFERENCES daftar_permohonan(id_permohonan)
);