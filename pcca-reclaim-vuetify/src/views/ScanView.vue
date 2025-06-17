<template>
  <div class="scan-view-container">
    <!-- Hero section with dark background -->
    <v-container fluid class="hero-section mb-6">
      <v-row>
        <v-col cols="12">
          <h1 class="text-h3 font-weight-bold white--text">Scan for Reclaim <span class="text-subtitle-1">(Salvage)</span></h1>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid>
      <!-- ส่วนของฟอร์มสแกน -->
      <v-card class="elevation-2 rounded-lg mb-8">
        <v-card-title class="headline primary white--text">
          <v-icon large color="white" class="mr-2">mdi-barcode-scan</v-icon>
          Scan Input PCCA Reclaim
        </v-card-title>
        <v-card-text class="pt-6">
          <v-row>
            <v-col cols="12" md="6">
              <v-select 
                :items="sgPnOptions" 
                v-model="form.selectedSGPn" 
                label="Select SG/PN" 
                outlined 
                dense 
                :disabled="firstScanDone"
                class="custom-field"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select 
                :items="productOptions" 
                v-model="form.selectedProduct" 
                label="Select Product" 
                outlined 
                dense 
                :disabled="firstScanDone"
                class="custom-field"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-text-field 
                v-model="form.lotNumber" 
                label="Lot Number" 
                outlined 
                dense 
                :disabled="firstScanDone"
                class="custom-field"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-text-field 
                v-model="form.quantity" 
                label="Quantity" 
                type="number" 
                outlined 
                dense 
                :disabled="firstScanDone" 
                :hint="scanProgressDisplay" 
                persistent-hint
                class="custom-field"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-text-field 
                v-model="form.huPn" 
                label="HU/PN" 
                outlined 
                dense 
                :disabled="firstScanDone"
                class="custom-field"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-text-field 
                v-model="form.jobOrder" 
                label="Job Order" 
                outlined 
                dense 
                :disabled="firstScanDone"
                class="custom-field"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field 
                v-model="form.barcodeInput" 
                label="สแกน Barcode PCCA (25 หลัก)" 
                placeholder="ป้อน Barcode 25 หลักแล้วกด Enter" 
                @keypress.enter.prevent="handleScan" 
                outlined 
                clearable 
                autofocus
                class="scan-input"
                prepend-inner-icon="mdi-barcode"
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-6">
            <v-col class="d-flex">
              <v-btn 
                color="primary" 
                @click="handleScan" 
                class="px-8 py-6 white--text scan-btn"
                elevation="2"
                :x-large="true"
              >
                <v-icon left>mdi-barcode-scan</v-icon>
                สแกน
              </v-btn>
              <v-btn 
                class="ml-4 reset-btn" 
                outlined
                color="grey darken-2"
                @click="resetScanForm"
              >
                <v-icon left>mdi-refresh</v-icon>
                เริ่ม Job ใหม่
              </v-btn>
            </v-col>
          </v-row>
          
          <v-card v-if="scannedData" class="mt-6 info-card">
            <v-card-title class="subtitle-1 secondary--text">
              <v-icon color="primary" class="mr-2">mdi-information-outline</v-icon>
              ข้อมูลที่แยกได้จาก Barcode
            </v-card-title>
            <v-card-text class="pt-2">
              <v-row>
                <v-col cols="12" md="4">
                  <div class="data-item">
                    <div class="data-label">Barcode เต็ม:</div>
                    <div class="data-value">{{ scannedData.fullBarcode }}</div>
                  </div>
                </v-col>
                <v-col cols="12" md="4">
                  <div class="data-item">
                    <div class="data-label">PCCA Code (จาก Barcode):</div>
                    <div class="data-value">{{ scannedData.pccaCode }}</div>
                  </div>
                </v-col>
                <v-col cols="12" md="4" v-if="scannedData.returnedGroupNumber">
                  <div class="data-item">
                    <div class="data-label">Group Number (จาก Master):</div>
                    <div class="data-value">{{ scannedData.returnedGroupNumber }}</div>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-card>
      
      <!-- ตารางแสดงรายการที่สแกนล่าสุด -->
      <v-card class="elevation-2 rounded-lg table-card">
        <v-card-title class="headline primary white--text">
          <v-icon large color="white" class="mr-2">mdi-history</v-icon>
          รายการที่สแกนล่าสุด
        </v-card-title>
        <v-data-table 
          :headers="recentScansHeaders" 
          :items="recentScans" 
          dense
          class="custom-table"
          :footer-props="{
            'items-per-page-options': [10, 20, 50, -1],
            'items-per-page-text': 'จำนวนรายการต่อหน้า'
          }"
        >
          <template v-slot:item.status="{ item }">
            <v-chip 
              :color="item.status === 'Good' ? 'success' : 'error'" 
              dark 
              small
              class="status-chip"
            >
              {{ item.status }}
            </v-chip>
          </template>
          <template v-slot:item.timestamp="{ item }">
            <span class="timestamp">{{ new Date(item.timestamp).toLocaleString('th-TH') }}</span>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ScanView',
  data: () => ({
      form: { barcodeInput: '', selectedSGPn: '', selectedProduct: '', lotNumber: '', quantity: '', huPn: '', jobOrder: '' },
      scannedData: null, firstScanDone: false, initialQuantity: null,
      recentScansHeaders: [
          { text: 'SN (Barcode)', value: 'serialNumber'}, { text: 'PCCA Code', value: 'pccaCode'},
          { text: 'สถานะ', value: 'status'}, { text: 'Group (Master)', value: 'returnedGroupNumber'},
          { text: 'เวลาที่สแกน', value: 'timestamp'},
      ]
  }),
  computed: {
      ...mapGetters(['allMasterData', 'allScannedPCCAs']),
      recentScans() {
          if (!this.firstScanDone || (!this.form.lotNumber && !this.form.jobOrder)) {
              // ถ้ายังไม่ได้เริ่มสแกน job หรือยังไม่ได้กรอก lot/job order ก็ยังไม่ต้องกรอง
              return [...this.allScannedPCCAs].reverse();
          }
          // กรองรายการสแกนให้ตรงกับ job ปัจจุบัน
          return this.allScannedPCCAs.filter(scan =>
              scan.lotNumber === this.form.lotNumber &&
              scan.jobOrder === this.form.jobOrder &&
              scan.selectedSGPn === this.form.selectedSGPn // สามารถเพิ่มเงื่อนไขอื่นๆ ของ job ได้ตามต้องการ
          ).reverse();
      },
      sgPnOptions() { return [...new Set(this.allMasterData.map(item => item.partNumber))]; },
      productOptions() {
          let products = this.form.selectedSGPn ? this.allMasterData.filter(item => item.partNumber === this.form.selectedSGPn) : this.allMasterData;
          return [...new Set(products.map(item => item.productConfig))];
      },
      scanProgressDisplay() {
          if (this.initialQuantity !== null && !isNaN(Number(this.form.quantity))) {
              const scannedCount = this.initialQuantity - Number(this.form.quantity);
              return `สแกนแล้ว ${Math.max(0, scannedCount)} / ${this.initialQuantity}`;
          }
          return '';
      },
  },
  watch: { 'form.selectedSGPn'() { this.form.selectedProduct = ''; } },
  methods: {
      ...mapActions(['addScannedPCCA']),
      resetScanForm() {
          Object.assign(this.form, this.$options.data().form);
          this.scannedData = null; this.firstScanDone = false; this.initialQuantity = null;
          Swal.fire('รีเซตสำเร็จ', 'คุณสามารถเริ่ม Job ใหม่ได้เลย', 'info');
      },
      parsePCCABarcode(barcode) {
          if (typeof barcode !== 'string' || barcode.length !== 25) return null;
          return { fullBarcode: barcode, pccaCode: barcode.substring(15, 24) };
      },
      handleScan() {
          if (!this.form.selectedSGPn || !this.form.quantity || !this.form.lotNumber) {
              return Swal.fire('ข้อมูลไม่ครบถ้วน', 'กรุณากรอกข้อมูล Job ให้ครบถ้วนก่อนสแกน', 'warning');
          }
          if (!this.firstScanDone) this.initialQuantity = Number(this.form.quantity);
          const parsed = this.parsePCCABarcode(this.form.barcodeInput);

          // เพิ่มข้อมูลลง Vuex store ก่อนการตรวจสอบใดๆ เพื่อให้ลง table 100%
          // แต่สถานะ (currentStatus) จะถูกกำหนดหลังการตรวจสอบ
          // และ ID อาจจะต้องจัดการให้ unique จริงๆ หาก SN ซ้ำกันได้
          const preliminaryScannedItem = {
            id: `S${this.allScannedPCCAs.length + 1}`,
            timestamp: new Date(),
            serialNumber: this.form.barcodeInput,
            pccaCode: parsed.pccaCode,
            selectedSGPn: this.form.selectedSGPn,
            selectedProduct: this.form.selectedProduct,
            lotNumber: this.form.lotNumber,
            quantity: this.form.quantity,
            huPn: this.form.huPn,
            jobOrder: this.form.jobOrder,
          };

          if (!parsed) return Swal.fire('Barcode ไม่ถูกต้อง', 'Barcode ต้องมีความยาว 25 หลักพอดี', 'error');
          
          // ตรวจสอบ SN ซ้ำ 100% และหยุดการทำงานหากพบ
          if (this.allScannedPCCAs.some(i => i.serialNumber === this.form.barcodeInput)) {
              return Swal.fire('SN ซ้ำ!', `Serial Number '${this.form.barcodeInput}' นี้ถูกสแกนไปแล้ว กรุณาตรวจสอบ`, 'error');
          }

          this.scannedData = { ...parsed };
          let currentStatus = 'Good', message = '';
          const master = this.allMasterData.find(md => md.pccaCode === parsed.pccaCode);

          if (master) {
              message = `✅ PCCA Code '${parsed.pccaCode}' พบใน Master.`;
              this.scannedData.returnedGroupNumber = master.groupNumber;
              if (this.form.selectedSGPn !== master.partNumber) { currentStatus = 'Reject'; message = `❌ SG/PN ที่เลือกไม่ตรงกับ Master Data`; }
          } else { currentStatus = 'Reject'; message = `❌ PCCA Code '${parsed.pccaCode}' ไม่พบใน Master Data.`; }

          console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
          console.log('Scanned Item:', preliminaryScannedItem);
          console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

          // อัปเดตสถานะและเพิ่มข้อมูลที่สมบูรณ์ลง Vuex store
          this.addScannedPCCA({ ...preliminaryScannedItem, status: currentStatus, returnedGroupNumber: this.scannedData.returnedGroupNumber });
          // แสดงผลลัพธ์หลังจากการเพิ่มข้อมูลแล้ว
          Swal.fire(currentStatus === 'Good' ? 'ผ่าน!' : 'ไม่ผ่าน!', message, currentStatus === 'Good' ? 'success' : 'error');
          
          this.form.barcodeInput = '';
          if (!this.firstScanDone) this.firstScanDone = true;

          let qty = Number(this.form.quantity);
          if (qty > 0) this.form.quantity = qty - 1;
          if (this.form.quantity === 0) {
              Swal.fire({ icon: 'success', title: 'สแกนครบตามจำนวน!', timer: 3000, showConfirmButton: false, willClose: this.resetScanForm });
          }
      }
  }
};
</script>

<style>
/* Seagate-inspired color palette */
:root {
  --seagate-green: #467c2d;
  --seagate-dark: #212121;
  --seagate-white: #ffffff;
  --seagate-light-gray: #f5f5f5;
  --seagate-medium-gray: #e0e0e0;
  --seagate-hover-green: #559637;
}

.scan-view-container {
  background-color: var(--seagate-light-gray);
  min-height: 100vh;
}

/* Hero section with dark background */
.hero-section {
  background-color: var(--seagate-dark);
  padding: 2rem 2rem;
  position: relative;
  overflow: hidden;
  margin-bottom: 2rem;
}

.hero-section::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(135deg, rgba(70, 124, 45, 0.2) 0%, rgba(0, 0, 0, 0) 100%);
  z-index: 1;
}

.hero-section h1 {
  position: relative;
  z-index: 2;
}

/* Card styling */
.v-card {
  border-radius: 8px !important;
  overflow: hidden;
}

.v-card__title.headline {
  padding: 1.5rem;
  font-size: 1.5rem !important;
}

/* Form field styling */
.custom-field {
  margin-bottom: 0.5rem;
}

.custom-field .v-input__slot {
  border-radius: 4px !important;
  transition: all 0.3s ease;
}

.custom-field .v-input__slot:hover {
  border-color: var(--seagate-green) !important;
}

.custom-field.v-input--is-focused .v-input__slot {
  border-color: var(--seagate-green) !important;
  box-shadow: 0 0 0 1px var(--seagate-green) !important;
}

/* Scan barcode input styling */
.scan-input {
  margin-top: 1rem;
}

.scan-input .v-input__slot {
  border: 2px solid var(--seagate-green) !important;
  background-color: rgba(70, 124, 45, 0.05) !important;
}

/* Button styling */
.scan-btn {
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.scan-btn:hover {
  background-color: var(--seagate-hover-green) !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
}

.reset-btn {
  font-weight: 500;
  text-transform: none;
}

/* Table styling */
.table-card {
  margin-bottom: 2rem;
}

.custom-table {
  border-radius: 0 0 8px 8px;
}

.custom-table .v-data-table__wrapper {
  border-radius: 0 0 8px 8px;
}

.custom-table th {
  font-weight: 600 !important;
  background-color: var(--seagate-medium-gray) !important;
  color: var(--seagate-dark) !important;
  text-transform: none !important;
}

.custom-table tr:nth-child(even) {
  background-color: rgba(70, 124, 45, 0.03);
}

.custom-table tr:hover {
  background-color: rgba(70, 124, 45, 0.08) !important;
}

.status-chip {
  font-weight: 600;
}

/* Info card styling */
.info-card {
  background-color: rgba(70, 124, 45, 0.05);
  border-left: 4px solid var(--seagate-green);
}

.data-item {
  padding: 0.5rem 0;
}

.data-label {
  font-weight: 600;
  color: var(--seagate-dark);
  margin-bottom: 0.25rem;
}

.data-value {
  font-family: monospace;
  background-color: var(--seagate-medium-gray);
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 1rem;
}

/* Animation for successful scan */
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(70, 124, 45, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(70, 124, 45, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(70, 124, 45, 0);
  }
}

.scan-success {
  animation: pulse 1.5s 1;
}
</style>