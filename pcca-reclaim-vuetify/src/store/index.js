import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // state คือที่เก็บข้อมูลดิบ
  state: {
    masterData: [
      { id: "M6", productConfig: "Longspeak PCCA Salvage BRCM 5832", partNumber: "753605926", preampApp: "3", pccaCode: "200450400", pccaGroup: "200450400", groupNumber: "Longspeak Group 1", addedBy: "UserReq", timestamp: "2025-06-16T13:39:30.000Z", apfa_part_number: "753605926" },
      { id: "M7", productConfig: "LongspeakBP PCCA Salvage BC+Bosch", partNumber: "753605961", preampApp: "3", pccaCode: "201394400", pccaGroup: "200450400", groupNumber: "LongspeakBP Group 1", addedBy: "UserReq", timestamp: "2025-06-16T13:39:30.000Z", apfa_part_number: "753605926" },
      { id: "M8", productConfig: "Longspeak PCCA Salvage efos to BA", partNumber: "753605950", preampApp: "7", pccaCode: "200403700", pccaGroup: "200403700", groupNumber: "Longspeak Group 2", addedBy: "UserReq", timestamp: "2025-06-16T13:39:30.000Z", apfa_part_number: "753605958" },
      { id: "M9", productConfig: "Longspeak PCCA Salvage efos to BZ", partNumber: "753605960", preampApp: "7", pccaCode: "205190900", pccaGroup: "200403700", groupNumber: "Longspeak Group 2", addedBy: "UserReq", timestamp: "2025-06-16T13:39:30.000Z", apfa_part_number: "753605960" },
      { id: "M10", productConfig: "Evans BP 9D PCCA Salvage BRCM 5832", partNumber: "202183900", preampApp: "3", pccaCode: "100846001", pccaGroup: "100846001", groupNumber: "Evans Group 1", addedBy: "UserReq", timestamp: "2025-06-16T13:39:30.000Z", apfa_part_number: "202183900" },
      { id: "M11", productConfig: "Evans BP 8D PCCA Salvage BRCM 5832", partNumber: "208524200", preampApp: "3", pccaCode: "207575400", pccaGroup: "100846001", groupNumber: "Evans Group 1", addedBy: "UserReq", timestamp: "2025-06-16T13:39:30.000Z", apfa_part_number: "208524200" },
      { id: "M12", productConfig: "Marlin PCCA Salvage BRCM 5837", partNumber: "756166357", preampApp: "3", pccaCode: "203963500", pccaGroup: "203963500", groupNumber: "Marlin Group 1", addedBy: "UserReq", timestamp: "2025-06-16T13:39:30.000Z", apfa_part_number: "756166357" },
      { id: "M13", productConfig: "Summit PCCA Salvage BRCM 5834", partNumber: "756789957", preampApp: "3", pccaCode: "205345000", pccaGroup: "205345000", groupNumber: "Summit Group 1", addedBy: "UserReq", timestamp: "2025-06-16T13:39:30.000Z", apfa_part_number: "756789957" },
      { id: "M14", productConfig: "Summit PCCA Salvage BRCM 5832", partNumber: "756789961", preampApp: "3", pccaCode: "206519300", pccaGroup: "205345000", groupNumber: "Summit Group 1", addedBy: "UserReq", timestamp: "2025-06-16T13:39:30.000Z", apfa_part_number: "756789961" },
      { id: "M15", productConfig: "Summit PCCA Salvage efos to BB", partNumber: "756789958", preampApp: "3", pccaCode: "204832100", pccaGroup: "205345000", groupNumber: "Summit Group 1", addedBy: "UserReq", timestamp: "2025-06-16T13:39:30.000Z", apfa_part_number: "756789957" },
      { id: "M16", productConfig: "Summit PCCA Salvage efos to BB", partNumber: "756789959", preampApp: "7", pccaCode: "205345200", pccaGroup: "205345200", groupNumber: "Summit Group 2", addedBy: "UserReq", timestamp: "2025-06-16T13:39:30.000Z", apfa_part_number: "756789961" },
    ],
    scannedPCCAs: [
      
    ]
  },
  // getters คือวิธีดึงข้อมูลจาก state ไปใช้
  getters: {
    allMasterData: state => state.masterData,
    allScannedPCCAs: state => state.scannedPCCAs,
  },
  // mutations คือฟังก์ชันเดียวที่สามารถแก้ไขข้อมูลใน state ได้โดยตรง
  mutations: {
    ADD_MASTER_DATA(state, newItem) {
      state.masterData.push(newItem);
    },
    ADD_SCANNED_PCCA(state, newItem) 
    {

      console.log("Adding new scanned PCCA:", newItem);

      state.scannedPCCAs.push(newItem);
    },
  },
  // actions คือฟังก์ชันสำหรับเรียกใช้ mutations (เหมาะสำหรับ logic ที่ซับซ้อนหรือ async)
  actions: {
    addMasterData({ commit }, newItem) {
      commit('ADD_MASTER_DATA', newItem);
    },
    addScannedPCCA({ commit }, newItem) {
      commit('ADD_SCANNED_PCCA', newItem);
    },
  },
})