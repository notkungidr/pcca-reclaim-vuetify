<template>
  <v-container fluid>
    <h1 class="text-h4 font-weight-bold mb-4 primary--text">
      Management Master for Reclaim (Salvage)
    </h1>

    <!-- ฟอร์มสำหรับเพิ่มข้อมูล -->
    <v-card class="mb-6">
      <v-card-title class="text-h6 primary--text">
        เพิ่ม Master Data ใหม่
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-row>
            <v-col cols="12" sm="6" md="3"><v-text-field v-model="form.productConfig" label="Product Config" :rules="rules.required" outlined dense></v-text-field></v-col>
            <v-col cols="12" sm="6" md="3"><v-text-field v-model="form.partNumber" label="Part Number" :rules="rules.required" outlined dense></v-text-field></v-col>
            <v-col cols="12" sm="6" md="3"><v-text-field v-model="form.preampApp" label="Pream App" :rules="rules.required" outlined dense></v-text-field></v-col>
            <v-col cols="12" sm="6" md="3"><v-text-field v-model="form.pccaCode" label="PCCA Code" :rules="rules.required" outlined dense></v-text-field></v-col>
            <v-col cols="12" sm="6" md="3"><v-text-field v-model="form.pccaGroup" label="PCCA Group" :rules="rules.required" outlined dense></v-text-field></v-col>
            <v-col cols="12" sm="6" md="3"><v-text-field v-model="form.groupNumber" label="Group Number" :rules="rules.required" outlined dense></v-text-field></v-col>
            <v-col cols="12" sm="6" md="3"><v-text-field v-model="form.apfa_part_number" label="APFA Part Number" :rules="rules.required" outlined dense></v-text-field></v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="clearForm">ล้างค่า</v-btn>
        <v-btn color="primary" @click="submitAddMasterData" :disabled="!valid">เพิ่มข้อมูล</v-btn>
      </v-card-actions>
    </v-card>

    <!-- ตารางแสดงข้อมูล Master -->
    <v-card>
      <v-card-title>
        <span class="text-h6 primary--text">รายการ Master Data</span>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="ค้นหาในตาราง" single-line hide-details dense></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="allMasterData" :search="search" class="elevation-1" dense>
        <template v-slot:item.timestamp="{ item }">
          <span>{{ new Date(item.timestamp).toLocaleString('th-TH') }}</span>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'MasterDataView',
  data() {
    return {
      valid: false,
      search: '',
      form: {
        productConfig: '', partNumber: '', preampApp: '', pccaCode: '',
        pccaGroup: '', groupNumber: '', apfa_part_number: '',
      },
      headers: [
        { text: 'ID', value: 'id' }, { text: 'Product Config', value: 'productConfig' },
        { text: 'Part Number', value: 'partNumber' }, { text: 'Pream App', value: 'preampApp' },
        { text: 'PCCA Code', value: 'pccaCode' }, { text: 'PCCA Group', value: 'pccaGroup' },
        { text: 'Group Number', value: 'groupNumber' }, { text: 'APFA Part Number', value: 'apfa_part_number' },
        { text: 'เพิ่มโดย', value: 'addedBy' }, { text: 'เวลาที่เพิ่ม', value: 'timestamp' },
      ],
      rules: {
        required: [v => !!v || 'กรุณากรอกข้อมูล'],
      },
    };
  },
  computed: {
    ...mapGetters(['allMasterData']),
  },
  methods: {
    ...mapActions(['addMasterData']),
    clearForm() {
      this.$refs.form.reset();
    },
    submitAddMasterData() {
        if (!this.$refs.form.validate()) {
            Swal.fire('ข้อมูลไม่ครบถ้วน', 'กรุณากรอกข้อมูลให้ครบทุกช่อง', 'warning');
            return;
        }
        const newItem = {
            id: `M${this.allMasterData.length + 6}`,
            ...this.form,
            addedBy: 'MockUser',
            timestamp: new Date().toISOString(),
        };
        this.addMasterData(newItem);
        Swal.fire('สำเร็จ!', 'เพิ่มข้อมูล Master Data สำเร็จ!', 'success');
        this.clearForm();
    },
  },
};
</script>