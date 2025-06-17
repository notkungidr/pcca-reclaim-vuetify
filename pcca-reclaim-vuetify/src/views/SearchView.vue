<template>
  <v-container fluid>
    <h1 class="text-h4 font-weight-bold mb-4 primary--text">ค้นหาข้อมูล PCCA และ Export</h1>

    <!-- ส่วนของเงื่อนไขการค้นหา -->
    <v-card class="mb-6">
      <v-card-title>ตัวกรองการค้นหา</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="4"><v-text-field v-model="sc.serialNumber" label="Serial Number" dense outlined clearable></v-text-field></v-col>
          <v-col cols="12" sm="6" md="4"><v-text-field v-model="sc.pccaCode" label="PCCA Code" dense outlined clearable></v-text-field></v-col>
          <v-col cols="12" sm="6" md="4"><v-text-field v-model="sc.lotNumber" label="Lot Number" dense outlined clearable></v-text-field></v-col>
          <v-col cols="12" sm="6" md="4"><v-text-field v-model="sc.jobOrder" label="Job Order" dense outlined clearable></v-text-field></v-col>
          <v-col cols="12" sm="6" md="4"><v-select :items="['', 'Good', 'Reject']" v-model="sc.status" label="สถานะ" dense outlined clearable></v-select></v-col>
          <v-col cols="12" sm="6" md="4">
            <v-menu v-model="menuDateFrom" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="sc.dateFrom" label="จากวันที่" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" dense outlined clearable @click:clear="sc.dateFrom = null"></v-text-field>
              </template>
              <v-date-picker v-model="sc.dateFrom" @input="menuDateFrom = false" no-title scrollable locale="th-TH"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-menu v-model="menuDateTo" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="sc.dateTo" label="ถึงวันที่" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" dense outlined clearable @click:clear="sc.dateTo = null" :min="sc.dateFrom"></v-text-field>
              </template>
              <v-date-picker v-model="sc.dateTo" @input="menuDateTo = false" no-title scrollable locale="th-TH" :min="sc.dateFrom"></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="clearSearch">ล้างค่า</v-btn>
        <v-btn color="primary" @click="performSearch">ค้นหา</v-btn>
        <v-btn color="success" class="ml-2" @click="exportToExcel" :disabled="searchResults.length === 0">Export to Excel</v-btn>
      </v-card-actions>
    </v-card>

    <!-- ตารางแสดงผลการค้นหา -->
    <v-card>
      <v-card-title>ผลลัพธ์การค้นหา ({{ searchResults.length }} รายการ)</v-card-title>
      <v-data-table :headers="headers" :items="searchResults" dense>
         <template v-slot:item.status="{ item }"><v-chip :color="item.status === 'Good' ? 'green' : 'red'" dark small>{{ item.status }}</v-chip></template>
         <template v-slot:item.timestamp="{ item }"><span>{{ new Date(item.timestamp).toLocaleString('th-TH') }}</span></template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
// สำหรับ Export to Excel ให้ติดตั้ง library เพิ่ม: npm install xlsx
// import * as XLSX from 'xlsx';

export default {
    name: 'SearchView',
    data() {
        return {
            sc: { lotNumber: '', jobOrder: '', status: '', serialNumber: '', pccaCode: '', dateFrom: null, dateTo: null },
            menuDateFrom: false,
            menuDateTo: false,
            searchResults: [],
            headers: [
                { text: 'SN (Barcode)', value: 'serialNumber'}, { text: 'PCCA Code', value: 'pccaCode'},
                { text: 'สถานะ', value: 'status'}, { text: 'Group (Master)', value: 'returnedGroupNumber'},
                { text: 'Lot No.', value: 'lotNumber'}, { text: 'Job Order', value: 'jobOrder'},
                { text: 'เวลาสแกน', value: 'timestamp'},
            ]
        }
    },
    computed: { ...mapGetters(['allScannedPCCAs']) },
    methods: {
        performSearch() {
            let results = [...this.allScannedPCCAs];
            Object.keys(this.sc).forEach(key => {
                if (this.sc[key]) {
                    results = results.filter(item => 
                        item[key] && item[key].toString().toLowerCase().includes(this.sc[key].toLowerCase())
                    );
                }
            });
            if (this.sc.dateFrom) {
                results = results.filter(item => {
                    const itemDate = new Date(item.timestamp).setHours(0,0,0,0);
                    const dateFrom = new Date(this.sc.dateFrom).setHours(0,0,0,0);
                    return itemDate >= dateFrom;
                });
            }
            if (this.sc.dateTo) {
                results = results.filter(item => {
                    const itemDate = new Date(item.timestamp).setHours(0,0,0,0);
                    const dateTo = new Date(this.sc.dateTo).setHours(0,0,0,0);
                    return itemDate <= dateTo;
                });
            }
            this.searchResults = results;
        },
        clearSearch() {
            this.sc = { lotNumber: '', jobOrder: '', status: '', serialNumber: '', pccaCode: '', dateFrom: null, dateTo: null };
            this.searchResults = [...this.allScannedPCCAs];
        },
        exportToExcel() {
            Swal.fire('Export to Excel', 'ฟังก์ชันนี้กำลังอยู่ในระหว่างการพัฒนา', 'info');
            // Logic for xlsx library
            // const worksheet = XLSX.utils.json_to_sheet(this.searchResults);
            // const workbook = XLSX.utils.book_new();
            // XLSX.utils.book_append_sheet(workbook, worksheet, "ScanData");
            // XLSX.writeFile(workbook, "PCCA_Export.xlsx");
        }
    },
    created() {
        // แสดงข้อมูลทั้งหมดในตอนแรก
        this.searchResults = [...this.allScannedPCCAs];
    }
}
</script>
