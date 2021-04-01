import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import('./Demo/Dashboard/Default'));

const UIBasicButton = React.lazy(() => import('./Demo/UIElements/Basic/Button'));
const UIBasicBadges = React.lazy(() => import('./Demo/UIElements/Basic/Badges'));
const UIBasicBreadcrumbPagination = React.lazy(() => import('./Demo/UIElements/Basic/BreadcrumbPagination'));

const UIBasicCollapse = React.lazy(() => import('./Demo/UIElements/Basic/Collapse'));
const UIBasicTabsPills = React.lazy(() => import('./Demo/UIElements/Basic/TabsPills'));
const UIBasicBasicTypography = React.lazy(() => import('./Demo/UIElements/Basic/Typography'));

const FormsElements = React.lazy(() => import('./Demo/Forms/FormsElements'));
const BootstrapTable = React.lazy(() => import('./Demo/Tables/BootstrapTable'));
const Nvd3Chart = React.lazy(() => import('./Demo/Charts/Nvd3Chart/index'));
const GoogleMap = React.lazy(() => import('./Demo/Maps/GoogleMap/index'));
const OtherSamplePage = React.lazy(() => import('./Demo/Other/SamplePage'));
const OtherDocs = React.lazy(() => import('./Demo/Other/Docs'));


const PenggunaAktifasi  = React.lazy(()=> import('./Demo/pengguna/UserAktifasi'));

const PenggunaAktif     = React.lazy(()=>  import('./Demo/pengguna/UserAktif'));

const PenggunaBlokir    = React.lazy(()=> import('./Demo/pengguna/UserBlokir'));



const KuesionerKelola   = React.lazy(()=> import('./Demo/Kuesioner/KelolaKuesioner/KelolaKuesioner'));
const KategoriKatUser   = React.lazy(()=> import('./Demo/Kuesioner/KelolaKuesioner/kategoriKue/KategoriKatUser'));
const HasilKuesioner    = React.lazy(()=> import('./Demo/Kuesioner/HasilKuesioner/HasilKuesioner'));
const HasilDetail       = React.lazy(()=> import('./Demo/Kuesioner/HasilKuesioner/HasilDetailKuesioner'));
const DetailKuesioner   = React.lazy(()=> import('./Demo/Kuesioner/KelolaKuesioner/DetailKue'));
const EditKuesioner     = React.lazy(()=> import('./Demo/Kuesioner/KelolaKuesioner/EditKue'));
const EditPertanyaan    = React.lazy(() => import('./Demo/Kuesioner/KelolaKuesioner/EditKueTanya'));

const HasilDiagram      = React.lazy(() => import('./Demo/Kuesioner/HasilKuesioner/Diagram'));
const DiagramKat        = React.lazy(() => import('./Demo/Kuesioner/HasilKuesioner/DiagramKat')); 

const KategoriKuesioner = React.lazy(()=> import('./Demo/Kuesioner/KelolaKuesioner/KategoriKue'));
const EditKat           = React.lazy(()=> import('./Demo/Kuesioner/KelolaKuesioner/EditKatKue'));
const PilihKategori     = React.lazy(()=> import('./Demo/Kuesioner/KelolaKuesioner/kategoriKue/KategoriKat'))

const Pengaturan        = React.lazy(() => import('./Demo/Akun/Pengaturan'));
const Profile           = React.lazy(() => import('./Demo/Akun/Profile'));
const UbahPass          = React.lazy(() => import('./Demo/Akun/UbahPass'));


const routes = [

    { path: '/dashboard/default', exact: true, name: 'Default', component: DashboardDefault },
    { path: '/basic/button', exact: true, name: 'Basic Button', component: UIBasicButton },
    { path: '/basic/badges', exact: true, name: 'Basic Badges', component: UIBasicBadges },
    { path: '/basic/breadcrumb-paging', exact: true, name: 'Basic Breadcrumb Pagination', component: UIBasicBreadcrumbPagination },
    { path: '/basic/collapse', exact: true, name: 'Basic Collapse', component: UIBasicCollapse },
    { path: '/basic/tabs-pills', exact: true, name: 'Basic Tabs & Pills', component: UIBasicTabsPills },
    { path: '/basic/typography', exact: true, name: 'Basic Typography', component: UIBasicBasicTypography },
    { path: '/forms/form-basic', exact: true, name: 'Forms Elementsssssssssss', component: FormsElements },
    { path: '/tables/bootstrap', exact: true, name: 'Bootstrap Table', component: BootstrapTable },
    { path: '/charts/nvd3', exact: true, name: 'Nvd3 Chart', component: Nvd3Chart },
    { path: '/maps/google-map', exact: true, name: 'Google Map', component: GoogleMap },
    { path: '/sample-page', exact: true, name: 'Sample Page', component: OtherSamplePage },
    { path: '/docs', exact: true, name: 'Documentation', component: OtherDocs },


    { path: '/pengguna/aktifasi', exact: true, name: 'Aktifasi User', component: PenggunaAktifasi },
    { path: '/pengguna/aktif', exact: true, name: 'User Aktif', component: PenggunaAktif },
    { path: '/pengguna/blokir', exact: true, name: 'User Blokir', component: PenggunaBlokir },


    { path: '/kuesioner/kategori', exact: true, name: 'Kategori Kuesioner', component: KategoriKuesioner },
    { path: '/ubah/kategori/:id', exact: true, name: 'Ubah Kategori', component: EditKat },
    { path: '/kesioner/pilih_kategori', exact: true, name: 'Pilih Kategori Kuesioner', component: PilihKategori },
    
    { path: '/kuesioner/kelola/:id', exact: true, name: 'Kelola', component: KuesionerKelola },
    
    { path: '/kuesioner/hasil/kat', exact: true, name: 'Hasil Kuesioner', component: HasilDetail },

    { path: '/kuesioner/hasil', exact: true, name: 'Hasil Kuesioner', component: HasilKuesioner },
    { path: '/kuesioner/detail/:id', exact: true, name: 'Detail Kuesioner', component: DetailKuesioner },
    { path: '/kuesioner/edit/:id', exact: true, name: 'Edit Kuesioner', component: EditKuesioner },
    { path: '/kuesioner/edit-tanya/:id', exact: true, name: 'Edit pertanyaan', component: EditPertanyaan },
    { path: '/kuesioner/hasil/kategori/:id', exact: true, name: 'Kuesioner Hasil Kategori', component: KategoriKatUser },


    { path: '/kuesioner/diagram/kategori', exact: true, name: "Kategori Hasil", component: DiagramKat },
    { path: '/kuesioner/diagram/:id', exact: true, name: "Kategori Hasil", component: HasilDiagram },


    { path: '/profil', exact: true, name: 'Profil', component: Profile },
    { path: '/pengaturan', exact: true, name: 'Pengaturan', component: Pengaturan },
    { path: '/ubahPass', exact: true, name: 'Ubah Password', component: UbahPass },






];

export default routes;