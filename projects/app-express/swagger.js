const swaggerAutogen = require('swagger-autogen')()
const outputFile = './swagger_output.json'
const endPointFile = ['./routes/adminRoutes.js', './routes/memberRoutes.js', './routes/ownerRoutes.js', './routes/vehiclesRoutes.js']
const doc = {
    info: {
        title: 'RESTful API E-Samsat',
        description: 'Aplikasi E-Samsat Tugas Akhir Web Back-End Development.\n Aplikasi ini akan melakukan operasi query atas 4 tabel, yakni : admin, member, vehicles, dan owners.Pada intinya API E-Samsat ini melakukan relasi antara tabel member yang mewakili entitas pemilik kendaraan dan tabel vehicle yang mewakili entitas kendaraan, yang dihubungkan oleh tabel owner menggunakan relation mapping objection js. Dimana untuk setiap melakukan http request yang berhubungan langsung dengan 3 tabel selain admin memerlukan autentifikasi header menggunakan jwt token yang diperoleh pada saat login sebagai administrator.'
    },
    host: 'localhost:5000',
    basePath: '/',
    schemes: ['http'],
    definitions: {
        AdminRequestFormat: {
            $nama: '',
            $email: '',
            $password: ''
        },
        MemberInsertRequestFormat: {
            $nama: '',
            $alamat: '',
        },
        LoginRequestFormat: {
            $email: '',
            $password: ''
        },
        VehicleInsertRequestFormat: {
            $nopol: '',
            $merk: '',
            $tipe: '',
            $tahun: '',
            $kubikasi: '',
        },
        VehicleUpdateRequestFormat: {
            $nopol: '',
            $merk: '',
            $tipe: '',
        },
        OwnerRequestFormat: {
            $member_id: 0,
            $vehicle_id: 0,
        }
    }
}

swaggerAutogen(outputFile, endPointFile, doc).then(() => {
    require('./server.js')
})